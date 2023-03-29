// module.exports =  (router) => {
//   router.get('/welcome', async function (ctx, next) {
//     ctx.state = {
//       title: 'koa2 title'
//     };

//     await ctx.render('welcome', {title: ctx.state});
//   })
// }


module.exports = (router) => {
  router.get('/', async function (ctx, next) {
    ctx.state = {
      title: 'index',
      list:[
        {url:"./scpServerHeader"}
      ]
    };


    await ctx.render('index', { title: ctx.state, list:ctx.list });
  })
  router.get('/scpServerHeader', async function (ctx, next) {
    ctx.state = {
      title: 'Content-Security-Policy'
    };
    ctx.response.set('Content-Security-Policy', "default-src 'self' https://www.baidu.com/ https://infragrid.v.network ; font-src 'self'; img-src 'self'; script-src 'self' 'unsafe-inline'  https://cdn.bootcdn.net sha256-oObbjF5z/1CQHCDzUnGPvK/axvOrtFqpVp7V+0s+fwo=; style-src 'self' https://cdn.bootcdn.net; frame-src 'self'")

    await ctx.render('scpServerHeader', { title: ctx.state });
  })

  router.get('/scpMeta', async function (ctx, next) {
    ctx.state = {
      title: 'Content-Security-Policy'
    };
   

    await ctx.render('scpMeta', { title: ctx.state });
  })
  
}
