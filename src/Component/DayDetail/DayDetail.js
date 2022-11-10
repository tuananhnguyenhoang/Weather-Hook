import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../Redux/Store'
import './DayDetail.css'
export default function DayDetail() {
  const store = useContext(StoreContext)
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
    var day = week[today.getDay()];
    return day;
  }
  return (
      <div className='dayMain'>
        <h1 className='dayTitle'>{getFormattedDate(store.lsDayDetail.dayItem?.dt * 1000)}</h1>
        {store.lsDayDetail.dayItem?.sunrise &&
          <div className='detailItem'>
            <div className='detailItemsmall'>
              <h3>Sun and Moon</h3>
              <p>Sunrise :{TimeDay(store.lsDayDetail.dayItem?.sunrise)}</p>
              <p>Sunset :{TimeDay(store.lsDayDetail.dayItem?.sunset)}</p>
              <p>Moonrise :{TimeDay(store.lsDayDetail.dayItem?.moonrise)}</p>
              <p>Moonset :{TimeDay(store.lsDayDetail.dayItem?.moonset)}</p>
            </div>
            <div className='detailItemsmall'>
              <h3>Temperature</h3>
              <p>Day: {store.lsDayDetail.dayItem?.temp.day} <sup>o</sup></p>
              <p>Min:  {store.lsDayDetail.dayItem?.temp.min} <sup>o</sup></p>
              <p>Max:  {store.lsDayDetail.dayItem?.temp.max} <sup>o</sup></p>
              <p>Night:  {store.lsDayDetail.dayItem?.temp.night} <sup>o</sup></p>
            </div>
            <div className='detailItemsmall'>
              <h3>Feels like</h3>
              <p>Day:{store.lsDayDetail.dayItem?.feels_like.day}<sup>o</sup></p>
              <p>Night:{store.lsDayDetail.dayItem?.feels_like.night}<sup>o</sup></p>
              <p>Evening:{store.lsDayDetail.dayItem?.feels_like.eve}<sup>o</sup></p>
              <p>Morning:{store.lsDayDetail.dayItem?.feels_like.morn}<sup>o</sup></p>
            </div>
            <div className='detailItemsmall'>
              <h3>Other</h3>
              <p>Wind degree:{store.lsDayDetail.dayItem?.wind_deg}<sup>o</sup></p>
              <p>Wind speed:{store.lsDayDetail.dayItem?.wind_speed}m/s</p>
              <p>Clound: {store.lsDayDetail.dayItem?.clouds}%</p>
              <p>UV:{store.lsDayDetail.dayItem?.uvi}</p>
            </div>
          </div>
        }
      </div>
     
  )
}
