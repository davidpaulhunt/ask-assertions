import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkOutputSpeech } from "../src";

describe("checkOutputSpeech", () => {
  it("should be a function", () => {
    expect(checkOutputSpeech).to.be.an.instanceOf(Function);
  });

  it("should fail when response is missing", () => {
    const skillResponse = {
      version: "1.0",
    };
    let err;
    try {
      checkOutputSpeech(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.outputSpeech is missing", () => {
    const skillResponse = {
      response: {},
    };
    let err;
    try {
      checkOutputSpeech(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.outputSpeech.type is missing", () => {
    const skillResponse = {
      response: {
        outputSpeech: {},
      },
    };
    let err;
    try {
      checkOutputSpeech(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.outputSpeech.type is not SSML", () => {
    const skillResponse = {
      response: {
        outputSpeech: {
          type: "foo",
        },
      },
    };
    let err;
    try {
      checkOutputSpeech(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.outputSpeech.ssml is missing", () => {
    const skillResponse = {
      response: {
        outputSpeech: {
          type: "SSML",
        },
      },
    };
    let err;
    try {
      checkOutputSpeech(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.outputSpeech.ssml does not start with <speak>", () => {
    const skillResponse = {
      response: {
        outputSpeech: {
          ssml: "blah blah </speak>",
          type: "SSML",
        },
      },
    };
    let err;
    try {
      checkOutputSpeech(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.outputSpeech.ssml does not end with </speak>", () => {
    const skillResponse = {
      response: {
        outputSpeech: {
          ssml: "<speak> blah blah",
          type: "SSML",
        },
      },
    };
    let err;
    try {
      checkOutputSpeech(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed with valid output speech", () => {
    const skillResponse = {
      response: {
        outputSpeech: {
          ssml: "<speak> blah blah </speak>",
          type: "SSML",
        },
      },
    };
    let err;
    try {
      checkOutputSpeech(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
