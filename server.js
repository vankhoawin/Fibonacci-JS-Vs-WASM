const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/wasm', (req, res) => {
  res.render('wasm.html');
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
