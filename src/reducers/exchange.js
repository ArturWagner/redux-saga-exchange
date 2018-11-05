function exchange(state = {}, action) {
  switch(action.type) {
    case 'EXCHANGE_FETCHED':
      return action.result;
    default:
      return state;
  }
}

export default exchange;
