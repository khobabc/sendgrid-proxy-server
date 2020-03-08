const express = require('express')
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());

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