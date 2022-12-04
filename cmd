run
python3 -m http.server --bind 127.0.0.1 9000

build css
npx tailwindcss -i ./assets/css/style.css -o ./assets/css/final.css --watch
