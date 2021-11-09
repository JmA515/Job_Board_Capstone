import React from 'react';
import './TitleBar.css';

const TitleBar = (props) => {
    return ( 
        <div className = "row row-space">
            <div className = "col-md-12" style = {{padding: 0}}>
                <div className = "titlebar-nav">
                    <table>
                        <thead>
                            <tr>
                                <td className = "table-data">Title</td>
                                <td className = "table-data">Description</td>
                                <td className = "table-data">Post Date</td>
                                <td className = "table-data">Job Creator</td>
                            </tr>
                        </thead>
                        <tbody className = "table-head">
                            {props.jobs.map((job) => (
                                <tr key = {job.id}>
                                    <td className = "table-data">{job.title}</td>
                                    <td className = "table-data">{job.description}</td>
                                    <td className = "table-data">{job.post_date}</td>
                                    <td className = "table-data">{job.job_creator_id}</td>
                                </tr>    
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
     );
}
 
export default TitleBar;