import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({ isLoading: false });
    history.push('/search');
  };

  render() {
    const { name, isLoading } = this.state;
    const minChar = 3;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-login">
        <p>TrybeTunes</p>
        Login
        <form action="">
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              name="name"
              data-testid="login-name-input"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ name.length < minChar }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
