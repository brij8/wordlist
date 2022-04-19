import React from 'react';
import Nav from './components/nav';
import { parseRoute } from './lib';
import Home from './pages/home';
import Account from './pages/account';
import Games from './pages/games';
import Lists from './pages/lists';
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      route: parseRoute(location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(location.hash);
      this.setState({ route });
    });
  }

  renderPage() {
    const { route } = this.state;

    if (route.path === 'home') {
      return <Home />;
    }
    if (route.path === 'account') {
      return <Account />;
    }
    if (route.path === 'games') {
      return <Games />;
    }
    if (route.path === 'lists') {
      return <Lists />;
    }

    return (
      <div className="py-5">
        <h1 className='text-center text-danger'>404 - Page Not Found</h1>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Nav/>
        <div className='container'>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}
