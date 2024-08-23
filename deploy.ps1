# Remove cached items
$currentCSSVersion = $(Get-Item -Path "../Adrigorithm.github.io/assets/css/*.css").Name[-5];
$newCSSVersion = [int]::Parse($currentCSSVersion) + 1;

Remove-Item -Path "../Adrigorithm.github.io/assets/css/*";
Copy-Item -Path "./assets/css/final.css" -Destination "../Adrigorithm.github.io/assets/css/finalV$newCSSVersion.css";

# Copy all content
Copy-Item -Path "./index.html" -Destination "../Adrigorithm.github.io/index.html";
Copy-Item -Path "./cat/index.html" -Destination "../Adrigorithm.github.io/cat/index.html";
Copy-Item -Path "./nl_be/index.html" -Destination "../Adrigorithm.github.io/nl_be/index.html";
Copy-Item -Path "./assets/*" -Destination "../Adrigorithm.github.io/assets/" -Exclude "css" -Recurse;