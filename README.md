## Project on Typescript


Project use NPM + SASS + TYPESCRIPT 2 + WEBPACK 2 + WEBPACKSERVER + HMR + SOME LIBS/PLUGINS


Script available:
```
tsc  src/main.ts --outDir out
"prebuild": "rimraf dist && npm cache clean",
"build": "webpack --env=dev --display-error-details",
"prod": "webpack --env=prod",
"start": "http-server dist",
"dev": "webpack-dev-server --env=dev ./src/main.ts --inline  --hot",
"go": "npm run build && npm run start",
"ts": "tsc src/main.ts --outDir out"
```