import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({
      user: user.name,
      isLoading: false,
    });
  };

  render() {
    const { user, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header data-testid="header-component">
        <div>TrybeTunes</div>
        <div data-testid="header-user-name">{user}</div>
        <NavLink
          to="/search"
          data-testid="link-to-search"
          activeClassName="active"
          exact
        >
          Search
        </NavLink>
        <NavLink
          activeClassName="active"
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favorites
        </NavLink>
        <NavLink
          activeClassName="active"
          data-testid="link-to-profile"
          to="/profile"
        >
          Profile
        </NavLink>
      </header>
    );
  }
}

export default Header;
