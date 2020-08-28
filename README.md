# Stripe Project

## How to Run 

### `npm install`

Installs the app.

### `npm start`

Runs the app.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  
Successful payments will be logged in successfulpayments.csv. File will be created on first successful payment if it does not exist.

### Test cases

4242 4242 4242 4242: Payment succeeds  
4000 0025 0000 3155: Payment requires authentication → Complete authentication  
4000 0025 0000 3155: Payment requires authentication → Fail authentication  
4000 0000 0000 9995: Payment is declined, insufficient funds.