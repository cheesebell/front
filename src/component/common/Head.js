import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Head(props) {
  let active = null;
  props.type === 'main' 
    ? (active = {color: '#fff'})
    : (active = {color: 'aqua'});

  return (
    <header className={props.type}>
      <h1>
        <NavLink exact to='/' activeStyle={active}>LOGO</NavLink>
      </h1>
      <ul className='gnb'>
        <li><NavLink to='/gallery' activeStyle={active}>Gallery</NavLink></li>
        <li><NavLink to='/youtube' activeStyle={active}>Youtube</NavLink></li>
        <li><NavLink to='/department' activeStyle={active}>Department</NavLink></li>
        <li><NavLink to='/location' activeStyle={active}>Location</NavLink></li>
        <li><NavLink to='/community' activeStyle={active}>Community</NavLink></li>
        <li><NavLink to='/join' activeStyle={active}>Join</NavLink></li>
      </ul>
      <p className='menu'><FontAwesomeIcon icon={faBars} /></p>
    </header>
  )
}

export default Head;