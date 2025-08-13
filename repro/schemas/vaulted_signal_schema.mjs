// Vaulted Signal Schema (strict) for T.S.S.D. records
export const VaultedSignal = {
  id: "string",
  timestamp: "number", // epoch ms
  meta: { symbol: "string", strategyId: "string", agentId: "string" },
  market: ["crypto","forex","stocks","commodities","futures"],
  action: ["buy","sell"],
  price: "number",
  source: ["manual","tradingview","mcp","bot"],
  timeframe: ["1m","5m","15m","30m","1h","4h","1d","1w"],
  strength: ["low","medium","high","very-high"],
  userId: "string?",
  pipeline: { submittedBy: "string", enrichedBy: "string", scoredBy: "string" },
  indicators: "array",
  analysis: "array",
  patternAnalysis: "object?",
  score: { overall: "number", technical: "number", fundamental: "number?", sentiment: "number?", breakdown: "record" },
  riskRewardRatio: "number?",
  takeProfitLevels: "array?",
  stopLoss: "number?",
  subscribed: "boolean"
};
