import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/Form/SignIn/SignIn';
import SignUp from './components/Form/SignUp/SignUp';
import SignOut from './components/signOut/SignOut';
import Upload from './components/Upload/Upload';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

function App() {
  return (
    <>
      <div style={{ fontFamily: "Roboto" }}>
        <BrowserRouter>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/video/:videoTitle" component={VideoPlayer} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/signIn" component={SignIn} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/signOut" component={SignOut} />
        </BrowserRouter>
      </div>

    </>
  );
}

export default App;
