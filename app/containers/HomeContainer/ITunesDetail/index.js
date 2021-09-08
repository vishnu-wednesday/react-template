import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row, Col, Image, Card, Divider, List, Avatar } from 'antd';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { connect } from 'react-redux';

import { homeContainerCreators } from '../reducer';
import { selectTrackDetails } from '../selectors';
import { trackDetailsSaga } from '../saga';
import { fonts, colors, styles } from '@themes';
import { T } from '@components/T';
import Clickable from '@components/Clickable';

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

const StyledCard = styled(Card)`
  && {
    text-align: left;
  }
`;

const StyledSection = styled.section``;

const ImageAudioSection = styled.section`
  background: ${colors.backgroundColor};
  ${styles.flexConfig.configureFlex('row', 'space-around')}
  padding: 1rem;
`;

const HeadingT = styled(T)`
  && {
    color: ${colors.artistNameColor};
    ${fonts.style.heading()};
  }
`;

const StyleT = styled(T)`
  && {
    color: ${colors.artistNameColor};
    ${fonts.style.standard()};
  }
`;

const ListTitleT = styled(T)`
  && {
    ${fonts.style.subheading()}
  }
`;

const StyledPara = styled.p`
  && {
    ${fonts.style.standard()}
    ${fonts.weights.bold()}
  }
`;

export function ITunesDetailContainer({ maxwidth, padding, dispatchGetTrackDetails, trackDetails }) {
  const { id: lookUpId } = useParams();

  useEffect(() => {
    dispatchGetTrackDetails(lookUpId);
  }, [lookUpId]);

  const renderLeftCard = () => {
    return (
      <StyledCard hoverable>
        <ImageAudioSection>
          <Image src={trackDetails.artworkUrl100} alt={trackDetails.artistName} width={200} />
          <div>
            <T id="listen_to_it" />
            <audio controls={true} src={trackDetails.previewUrl}></audio>
            <Clickable onClick={() => window.open(`${trackDetails.trackViewUrl}`)} textId="to_listen_full" />
          </div>
        </ImageAudioSection>
        <Divider />
        <StyledSection>
          <HeadingT id="track_or_collection" values={{ value: trackDetails.trackName }} />
          <StyleT id="artist_name" values={{ artistName: trackDetails.artistName }} />
        </StyledSection>
      </StyledCard>
    );
  };

  const renderRightCard = () => {
    return (
      <>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={trackDetails.artworkUrl60} style={{ marginTop: '5px' }} />}
            title={<ListTitleT id="primary_genre" />}
            description={<StyledPara>{trackDetails.primaryGenreName}</StyledPara>}
          />
        </List.Item>
      </>
    );
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <Row gutter={16}>
        <Col xs={20} md={14}>
          {renderLeftCard()}
        </Col>
        <Col xs={20} md={10}>
          <List itemLayout="horizontal" bordered={true}>
            {renderRightCard()}
          </List>
        </Col>
      </Row>
    </Container>
  );
}

ITunesDetailContainer.propTypes = {
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  intl: PropTypes.object,
  trackDetails: PropTypes.object,
  dispatchGetTrackDetails: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetails } = homeContainerCreators;
  return {
    dispatchGetTrackDetails: (lookUpId) => dispatch(requestGetTrackDetails(lookUpId))
  };
}

const mapStateToProps = createStructuredSelector({
  trackDetails: selectTrackDetails()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'homeContainer', saga: trackDetailsSaga })
)(ITunesDetailContainer);
