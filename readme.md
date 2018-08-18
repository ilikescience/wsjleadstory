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

Both `data` and `cardConfiguration` are objects that accept the following properties:

| Property | Type | Description | Options | Default |
| -- | -- | -- | -- | -- |
| actions | boolean | If `false,` the card won’t have actions (save, share, comment) | `true` `false` | `true` |
| alignment | string | Sets the alignment for all text elements (flash line, headline, summary, and byline) | `’left'` `’right’` | `'left'` |
| borders | [borders](#Borders) object | Styles the card’s borders. |  See [borders](#borders) | `{ bottom: ‘light’ }`|
| bullets | array of strings | Appends additional, related headlines to a card | - | `[]` |
| byline | string | Sets the attribution after the card’s summary | - | `false` |
| colorTheme | string | Sets a class that refers to color theme CSS. | `’standard’` `’inverted`’ | `’standard’` |
| commentCount | integer | Sets the comment count to be displayed in the card’s actions. If `0`, no comment count is displayed. | - | 0 |
| flashline | string | Sets the text that appears in the card’s flashline. | - | `false` |
| headline | [headline](#Headlines) object | Sets and styles the card’s headline. | See [headlines](#headlines) | `
{ size: 'm', position: 'bottom', ornament: false, style: 'News’}` |
| media | [media](#Media) object | Sets and styles the card’s media. | See [media](#media) | `{position: 'first', aspectRatio: 1.5}` |
| orientation | string | Sets the card’s overall layout direction | `’vertical’` `’horizontal'` | `’vertical’` |
| timestamp | timestamp integer in milliseconds | Dictates if the card should show a fuzzy timestamp (eg ’23 minutes ago’) | - | `false` |
| trending | boolean | Shows or hides the ‘trending’ element | `true` `false` | `false` |

### Example

```js
{
	actions: true,
	alignment: ‘left’,
	borders: {
		bottom: ‘light’
	},
	bullets: [
		‘An additional headline’
	],
	byline: ‘Matthew Strom’,
	colorTheme: ‘standard’,
	commentCount: 420,
	flashline: 'Example',
	headline: {
		ornament: false,
		position: 'bottom',
		size: 'm',
		style: 'News',
		text: 'A Rad Example Card'
	},
	media: {
		aspectRatio: 1.5,
		caption: 'A really good caption',
		credit: 'Matthew Strom',
		position: 'first',
		type: 'image',
		url: 'http://placehold.it/300/400'
	},
	orientation: 'vertical',
	timestamp: 1534630244000,
	trending: false
```

## Borders

The borders object can be used in the `+card()` `+column()` `+row()` objects to set and style borders.

| Property | Type | Description | Options |
| -- | -- | -- | -- |
| top | string | Sets and styles the top border | `’light'` `’heavy’` |
| right | string | Sets and styles the right border | `’light'` `’heavy’` |
| bottom | string | Sets and styles the bottom border | `’light'` `’heavy’` |
| left | string | Sets and styles the bottom border | `’light'` `’heavy’` |

## Headlines

Headlines are set and styled with the following properties:

| Property | Type | Description | Options |
| -- | -- | -- | -- |
| ornament | string | Adds additional elements to the headlines associated with elders and a-heds. | `’leder'` `’ahed'` |
| position | string | For inlay-style headlines, changes where the headline appears over the image. This property has no effect on non-inlaid cards. | `’top'` `’bottom'` |
| size | string | Sets the size of the headline | `’xl’` `’l’` `’m’` `’s'` |
| style | string | Sets the font style of the headline | `’News’` `’Opinion’` `’Life`’ |
| text | string | Sets the text of the headline | - |

## Media

Media is set and styled with the following properties:

| Property | Type | Description | Options |
| -- | -- | -- | -- |
| aspectRatio | float | For images served from imageManager, and images used in an inlay-style card, sets the aspect ratio of the media. | - |
| caption | string | Sets the text of the image’s caption | - |
| credit | string | Sets the text of the media’s credit | - |
| position | string | Dictates where in the card the image should appear. For cards with a vertical orientation, ‘left’ and ‘right’ have no effect. | `'first'` `’left'` `’middle'` `’right'` `’last'` `’behind'` |
| type | string | enables different styling of the media based on type | `’image'` `’video`’ |

