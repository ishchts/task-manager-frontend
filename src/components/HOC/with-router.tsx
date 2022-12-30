import React from 'react';
import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { Params } from 'react-router';

export type withRouterProps = {
  router?: {
    location: Location
    navigate: NavigateFunction
    params: Readonly<Params>
  }
};
function withRouter <T extends withRouterProps> (Component: React.FC<T>) {
  function ComponentWithRouterProp (props: T & withRouterProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  ComponentWithRouterProp.displayName = `withRouter${Component.name}`;

  return ComponentWithRouterProp;
}

export default withRouter;
