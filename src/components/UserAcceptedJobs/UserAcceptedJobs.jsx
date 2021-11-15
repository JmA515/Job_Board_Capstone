import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { JobCard } from "../JobCard";

const UserAcceptedJobs = (props) => {
    return (
        <div>
            {/* {console.log("find jobs")} */}
            {/* {console.log(props.userId)} */}
            {/* {console.log(props.jobs)} */}
            <h1>Accepted Jobs</h1>
            <Table borderless={true} variant="dark" style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
                {props.jobs
                    .filter((allJobs) => {
                        //   console.log(allJobs)
                        //   console.log(allJobs.job_accepter)
                        if (props.userId === allJobs.job_accepter) {
                            return allJobs;
                        }
                    })
                    .filter((foundJobs) => {
                        if (foundJobs.status === "accepted") {
                            return foundJobs;
                        }
                    })
                    .map((job) => (
                        <tr key={job.id}>
                            <td>
                                <JobCard job={job} buttonOnClick={() => props.jobComplete(job.id)} buttonTitle="Complete Job"/>
                                <br />
                            </td>
                        </tr>
                    ))}
            </Table>
        </div>
    );
};

export default UserAcceptedJobs;
