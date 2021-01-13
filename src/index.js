import fs from 'fs-extra'
import path from 'path'
import svgstore from 'svgstore'

function getSprites(options) {
  const inputFolder = options.inputFolder || 'src/icons'
  const sprites = svgstore(options)
  const icons_dir = path.resolve(inputFolder)
  for (const file of fs.readdirSync(icons_dir)) {
    const filepath = path.join(icons_dir, file)
    const svgid = path.parse(file).name
    let code = fs.readFileSync(filepath, { encoding: 'utf-8' })
    sprites.add(svgid, code)
  }
  return sprites
}

export default function svgicons(options = {}) {
  const output = options.output || 'dist/bundle.svg'

  return {
    name: 'rollup-plugin-svg-icons',
    renderChunk: async (code) => {
      if (!options.injectToHtml) {
        return { code }
      }
      const sprites = getSprites(options)
      const content = sprites.toString({ inline: !!options.inline })
      const svgNodeInsert =
        "if (window) { window.document.addEventListener('DOMContentLoaded', function(){ const div = document.createElement('div'); div.setAttribute('style', 'position: absolute; height:0; width: 0; overflow: hidden;');  div.innerHTML = " +
        JSON.stringify(content) +
        ';  window.document.body.appendChild(div) }); }'
      return { code: code + svgNodeInsert }
    },
    generateBundle: async () => {
      if (!options.injectToHtml) {
        const sprites = getSprites(options)
        fs.ensureFileSync(path.resolve(output))
        fs.writeFileSync(
          path.resolve(output),
          sprites.toString({ inline: !!options.inline }),
        )
      }
    },
  }
}
