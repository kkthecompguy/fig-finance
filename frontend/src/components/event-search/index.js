


function EventSearch({ handleTitleChange,handleCategoryChange , handleOnlineChange }) {
  return (
    <div>
      <div className="input-search-area">
        <input type="text" placeholder="search e.g GDG Nairobi Event..." onChange={e => handleTitleChange(e)} className="form-cus-control w-50"  />
      </div>

      
      <div className="filter-group">
      <div className="apply-filter">Apply filter</div>
        <div className="form-group">
          <label className="cust-label">Related Topic</label>
          <select className="form-select-control" onChange={e => handleCategoryChange(e)}>
            <option value="AI">AI</option>
            <option value="mobile developments">mobile developments</option>
            <option value="robotics">robotics</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="cust-label">Online Event</label>
          <input type="checkbox" onChange={e => handleOnlineChange(e)}  />
        </div>
      </div>

    </div>
  )
}

export default EventSearch;