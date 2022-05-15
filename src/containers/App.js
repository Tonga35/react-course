import React, { useState } from "react";
import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

const app = (props) => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: "gaston", age: 23, id: 1 },
      { name: "pepe", age: 25, id: 2 },
      { name: "jorge", age: 35, id: 3 },
    ],
  });

  const [toggleListState, toggleList] = useState({
    showPersons: false,
  });

  const nameChangedHandler = (event, id) => {
    const personIndex = personsState.persons.findIndex((p) => {
      return p.id === id;
    });

    // we must not mutate the state directly, first we should "copy" it.
    const persons = [...personsState.persons];

    // to the person we want to modify we create a copy of it
    const person = { ...personsState.persons[personIndex] };
    person.name = event.target.value;
    persons[personIndex] = person;

    // then we use the state callback to update it with the copy we created.
    setPersonsState({ persons: persons });
  };

  const deletePersonHandler = (personIndex) => {
    const persons = [...personsState.persons];

    persons.splice(personIndex, 1);
    setPersonsState({ persons: persons });
  };

  const showListHandler = () => {
    const doesShow = toggleListState.showPersons;
    toggleList({ showPersons: !doesShow });
  };
  let persons = null;

  if (toggleListState.showPersons) {
    persons = (
      <Persons
        persons={personsState.persons}
        clicked={deletePersonHandler}
        changed={nameChangedHandler}
      ></Persons>
    );
  }

  return (
    <div className={classes.App}>
      <Cockpit
        showPersons={toggleListState.showPersons}
        clicked={showListHandler}
        persons={personsState.persons}
      ></Cockpit>
      {persons}
    </div>
  );
};

export default app;
