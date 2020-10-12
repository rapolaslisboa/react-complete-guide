import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';

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
    let persons = null;
    let btnClass = [classes.Button];

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />
        </div>
      );
      btnClass.push(classes.Red);
    }

    // const classes = ['red', 'bold'].join(' ');
    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        {/* O método abaixo é menos eficiente */}
        {/* <button onClick={() => this.switchNameHandler('Maximilian')}>Switch Name</button> */}
        {/* Focar em utilizar o abaixo, com o bind */}
        {/* <button
          style={style} 
          onClick={this.switchNameHandler.bind(this, 'Maximilian')}>Switch Name</button> */}
        <button
          className={btnClass.join(' ')}
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
