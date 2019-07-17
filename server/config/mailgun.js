const Sentry = require('@sentry/node')

module.exports = (app) => {
  const MAILGUN_API_KEY = '728d1bac14cb7fb841c8d3c5b34110e7-fd0269a6-e933ced7'
  const MAILGUN_DOMAIN = 'sandbox2b6639593f56421896f5c5a403e90533.mailgun.org'
  const fromWho = 'Hello@kassebil.dk'

  app.get('/submit/:mail', function (req, res) {
    const mailgun = require('mailgun-js')({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN })
    const data = {
      from: fromWho,
      to: req.params.mail,
      subject: 'Hello from Mailgun',
      html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
    }
    mailgun.messages().send(data, function (err, body) {
      if (err) {
        res.status(400).json({ error: err })
        console.log('got an error: ', err)
        Sentry.captureMessage('Admin CMS: Email is not sending', 'error')
        Sentry.captureException(err)
      } else {
        res.status(200).json({ email: req.params.mail })
        console.log(body)
      }
    })
  })
  app.get('/validate/:mail', function (req, res) {
    const mailgun = require('mailgun-js')({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN })
    const members = [
      {
        address: req.params.mail
      }
    ]
    mailgun.lists('NAME@MAILINGLIST.COM').members().add({ members: members, subscribed: true }, function (err, body) {
      console.log(body)
      if (err) {
        Sentry.captureMessage('Admin CMS: Email Subscription is not working', 'error')
        Sentry.captureException(err)
      } else {
        res.status(200).json('Added to mailing list')
      }
    })
  })
}
