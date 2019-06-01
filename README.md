# Evaluate Mapbox GL Interpolate expressions

Usage:

```js
const {evalMapboxGlInterpolate} = require("eval-mapbox-gl-interpolate");

const expression = [
  "interpolate",
  ["linear"],
  ["zoom"],
  10,
  1,
  12,
  2
];

const args = {zoom: 11};

// 1.5
evalMapboxGlInterpolate(expression, args);
```

Testing:

```
yarn test
```
