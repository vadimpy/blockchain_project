# Infinity Cube

This is the Solana code! Open the other branch for web3 front end code

1) [Install Rust toolchain](https://www.rust-lang.org/tools/install)
2) [Install Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
3) Clone repo and run:
```shell
    cd InfinityCube/sol_program
    cargo build-bpf
    cargo test-bpf
```
4. Go to some dir and run ```solana-test-validator -r``` (make sure it runs locally)
5. Run ```solana logs``` from another terminal (make sure you see no logs for now)
6. Run
```shell
    solana program deploy \
        sol_program/target/deploy/infinity_cube.so \
        --program-id py_scripts/keypair.json 
```
7. Now you can test JS applications ([Look Solana W3](https://solana-labs.github.io/solana-web3.js/modules.html)) against this program. Also you can look [helloworld example](https://github.com/solana-labs/example-helloworld).