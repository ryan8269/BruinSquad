import { currentUser } from '@clerk/nextjs/server';
import ChatComponent from './ChatComponent';

export default async function Page() {
  const user = await currentUser();
  
  if (!user) return <div>Not signed in</div>;
  
  // Since we're in a server component, we can fetch directly
  async function getMongoUser() {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${user.id}`, {
        cache: 'no-store'  // Disable caching for development
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
  
  const mongoUser = await getMongoUser();

  return (
    <div>
      <h1>Hello {user.firstName}</h1>
      
      {/* Display the MongoDB user data */}
      <div>
        <h2>Your Preferences:</h2>
        <pre>{JSON.stringify(mongoUser, null, 2)}</pre>
      </div>

      <ChatComponent
        userName={user.firstName + ' ' + user.lastName}
        userId={user.id}
      />
    </div>
  );
}