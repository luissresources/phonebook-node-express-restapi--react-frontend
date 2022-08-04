import React from 'react'
import Person from './Person';

const Persons = ({newSearch, persons, filterSearch, deletePerson}) => {

  return (
    <>
      {
        newSearch === '' ?
          persons.map(person => {
            return (
              <Person
                key={person.id}
                id = {person.id}
                person={person}
                deletePerson = {() => deletePerson(person.id)}
              />
            )
          })
          :
          filterSearch.length === 0 ?
            <p>No results</p>
              :
              filterSearch.map((person) => {
                return (
                  <Person 
                    key={person.key}
                    person={person}
                    deletePerson = {() => deletePerson(person.id)}
                  />
                )
              })
      }
    </>
  )
}

export default Persons;