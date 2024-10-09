{ pkgs ? import <nixpkgs> {} }:

let
  lib = pkgs.lib;
  vscodeExtensions = [
    "xdebug.php-pack"
  ];
in
pkgs.mkShell {
  nativeBuildInputs = with pkgs.buildPackages; [ php83 symfony-cli php83Packages.composer ];
  
  shellHook = ''
    for ext in ${lib.concatStringsSep " " vscodeExtensions}; do
      code --install-extension $ext || true
    done
  '';
}
