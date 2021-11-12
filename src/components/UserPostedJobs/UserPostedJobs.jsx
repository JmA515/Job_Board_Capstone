import React from "react";

const filterByStatus = (status) => (foundJobs) => {
    if (foundJobs.status === status) {
        return foundJobs;
    }
};

const UserPostedJobs = (props) => {
    return (
        <div>
            {/* {console.log("find jobs")} */}
            {/* {console.log(props.userId)} */}
            {/* {console.log(props.jobs)} */}
            <h1>Posted Jobs</h1>
            <table>
                {props.jobs
                    .filter(filterByStatus("accepted"))
                    .filter((foundJobs) => {
                        //   console.log(foundJobs)
                        if (props.userId === foundJobs.job_creator_id) {
                            return foundJobs;
                        }
                    })
                    .map((job) => (
                        <tr key={job.id}>
                            <td>
                                <div className="border">
                                    <p>Title: {job.title}</p>
                                    <p>Description: {job.description}</p>
                                    <p>Job Status: {job.status}</p>
                                </div>
                            </td>
                        </tr>
                    ))}
            </table>
            <h1>My Completed Jobs</h1>
            <table>
                {props.jobs
                    .filter((foundJobs) => {
                        //   console.log(foundJobs)
                        if (props.userId === foundJobs.job_creator_id) {
                            return foundJobs;
                        }
                    })
                    .filter(filterByStatus("completed"))
                    .map((job) => (
                        <tr key={job.id}>
                            <td>
                                <div className="border">
                                    <p>Title: {job.title}</p>
                                    <p>Description: {job.description}</p>
                                    <button className="btn btn-outline-success button-row" onClick={() => props.rateJob(job.job_accepter)}>
                                        Rate Job
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
            </table>
        </div>
    );
};

export default UserPostedJobs;
