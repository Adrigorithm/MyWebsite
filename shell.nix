{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  nativeBuildInputs = with pkgs.buildPackages; [ nodejs python3 nixd nil ];

  shellHook = 
  ''
    npm install 
  '';
}

