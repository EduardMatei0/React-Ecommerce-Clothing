import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_1fBrMRpImNzsaTqMdfVcJ8bb00YPipJTGo";

  const onToken = token => {
    axios({
      url: "payment",
      method: "POST",
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(response => alert("Payment successfull"))
      .catch(error => {
        alert(
          "There was an issue with your payment. Please make sure you use a valid credit card!"
        );
        console.log("Payment error: ", JSON.parse(error));
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
