import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkSlotDirective } from "../src";

describe("checkDisplayDirective", () => {
  it("should be a function", () => {
    expect(checkSlotDirective).to.be.an.instanceOf(Function);
  });

  it("should fail when directives is missing", () => {
    const skillResponse = {
      response: {},
      version: "1.0",
    };
    let err;
    try {
      checkSlotDirective(skillResponse as ResponseEnvelope, "city");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when directive.type is missing", () => {
    const skillResponse = {
      response: {
        directives: [{}],
      },
      version: "1.0",
    };
    let err;
    try {
      checkSlotDirective(skillResponse as ResponseEnvelope, "city");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when directive is not Dialog.ElicitSlot", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            type: "Display.RenderListItem",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkSlotDirective(skillResponse as ResponseEnvelope, "city");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when slotToElicit is missing", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            type: "Dialog.ElicitSlot",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkSlotDirective(skillResponse as ResponseEnvelope, "city");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed with valid Dialog.ElicitSlot directive", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            slotToElicit: "city",
            type: "Dialog.ElicitSlot",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkSlotDirective(skillResponse as ResponseEnvelope, "city");
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
