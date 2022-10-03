import React, { Component } from 'react';
import Loading from '../components/Loading';
import AlbumSearch from '../components/AlbumSearch';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      isLoading: false,
      albums: [],
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      artist: value,
    });
  };

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({
      isLoading: true,
      search: '',
    });
    const result = await searchAlbumsAPI(artist);
    this.setState(() => ({
      isLoading: false,
      albums: result.length !== 0 ? result : ['Nenhum álbum foi encontrado'],
    }));
  };

  render() {
    const { search, isLoading, albums, artist } = this.state;
    const minChar = 2;
    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="artist">
            <input
              type="text"
              id="artist"
              data-testid="search-artist-input"
              name="search"
              onChange={ this.handleChange }
              value={ search }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ search.length < minChar }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        {isLoading && <Loading />}
        {!isLoading && albums.length !== 0
        && <AlbumSearch albums={ albums } artist={ artist } /> }
      </div>
    );
  }
}

export default Search;
