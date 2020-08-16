import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRouteNew = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        sessionStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
    // <Route {...rest} render={props => {
    //     console.log('history pop', props)
    //         if(sessionStorage.getItem('user')) {
    //             return <Component {...props} />
    //         } else {
    //             return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    //         }
    //     }
    // } />
)