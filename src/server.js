var express = require('express')
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));

app.get('*',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.set('port',process.env.PORT || 5000);

app.listen(app.get('port'),function(){
    console.log("Admin Scallopx Server running on port %s  save", app.get('port'))
});