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
    this.newList = this.newList.bind(this);
    this.getWords = this.getWords.bind(this);
    this.setClassList = this.setClassList.bind(this);
    this.setClassWord = this.setClassWord.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.selectWord = this.selectWord.bind(this);
    this.deleteWord = this.deleteWord.bind(this);
    this.newWord = this.newWord.bind(this);
    this.editWord = this.editWord.bind(this);
    this.saveWord = this.saveWord.bind(this);
    // this.editList = this.editList.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.refreshWords = this.refreshWords.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
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
  // set selected list # and text into state ***in progress***
  getWords(listID) {
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

  // select a word # and text, set in state
  selectWord(wordNum, wordText) {
    this.setState({ wordClicked: wordNum }
      // , () => { console.log('this.state.wordClicked: ', this.state.wordClicked); }
    );
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

  // EDIT selected WORD
  editWord() {
    // open modal
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    // focus on modal text input field
    const input = document.querySelector('#editInput');
    input.focus();
  }

  // SAVE edited word
  saveWord() {
    // modal save btn sends sql to update word
    const newWord = document.querySelector('#editInput').value;
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
    this.closeModal();
  }

  // pressing Enter Key in modal input field uses saveWord()
  handleEnterKey(e) {
    if (e.key === 'Enter' || e.which === 13) {
      this.saveWord();
    }
  }

  // Stupid Bonus Function Just To Clear Input Field
  sbfjtcif() {
    const inputField = document.querySelector('#editInput');
    inputField.value = '';
  }
  // EDIT selected LIST
  // editList()

  // close modal, currently only editWordModal (editGame & editList to come)
  closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
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
            <h2>user view/edit lists</h2>
          </div>
        </div>
        <div className="boxbox">
          <div className="listbox">
            <div className="listmenu">
              <button type="button" className="newListBtn" onClick={this.newList}>new</button>
              <button type="button" className="editListBtn">edit</button>
              <button type="button" className="deleteListBtn" onClick={this.deleteList}>delete</button>
            </div>
            {
              this.state.lists.map(list => (
                <div key={list.listID} className="list-group-lists">
                  <button type="button" className={this.setClassList(list.listID)} onClick={() => this.getWords(list.listID)}>{list.listName}</button>
                </div>
              ))
            }
          </div>
          <div className="wordbox">
            <div className="wordmenu">
            {/* add word */}
              <button type="button" className="addWordBtn" onClick={this.newWord}>add</button>
            {/* edit word */}
              <button type="button" className="editWordBtn" onClick={this.editWord}>edit</button>
            {/* delete word */}
              <button type="button" className="deleteWordBtn" onClick={this.deleteWord}>delete</button>
            </div>
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
        {/* MODAL */}
        <div className="modal" id="editModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit: {this.state.wordSelected}</h5>
                <button type="button" className="btn-close" onClick={this.closeModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <input type="text" onKeyPress={this.handleEnterKey} className="form-control" id="editInput" autoFocus onFocus={this.sbfjtcif}></input>
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
      </div>
    );
  }
}
