import './MetricDashboard.css'
import type {SummaryActivity} from "../../Apis/StravaApi.tsx";
import SpeedMonitorChart from "../SpeedMonitorChart/SpeedMonitorChart.tsx";

type MetricDashboardProps = {
    activities: SummaryActivity[];
}

function MetricDashboard(MetricDashboardProps: MetricDashboardProps) {
    const fiveKmData = MetricDashboardProps.activities.filter((activity) => activity.distance > 4000 && activity.distance < 6000 && activity.average_speed !== null && Number.isFinite(activity.average_speed));
    const tenKmData = MetricDashboardProps.activities.filter((activity) => activity.distance > 9000 && activity.distance < 11000 && activity.average_speed !== null && Number.isFinite(activity.average_speed));
    const hmData = MetricDashboardProps.activities.filter((activity) => activity.distance > 20100 && activity.distance < 22100 && activity.average_speed !== null && Number.isFinite(activity.average_speed));
    
    return (
        <>
            <div className="metric-dashboard-container">
                <p>My Metrics</p>
                <SpeedMonitorChart chartName="5Km Over time" activities={fiveKmData}/>
                <SpeedMonitorChart chartName="10Km Over time" activities={tenKmData}/>
                <SpeedMonitorChart chartName="Half mararathon Over time" activities={hmData}/>
            </div>
        </>
    )
}

export default MetricDashboard;