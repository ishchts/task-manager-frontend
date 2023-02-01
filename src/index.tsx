import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { store } from './store';
import { App } from './app';

import { createTheme, ThemeProvider, LinkProps, Theme } from '@mui/material';
import { ruRU as coreRuRu } from '@mui/material/locale';
import { ruRU } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

const inputGlobalStyles = <GlobalStyles styles={{
  html: { height: '100%' },
  body: { height: '100%' },
  '#root': { height: '100%' }
}} />;

const LinkBehavior = React.forwardRef<
HTMLAnchorElement,
Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

LinkBehavior.displayName = 'LinkBehavior';

const theme: Theme = createTheme({
  components: {
    MuiLink: {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      defaultProps: {
        component: LinkBehavior
      } as LinkProps
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    },
    ...coreRuRu.components,
    ...ruRU.components
  }
});

const container = document.getElementById('root');

if (container === null) {
  throw Error('Not found root element');
}

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {inputGlobalStyles}
      <App />
    </ThemeProvider>
  </Provider>
);
