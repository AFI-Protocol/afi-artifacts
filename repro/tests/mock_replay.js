// Deterministic mock replay for AFI paper artifact bundle
// Pure CommonJS version (no warnings).
// Reads Codex manifest and vault-ready record, then outputs a reproducible mock score.

const fs = require("fs");
const crypto = require("crypto");

// Load Codex manifest (visible twin for simplicity)
const codex = JSON.parse(fs.readFileSync("codex/afi-codex.json", "utf8"));

// Read JSONL and compute deterministic mock score
const lines = fs.readFileSync("data/examples/vault-ready-record.jsonl", "utf8")
  .split("\n")
  .filter(Boolean);

const records = lines.map((line, i) => {
  const h = crypto.createHash("sha256").update(line + String(codex.epoch)).digest("hex");
  const score = (parseInt(h.slice(0, 8), 16) % 10000) / 10000;
  return {
    index: i,
    epoch: codex.epoch,
    scorers: Array.isArray(codex.scorers) ? codex.scorers.length : 0,
    validators: Array.isArray(codex.validators) ? codex.validators.length : 0,
    mock_score: Number(score.toFixed(4))
  };
});

console.log(JSON.stringify({ records }, null, 2));