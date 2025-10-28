# MIT License

# Copyright (c) 2024 Adriaan Waem

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

import argparse
import glob
import json
import os
from ast import Tuple


class TemplaterConfig:
    patterns = None
    language_file_delimiter = None
    template_char_left = None
    template_char_right = None

    def __init__(
        self,
        patterns: list[str],
        language_file_delimiter: str,
        template_char_left: str,
        template_char_right: str,
    ) -> None:
        self.patterns = ["**/*"] if patterns is None else patterns
        self.language_file_delimiter = (
            ";" if language_file_delimiter is None else language_file_delimiter
        )
        self.template_char_left = (
            "«" if template_char_left is None else template_char_left
        )
        self.template_char_right = (
            "»" if template_char_right is None else template_char_right
        )

    @classmethod
    def from_json_file(cls, path: str) -> "TemplaterConfig":
        with open(path) as file:
            property_map = json.load(file)

            return TemplaterConfig.from_dictionary(property_map)

    @classmethod
    def from_dictionary(cls, property_map: dict) -> "TemplaterConfig":
        patterns = property_map.get("patterns")
        language_file_delimiter = property_map.get("language_file_delimiter")
        template_char_left = property_map.get("template_char_left")
        template_char_right = property_map.get("template_char_right")

        return TemplaterConfig(
            patterns, language_file_delimiter, template_char_left, template_char_right
        )

    def override(
        self,
        language_file_delimiter: str,
        template_char_left: str,
        template_char_right: str,
    ) -> None:
        if language_file_delimiter is not None:
            self.language_file_delimiter = language_file_delimiter
        if template_char_left is not None:
            self.template_char_left = template_char_left
        if template_char_right is not None:
            self.template_char_right = template_char_right


def init() -> tuple[str, str, str, str, str, str, str]:
    parser = argparse.ArgumentParser(
        prog="AdriTemplater",
        description="A python script to template multi language html files",
        epilog="Black cats are the best!",
    )

    parser.add_argument(
        "language_file",
        help="csv file of languages where the headings are the language codes",
    )
    parser.add_argument(
        "input_dir", help="input directory of where the to be templated files are"
    )
    parser.add_argument(
        "output_dir", help="output directory of where the templated files will go"
    )
    parser.add_argument(
        "-d",
        "--language_file_delimiter",
        help="delimiter used in the language csv file",
    )
    parser.add_argument(
        "-l",
        "--template_char_left",
        help="string on the left side of the to be templated string",
    )
    parser.add_argument(
        "-r",
        "--template_char_right",
        help="string on the right side of the to be templated string",
    )
    parser.add_argument("-c", "--config_file", help="path of the configuration file")

    args = parser.parse_args()

    return (
        args.language_file,
        args.input_dir,
        args.output_dir,
        args.language_file_delimiter,
        args.template_char_left,
        args.template_char_right,
        args.config_file,
    )


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
                elif char == "\n":
                    language_map[key_list[word_index]].append(word)
                    break
                else:
                    word += char

        return language_map


def match(input_str: str, end_str: str) -> tuple[str, int]:
    template_match = ""
    index = 0

    while index < len(input_str):
        if input_str[index].isnumeric():
            template_match += input_str[index]
            index += 1
            continue

        if input_str[index] == end_str:
            break

        index += 1

    return template_match, index


def add_string(
    lang_content_map: dict[str, str],
    language_map: dict[str, list[str]],
    string: str,
    variable: bool,
) -> dict[str, str]:
    if variable:
        for key in list(lang_content_map.keys()):
            lang_content_map[key] += language_map[key][int(string)]
    else:
        for key in list(lang_content_map.keys()):
            lang_content_map[key] += string

    return lang_content_map


def template(
    template_file: str, language_map: dict[str, list[str]], left: str, right: str
) -> dict[str, str]:
    templated_strings: dict[str, str] = dict()

    for key in list(language_map.keys()):
        templated_strings[key] = ""

    with open(template_file, encoding="utf-8") as file:
        for line in file.readlines():
            char_index = 0

            while char_index < len(line):
                if line[char_index] == left:
                    match_result = match(line[(char_index + 1) : :], right)
                    templated_strings = add_string(
                        templated_strings, language_map, match_result[0], True
                    )
                    char_index += match_result[1] + 2
                else:
                    templated_strings = add_string(
                        templated_strings, language_map, line[char_index], False
                    )
                    char_index += 1

    return templated_strings


def write(
    templated_strings: dict[str, str], output_dir: str, dir_path: str, file_name: str
) -> None:
    for lang, string in templated_strings.items():
        path = os.path.join(output_dir, lang, dir_path)

        os.makedirs(path, exist_ok=True)

        with open(f"{path}{os.sep}{file_name}", "w") as file:
            file.write(string)


def get_file_paths(root_dir: str, patterns: list) -> set[str]:
    """Returns a Set of all files matching a globbing patterns. Returns all files if no pattern is found"""

    if len(patterns) == 0:
        return get_globbed_files(root_dir, ["**/*"], True, True)

    return get_globbed_files(root_dir, patterns, True, True)


def get_globbed_files(
    root_dir: str, patterns: list, include_hidden: bool, recursive: bool
) -> set[str]:
    files = set()

    for pattern in patterns:
        file_list = glob.glob(
            pattern,
            include_hidden=include_hidden,
            recursive=recursive,
            root_dir=root_dir,
        )

        for file in file_list:
            path_full = os.path.join(root_dir, file)

            if os.path.isfile(os.path.join(path_full)):
                files.add(path_full)

    return files


# TODO: Try to make this not needed
def strip_parent_dir_and_file(path: str) -> tuple[str, str, str]:
    """Returns a tuple of 3 items: upper directory, intermediary directory path, file name"""
    parent_dir_index = path.index(os.sep)
    file_name_index = path.rindex(os.sep)

    parent_dir = path[0:parent_dir_index]
    intermediary_dirs = path[parent_dir_index + 1 : file_name_index]
    file_name = path[file_name_index + 1 : :]

    return (
        parent_dir,
        intermediary_dirs,
        file_name,
    )  # parent_dir output is currently not used


def main(
    language_file: str,
    input_dir: str,
    output_dir: str,
    delimiter: str,
    left: str,
    right: str,
    config_file: str,
) -> None:
    config_file = "templater_config.json" if config_file is None else config_file
    config = None

    if os.path.exists(config_file):
        config = TemplaterConfig.from_json_file(config_file)
        config.override(delimiter, left, right)
    else:
        config = TemplaterConfig(None, delimiter, left, right)

    files_to_template = get_file_paths(input_dir, config.patterns)
    language_map = content_language_mapper(
        language_file, config.language_file_delimiter
    )

    for file_path in files_to_template:
        templated_strings = template(
            file_path,
            language_map,
            config.template_char_left,
            config.template_char_right,
        )
        output_dirs = strip_parent_dir_and_file(file_path)

        write(templated_strings, output_dir, output_dirs[1], output_dirs[2])


if __name__ == "__main__":
    args = init()

    main(args[0], args[1], args[2], args[3], args[4], args[5], args[6])
