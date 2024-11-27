import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server';

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) return <div className="text-center text-red-500 mt-10">Not signed in</div>;

  async function getMongoUser() {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${user.id}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      console.log('MongoDB User Response:', data); // Debug log
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  const mongoUser = await getMongoUser();

  if (!mongoUser) return <div className="text-center text-gray-500 mt-10">User data unavailable</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative h-24 w-24 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={mongoUser.profileImage || '/placeholder-avatar.png'}
            alt={`${mongoUser.name}'s profile`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{mongoUser.name}</h1>
          <p className="text-gray-500">{mongoUser.email}</p>
          <p className={`mt-2 text-sm ${mongoUser.isMatched ? 'text-green-500' : 'text-red-500'}`}>
            {mongoUser.isMatched ? 'Matched' : 'Not Matched'}
          </p>
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
              <p className={`text-center font-medium ${active ? 'text-blue-800' : 'text-gray-500'}`}>
                {sport.charAt(0).toUpperCase() + sport.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Edit Profile
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          Log Out
        </button>
      </div>
    </div>
  );
}
