{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [ pkgs.git pkgs.python314 pkgs.nodejs_23 pkgs.pnpm ];

  shellHook = ''
    codium --install-extension bradlc.vscode-tailwindcss --force
    codium --install-extension jnoortheen.nix-ide --force
    pnpm install
  '';
}
