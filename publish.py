import os
from uuid import uuid4

INPUT_FILE_NAME = "index_temp.html"
OUTPUT_FILE_NAME = "index_temp.html"
CSS_FILE_MATCH = 'rel="stylesheet"'
CSS_FILE_NAME = f"style-{uuid4().int}.css"

html_input_file = open(INPUT_FILE_NAME)
html_output_file = open(OUTPUT_FILE_NAME, "w")

done = False
sed = False
in_match = False
match_length = 0
position = 0

for char in html_input_file.read():
    if done:
        html_output_file.write(char)
        continue

    if sed:
        if char == os.linesep:
            done = True
            continue

    if match_length == len(CSS_FILE_MATCH):
        html_output_file.write(f' href="{CSS_FILE_NAME}" />{os.linesep}')
        sed = True
        continue

    if char == CSS_FILE_MATCH[match_length]:
        match_length += 1
        html_output_file.write(char)
        continue

    match_length = 0

html_input_file.close()
html_output_file.close()

os.remove(INPUT_FILE_NAME)
os.rename(OUTPUT_FILE_NAME, INPUT_FILE_NAME)
