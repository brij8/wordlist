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

    this.gameModal = React.createRef();
    this.editGameInput = React.createRef();
    this.delGameModal = React.createRef();

    this.setClassGame = this.setClassGame.bind(this);
    this.setClassList = this.setClassList.bind(this);
    this.setClassShowList = this.setClassShowList.bind(this);
    this.setClassWord = this.setClassWord.bind(this);

    this.getWords = this.getWords.bind(this);
    this.getGLWords = this.getGLWords.bind(this);
    this.selectWord = this.selectWord.bind(this);

    this.newGame = this.newGame.bind(this);
    this.editGame = this.editGame.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
    this.delGameConfirm = this.delGameConfirm.bind(this);

    this.saveGameEnterKey = this.saveGameEnterKey.bind(this);
    this.getGameLists = this.getGameLists.bind(this);
    this.refreshGames = this.refreshGames.bind(this);
    this.closeModal = this.closeModal.bind(this);

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

  // get lists and all words from selected game
  getGameLists(gameID, gameName) {
    this.setState({ gameSelected: gameName });
    this.setState({ gameClicked: gameID });
    this.setState({ showWords: [] });
    this.setState({ listSelected: '' });
    this.setState({ listClicked: -1 });
    fetch('/api/gamelist/' + gameID)
      .then(response => response.json())
      .then(gameLists => {
        const uniqueLists = [];
        // filter dupe listNames to only render uniques
        for (const row of gameLists) {
          let found = false;
          for (const output of uniqueLists) {
            if (output.listName === row.listName) { found = true; }
          }
          if (!found) { uniqueLists.push(row); }
        }
        this.setState({ showLists: uniqueLists, showWords: gameLists });
      });
  }

  // get words from selected list
  getWords(listID, listName) {
    this.setState({ listClicked: listID });
    this.setState({ listSelected: listName });
    this.setState({ gameSelected: '' });
    fetch('/api/listWords/' + listID)
      .then(response => response.json())
      .then(listwords => {
        this.setState({ showWords: listwords });
      });
  }

  // get words from selected game-list
  getGLWords(listID, listName) {
    this.setState({ listClicked: listID });
    this.setState({ listSelected: listName });
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

  // Enter onKeyPress() in game-modal input field uses saveGame()
  saveGameEnterKey(e) {
    if (e.key === 'Enter' || e.which === 13) {
      this.saveGame();
    }
  }

  // EDIT selected GAME; open modal, focus on it, clear prev input
  editGame() {
    this.gameModal.current.style.display = 'block';
    this.editGameInput.current.focus();
    this.editGameInput.current.value = '';
  }

  // refresh state.games[] after editing a gameName, used in saveGame()
  // will eventually want userID to pull users games
  refreshGames() {
    fetch('/api/games')
      .then(res => res.json())
      .then(games => {
        this.setState({ games });
      });
  }

  // SAVE edited GAME
  saveGame() {
    const newGName = this.editGameInput.current.value;
    if (newGName !== '') {
      const ID = Number(this.state.gameClicked);
      const req = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          editInput: newGName,
          gameID: ID
        })
      };
      fetch('api/games/:gameID', req);
      this.refreshGames();
    }
    this.closeModal();
  }

  // close modal
  closeModal() {
    this.gameModal.current.style.display = 'none';
    this.delGameModal.current.style.display = 'none';
  }

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
    this.delGameModal.current.style.display = 'none';
  }

  // delete game cofirm modal
  delGameConfirm() {
    this.delGameModal.current.style.display = 'block';
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

  // remove list from game
  removeList(key) {
    const gameID = Number(this.state.gameClicked);
    const listID = Number(this.state.listClicked);
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selGameID: gameID,
        selListID: listID
      })
    };
    fetch('/api/gamelist/', req);
    const findList = list => list.listID === listID;
    const delList = this.state.showLists.findIndex(findList);
    this.state.showLists.splice(delList, 1);
    this.forceUpdate();
  }

  // select a word
  selectWord(key) {
    this.setState({ wordClicked: key });
  }

  // ---------selection styling----------------
  // set class to show game selection
  setClassGame(key) {
    return (this.state.gameClicked === key)
      ? 'list-group-item list-group-item-action active-game'
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
            <span className="games-subtitle">make a game, fill it with lists</span>
            </div>
        </div>
        <div className="boxbox">
          <div className="gamebox">
            <div className="gamemenu">
              <h5 className="game-label">games</h5>
              <button type="button" className="menu-btn new-game-btn" onClick={this.newGame}>new</button>
              <button type="button" className="menu-btn edit-game-btn" onClick={this.editGame}>edit</button>
              <button type="button" className="menu-btn delete-game-btn" onClick={this.delGameConfirm}>delete</button>
            </div>
          { // show users games
            this.state.games.map(game => (
              game.gameID === this.state.gameClicked
              // if game being mapped is also selected game, render that games button AND that games lists below it
                ? (
                  <div key={game.gameID}>
                    <div className="list-group-games">
                      <button type="button" className={this.setClassGame(game.gameID)} onClick={() => this.getGameLists(game.gameID, game.gameName)} onDoubleClick={this.editGame}>{game.gameName}</button>
                    </div>
                    <div className="sel-game-lists">
                        {// show lists of selected game
                          this.state.showLists.map(list => (
                              <div key={list.listID} className="list-group-lists">
                              <button type="button" className={this.setClassShowList(list.listID)} onClick={() => this.getGLWords(list.listID, list.listName)}>{list.listName}</button>
                              </div>
                          ))
                        }
                    </div>
                  </div>
                  )
              // if game is NOT selected, only render its button
                : (
                  <div key={game.gameID} className="list-group-games">
                    <button type="button" className={this.setClassGame(game.gameID)} onClick={() => this.getGameLists(game.gameID, game.gameName)} onDoubleClick={this.editGame}>{game.gameName}</button>
                  </div>)
            ))
          }

          </div>
          <div className="listbox">
            <div className="listmenu">
              <h5 className="list-label">lists</h5>
              <button type="button" className="menu-btn add-list-btn" onClick={this.addList}>add</button>
              <button type="button" className="menu-btn remove-list-btn" onClick={this.removeList}>remove</button>
            </div>
            <div className="all-lists">
            { // show all users lists
              this.state.lists.map(list => (
                <div key={list.listID} className="list-group-lists">
                  <button type="button" className={this.setClassList(list.listID)} onClick={() => this.getWords(list.listID, list.listName)}>{list.listName}</button>
                </div>
              ))
            }
            </div>
          </div>
          <div className="wordbox">
              <div className="wordmenu">
              <h5 className="words-label" id="word-label"><span className="word-count">{this.state.showWords.length}</span> words in: <span className="sel-game-col">{this.state.gameSelected}</span> <span className="sel-list-col">{this.state.listSelected}</span></h5>
              </div>
              <div className="wordflex">
              {
                this.state.showWords.map(word => (
                  <div key={word.listWordID} className="list-group-words">
                    <button type="button" className={this.setClassWord(word.listWordID)} onClick={() => this.selectWord(word.listWordID)}>{word.word}</button>
                  </div>
                ))
              }
              </div>
          </div>
        {/* EDIT GAME MODAL */}
          <div className="modal" ref={this.gameModal} id="editModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">Edit: {this.state.gameSelected}</h5>
                  <button type="button" className="btn-close" onClick={this.closeModal}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <input type="text" ref={this.editGameInput} onKeyPress={this.saveGameEnterKey} className="form-control" id="editInput" autoFocus></input>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                  <button type="button" id="saveBtn" className="btn btn-primary" onClick={this.saveGame}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        {/* CONFIRM DELETE GAME MODAL */}
          <div className="modal" ref={this.delGameModal} id="delGameModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="delGameModalLabel"><span className="del-text-1">DELETE: </span><span className="del-text-2">{this.state.gameSelected}</span><span className="del-text-3">???</span></h5>
                  <button type="button" className="btn-close" onClick={this.closeModal}></button>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Cancel</button>
                  <button type="button" id="del-game-modal-btn" className="btn btn-primary" onClick={this.deleteGame}>DELETE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
