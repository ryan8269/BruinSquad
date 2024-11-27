'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Assuming you are passing user ID as a query param in the route

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const result = await response.json();
        if (result.success) {
          setUser(result.data);
        } else {
          setError(result.error);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("An error occurred while fetching the user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <UserCircleIcon className="h-12 w-12" />
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <section>
          <h2>Basic Information</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Major:</strong> Computer Science (Placeholder)</p>
          <p><strong>Year:</strong> Junior (Placeholder)</p>
          <p><strong>Location:</strong> Westwood (Placeholder)</p>
          <p><strong>Interests:</strong> {/* Display selected sports */}
            {Object.entries(user.sports)
              .filter(([sport, isSelected]) => isSelected && sport !== "none")
              .map(([sport]) => sport.charAt(0).toUpperCase() + sport.slice(1))
              .join(", ") || "None"}
          </p>
        </section>

        <section>
          <h2>Bio</h2>
          <p>{user.bio || "No bio available."}</p>
        </section>

        <Button>Edit Profile</Button>
      </CardContent>
    </Card>
  );
}
