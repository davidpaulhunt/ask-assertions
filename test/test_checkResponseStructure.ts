import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkResponseStructure } from "../src";

describe("checkResponseStructure", () => {
  it("should be a function", () => {
    expect(checkResponseStructure).to.be.an.instanceOf(Function);
  });

  it("succeeds with a valid response", () => {
    const skillResponse = {
      response: {},
      version: "1.0",
    };
    let err;
    try {
      checkResponseStructure(skillResponse);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });

  it("fails when version is missing", () => {
    const skillResponse = {
      response: {},
    };
    let err;
    try {
      checkResponseStructure(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("fails when version is not 1.0", () => {
    const skillResponse = {
      response: {},
      version: "99.9",
    };
    let err;
    try {
      checkResponseStructure(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("fails when response is missing", () => {
    const skillResponse = {
      version: "1.0",
    };
    let err;
    try {
      checkResponseStructure(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });
});
