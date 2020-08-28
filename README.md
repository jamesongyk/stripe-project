# Stripe Project

## How to Run 

### `npm install`

Installs the app.

### `npm start`

Runs the app.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  

### Test cases

4242 4242 4242 4242: Payment succeeds  
4000 0025 0000 3155: Payment requires authentication → Complete authentication  
4000 0025 0000 3155: Payment requires authentication → Fail authentication  
4000 0000 0000 9995: Payment is declined, insufficient funds.

### Logging of Successful Payments
Successful payments will be logged in successfulpayments.csv as a proof of concept for asynchronous fulfilment of customer orders. (File will be created on first successful payment if it does not exist.)  
This feature will not work given this app will be evaluated locally. It requires following the instructions located [here](https://stripe.com/docs/payments/handling-payment-events#build-your-own-webhook) and using the CLI to forward events to the local webhook endpoint at [http://localhost:4242/webhook](http://localhost:4242/webhook).