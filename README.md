# AFI Artifacts — Paper Reproducibility Bundle

This repository hosts the **frozen, citable artifacts** that accompany the paper **_Agentic Financial Intelligence_**.  
It’s designed so reviewers and readers can verify the claims in the paper without cloning multiple codebases.

> If you're here from SSRN/arXiv: start with the **Releases** page for the `paper-2025-v2` bundle.

---

## What’s in this repo?

```
repro/
  README.md                        # how to use this bundle
  schemas/
    universal_signal_ingestion.schema.json   # Appendix A.1
    vaulted_tssd.schema.json                 # Appendix A.2
    universal_proposal_schema.json           # Appendix A.3
  codex/
    .afi-codex.json                 # hidden file (macOS/Linux); cited in the paper
    afi-codex.json                  # visible twin; identical content for convenience
  data/
    examples/
      vault-ready-record.jsonl      # Appendix B canonical example
      valid-proposal.json           # governance example
  tests/
    replay_smoke_test.md            # quick verification steps
  SHA256SUMS                        # integrity hashes for every file in repro/
paper/
  AFI_SSRN_SSRNready.pdf            # (optional) paper PDF for convenience
```

- The **Releases** section also provides a zipped copy of this tree (the *Repro Pack*), tied to a specific tag for reproducibility.
- **No private keys, API tokens or internal endpoints** are stored here.

---

## Quick start

1. Download the **`paper-2025-v2`** release assets (ZIP + checksum).
2. Unzip and browse `repro/` — schemas, examples, codex.
3. Open `repro/README.md` and follow the **Replay Smoke Test**.

> Hidden files note: macOS Finder hides dotfiles by default. Press **⌘ Shift .** to toggle visibility and see `.afi-codex.json`.

---

## Verify integrity (recommended)

```bash
# macOS (built-in)
shasum -a 256 afi-paper-artifact-bundle.zip

# Linux (coreutils)
sha256sum afi-paper-artifact-bundle.zip

# Compare the output with the matching line in repro/SHA256SUMS
```

Matching hashes confirm the ZIP you downloaded is identical to the one we published.

---

## Appendix → Repository map

- **Appendix A: Schema Specification Snapshots**
  - **A.1** Universal Signal (ingestion): `repro/schemas/universal_signal_ingestion.schema.json`
  - **A.2** Vaulted T.S.S.D.: `repro/schemas/vaulted_tssd.schema.json`
  - **A.3** Universal Proposal: `repro/schemas/universal_proposal_schema.json`
- **Appendix B: Vault-Ready Record (single example)**  
  `repro/data/examples/vault-ready-record.jsonl`
- **Appendix C: Codex / Replay Manifest (example)**  
  `repro/codex/.afi-codex.json` (hidden) and `repro/codex/afi-codex.json` (visible)
- **Appendix D / E (Policy Note, EU AI Act timeline):** live in the paper PDF.

---

## Reproducible replay (minimal)

1. Inspect `repro/codex/.afi-codex.json` (or `afi-codex.json`).  
2. Validate `repro/data/examples/vault-ready-record.jsonl` against `repro/schemas/vaulted_tssd.schema.json`.  
3. Run your own scorer/validator stack with the example; record outputs + attestations.  
4. Confirm you can reconstruct the decision trail using the codex manifest.

> This repo provides **specs and examples**; it does not ship proprietary models or production keys.

---

## Versioning & releases

- Each paper-ready snapshot is published as a **tagged release** (e.g., `paper-2025-v2`) with a zipped **Repro Pack** attached.
- The repository tree mirrors the same content for easy browsing.
- When we need to publish minor documentation fixes without altering the cited artifacts, we’ll use a dot-suffix (e.g., `paper-2025-v2.1`).

---

## Citation

Cite the paper and (if available) the Zenodo DOI for this artifact bundle:

- AFI-Protocol (2025). **AFI Paper Artifact Bundle (paper-2025-v2)**. Zenodo. https://doi.org/10.5281/zenodo.XXXXXXX  
- _Agentic Financial Intelligence_. (SSRN / arXiv)

A `CITATION.cff` file is included for citation managers.

---

## License

Unless otherwise noted, content in this repository is released under the **MIT License** (see `LICENSE`).  
Schemas/examples are provided “as-is” for research and reproducibility.

---

## Questions / issues

Please open a GitHub issue with a minimal reproduction (schema + example) and we’ll take a look.  
PRs improving documentation or adding validation instructions are welcome.
