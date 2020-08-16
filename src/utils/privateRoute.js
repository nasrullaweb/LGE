import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRouteNew = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
            if(sessionStorage.getItem('user') !== null) {
                return <Component {...props} />
            } else {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        }
    } />
)