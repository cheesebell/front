import { Route, Switch } from 'react-router-dom';
import Head from './component/common/Head';
import Foot from './component/common/Foot';
import Visual from './component/main/Visual';
import Content from './component/main/Content';
import Youtube from './component/sub/Youtube';
import Gallery from './component/sub/Gallery';
import Department from './component/sub/Department';
import './scss/style.scss';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Head type={'main'} />
          <Visual/>
          <Content/>
        </Route>
        <Route path='/'>
          <Head type={'sub'} />
        </Route>
      </Switch>
      <Route path='/department' component={Department}/>
      <Route path='/youtube' component={Youtube}/>
      <Route path='/gallery' component={Gallery}/>
      <Foot/>
    </>
  )
}

export default App;