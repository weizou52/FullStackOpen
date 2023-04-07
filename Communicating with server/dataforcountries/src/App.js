import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({country})=>{
  const [weather, setWeather]=useState([])
  const lat = country.capitalInfo.latlng[0]
  const lng = country.capitalInfo.latlng[1]
  const api_key = process.env.REACT_APP_API_KEY
  const weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
  useEffect(()=>{axios
    .get(weatherurl)
    .then(res=>setWeather([res.data]))
},[])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>{
        Object.values(country.languages).map(l => <li key={l}>{l}</li>)
      }
      </ul>
      <img src={country.flags.png} alt='no img'/>
      <h1>Weather in {country.capital}</h1>
      {console.log(weather)}
      {weather.length && 
      <div>
        <div>temperature {weather[0].main.temp} Celcius</div>
        <img src={`http://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`} alt='no img'/>
        <div>wind {weather[0].wind.speed} m/s</div>
      </div>
      }
    </div>
    
  )
}

const CountryShow = ({country}) =>{
  const [show, setShow]=useState(false)
  return(
    <div>
      <div key={country.name.common} >
        {country.name.common}
        <button onClick={()=>setShow(!show)}>show</button>
      </div>
      {show?<Country country={country}/>:<></>}
    </div>)
}

const Countries = ({countriesToShow})=>{

  const result = countriesToShow.length>10 
  ? <div>Too many countries, specify another filter</div>
  : countriesToShow.length>1
  ? countriesToShow.map((country)=><CountryShow key={country.name.common} country={country}/>)
  : countriesToShow.length>0 
  ? <Country country={countriesToShow[0]}/>
  : <></>
  return result
}


const App = () =>{
  const [countries,  setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all')
    .then(res=>setCountries(res.data))
  },[])
  // console.log(countries);
  const countriesToShow = countries.filter(country=>country.name.common.toLowerCase().includes(filter.toLowerCase()))
  // console.log(countriesToShow);
  return (
    <div>
      <div>
        find countries 
        <input value={filter} onChange={(event)=>setFilter(event.target.value)} />
      </div>
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App;
