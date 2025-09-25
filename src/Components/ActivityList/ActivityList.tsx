import './ActivityList.css'
import type {SummaryActivity} from "../../Apis/StravaApi.tsx";
import Activity from "../Activity/Activity.tsx";

type ActivityListProps = {
    activities: SummaryActivity[];
}

function ActivityList(ActivityListProps: ActivityListProps) {

    return (
        <>
            <p>My Activities</p>
            <div className="activity-list-container">
                {ActivityListProps.activities.map((activity) => {
                    return <Activity activity={activity}/>
                })}
            </div>
        </>
    )
}

export default ActivityList;