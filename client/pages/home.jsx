import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGame: 'gameName'
    };
  }

  componentDidMount() {
    fetch('/api/home')
      .then(res => res.json())
      .then(games => {
        this.setState({ currentGame: 'gameName' });
      });
  }

  render() {
    return (
      <div className='py-5'>
        <h1>Wordlist</h1>
        <h2>this is the home page where the game will be</h2>
      </div>
    );
  }
}
