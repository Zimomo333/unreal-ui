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

const devConfig = {
  css: {
    sourceMap: true,  // 显示样式来源，方便调试
  }
}

const proConfig = {
  outputDir: path.resolve('lib'),
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      ...getComponentEntries('packages'),
    },
    output: {
      // filename: (pathData) => {
      //   // 整体入口放到根目录
      //   return pathData.chunk.name === 'index' ? '[name].js' : '[name]/index.js';
      // },
      filename: '[name]/index.js',
      libraryExport: 'default',
      libraryTarget: 'commonjs2',
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

module.exports = process.env.NODE_ENV === "development" ? devConfig : proConfig;