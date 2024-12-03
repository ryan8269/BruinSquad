import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

interface sportContextType {
  basketball: boolean;
  running: boolean;
  tennis: boolean;
  football: boolean;
  volleyball: boolean;
  badminton: boolean;
  swimming: boolean;
  yoga: boolean;
  gym: boolean;
  activeRoom: string | null;
  
  toggleBasketball: () => void;
  toggleRunning: () => void;
  toggleTennis: () => void;
  toggleFootball: () => void;
  toggleVolleyball: () => void;
  toggleBadminton: () => void;
  toggleSwimming: () => void;
  toggleYoga: () => void;
  toggleGym: () => void;
  setActiveRoom: (room: string) => void;
  // do this for all other sports
}

const sportContext = createContext<sportContextType | undefined>(undefined);

export const SportProvider = ({ children }: { children: ReactNode }) => {
  const [gym, setGym] = useState(false);
  const [basketball, setBasketball] = useState(false);
  const [running, setRunning] = useState(false);
  const [tennis, setTennis] = useState(false);
  const [football, setFootball] = useState(false);
  const [volleyball, setVolleyball] = useState(false);
  const [badminton, setBadminton] = useState(false);
  const [swimming, setSwimming] = useState(false);
  const [yoga, setYoga] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  interface sportsToSetter {
    [key: string]: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const settingDictionary:sportsToSetter = {
    "gym" : setGym,
    "basketball" : setBasketball,
    "running" : setRunning,
    "tennis" : setTennis,
    "football" : setFootball,
    "volleyball" : setVolleyball,
    "badminton" : setBadminton,
    "swimming" : setSwimming,
    "yoga" : setYoga,
  }

  const toggleGym = () => setGym((prev) => !prev);
  const toggleBasketball = () => setBasketball((prev) => !prev);
  const toggleRunning = () => setRunning((prev) => !prev);
  const toggleTennis = () => setTennis((prev) => !prev);
  const toggleFootball = () => setFootball((prev) => !prev);
  const toggleVolleyball = () => setVolleyball((prev) => !prev);
  const toggleBadminton = () => setBadminton((prev) => !prev);
  const toggleSwimming = () => setSwimming((prev) => !prev);
  const toggleYoga = () => setYoga((prev) => !prev);

  const { user } = useUser();

  const intialize_preferences = async () => {
    if (!user){
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
      for (const [key, value] of Object.entries(data.user.sports)) {
        if (key in settingDictionary)
        {
          settingDictionary[key](Boolean(value));
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } 
  }

  useEffect(() => {
    intialize_preferences();
  },[user])

  return (
    <sportContext.Provider 
    value={{ 
      gym, toggleGym, 
      basketball, toggleBasketball,
      running, toggleRunning, 
      tennis, toggleTennis, 
      football, toggleFootball, 
      volleyball, toggleVolleyball, 
      badminton, toggleBadminton, 
      swimming, toggleSwimming, 
      yoga, toggleYoga,
      activeRoom, setActiveRoom
     }}>
      {children}
    </sportContext.Provider>
  );
};

export const usesport = () => {
  const context = useContext(sportContext);
  if (!context) {
    throw new Error('usesport must be used within a sportProvider');
  }
  return context;
};
