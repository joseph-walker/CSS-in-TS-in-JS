# CSS in TS in JS

Premise: CSS is difficult to organize when you have a lot of it. CSS modules are one approach to solving this problem and a great deal of literature exists in how to use Webpack to import CSS files in JS source.

However, Typescript is slightly different in that even though the Webpack loader doesn't care about the source format, the Typescript Compiler does. Typescript can only import a file if it knows what to do with it. In the case of importing Typescript, it's obvious. In a .js file's case, Typescript knows what to do built-in. For other files types, though, the `tsc` is clueless. In these instances, you must provide a Type Definition file for the compiler to be happy.

Because of this, the general approach works the same as loading CSS in JS, but requires an extra step in the form of either

1) Writing Type Definitions by Hand
2) Having a pre-compile step generate Type Definitions for CSS files before the compiler is run

## Existing Tools

There are a few existing tools to automate the generation of Type Definition files. These two are the most promising:

- https://github.com/Jimdo/typings-for-css-modules-loader
- https://github.com/Quramy/typed-css-modules

The loader approach has a flaw in that because it is run while Webpack is compiling, the first compile will fail as the Type Definition is not generated until _after_ the Typescript file asks for it (since loaders are lazy).

The command line tool approach, however, is workable.

## Custom TCM Plugin

By creating a small plugin that spawns the `tcm` command, we can hook into the Webpack `beforeRun` step and generate the necessary Type Definition files in situ before Webpack ever starts running.

## Running the Example

```
npm install
npm run build
cd dist
http-server -o // Or some other static server tool that can open a directory in a web browser
```