const paypal = require('paypal-rest-sdk')
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ASsxfaXEA2Mq0vB7OHm_s09c1MxhwC94RBJGfWV7svB4LDTlwzvcIkWusD823DFsj9juI4xTOSwzeplP',
  'client_secret': 'EMOhuFU0ZHg1mxge3sYSfY-FuYjZVXtYjdN94il7sSpQ608gHY1y7L5UOxESIE7MT3j571Dh9qF_KWI0'
});

const handler = ({ model }, _) => async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": vexemphim.GiaVe
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
       res.send({cancle : error});
    } else {
        res.redirect("http://conallserver.ddns.net:3000/successpayment");
    }
  });

}

const runner = new Runner('success', 'get', handler)

module.exports = runner
