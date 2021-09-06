/**
 *
 * TrackCard
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Avatar } from 'antd';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { colors, fonts } from '@themes';

import T from '@components/T';

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

const getSecondValue = (item) => {
  if (item.wrapperType === 'track') {
    return item.trackName;
  } else {
    return item.collectionName;
  }
};

export function TrackCard({ index, track, intl }) {
  return (
    <Card key={index} data-testid="track-card">
      <Meta
        avatar={
          <Avatar
            size={{
              xs: 24,
              sm: 32,
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
              id="main_text"
              values={{ value: getSecondValue(track) }}
              clearFloat={true}
              data-testid="main-value"
            />
            <StyleT id="artist_name" values={{ artistName: track.artistName }} clearFloat={true} />
          </div>
        }
      />
      <figure>
        <figcaption>{intl.formatMessage({ id: 'listen_to_it' })}</figcaption>
        <Audio controls src={track.previewUrl}>
          <T id="audio_no_support" values={{ code: (chunks) => <code>{chunks}</code> }} />
        </Audio>
      </figure>
    </Card>
  );
}

TrackCard.propTypes = {
  index: PropTypes.number,
  track: PropTypes.object,
  intl: PropTypes.object
};

export default compose(injectIntl)(TrackCard);
