import React from "react";
import { Link } from "react-router-dom";
import { renderRoutes } from 'react-router-config';

import routes from './route';

export default function App() {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav>
        {renderRoutes(routes)}
      </div>
  );
}
