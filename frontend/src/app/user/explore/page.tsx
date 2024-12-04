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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-center mb-8">
                Explore Locations
            </h1>


            {isLoading && (
                <div className="flex justify-center items-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {!isLoading && locations && locations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.map((location) => (
                        <div
                            key={location._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
                        >
                            <img
                                src={location.image}
                                alt={location.name}
                                className="w-full h-175 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{location.name}</h3>
                                <p className="text-sm text-gray-600 mt-2">{location.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !isLoading && (
                    <p className="text-center text-gray-500 mt-10">
                        No locations available for this activity.
                    </p>
                )
            )}
        </div>
    );
}