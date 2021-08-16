# game-of-life

![example workflow](https://github.com/xander-jones/game-of-life/actions/workflows/.github/workflows/webpack.yml/badge.svg)

John Conway's Game of Life written in TypeScript. [See the live example here](https://xander-jones.github.io/game-of-life/)
## Development

To run a development server deploying the project:

```sh
$ npm install
$ npm run serve
```

## Build

To build the project into the `./dist` direcetory:

```sh
$ npm install
$ npm run build
```

Push the changes to Git, then deploy to the GitHub pages branch with:

```sh
$ git subtree push --prefix dist origin gh-pages
```
