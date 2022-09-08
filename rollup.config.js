import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import sourceMaps from 'rollup-plugin-sourcemaps'

const options = {
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [
      'assert',
      'child_process',
      'constants',
      'crypto',
      'events',
      'fs',
      'http',
      'https',
      'net',
      'path',
      'stream',
      'url',
      'util',
      'os',
      'worker_treads',
      'zlib',
      'node:os',
      'node:process',
      'node:bundle'
    ],
      watch: {
        include: ['index.js', 'setup-session.js'],
      },
      plugins: [    
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs({
          ignore: ['worker_threads'],
        }),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),
    
        // Resolve source maps to the original source
        // sourceMaps(),
      ],
    }

export default [
    {
        input: 'src/index.js',
        output: { file: 'dist/index.esm.js', format: 'esm' },
        ...options
    },
    // {
    //     input: ['src/setup-session.js'],
    //     output: [{ file: 'dist/setup-session.js', format: 'es', sourcemap: true }],
    //     ...options
    // }
]
