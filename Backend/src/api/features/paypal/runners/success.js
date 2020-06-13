const paypal = require('paypal-rest-sdk')
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Aa3-sGq2onRdaY8_VswCwdsEifJitfgsRrEgnTx4VvL5OnDqrAs7_Zu5kcjwfebsXiOEikxS-c3A2e7t',
  'client_secret': 'EO0hwI31fDEYY9WKzT3FKzkO8lFpTa3hviVE0iD1M3yAFV0Bgw9AcBDW-kJOsDkd54KIOVjuczvIDxEt'
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
        res.redirect("http://htvcinemas.live/successpayment");
    }
  });

}

const runner = new Runner('success', 'get', handler)

module.exports = runner
