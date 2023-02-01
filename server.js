const app = require('./app')

app.listen(process.env.PORT || 8888, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT || 8888}`);
})