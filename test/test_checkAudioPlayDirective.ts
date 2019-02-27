import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkAudioPlayDirective } from "../src";

describe("checkAudioPlayDirective", () => {
  it("should be a function", () => {
    expect(checkAudioPlayDirective).to.be.an.instanceOf(Function);
  });

  it("should fail when directives is missing", () => {
    const skillResponse = {
      response: {},
      version: "1.0",
    };
    let err;
    try {
      checkAudioPlayDirective(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when directives is empty", () => {
    const skillResponse = {
      response: {
        directives: [],
      },
      version: "1.0",
    };
    let err;
    try {
      checkAudioPlayDirective(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when type is incorrect", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                offsetInMilliseconds: 0,
                token: "https://myaudiostream.com/foo",
                url: "https://myaudiostream.com/foo",
              },
            },
            playBehavior: "REPLACE_ALL",
            type: "AudioPlayer.PlayLater",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkAudioPlayDirective(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when playBehavior is missing", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                offsetInMilliseconds: 0,
                token: "https://myaudiostream.com/foo",
                url: "https://myaudiostream.com/foo",
              },
            },
            type: "AudioPlayer.Play",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkAudioPlayDirective(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when playBehavior is not correct", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                offsetInMilliseconds: 0,
                token: "https://myaudiostream.com/foo",
                url: "https://myaudiostream.com/foo",
              },
            },
            playBehavior: "FOO_BAR",
            type: "AudioPlayer.Play",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkAudioPlayDirective(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when audioItem is missing", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            playBehavior: "REPLACE_ENQUEUED",
            type: "AudioPlayer.Play",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkAudioPlayDirective(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when stream is missing", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {},
            playBehavior: "REPLACE_ENQUEUED",
            type: "AudioPlayer.Play",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkAudioPlayDirective(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when url is missing", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                offsetInMilliseconds: 0,
                token: "https://myaudiostream.com/foo",
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
      checkAudioPlayDirective(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when url is not https", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                offsetInMilliseconds: 0,
                token: "https://myaudiostream.com/foo",
                url: "http://myaudiostream.com/foo",
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
      checkAudioPlayDirective(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when token is missing", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                offsetInMilliseconds: 0,
                url: "https://myaudiostream.com/foo",
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
      checkAudioPlayDirective(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when expectedPreviousToken is not missing", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                expectedPreviousToken: "foo",
                offsetInMilliseconds: 0,
                token: "https://myaudiostream.com/foo",
                url: "https://myaudiostream.com/foo",
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
      checkAudioPlayDirective(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when offsetInMilliseconds is missing", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                token: "https://myaudiostream.com/foo",
                url: "https://myaudiostream.com/foo",
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
      checkAudioPlayDirective(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when offsetInMilliseconds is not 0", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                offsetInMilliseconds: 99,
                token: "https://myaudiostream.com/foo",
                url: "https://myaudiostream.com/foo",
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
      checkAudioPlayDirective(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed with valid AudioPlayer.Play directive", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            audioItem: {
              stream: {
                offsetInMilliseconds: 0,
                token: "https://myaudiostream.com/foo",
                url: "https://myaudiostream.com/foo",
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
      checkAudioPlayDirective(skillResponse as ResponseEnvelope, false);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
