module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "unreal-ui",
        "root": "index",  // 整体引入目录
        "style": true
      }
    ]
  ]
}
