export function compose(middleware) {
    return function composedMiddleware(context, next) {
        let index = -1;
        async function dispatch(i) {
            if (i <= index) {
                throw new Error("next() called multiple times.");
            }
            index = i;
            let fn = middleware[i];
            if (i === middleware.length) {
                fn = next;
            }
            if (!fn) {
                return;
            }
            await fn(context, dispatch.bind(null, i + 1));
        }
        return dispatch(0);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY0EsTUFBTSxVQUFVLE9BQU8sQ0FJckIsVUFBOEI7SUFFOUIsT0FBTyxTQUFTLGtCQUFrQixDQUNoQyxPQUFVLEVBQ1YsSUFBMEI7UUFFMUIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFZixLQUFLLFVBQVUsUUFBUSxDQUFDLENBQVM7WUFDL0IsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFO2dCQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQzthQUNsRDtZQUNELEtBQUssR0FBRyxDQUFDLENBQUM7WUFDVixJQUFJLEVBQUUsR0FBaUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxLQUFLLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDWDtZQUNELElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ1AsT0FBTzthQUNSO1lBQ0QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUM7QUFDSixDQUFDIn0=