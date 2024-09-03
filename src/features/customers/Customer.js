import { useSelector } from 'react-redux';

function Customer() {
  // So here we're reading that value from the store and so as soon as that value is updated in the store so basically in the global state then this component has re rendered
  const customer = useSelector(store => store.customer.fullName);
  console.log(customer);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
