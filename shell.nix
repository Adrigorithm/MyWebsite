{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  nativeBuildInputs = with pkgs.buildPackages; [ pnpm tailwindcss_4 typescript python3 nil nixd zip ];
}

