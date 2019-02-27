import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkReprompt } from "../src";

describe("checkReprompt", () => {
  it("should be a function", () => {
    expect(checkReprompt).to.be.an.instanceOf(Function);
  });

  it("should fail when response is missing", () => {
    const skillResponse = {
      version: "1.0",
    };
    let err;
    try {
      checkReprompt(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.reprompt is missing", () => {
    const skillResponse = {
      response: {},
    };
    let err;
    try {
      checkReprompt(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.reprompt.outputSpeech is missing", () => {
    const skillResponse = {
      response: {
        reprompt: {},
      },
    };
    let err;
    try {
      checkReprompt(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.reprompt.outputSpeech.type is missing", () => {
    const skillResponse = {
      response: {
        reprompt: {
          outputSpeech: {},
        },
      },
    };
    let err;
    try {
      checkReprompt(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.reprompt.outputSpeech.type is not SSML", () => {
    const skillResponse = {
      response: {
        reprompt: {
          outputSpeech: {
            type: "foo",
          },
        },
      },
    };
    let err;
    try {
      checkReprompt(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.reprompt.outputSpeech.ssml is missing", () => {
    const skillResponse = {
      response: {
        reprompt: {
          outputSpeech: {
            type: "SSML",
          },
        },
      },
    };
    let err;
    try {
      checkReprompt(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.reprompt.outputSpeech.ssml does not start with <speak>", () => {
    const skillResponse = {
      response: {
        reprompt: {
          outputSpeech: {
            ssml: "blah blah </speak>",
            type: "SSML",
          },
        },
      },
    };
    let err;
    try {
      checkReprompt(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.reprompt.outputSpeech.ssml does not end with </speak>", () => {
    const skillResponse = {
      response: {
        reprompt: {
          outputSpeech: {
            ssml: "<speak> blah blah",
            type: "SSML",
          },
        },
      },
    };
    let err;
    try {
      checkReprompt(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed with valid output speech", () => {
    const skillResponse = {
      response: {
        reprompt: {
          outputSpeech: {
            ssml: "<speak> blah blah </speak>",
            type: "SSML",
          },
        },
      },
    };
    let err;
    try {
      checkReprompt(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
