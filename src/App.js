import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Rápolas', age: 23 },
      { id: 2, name: 'Max', age: 29 },
      { id: 3, name: 'Stephanie', age: 26 }
    ],
    otherState: "Some other value",
    showPersons: false
  };

  // Método utilizado para trocar o nome após pressionado
  // switchNameHandler = (newName) => {
  //   // Don't do this: this.state.persons[1].name = "Maximilian";
  //   this.setState({
  //     persons: [
  //       { name: 'Rápolas', age: 23 },
  //       { name: newName, age: 29 },
  //       { name: 'Stephanie', age: 27 }
  //     ]
  //   })
  // }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); ou
    // o spread operator abaixo para evitar problemas
    // com o array persons do state quando for fazer update
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // Ou o de baixo
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    // const classes = ['red', 'bold'].join(' ');
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        {/* O método abaixo é menos eficiente */}
        {/* <button onClick={() => this.switchNameHandler('Maximilian')}>Switch Name</button> */}
        {/* Focar em utilizar o abaixo, com o bind */}
        {/* <button
          style={style} 
          onClick={this.switchNameHandler.bind(this, 'Maximilian')}>Switch Name</button> */}
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
        {/* Um if com expressão ternária */}
        {/* { this.state.showPersons ?
            <div>
              <Person
                name={this.state.persons[0].name}
                age={this.state.persons[0].age} />
              <Person
                name={this.state.persons[1].name}
                age={this.state.persons[1].age}
                click={this.switchNameHandler.bind(this, 'Max!')}>My hobbies: Racing</Person>
              <Person
                name={this.state.persons[2].name}
                age={this.state.persons[2].age}
                changed={this.nameChangedHandler} />
            </div> : null
        } */}
      </div>
    );
  }
}

export default App;
