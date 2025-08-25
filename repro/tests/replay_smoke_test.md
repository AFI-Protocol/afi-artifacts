# Replay Smoke Test (Minimal, Reproducible)

**Scope:** This bundle verifies schema compliance and demonstrates how a replay would be wired via the Codex.  
It does **not** include AFI scorers or the DAG runtime — those remain out of scope for this artifact.

**Prereqs:**  
- Node ≥ 18 (`node -v`)  
- Optional: `jq` for pretty-printing JSON  
- Run all commands from the `repro/` directory  

---

## 1) Confirm Codex manifest presence (hidden file)
```bash
ls -la codex
```
You should see both:
- `codex/.afi-codex.json` (hidden on macOS/Linux)  
- `codex/afi-codex.json` (visible twin)  

---

## 2) Validate the example vault record against the schema

**macOS/Linux (bash):**
```bash
while IFS= read -r line; do
  printf '%s\n' "$line" > /tmp/_afi_line.json
  npx --yes ajv-cli validate \
    -s schemas/vaulted_tssd.schema.json \
    -d /tmp/_afi_line.json || exit 1
done < data/examples/vault-ready-record.jsonl
echo "All JSONL lines valid ✅"
```

**Windows (PowerShell):**
```powershell
Get-Content data/examples/vault-ready-record.jsonl | ForEach-Object {
  $_ | Out-File -FilePath $env:TEMP\_afi_line.json -Encoding utf8
  npx --yes ajv-cli validate `
    -s schemas/vaulted_tssd.schema.json `
    -d $env:TEMP\_afi_line.json
  if ($LASTEXITCODE -ne 0) { exit 1 }
}
Write-Output "All JSONL lines valid ✅"
```

**Expected:** Validation succeeds and prints `All JSONL lines valid ✅`.

---

## 3) Optional: Deterministic mock replay (no AFI engine required)
```bash
node tests/mock_replay.js
```

**Expected:**  
- Includes `epoch` from the Codex manifest  
- Counts of `scorers` and `validators`  
- A stable `mock_score` between `0.0000–0.9999`

Example:
```json
{
  "records": [
    {
      "index": 0,
      "epoch": "2025-08-10T00:00:00Z",
      "scorers": 1,
      "validators": 2,
      "mock_score": 0.8819
    }
  ]
}
```

---

## 4) Optional: Inspect Codex fields
```bash
jq . codex/afi-codex.json >/dev/null 2>&1 || true
jq . codex/.afi-codex.json >/dev/null 2>&1 || true
```

---

### Notes
- This is a **validation pack** (schemas + examples + deterministic mock replay), not the full AFI runtime.  
- For complete pipeline replays (scoring modules, DAG execution, validator attestations), use the AFI engine (out of scope here).  
- All commands above are cross-platform tested and require only Node and `npx ajv-cli`.