import test from "node:test";
import assert from "node:assert/strict";
import { checkPaymentJSON, examplePaymentJSON } from "../assets/payment-preflight.mjs";

const valid = JSON.parse(examplePaymentJSON)[0];
const check = (record) => checkPaymentJSON(JSON.stringify([record])).records[0].errors;

test("accepts the documented synthetic native XLM record", () => {
  assert.deepEqual(checkPaymentJSON(examplePaymentJSON).records[0].errors, []);
});

test("accepts an explicit closed settlement interval", () => {
  const record = { ...valid, timestamp: undefined, settlement_start: "2026-10-01T12:00:00Z", settlement_end: "2026-10-01T13:00:00Z" };
  delete record.timestamp;
  assert.deepEqual(check(record), []);
});

test("rejects amount precision and signed-int64 overflow", () => {
  assert.ok(check({ ...valid, amount: "1.00000001" }).some((error) => error.includes("7 decimal places")));
  assert.ok(check({ ...valid, amount: "922337203685.4775808" }).some((error) => error.includes("int64")));
  assert.ok(check({ ...valid, amount: "-0.1" }).some((error) => error.includes("positive")));
});

test("rejects incomplete credit asset identity and token contracts", () => {
  assert.ok(check({ ...valid, asset: "USD", asset_type: "credit_alphanum4" }).some((error) => error.includes("asset identity")));
  assert.ok(check({ ...valid, asset_contract: "C123" }).some((error) => error.includes("contract tokens")));
});

test("rejects unknown fields and ambiguous time representations", () => {
  assert.ok(check({ ...valid, memo: "not a reference" }).some((error) => error.includes("unknown field: memo")));
  assert.ok(check({ ...valid, settlement_start: "2026-10-01T12:00:00Z", settlement_end: "2026-10-01T13:00:00Z" }).some((error) => error.includes("exactly one")));
  assert.ok(check({ ...valid, timestamp: "2026-02-30T12:00:00Z" }).some((error) => error.includes("RFC3339")));
});

test("requires an array and reports malformed JSON safely", () => {
  assert.match(checkPaymentJSON("{").error, /not valid JSON/);
  assert.match(checkPaymentJSON(JSON.stringify(valid)).error, /JSON array/);
  assert.match(checkPaymentJSON("x".repeat(256 * 1024 + 1)).error, /256 KiB/);
});

test("accepts an empty array without calling it reconciliation success", () => {
  assert.deepEqual(checkPaymentJSON("[]"), { error: null, records: [] });
});
