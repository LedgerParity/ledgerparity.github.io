const MAX_STROOPS = 9223372036854775807n;
const AMOUNT_PATTERN = /^-?[0-9]+(?:\.[0-9]+)?$/;
const RFC3339_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const REQUIRED = ["id", "network", "operation_type", "sender", "recipient", "amount", "asset", "asset_type", "status"];
const ALLOWED = new Set([
  ...REQUIRED,
  "source_app", "operation_id", "reference_id", "business_reference", "asset_issuer", "asset_contract",
  "timestamp", "settlement_start", "settlement_end", "metadata",
]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.length > 0;
}

function parseRFC3339(value) {
  if (typeof value !== "string") return null;
  const match = RFC3339_PATTERN.exec(value);
  if (!match) return null;
  const datePart = value.slice(0, 19);
  const [year, month, day, hour, minute, second] = datePart.split(/[-T:]/).map(Number);
  const normalized = new Date(0);
  normalized.setUTCFullYear(year, month - 1, day);
  normalized.setUTCHours(hour, minute, second, 0);
  if (normalized.getUTCFullYear() !== year || normalized.getUTCMonth() + 1 !== month || normalized.getUTCDate() !== day || hour > 23 || minute > 59 || second > 59) return null;
  const zone = value.endsWith("Z") ? "Z" : value.slice(-6);
  if (zone !== "Z" && (Number(zone.slice(1, 3)) > 23 || Number(zone.slice(4, 6)) > 59)) return null;
  const time = Date.parse(value);
  return Number.isFinite(time) ? time : null;
}

function validateAmount(value) {
  if (typeof value !== "string" || !AMOUNT_PATTERN.test(value)) {
    return "amount must be a decimal string";
  }
  const [whole, fraction = ""] = value.split(".");
  if (fraction.length > 7) return "amount exceeds 7 decimal places";
  if (value.startsWith("-")) return "amount must be positive and fit the signed int64 stroop range";
  const stroops = BigInt(whole) * 10000000n + BigInt((fraction + "0000000").slice(0, 7));
  if (stroops <= 0n || stroops > MAX_STROOPS) {
    return "amount must be positive and fit the signed int64 stroop range";
  }
  return null;
}

function validateAsset(record) {
  const { asset_type: type, asset: code, asset_issuer: issuer = "", asset_contract: contract = "" } = record;
  if (typeof issuer !== "string" || typeof contract !== "string") return "asset issuer and contract must be strings";
  if (contract !== "") return "contract tokens are unsupported";
  if (type === "native" && code === "XLM" && issuer === "") return null;
  if (type === "credit_alphanum4" && typeof code === "string" && /^[a-zA-Z0-9]{1,4}$/.test(code) && issuer !== "") return null;
  if (type === "credit_alphanum12" && typeof code === "string" && /^[a-zA-Z0-9]{5,12}$/.test(code) && issuer !== "") return null;
  return "asset identity is incomplete or unsupported";
}

function validateRecord(record, index) {
  const errors = [];
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return { index, errors: ["record must be a JSON object"] };
  }
  for (const key of Object.keys(record)) {
    if (!ALLOWED.has(key)) errors.push(`unknown field: ${key}`);
  }
  for (const key of REQUIRED) {
    if (!isNonEmptyString(record[key])) errors.push(`${key} must be a non-empty string`);
  }
  if (record.operation_type !== "payment") errors.push("only ordinary classic payment records are supported");

  const amountError = validateAmount(record.amount);
  if (amountError) errors.push(amountError);
  const assetError = validateAsset(record);
  if (assetError) errors.push(assetError);

  for (const key of ["timestamp", "settlement_start", "settlement_end"]) {
    if (record[key] !== undefined && parseRFC3339(record[key]) === null) errors.push(`${key} must be an RFC3339 timestamp`);
  }
  const hasTimestamp = record.timestamp !== undefined;
  const hasStart = record.settlement_start !== undefined;
  const hasEnd = record.settlement_end !== undefined;
  if (hasTimestamp === (hasStart || hasEnd)) {
    errors.push("provide exactly one timestamp or a complete settlement_start/settlement_end interval");
  }
  if (hasStart !== hasEnd) errors.push("settlement_start and settlement_end must be supplied together");
  if (hasStart && hasEnd) {
    const start = parseRFC3339(record.settlement_start);
    const end = parseRFC3339(record.settlement_end);
    if (start !== null && end !== null && end < start) errors.push("settlement_end must not be before settlement_start");
  }
  for (const key of ["source_app", "operation_id", "reference_id", "business_reference", "asset_issuer", "asset_contract"]) {
    if (record[key] !== undefined && typeof record[key] !== "string") errors.push(`${key} must be a string`);
  }
  if (record.metadata !== undefined && (!record.metadata || typeof record.metadata !== "object" || Array.isArray(record.metadata) || Object.values(record.metadata).some((value) => typeof value !== "string"))) {
    errors.push("metadata must be an object");
  }
  return { index, errors };
}

export function checkPaymentJSON(input) {
  if (typeof input !== "string" || new TextEncoder().encode(input).byteLength > 256 * 1024) {
    return { error: "Input exceeds the 256 KiB browser limit.", records: [] };
  }
  let records;
  try {
    records = JSON.parse(input);
  } catch {
    return { error: "Input is not valid JSON.", records: [] };
  }
  if (!Array.isArray(records)) return { error: "Expected one JSON array of payment records.", records: [] };
  return { error: null, records: records.map(validateRecord) };
}

export const examplePaymentJSON = JSON.stringify([
  {
    id: "invoice-1001", source_app: "example-store", network: "Test SDF Network ; September 2015",
    operation_type: "payment", sender: "GEXAMPLE-SENDER", recipient: "GEXAMPLE-RECIPIENT",
    amount: "12.3400000", asset: "XLM", asset_type: "native", timestamp: "2026-10-01T12:00:00Z", status: "completed",
    business_reference: "order-1001",
  },
], null, 2);
