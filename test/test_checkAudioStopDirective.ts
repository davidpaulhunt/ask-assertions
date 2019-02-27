import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkAudioStopDirective } from "../src";

describe("checkAudioStopDirective", () => {
  it("should be a function", () => {
    expect(checkAudioStopDirective).to.be.an.instanceOf(Function);
  });

  it("should fail when AudioPlayer.Stop directive is missing", () => {
    const url = "https://myaudiostream.com/foo";
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
      checkAudioStopDirective(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed with valid AudioPlayer.Stop directive", () => {
    const url = "https://myaudiostream.com/foo";
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
      checkAudioStopDirective(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
