const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'site')));

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));