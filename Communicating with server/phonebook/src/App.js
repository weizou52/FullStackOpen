import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import './App.css'

const SNotification = ({ message}) => {
  if (message === '') {
    return null
  }

  return (
    <div className='successMsg'>
      {message}
    </div>
  )
}

const ENotification = ({ message}) => {
  if (message === '') {
    return null
  }

  return (
    <div className='errorMsg'>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [success, setSuccess]=useState('')
  const [errorMessage, setErrorMessage]=useState('')

  useEffect(()=>{
    personService.getAll()
        .then(iPersons=>setPersons(iPersons))
  },[])

  const peopleToShow = persons.filter(person=>person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    if (persons.some(person=>person.name===newName)){
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const person=persons.find(p=>p.name===newName)
        const changePerson={...person, number:newNumber}
        personService
        .update(person.id, changePerson)
        .then(updatedPerson=>{
          setSuccess(`${updatedPerson.name}'s Number has been Changed`)
          setTimeout(() => {
            setSuccess('')
          }, 5000)
          setPersons(persons.map(p=>p.id!==updatedPerson.id?p:updatedPerson))
          setNewName('')
          setNewNumber('')})
          .catch(error => {
            setErrorMessage(
              `Note '${person.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
      })
      return  
    }}
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    personService
    .create(newPerson)
    .then(returnedPerson=>{
      setSuccess(`Added ${returnedPerson.name}`)
      setTimeout(() => {
        setSuccess('')
      }, 5000)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')})
  }

  const handleDelete = (id)=>{
    personService
    .deleteperson(id)
    .then(
      res=>{
        setPersons(persons.filter(p=>p.id!==id))
      }
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SNotification message={success}/>
      <ENotification message={errorMessage}/>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} 
      addNote={addNote} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} handleDelete={handleDelete} />
    </div>
  )
  

}

export default App
