import fs from "node:fs";
import path from "node:path";
import {
  AnchorProvider,
  BN,
  Program,
  setProvider,
} from "@anchor-lang/core";
import { PublicKey, SystemProgram } from "@solana/web3.js";

const provider = AnchorProvider.env();
setProvider(provider);

const idlPath = path.resolve("target/idl/manuscript_ideas.json");
const idl = JSON.parse(fs.readFileSync(idlPath, "utf8"));
const program = new Program(idl, provider);

const ideaId = new BN(Date.now().toString());
const ideaType = 0;
const text = "Manuscript Devnet smoke test: first on-chain idea record.";

const [ideaPda] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("idea"),
    ideaId.toArrayLike(Buffer, "le", 8),
  ],
  program.programId,
);

const signature = await program.methods
  .recordIdea(ideaId, ideaType, text)
  .accounts({
    idea: ideaPda,
    author: provider.wallet.publicKey,
    systemProgram: SystemProgram.programId,
  })
  .rpc();

const record = await program.account.idea.fetch(ideaPda);

const result = {
  cluster: "devnet",
  programId: program.programId.toBase58(),
  transactionSignature: signature,
  ideaAccount: ideaPda.toBase58(),
  record: {
    author: record.author.toBase58(),
    ideaId: record.ideaId.toString(),
    ideaType: record.ideaType,
    createdAt: record.createdAt.toString(),
    text: record.text,
  },
  verifiedReadBack:
    record.author.equals(provider.wallet.publicKey) &&
    record.ideaId.eq(ideaId) &&
    record.ideaType === ideaType &&
    record.text === text,
};

if (!result.verifiedReadBack) {
  throw new Error("Devnet read-back verification failed");
}

fs.writeFileSync(
  "devnet-deployment.json",
  JSON.stringify(result, null, 2) + "\n",
);

console.log(JSON.stringify(result, null, 2));
