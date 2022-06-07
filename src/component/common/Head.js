import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';

function Head(props) {
  let active = null;
  props.type === 'main' 
    ? (active = {color: '#fff'})
    : (active = {color: 'aqua'});

  const menu = useRef(null);
  const [toggle, setToggle] = useState(false);

  const handleResize = () => {
    const wid = window.innerWidth;
    if (wid >= 1190) setToggle(false);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return() => window.removeEventListener('resize', handleResize);
  },[]);

  useEffect(() => {
    toggle ? menu.current.open() : menu.current.close();
  },[toggle])

  return (
    <>
    <header className={props.type}>
      <h1>
        <NavLink exact to='/' activeStyle={active}>LOGO</NavLink>
      </h1>
      <ul className='gnb'>
        <li><NavLink to='/youtube' activeStyle={active}>Youtube</NavLink></li>
        <li><NavLink to='/department' activeStyle={active}>Department</NavLink></li>
        <li><NavLink to='/location' activeStyle={active}>Location</NavLink></li>
        <li><NavLink to='/community' activeStyle={active}>Community</NavLink></li>
        <li><NavLink to='/join' activeStyle={active}>Join</NavLink></li>
        <li><NavLink to='/flickr' activeStyle={active}>Flickr</NavLink></li>
      </ul>
      <p 
        className='menu'
        onClick={() => {
          setToggle(!toggle)
        }}
      ><FontAwesomeIcon icon={faBars} /></p>
    </header>
    <Menu ref={menu} toggle={toggle} setToggle={setToggle} />
    </>
  )
}

export default Head;