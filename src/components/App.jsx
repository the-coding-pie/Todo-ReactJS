import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {items: ["Go To Market", "Go Play"]};

      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(newItem) {
    this.setState((prevValue) => {
      return prevValue.items.push(newItem);
    });
  }

  handleDelete(id) {
    this.setState({items: this.state.items.filter((value, index) => {
      return id !== index;
    })});
  }

  render() {
    return <div>
      <h1>Todo</h1>
      <Search onChanged={this.handleChange} />
      <List items={this.state.items} onDelete={this.handleDelete} />
    </div>;
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //take the value and call callback with value
    this.props.onChanged(this.state.value);
    this.setState({value: ""});
    event.preventDefault();
  }

  render() {
    return <form className="search" onSubmit={this.handleSubmit} >
      <input type="text" value={this.state.value} onChange={this.handleChange} />
      <button type="submit">Add</button>
    </form>;
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    this.props.onDelete(id);
  }

  render(props) {
    const items = this.props.items;

    return <ul>
      {items.map((item, index) => {
        return <Todo id={index} key={index} className="todo" onDelete={this.handleDelete} >
        {item}
    </Todo>
      })}
    </ul>;
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: false};

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck() {
    this.setState({checked : !this.state.checked});
  }

  render(props) {
    const { className, id, key, children, onDelete } = this.props;
    return <li key={key} className={className} style={{textDecoration: this.state.checked && "line-through" }} >
      <input 
       type="checkbox" 
       onClick={this.handleCheck}
      />
      {children}
      <button name="delete" onClick={() => {
        onDelete(id)
      }}>X</button>
    </li>;
  }
}

export default App;