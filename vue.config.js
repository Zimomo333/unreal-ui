const fs = require('fs')
const path = require('path')

function getComponentEntries(dir) {
  const absPath = path.resolve(__dirname, dir);
  let files = fs.readdirSync(absPath);
  const componentEntries = files.reduce((ret, item) => {
      const itemPath = path.join(absPath, item)
      const isDir = fs.statSync(itemPath).isDirectory();
      if (isDir) {
          ret[item] = path.join(itemPath, 'index.js');
      } else {
          const [name] = item.split('.')
          ret[name] = path.join(absPath, 'index.js');
      }
      return ret
  }, {})
  return componentEntries
}

module.exports = {
  outputDir: path.resolve('lib'),
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      ...getComponentEntries('packages'),
    },
    output: {
      filename: '[name]/index.js',
    },
  },
  css: {
    extract: {
        filename: '[name]/style.css'
    }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('html')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')  // 删除自动加上的入口：./src/App.vue
  }
}