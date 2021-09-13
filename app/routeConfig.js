import NotFound from '@containers/NotFoundPage/Loadable';
import ITunesSearchContiner from '@containers/ItunesProvider/ITunesGrid/Loadable';
import ITunesDetailContainer from '@containers/ItunesProvider/ITunesDetail/Loadable';

import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  trackDetail: {
    component: ITunesDetailContainer,
    ...routeConstants.trackDetail
  },

  tracks: {
    component: ITunesSearchContiner,
    ...routeConstants.tracks
  },

  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
