import React from 'react';

export default class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      lists: []
    };
    this.newGame = this.newGame.bind(this);
    this.getGame = this.getGameLists.bind(this);
    this.getWords = this.getWords.bind(this);
  }

  componentDidMount() {
    fetch('/api/games')
      .then(res => res.json())
      .then(games => {
        this.setState({ games });
      });
    fetch('/api/lists')
      .then(res => res.json())
      .then(lists => {
        this.setState({ lists });
      });
  }

  getGameLists(event) {
    // should use this.gameID
    // add 'active' to className to highlight
    // list the Lists in the game
    // and words in Game/Lists
  }

  getWords(event) {
    // add 'active' to className to highlight
    // list the words in the Game/List
  }

  // generate new gameTable
  newGame() {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify('')
    };
    fetch('/api/games', req)
      .then(response => response.json())
      .then(makeGame => {
        const allGames = this.state.games.concat(makeGame);
        this.setState({ games: allGames });
      }
      );
  }

  render() {
    return (
      <div className='py-5'>
        <h1>Games</h1>
        <h2>user view/edit games</h2>
          <div>
            <button type="button" className="newGameBtn" onClick={this.newGame}>new</button>
            <button type="button" className="editGameBtn">edit</button>
            <button type="button" className="deleteGameBtn">delete</button>
          </div>
        {
          this.state.games.map(game => (
            <div key={game.gameID} className="list-group">
              <button type="button" className="list-group-item list-group-item-action" onClick={this.getGameLists}>{game.gameName}</button>
            </div>
          ))
        }
      </div>
    );
  }
}
