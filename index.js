const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const hbs = require('hbs');
const path = require('path');
const templatepath = path.join(__dirname + '/template/views');
const partialspath = path.join(__dirname + '/template/partials');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// configure template engine
app.set('view engine', 'hbs');
app.set('views', templatepath);
hbs.registerPartials(partialspath);

// handelbars helpers
hbs.registerHelper('concat', function () {
    var outStr = '';
    for (var arg in arguments) {
        if (typeof arguments[arg] != 'object') {
            outStr += arguments[arg];
        }
    }
    return outStr;
});

app.use('/', require('./router/router'));

app.listen(PORT, () => console.log('server started at port ', PORT));
