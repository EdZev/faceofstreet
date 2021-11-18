import React from 'react';
import 'regenerator-runtime/runtime.js';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import getData from './data/getData';
import routes from './routes';
import store from './redux/store';
import { setData } from './redux/index';
import App from './components/App.jsx';
import resources from './locales/index';

export default async () => {
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',

      interpolation: {
        escapeValue: false,
      },
    });

  const dataPath = routes.dataPath();
  await getData(dataPath)
    .then((districtsData) => {
      store.dispatch(setData({ districtsData }));
    });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  );
};
