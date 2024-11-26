import { currentUser } from '@clerk/nextjs/server';
import SportChatLayout from './SportChatLayout';

export default async function Page() {
    const user = await currentUser();
    
    if (!user) return <div>Not signed in</div>;
    
    async function getMongoUser() {
        try {
            const response = await fetch(`http://localhost:4000/api/users/${user?.id}`, {
                cache: 'no-store'
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            
            const data = await response.json();
            console.log('MongoDB User Response:', data); // Add this to debug
            return data;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }
    
    const mongoUser = await getMongoUser();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
            <SportChatLayout mongoUser={mongoUser} />
        </div>
    );
}