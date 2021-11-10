import React from "react";

const UserAcceptedJobs = (props) => {

  return (
    <div className="searching">
      <table>
        {props.jobs
          .filter((foundJobs) => {
            if (props.user.id === foundJobs.job_acceptor) {
              return foundJobs;
            }
          } )
          .map((job) => (
            <tr key={job.id}>
              <td>
              <div className="border">
                      <p>Title: {job.title}</p>
                      <p>Description: {job.description}</p>
                  </div>

              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default UserAcceptedJobs;
