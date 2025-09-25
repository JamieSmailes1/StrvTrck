//GET Activities
type ListAthleteActivitiesQuery = {
    before: number;
    after: number;
    per_page: number;
}

type SummaryActivity = {
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    average_speed: number;
    type: string;
    average_heartrate: number;
    start_date: Date;
}

const getActivities = async (query: ListAthleteActivitiesQuery): Promise<SummaryActivity[]> => {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const requestCount = 1;
    async function GetLimitedActivities(requestCount: number, data: SummaryActivity[]) {
        const response = await fetch(
            `https://www.strava.com/api/v3/athlete/activities?before=${query.before}&after=${query.after}&per_page=${query.per_page}&page=${requestCount}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        
        if(!response.ok){
            console.log(response);
        }

        const json = await response.json(); 
        data.push(...json);
        
        const responseLimit = 200;
        if(json.length === responseLimit && requestCount < 20){
            await GetLimitedActivities(requestCount + 1, data);
        }
        
        return data;
    }

    const data = await GetLimitedActivities(requestCount, []);
    const filteredData = data.filter((item) => item.type === "Run");
    
    return filteredData.map((item): SummaryActivity => ({
        name: item.name,
        distance: item.distance,
        moving_time: item.moving_time,
        elapsed_time: item.elapsed_time,
        average_speed: item.average_speed,
        type: item.type,
        average_heartrate: item.average_heartrate,
        start_date: new Date(item.start_date)
    }));
}

//GET Athlete
type Athlete = {
    userName: string;
    city: string;
    country: string;
    profile_medium: string;
    follower_count: number;
    created_at: Date;
    shoes : Shoe[];
}

type Shoe = {
    name: string;
    distance: number;
}

const getAthlete = async () : Promise<Athlete> => {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const response = await fetch(
        `https://www.strava.com/api/v3/athlete`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    
    if(!response.ok){
        console.log(response);
    }
    
    const json = await response.json();
    return {
        userName: json.firstname + " " + json.lastname,
        city: json.city ?? "",
        country: json.country ?? "",
        profile_medium: json.profile_medium ?? "",
        follower_count: json.follower_count ?? 0,
        created_at: json.created_at ? new Date(json.created_at) : new Date(),
        shoes: Array.isArray(json.shoes)
            ? json.shoes.map(
                (s: any): Shoe => ({
                    name: s.name ?? "",
                    distance: s.distance ?? 0,
                })
            )
            : [],
    };
}

export {getActivities, getAthlete};
export type {SummaryActivity};
export type {Athlete};


