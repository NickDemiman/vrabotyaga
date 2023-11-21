'use strict';

var express = require('express');
var path = require('path');

const app = express();

const PORT = 9000;

app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, function () {
    console.log(`Server listening port ${PORT}`);
});
