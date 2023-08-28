// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { nanoid } from "nanoid";

// functional component

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Hello World</h1>
//       </header>
//     </div>
//   );
// }

// class based component

class App extends React.Component {
  //extend to use the methods of the parent Component
  constructor(props) {
    super(props); // access the parent properties

    // concept of state - keeping track of the data
    this.state = {
      //set the key/values I want to track
      todos: [{ id: 1, text: "walk the fish" }],
      text: "",
      isClicked: false,
    };

    //this.handleClick = this.handleClick.bind(this);
  } // end of constuctor

  // add a button that fires a handleSubmit method when clicked
  // add a p or h1 tag with a ternary operator to confirm the toggle works

  //we've lost the bind because we're rendering outside the scope of the constructor when using a function declaration
  // arrow function doesn't have this problem, so I'm rewriting it.
  handleClick = () => {
    this.setState({
      //isClicked: true  // this works one time
      isClicked: !this.state.isClicked, // to toggle, we negate the state every time the button is clicked
    });
  };

  // now let's add an text input to render/return and a function that handles the state change of the input
  // capture the changes in the text input field
  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  // handle submit button that adds a todo to the todo array

  handleSubmit = () => {
    this.setState({
      //todos: [this.state.text]  // at this point it doesn't clearthe text field and it overwrites previous todo

      // use spread (...) to get all the existing todos first
      // add the next submitted one to the end
      todos: [...this.state.todos, { id: nanoid(), text: this.state.text }],
      text: "",
    });
  };

  handleDelete = (id) => {
    console.log(id); // checking for correct id
    // get the todo by its index
    const index = this.state.todos.findIndex((todo) => todo.id === id);
    console.log(index);
    // make a copy of the array (don't mutate the original array)
    const copy = [...this.state.todos];
    // splice out the 1 todo at that index
    copy.splice(index, 1);
    // update state of todos with the copy
    this.setState({
      todos: copy,
    });
  };

  render() {
    // in classes, you have to wrap the return in a render method
    return (
      <div className="App">
        Enter a Todo:{" "}
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.text}
        />
        <button onClick={this.handleSubmit}>Add Todo</button>
        <ul>
          {this.state.todos.map((todo) => {
            return (
              <li key={todo.id}>
                {todo.text}
                <button onClick={() => this.handleDelete(todo.id)}>
                  DELETE
                </button>
              </li>
            );
          })}
        </ul>
        {/* <h1>{this.state.isClicked ? "Clicked" : "Not Clicked"}</h1>
        <button onClick={this.handleClick}>Click Me</button> */}
      </div>
    );
  }
} // end of class

export default App;
