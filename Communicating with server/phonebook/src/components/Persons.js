const Person = ({person, handleDelete})=> {
  return (
  <div>
    {person.name} {person.number}  <button onClick={()=>{
      window.confirm(`Delete ${person.name}?`) && handleDelete(person.id)}}> delete</button>
  </div>)
}

const Persons = ({peopleToShow, handleDelete}) => {
    return (
        peopleToShow.map(person =>
            <Person key={person.name} person={person} handleDelete={handleDelete} />)
    )
}

export default Persons;