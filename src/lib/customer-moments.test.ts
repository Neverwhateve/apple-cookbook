import assert from "node:assert/strict";
import test from "node:test";
import { getCustomerMoment } from "./customer-moments.ts";

test("customer education only appears for a specific feature context", () => {
  assert.equal(getCustomerMoment(["AirPods", "Charging"]), undefined);
  assert.equal(getCustomerMoment(["AirPods", "Bluetooth"]), undefined);
  assert.equal(getCustomerMoment(["AirPods", "Find My"])?.title, "问题稳定后，可顺带完成“查找”教育");
});

test("customer education contains a customer completion check", () => {
  const moment = getCustomerMoment(["Personal Hotspot"]);

  assert.ok(moment);
  assert.match(moment.completionCheck, /顾客/);
});
