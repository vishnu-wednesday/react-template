import { createIntlUtil } from '@app/utils/testUtils';
import { appIntl, setIntl } from '../index';

describe('Intl Tests', () => {
  it('should set and get intl', () => {
    let mockIntl = createIntlUtil();
    setIntl(mockIntl);
    expect(appIntl()).toEqual(mockIntl);
  });
});
