import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import authenticate from './utils/auth';

const app = express();

app.set("trust proxy", true);
app.set("x-powered-by", false);
app.set("port", process.env.PORT || 4000);

/*var httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl/server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl/server.crt'))
};*/

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression());
/*app.use(require("method-override")());*/


// Routes
app.get("/", authenticate('enlite', 'enlite2016'), function(req, res) {
    res.sendFile(path.join(__dirname, '../html', 'index.html'));
});

app.listen(app.get("port"));
//https.createServer(httpsOptions, app).listen(443);
console.info("Server started on localhost: 4000");
