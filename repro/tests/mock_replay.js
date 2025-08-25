// Minimal, deterministic mock replay (no AFI engine needed)
const fs = require('fs');
const crypto = require('crypto');

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const codex = readJSON('codex/afi-codex.json');
const jsonl = fs.readFileSync('data/examples/vault-ready-record.jsonl', 'utf8')
  .split('\n')
  .filter(Boolean);

const outputs = jsonl.map((line, i) => {
  const h = crypto.createHash('sha256').update(line + String(codex.epoch)).digest('hex');
  const score = (parseInt(h.slice(0, 8), 16) % 10000) / 10000; // 0.0000–0.9999
  return {
    index: i,
    epoch: codex.epoch,
    scorers: Array.isArray(codex.scorers) ? codex.scorers.length : 0,
    validators: Array.isArray(codex.validators) ? codex.validators.length : 0,
    mock_score: Number(score.toFixed(4)),
  };
});

console.log(JSON.stringify({ records: outputs }, null, 2));