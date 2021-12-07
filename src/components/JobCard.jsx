import Button from "react-bootstrap/Button";
import { StaticGoogleMap, Marker } from "react-static-google-map";

export const JobCard = (props) => {
    return (
        <div className="d-flex">
            <div className="flex-grow-1" style={{ textAlign: "center" }}>
                <p>Title: {props.job.title}</p>
                <p>Description: {props.job.description}</p>
                {props.showStatus && <p>Status: {props.job.status}</p>}
                {props.buttonOnClick != false && (
                    <Button className="btn button-row" variant="primary" onClick={props.buttonOnClick}>
                        {props.buttonTitle}
                    </Button>
                )}{" "}
            </div>
            {!!props.job.lat_lng && props.showMap && (
                <div>
                    <StaticGoogleMap size="200x200" className="img-fluid" apiKey="AIzaSyBGPE1IDjIUxjX62u-JW5O_YQ6adLkCUgg">
                        <Marker location={props.job.lat_lng} color="red" />
                    </StaticGoogleMap>
                </div>
            )}
        </div>
    );
};

JobCard.defaultProps = {
    showMap: true,
    showStatus: false,
};
