import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      isLoading: false,
      favoritedSongs: [],
    };
  }

  async componentDidMount() {
    await this.onMount();
    this.getSaved();
  }

  onMount = async () => {
    const favorited = await getFavoriteSongs();
    this.setState({
      favoritedSongs: favorited,
      isLoading: true,
    });
  };

  getSaved = () => {
    const { favoritedSongs } = this.state;
    const { track } = this.props;

    this.setState({
      favorite: favoritedSongs.some((song) => track.trackId === song.trackId),
      isLoading: false,
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
