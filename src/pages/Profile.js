import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userInfo: {},
    };
  }

  componentDidMount() {
    this.fetchUser();
    this.setState({ isLoading: false });
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState(({ userInfo: user }));
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  };

  render() {
    const { isLoading, userInfo } = this.state;
    const { name, email, image, description } = userInfo;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          <div>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Editar perfil
            </button>
          </div>
          <div>{name}</div>
          <div>{email}</div>
          <div>{description}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
