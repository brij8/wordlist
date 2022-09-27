import React from 'react';

export default class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      showWords: [],
      listClicked: -1,
      listSelected: '',
      wordClicked: -1,
      wordSelected: ''
    };

    this.wordModal = React.createRef();
    this.editWordInput = React.createRef();
    this.listModal = React.createRef();
    this.editListInput = React.createRef();

    this.getWords = this.getWords.bind(this);
    this.selectWord = this.selectWord.bind(this);
    this.setClassList = this.setClassList.bind(this);
    this.setClassWord = this.setClassWord.bind(this);

    this.newWord = this.newWord.bind(this);
    this.editWord = this.editWord.bind(this);
    this.saveWord = this.saveWord.bind(this);
    this.deleteWord = this.deleteWord.bind(this);

    this.newList = this.newList.bind(this);
    this.editList = this.editList.bind(this);
    this.saveList = this.saveList.bind(this);
    this.deleteList = this.deleteList.bind(this);

    this.closeModal = this.closeModal.bind(this);
    this.refreshWords = this.refreshWords.bind(this);
    this.saveWordEnterKey = this.saveWordEnterKey.bind(this);
    this.saveListEnterKey = this.saveListEnterKey.bind(this);
  }

  componentDidMount() {
    fetch('/api/lists')
      .then(res => res.json())
      .then(lists => {
        this.setState({ lists });
      });
  }

  // generate a new list
  newList() {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/api/lists', req)
      .then(response => response.json())
      .then(makeList => {
        const allLists = this.state.lists.concat(makeList);
        this.setState({ lists: allLists });
      }
      );
  }

  // get and show words from selected list
  getWords(listID, listName) {
    this.setState({ listSelected: listName });
    this.setState({ listClicked: listID });
    this.setState({ wordSelected: '' });
    fetch('/api/listWords/' + listID)
      .then(response => response.json())
      .then(listwords => {
        this.setState({ showWords: listwords });
      });
  }

  // refresh showWords after editing a word, used in saveWord()
  refreshWords(listID) {
    fetch('/api/listWords/' + listID)
      .then(response => response.json())
      .then(listwords => {
        this.setState({ showWords: listwords });
      });
  }

  // refresh state.lists[] after editing a listName, used in saveList()
  // will eventually want userID to pull users lists
  refreshLists() {
    fetch('/api/lists')
      .then(res => res.json())
      .then(lists => {
        this.setState({ lists });
      });
  }

  // delete selected list
  deleteList() {
    const ID = this.state.listClicked;
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/api/lists/' + ID, req);
    const findList = list => list.listID === ID;
    const delList = this.state.lists.findIndex(findList);
    this.state.lists.splice(delList, 1);
    this.setState({ showWords: [] });
  }

  // select a words ID# and string, set in state
  selectWord(wordID, wordText) {
    this.setState({ wordClicked: wordID });
    this.setState({ wordSelected: wordText });
  }

  // delete selected word
  deleteWord() {
    const ID = Number(this.state.wordClicked);
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/api/listwords/' + ID, req);
    const findWord = word => word.listWordID === ID;
    const delWord = this.state.showWords.findIndex(findWord);
    this.state.showWords.splice(delWord, 1);
    this.forceUpdate();
  }

  // generate a new word
  newWord() {
    const list = this.state.listClicked;
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selListID: list
      })
    };
    fetch('/api/listwords/', req)
      .then(response => response.json())
      .then(makeWord => {
        const allWords = this.state.showWords.concat(makeWord);
        this.setState({ showWords: allWords });
      }
      );
  }

  // EDIT selected WORD; open modal, focus on it, clear prev input
  editWord() {
    this.wordModal.current.style.display = 'block';
    this.editWordInput.current.focus();
    this.editWordInput.current.value = '';
  }

  // SAVE edited word; sends SQL update, then refreshes showWords with res
  saveWord() {
    const newWord = this.editWordInput.current.value;
    if (newWord !== '') {
      const ID = this.state.wordClicked;
      const req = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          editInput: newWord,
          listWordID: ID
        })
      };
      fetch('api/listwords/:listWordID', req)
        .then(response => response.json())
        .then(res => {
          const listID = res[0].listID;
          this.refreshWords(listID);
        });
    }
    this.closeModal();
  }

  // Enter onKeyPress() in word-modal input field uses saveWord()
  saveWordEnterKey(e) {
    if (e.key === 'Enter' || e.which === 13) {
      this.saveWord();
    }
  }

  // EDIT selected LIST; open modal, focus on it, clear prev input
  editList() {
    this.listModal.current.style.display = 'block';
    this.editListInput.current.focus();
    this.editListInput.current.value = '';
  }

  // SAVE edited LIST
  saveList() {
    const newLName = this.editListInput.current.value;
    if (newLName !== '') {
      const ID = this.state.listClicked;
      const req = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          editInput: newLName,
          listID: ID
        })
      };
      fetch('api/lists/:listID', req);
      this.refreshLists();
    }
    this.closeModal();
  }

  // Enter onKeyPress() in list-modal input field uses saveList()
  saveListEnterKey(e) {
    if (e.key === 'Enter' || e.which === 13) {
      this.saveList();
    }
  }

  // close modal
  closeModal() {
    this.wordModal.current.style.display = 'none';
    this.listModal.current.style.display = 'none';
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

  render() {
    return (
      <div className='py-5 listlist'>
        <div className="titlebox">
          <div className="listtitle">
            <h1>Lists</h1>
            <span className="lists-subtitle">make a list, fill it with words</span>
          </div>
        </div>
        <div className="boxbox">
          <div className="listbox">
            <div className="listmenu">
              <h5 className="list-label">lists</h5>
              {/* make new list */}
              <button type="button" className="menu-btn new-list-btn" onClick={this.newList}>new</button>
              {/* edit list */}
              <button type="button" className="menu-btn edit-list-btn" onClick={this.editList}>edit</button>
              {/* delete list */}
              <button type="button" className="menu-btn delete-list-btn" onClick={this.deleteList}>delete</button>
            </div>
            {
              this.state.lists.map(list => (
                <div key={list.listID} className="list-group-lists">
                  <button type="button" className={this.setClassList(list.listID)} onClick={() => this.getWords(list.listID, list.listName)} onDoubleClick={this.editList}>{list.listName}</button>
                </div>
              ))
            }
          </div>
          <div className="wordbox">
            <div className="wordmenu">
            {/* add new word */}
              <button type="button" className="menu-btn add-word-btn" onClick={this.newWord}>new</button>
            {/* edit word */}
              <button type="button" className="menu-btn edit-word-btn" onClick={this.editWord}>edit</button>
            {/* delete word */}
              <button type="button" className="menu-btn delete-word-btn" onClick={this.deleteWord}>delete</button>
              <h5 className="words-label" id="word-label"><span className="word-count">{this.state.showWords.length}</span> words in: <span className="sel-list-col">{this.state.listSelected}</span></h5>
            </div>
            <div className="wordflex">
            {
              this.state.showWords.map(word => (
                <div key={word.listWordID} className="list-group-words">
                  <button type="button" className={this.setClassWord(word.listWordID)} onClick={() => this.selectWord(word.listWordID, word.word)} onDoubleClick={this.editWord}
                  >{word.word}</button>
                </div>
              ))
            }
            </div>
          </div>
        </div>
        {/* EDIT WORD MODAL */}
        <div className="modal" ref={this.wordModal} id="editModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit: {this.state.wordSelected}</h5>
                <button type="button" className="btn-close" onClick={this.closeModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <input type="text" ref={this.editWordInput} onKeyPress={this.saveWordEnterKey} className="form-control" id="editInput" autoFocus></input>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                <button type="button" id="saveBtn" className="btn btn-primary" onClick={this.saveWord}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* EDIT LIST MODAL */}
        <div className="modal" ref={this.listModal} id="editListModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editListModalLabel">Edit: {this.state.listSelected}</h5>
                <button type="button" className="btn-close" onClick={this.closeModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <input type="text" ref={this.editListInput} onKeyPress={this.saveListEnterKey} className="form-control" id="editListInput" autoFocus></input>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                <button type="button" id="saveListBtn" className="btn btn-primary" onClick={this.saveList}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
