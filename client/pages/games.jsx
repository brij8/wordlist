import React from 'react';

export default class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      lists: [],
      showLists: [],
      showWords: [],
      gameClicked: -1,
      listClicked: -1
    };
    this.newGame = this.newGame.bind(this);
    this.getGameLists = this.getGameLists.bind(this);
    this.getWords = this.getWords.bind(this);
    this.setClassGame = this.setClassGame.bind(this);
    this.setClassList = this.setClassList.bind(this);
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
        this.setState({ lists: lists });
      });
  }

  // get lists from selected game
  getGameLists(gameID) {
    this.setState({ gameClicked: gameID });
    this.setState({ showWords: [] });
    fetch('/api/gamelist/' + gameID)
      .then(response => response.json())
      .then(gameLists => {
        this.setState({ showLists: gameLists });
      });
  }

  // get words from selected list
  getWords(listID) {
    this.setState({ listClicked: listID });
    fetch('/api/listWords/' + listID)
      .then(response => response.json())
      .then(listwords => {
        this.setState({ showWords: listwords });
      });
  }

  // generate new game
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

  // set class to show selection
  setClassGame(key) {
    return (this.state.gameClicked === key)
      ? 'list-group-item list-group-item-action active'
      : 'list-group-item list-group-item-action';
  }

  // set class to show selection
  setClassList(key) {
    return (this.state.listClicked === key)
      ? 'list-group-item list-group-item-action active'
      : 'list-group-item list-group-item-action';
  }

  render() {
    return (
      <div className='py-5 gamelist'>
        <div className="menubox">
        <div className="gamesmenu">
        <h1>Games</h1>
        <h2>user view/edit games</h2>
          <div>
            <button type="button" className="newGameBtn" onClick={this.newGame}>new</button>
            <button type="button" className="editGameBtn">edit</button>
            <button type="button" className="deleteGameBtn">delete</button>
          </div>
        </div>
        </div>
        <div className="boxbox">
        <div className="gamebox">
        {
          this.state.games.map(game => (
            <div key={game.gameID} className="list-group-games">
              <button type="button" className={this.setClassGame(game.gameID)} onClick={() => this.getGameLists(game.gameID)}>{game.gameName}</button>
            </div>
          ))
        }
        </div>
        <div className="listbox">
        {
          this.state.showLists.map(list => (
            <div key={list.listID} className="list-group-lists">
              <button type="button" className={this.setClassList(list.listID)} onClick={() => this.getWords(list.listID)}>{list.listName}</button>
            </div>
          ))
        }
        </div>
        <div className="wordbox">
            {
              this.state.showWords.map(word => (
                <div key={word.wordID} className="list-group-words">
                  <button type="button" className="list-group-item list-group-item-action" onClick={this.select}>{word.word}</button>
                </div>
              ))
            }
        </div>
        </div>
      </div>
    );
  }
}
