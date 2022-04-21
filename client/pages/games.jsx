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
      listClicked: -1,
      wordClicked: -1
    };
    this.newGame = this.newGame.bind(this);
    this.getGameLists = this.getGameLists.bind(this);
    this.getWords = this.getWords.bind(this);
    this.setClassGame = this.setClassGame.bind(this);
    this.setClassList = this.setClassList.bind(this);
    this.setClassWord = this.setClassWord.bind(this);
    this.selectWord = this.selectWord.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
    this.removeList = this.removeList.bind(this);
    this.removeWord = this.removeWord.bind(this);
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

  // set class to show game selection
  setClassGame(key) {
    return (this.state.gameClicked === key)
      ? 'list-group-item list-group-item-action active'
      : 'list-group-item list-group-item-action';
  }

  // set class to show list selection
  setClassList(key) {
    return (this.state.listClicked === key)
      ? 'list-group-item list-group-item-action active'
      : 'list-group-item list-group-item-action';
  }

  // set class to show word selection
  setClassWord(key) {
    return (this.state.wordClicked === key)
      ? 'list-group-item list-group-item-action active'
      : 'list-group-item list-group-item-action';
  }

  // select a word
  selectWord(key) {
    this.setState({ wordClicked: key });
    // eslint-disable-next-line no-console
    console.log('this.state.wordClicked: ', this.state.wordClicked);
  }

  // delete selections
  deleteGame(key) {
    // eslint-disable-next-line no-console
    console.log('this.state.gameClicked: ', this.state.gameClicked);
  }

  removeList(key) {
    // eslint-disable-next-line no-console
    console.log('this.state.listClicked: ', this.state.listClicked);
  }

  removeWord(key) {
    // eslint-disable-next-line no-console
    console.log('this.state.wordClicked: ', this.state.wordClicked);
  }

  render() {
    return (
      <div className='py-5 gamelist'>
        <div className="titlebox">
        <div className="gamestitle">
        <h1>Games</h1>
        <h2>user view/edit games</h2>
        </div>
        </div>
        <div className="boxbox">
        <div className="gamebox">
          <div className="gamemenu">
            <button type="button" className="newGameBtn" onClick={this.newGame}>new</button>
            <button type="button" className="editGameBtn">edit</button>
            <button type="button" className="deleteGameBtn" onClick={this.deleteGame}>delete</button>
          </div>
        {
          this.state.games.map(game => (
            <div key={game.gameID} className="list-group-games">
              <button type="button" className={this.setClassGame(game.gameID)} onClick={() => this.getGameLists(game.gameID)}>{game.gameName}</button>
            </div>
          ))
        }
        </div>
        <div className="listbox">
            <div className="listmenu">
              <button type="button" className="newListBtn" onClick={this.newList}>new</button>
              <button type="button" className="editListBtn">edit</button>
              <button type="button" className="removeListBtn" onClick={this.removeList}>remove</button>
            </div>
        {
          this.state.showLists.map(list => (
            <div key={list.listID} className="list-group-lists">
              <button type="button" className={this.setClassList(list.listID)} onClick={() => this.getWords(list.listID)}>{list.listName}</button>
            </div>
          ))
        }
        </div>
        <div className="wordbox">
            <div className="wordmenu">
              <button type="button" className="addWordBtn" onClick={this.addWord}>add</button>
              <button type="button" className="editWordBtn">edit</button>
              <button type="button" className="removeWordBtn" onClick={this.removeWord}>remove</button>
            </div>
            {
              this.state.showWords.map(word => (
                <div key={word.listWordID} className="list-group-words">
                  <button type="button" className={this.setClassWord(word.listWordID)} onClick={() => this.selectWord(word.listWordID)}>{word.word}</button>
                </div>
              ))
            }
        </div>
        </div>
      </div>
    );
  }
}
