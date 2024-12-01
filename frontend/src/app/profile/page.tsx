'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export default function ProfilePage() {
  const { user } = useUser(); // Call useUser at the top level
  const [mongoUser, setMongoUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch MongoDB user data on component mount
  useEffect(() => {
    async function fetchMongoUser() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/users/${user.id}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        console.log('MongoDB User Response:', data);
        setMongoUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMongoUser();
  }, [user]); // Re-run effect if user changes

 // Form handler for updating preferences
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    // Initialize an object to hold the preferences in the desired format
    const preferences: Record<string, any> = { sports: {} };

    // List of all sports (including those you want to send as false if not checked)
    const allSports = [
      'basketball', 'running', 'tennis', 'football', 'volleyball',
      'badminton', 'swimming', 'yoga', 'gym',
    ];

    // Loop through the list of all sports and set their value based on formData
    allSports.forEach((sport) => {
      const key = `sports[${sport}]`;
      // If the sport is checked, it will be 'on', otherwise it will be 'off' or undefined
      preferences.sports[sport] = formData.has(key) && formData.get(key) === 'on'; // True for 'on', false otherwise
    });

    console.log('Preferences:', preferences); // This will show the structure before sending it

    try {
      const response = await fetch(`http://localhost:4000/api/users/${mongoUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(preferences),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update preferences: ${errorMessage}`);
      }

      alert('Preferences updated successfully');
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Error updating preferences');
    }
  }

  // Show loading spinner or the form
  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (!mongoUser) {
    return <div className="text-center text-red-500 mt-10">User data unavailable</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit}>
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{mongoUser.name}</h1>
            <p className="text-gray-500">{mongoUser.email}</p>
          </div>
        </div>

        {/* Sports Preferences */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Sports Preferences</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(mongoUser.sports).map(([sport, active]) => (
              <div
                key={sport}
                className={`p-4 rounded-lg border ${
                  active ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-300'
                }`}
              >
                <label className="text-center font-medium block">
                  {sport.charAt(0).toUpperCase() + sport.slice(1)}
                  <input
                    type="checkbox"
                    name={`sports[${sport}]`}
                    defaultChecked={active}
                    className="ml-2"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-4">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Preferences
          </button>
          <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Log Out
          </button>
        </div>
      </form>
    </div>
  );
}
