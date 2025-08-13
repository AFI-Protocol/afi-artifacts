# AFI Artifacts — Paper Reproducibility Bundle (snapshot: paper-2025-v2.1)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.16857347.svg)](https://doi.org/10.5281/zenodo.16857347)
**Release tag:** [`paper-2025-v2.1`](https://github.com/AFI-Protocol/afi-artifacts/releases/tag/paper-2025-v2.1)

> **Heads-up (to avoid confusion):** The **release asset ZIP** contains the *canonical* bundle used in the paper.  
> The **repo tree at tag v2.1** (and the Zenodo snapshot of that tag) reflects an **earlier layout** with different filenames.  
> Both contain equivalent information; the names just differ. A mapping is provided below.

---

## What’s in this repo (actual v2.1 snapshot)

```
repro/
  codex/
    afi-codex.json
  data/
    examples/
      valid-proposal.json
      sample_tssd.json
  schemas/
    UNIVERSAL_PROPOSAL_SCHEMA.md
    universal_proposal_schema.mjs
    universal_signal_schema.mjs
    vaulted_signal_schema.mjs
  tests/
    README.md
  tools/
    replay/
      afi-replay.js
```

---

## Canonical bundle (in the release ZIP)

The *release asset* for v2.1 contains the canonical bundle referenced in the paper:

```
repro/
  README.md
  schemas/
    universal_signal_ingestion.schema.json
    vaulted_tssd.schema.json
    universal_proposal_schema.json
  codex/
    .afi-codex.json      # hidden on macOS/Linux
    afi-codex.json       # visible twin; identical content
  data/
    examples/
      vault-ready-record.jsonl
      valid-proposal.json
  tests/
    replay_smoke_test.md
  SHA256SUMS
```

---

## Name mapping: paper ↔ v2.1 snapshot

- `repro/schemas/universal_signal_ingestion.schema.json`  ↔  `repro/schemas/universal_signal_schema.mjs`
- `repro/schemas/vaulted_tssd.schema.json`                ↔  `repro/schemas/vaulted_signal_schema.mjs`
- `repro/schemas/universal_proposal_schema.json`          ↔  `repro/schemas/universal_proposal_schema.mjs` (+ doc: `UNIVERSAL_PROPOSAL_SCHEMA.md`)
- `repro/data/examples/vault-ready-record.jsonl`          ↔  `repro/data/examples/sample_tssd.json`
- `repro/tests/replay_smoke_test.md`                      ↔  `repro/tests/README.md`
- `.afi-codex.json` (hidden)                              ↔  `repro/codex/afi-codex.json` (visible)

**Implication for readers:** If you’re browsing the repo or Zenodo snapshot, use the **right-hand** names above.  
If you’re following the **paper** or the **release ZIP**, use the **left-hand** names.

---

## Quick start (recommended path)

1. Download the **release asset ZIP** for [`paper-2025-v2.1`](https://github.com/AFI-Protocol/afi-artifacts/releases/tag/paper-2025-v2.1).
2. Verify integrity (optional):
   ```bash
   shasum -a 256 afi-paper-artifact-bundle__paper-2025-v2.zip
   # Expected: f2a69461c536cb82541d6f0e3d568c6b93dd4894fc6d1f5bba04cf7ddec3c533
   ```
3. Unzip and open `repro/README.md` for instructions and the Replay Smoke Test.
4. On macOS Finder, press **⌘⇧.** to reveal hidden files like `.afi-codex.json`.

---

## Appendix → Repository map (for the **v2.1 snapshot**)

- **Appendix A (Schema snapshots)**
  - A.1 Universal Signal (ingestion): `repro/schemas/universal_signal_schema.mjs`
  - A.2 Vaulted T.S.S.D.: `repro/schemas/vaulted_signal_schema.mjs`
  - A.3 Universal Proposal: `repro/schemas/universal_proposal_schema.mjs`  
    (doc: `repro/schemas/UNIVERSAL_PROPOSAL_SCHEMA.md`)
- **Appendix B (Vault-ready example)**: `repro/data/examples/sample_tssd.json`
- **Appendix C (Codex / Replay manifest)**: `repro/codex/afi-codex.json`
- **Appendix D/E** live in the paper PDF.

---

## Citation

- AFI-Protocol (2025). **AFI Paper Artifact Bundle (paper-2025-v2.1)** [Software]. Zenodo. https://doi.org/10.5281/zenodo.16857347  
- *Agentic Financial Intelligence* (SSRN / arXiv)

A `CITATION.cff` file is included for citation managers.

---

## Why not retag?

We could re-cut a `paper-2025-v2.2` so the **repo tree / Zenodo archive** match the **canonical filenames** exactly.  
That would mint a **new DOI**. To keep the DOI stable, we’re documenting the mapping here.
