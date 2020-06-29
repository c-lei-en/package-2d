module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  publicPath: "/",

  // 将构建好的文件输出到哪里
  outputDir: "dist",

  //静态资源 (js、css、img、fonts) 目录 (相对于 outputDir 的)
  assetsDir: "assets",

  //指定生成的 index.html 的输出路径 (相对于 outputDir)
  indexPath: "index.html",

  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: true,

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,

  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  // compiler: false,
  runtimeCompiler: false, //关键点在这

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // 配置 webpack-dev-server 行为。
  devServer: {
    port: 3000,
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    proxy: null // string | Object
    // before: app => {
    //   // `app` 是一个 express 实例
    // }
  },

  chainWebpack: config => {
    // less Loader
    config.module
      .rule("less")
      .test(/\.less$/)
      .use("less-loader")
      .loader("less-loader")
      .end()
      .use("style-loader")
      .loader("style-loader")
      .end()
      .use("css-loader")
      .loader("css-loader")
      .end();
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options({
        raw: true
      });
  },

  // CSS 相关选项
  css: {
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      scss: {}
    }
  }
};
