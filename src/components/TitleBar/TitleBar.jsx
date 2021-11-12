// import React from 'react';

// const TitleBar = (props) => {
    //     return (
        //         <div className = "row row-space">
        //             <div className = "col-md-12" style = {{padding: 0}}>
        //                 <div className = "titlebar-nav">
        //                     <table>
        //                         <thead>
        //                             <tr>
        //                                 <td className = "table-data">Title</td>
        //                                 <td className = "table-data">Description</td>
        //                                 <td className = "table-data">Post Date</td>
        //                                 <td className = "table-data">Job Creator</td>
        //                             </tr>
        //                         </thead>
        //                         <tbody className = "table-head">
        //                             {props.jobs.map((job) => (
            //                                 <tr key = {job.id}>
            //                                     <td className = "table-data">{job.title}</td>
            //                                     <td className = "table-data">{job.description}</td>
            //                                     <td className = "table-data">{job.post_date}</td>
            //                                     <td className = "table-data">{job.job_creator_id}</td>
            //                                     <button className = "table-data btn-outline-success">Accept Job</button>
            //                                 </tr>
            //                             ))}
            //                         </tbody>
            //                     </table>
            //                 </div>
//             </div>
//         </div>
//      );
// }

// export default TitleBar;

import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import './TitleBar.css';
import Button from "react-bootstrap/Button";


// import { Link } from "react-router-dom";

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
            <Table variant="dark" style={{width:"50%", marginLeft: "auto", marginRight: "auto"}}>
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
                            <td style={{textAlign:"center"}}>
                                <div className="border">
                                    <p>
                                        Title:
                                        <br /> {job.title}
                                    </p>
                                    <p>
                                        Description:
                                        <br /> {job.description}
                                    </p>
                                    <Button
                                        className="btn button-row"
                                        variant="warning"
                                        onClick={() => props.acceptJob(job.id)}
                                        style={{margin:".25em"}}
                                        >
                                        Accept Job
                                    </Button>
                                    
                                    
                                </div>
                                        <br></br>
                                        <br></br>
                            </td>
                            
                                {/* <Link to = {`/bookDetails/${book.id}`}> */}
                                {/* </Link> */}
                            
                        </tr>
                    ))}
            </Table>
        </div>
    );
};

export default TitleBar;
