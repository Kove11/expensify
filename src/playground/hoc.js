// Higher order component (HOC) -- A component (HOC) that renders another component 
// Goal (advantages): Reuse code, render hijacking, prop manipulation, and abstract state
import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);
// {...props} takes every key-value pair further along - parent to child 
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private information. Please do not share!</p>}
             <WrappedComponent {...props} /> 
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (<WrappedComponent {...props}/>) : (<p>Please login to view the info.</p>) }
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);
ReactDOM.render(<AuthInfo isAuthenticated= {true} info="This is the detail"/>, document.getElementById('app'));

