const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "FPT Bus System - Server",
            version: "0.1.0",
            description:
                "This platform provides an UI for API using",
            
            
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
