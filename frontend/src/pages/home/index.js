import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventDetail from "../../components/event-detail";
import Navbar from "../../components/navbar";
import EventSearch from "../../components/event-search";
import { filterEvents, listEvents, queryEvents } from '../../redux/actions/events';
import "./styles.css";

function Home() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const { events, filtered, loading } = useSelector(state => state.events);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    (async() => {
      dispatch(listEvents());
    })();
  },[dispatch]);
  
  const handleTitleChange = async e => {
    setTitle(e.target.value);
    if (title.trim().length > 0) {
      dispatch(queryEvents({title: title}))
    }
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (category.trim().length > 0) {
      const filteredEvents = events.filter(x => x.category === e.target.value);
      dispatch(filterEvents(filteredEvents, "category"))
    }
  }

  const handleOnlineChange = e => {
    if (e.target.checked) {
      const filteredEvents = events.filter(x => x.isVirtual === true);
      dispatch(filterEvents(filteredEvents, "isVirtual"));
    } else {
      const filteredEvents = events.filter(x => x.isVirtual === false);
      dispatch(filterEvents(filteredEvents, "isVirtual"));
    }
  }
  
  return (
    <>
    <Navbar />
    <div className="container">
      <div className="find-over">
        <span>Find over 100 tech conferences that take place online or face-to-face that interest you!</span>
      </div>

      <div className="apply-search">
        <EventSearch handleTitleChange={handleTitleChange} handleCategoryChange={handleCategoryChange} handleOnlineChange={handleOnlineChange}  />
      </div>

      { loading ? (<div>loading...</div>) : (
        <div className="row event-list">
        {filtered.map((x, i) => (
            <EventDetail key={i} event={x} />
        ))}
      </div>
      ) }
    </div>
    </>
  )
}

export default Home;