import React from 'react';

export default class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      showWords: [],
      listClicked: -1,
      wordClicked: -1
    };
    this.newList = this.newList.bind(this);
    this.getWords = this.getWords.bind(this);
    this.setClassList = this.setClassList.bind(this);
    this.setClassWord = this.setClassWord.bind(this);
    this.selectWord = this.selectWord.bind(this);
    this.deleteList = this.deleteList.bind(this);
    // this.deleteWord = this.deleteWord.bind(this);
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

  // get words from selected list
  getWords(listID) {
    this.setState({ listClicked: listID });
    fetch('/api/listWords/' + listID)
      .then(response => response.json())
      .then(listwords => {
        this.setState({ showWords: listwords });
      });
  }

  // delete selected list ***IN PROGRESS***
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

  // deleteList(key) {
  //   // eslint-disable-next-line no-console
  //   console.log('this.state.listClicked: ', this.state.listClicked);
  // }

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
              <button type="button" className="addWordBtn" onClick={this.addWord}>add</button>
              <button type="button" className="editWordBtn">edit</button>
              <button type="button" className="deleteWordBtn" onClick={this.deleteWord}>delete</button>
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
