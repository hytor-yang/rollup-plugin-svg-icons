# rollup-plugin-svg-icons

Bundles all svg icons from the specified folder to the single spritesheet svg file.

[![npm](https://img.shields.io/npm/v/rollup-plugin-svg-icons)](https://www.npmjs.com/package/rollup-plugin-svg-icons)   [![npm](https://img.shields.io/npm/dt/rollup-plugin-svg-icons)](https://www.npmjs.com/package/rollup-plugin-svg-icons)    [![](https://github.com/AlexxNB/rollup-plugin-svg-icons/workflows/Publish%20on%20NPM/badge.svg)](https://github.com/AlexxNB/rollup-plugin-svg-icons/actions?workflow=Publish+on+NPM) 

## Installation

```bash
npm i -D rollup-plugin-svg-icons
```

## Rollup configuration

```javascript
/* rollup.config.js */
import svgicons from 'rollup-plugin-svg-icons'

export default {
...
  plugins: [
    svgicons({
      // folder with svg-icons
      inputFolder: 'src/icons',  // it is default value

      // path for the sprite file
      output: 'dist/bundle.svg', // it is default value

      // Whether to inline the sprite result to document.body on 'DOMContentLoaded' (when applicable).
      // Setting to true will ignore 'output' option and not emit any bundle.
      injectToHtml: false, // it is default value

      // prefix for svg symbol id, e.g. symbolIdPrefix: 'icon-' and bower.svg would result in <symbol id="icon-bower">
      symbolIdPrefix: '', // it is default value

      // Also you can use any Svgstore options: 
      // https://github.com/svgstore/svgstore#svgstore-options
      //
      // cleanDefs
      // cleanSymbols
      // svgAttrs
      // symbolAttrs
      // copyAttrs
      // renameDefs
      // .. and inline option for `svgstore.toSting()` method

    })
    ...
  ]
  ...
}
```

## Usage in HTML

Use href `bundle.svg#iconid` where `iconid` is base part of svg-icon filename. For ex. if in source folder you have `myicon.svg` then you should use `bandle.svg#myicon`:

```html
<style>
.inline-svg-icon{
  display: inline-block;
  fill: currentColor;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
</style>

<svg class="inline-svg-icon">
  <use xlink:href="bundle.svg#iconid"></use>
</svg>

<!-- use id alone if 'injectToHtml' is set to true -->
<svg class="inline-svg-icon">
  <use xlink:href="#iconid"></use>
</svg>

<!-- and prefix href with the same value as specified in 'symbolIdPrefix' option -->
<svg class="inline-svg-icon">
  <use xlink:href="#prefix-iconid"></use>
</svg>
```

## Restrictions

Icons with gradients or some types of complex shapes will not be packed in the sprite correctly.

## Inspiration
Plugin based on [svgstore](https://www.npmjs.com/package/svgstore) package.

## License
MIT
