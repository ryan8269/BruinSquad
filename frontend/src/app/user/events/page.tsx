'use client';
import { useState, useEffect } from "react";
import { usesport } from "@/app/SportContent";

// Define interfaces for form data and request payload
interface EventData {
    title: string;
    location: string;
    description: string;
    time: string;
    upvotes?: number; // Optional, defaults to 1 for new events
}

interface EventRequestPayload {
    eventData: EventData;
}

interface Event {
    _id: string;
    title: string;
    description: string;
    location: string;
    time: string;
    upvotes: number;
}

export default function ActivityEventsLayout() {
    const { activeRoom } = usesport();
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<EventData>({
        title: "",
        location: "",
        description: "",
        time: "",
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleUpvote = async (eventId: string) => {
        try {
            const response = await fetch(`http://localhost:4000/api/activity?name=${activeRoom}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId }),
            });

            if (!response.ok) throw new Error('Failed to update upvote');

            // Optimistically update the UI
            setEvents((prevEvents) =>
                prevEvents?.map((event) =>
                    event._id === eventId
                        ? { ...event, upvotes: event.upvotes + 1 }
                        : event
                ) || null
            );
        } catch (error) {
            console.error('Error upvoting event:', error);
        }
    }

    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:4000/api/activity?name=${activeRoom}`);
            if (!response.ok) throw new Error("Failed to fetch events");
            const data = await response.json();
            setEvents(data.data[0]?.events || []);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.location || !formData.description || !formData.time) {
            alert("Please fill in all fields.");
            return;
        }

        const payload: EventRequestPayload = {
            eventData: { ...formData, upvotes: 1 },
        };

        try {
            setIsSubmitting(true);
            const response = await fetch(`http://localhost:4000/api/activity?name=${activeRoom}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            console.log(JSON.stringify(payload));
            if (!response.ok) throw new Error("Failed to create event");
            setFormData({ title: "", location: "", description: "", time: "" });
            setIsModalOpen(false);
            fetchEvents(); // Refresh events after creation
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (activeRoom) {
            fetchEvents();
        }
    }, [activeRoom]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen rounded-lg">
            <h1 className="pb-4 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 text-center mb-8">
                Activity Events
            </h1>

            {isLoading ? (
                <div className="flex justify-center items-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 p-6 animate-slideLeftAndFade"
                        >
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                                <p className="text-sm text-gray-600 mt-2">
                                    <strong>Location:</strong> {event.location}
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    <strong>Time:</strong> {new Date(event.time).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    <strong>Description:</strong> {event.description}
                                </p>
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        className="flex items-center text-blue-600 hover:text-blue-800 text-xl"
                                        onClick={() => handleUpvote(event._id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-6 h-6 mr-2"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v12a1 1 0 01-2 0V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {event.upvotes}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-10">No events available for this activity.</p>
            )}

            {/* Add Event Button */}
            <button
                className="fixed bottom-8 right-8 bg-blue-600 text-white p-5 rounded-full shadow-lg hover:bg-blue-700 transition-all"
                onClick={() => setIsModalOpen(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H4a1 1 0 110-2h6V4a1 1 0 011-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Modal for Creating Event */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Event</h2>
                        <form onSubmit={handleCreateEvent} className="space-y-6">
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter event title"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter location"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter a brief description"
                                    rows={4}
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Time</label>
                                <input
                                    type="datetime-local"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-6 py-3 rounded-md text-white ${
                                        isSubmitting
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700"
                                    } transition-all`}
                                >
                                    {isSubmitting ? "Creating..." : "Create Event"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
