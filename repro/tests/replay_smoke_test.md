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