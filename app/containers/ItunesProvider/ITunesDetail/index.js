import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row, Col, Image, Card, Divider, List, Avatar, Tag } from 'antd';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { connect } from 'react-redux';

import { iTunesCreators } from '../reducer';
import { selectTrackDetails } from '../selectors';
import iTunesSearchSaga from '../saga';
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
  flex-wrap: wrap;
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
    ${fonts.style.subheading()};
    opacity: 0.5;
  }
`;

const StyledPara = styled.p`
  && {
    ${fonts.style.standard()};
    ${fonts.weights.bold()};
    color: ${colors.text};
  }
`;

export function ITunesDetailContainer({
  maxwidth,
  padding,
  dispatchGetTrackDetails,
  dispatchClearTrackDetails,
  trackDetails
}) {
  const { id: lookUpId } = useParams();

  useEffect(() => {
    dispatchGetTrackDetails(lookUpId);
    return () => {
      dispatchClearTrackDetails();
    };
  }, []);

  const millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const parseYearFromDateString = (dateString) => {
    return new Date(dateString).getFullYear().toString(10);
  };

  const renderLeftCard = () => {
    return (
      <StyledCard hoverable>
        <ImageAudioSection>
          <Image src={trackDetails.artworkUrl100} alt={trackDetails.artistName} width={240} data-testid="album-image" />
          <div
            css={`
              display: flex;
              flex-direction: column;
            `}
          >
            <T id="listen_to_it" />
            <audio
              controls={true}
              src={trackDetails.previewUrl}
              css={`
                ${styles.margin.vertical(1)}
              `}
            ></audio>
            <Clickable
              onClick={() => window.open(`${trackDetails.trackViewUrl}`)}
              textId="to_listen_full"
              data-testid="click-link"
            />
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
            description={
              <Tag color="green-inverse">
                <StyledPara>{trackDetails.primaryGenreName}</StyledPara>
              </Tag>
            }
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={trackDetails.artworkUrl60} style={{ marginTop: '5px' }} />}
            title={<ListTitleT id="collection_name" />}
            description={<StyledPara>{trackDetails.collectionName}</StyledPara>}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={trackDetails.artworkUrl60} style={{ marginTop: '5px' }} />}
            title={<ListTitleT id="track_duration" />}
            description={
              <StyledPara data-testid="parsed-value">
                {millisToMinutesAndSeconds(trackDetails.trackTimeMillis || 0)}
              </StyledPara>
            }
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={trackDetails.artworkUrl60} style={{ marginTop: '5px' }} />}
            title={<ListTitleT id="track_explicitness" />}
            // parse this too...
            description={<StyledPara>{trackDetails.trackExplicitness}</StyledPara>}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={trackDetails.artworkUrl60} style={{ marginTop: '5px' }} />}
            title={<ListTitleT id="year_of_release" />}
            description={<StyledPara>{parseYearFromDateString(trackDetails?.releaseDate)}</StyledPara>}
          />
        </List.Item>
      </>
    );
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <Row gutter={16}>
        <Col xs={24} md={14}>
          {renderLeftCard()}
        </Col>
        <Col xs={24} md={10}>
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
  dispatchGetTrackDetails: PropTypes.func,
  dispatchClearTrackDetails: PropTypes.func
};

ITunesDetailContainer.defaultProps = {
  trackDetails: {
    releaseDate: ''
  }
};

export function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetails, clearTrackDetails } = iTunesCreators;
  return {
    dispatchGetTrackDetails: (lookUpId) => dispatch(requestGetTrackDetails(lookUpId)),
    dispatchClearTrackDetails: () => dispatch(clearTrackDetails())
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
  injectSaga({ key: 'itunesContainer', saga: iTunesSearchSaga })
)(ITunesDetailContainer);

export const ITunesDetailTest = compose(injectIntl)(ITunesDetailContainer);
