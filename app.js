var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(express.json());        /* is use to recognise incoming request*/    

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,PUT,OPTIONS,DELETE,GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// Routes

const route = require('./routes/index');

app.use(bodyParser.json());

try {
    app.use('/GameDetails', route);
    app.use('/userDetails', route);
}
catch (e) {
    console.log(e);
}

//Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'Development' ? err : {};
    const status = err.status || 500;
    console.error(err);
});

//Start the server
const port = app.get('port') || 4000;
app.listen(port, () => console.log('Server is listening on port ' + port));
