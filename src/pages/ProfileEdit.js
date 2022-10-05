import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      isSaveButtonDisabled: true,
      isLoading: false,
    };
  }

  async componentDidMount() {
    await this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonValidation());
  };

  handleClick = async () => {
    const { name, email, image, description } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    const user = {
      name,
      email,
      image,
      description,
    };
    await updateUser(user);
    this.setState({ isLoading: false });
    // await history.push('/profile');
    return <Redirect to="/profile" />;
  };

  buttonValidation = () => {
    const { name, email, image, description } = this.state;
    const emptyTest = name && description && image && email !== '';
    const emailTest = email.match(/^\S+@\S+$/i);
    if (emailTest && emptyTest) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  };

  render() {
    const
      { name, email, image, description, isSaveButtonDisabled, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form>
          <label htmlFor="image">
            <input
              type="text"
              data-testid="edit-input-image"
              name="image"
              value={ image }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="text"
              data-testid="edit-input-name"
              id="name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              data-testid="edit-input-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ isSaveButtonDisabled }
            onClick={ this.handleClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
