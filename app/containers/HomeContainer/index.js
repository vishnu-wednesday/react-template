import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { injectSaga } from 'redux-injectors';
import { selectHomeContainer, selectSearchData, selectSearchError, selectSearchTerm } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function HomeContainer({
  dispatchItunesSearch,
  dispatchClearItunesSearch,
  intl,
  itunesSearchData = {},
  itunesSearchError = null,
  itunesSearchTerm,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(itunesSearchData, 'items', null) || itunesSearchError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [itunesSearchData]);

  useEffect(() => {
    if (itunesSearchTerm && !itunesSearchData?.items?.length) {
      dispatchItunesSearch(itunesSearchTerm);
      setLoading(true);
    }
  }, []);

  const history = useHistory();

  const handleOnChange = (rName) => {
    if (!isEmpty(rName)) {
      dispatchItunesSearch(rName);
      setLoading(true);
    } else {
      dispatchClearItunesSearch();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = get(itunesSearchData, 'items', []);
    const totalCount = get(itunesSearchData, 'totalCount', 0);
    return (
      (items.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {itunesSearchTerm && (
              <div>
                <T id="search_query" values={{ itunesSearchTerm }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_repos" values={{ totalCount }} />
              </div>
            )}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let repoError;
    if (itunesSearchError) {
      repoError = itunesSearchError;
    } else if (!get(itunesSearchData, 'totalCount', 0)) {
      repoError = 'respo_search_default';
    }
    return (
      !loading &&
      repoError && (
        <CustomCard color={itunesSearchError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'repo_list' })}>
          <T id={repoError} />
        </CustomCard>
      )
    );
  };
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard title={intl.formatMessage({ id: 'repo_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={itunesSearchTerm}
          type="text"
          onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
          onSearch={(searchText) => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchItunesSearch: PropTypes.func,
  dispatchClearItunesSearch: PropTypes.func,
  intl: PropTypes.object,
  itunesSearchData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  itunesSearchError: PropTypes.object,
  itunesSearchTerm: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer,
  itunesSearchData: selectSearchData(),
  itunesSearchError: selectSearchError(),
  itunesSearchTerm: selectSearchTerm()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTracks, clearTracks } = homeContainerCreators;
  return {
    dispatchItunesSearch: (searchTerm) => dispatch(requestGetTracks(searchTerm)),
    dispatchClearItunesSearch: () => dispatch(clearTracks())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'homeContainer', saga: homeContainerSaga })
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
