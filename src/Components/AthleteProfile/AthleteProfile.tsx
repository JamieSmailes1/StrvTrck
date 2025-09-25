import './AthleteProfile.css'
import {type Athlete, getAthlete} from "./../../Apis/StravaApi.tsx";
import {useEffect, useState} from "react";

function AthleteProfile() {
    const [athlete, setAthlete] = useState<Athlete | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const athleteData = await getAthlete();
            setAthlete(athleteData);
        })();
    }, []);

    return (
        <>
            {athlete && (
                <div className="athlete-profile-container">
                    <div className="athlete-profile-section">
                        <div className="athlete-profile-section-header">
                            <img className="athlete-image" src={athlete.profile_medium} alt="Athlete profile"/>
                            <h1>{athlete.userName}</h1>
                        </div>
                        <p>{athlete.city} {athlete.country}</p>
                        <p>Signed up since: {athlete.created_at.toDateString()}</p>
                    </div>
                    <div className="athlete-profile-section">
                        My Gear
                        {athlete.shoes
                            .slice()
                            .sort((a, b) => b.distance - a.distance)
                            .map((shoe) => (
                                <p>{shoe.name}: {shoe.distance / 1000} Km</p>
                            ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default AthleteProfile;