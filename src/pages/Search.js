import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { search } = this.state;
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
