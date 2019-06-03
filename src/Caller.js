import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {of, zip} from "rxjs";
import {ajax} from "rxjs/ajax";
import * as providers from "./ProvidersProvider"

export function callServices() {
  return userCall().pipe(
      mergeMap(user =>
          zip(paypalCall(), payuCall(), creditcardCall()).pipe(
              map(([paypal, payu, creditcard]) => merge(user, paypal, payu, creditcard))
          )
      )
  )
}
function merge(jsonUser, jsonPaypal, jsonPayU, jsonCreditCard) {
  return {
    user: jsonUser,
    paypal: jsonPaypal,
    payu: jsonPayU,
    creditcard: jsonCreditCard,
    providers: providers.calculateProviders(jsonCreditCard, jsonPaypal, jsonPayU)
  }
}

function payuCall() {
  return callService("http://localhost:3000/payu/active")
}

function paypalCall() {
  return callService("http://localhost:3000/paypal/verify")
}

function userCall() {
  return callService("http://localhost:3000/user")
}

function creditcardCall() {
  return callService("http://localhost:3000/creditcard/allowed")
}

function callService(url) {
  return ajax(url).pipe(
      tap(response => console.log('response: ', response)),
      map(response => response.response),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      }));
}