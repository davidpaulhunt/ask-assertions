import "mocha";
import { expect } from "chai";

import { sessionAttributes } from "../src";

describe("sessionAttributes", () => {
  it("should be a function", () => {
    expect(sessionAttributes).to.be.an.instanceOf(Function);
  });

  it("should return entire sessionAttributes object", () => {
    const attrs = { a: 1, b: 2, c: { d: 3 } };
    expect(
      sessionAttributes({
        response: {},
        sessionAttributes: attrs,
        version: "",
      })
    ).to.deep.equal(attrs);
  });
});
