import React from 'react';

export default class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    fetch('/api/lists')
      .then(res => res.json())
      .then(lists => {
        this.setState({ lists });
      });
  }

  getWords(event) {
    // add 'active' to className to highlight
    // list the words in the Game/List
  }

  render() {
    return (
      <div className="py-5">
        <h1>Lists</h1>
        <h2>user view/edit lists</h2>
        {
          <div>
            <button type="button" className="newListBtn">new</button>
            <button type="button" className="editListBtn">edit</button>
            <button type="button" className="deleteListBtn">delete</button>
          </div>
        }
        {
          // <div className="lists">
          this.state.lists.map(list => (
            <div key={list.listID} className="list-group">
              <button type="button" className="list-group-item list-group-item-action" onClick={this.getWords()}>{list.listName}</button>
            </div>
          ))
          // </div>
        }
      </div>
    );
  }
}
