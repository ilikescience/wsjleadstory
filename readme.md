# WSJ Homepage Sandbox

## Dependencies

You'll need to install [Gulp](https://gulpjs.org/getting-started.html) to build the project, which also requires Node and NPM.

## Getting Started

### 1. Install Dependencies

Run `npm i` or `yarn install` to install all dependencies.

### 2. Build, watch, and serve

Run `gulp` to begin working on the project.

You can also run commands individually with gulp:

|Command            |Description|
|--                 |--|
|build:fonts        |moves fonts to the build folder|
|build:icons        |compresses icons, creates a single svg and moves it to the build folder|
|build:images       |compresses images and moves them to the build folder|
|build:scripts      |bundles all client-side javascript files into the build folder|
|build:styles       |compiles all css files into the build folder|
|build:templates    |compiles the pug templates to the build folder|
|default            |builds the site, serves it locally and redeploys when files are changed|
|help               |Display help text|
|serve              |serves static templates locally |
|serve:browsersync  |proxies the localhost server via BrowserSync to dynamically update assets|
|watch              |waits for changes in project files and attempts to rebuild them|
|watch:fonts        |watches the source fonts for changes and moves them to the build folder when they do|
|watch:icons        |watches the source icons folders and processes them when changed |
|watch:images       |watches the source images folders and recompresses them when changed|
|watch:scripts      |waits for client-side javascript files to change, then rebuilds them|
|watch:styles       |waits for css files to change, then rebuilds them |
|watch:templates    |watches the templates folder for changes and recompiles them |

## Cards

The `+(card)` component is the workhorse of this prototype. It uses the following syntax:

`+card(data, cardConfiguration)`

Both `data` and `cardConfiguration` are objects that follow the following structure:

```js
{
    actions: boolean,
    alignment: string,
    borders: object,
    bullets: array
    colorTheme: string,
    commentCount: integer,
    flashline: string,
    headline: object,
    media: object,
    orientation: string,
    ornament: string,
    timestamp: string,
    trending : boolean,
    rows: integer,
}
```
