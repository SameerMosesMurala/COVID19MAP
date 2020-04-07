import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import 'assets/stylesheets/application.scss';

import Header from 'components/Header';
import Footer from 'components/Footer';

const Layout = ({ children, pageName }) => {
  let className = '';

  if ( pageName ) {
    className = `${className} page-${pageName}`;
  }

  return (
    <>
      
      <div className="wrapper">
        <Header />
        <main>{ children }</main>
        
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageName: PropTypes.string
};

export default Layout;