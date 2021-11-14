import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


const UserAcceptedJobs = (props) => {

  return (
    <div>
      {/* {console.log("find jobs")} */}
      {/* {console.log(props.userId)} */}
      {/* {console.log(props.jobs)} */}
      <h1>Accepted Jobs</h1>
      <Table variant="dark" style={{width:"50%", marginLeft: "auto", marginRight: "auto"}}>
        {props.jobs
          .filter((allJobs) => {
            //   console.log(allJobs)
            //   console.log(allJobs.job_accepter)
            if (props.userId === allJobs.job_accepter) {
              return allJobs;
            }
          } )
          .filter((foundJobs) => {
            if (foundJobs.status === "accepted") {
                return foundJobs;
            } 
          })
          .map((job) => (
            <tr key={job.id}>
              <td>
              <div className="border" style={{textAlign:"center"}}>
                    <p>Title: {job.title}</p>
                    <p>Description: {job.description}</p>
                    <Button className="btn button-row" variant="warning" onClick={() => props.jobComplete(job.id)}>Job Complete</Button>
                </div>

              </td>
            </tr>
          ))}
      </Table>
    </div>
  );
};

export default UserAcceptedJobs;
