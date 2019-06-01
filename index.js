const d3 = require("d3-scale");

const evaluate = (expression, args) => {
  if (!args) args = {};
  const [operator, interpolationType, inputName, ...stops] = expression;
  if (operator != "interpolate") {
    throw Error("Expected `interpolate` as the first value in the array.")
  }

  const baseFn = extractInterpolationFn(interpolationType);

  const domain = [];
  const range = [];
  for (let i = 0; i < stops.length; i += 2) {
    domain.push(stops[i]);
    range.push(stops[i + 1]);
  }

  const fn = baseFn.domain(domain).range(range);

  const inputValue = args[inputName];
  if (isNaN(inputValue)) {
    throw Error(`Expected argument value for ${inputName}`);
  }

  return fn(inputValue);
};

// interpolationFnParam is like ["linear"] or ["exponential", 1.2]
const extractInterpolationFn = (interpolationType) => {
  const [typeName, ...params] = interpolationType;
  switch (typeName) {
    case "linear":
      return d3.scaleLinear();
    case "exponential":
      return d3.scalePow().exponent(params[0]);
    default:
     throw Error(`Unknown interpolation type: ${interpolationType}`);
  }
}

exports.evaluate = evaluate;
