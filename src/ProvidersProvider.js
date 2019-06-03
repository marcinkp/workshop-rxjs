
export function calculateProviders(creditCard, paypal, payU) {
  var providers = []
  if (creditCard != null && creditCard.allowed){
    providers.push(getProviderData(creditCard, "label", "url"));
  }
  if (paypal != null && paypal.verified) {
    providers.push(getProviderData(paypal, "label", "paymentUrl"));
  }
  if (payU != null && payU.status === "OK") {
    providers.push(getProviderData(payU, "name", "link"));
  }
  return {
    timestamp: Date.now(),
    providers: providers,
  };
  ;
}


function getProviderData(data, label, paymentUrl) {
  return {
    "label": data[label],
    "paymentUrl": data[paymentUrl],
  }
}