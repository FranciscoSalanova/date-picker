import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  getDayOfYear,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { useState } from 'react'

export function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="date-picker-container">
      <button
        onClick={() => setIsOpen((current) => !current)}
        className="date-picker-button"
      >
        {value == null ? 'Select a Date' : format(value, 'MMM do, yyyy')}
      </button>
      {isOpen && <DatePickerModal onChange={onChange} value={value} />}
    </div>
  )
}

function DatePickerModal({ onChange, value }) {
  const [visibleMonth, setVisibleMonth] = useState(value || new Date()) //representa al mes visible en el calendario a partir de la fecha de referencia

  function showPreviousMonth() {
    setVisibleMonth((currentMonth) => {
      return addMonths(currentMonth, -1)
    })
  }

  function showNextMonth() {
    setVisibleMonth((currentMonth) => {
      return addMonths(currentMonth, 1)
    })
  }

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  })

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button
          className="prev-month-button month-button"
          onClick={showPreviousMonth}
        >
          &larr;
        </button>
        <div className="current-month">
          {format(visibleMonth, 'MMMM - yyyy')}
        </div>
        <button
          className="next-month-button month-button"
          onClick={showNextMonth}
        >
          &rarr;
        </button>
      </div>
      <div className="date-picker-grid-header date-picker-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="date-picker-grid-dates date-picker-grid">
        {visibleDates.map((date) => (
          <button
            className={`date ${
              !isSameMonth(date, visibleMonth) && 'date-picker-other-month-date'
            } ${isToday(date) && 'today'} ${
              isSameDay(date, value) && 'selected'
            }`}
            key={getDayOfYear(date)}
            onClick={() => onChange(date)}
          >
            {getDate(date)}
          </button>
        ))}
      </div>
    </div>
  )
}
