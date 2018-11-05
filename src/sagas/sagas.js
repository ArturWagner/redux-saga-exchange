import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import request from 'superagent';

function getExchange(currency) {
  const url = `https://api.exchangeratesapi.io/latest?base=${currency}`;
  return request
          .get(url)
    .then((data) => {
      return JSON.parse(data.text);
    })
    .catch((err) => {
      return JSON.parse(err.text);
    });
}

function* callGetExchange({currency, resolve, reject}) {
  const result = yield call(getExchange, currency);
  console.log(result);
  console.log(result.base);
  if (result.base) {
    yield put({type: "EXCHANGE_FETCHED", result});
    yield call(resolve);
  } else{
    yield call(reject, {currency: 'No data for this currency'});
  }
}

function* getExchangeSaga() {
  yield* takeEvery("FETCH_EXCHANGE", callGetExchange);
}

export default function* root() {
  yield [
    fork(getExchangeSaga)
  ]
}
