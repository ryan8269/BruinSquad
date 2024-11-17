// types/activity.ts
interface Activity {
  _id: string;
  name: string;
  type: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// app/page.tsx
import Image from 'next/image';

export default async function Page() {
  const response = await fetch('https://shining-nicely-oarfish.ngrok-free.app/api/activity');
  const result = await response.json();
  const activities: Activity[] = result.data;
  
  return (
      <div className="p-4">
          <ul className="space-y-2">
              {activities.map((activity) => (
                  <li key={activity._id} className="flex items-center gap-4">
                      <div className="relative w-12 h-12">
                          <Image 
                              src={activity.image}
                              alt={activity.name}
                              fill
                              className="object-cover rounded"
                              sizes="(max-width: 768px) 48px, 48px"
                          />
                      </div>
                      <div>
                          <h3 className="font-medium">{activity.name}</h3>
                          <p className="text-sm text-gray-600">{activity.type}</p>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
  );
}