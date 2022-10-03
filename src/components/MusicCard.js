import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      isLoading: false,
    };
  }

  saveFavorite = async () => {
    const { track } = this.props;
    const { favorite } = this.state;
    if (favorite) {
      this.setState({ isLoading: true });
      await addSong(track);
      this.setState({ isLoading: false });
    }
  };

  handleChange = async ({ target }) => {
    this.setState({
      favorite: target.checked,
    }, this.saveFavorite);
  };

  render() {
    const { favorite, isLoading } = this.state;
    const { track } = this.props;
    const { previewUrl, trackName, trackId } = track;
    if (isLoading) return <Loading />;
    return (
      <div>
        <h5>{trackName}</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            id="favorite"
            checked={ favorite }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
