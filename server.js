require('dotenv').config(); // read .env files
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// set public folder as root
app.use(express.static('public'));

// allow front-end access to node_modules
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// redirect all traffic to index.html - since its a one page website, makes sense
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// listen for http request on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});
