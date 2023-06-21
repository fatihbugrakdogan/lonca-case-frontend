import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";import MainLayout from './MainLayout';

function App() {
  let routes = useRoutes([
    { path: "/", element: <MainLayout /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;

