'use client';
import { useEffect, useState } from "react";
import { usesport } from "@/app/SportContent";

interface Event {
    location: string;
    time: string;
    upvotes: number;
    _id: string;
}

interface Activity {
    _id: string;
    name: string;
    type: string;
    image: string;
    events: Event[];
}

export default function ActivityEventsLayout() {
    const { activeRoom } = usesport();
    const [events, setEvents] = useState<Event[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchActivity = async (room: string): Promise<void> => {
        try {
            setIsLoading(true);
            console.log('Fetching activity for sport:', room);
            const response = await fetch(`http://localhost:4000/api/activity?name=${room}`);
            if (!response.ok) throw new Error('Failed to fetch activity');
            const data = await response.json();

            if (data.success && data.data.length > 0) {
                setEvents(data.data[0].events);  // Extract only the `events` array
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error('Error fetching activity:', error);
            setEvents(null);
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
            <h1>Activity Events</h1>
            {isLoading && <p>Loading...</p>}
            {!isLoading && events && events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event._id}>
                            <strong>Location:</strong> {event.location}<br />
                            <strong>Time:</strong> {event.time}<br />
                            <strong>Upvotes:</strong> {event.upvotes}
                        </li>
                    ))}
                </ul>
            ) : (
                !isLoading && <p>No events available for this activity.</p>
            )}
        </div>
    );
}
