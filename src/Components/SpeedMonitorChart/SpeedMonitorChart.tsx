import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {format} from "date-fns";
import type {SummaryActivity} from "../../Apis/StravaApi.tsx";

type SpeedMonitorChartProps = {
    chartName: string;
    activities: SummaryActivity[];
}

function paceInMinKm(speed: number) {
    return 16.6667 / speed;
}

function formatPace(pace: number) {
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")} /km`;
}

export default function SpeedMonitorChart({activities, chartName}: SpeedMonitorChartProps) {
    const validPaces = activities
        .map(a => paceInMinKm(a.average_speed))
        .filter((p): p is number => Number.isFinite(p));
    
    const avgPace = validPaces.reduce((sum, p) => sum + p, 0) / validPaces.length;

    const THRESHOLD = 1.3;

    const data = activities
        .map(a => ({
            date: new Date(a.start_date).getTime(),
            pace: paceInMinKm(a.average_speed),
        }))
        .filter(d => d.pace != null)
        .filter(d => Math.abs(d.pace! - avgPace) <= THRESHOLD)
        .sort((a, b) => a.date - b.date);

    return (
        <div style={{width: "100%", height: 400, paddingBottom: 50}}>
            <h1>{chartName}</h1>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                        dataKey="date"
                        type="number"
                        scale="time"
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={(t) => format(new Date(t), 'yyyy-MM-dd')}
                    />
                    <YAxis
                        reversed
                        domain={['auto', 'auto']}
                        label={{value: "Pace (min/km)", angle: -90, position: "insideLeft"}}
                        tickFormatter={formatPace}
                    />
                    <Tooltip
                        labelFormatter={(label) => format(new Date(label), "yyyy-MM-dd")}
                        formatter={(value: number) => [formatPace(value), "Pace"]}
                    />
                    <Line type="linear" dataKey="pace" stroke="#FC4C02"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
