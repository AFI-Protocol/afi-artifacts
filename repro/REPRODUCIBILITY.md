# Reproducibility Guide

This document defines reproducibility requirements for the AFI artifacts bundle.

## What is "Reproducible"?

A reproducible artifact bundle means:

1. **Deterministic Outputs**: Running the same script with the same inputs produces byte-for-byte identical outputs
2. **Verifiable Checksums**: All golden files have SHA256 checksums that can be verified
3. **Seeded Randomness**: Any randomness uses fixed seeds from the Codex manifest
4. **Stable Formatting**: JSON outputs use consistent formatting (2-space indent, sorted keys where applicable)
5. **No Timestamps**: Outputs do not include runtime timestamps or system-dependent metadata

## Required Environment

- **Node.js**: ≥ 18.0.0
- **OS**: macOS, Linux, or Windows (cross-platform compatible)
- **Optional**: `jq` for JSON validation and pretty-printing

## Environment Variables

None required. All configuration comes from the Codex manifest (`codex/afi-codex.json`).

## Commands to Run

### Full Reproducibility Check

```bash
cd repro
./scripts/check-repro.sh
```

This script:
1. Verifies SHA256 checksums of all golden files
2. Runs mock replay twice
3. Compares outputs byte-for-byte
4. Validates output structure against expected values
5. Exits with code 0 on success, non-zero on failure

### Manual Verification

```bash
cd repro

# Run mock replay
node tests/mock_replay.js

# Expected output (deterministic):
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

### Verify Checksums Only

```bash
cd repro
shasum -a 256 -c SHA256SUMS
```

## Expected Outputs

### Mock Replay Output

- **File**: Generated to stdout (can be redirected to file)
- **Format**: JSON with 2-space indentation
- **Determinism**: Byte-for-byte identical across runs
- **Golden Hash**: Not stored (generated on-demand)

### Key Fields

- `epoch`: From Codex manifest (`2025-08-10T00:00:00Z`)
- `scorers`: Count of scorers in Codex (1)
- `validators`: Count of validators in Codex (2)
- `mock_score`: Deterministic hash-based score (0.8819)

## How Randomness is Seeded

The Codex manifest (`codex/afi-codex.json`) contains:

```json
{
  "replay": {
    "seed": 42,
    "deterministic": true
  }
}
```

The mock replay script uses:
- **Deterministic hashing**: SHA256 of (JSONL line + epoch)
- **Fixed precision**: Scores rounded to 4 decimal places
- **No random number generation**: All values derived from input data

## Pass/Fail Criteria

### ✅ Pass

- All SHA256 checksums match
- Mock replay produces identical output on multiple runs
- Output structure matches expected schema
- All required fields present with correct values

### ❌ Fail

- Checksum mismatch (file corruption or modification)
- Non-deterministic output (timestamps, random values, unstable ordering)
- Missing or incorrect fields in output
- Script exits with non-zero code

## Known Limitations

- **No Full Pipeline**: This bundle contains validation scripts only, not the full AFI scoring/validation pipeline
- **Mock Scoring**: The `mock_score` is a deterministic hash, not a real signal score
- **Single Record**: Example data contains only one vault-ready record

## Troubleshooting

### Checksum Failures

If checksums fail, verify:
1. Files have not been modified
2. Line endings are consistent (LF, not CRLF)
3. No trailing whitespace added

### Non-Deterministic Output

If outputs differ between runs:
1. Check that Codex manifest has not changed
2. Verify input data files are identical
3. Ensure no system timestamps are being injected

### Script Errors

If the check script fails:
1. Verify Node.js version: `node -v` (should be ≥ 18)
2. Check working directory: Must run from `repro/` directory
3. Ensure script is executable: `chmod +x scripts/check-repro.sh`

## CI Integration

To add reproducibility checks to CI:

```yaml
- name: Reproducibility Check
  run: |
    cd repro
    ./scripts/check-repro.sh
```

See `.github/workflows/` for examples (if CI is configured).

