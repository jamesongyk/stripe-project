const express = require("express");
const app = express();
const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51HJ0ElBNpbuIyezR531WSekACb9EpLWvh41qlP26Op5wO26aeDqKtAC98oTHVzz9JRA60vQzcVnCGLCftBGkqR88004XHuYIfn");

app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1999;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    metadata: {integration_check: 'accept_a_payment'}
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
  let event;

  event = req.body;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');

      const fs = require('fs');
      const json2csv = require('json2csv');
      let rows;
      // If file doesn't exist, we will create new file and add rows with headers.    
      if (!fs.existsSync('successfulpayments.csv')) {
          rows = json2csv.parse(paymentIntent, { header: true });
      } else {
          // Rows without headers.
          rows = json2csv.parse(paymentIntent, { header: false });
      }
      // Append file function can create new file too.
      fs.appendFileSync('successfulpayments.csv', rows);
      // Always add new line if file already exists.
      fs.appendFileSync('successfulpayments.csv', "\r\n");

      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return res.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({received: true});
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));