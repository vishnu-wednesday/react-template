/**
 *
 * TrackCard
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Avatar, Skeleton } from 'antd';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { colors, fonts, styles } from '@themes';

import T from '@components/T';
import If from '@components/If';

const { Meta } = Card;

const Audio = styled.audio`
  width: 100%;
`;

const StyleT = styled(T)`
  && {
    color: ${colors.artistNameColor};
    ${fonts.style.standard()};
  }
`;

const AlbumNameT = styled(T)`
  && {
    color: ${colors.artistNameColor};
    ${fonts.style.subheading()};
  }
`;

const StyledCaption = styled.figcaption`
  clear: both;
  ${styles.margin.top(1)}
  ${styles.margin.left(0.5)}
`;

const getTrackOrCollection = (item) => {
  if (item.wrapperType === 'track') {
    return item.trackName;
  }
  return item.collectionName;
};

export function TrackCard({ index, track, intl, loading }) {
  return (
    <>
      <If condition={!!track}>
        <Card key={index} data-testid="track-card">
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Avatar
                  size={{
                    xs: 32,
                    sm: 38,
                    md: 40,
                    lg: 64,
                    xl: 80,
                    xxl: 100
                  }}
                  src={track.artworkUrl100}
                />
              }
              description={
                <div>
                  <AlbumNameT
                    id="track_or_collection"
                    values={{ value: getTrackOrCollection(track) }}
                    clearFloat={true}
                    data-testid="track_or_collection"
                  />
                  <StyleT id="artist_name" values={{ artistName: track.artistName }} clearFloat={true} />
                </div>
              }
            />
            <figure>
              <StyledCaption>{intl.formatMessage({ id: 'listen_to_it' })}</StyledCaption>
              <Audio controls src={track.previewUrl} data-testid="audio-player">
                <T id="audio_no_support" values={{ code: (chunks) => <code>{chunks}</code> }} />
              </Audio>
            </figure>
          </Skeleton>
        </Card>
      </If>
    </>
  );
}

TrackCard.propTypes = {
  index: PropTypes.number,
  track: PropTypes.object,
  intl: PropTypes.object,
  loading: PropTypes.bool
};

TrackCard.defaultProps = {
  track: {}
};

export default compose(injectIntl)(TrackCard);
