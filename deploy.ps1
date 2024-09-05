$deployDir = "../Adrigorithm.github.io"
$CSSFileName = "finalV1.css";

if (Test-Path -Path "$($deployDir)/assets/css/final*.css")
{
    [void]($(Get-Item -Path "$($deployDir)/assets/css/finalV*.css").Name -match "finalV(\d+).css");

    $newCSSVersion = [int]::Parse($Matches.Item(1)) + 1;
    $CSSFileName = "finalV$($newCSSVersion).css";
}

Remove-Item -Path "$($deployDir)/*" -Recurse -Exclude ".git", ".gitignore", "LICENCE", "README.md";

Copy-Item -Path './*' -Destination $deployDir -Recurse -Exclude ".git", ".vscode", "*.css", "node_modules", ".gitignore", "deploy.ps1", "LICENCE", "package.json", "pnpm-lock.yaml", "README.md", "tailwind.config.js";
Copy-Item -Path "./assets/css/final.css" -Destination "$($deployDir)/assets/css/$CSSFileName";
