import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createIntl, createIntlCache, IntlProvider } from 'react-intl';

import configureStore from '@app/configureStore';
import { DEFAULT_LOCALE, translationMessages } from '@app/i18n';
import ConnectedLanguageProvider from '@containers/LanguageProvider';
import { IntlGlobalProvider } from '@components/IntlGlobalProvider';
import { createMemoryHistory } from 'history';

export const renderWithIntl = (children) =>
  render(
    <IntlProvider locale={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
      <BrowserRouter>
        <IntlGlobalProvider>{children}</IntlGlobalProvider>
      </BrowserRouter>
    </IntlProvider>
  );

export const getComponentStyles = (Component, props = {}) => {
  renderWithIntl(Component(props));
  const { styledComponentId } = Component(props).type;
  const componentRoots = document.getElementsByClassName(styledComponentId);
  // eslint-disable-next-line no-underscore-dangle
  return window.getComputedStyle(componentRoots[0])._values;
};

export const renderProvider = (children) => {
  const store = configureStore({}, browserHistory).store;
  return render(
    <Provider store={store}>
      <ConnectedLanguageProvider messages={translationMessages}>
        <ThemeProvider
          theme={{
            main: 'violet'
          }}
        >
          {children}
        </ThemeProvider>
      </ConnectedLanguageProvider>
    </Provider>
  );
};

export function renderWithRouterMatch(
  ui,
  { path = '/', route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
  const store = configureStore({}, browserHistory).store;
  return render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
        <MemoryRouter initialEntries={[route]}>
          <Route path={path}>{ui}</Route>
        </MemoryRouter>
      </IntlProvider>
    </Provider>
  );
}

export const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const apiResponseGenerator = (ok, data) => ({
  ok,
  data
});

export const createIntlUtil = (locale = DEFAULT_LOCALE) => {
  const cache = createIntlCache();
  const getMessages = (locale) => translationMessages[locale];

  return createIntl(
    {
      locale: locale,
      messages: getMessages(locale)
    },
    cache
  );
};
