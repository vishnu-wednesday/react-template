import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/ITunesGrid/Loadable';
import ITunesDetailContainer from '@containers/HomeContainer/ITunesDetail/Loadable';

import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  tracks: {
    component: HomeContainer,
    ...routeConstants.tracks
  },

  trackDetail: {
    component: ITunesDetailContainer,
    ...routeConstants.trackDetail
  },

  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
