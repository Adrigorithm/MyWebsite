import os
from shutil import copyfile
from uuid import uuid4
from zipfile import ZipFile

INPUT_FILE_NAME = "index.html"
INPUT_FILE_NAME_TEMP = "index-temp.html"
OUTPUT_FILE_NAME = "index-output.html"
CSS_FILE_MATCH = 'rel="stylesheet"'
CSS_FILE_NAME = "style.css"
CSS_FILE_NAME_TEMP = f"style-{uuid4().int}.css"

html_input_file = open(INPUT_FILE_NAME)
html_output_file = open(OUTPUT_FILE_NAME, "w")

done = False
sed = False
in_match = False
match_length = 0

for char in html_input_file.read():
    if done:
        html_output_file.write(char)
        continue

    if sed:
        if char == os.linesep:
            done = True

        continue

    if match_length == len(CSS_FILE_MATCH):
        html_output_file.write(
            f'{CSS_FILE_MATCH} href="{CSS_FILE_NAME_TEMP}" />{os.linesep}'
        )
        sed = True
        continue

    if char == CSS_FILE_MATCH[match_length]:
        match_length += 1
        continue

    html_output_file.write(char)
    match_length = 0

html_input_file.close()
html_output_file.close()

os.rename(INPUT_FILE_NAME, INPUT_FILE_NAME_TEMP)
os.rename(OUTPUT_FILE_NAME, INPUT_FILE_NAME)
copyfile(CSS_FILE_NAME, CSS_FILE_NAME_TEMP)

with ZipFile("archive.zip", "w") as z:
    z.write("android-chrome-192x192.png")
    z.write("android-chrome-512x512.png")
    z.write("apple-touch-icon.png")
    z.write("favicon.ico")
    z.write("favicon-16x16.png")
    z.write("favicon-32x32.png")

    for f in os.listdir("images"):
        z.write(f"images/{f}")

    for f in os.listdir("scripts"):
        z.write(f"scripts/{f}")

    z.write(INPUT_FILE_NAME)
    z.write("inter_var.woff2")
    z.write("site.webmanifest")
    z.write(CSS_FILE_NAME_TEMP)

os.rename(INPUT_FILE_NAME_TEMP, INPUT_FILE_NAME)
os.remove(CSS_FILE_NAME_TEMP)
