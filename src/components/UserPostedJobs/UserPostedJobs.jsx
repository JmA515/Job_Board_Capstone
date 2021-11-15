import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./UserPostedJobs.css";
import { JobCard } from "../JobCard";

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
            <Table borderless={true} variant="dark" style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
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
                                <JobCard job={job} buttonOnClick={false} showMap={false} showStatus />

                                <br />
                            </td>
                        </tr>
                    ))}
            </Table>
            <h1>Completed Posted Jobs</h1>
            <Table variant="dark" style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
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
                                <JobCard
                                    job={job}
                                    buttonOnClick={false}
                                    showMap={false}
                                    //  buttonOnClick={() => props.rateJob(job.job_accepter)}
                                    //  buttonTitle="Rate Job"
                                />
                            </td>
                        </tr>
                    ))}
            </Table>
        </div>
    );
};

export default UserPostedJobs;
