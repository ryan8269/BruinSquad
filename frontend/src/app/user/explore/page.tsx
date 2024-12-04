'use client';
import { useEffect, useState } from "react";
import { usesport } from "@/app/SportContent";

interface Location {
    name: string;
    description: string;
    image: string;
    _id: string;
}

interface Activity {
    _id: string;
    name: string;
    type: string;
    image: string;
    locations: Location[];
}

export default function ActivityLocationsLayout() {
    const { activeRoom } = usesport();
    const [locations, setLocations] = useState<Location[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchActivity = async (room: string): Promise<void> => {
        try {
            setIsLoading(true);
            console.log('Fetching activity for sport:', room);
            const response = await fetch(`http://localhost:4000/api/activity?name=${room}`);
            if (!response.ok) throw new Error('Failed to fetch activity');
            const data = await response.json();

            if (data.success && data.data.length > 0) {
                setLocations(data.data[0].locations); // Extract only the `locations` array
            } else {
                setLocations([]);
            }
        } catch (error) {
            console.error('Error fetching activity:', error);
            setLocations(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeRoom) {
            fetchActivity(activeRoom);
        }
    }, [activeRoom]);

    return (
        <div>
            <h1>Activity Locations</h1>
            {isLoading && <p>Loading...</p>}
            {!isLoading && locations && locations.length > 0 ? (
                <ul>
                    {locations.map((location) => (
                        <li key={location._id}>
                            <h3>{location.name}</h3>
                            <p>{location.description}</p>
                            <img src={location.image} alt={location.name} style={{ width: "100px" }} />
                        </li>
                    ))}
                </ul>
            ) : (
                !isLoading && <p>No locations available for this activity.</p>
            )}
        </div>
    );
}
