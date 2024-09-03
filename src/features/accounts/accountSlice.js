const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      //   LATER
      // return { ...state, loan: action.payload };
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    case 'account/convertingCurrency':
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

// Create one action creator for possible action
export function deposit(amount, currency) {
  console.log('currency');
  console.log(currency);
  // If the currency is already in USD dollars then there is nothing to convert
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  // API Call
  // Middleware
  // Thunk
  // Return a function
  // The function will be execute before dispatching anything to the store
  // This function gets access to the dispatch action and the current state.
  return async function (dispatch, getState) {
    console.log('current state in thunk:');
    console.log(getState());

    dispatch({ type: 'account/convertingCurrency' });

    // API Call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    console.log(data);

    const converted = data.rates.USD;

    // return action;
    // Dispatch action to the store
    // So now we have the value that we actually want to dispatch to the store and so we now need to return our action.
    dispatch({ type: 'account/deposit', payload: converted });
  };
}

export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: 'account/payLoan' };
}
