import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkNoReprompt } from "../src";

describe("checkNoReprompt", () => {
  it("should be a function", () => {
    expect(checkNoReprompt).to.be.an.instanceOf(Function);
  });

  it("should fail when reprompt is present", () => {
    const skillResponse = {
      response: {
        reprompt: {
          outputSpeech: {
            ssml: "<speak>foooooo</speak>",
            type: "SSML",
          },
        },
      },
      version: "1.0",
    };
    let err;
    try {
      checkNoReprompt(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed when reprompt is missing", () => {
    const skillResponse = {
      response: {},
      version: "1.0",
    };
    let err;
    try {
      checkNoReprompt(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
