import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      isLoading: true,
      album: {},
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id },
    } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musics,
      isLoading: false,
      album: musics[0],
    });
  };

  render() {
    const { musics, isLoading, album } = this.state;
    if (isLoading) return <Loading />;
    const { artistName, collectionName, artworkUrl100 } = album;
    const tracks = musics.filter((music) => music.trackName);
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h4 data-testid="album-name">{collectionName}</h4>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h6 data-testid="artist-name">{artistName}</h6>
        </div>
        {tracks
          .map((track) => (
            <MusicCard
              key={ track.trackId }
              track={ track }
            />
          ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
