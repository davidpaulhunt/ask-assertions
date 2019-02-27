import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkSessionStatus } from "../src";

describe("checkSessionStatus", () => {
  it("should be a function", () => {
    expect(checkSessionStatus).to.be.an.instanceOf(Function);
  });

  it("should fail when response is missing", () => {
    const skillResponse = {
      version: "1.0",
    };
    let err;
    try {
      checkSessionStatus(skillResponse as ResponseEnvelope, true);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.shouldEndSession is missing", () => {
    const skillResponse = {
      response: {},
      version: "1.0",
    };
    let err;
    try {
      checkSessionStatus(skillResponse as ResponseEnvelope, true);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.shouldEndSession is false but expects true", () => {
    const skillResponse = {
      response: {
        shouldEndSession: false,
      },
      version: "1.0",
    };
    let err;
    try {
      checkSessionStatus(skillResponse as ResponseEnvelope, true);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.shouldEndSession is true but expects false", () => {
    const skillResponse = {
      response: {
        shouldEndSession: true,
      },
      version: "1.0",
    };
    let err;
    try {
      checkSessionStatus(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed when response.shouldEndSession is true and expects true", () => {
    const skillResponse = {
      response: {
        shouldEndSession: true,
      },
      version: "1.0",
    };
    let err;
    try {
      checkSessionStatus(skillResponse as ResponseEnvelope, true);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });

  it("should succeed when response.shouldEndSession is false and expects false", () => {
    const skillResponse = {
      response: {
        shouldEndSession: false,
      },
      version: "1.0",
    };
    let err;
    try {
      checkSessionStatus(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
