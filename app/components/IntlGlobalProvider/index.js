/* eslint-disable no-console */
// eslint-disable-next-line
import { appLocales, DEFAULT_LOCALE, translationMessages } from '@app/i18n';

import { useIntl, createIntl, createIntlCache } from 'react-intl';

// 'intl' service singleton reference
let intl;

export function IntlGlobalProvider({ children }) {
  intl = useIntl(); // Keep the 'intl' service reference
  return children;
}

// Getter function to expose the read-only 'intl' service
export function appIntl() {
  return intl;
}

// setIntl for testing.
export function setIntl(locale = DEFAULT_LOCALE) {
  const cache = createIntlCache();
  const getMessages = (locale) => translationMessages[locale];

  intl = createIntl(
    {
      locale: appLocales,
      messages: getMessages(locale)
    },
    cache
  );
}

export const translate = (id, values = {}) => intl.formatMessage({ id }, values);
