import {useState} from 'react'

const Button = ({onClick, text})=>(
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({text, value})=>(
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad})=>{
  if (good+neutral+bad===0){
    return (
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={good+neutral+bad} />
      <StatisticLine text='average' value={parseFloat((good-bad)/(good+neutral+bad)).toFixed(1)} />
      <StatisticLine text='positive' value={parseFloat((good)/(good+neutral+bad)*100).toFixed(1)+"%"} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = ()=> setGood(good+1)
  const handleNeutralClick = ()=> setNeutral(neutral+1)
  const handleBadClick = ()=> setBad(bad+1)


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
