# AFI Artifacts — Paper Reproducibility Bundle (snapshot: paper-2025-v2.2)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.16857347.svg)](https://doi.org/10.5281/zenodo.16857347)  
**Release tag:** [`paper-2025-v2.2`](https://github.com/AFI-Protocol/afi-artifacts/releases/tag/paper-2025-v2.2)

---

## Overview  

This repository contains the **official reproducibility bundle** for the AFI Protocol paper. It ensures that readers, reviewers, and developers can replicate results, inspect schemas, and verify codex integrity.  

The **canonical release bundle** for v2.2 is packaged in the [release ZIP](https://github.com/AFI-Protocol/afi-artifacts/releases/tag/paper-2025-v2.2), and it matches the Zenodo snapshot.  

---

## What’s in this repo (actual v2.2 snapshot)  

```
repro/
  README.md
  schemas/
    universal_signal_ingestion.schema.json
    vaulted_tssd.schema.json
    universal_proposal_schema.json
  codex/
    .afi-codex.json      # hidden on macOS/Linux
    afi-codex.json       # visible twin
  data/examples/
    vault-ready-record.jsonl
    valid-proposal.json
  tests/
    replay_smoke_test.md
  tools/replay/afi-replay.js
  SHA256SUMS
```

---

## Quick Start  

1. Download the [release asset ZIP](https://github.com/AFI-Protocol/afi-artifacts/releases/tag/paper-2025-v2.2).  
2. Verify integrity (optional):  
   ```bash
   shasum -a 256 afi-paper-artifact-bundle__paper-2025-v2.2.zip
   # Expected: 7ad552c107a4cc6999ccaad51bdf93b5c990defb286f88e7c85312a5a53bb9c9
   ```  
3. Unzip and open `repro/README.md` to follow instructions.  
4. Run the Replay Smoke Test to confirm reproducibility.  
5. On macOS Finder, press **⌘⇧.** to reveal hidden files like `.afi-codex.json`.  

---

## Citation  

- AFI-Protocol (2025). **AFI Paper Artifact Bundle (paper-2025-v2.2)** [Software]. Zenodo. https://doi.org/10.5281/zenodo.16857347  
- *Agentic Financial Intelligence* (SSRN / arXiv)  

---

## Notes  

- v2.2 is the **canonical release** — prior layout differences (v2.1) are no longer relevant.  
- The **codex** is the authoritative registry of schema + replay context.  
