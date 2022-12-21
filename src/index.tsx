import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { store } from './store';
import { App } from './App';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

const inputGlobalStyles = <GlobalStyles styles={{
  html: { height: '100%' },
  body: { height: '100%' },
  '#root': { height: '100%' }
}} />;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      {inputGlobalStyles}
      <App />
    </BrowserRouter>
  </Provider>
);
