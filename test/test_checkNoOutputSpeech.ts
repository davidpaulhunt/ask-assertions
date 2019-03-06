import "mocha";
import { expect } from "chai";

import { checkNoOutputSpeech } from "../src";

describe("checkNoOutputSpeech", () => {
  it("should be a function", () => {
    expect(checkNoOutputSpeech).to.be.an.instanceOf(Function);
  });
});
