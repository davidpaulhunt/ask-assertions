import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkOutputSpeechContainsAtLeastOneOf } from "../src";

describe("checkOutputSpeechContainsAtLeastOneOf", () => {
  it("should be a function", () => {
    expect(checkOutputSpeechContainsAtLeastOneOf).to.be.an.instanceOf(Function);
  });

  it("should fail when response is missing", () => {
    const skillResponse = {
      version: "1.0",
    };
    let err;
    try {
      checkOutputSpeechContainsAtLeastOneOf(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContainsAtLeastOneOf(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContainsAtLeastOneOf(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContainsAtLeastOneOf(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContainsAtLeastOneOf(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContainsAtLeastOneOf(skillResponse as ResponseEnvelope, "blah");
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
      checkOutputSpeechContainsAtLeastOneOf(skillResponse as ResponseEnvelope, "blah");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.outputSpeech.ssml does not contain blah or foo", () => {
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
      checkOutputSpeechContainsAtLeastOneOf(skillResponse as ResponseEnvelope, "blah", "foo");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed with valid output speech containing 'blah'", () => {
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
      checkOutputSpeechContainsAtLeastOneOf(skillResponse as ResponseEnvelope, "blah", "foo");
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });

  it("should succeed with valid output speech containing 'foo'", () => {
    const skillResponse = {
      response: {
        outputSpeech: {
          ssml: "<speak> hi my name is foo </speak>",
          type: "SSML",
        },
      },
    };
    let err;
    try {
      checkOutputSpeechContainsAtLeastOneOf(skillResponse as ResponseEnvelope, "blah", "foo");
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
