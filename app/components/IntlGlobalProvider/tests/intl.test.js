import { createIntlUtil } from '@app/utils/testUtils';
import { appIntl, setIntl, translate } from '../index';

describe('Intl Tests', () => {
  it('should set and get intl', () => {
    let mockIntl = createIntlUtil();
    setIntl(mockIntl);
    expect(appIntl()).toEqual(mockIntl);
  });

  it('should translate the text', () => {
    let mockIntl = createIntlUtil();
    setIntl(mockIntl);
    expect(translate('wednesday_solutions')).toEqual('Wednesday Solutions');
  });
});
