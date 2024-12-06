'use client';

import { usesport } from '../SportContent';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Save } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useUser();
  const [mongoUser, setMongoUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Existing sport toggle hooks
  const { basketball, toggleBasketball } = usesport();
  const { running, toggleRunning } = usesport();
  const { tennis, toggleTennis } = usesport();
  const { football, toggleFootball } = usesport();
  const { volleyball, toggleVolleyball } = usesport();
  const { badminton, toggleBadminton } = usesport();
  const { swimming, toggleSwimming } = usesport();
  const { yoga, toggleYoga } = usesport();
  const { gym, toggleGym } = usesport();

  // Fetch MongoDB user data (existing implementation)
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
  }, [user]);

  // Existing handleSubmit function (unchanged)
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const preferences: Record<string, any> = { sports: {} };

    const allSports = [
      'basketball', 'running', 'tennis', 'football', 'volleyball',
      'badminton', 'swimming', 'yoga', 'gym',
    ];

    allSports.forEach((sport) => {
      const key = `sports[${sport}]`;
      preferences.sports[sport] = formData.has(key) && formData.get(key) === 'on';
    });

    console.log('Preferences:', preferences);

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

      const sports = [
        { name: 'basketball', toggle: toggleBasketball },
        { name: 'running', toggle: toggleRunning },
        { name: 'tennis', toggle: toggleTennis },
        { name: 'football', toggle: toggleFootball },
        { name: 'volleyball', toggle: toggleVolleyball },
        { name: 'badminton', toggle: toggleBadminton },
        { name: 'swimming', toggle: toggleSwimming },
        { name: 'yoga', toggle: toggleYoga },
        { name: 'gym', toggle: toggleGym },
      ];

      sports.forEach(({ name, toggle }) => {
        if (preferences.sports[name]) {
          if (!eval(name)) toggle();
        } else {
          if (eval(name)) toggle();
        }
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Error updating preferences');
    }
  }

  // Loading and error states (unchanged)
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!mongoUser) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center text-red-500">User data unavailable</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center p-4">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8">
          {/* Profile Header */}
          <div className="mb-12 text-center">
            <h1 className="pb-4 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
              {mongoUser.name}
            </h1>
            <p className="text-lg text-gray-600">{mongoUser.email}</p>
          </div>

          {/* Sports Preferences - 3x3 Grid */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            {Object.entries(mongoUser.sports).map(([sport, active]) => (
              <div 
                key={sport} 
                className="group cursor-pointer"
              >
                <label 
                  className={`
                    flex flex-col items-center justify-center 
                    p-8 rounded-2xl 
                    transition-all duration-300 
                    ${active 
                      ? 'bg-blue-100/50 border-2 border-blue-500/50 hover:bg-blue-200/70' 
                      : 'bg-gray-100/50 border-2 border-gray-300/50 hover:bg-gray-200/70'
                    }
                    transform hover:-translate-y-2 hover:scale-105
                  `}
                >
                  <span className="text-lg font-semibold mb-2 text-gray-700 group-hover:text-blue-800 transition">
                    {sport.charAt(0).toUpperCase() + sport.slice(1)}
                  </span>
                  <input
                    type="checkbox"
                    name={`sports[${sport}]`}
                    defaultChecked={active}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>
              </div>
            ))}
          </div>

          {/* Actions - Centered Save Button */}
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="
                flex items-center justify-center 
                w-full max-w-md
                bg-blue-500/80 text-white 
                py-4 rounded-2xl 
                hover:bg-blue-600/90 
                transition duration-300 
                transform hover:-translate-y-1 hover:scale-105
                shadow-lg hover:shadow-xl
              "
            >
              <Save className="mr-2" /> Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}