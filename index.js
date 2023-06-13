const express = require('express')
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');

console.log("Print Something");
console.log("Print Something");

const app = express();

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send', function (req, res) {
    sgMail.send(req.body).then(
        ()=> {
            res.send();
        },
        (error)=> {
            res.error(error);
        }
    )
})

app.listen(3310, function () {
  console.log('Sendgrid proxy server listening at 3310!')
});