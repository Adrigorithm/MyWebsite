import os
from shutil import copyfile
from uuid import uuid4
from zipfile import ZipFile

INPUT_FILE_NAME = "index.html"
INPUT_FILE_NAME_TEMP = "index-temp.html"
OUTPUT_FILE_NAME = "index-output.html"
CSS_FILE_MATCH = 'rel="stylesheet"'
CSS_FILE_NAME = f"style-{uuid4().int}.css"

html_input_file = open(INPUT_FILE_NAME)
html_output_file = open(OUTPUT_FILE_NAME, "w")

done = False
sed = False
in_match = False
match_length = 0
position = 0
uid_old = ""

for char in html_input_file.read():
    if done:
        html_output_file.write(char)
        continue

    if sed:
        if char.isnumeric():
            uid_old.join(char)

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

old_css_file = f"style-{uid_old}.css"

if len(uid_old) == 0 or not os.path.exists(old_css_file):
    old_css_file = "style.css"

os.rename(INPUT_FILE_NAME, INPUT_FILE_NAME_TEMP)
os.rename(OUTPUT_FILE_NAME, INPUT_FILE_NAME)
copyfile(old_css_file, CSS_FILE_NAME)

with ZipFile("archive.zip", "w") as z:
    z.write("android-chrome-*")
    z.write("apple-touch-icon.png")
    z.write("favicon*")
    z.write("images/")
    z.write(INPUT_FILE_NAME)
    z.write("inter_var.woff2")
    z.write("scripts/")
    z.write("site.webmanifest")
    z.write(CSS_FILE_NAME)
    z.write("videos/")

os.rename(INPUT_FILE_NAME_TEMP, INPUT_FILE_NAME)
os.remove(CSS_FILE_NAME)
