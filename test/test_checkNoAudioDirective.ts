import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkNoAudioDirective } from "../src";

describe("checkNoAudioDirective", () => {
  it("should be a function", () => {
    expect(checkNoAudioDirective).to.be.an.instanceOf(Function);
  });

  it("should fail when AudioPlayer.Play directive is present", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            type: "AudioPlayer.Play",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkNoAudioDirective(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when AudioPlayer.Stop directive is present", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            type: "AudioPlayer.Stop",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkNoAudioDirective(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed when no AudioPlayer directives are present", () => {
    const skillResponse = {
      response: {
        directives: [],
      },
      version: "1.0",
    };
    let err;
    try {
      checkNoAudioDirective(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
