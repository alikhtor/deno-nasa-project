import { Application } from "https://deno.land/x/oak@v6.0.1/mod.ts";
const app = new Application();
const PORT = 8000;
app.use((ctx) => {
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
    app.listen({
        port: PORT
    });
    console.log(`Listen on port http://localhost:${PORT}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVwRSxNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQzlCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUVsQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDWixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRzs7Ozs7Ozs7Z0VBUXdDLENBQUM7QUFDakUsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO0lBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDUCxJQUFJLEVBQUUsSUFBSTtLQUNiLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLElBQUksRUFBRSxDQUFDLENBQUM7Q0FDMUQifQ==