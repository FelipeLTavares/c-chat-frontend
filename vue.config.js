const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/_variables.scss";`
      },
    },
  },

  pluginOptions: {
    vuetify: {}
  }
};
