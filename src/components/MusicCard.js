import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeSong, addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getSaved();
  }

  getSaved = async () => {
    const { track } = this.props;
    this.setState({ isLoading: true });
    const favorited = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favorite: favorited.some((song) => track.trackId === song.trackId),
    });
  };

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
    const { track } = this.props;
    const { favorite } = this.state;
    this.setState({
      favorite: target.checked,
    }, this.saveFavorite);
    if (favorite) {
      this.setState({ isLoading: true });
      await removeSong(track);
      this.setState({
        isLoading: false });
    }
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
