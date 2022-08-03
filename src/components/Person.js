import React from 'react'

const Person = ({person, deletePerson}) => {

  // console.log({person, deletePerson},' person.key: ',person.key,' person.id: ',person.id)

  return (
    <div key={person.key}>
      <p>{person.name} <span><strong>Tel:</strong></span>{person.number}</p>
      <button onClick={deletePerson}>Delete</button>
    </div>
  )
}

export default Person;