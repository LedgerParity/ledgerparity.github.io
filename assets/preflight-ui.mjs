import { checkPaymentJSON, examplePaymentJSON } from "./payment-preflight.mjs";

const input = document.querySelector("#payment-json");
const summary = document.querySelector("#result-summary");
const results = document.querySelector("#record-results");

function showResult() {
  results.replaceChildren();
  const checked = checkPaymentJSON(input.value);
  if (checked.error) {
    summary.textContent = checked.error;
    summary.className = "result-error";
    return;
  }
  const invalid = checked.records.filter(({ errors }) => errors.length > 0).length;
  summary.textContent = checked.records.length === 0
    ? "Valid empty JSON array. The CLI treats this as an empty export."
    : `${checked.records.length - invalid} of ${checked.records.length} record${checked.records.length === 1 ? "" : "s"} passed the browser preflight${invalid ? `; ${invalid} need${invalid === 1 ? "s" : ""} attention` : ""}.`;
  summary.className = invalid ? "result-error" : "result-success";
  for (const { index, errors } of checked.records) {
    const item = document.createElement("li");
    item.className = errors.length ? "record-invalid" : "record-valid";
    item.textContent = errors.length ? `Record ${index + 1}: ${errors.join("; ")}` : `Record ${index + 1}: format checks passed`;
    results.append(item);
  }
}

document.querySelector("#check-json").addEventListener("click", showResult);
document.querySelector("#load-sample").addEventListener("click", () => {
  input.value = examplePaymentJSON;
  showResult();
});
document.querySelector("#clear-json").addEventListener("click", () => {
  input.value = "";
  results.replaceChildren();
  summary.textContent = "Paste an export and choose “Check JSON.”";
  summary.className = "";
  input.focus();
});
