// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointment extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  isFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  onClickStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getStarredAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        appointment => appointment.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredClassName = isFilterActive
      ? 'starred-btn active'
      : 'starred-btn'
    const filteredAppointmentsList = this.getStarredAppointmentList()
    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="appointment-inputs">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                className="title-input"
                type="text"
                placeholder="Title"
                value={titleInput}
                onChange={this.onChangeTitleInput}
                id="title"
              />
              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                type="date"
                className="date-input"
                value={dateInput}
                id="date"
                onChange={this.onChangeDateInput}
              />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              className="image"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr className="line" />
          <div className="appointment-starred-container">
            <h1 className="appointments">Appointments</h1>
            <button
              className={filteredClassName}
              type="button"
              onClick={this.isFilter}
            >
              Starred
            </button>
          </div>
          <ul>
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment}
                appointmentDetails={eachAppointment}
                onClickStar={this.onClickStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointment
