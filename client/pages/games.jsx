import React from 'react';

export default class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    };
  }

  componentDidMount() {
    fetch('api/games')
      .then(res => res.json())
      .then(games => {
        this.setState({ games });
      });
  }

  render() {
    return (
      <div className='py-5'>
        <h1>Games</h1>
        <h2>user view/edit games</h2>
        {
          this.state.games.map(game => (
            <div key={game.gameID} className="list-group">
              <button type="button" className="list-group-item list-group-item-action">{game.gameName}</button>
            </div>
          ))
        }
      </div>
    );
  }
}
