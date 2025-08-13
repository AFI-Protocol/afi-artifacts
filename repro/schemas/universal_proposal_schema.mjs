// Universal Proposal Schema (snapshot)
export const UniversalProposal = {
  proposalId: "uuid",
  title: "string",
  description: "string",
  proposer: "string",
  submissionTimestamp: "number",
  tags: "array?",
  category: ["governance","signal","model","policy","compliance","infrastructure"],
  body: { context: "string", specification: "string", affectedModules: "array", compatibilityNotes: "string?", references: "array?" },
  validatorSignatures: "array",
  voting: { method: ["quadratic","simple","weighted"], quorum: "number", threshold: "number", openTime: "number", closeTime: "number", votes: "array" },
  status: ["draft","validated","voting","approved","rejected","executed","archived"],
  version: "0.1"
};
