import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthenticated from '../isAuthenticated';

const PrivateRoute: React.FC<{
  component: React.FC<any>;
  path: string;
  exact?: boolean;
}> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
