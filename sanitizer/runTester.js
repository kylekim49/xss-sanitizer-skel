import { Tester } from "./tester.js";

const testCaseReq = await fetch("test_cases.txt");
const testCases = (await testCaseReq.text()).trim().split("\n");
const tester = new Tester();

for (const test of testCases) {
  tester.testOne(test);
}
