ASK Assertions contains a number of helpers for testing common skill responses in projects built with the amazing [Alexa Skills Kit SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs).

## Disclaimer

**Although, this package is based on the helpers from the [Single Stream Audio Skill](https://github.com/alexa/skill-sample-nodejs-audio-player/tree/mainline/single-stream), it is in no way affiliated with or endorsed by Amazon or the Alexa team.**

## Installation

Install `ask-assertions` as a devDependency:

```bash
$ npm i -D ask-assertions
```

> Note: `ask-assertions` requires the following peerDependencies
>
> - `ask-sdk-models` >= 1.11.x
> - `chai` >= 4.2.x

## Usage

_Example using mocha + chai with TypeScript._

```typescript
import "mocha";
import * as assertions from "ask-assertions";
import { ResponseEnvelope } from "ask-sdk-model";

import { handler as skill } from "../src/index";

let skillResponse: ResponseEnvelope;

describe("AMAZON.HelpIntent", function testHelpIntent() {
  before(() => {
    this.timeout(5000);

    return new Promise(resolve => {
      skill(helpIntentRequest, null, (_, responseEnvelope) => {
        skillResponse = responseEnvelope;
        resolve();
      });
    });
  });

  it("should return a valid skill response", () => {
    assertions.checkResponseStructure(skillResponse);
  });

  it("should return valid output speeach", () => {
    assertions.checkOutputSpeech(skillResponse);
  });

  it("should say 'This skill can do cool things'", () => {
    assertions.checkOutputSpeechContains(skillResponse, "This skill can do cool things");
  });
});
```

## Feedback

These helpers were adapated to my workflow and common use-cases. If you have ideas on how to improve or expand them, please start a discussion via Github issues. Cheers.
