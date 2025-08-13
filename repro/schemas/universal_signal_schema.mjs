// AFI — Universal Signal (INGESTION SNAPSHOT)
// Purpose: lenient, cross-runtime shape accepted at the edge.
// Canonical validator spec is the strict Zod schema in the paper.
// Normalization & validation rules:
// - action: 'hold' => treated as a no-op (excluded from scoring); only 'buy'|'sell' are normative
// - market: free-form string -> one of {crypto, forex, stocks, commodities, futures}; else reject
// - timestamp: ISO string or seconds -> integer milliseconds; invalid -> reject
// - source/userId/notes: coerced to validator enum/optionality
// See artifact bundle paper-2025-v2.1 for examples & replay notes.

// Universal Signal Schema (snapshot) for ingestion
export const UniversalSignal = {
  id: "string",
  symbol: "string",
  market: "string", // free-form for ingestion
  action: ["buy","sell","hold"],
  price: "number",
  timestamp: "number|string",
  source: ["manual","tradingview","mcp","bot"],
  userId: "string?",
  notes: "string?"
};
