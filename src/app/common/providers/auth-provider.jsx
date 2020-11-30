import React from 'react';

const defaultAuthState = {
    isLoggedIn: false,
};

export const AuthContext = React.createContext(defaultAuthState);

class AuthProvider extends React.Component {
    state = defaultAuthState;

    login = (email, password) => {
        this.setState({ isLoggedIn: true });
    };

    logout = () => {
        this.setState({ isLoggedIn: false });
    };

    render() {
      const { children } = this.props;
      const { isLoggedIn } = this.state;

      return (
          <AuthContext.Provider
              value={{
                  isLoggedIn,
                  login: this.login,
                  logout: this.logout,
              }}
          >
              { children }
          </AuthContext.Provider>
      );
    };
}

export default AuthProvider;
