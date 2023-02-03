const options = {
    definition: {
        openapi: "3.0.0",
        // swagger: "2.0",
        info: {
            title: "Tesst",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 8888}`,
            },
        ],
    },
    apis: ['./src/routers/*.js','./src/models/*.js'],
};
module.exports = options;
