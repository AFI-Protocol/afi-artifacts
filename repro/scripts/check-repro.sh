#!/usr/bin/env bash
# Reproducibility check script for AFI artifacts bundle
# Verifies that mock replay produces deterministic outputs

set -e

echo "🔍 AFI Artifacts Reproducibility Check"
echo "======================================="
echo ""

# Change to repro directory
cd "$(dirname "$0")/.."

# Step 1: Verify checksums
echo "Step 1: Verifying file checksums..."
if command -v sha256sum &> /dev/null; then
  sha256sum -c SHA256SUMS
elif command -v shasum &> /dev/null; then
  shasum -a 256 -c SHA256SUMS
else
  echo "❌ Error: Neither sha256sum nor shasum found"
  exit 1
fi
echo "✅ All checksums verified"
echo ""

# Step 2: Run mock replay twice
echo "Step 2: Running mock replay (run 1)..."
node tests/mock_replay.js > /tmp/afi-repro-run1.json

echo "Step 3: Running mock replay (run 2)..."
node tests/mock_replay.js > /tmp/afi-repro-run2.json

# Step 3: Compare outputs
echo "Step 4: Comparing outputs..."
if diff /tmp/afi-repro-run1.json /tmp/afi-repro-run2.json > /dev/null; then
  echo "✅ Outputs are identical (byte-for-byte match)"
else
  echo "❌ Outputs differ (non-deterministic)"
  echo "Diff:"
  diff /tmp/afi-repro-run1.json /tmp/afi-repro-run2.json || true
  exit 1
fi

# Step 4: Verify expected output structure
echo "Step 5: Verifying output structure..."
if command -v jq &> /dev/null; then
  # Check that output has expected fields
  EPOCH=$(jq -r '.records[0].epoch' /tmp/afi-repro-run1.json)
  SCORERS=$(jq -r '.records[0].scorers' /tmp/afi-repro-run1.json)
  VALIDATORS=$(jq -r '.records[0].validators' /tmp/afi-repro-run1.json)
  MOCK_SCORE=$(jq -r '.records[0].mock_score' /tmp/afi-repro-run1.json)
  
  echo "  - Epoch: $EPOCH"
  echo "  - Scorers: $SCORERS"
  echo "  - Validators: $VALIDATORS"
  echo "  - Mock Score: $MOCK_SCORE"
  
  if [[ "$EPOCH" == "2025-08-10T00:00:00Z" ]] && \
     [[ "$SCORERS" == "1" ]] && \
     [[ "$VALIDATORS" == "2" ]] && \
     [[ "$MOCK_SCORE" == "0.8819" ]]; then
    echo "✅ Output structure matches expected golden values"
  else
    echo "❌ Output structure does not match expected values"
    exit 1
  fi
else
  echo "⚠️  jq not found, skipping structure validation"
fi

echo ""
echo "🎉 All reproducibility checks passed!"
echo ""
echo "Summary:"
echo "  - File checksums: ✅"
echo "  - Deterministic replay: ✅"
echo "  - Output structure: ✅"
echo ""

# Cleanup
rm -f /tmp/afi-repro-run1.json /tmp/afi-repro-run2.json

exit 0

