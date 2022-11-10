import React from 'react'
import DayDetail from '../DayDetail/DayDetail'
import Day from '../Day/Day'
import './bodyDay.css'
export default function bodyDay() {
  return (
    <div className='containerDay'>
      <Day/>
      <hr></hr>
      <DayDetail/>
    </div>
  )
}
