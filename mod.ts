import { Application, send } from 'https://deno.land/x/oak@v6.0.1/mod.ts';

import api from './api.ts';

const app = new Application();
const PORT = 8000;

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const delta = Date.now() - start;
    ctx.response.headers.set('X-RESPONSE-TIME', `${delta}ms`);
});

app.use(api.routes());
app.use(api.allowedMethods());

app.use(async (ctx) => {
    const filePath = ctx.request.url.pathname;
    const fileWhiteList = [
        '/index.html',
        '/javascripts/script.js',
        '/stylesheets/style.css',
        '/images/favicon.png'
    ]
    if (fileWhiteList.includes(filePath)) {
        await send(ctx, filePath, {
            root: `${Deno.cwd()}/public`
        });
    }
})

if (import.meta.main) {
    app.listen({
        port: PORT
    });
    console.log(`Listen on http://localhost:${PORT}`);
}
