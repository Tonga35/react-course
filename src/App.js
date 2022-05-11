import React, { useState } from "react";
import "./App.css";
import Person from "./Person/Person";

const app = (props) => {
  // the first argument is the state, the second the function used to modify it.
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

  const style = {
    backgroundColor: "green",
    color: "white",
    font: "inherit",
    border: "1px solid blue",
    padding: "8px",
    cursor: "pointer",
  };

  let persons = null;

  // if showPersons is true maps the persons object and for its items create a Person component
  if (toggleListState.showPersons) {
    persons = (
      <div>
        {personsState.persons.map((person, index) => {
          return (
            <Person
              click={() => deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => {
                nameChangedHandler(event, person.id);
              }}
            />
          );
        })}
      </div>
    );
    style.backgroundColor = "grey";
  }

  // dynamically adding classes to an element.
  let classes = [];
  if (personsState.persons.length <= 2) {
    classes.push("red");
  }
  if (personsState.persons.length <= 1) {
    classes.push("bold");
  }

  return (
    <div className="App">
      <h1 className="App-title">Welcome to React</h1>
      <p className={classes.join(" ")}>This is working</p>
      <button style={style} onClick={showListHandler}>
        Toggle Persons
      </button>
      {persons}
    </div>
  );
};

export default app;
