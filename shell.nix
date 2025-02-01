{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [ pkgs.git pkgs.python314 pkgs.pnpm pkgs.tailwindcss pkgs.vscodium ];

  shellHook = ''
    codium --install-extension bradlc.vscode-tailwindcss --force
    codium --install-extension jnoortheen.nix-ide --force
    pnmp install
  '';
}
