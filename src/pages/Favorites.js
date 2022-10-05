import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favoritedSongs: [],
    };
  }

  componentDidMount() {
    this.onMount();
  }

  componentDidUpdate() {
    this.onMount();
  }

  onMount = async () => {
    const favorited = await getFavoriteSongs();
    this.setState({
      favoritedSongs: favorited,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, favoritedSongs } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          <p>Músicas favoritas:</p>
          {favoritedSongs
            .map((track) => (
              <MusicCard
                key={ track.trackId }
                track={ track }
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
