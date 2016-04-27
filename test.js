// var express = require('express');
// var port = process.env.PORT || 6000;
// var path = require('path');
// var bodyParser = require('body-parser');

// var app = express();

// app.set('views', path.join(__dirname, 'views/pages'));
// app.set('view engine', 'jade');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.listen(port);
// console.log('server started on port ' + port);
var a = 1;
var b ;
console.log(a);
console.log(b);
console.log(typeof a);
console.log(typeof b);
var flag = typeof c;
console.log('flag:' + flag);
if(flag === 'undefined'){
    console.log('undefined');
}else{
    console.log('not undefined');
}