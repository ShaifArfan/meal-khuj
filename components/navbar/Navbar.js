import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classes from './Navbar.module.scss';
import logo from '../../images/meal_khuj_logo.png';

function Navbar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>
        <Link href="/">
          <Image src={logo} />
        </Link>
      </div>
      <ul className={classes.navLinks}>
        <li>
          <Link href="/meals">Meals</Link>
        </li>
        <li>
          <Link href="/savedMeals">Saved List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
