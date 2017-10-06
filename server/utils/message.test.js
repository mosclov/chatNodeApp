const expect = require('expect');
var { generateMessage } = require('./message');

describe("generateMessage", function () {
  it("should generate correcct message object", function () {
    var from = "Jose";
    var text = "Hello";
    var message = generateMessage(from, text);
    console.log(message);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      from,
      text
    })
  });
});
