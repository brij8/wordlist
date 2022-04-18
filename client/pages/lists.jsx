import React from 'react';

export default class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    fetch('api/lists')
      .then(res => res.json())
      .then(lists => {
        this.setState({ lists });
      });
  }

  render() {
    return (
      <div className='py-5'>
        <h1>Lists</h1>
        <h2>user view/edit lists</h2>
        {
          this.state.lists.map(list => (
            <div key={list.listID} className="list-group">
              <button type="button" className="list-group-item list-group-item-action">{list.listName}</button>
            </div>
          ))
        }
      </div>
    );
  }
}
