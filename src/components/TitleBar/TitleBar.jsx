import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "./TitleBar.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { JobCard } from "../JobCard";

const TitleBar = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <div className="table-head">
                <input
                    type="text"
                    placeholder="Search by Job Title"
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }}
                />
            </div>
            <Table borderless={true} variant="dark" style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
                {props.jobs
                    .filter((allJobs) => {
                        if (allJobs.status === "available") {
                            return allJobs;
                        }
                    })
                    .filter((foundJobs) => {
                        if (searchTerm === "") {
                            return foundJobs;
                        } else if (foundJobs.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                            return foundJobs;
                        }
                    })
                    .map((job) => (
                        <tr key={job.id}>
                            <td style={{ textAlign: "center" }}>
                                <JobCard job={job} buttonOnClick={() => props.acceptJob(job.id)} buttonTitle="Accept Job" />

                                <br></br>
                                <br></br>
                            </td>
                            <td></td>
                        </tr>
                    ))}
            </Table>
        </div>
    );
};

export default TitleBar;
