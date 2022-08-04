import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personDataService from './services/PersonData'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons ] = useState([])
  const [newName, setNewName ] = useState('')
  const [newTel, setNewTel] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [typeNotification, setTypeNotification] = useState('success')
  const [infoNotification, setInfoNotification]  = useState(null)

  useEffect(()=>{
    personDataService.getAll()
      .then(data => {
        setPersons(data)
      })
  },[])

  const addPerson = (e) => {
    e.preventDefault();
    const validationName = persons.some( person => person.name.toLowerCase() === newName.toLowerCase())
    if (validationName) {
      const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      const personToUpdateWithNewTel = {...personToUpdate, number : newTel}
      const validationConfirmUpdate = window.confirm(`${personToUpdateWithNewTel.name} is already added to phonebook, replace the old number with a new one?`)
      if (validationConfirmUpdate) {
        personDataService.update(personToUpdate.id, personToUpdateWithNewTel)
        .then(personUpdate => {
          personDataService
            .getAll()
            .then(result => {
              setPersons(result)
            })
          successNotification(`Phone was updated `)
          setNewName('')
          setNewTel('')
        })
        .catch(error => {
          errorNotification(`Information of ${newName} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== personToUpdate.id))
        })
      }
    } else {


      if(newName.length < 4) {
        return errorNotification('Name very short')
      }

      if(newTel.length < 8) {
        return errorNotification('Number must be greater that 10000000 ')
      }
      
      const newPersonObject = {
        name: newName,
        number: newTel
      }

      if(newPersonObject.name !== '' && newPersonObject.newTel !== '') {
        personDataService.create(newPersonObject)
        .then(response => {
          personDataService.getAll()
            .then(result => {
              setPersons(result)
            })
          successNotification(`Added ${newPersonObject.name}`)
          setNewName('')
          setNewTel('')
        })
        .catch(error => {
          errorNotification(`server not found`)
        })
      } else {
        return errorNotification(`Required fields`)
      }
    }
  }

  const onChangeName = e => setNewName(e.target.value)
  const onChangeTel = e => setNewTel(e.target.value)
  const onChangeSearch = e => setNewSearch(e.target.value)

  const filterSearch = persons.filter(person => (person.name.toLowerCase()).includes(newSearch))

  const deletePerson = (id) => {
    const userDelete = persons.find(person => person.id === id)
    const message = window.confirm(`Delete ${userDelete.name}?`)
    if (message) {
      personDataService.remove(id)
      .then(() => {
        personDataService.getAll()
          .then(persons => {
            setPersons(persons)
            successNotification(`${userDelete.name} went delete from phonebook`)
          })
      })
      .catch(error => {
        errorNotification(`User ${userDelete.name} has already been removed from server`)
      })
    }

  }

  const successNotification = (message) => {
    setTypeNotification('success')
      setTimeout(()=>{
        setInfoNotification(null)
      },5000)
    setInfoNotification(message)
  }

  const errorNotification = (message) => {
    setTypeNotification('error')
      setTimeout(()=>{
        setInfoNotification(null)
      },5000)
      setInfoNotification(message)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        typeNotification = {typeNotification}
        message = {infoNotification}
      />
      <div>
        <Filter 
          newSearch={newSearch}
          onChangeSearch={onChangeSearch}
        />
      </div>
      <h2>Add new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        onChangeName={onChangeName}
        newTel={newTel}
        onChangeTel={onChangeTel}
      />
      <h2>Numbers</h2>
      <Persons 
        newSearch={newSearch}
        persons={persons}
        filterSearch={filterSearch}
        deletePerson = {deletePerson}
      />
    </div>
  )
}

export default App