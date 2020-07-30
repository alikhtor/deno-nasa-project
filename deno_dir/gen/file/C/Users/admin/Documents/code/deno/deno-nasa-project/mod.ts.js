import { Application } from "https://deno.land/x/oak@v6.0.1/mod.ts";
const app = new Application();
const PORT = 8000;
app.use(ctx => {
    console.log(ctx.request.body);
    ctx.response.body = `                                             _______ _______ _______
                                            |   |   |    ___|    |  |
                                            |       |    ___|       |
                                            |__|_|__|_______|__|____|
                     _______ ______ _______ _______    _______ _______ ______ _______ _______
                    |    ___|   __ \\       |   |   |  |    ___|   _   |   __ \\_     _|   |   |
                    |    ___|      <   -   |       |  |    ___|       |      < |   | |       |
                    |___|   |___|__|_______|__|_|__|  |_______|___|___|___|__| |___| |___|___|
                                            Mission Control API`;
});
if (import.meta.main) {
    console.log(import.meta);
    await app.listen({
        port: PORT
    });
    console.log(`Listen on port http://localhost:${PORT}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVwRSxNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQzlCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUVsQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHOzs7Ozs7OztnRUFRd0MsQ0FBQztBQUNqRSxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7SUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2IsSUFBSSxFQUFFLElBQUk7S0FDYixDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0NBQzFEIn0=