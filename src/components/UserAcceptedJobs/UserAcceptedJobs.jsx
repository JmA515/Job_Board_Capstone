import React from "react";
import Table from "react-bootstrap/Table";
import { JobCard } from "../JobCard";

const UserAcceptedJobs = (props) => {
    return (
        <div>
            <h1>Accepted Jobs</h1>
            <Table borderless={true} variant="dark" style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
                {props.jobs
                    .filter((allJobs) => {
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
                                <JobCard job={job} buttonOnClick={() => props.jobComplete(job.id)} buttonTitle="Complete Job" />
                                <br />
                            </td>
                        </tr>
                    ))}
            </Table>
        </div>
    );
};

export default UserAcceptedJobs;
