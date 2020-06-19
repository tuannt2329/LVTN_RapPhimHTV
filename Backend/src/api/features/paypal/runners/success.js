const mongoose = require('mongoose')
const TicketSchema = require('../../ticket/ticket-schema')
const ticketsSC = mongoose.model('ticket', TicketSchema)
const FilmSchema = require('../../film/film-schema')
const filmsSC = mongoose.model('film', FilmSchema)
const SendEmail = require('../../user/send-email')

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

  paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
    if (error) {
       res.send({cancle : error});
    } else {
      try {
        let param = {
          TenFilm : vexemphim.TenFilm,
          TenPhong: vexemphim.TenPhong,
          ThoiGianChieu: vexemphim.ThoiGianChieu,
        }
        const ticket = await ticketsSC.find(param)

        if (ticket.length != 0) {
          for (let i = 0; i < ticket.length; i++) {
            for (let z = 0; z < vexemphim.TenGhe.length; z++) {
              for(let y = 0; y < ticket[i].TenGhe.length; y++) {
                if(ticket[i].TenGhe[y] === vexemphim.TenGhe[z]) {
                  return res.send({ error: 'ticket exist!' })
                }
              }
            }
          }
        } 

        const result = await ticketsSC.create(vexemphim)
        if(result) {
          if(vexemphim.payed === true) {
            var content = 'You have successfully bought tickets of HTV cinema'
            var subject = 'Successful ticket purchase'
          } else {
            content = 'You have successfully booked tickets of HTV cinema'
            subject = 'Successful ticket booked'
          }
          const tfilm = {TenFilm: vexemphim.TenFilm }
          const films = await filmsSC.find(tfilm)
          if (films) {
            const result = await filmsSC.updateMany(
              { TenFilm: vexemphim.TenFilm },
              { $set: { 
                  TongThu: vexemphim.GiaVe + films[0].TongThu
                }
              })

            const a = await sendEmail(vexemphim.email, subject, content)
            // res.send({ content: subject })
            res.redirect("http://htvcinemas.live/successpayment");
          } else {
            return res.send({ error: 'film don\'t exist!' })
          }
        }
      } catch (error) {
        res.send({ error })
      }
    }
  });

}

const runner = new Runner('success', 'get', handler)

module.exports = runner
