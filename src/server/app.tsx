import React from 'react';
import App from '../shared/App';
import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';

import { StaticRouter, matchPath } from "react-router-dom";
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux';
import { createServerStore } from '../shared/store';
import routes from '../shared/Routes';

const app = new Koa();
const router = new Router();
const store = createServerStore();


router.get(["/","/about"], async (ctx) => {
    const promises = [];
    // use `some` to imitate `<Switch>` behavior of selecting only
    // the first to match
    routes.some(route => {
        // use `matchPath` here
        const match = matchPath(ctx.request.url, route);
        // console.log(JSON.stringify(match));
      if (match && route.loadData) {
        promises.push(route.loadData(store));
      }
      return match;
    });
    
    await Promise.all(promises).then((data) => {
        const html = renderToString(
            <Provider store={store}>
                <StaticRouter location={ctx.req.url}>
                    <App />
                </StaticRouter>
            </Provider>
        );
        ctx.body = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>React SSR</title>
            </head>
            <body>
                <script type="text/javascript">window.REDUX_STORE="${data}"</script>
                <div id="root">${html}</div>
                <script src="bundle.js"></script>
            </body>
            </html>
        `
    });
})

router.get("/getData", (ctx) => {
    ctx.body = { code: 0, message: "", data: "后端返回的数据" }
})

app.use(serve('public'));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('server start 🐯');
})