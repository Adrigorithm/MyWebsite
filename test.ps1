$file1 = Get-Item -Path .\index.html;
$file2 = Get-Item -Path .\cat\index.html;

if ($(Get-FileHash $file1 -Algorithm SHA1).Hash -eq $(Get-FileHash $file2 -Algorithm SHA1).Hash){
    Write-Output "No changes";
} else{
    Write-Output "changes";
}