import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyApp from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "redux/store";
import { ChakraProvider } from '@chakra-ui/react'
import { TonConnectUIProvider  } from '@tonconnect/ui-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const manifestUrl = 'https://main.d56xyn8hin4yq.amplifyapp.com/tonconnect-manifest.json';


root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
    <Provider store={store}>
      <ChakraProvider>
        <MyApp />
      </ChakraProvider>
    </Provider>
    </TonConnectUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
