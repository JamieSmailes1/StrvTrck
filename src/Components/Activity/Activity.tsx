import './Activity.css'
import { useState } from 'react';
import type {SummaryActivity} from "../../Apis/StravaApi.tsx";

type ActivityProps = {
    activity: SummaryActivity;
}

function Activity(ActivityProps: ActivityProps) {
    const [detailsHidden, setDetailsHidden] = useState(true);
    return (
        <>
            <div className="activity">
                <div className="activity-header" onClick={() => setDetailsHidden(!detailsHidden)}>
                    <h1>{ActivityProps.activity?.name}</h1>
                    <p>{new Date(ActivityProps.activity?.start_date).toLocaleDateString()}</p>
                    <button className="activity-details-expander" onClick={() => setDetailsHidden(!detailsHidden)}>{!detailsHidden ? "▲" : "▼"}</button>
                </div>
                <div className="activity-details" hidden={detailsHidden}>
                    <p>Distance: {(ActivityProps.activity?.distance / 1000).toFixed(2)} km</p>
                    {(() => {
                        const pace = 16.6667 / ActivityProps.activity?.average_speed;
                        const minutes = Math.floor(pace);
                        const seconds = Math.round((pace - minutes) * 60);
                        return <p>Pace: {minutes}:{seconds.toString().padStart(2, '0')} min/km</p>;
                    })()}
                    {ActivityProps.activity?.average_heartrate && (
                        <p>Avg HR: {ActivityProps.activity?.average_heartrate.toFixed(0)} bpm</p>
                    )}
                    <p>Elapsed
                        Time: {Math.floor(ActivityProps.activity?.elapsed_time / 60)}m {ActivityProps.activity?.elapsed_time % 60}s</p>
                    <p>Moving
                        Time: {Math.floor(ActivityProps.activity?.moving_time / 60)}m {ActivityProps.activity?.moving_time % 60}s</p>
                </div>
            </div>
        </>
    )
}

export default Activity;