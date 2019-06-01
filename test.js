const assert = require("assert");
const { evaluate } = require("./index.js");

describe("evaluate", function() {
  describe("linear zoom", function() {
    it("evaluates colors correctly in range", function() {
      const expression = [
        "interpolate",
        ["linear"],
        ["zoom"],
        16,
        "hsl(230, 16%, 94%)",
        16.25,
        "hsl(230, 50%, 98%)"
      ];
      const result = evaluate(expression, {zoom: 16});
      assert.equal(result, "rgb(237, 238, 242)");
    });

    it("evaluates colors correctly out of range", function() {
      const expression = [
        "interpolate",
        ["linear"],
        ["zoom"],
        16,
        "hsl(230, 16%, 94%)",
        16.25,
        "hsl(230, 50%, 98%)"
      ];
      const result = evaluate(expression, {zoom: 12});
      assert.equal(result, "rgb(76, 76, 77)");
    });

    it("evaluates numbers correctly out of range", function() {
      const expression = [
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        1,
        12,
        2
      ];
      const result = evaluate(expression, {zoom: 11});
      assert.equal(result, 1.5);
    });
  });

  describe("exponential zoom", function() {
    it("evaluates correctly in range", function() {
      const expression = [
        "interpolate",
        ["exponential", 1.5],
        ["zoom"],
        15,
        2,
        17,
        4.6,
        18,
        7
      ];
      const result1 = evaluate(expression, {zoom: 15});
      assert.equal(result1.toFixed(4), "2.0000");
      const result2 = evaluate(expression, {zoom: 17});
      assert.equal(result2.toFixed(4), "4.6000");
      const result3 = evaluate(expression, {zoom: 16});
      assert.equal(result3.toFixed(4), "3.2797");
    });

    it("evaluates correctly out of range", function() {
      const expression = [
        "interpolate",
        ["exponential", 1.5],
        ["zoom"],
        15,
        2,
        17,
        4.6,
        18,
        7
      ];
      const result = evaluate(expression, {zoom: 12});
      assert.equal(result.toFixed(4), "-1.5811");
    });
  });
});
