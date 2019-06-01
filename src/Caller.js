import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {of, zip} from "rxjs";
import {ajax} from "rxjs/ajax";

export function callServices() {
  return userCall().pipe(
      mergeMap(user =>
          zip(paypalCall(), payuCall()).pipe(
              map(([paypal, payu]) => merge(user, paypal, payu, {data: "empty"}))
          )
      )
  )
}
function merge(jsonUser, jsonPaypal, jsonPayU, jsonCreditCard) {
  return {
    user: jsonUser,
    paypal: jsonPaypal,
    payu: jsonPayU,
    creditcard: jsonCreditCard
  }
}

function payuCall() {
  return callService("http://localhost:8080/payu")
}

function paypalCall() {
  return callService("http://localhost:8080/paypal")
}

function userCall() {
  return callService("http://localhost:8080/user")
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