// AFI — Canonicalization helper for Universal Signal ingestion -> validator spec
export function canonicalizeSignal(input) {
  const out = {
    id: String(input.id),
    symbol: String(input.symbol),
    market: mapMarket(String(input.market)),
    action: mapAction(String(input.action)),
    price: Number(input.price),
    timestamp: toMillis(input.timestamp),
    source: mapSource(String(input.source)),
    userId: input.userId ? String(input.userId) : undefined,
    notes: input.notes ? String(input.notes) : undefined,
  };
  if (!out.action) throw new Error("Non-normative action (e.g., 'hold'); excluded from scoring.");
  if (!out.market) throw new Error("Unknown market taxonomy.");
  if (!Number.isFinite(out.price) || out.price <= 0) throw new Error("Invalid price.");
  if (!Number.isInteger(out.timestamp) || out.timestamp <= 0) throw new Error("Invalid timestamp.");
  return out;

  function mapAction(a){ return a === "buy" || a === "sell" ? a : null; }
  function mapMarket(m){
    const t = m.toLowerCase();
    return ["crypto","forex","stocks","commodities","futures"].includes(t) ? t : null;
  }
  function mapSource(s){
    const ok = ["manual","tradingview","mcp","bot"];
    return ok.includes(s) ? s : "bot"; // default or throw
  }
  function toMillis(t){
    if (typeof t === "number") return t > 1e12 ? Math.round(t) : Math.round(t*1000);
    const d = new Date(t); const ms = d.getTime(); return Number.isFinite(ms) ? ms : NaN;
  }
}
