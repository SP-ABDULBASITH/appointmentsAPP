// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickStar} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarButton = () => {
    onClickStar(id)
  }

  return (
    <li className="appointment-item">
      <div>
        <div className="title-container">
          <p className="title">{title}</p>
          <button
            className="star-btn"
            type="button"
            onClick={onClickStarButton}
            data-testid="star"
          >
            <img className="star-image" alt="star" src={starImageUrl} />
          </button>
        </div>
        <p className="date">Date:{date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
