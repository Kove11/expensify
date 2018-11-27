import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
       //contains everything we didnt previously destructure
}) => (
    
        <Route {...rest} component={(props)=>(
            !isAuthenticated ? (
                <div>
                    <Component {...props} />
                </div>
            )
            : (
                <Redirect to="/dashboard"/>
            )
        )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid 
});

export default connect(mapStateToProps)(PublicRoute);