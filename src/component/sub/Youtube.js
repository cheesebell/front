import React , { useEffect, useRef } from 'react';
import axios from 'axios';


function Youtube() {
  const frame = useRef(null);
  const api = 'AIzaSyA4JSBOYOot3CbalOVi-yn74v4FMmNPmsc';
  const list = 'PLC9z-XDyK2RgktTbTXl8MjyTEdzTAFIT4';
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api}&playlistId=${list}&maxResult=3&part=snippet`;

 
  useEffect(()=> {
    frame.current.classList.add('on');
    axios
    .get(url)
    .then((json) => {
      console.log(json)
    })
  },[]);

  return (
    <section className='youtube' ref={frame}>
      <div className='inner'>
        <h1>Youtube</h1>
      </div>
    </section>
  )
}

export default Youtube