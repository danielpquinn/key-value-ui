# Key value pairs UI

<img width="600" alt="image" src="https://github.com/danielpquinn/key-value-ui/assets/300894/ecd53f2d-64b2-46a8-9457-a37f9a44e68e">

A UI for editing key value pairs.

Technologies used:
* React
* TypeScript
* [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React) - Minimalistic UI component library
* [React query](https://github.com/tanstack/query) - Manages querying and mutating key value API data
* [React testing library](https://github.com/testing-library/react-testing-library) - UI unit testing library
* [Jest](https://github.com/jestjs/jest) - Unit testing framework

## Local development

```bash
npm install && npm run dev
```

UI will be available at http://localhost:5173. To manage key value pairs, start the API server at http://localhost:8080.

### Unit testing

Line coverage threshold is set to 50%.

```bash
npm run test
```

## Build

Linting or unit test errors will cause the build to fail. Output is built to the `/dist` folder.

```bash
npm run build
```
