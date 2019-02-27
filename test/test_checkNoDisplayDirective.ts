import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkNoDisplayDirective } from "../src";

describe("checkNoDisplayDirective", () => {
  it("should be a function", () => {
    expect(checkNoDisplayDirective).to.be.an.instanceOf(Function);
  });

  it("should fail when Display directive is present", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            type: "Display.RenderTemplate",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkNoDisplayDirective(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed when no Display directives are present", () => {
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
      checkNoDisplayDirective(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
