{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  nativeBuildInputs = with pkgs.buildPackages; [ nodejs_25 python315 nixd nil ];

  shellHook = 
  ''
    npm install 
  '';
}

