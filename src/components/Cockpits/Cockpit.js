import React from 'react';
import styles from './Cockpit.css';

const Cockpit = (props) => {
    const assignedClasses = [];
    let btnClass = styles.Button;

    if (props.showPersons) {
        btnClass = styles.ButtonRed;
    }

    if (props.persons.length <= 2) {
        assignedClasses.push(styles.red);
    }

    if (props.persons.length <= 1) {
        assignedClasses.push(styles.bold);
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};

export default Cockpit;