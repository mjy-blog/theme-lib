import terser from '@rollup/plugin-terser';

export default {
  input: 'compile/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [terser()],
};
