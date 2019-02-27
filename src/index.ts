import { interfaces, ResponseEnvelope, ui } from "ask-sdk-model";
import { expect } from "chai";

export function checkResponseStructure(response: ResponseEnvelope): void {
  expect(response).to.have.property("version");
  expect(response.version).to.be.equal("1.0");
  expect(response).to.have.property("response");
}

export function checkOutputSpeach(response: ResponseEnvelope): void {
  expect(response).to.have.property("response");
  const r = response.response;

  expect(r).to.have.property("outputSpeech");
  expect(r.outputSpeech).to.have.property("type");
  expect(r.outputSpeech.type).to.equal("SSML");
  expect(r.outputSpeech).to.have.property("ssml");

  const os = r.outputSpeech as ui.SsmlOutputSpeech;

  expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
  expect(os.ssml).to.match(/<\/speak>$/); // .endWith('</speak>');
}

export function checkNoOutputSpeach(response: ResponseEnvelope): void {
  expect(response).to.have.property("response");
  const r = response.response;

  expect(r).to.not.have.property("outputSpeech");
}

export function checkOutputSpeachContains(response: ResponseEnvelope, text: string): void {
  expect(response).to.have.property("response");
  const r = response.response;

  expect(r).to.have.property("outputSpeech");
  expect(r.outputSpeech).to.have.property("type");
  expect(r.outputSpeech.type).to.equal("SSML");
  expect(r.outputSpeech).to.have.property("ssml");

  const os = r.outputSpeech as ui.SsmlOutputSpeech;
  expect(os.ssml).to.contains(text);
  expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
  expect(os.ssml).to.match(/<\/speak>$/); // .endWith('</speak>');
}

export function checkOutputSpeachContainsAtLeastOneOf(
  response: ResponseEnvelope,
  ...validText: string[]
): void {
  expect(response).to.have.property("response");
  const r = response.response;

  expect(r).to.have.property("outputSpeech");
  expect(r.outputSpeech).to.have.property("type");
  expect(r.outputSpeech.type).to.equal("SSML");
  expect(r.outputSpeech).to.have.property("ssml");

  const os = r.outputSpeech as ui.SsmlOutputSpeech;
  const containsAtLeastOne = validText.some(text => os.ssml.includes(text));
  expect(containsAtLeastOne).to.equal(true);
  expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
  expect(os.ssml).to.match(/<\/speak>$/); // .endWith('</speak>');
}

export function checkOutputSpeachDoesNotContains(response: ResponseEnvelope, text: string): void {
  expect(response).to.have.property("response");
  const r = response.response;

  expect(r).to.have.property("outputSpeech");
  expect(r.outputSpeech).to.have.property("type");
  expect(r.outputSpeech.type).to.equal("SSML");
  expect(r.outputSpeech).to.have.property("ssml");

  const os = r.outputSpeech as ui.SsmlOutputSpeech;
  expect(os.ssml).to.not.contains(text);
  expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
  expect(os.ssml).to.match(/<\/speak>$/); // .endWith('</speak>');
}

export function sessionAttributes(response: ResponseEnvelope): { [key: string]: any } {
  return response.sessionAttributes;
}

export function checkSessionAttributes(
  response: ResponseEnvelope,
  obj: { [key: string]: any }
): void {
  expect(sessionAttributes(response)).to.deep.include(obj);
}

export function checkSessionStatus(response: ResponseEnvelope, shouldEndSession: boolean): void {
  const r = response.response;
  expect(r).to.have.property("shouldEndSession");
  if (shouldEndSession) {
    expect(r.shouldEndSession).to.be.true; // tslint:disable-line:no-unused-expression
  } else {
    expect(r.shouldEndSession).to.be.false; // tslint:disable-line:no-unused-expression
  }
}

export function checkStandardCard(response: ResponseEnvelope): void {
  const r = response.response;
  expect(r).to.have.property("card");
  expect(r.card.type).to.equal("Standard");
  expect((r.card as ui.StandardCard).text).to.not.be.equal("");
  expect((r.card as ui.StandardCard).title).to.not.be.equal("");
}

export function checkReprompt(response: ResponseEnvelope): void {
  expect(response).to.have.property("response");
  const r = response.response;

  expect(r).to.have.property("reprompt");
  expect(r.reprompt).to.have.property("outputSpeech");
  expect(r.reprompt.outputSpeech).to.have.property("type");
  expect(r.reprompt.outputSpeech.type).to.equal("SSML");
  expect(r.reprompt.outputSpeech).to.have.property("ssml");
  const os = r.reprompt.outputSpeech as ui.SsmlOutputSpeech;
  expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
  expect(os.ssml).to.match(/<\/speak>$/); // .endWith('</speak>');
}

export function checkNoReprompt(response: ResponseEnvelope): void {
  expect(response).to.have.property("response");
  const r = response.response;
  expect(r).to.not.have.property("reprompt");
}

export function checkAudioPlayDirective(response: ResponseEnvelope, replace: boolean = true): void {
  const r = response.response;
  expect(r).to.have.property("directives");
  expect(r.directives).to.have.length.greaterThan(0);

  const audioDirective = r.directives.find(d => d.type === "AudioPlayer.Play");
  expect(audioDirective).to.not.equal(undefined);

  const app = audioDirective as interfaces.audioplayer.PlayDirective;
  expect(app).to.have.property("playBehavior");
  if (replace) {
    expect(app.playBehavior).to.be.equal("REPLACE_ALL");
  } else {
    expect(app.playBehavior).to.be.equal("REPLACE_ENQUEUED");
  }
  expect(app).to.have.property("audioItem");
  expect(app.audioItem).to.have.property("stream");
  expect(app.audioItem.stream).to.have.property("url");
  expect(app.audioItem.stream.url).to.match(/^https:\/\//);
  expect(app.audioItem.stream).to.have.property("token");
  expect(app.audioItem.stream).not.to.have.property("expectedPreviousToken");
  expect(app.audioItem.stream).to.have.property("offsetInMilliseconds");
  expect(app.audioItem.stream.offsetInMilliseconds).to.equal(0);
}

export function checkAudioPlayStreamURL(response: ResponseEnvelope, streamURL: string): void {
  const r = response.response;
  expect(r).to.have.property("directives");
  expect(r.directives).to.have.length.greaterThan(0);

  const d = r.directives.find(
    dir => dir.type === "AudioPlayer.Play"
  ) as interfaces.audioplayer.PlayDirective;
  expect(d).to.not.equal(undefined);
  expect(d.audioItem.stream.url).to.include(streamURL);
}

export function checkAudioStopDirective(response: ResponseEnvelope, replace: boolean = true): void {
  const r = response.response;
  expect(r).to.have.property("directives");
  expect(r.directives).to.have.length.greaterThan(0);

  const audioDirective = r.directives.find(d => d.type === "AudioPlayer.Stop");
  expect(audioDirective).to.not.equal(undefined);
}

export function checkNoAudioDirective(response: ResponseEnvelope): void {
  const r = response.response;
  const audioDirective = r.directives && r.directives.find(d => d.type.startsWith("AudioPlayer"));
  expect(audioDirective).to.equal(undefined);
}

export function checkDisplayDirective(response: ResponseEnvelope, imageURL: string): void {
  const r = response.response;
  expect(r).to.have.property("directives");

  const displayDirective = r.directives.find(
    dir => dir.type === "Display.RenderTemplate"
  ) as interfaces.display.RenderTemplateDirective;
  expect(displayDirective).to.not.equal(undefined);
  expect(displayDirective)
    .to.have.property("template")
    .that.is.an("object");
  expect(displayDirective.template).to.have.property("backButton", "HIDDEN");
  expect(displayDirective.template).to.have.property("type", "BodyTemplate6");
  expect(displayDirective.template)
    .to.have.property("backgroundImage")
    .that.is.an("object")
    .that.has.property("sources")
    .that.is.an("array")
    .and.has.length.greaterThan(0);
  expect(displayDirective.template.backgroundImage.sources[0]).to.have.property("url", imageURL);
}

export function checkNoDisplayDirective(response: ResponseEnvelope): void {
  const r = response.response;
  const displayDirective = r.directives && r.directives.find(d => d.type.startsWith("Display"));
  expect(displayDirective).to.equal(undefined);
}
