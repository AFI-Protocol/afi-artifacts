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
