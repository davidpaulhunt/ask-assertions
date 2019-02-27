import "mocha";
import { expect } from "chai";

import { checkNoOutputSpeach } from "../src";

describe("checkNoOutputSpeach", () => {
  it("should be a function", () => {
    expect(checkNoOutputSpeach).to.be.an.instanceOf(Function);
  });
});
