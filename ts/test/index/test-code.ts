import { addExpression } from "./test-code2";

console.log("bundled script executing..");
const m2 = "MY_MARK_2";
export const result: any = {m1: addExpression("MY_MARK_1")};
result.m2 = m2;
result.m3 = "MY_MARK_3";

console.log(result);
