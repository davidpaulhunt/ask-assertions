import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkStandardCard } from "../src";

describe("checkStandardCard", () => {
  it("should be a function", () => {
    expect(checkStandardCard).to.be.an.instanceOf(Function);
  });

  it("should fail when response is missing", () => {
    const skillResponse = {
      version: "1.0",
    };
    let err;
    try {
      checkStandardCard(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.card is missing", () => {
    const skillResponse = {
      response: {},
      version: "1.0",
    };
    let err;
    try {
      checkStandardCard(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.card.type is missing", () => {
    const skillResponse = {
      response: {
        card: {},
      },
      version: "1.0",
    };
    let err;
    try {
      checkStandardCard(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.card.type does not equal 'Standard'", () => {
    const skillResponse = {
      response: {
        card: {
          type: "foo",
        },
      },
      version: "1.0",
    };
    let err;
    try {
      checkStandardCard(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.card.text is empty or missing", () => {
    const skillResponse = {
      response: {
        card: {
          text: "",
          type: "Standard",
        },
      },
      version: "1.0",
    };
    let err;
    try {
      checkStandardCard(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when response.card.title is empty or missing", () => {
    const skillResponse = {
      response: {
        card: {
          text: "this is text",
          title: "",
          type: "Standard",
        },
      },
      version: "1.0",
    };
    let err;
    try {
      checkStandardCard(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed with valid Standard card", () => {
    const skillResponse = {
      response: {
        card: {
          text: "this is text",
          title: "I Am a Title",
          type: "Standard",
        },
      },
      version: "1.0",
    };
    let err;
    try {
      checkStandardCard(skillResponse as ResponseEnvelope);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
