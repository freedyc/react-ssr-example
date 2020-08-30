import React from 'react';
import App from '../shared/App';
import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';

import { StaticRouter, matchPath } from "react-router-dom";
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux';

import { createServerStore } from '../shared/store';
import routes from '../shared/route';

const store = createServerStore();
const app = new Koa();
const router = new Router();
router.get(["/","/about"], (ctx, next) => {

    // inside a request
    const promises = [];
    // use `some` to imitate `<Switch>` behavior of selecting only
    // the first to match
    routes.some(route => {
        // use `matchPath` here
        const match = matchPath(ctx.req.path, route);
        if (match) promises.push(route.loadData(match));
        return match;
    });

    Promise.all(promises).then(data => {
        // do something w/ the data so the client
        // can access it then render the app
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
                <script>window.REDUX_STORE = ${JSON.stringify(data)}</script>
                <div id="root">${html}</div>
            </body>
            </html>
        `
    });
})

router.get("/getData", (ctx) => {
    ctx.body = { code: 0, message: "", data: "后端返回的数据"}
})

app.use(serve('dist'));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('server start 🐯');
})