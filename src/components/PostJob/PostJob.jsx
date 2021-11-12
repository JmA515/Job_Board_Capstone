import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './PostJob.css'


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
        <div className="my-form" style={{textAlign:"center"}}>
          
            <Form action="" onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Job Title</Form.Label>
                    {/* <input className = "Register-Input" name="title" value={newJob.title} onChange={handleChange} type="text"/> */}
                    <Form.Control type="text" name="title" value={newJob.title} onChange={handleChange} />
                </Form.Group>
                {/* <br/> */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label htmlFor="">Job Description</Form.Label>
                    {/* <input className = "Register-Input" name="description" value={newJob.description} onChange={handleChange} type="text"/> */}
                    <Form.Control type="text" as="textarea" row={3} name="description" value={newJob.description} onChange={handleChange} />
                </Form.Group>
                <br/>
                <Button variant="warning" type="submit">Post Job</Button>
            </Form>
        </div>
      </div>
    )
  }
  
  export default PostJob;