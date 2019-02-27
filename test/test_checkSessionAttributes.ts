import "mocha";
import { expect } from "chai";

import { checkSessionAttributes } from "../src";

describe("checkSessionAttributes", () => {
  it("should be a function", () => {
    expect(checkSessionAttributes).to.be.an.instanceOf(Function);
  });
});
