import argparse
import glob
import os
import json

from ast import Tuple

def init() -> tuple[str, str, str, str, str, str]:
    parser = argparse.ArgumentParser(
        prog="AdriTemplater",
        description="A python script to template multi language html files",
        epilog="Black cats are the best!"
    )

    parser.add_argument("language_file", help="csv file of languages where the headings are the language codes")
    parser.add_argument("input_dir", help="input directory of where the to be templated files are")
    parser.add_argument("output_dir", help="output directory of where the templated files will go")
    parser.add_argument("-d", "--delimiter", help="delimiter used in the language csv file")
    parser.add_argument("-l", "--left", help="string on the left side of the to be templated string")
    parser.add_argument("-r", "--right", help="string on the right side of the to be templated string")

    args = parser.parse_args()

    return args.language_file, args.input_dir, args.output_dir, args.delimiter, args.left, args.right

def get_defaults() -> dict[str, str]:
    return dict([("delimiter", ';'), ("left", '«'), ("right", '»'), ("config_file_path", "templaterconfig.json")])

def parse_languages(languages: list[str]) -> dict[str, list[str]]:
    language_map = dict()
    for lang in languages:
        language_map[lang.strip()] = list()

    return language_map

def parse_config_file(file_name):
    with open(file_name) as file:
        return json.load(file)

def content_language_mapper(language_file: str, delimiter: str) -> dict[str, list[str]]:
    language_map = None

    with open(language_file) as file:
        language_map = parse_languages(file.readline().split(delimiter))
        key_list = list(language_map.keys())

        for line in file.readlines():
            word_index = 0
            word = ""

            for char in line:
                if char == delimiter:
                    language_map[key_list[word_index]].append(word)
                    word = ""
                    word_index += 1
                elif char == '\n':
                    language_map[key_list[word_index]].append(word)
                    break
                else:
                    word += char

        return language_map

def match(input_str: str, end_str: str) -> tuple[str, int]:
    match = ""
    index = 0

    while index < len(input_str):
        if input_str[index].isnumeric():
            match += input_str[index]
            index += 1
            continue

        if input_str[index] == end_str:
            break

        index += 1

    return match, index

def add_string(lang_content_map: dict[str, str], language_map: dict[str, list[str]], string: str, isVariable: bool) -> dict[str, str]:
    if isVariable:
        for key in list(lang_content_map.keys()):
            lang_content_map[key] += language_map[key][int(string)]
    else:
        for key in list(lang_content_map.keys()):
            lang_content_map[key] += string

    return lang_content_map

def template(template_file: str, language_map: dict[str, list[str]], left: str, right: str) -> dict[str, str]:
    templated_strings: dict[str, str] = dict()

    for key in list(language_map.keys()):
        templated_strings[key] = ""

    with open(template_file, encoding="utf-8") as file:
        for line in file.readlines():
            char_index = 0

            while char_index < len(line):
                if line[char_index] == left:
                    match_result = match(line[(char_index + 1)::], right)
                    templated_strings = add_string(templated_strings, language_map, match_result[0], True)
                    char_index += match_result[1] + 2
                else:
                    templated_strings = add_string(templated_strings, language_map, line[char_index], False)
                    char_index += 1

    return templated_strings

def write(templated_strings: dict[str, str], output_dir: str, dir_path: str, file_name: str) -> None:
    for lang, string in templated_strings.items():
        path = os.path.join(output_dir, lang, dir_path)

        os.makedirs(path, exist_ok=True)

        with open(f"{path}{os.sep}{file_name}", "w") as file:
            file.write(string)

def get_file_paths(root_dir: str, patterns: list) -> set[str]:
    """Returns a Set of all files matching a globbing patterns. Returns all files if no pattern is found"""

    if len(patterns) == 0:
            return get_globbed_files(["**/*"])
        
    return get_globbed_files(patterns, True, True)

def get_globbed_files(patterns: list, include_hidden: bool, recursive: bool) -> set[str]:
    files = set()

    for pattern in patterns:
        file_list = glob.glob(pattern, include_hidden=include_hidden, recursive=recursive)
        [files.add(file) for file in file_list]
    
    return files

# TODO: Try to make this not needed
def strip_parent_dir_and_file(path: str) -> tuple[str, str, str]:
    """Returns a tuple of 3 items: upper directory, intermediary directory path, file name"""
    parent_dir_index = path.index(os.sep)
    file_name_index = path.rindex(os.sep)

    parent_dir = path[0:parent_dir_index]
    intermediary_dirs = path[parent_dir_index + 1:file_name_index]
    file_name = path[file_name_index + 1::]

    return parent_dir, intermediary_dirs, file_name # parent_dir output is currently not used


def main(language_file: str, input_dir: str, output_dir: str, delimiter: str, left: str, right: str) -> None:
    defaults = get_defaults()
    config = parse_config_file(defaults.get("config_file_path"))
    files_to_template = get_file_paths(input_dir, config["patterns"])

    if delimiter == None:
        delimiter = defaults.get("delimiter")

    language_map = content_language_mapper(language_file, delimiter)

    if left == None:
        left = defaults.get("left")

    if right == None:
        right = defaults.get("right")

    for file_path in files_to_template:
        templated_strings = template(file_path, language_map, left, right)
        output_dirs = strip_parent_dir_and_file(file_path)

        write(templated_strings, output_dir, output_dirs[1], output_dirs[2])

if __name__ == "__main__":
    args = init()
    main(args[0], args[1], args[2], args[3], args[4], args[5])