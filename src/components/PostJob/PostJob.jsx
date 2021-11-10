import React, {useState} from 'react';

const PostJob = (props) => {
    const [newJob, setNewJob] = useState({
        title: "",
        description: "",
        status: "available",
        post_date: props.currentDate
    })
  
    const handleChange = (event) => {
      setNewJob(previousState => (
        {...previousState,
        [event.target.name] : event.target.value}
      ));
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      props.postJob(newJob);
  
    }
  
    return(
      <div>
        <div className = "Register-Container">
          
        <form action="" onSubmit={handleSubmit} >
          <label htmlFor="">Job Title</label>
          <input className = "Register-Input" name="title" value={newJob.title} onChange={handleChange} type="text"/>
          <br/>
          <label htmlFor="">Job Description</label>
          <input className = "Register-Input" name="description" value={newJob.description} onChange={handleChange} type="text"/>
          <br/>
          <button type="submit">Post Job</button>
        </form>
        </div>
      </div>
    )
  }
  
  export default PostJob;