import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGame: 'gameName'
    };
  }

  render() {
    return (
      <div className='game-fp'>
        <img src="imgs/wordlist-gamepage.png" className="wordl-fp"></img>
      </div>
    );
  }
}
