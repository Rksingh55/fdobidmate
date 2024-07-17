import React, { useEffect } from 'react';
import { fetchCurrencyList } from '../Reducer/currencySlice';
import { fetchCountryList } from '../Reducer/countrySlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';

const Rakesh: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currencyList = useSelector((state: RootState) => state.currency.list);
  const countryList = useSelector((state: RootState) => state.country.list);
  const status = useSelector((state: RootState) => state.currency.status);
  const error = useSelector((state: RootState) => state.currency.error);

  useEffect(() => {
    dispatch(fetchCurrencyList());
    dispatch(fetchCountryList());
  }, [dispatch]);

  return (
    <div>
      <h1>Currency List</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <ul>
          {currencyList.map((currency) => (
            <li key={currency.id}>{currency.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Rakesh;
