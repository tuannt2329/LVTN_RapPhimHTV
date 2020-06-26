const paypal = require('paypal-rest-sdk')
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Aa3-sGq2onRdaY8_VswCwdsEifJitfgsRrEgnTx4VvL5OnDqrAs7_Zu5kcjwfebsXiOEikxS-c3A2e7t',
  'client_secret': 'EO0hwI31fDEYY9WKzT3FKzkO8lFpTa3hviVE0iD1M3yAFV0Bgw9AcBDW-kJOsDkd54KIOVjuczvIDxEt'
});

const handler = ({ model }, _) => async (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:8000/paypal/success",
        "cancel_url": "http://localhost:3000"
    },
    "transactions": [{
        "item_list": {
            "items": [{
              "name": req.body.TenFilm + " ticket",
              "sku": "001",
              "price": req.body.GiaVe,
              "currency": "USD",
              "quantity": 1,
              "description": "TenPhong: " + req.body.TenPhong + "\t\nTenGhe: " +
                            req.body.TenGhe
            }]
        },
        "amount": {
            "currency": "USD",
            "total": req.body.GiaVe
        }
        
    }]
  };

   paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.send({error});
    } else {
      
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          var vexemphim = req.body
          global.vexemphim = vexemphim
          const result = payment.links[i].href
          res.send({result});
        }
      }
    }
  });

}

const runner = new Runner('pay', 'post', handler)

module.exports = runner
