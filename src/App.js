import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { setYoutube, setMembers, setGallery } from './redux/actions';
// import axios from 'axios';
import Head from './component/common/Head';
import Foot from './component/common/Foot';
import Youtube from './component/sub/Youtube';
// import Gallery from './component/sub/Gallery';
import Department from './component/sub/Department';
import Location from './component/sub/Location';
import Join from './component/sub/Join';
import Community from './component/sub/Community';
import Main from './component/main/Main';
import Flickr from './component/sub/Flickr';
import * as types from './redux/actionType';

import './scss/style.scss';

function App() {
  // dispatch 전송함수 활성화
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch({ 
      type:  types.FLICKR.start, 
      opt: {type: 'interest', count: 100 }
    });
    dispatch({ type: types.YOUTUBE.start });
    dispatch({ type: types.MEMBERS.start});
  },[]);

  return (
    <>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/' render={()=> <Head type={'sub'} /> } />
      </Switch>
      <Route path='/department' component={Department}/>
      <Route path='/youtube' component={Youtube}/>
      {/* <Route path='/gallery' component={Gallery}/> */}
      <Route path='/location' component={Location}/>
      <Route path='/community' component={Community}/>
      <Route path='/join' component={Join}/>
      <Route path='/flickr' component={Flickr}/>
      <Foot/>
    </>
  )
}

export default App;