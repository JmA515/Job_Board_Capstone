import React from "react";

const UserAcceptedJobs = (props) => {

  return (
    <div>
      {/* {console.log("find jobs")} */}
      {/* {console.log(props.userId)} */}
      {/* {console.log(props.jobs)} */}
      <h1>Accepted Jobs</h1>
      <table>
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
              <div className="border">
                    <p>Title: {job.title}</p>
                    <p>Description: {job.description}</p>
                    <button className="btn btn-outline-success button-row" onClick={() => props.jobComplete(job.id)}>Job Complete</button>
                </div>

              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default UserAcceptedJobs;
