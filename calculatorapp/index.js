const express = require('express');
const app = express();
const port = 3000;

app.use("/",require("route"));

app.listen(port, () => {
    console.log(` listening at http://localhost:${port}`);
});