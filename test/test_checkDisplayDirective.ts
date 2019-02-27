import "mocha";
import { ResponseEnvelope } from "ask-sdk-model";
import { expect } from "chai";

import { checkDisplayDirective } from "../src";

describe("checkDisplayDirective", () => {
  it("should be a function", () => {
    expect(checkDisplayDirective).to.be.an.instanceOf(Function);
  });

  it("should fail when directives is missing", () => {
    const skillResponse = {
      response: {},
      version: "1.0",
    };
    let err;
    try {
      checkDisplayDirective(skillResponse as ResponseEnvelope, "https://myotherimage/url.jpg");
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
      checkDisplayDirective(skillResponse as ResponseEnvelope, "https://myotherimage/url.jpg");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when directive is not Display.RenderTemplate", () => {
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
      checkDisplayDirective(skillResponse as ResponseEnvelope, "https://myotherimage/url.jpg");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when template is missing", () => {
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
      checkDisplayDirective(skillResponse as ResponseEnvelope, "https://myotherimage/url.jpg");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when backButton is missing", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            template: {},
            type: "Display.RenderTemplate",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkDisplayDirective(skillResponse as ResponseEnvelope, "https://myotherimage/url.jpg");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when backButton is not hidden", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            template: {
              backButton: "Foo",
            },
            type: "Display.RenderTemplate",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkDisplayDirective(skillResponse as ResponseEnvelope, "https://myotherimage/url.jpg");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when type is missing", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            template: {
              backButton: "HIDDEN",
            },
            type: "Display.RenderTemplate",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkDisplayDirective(skillResponse as ResponseEnvelope, "https://myotherimage/url.jpg");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when type is not BodyTemplate6", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            template: {
              backButton: "HIDDEN",
              type: "BodyTemplate2",
            },
            type: "Display.RenderTemplate",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkDisplayDirective(skillResponse as ResponseEnvelope, "https://myotherimage/url.jpg");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when backgroundImage is missing", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            template: {
              backButton: "HIDDEN",
              type: "BodyTemplate6",
            },
            type: "Display.RenderTemplate",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkDisplayDirective(skillResponse as ResponseEnvelope, "https://myotherimage/url.jpg");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when sources is empty", () => {
    const skillResponse = {
      response: {
        directives: [
          {
            template: {
              backButton: "HIDDEN",
              backgroundImage: {
                sources: [],
              },
              type: "BodyTemplate6",
            },
            type: "Display.RenderTemplate",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkDisplayDirective(skillResponse as ResponseEnvelope, "https://myotherimage/url.jpg");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should fail when image url does not match", () => {
    const url = "https://myimage/url.jpg";
    const skillResponse = {
      response: {
        directives: [
          {
            template: {
              backButton: "HIDDEN",
              backgroundImage: {
                sources: [
                  {
                    url,
                  },
                ],
              },
              type: "BodyTemplate6",
            },
            type: "Display.RenderTemplate",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkDisplayDirective(skillResponse as ResponseEnvelope, "https://myotherimage/url.jpg");
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
  });

  it("should succeed with valid Display.RenderTemplate directive", () => {
    const url = "https://myimage/url.jpg";
    const skillResponse = {
      response: {
        directives: [
          {
            template: {
              backButton: "HIDDEN",
              backgroundImage: {
                sources: [
                  {
                    url,
                  },
                ],
              },
              type: "BodyTemplate6",
            },
            type: "Display.RenderTemplate",
          },
        ],
      },
      version: "1.0",
    };
    let err;
    try {
      checkDisplayDirective(skillResponse as ResponseEnvelope, url);
    } catch (e) {
      err = e;
    }
    expect(err).to.equal(undefined);
  });
});
