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
      gameSelected: '',
      listClicked: -1,
      listSelected: '',
      wordClicked: -1
    };

    // this.gameModal = React.createRef();
    // this.editGameInput = React.createRef();

    this.newGame = this.newGame.bind(this);
    this.getGameLists = this.getGameLists.bind(this);
    this.getWords = this.getWords.bind(this);
    this.setClassGame = this.setClassGame.bind(this);
    this.setClassList = this.setClassList.bind(this);
    this.setClassShowList = this.setClassShowList.bind(this);
    this.setClassWord = this.setClassWord.bind(this);
    this.selectWord = this.selectWord.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
    this.addList = this.addList.bind(this);
    this.removeList = this.removeList.bind(this);
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

  // get lists from selected game
  getGameLists(gameID) {
    this.setState({ gameClicked: gameID });
    this.setState({ showWords: [] });
    this.setState({ listSelected: '' });
    this.setState({ listClicked: -1 });
    fetch('/api/gamelist/' + gameID)
      .then(response => response.json())
      .then(gameLists => {
        this.setState({ showLists: gameLists });
      });
  }

  // get words from selected list
  getWords(listID) {
    // eslint-disable-next-line no-console
    console.log('list selected: ', listID);
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
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/api/games', req)
      .then(response => response.json())
      .then(makeGame => {
        const allGames = this.state.games.concat(makeGame);
        this.setState({ games: allGames });
      }
      );
  }

  // EDIT selected GAME ***IN PROGESS***
  // editGame() {
  //   const ID = this.state.gameClicked;
  //   const req = {
  //     method: 'UPDATE',
  //     headers: { 'Content-Type': 'application/json' }
  //   };
  //   fetch('api/games/' + ID, req);
  // }

  // delete selected game
  deleteGame() {
    const ID = this.state.gameClicked;
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/api/games/' + ID, req);
    const findGame = game => game.gameID === ID;
    const delGame = this.state.games.findIndex(findGame);
    this.state.games.splice(delGame, 1);
    this.setState({ showLists: [] });
  }

  // add lists to game
  addList() {
    const game = this.state.gameClicked;
    const list = this.state.listClicked;

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selGameID: game,
        selListID: list
      })
    };
    fetch('/api/gamelist/', req)
      .then(response => response.json())
      .then(addList => {
        const allLists = this.state.showLists.concat(addList);
        this.setState({ showLists: allLists });
        this.forceUpdate();
      }
      );
  }

  // select a word
  selectWord(key) {
    // eslint-disable-next-line no-console
    console.log('word selected: ', key);
    this.setState({ wordClicked: key });
  }

  removeList(key) {
    // eslint-disable-next-line no-console
    console.log('this.state.listClicked: ', this.state.listClicked);
  }

  // ---------selection styling----------------
  // set class to show game selection
  setClassGame(key) {
    return (this.state.gameClicked === key)
      ? 'list-group-item list-group-item-action active'
      : 'list-group-item list-group-item-action';
  }

  // set class to show list selection
  setClassList(key) {
    return (this.state.listClicked === key)
      ? 'list-group-item list-group-item-action active-list'
      : 'list-group-item list-group-item-action';
  }

  // set class for lists already in a game
  setClassShowList(key) {
    return (this.state.listClicked === key)
      ? 'sel-game-list-style list-group-item list-group-item-action active'
      : 'sel-game-list-style list-group-item list-group-item-action';
  }

  // set class to show word selection
  setClassWord(key) {
    return (this.state.wordClicked === key)
      ? 'list-group-item list-group-item-action active'
      : 'list-group-item list-group-item-action';
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
        { // show users games
          this.state.games.map(game => (
            <div key={game.gameID} className="list-group-games">
              <button type="button" className={this.setClassGame(game.gameID)} onClick={() => this.getGameLists(game.gameID)}>{game.gameName}</button>
            </div>
          ))
        }
        </div>
        <div className="listbox">
          <div className="listmenu">
            <button type="button" className="addListBtn" onClick={this.addList}>add</button>
            <button type="button" className="removeListBtn" onClick={this.removeList}>remove</button>
          </div>
          <div className="sel-game-lists">
          {// show lists of selected game
            this.state.showLists.map(list => (
                <div key={list.listID} className="list-group-lists">
                  <button type="button" className={this.setClassShowList(list.listID)} onClick={() => this.getWords(list.listID)}>{list.listName}</button>
                </div>
            ))
          }
          </div>
          <div className="all-lists">
          { // show all users lists
            this.state.lists.map(list => (
              <div key={list.listID} className="list-group-lists">
                <button type="button" className={this.setClassList(list.listID)} onClick={() => this.getWords(list.listID)}>{list.listName}</button>
              </div>
            ))
          }
          </div>
          </div>
          <div className="wordbox">
            <div className="wordmenu">
              <h5 className="words-label">All words in: (this.listSelected)</h5>
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
