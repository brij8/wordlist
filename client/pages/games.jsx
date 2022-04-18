import React from 'react';

export default class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      lists: []
    };
  }

  componentDidMount() {
    fetch('api/games')
      .then(res => res.json())
      .then(games => {
        this.setState({ games });
      });
    fetch('api/lists')
      .then(res => res.json())
      .then(lists => {
        this.setState({ lists });
      });
  }

  getGame(event) {
    // add 'active' to className to highlight
    // list the Lists in the game
    // and words in Game/Lists
  }

  getWords(event) {
    // add 'active' to className to highlight
    // list the words in the Game/List
  }

  newGame(event) {
    // generate new gameTable
  }

  render() {
    return (
      <div className='py-5'>
        <h1>Games</h1>
        <h2>user view/edit games</h2>
        {
          <div>
            <button type="button" className="newGameBtn" onClick={this.newGame()}>new</button>
            <button type="button" className="editGameBtn">edit</button>
            <button type="button" className="deleteGameBtn">delete</button>
          </div>
        }
        {
          this.state.games.map(game => (
            <div key={game.gameID} className="list-group">
              <button type="button" className="list-group-item list-group-item-action" onClick={this.getGame()}>{game.gameName}</button>
            </div>
          ))
        }
      </div>
    );
  }
}
