import Loadable from '@containers/ItunesProvider/ITunesDetail/Loadable';
// import { Suspense } from 'react';
import { routeConfig } from '../routeConfig';

describe('route config tests', () => {
  it('should render the correct route constants or something', () => {
    let trackDetail = routeConfig.trackDetail;
    // eslint-disable-next-line no-console
    // console.log(renderProvider(<Suspense>{Loadable()}</Suspense>));
    expect(trackDetail.component()).toEqual(Loadable());
  });
});
