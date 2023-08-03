// require('esbuild').build({
//     entryPoints: ['index.ts'],
//     bundle: true,
//     outfile: 'out.js',
//   }).catch(() => process.exit(1))
// https://github.com/evanw/esbuild/blob/main/lib/shared/types.ts
// const  sveltePlugin  = require("esbuild-svelte")
const { build, context } = require('esbuild')
build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    // outfile: '',
    // minify: false,
    sourcemap:true,
    outdir: 'dist',
    // watch: {
    //   onRebuild(error, result) {
    //     if (error) console.error('watch build failed:', error)
    //     else console.log('watch build succeeded:', result)
    //   },
    // },
    // outbase: './',
    // watch:true,
    // platform: 'node',
    // target:[]
    // loader: {
    //     '.png': 'dataurl',
    //     '.svg': 'text',
    //   },
    // plugins: [sveltePlugin()],
    // inject: ['./process-shim.js'],
    // define: { 'process.cwd': 'dummy_process_cwd' },
     // external:[] //  排除
    format: 'esm',
    loader: { '.ts': 'ts' },


    
  }).then(result => {
    console.log('watching...')
  
  

  })
  