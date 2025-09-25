import './App.css'
import {useState, useEffect} from 'react';
import AthleteProfile from './Components/AthleteProfile/AthleteProfile.tsx';
import MetricDashboard from "./Components/MetricDashboard/MetricDashboard.tsx";
import ActivityList from "./Components/ActivityList/ActivityList.tsx";
import {getActivities} from "./Apis/StravaApi.tsx";
import type {SummaryActivity} from "./Apis/StravaApi.tsx";

function App() {
    const after = Math.floor(new Date("2000-01-01").getTime() / 1000);
    const before = Math.floor(new Date("2030-01-01").getTime() / 1000);
    const [activities, setActivities] = useState<SummaryActivity[]>([]);
    
    useEffect(() => {
        (async () => {
            const activityData = await getActivities({before: before, after: after, per_page: 200});
            setActivities(activityData);
        })();
    }, []);

    return (
        <>
            <h1 className="main-title">Strava "pReMiUM"</h1>
            <AthleteProfile/>
            <div className="main-content">
                <div className="page-section">
                    <ActivityList activities={activities}/>
                </div>
                <div className="page-section">
                    <MetricDashboard activities={activities}/>
                </div>
            </div>
        </>
    )
}

export default App
