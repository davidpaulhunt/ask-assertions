import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkOutputSpeechContains } from "../src";

describe("checkOutputSpeechContains", () => {
  it("should be a function", () => {
    expect(checkOutputSpeechContains).to.be.an.instanceOf(Function);
  });

  it("should fail when response is missing", () => {
    const skillResponse = {
      version: "1.0",
    };
    let err;
    try {
      checkOutputSpeechContains(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContains(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContains(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContains(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContains(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContains(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContains(skillResponse as ResponseEnvelope, "blah");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.outputSpeech.ssml does not contain blah", () => {
    const skillResponse = {
      response: {
        outputSpeech: {
          ssml: "<speak>hello world</speak>",
          type: "SSML",
        },
      },
    };
    let err;
    try {
      checkOutputSpeechContains(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContains(skillResponse as ResponseEnvelope, "blah");
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
