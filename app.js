const express = require('express'); // Import Express Libs
const multer  = require('multer');  // Import Multer - multipart form

const app = express(); // Bootstrap Express App.

const PORT = process.env.NODE_PORT || 3000; // NodeJS PORT

// App configurations.
const upload = multer({dest: "uploads/"});
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const routes = require('./routes/routes')

app.get('/', routes.home.get)
app.post('/', routes.home.post)

app.get('/upload', routes.uploads.get);
app.post('/upload', upload.single('avatar'), routes.uploads.processUploads)
app.post('/upload', routes.uploads.post)

app.get('/jobs', routes.jobs.get)

app.get('*', (req, res) => res.send("404 - Not Found"));

app.listen(PORT, () => {
    console.log(`Service starting at ${PORT}`)
})