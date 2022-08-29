import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import classes from './Layout.module.scss';

function Layout({ children }) {
  return (
    <>

      <div className={classes.container}>
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
