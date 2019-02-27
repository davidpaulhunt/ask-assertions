import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkAudioPlayStreamURL } from "../src";

describe("checkAudioPlayStreamURL", () => {
  it("should be a function", () => {
    expect(checkAudioPlayStreamURL).to.be.an.instanceOf(Function);
  });

  it("should fail when directive is missing url", () => {
    const url = "https://myaudiostream.com/foo";
    const skillResponse = {
      response: {
        directives: [],
      },
      version: "1.0",
    };
    let err;
    try {
      checkAudioPlayStreamURL(skillResponse as ResponseEnvelope, url);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail with incorrect url", () => {
    const url = "https://myaudiostream.com/foo";
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                offsetInMilliseconds: 0,
                token: url,
                url,
              },
            },
            playBehavior: "REPLACE_ENQUEUED",
            type: "AudioPlayer.Play",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkAudioPlayStreamURL(skillResponse as ResponseEnvelope, `${url}/fake-resource`);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed with valid AudioPlayer.Play directive and correct url", () => {
    const url = "https://myaudiostream.com/foo";
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                offsetInMilliseconds: 0,
                token: url,
                url,
              },
            },
            playBehavior: "REPLACE_ENQUEUED",
            type: "AudioPlayer.Play",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkAudioPlayStreamURL(skillResponse as ResponseEnvelope, url);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
