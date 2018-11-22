import React from 'react';
import {Link} from 'react-router-dom';
const NotFoundPage = () => (
    <div>
      Page Not Found - You probably shouldn't be here.<br/>
      <Link to="/">Back to safety</Link>
    </div>
  );

export default NotFoundPage;