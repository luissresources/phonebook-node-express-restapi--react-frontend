import React from 'react'

const PersonForm = ({addPerson, newName, onChangeName, newTel, onChangeTel}) => {

  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          <div>name: <input value={newName} onChange={onChangeName}/></div>
          <div>phone: <input type='newTel' value={newTel} onChange={onChangeTel}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm;
