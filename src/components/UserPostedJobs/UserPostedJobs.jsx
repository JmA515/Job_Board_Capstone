import React from "react";

const filterByStatus = (status) => (allJobs) => {
    if (allJobs.status != status) {
        return allJobs;
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
                    .filter(filterByStatus("completed"))
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
            <h1>Completed Posted Jobs</h1>
            <table>
                {props.jobs
                    .filter((foundJobs) => {
                        //   console.log(foundJobs)
                        if (props.userId === foundJobs.job_creator_id) {
                            return foundJobs;
                        }
                    })
                    .filter(filterByStatus("available"))
                    .filter(filterByStatus("accepted"))
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
