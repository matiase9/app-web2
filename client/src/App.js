import React, { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';

//import Layout from './hoc/Layout/Layout';
// import Dashboard from './containers/Dashboard/Dashboard';

// import Auth from './containers/Auth/Auth';
import Pages from './containers/Pages/Pages';

class App extends Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <Pages/>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;