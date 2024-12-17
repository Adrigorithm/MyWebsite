{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [ pkgs.git pkgs.vscodium pkgs.python314 pkgs.tailwindcss ];

  shellHook = ''
    codium --install-extension bradlc.vscode-tailwindcss --force
    codium --install-extension jnoortheen.nix-ide --force
  '';
}

