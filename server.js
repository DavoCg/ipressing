var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));

app.listen(5678, function(){
    console.log('server listen ')
});