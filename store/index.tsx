import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import currencyReducer from '../Reducer/currencySlice';
import countryReducer from '../Reducer/countrySlice';
import clickedCardsSlice from '@/Reducer/clickedCardsSlice';
import themeConfigSlice from './themeConfigSlice';
import testSlice from '../Reducer/testSlice';
import tasksReducer from '../Reducer/testSlice';
import vendorType from '../Reducer/vendorTypeSlice';
import modeofpayment from '../Reducer/modeofpaymentSlice';
import termsofpayment from '../Reducer/termsofPaymentSlice';
import termsofDelivery from '../Reducer/termsofDeliverySlice';
import category from '../Reducer/categorySlice';
import question from '../Reducer/questionSlice';
import quotation from '../Reducer/quatationSlice';
import purchaseorder from '../Reducer/purchaseorderSlice';
import vendoReducer from '../Reducer/Vendor_Registeration_Slice/getvendordata';
import tenderlist from '../Reducer/tenderlistSlice';
import rfilist from '../Reducer/rfilistSlice';
import tenderInterestedSlice from '@/Reducer/tenderInterestedSlice';
import tenderpbglist_Slice from '@/Reducer/tenderpbglist_Slice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['clickedCards'],
};

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  testconfig: testSlice,
  tasks: tasksReducer,
  clickedCards: clickedCardsSlice,
  currency: currencyReducer,
  country: countryReducer,
  vendortype: vendorType,
  Category: category,
  question: question,
  quotation: quotation,
  purchaseorder: purchaseorder,
  modeofpayment: modeofpayment,
  termsofpayment: termsofpayment,
  termsofDelivery: termsofDelivery,
  vendordata: vendoReducer,
  Tenderlist: tenderlist,
  Rfilist: rfilist,
  Tenderinterest: tenderInterestedSlice,
  tenderpbgList: tenderpbglist_Slice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
