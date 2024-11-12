export default async function Page() {
    const response = await fetch('https://shining-nicely-oarfish.ngrok-free.app/api/activity');
    const result = await response.json();
    const activities = result.data;
  
    return (
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>{activity.name} - {activity.type}</li>
        ))}
      </ul>
    );
  }