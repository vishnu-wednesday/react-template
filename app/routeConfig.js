import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import React from 'react';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  uatTest: {
    component: () => <h2>Hey! You are viewing the UAT on PR changes..</h2>,
    ...routeConstants.uatRoute
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
