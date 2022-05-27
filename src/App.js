import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setYoutube, setMembers, setFlickr } from './redux/actions';
import axios from 'axios';
import Head from './component/common/Head';
import Foot from './component/common/Foot';
import Youtube from './component/sub/Youtube';
import Gallery from './component/sub/Gallery';
import Department from './component/sub/Department';
import Location from './component/sub/Location';
import Join from './component/sub/Join';
import Community from './component/sub/Community';
import Main from './component/main/Main';
import Flickr from './component/sub/Flickr';

import './scss/style.scss';

const path = process.env.PUBLIC_URL;

function App() {
  // dispatch 전송함수 활성화
  const dispatch = useDispatch();

  const fetchYoutube = async() => {
    const key = 'AIzaSyA4JSBOYOot3CbalOVi-yn74v4FMmNPmsc';
    const id = 'PLC9z-XDyK2RgktTbTXl8MjyTEdzTAFIT4';
    const num = 7;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${id}&maxResult=${num}&part=snippet`;
    
    
    await axios.get(url).then((json)=> {
      dispatch(setYoutube(json.data.items));
    });
  }

  const fetchMembers = async() => {
    const url = path + '/DB/department.json';
   
    await axios.get(url).then((json)=> {
      dispatch(setMembers(json.data.data));
    })
  }

  const fetchFlickr = async() => {
    const api_key = '2ded31f6bd2818a5bdf20954d95106f2';
    const method = 'flickr.interestingness.getList';
    const per_page = 50;
    const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${per_page}`;
  
    await axios.get(url).then((json)=> {
      dispatch(setFlickr(json.data.photos.photo));
    })
  }

  useEffect(()=> {
    fetchYoutube();
    fetchMembers();
    fetchFlickr();
  },[]);

  return (
    <>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/' render={()=> <Head type={'sub'} /> } />
      </Switch>
      <Route path='/department' component={Department}/>
      <Route path='/youtube' component={Youtube}/>
      <Route path='/gallery' component={Gallery}/>
      <Route path='/location' component={Location}/>
      <Route path='/community' component={Community}/>
      <Route path='/join' component={Join}/>
      <Route path='/flickr' component={Flickr}/>
      <Foot/>
    </>
  )
}

export default App;