import React, { useEffect } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../Redux/Store'
import './NavSearch.css'
// const delay = 5;
export default function NavSearch() {
  const store = useContext(StoreContext)
  // const [show, setShow] = useState(false);
  useEffect(() => {
    if (store.keySearch.lskey) {
      const apiKey = "439d4b804bc8187953eb36d2a8c26a02";
      fetch(`https://openweathermap.org/data/2.5/find?q=${store.keySearch.lskey}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(dt => {
          store.abc({ type: "GetWeatherSearch", payload: dt })
          // GetlsSearch(dt)
        })
    }

  }, [store.keySearch.lskey, store.abc])
  const CheckEnter = (event) => {
    if (event.key === "Enter") {
      store.Keyfun({ type: "Keynull", payload: event.target.value })
    }
  }

  return (
    <div className='SearchResult'>
      <div>
        <input placeholder='Search...' onKeyUp={(event) => CheckEnter(event)} />
        <p className='enterTitle'>Enter to search</p>
      </div>
      
      {store.keySearch.lskey ?
        store.weatherSearch.lsWeatherSearch?.list.map((e, i) => {
          return (
            <div key={i} className='cardCountry' onClick={() => store.latlonfun({ type: "GetLatLon", payload: [e.coord.lat, e.coord.lon, e.name, e.dt] })} >
              <img src={`https://openweathermap.org/images/flags/${e.sys.country.toLowerCase()}.png`} alt={e.nam} />
              <span>{e.name}</span>
              <p> <span className='temp'>{(e.main.temp - 273.15).toFixed(2)}<sup>o</sup>C</span> temperature from {(e.main.temp_min - 273.15).toFixed(2)} to {(e.main.temp_max - 273.15).toFixed(2)} <sup>o</sup>C </p>
              <p>wind {e.wind.speed} m/s clouds {e.clouds.all}%</p>
              <p>Geo coords [{e.coord.lat},{e.coord.lon}]</p>
            </div>
          )
        })
        : store.weatherNull
      }
    </div>
  )
}
