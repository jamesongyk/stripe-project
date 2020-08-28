import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import './App.css';
import CheckoutForm from "./CheckoutForm";

const promise = loadStripe("pk_test_51HJ0ElBNpbuIyezR3oFxZHSO5vzHAdUUOdTmpAYJeJQDSJqW3clvEZ2eKMHBrb4AhvRsnCKuWyVMzepxvD1rbG8Z00BaY0fxWZ");

function App() {
  return (
    <div className="App">
      <p>
        Please buy this exquisite Green Ping Pong Ball for $19.99!
      </p>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
