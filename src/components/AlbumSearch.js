import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumSearch extends Component {
  render() {
    const { artist, albums } = this.props;
    const search = albums[0];
    if (search === 'Nenhum álbum foi encontrado') {
      return <div>Nenhum álbum foi encontrado</div>;
    }
    return (
      <div>
        {`Resultado de álbuns de: ${artist}`}
        {albums
          .map(({ artistName, collectionName, collectionId, artworkUrl100 }) => (
            <li
              key={ collectionId }
            >
              {collectionName}
              <img src={ artworkUrl100 } alt={ collectionName } />
              {artistName}
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                Details
              </Link>
            </li>))}

      </div>
    );
  }
}

AlbumSearch.propTypes = {
  artist: PropTypes.string.isRequired,
  albums: PropTypes.arrayOf(PropTypes.shape({
    collectionId: PropTypes.number,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
  })).isRequired,
};

export default AlbumSearch;
