import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

import autoprefixer from 'autoprefixer'
import cssnanoPlugin from 'cssnano'
import postcssMixins from 'postcss-mixins'
import postcssNested from 'postcss-nested'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({...templateCompilerOptions})
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer,
        cssnanoPlugin,
        postcssMixins,
        postcssNested,
      ]
    }
  }
})
