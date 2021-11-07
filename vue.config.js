module.exports = {
    css: {
      loaderOptions: {
        sass: {
            prependData: `
            @import "@/assets/css/main.scss";
            `
        }
      }
    },
    configureWebpack: (config)=>{
      // production 關閉console
      // if(process.env.NODE_ENV === 'production'){
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      // }
    },
  };