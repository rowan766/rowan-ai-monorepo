import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',  // 修改：匹配 package.json 中的 main
      format: 'cjs',
      sourcemap: true,
      exports: 'named'  // 添加：支持具名导出
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',  // 修改：使用 'es' 而不是 'esm'
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve({
      browser: true  // 添加：针对浏览器环境优化
    }),
    postcss({
      extract: 'styles.css',
      modules: true,
      use: ['sass'],
      plugins: [autoprefixer()],
      minimize: true
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      rootDir: 'src'  // 添加：指定根目录
    })
  ],
  external: [
    'react',
    'react-dom',
    '@rowan/rw-libs',
    '@rowan/rw-hooks'
  ]
};