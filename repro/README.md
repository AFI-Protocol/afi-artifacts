# AFI Paper Repro Pack (paper-2025-v2.1)

This bundle contains the minimal replication artifacts referenced in *Agentic Financial Intelligence* (SSRN Q3 2025).  
It is a **validation pack**: schemas, example records, Codex manifest, and a deterministic mock replay.  
It does **not** include the AFI runtime, scorers, or DAG engine.

## What’s here
- `schemas/` — minimal JSON Schemas for snapshots shown in Appendix A (A.1/A.2/A.3).
- `codex/.afi-codex.json` — example replay manifest used in Appendix C (hidden on macOS/Linux; visible twin also included).
- `data/examples/` — a single **vault-ready** JSONL record (Appendix B) and a **valid proposal** example.
- `tests/replay_smoke_test.md` — step-by-step smoke test (schema validation + deterministic mock replay).
- `tests/mock_replay.js` — produces a reproducible “mock score” to demonstrate Codex/record wiring without the AFI engine.

## Quick Start (from `repro/`)
```bash
# Verify integrity
shasum -a 256 -c SHA256SUMS

# Validate example record against schema
while IFS= read -r l; do printf '%s\n' "$l" > /tmp/_afi_line.json; \
  npx --yes ajv-cli validate -s schemas/vaulted_tssd.schema.json -d /tmp/_afi_line.json || exit 1; \
done < data/examples/vault-ready-record.jsonl
echo "All JSONL lines valid ✅"

# Optional: deterministic mock replay
node tests/mock_replay.js
