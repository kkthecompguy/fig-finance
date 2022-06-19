
import moment from 'moment';


function EventDetail({ event={} }) {
  return (
    <div className="col-md-4 mb-5">
      <div className="card">
        <img src="https://secure.meetupstatic.com/photos/event/7/3/4/a/600_491189514.jpeg" className="card-img-top" alt="event" />
        <div className="card-body">
          <p className="event-title">{event.title}</p>
          <p><span>Category: </span><span>{event.category}</span></p>
          <p><span>Type</span> <span>{event.isVirtual ? "Online": "Physical"}</span> </p>
          <p><span>Date: </span> <span>{moment(event.date).format("LLLL")}</span></p>
          <p><span>Address:</span> <span>{event.address}</span></p>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  )
}

export default EventDetail;