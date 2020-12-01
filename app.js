const express = require('express')
const app = express()
const { config, engine } = require('express-edge')
const compression = require('compression')

app.use(compression())
app.use(express.static('dist'))
const port = process.env.PORT || 3000

config({ cache: process.env.NODE_ENV === 'production' })
app.use(engine);

app.set('/view', `${__dirname}/dist`)

app.get('/', function (req, res) {
    res.render('index.html');
})
// app.use((req, res, next) => {
//     if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
//         res.redirect(`https://${req.hostname}${req.url}`);
//     else
//         next();
// });

app.listen(port, () => {
    console.log('Heroku listening on port %s', port)
});