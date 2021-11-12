import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import './UserPostedJobs.css'


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
            <Table variant="dark" style={{width:"50%", marginLeft: "auto", marginRight: "auto"}}>
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
                                <div className="border" style={{textAlign:"center"}}>
                                    <p>Title: <br />{job.title}</p>
                                    <p>Description: <br />{job.description}</p>
                                    <p>Job Status: <br />{job.status}</p>
                                </div>
                            </td>
                        </tr>
                    ))}
            </Table>
            <h1>Completed Posted Jobs</h1>
            <Table variant="dark" style={{width:"50%", marginLeft: "auto", marginRight: "auto"}}>
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
                                <div className="border" style={{textAlign:"center"}}>
                                    <p>Title: <br />{job.title}</p>
                                    <p>Description: <br />{job.description}</p>
                                    <Button className="btn button-row" variant="warning" onClick={() => props.rateJob(job.job_accepter)}>
                                        Rate Job
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
            </Table>
        </div>
    );
};

export default UserPostedJobs;
