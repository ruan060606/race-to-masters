import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/sign-up" component={SignupForm} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
