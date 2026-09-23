# Manuscript — Solana test program

This folder contains the first minimal on-chain implementation for Manuscript.

## What v0.1 does

The program exposes one instruction: record_idea.

It creates a new PDA account containing:

- author wallet;
- Manuscript idea ID;
- idea type: humans or robots;
- blockchain timestamp;
- idea text;
- PDA bump.

There is intentionally no update or delete instruction in v0.1.

That makes the first implementation append-only at the program-interface level: a recorded idea is created once and then only read.

## Why Solana is used here

Blockchain is infrastructure, not the center of Manuscript.

For this first test it is used for:

1. timestamping the record;
2. preserving a public transaction history;
3. binding the record to the wallet that signed it;
4. making silent replacement of the original record difficult.

This is evidence of recording/origin. It is not a legal patent and does not by itself create intellectual-property rights.

## Current toolchain

- Anchor CLI 1.2.0
- Solana CLI 4.1.2
- Rust 2021 edition

## Important: program ID

The repository currently contains the placeholder program ID 11111111111111111111111111111111.

Before the first build/deploy with a real program keypair, generate or restore the program keypair and synchronize the program ID.

Typical local flow:

    cd solana
    mkdir -p target/deploy
    solana-keygen new --outfile target/deploy/manuscript_ideas-keypair.json --no-bip39-passphrase
    anchor keys sync
    anchor build

Do not commit the generated deployment keypair.

## Devnet deployment

    solana config set --url devnet
    solana airdrop 2
    cd solana
    anchor build
    anchor deploy

After deployment, the next Manuscript step is a small client that connects a wallet, generates a unique idea_id, calls record_idea, reads the created PDA account back, and displays the confirmed record in the existing frontend.

## Current scope

Not included yet:

- MAN token;
- likes;
- Identity;
- sponsored transaction fees;
- TON adapter;
- VPS backend/indexer;
- cross-chain logic.

Those are deliberately kept out of the first contract test.
