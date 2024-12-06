'use client';
import { useEffect, useState } from "react";
import { usesport } from "@/app/SportContent";
import * as Dialog from "@radix-ui/react-dialog";

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
        <div className="p-8 bg-gray-50 min-h-screen rounded-xl shadow-lg">
            <h1 className="pb-4 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-800 text-center mb-8">
                Explore Locations
            </h1>

            {isLoading && (
                <div className="flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {!isLoading && locations && locations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {locations.map((location) => (
                        <>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button>
                                    <div
                                        key={location._id}
                                        className="bg-white backdrop-blur-lg bg-opacity-80 rounded-xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden animate-slideLeftAndFade"
                                    >
                                        <img
                                            src={location.image}
                                            alt={location.name}
                                            className="w-full h-56 object-cover"
                                        />
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900">{location.name}</h3>
                                            <p className="text-sm text-gray-700 mt-2"> {location.description.slice(0,150) +(location.description.length > 150 ? "..." : "")} </p>
                                        </div>
                                    </div>
                                </button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                                <Dialog.Content
                                    className="fixed top-1/2 left-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg space-y-4"
                                >
                                    <Dialog.Title className="text-lg font-semibold">{location.name}</Dialog.Title>
                                    <img
                                            src={location.image}
                                            alt={location.name}
                                            className="w-full h-56 object-cover rounded-sm"
                                        />
                                    <p className="text-sm text-gray-700 mt-2"> {location.description} </p>
                                    <div className="mt-4 flex justify-end">
                                    <Dialog.Close asChild>
                                        <button>Close</button>
                                    </Dialog.Close>
                                    </div>
                                </Dialog.Content>
                                </Dialog.Portal>
                        </Dialog.Root>
                        </>
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
/* </p> */