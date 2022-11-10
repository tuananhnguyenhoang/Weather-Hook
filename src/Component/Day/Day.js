import { type } from '@testing-library/user-event/dist/type'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../Redux/Store'
import './Day.css'
export default function Day() {
  const store = useContext(StoreContext)
  useEffect(() => {
    const apiKey = "439d4b804bc8187953eb36d2a8c26a02";
    if (store.latlon.lsLatLon !== undefined) {
      fetch(`https://openweathermap.org/data/2.5/onecall?lat=${store.latlon.lsLatLon[0]}&lon=${store.latlon.lsLatLon[1]}&appid=${apiKey}`)
        .then(res => res.json())
        .then(dt => {
          store.DayFunc({ type: "GetWeatherDay", payload: dt })
        })
    }

  }, [store.latlon.lsLatLon,])
  var TimeDay = (dt) => {
    var date = new Date(dt)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM"
    hours = hours % 12;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return (`${hours}:${minutes} ${ampm}`)
  }
  function getFormattedDate(dt) {
    var today = new Date(dt)
    var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var monthNames = new Array("January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    )
    var day = week[today.getDay()];
    var dd = today.getDate();
    var mm = monthNames[today.getMonth() + 1]; //January is 0!
    var yyyy = today.getFullYear();
    return day + ', ' + dd + ' ' + mm + ' , ' + yyyy;

  }
  function getFormattedDay(dt) {
    var today = new Date(dt)
    var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var day = week[today.getDay()];
    return day;
  }
  return (
    <div className='Day' >
      {console.log(store.latlon.lsLatLon)}
      <div>
        {
          store.latlon.lsLatLon &&
          <div className='timeDayMain' >
            <h1 className='mainTime' >{TimeDay(store.latlon.lsLatLon[3] * 1000)}</h1>
            <p className='mainDay'>{getFormattedDate(store.latlon.lsLatLon[3] * 1000)}</p>
            <h1 className='title'  >Welcome to {store.latlon.lsLatLon[2]} city</h1>
          </div>
        }


      </div>
      <div className='DayDetail'>
        {
          console.log(store.lsDay.lsWeatherDay)
        }
        {
          store.lsDay.lsWeatherDay?.daily.map((e, i) => {
            return (
              <div key={i} className='dayItem' onClick={() => store.DayDetailFunc({ type: "GetDay", payload: e })}  >
                <img src={`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} alt="" />
                <p>{getFormattedDay(e.dt * 1000)}</p>
                <p>{e.temp.day}<sup>o</sup></p>
                {console.log(e.weather[0].icon)}
              </div>
            )
          })

        }
      </div>
    </div>
  )
}
