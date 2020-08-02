import { Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";

const router = new Router();

router.get('/', (ctx) => {
    ctx.response.body = `                         _______ _______ _______
                        |   |   |    ___|    |  |
                        |       |    ___|       |
                        |__|_|__|_______|__|____|
 _______ ______ _______ _______    _______ _______ ______ _______ _______
|    ___|   __ \\       |   |   |  |    ___|   _   |   __ \\_     _|   |   |
|    ___|      <   -   |       |  |    ___|       |      < |   | |       |
|___|   |___|__|_______|__|_|__|  |_______|___|___|___|__| |___| |___|___|
                          Mission Control API`;
});

export default router;