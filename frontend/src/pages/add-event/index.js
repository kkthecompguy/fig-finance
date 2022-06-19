import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { addEvent } from '../../redux/actions/events';
import './styles.css'

function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    eventDate: "",
    isVirtual: true,
    description: "",
    address: ""
  });
  const {loading, error, msg} = useSelector(state => state.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    if (e.target.name === "isVirtual") {
      setFormData(current => {
        return {...current, isVirtual: e.target.checked ? true: false}
      })
    } else {
      setFormData(current => {
        return {...current, [e.target.name]: e.target.value}
      });
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const {success} = await dispatch(addEvent(formData));
    if (success) {
      setFormData(current => {
        return {...current, title: "", description: "", category: "", eventDate: "", isVirtual: true, address: ""}
      })
      setTimeout(() => {
        navigate("/");
      }, 3000)
    }
    
  }

  const { title, category, eventDate, isVirtual, description, address } = formData;
  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='display-4 text-center mt-2 mb-2'>
          <span>Add New Event</span>
        </div>
        <div className='row'>
          <div className='col-md-6 mx-auto'>
            <form onSubmit={e => handleSubmit(e)}>
              <div className='form-group mb-2'>
                <label htmlFor='title'>Title</label>
                <input name='title' type="text" value={title} className='form-control' onChange={e => handleChange(e)} required />
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='category'>Category</label>
                <select name='category' value={category} className='form-select' onChange={e => handleChange(e)} required>
                  <option value="">select</option>
                  <option value="AI">AI</option>
                  <option value="mobile developments">mobile developments</option>
                  <option value="robotics">robotics</option>
                </select>
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='eventDate'>Event Date</label>
                <input type="date" name='eventDate' value={eventDate} className='form-control' onChange={e => handleChange(e)} required />
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='isVirtual'>Isvirtual</label>
                <input type="checkbox" name='isVirtual' checked={isVirtual? true: false} className='form-check' onChange={e => handleChange(e)} />
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='address'>Address</label>
                <input type="text" name='address' value={address} className='form-control' onChange={e => handleChange(e)} required />
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='description'>Description</label>
                <textarea name='description' onChange={e => handleChange(e)} value={description} className='form-control' required></textarea>
              </div>
              <div className='mb-2'>
                <button type='submit' className='btn btn-lg btn-primary'>{loading ? "adding...": "Submit"}</button>
              </div>
              {msg && <div className='text-center text-success'>{msg}</div>}
              {error && <div className='text-center text-danger'>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddEvent;