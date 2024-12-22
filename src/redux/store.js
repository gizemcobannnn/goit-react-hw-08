import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contacts/slice';
import filtersReducer from './filters/slice';
import authReducer from './auth/slice'; 

const authPersistConfig = {
  key: 'auth', // Bu alan sadece auth reducer için kullanılacak
  storage,
  whitelist: ['token'], // Sadece token alanını persist etmek istiyoruz
};



const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    contacts: contactsReducer, // contacts reducer doğrudan atanıyor
    filters: filtersReducer,  // filters reducer doğrudan atanıyor
    auth: persistedAuthReducer, // auth reducer persist edilmiş haliyle atanıyor
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist ile ilgili action'ları kontrol dışı bırak
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export default store;
export let persistor = persistStore(store);

