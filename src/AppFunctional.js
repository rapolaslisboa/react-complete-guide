import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const App = props => { 
  const [ personsState, setPersonsState ] = useState({
    persons: [
      { name: 'Rápolas', age: 23 },
      { name: 'Max', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: "Some other value"    
  });

  const switchNameHandler = () => {
    // Don't do this: this.state.persons[1].name = "Maximilian";
    setPersonsState({
      persons: [
        { name: 'Rápolas', age: 23 },
        { name: 'Maximilian', age: 29 },
        { name: 'Stephanie', age: 27 }
      ],
      otherState: personsState.otherState  
    })
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My hobbies: Racing</Person>
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
    </div>
  );
}

export default App;
