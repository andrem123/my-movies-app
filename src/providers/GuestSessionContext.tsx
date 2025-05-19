'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getGuestSession } from '@/services/auth/getGuestSession';

interface GuestSessionCtx {
  guestSessionId: string | null;
  setGuestSessionId: (id: string) => void;
}

const GuestSessionContext = createContext<GuestSessionCtx>({
  guestSessionId: null,
  setGuestSessionId: () => {},
});

export const GuestSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [guestSessionId, setGuestSessionIdState] = useState<string | null>(null);

  const setGuestSessionId = (id: string) => {
    localStorage.setItem('guestSessionId', id);
    setGuestSessionIdState(id);
  };

  useEffect(() => {
    const existing = localStorage.getItem('guestSessionId');
    if (existing) {
      setGuestSessionIdState(existing);
    } else {
      (async () => {
        const data = await getGuestSession();
        if (data.guest_session_id) setGuestSessionId(data.guest_session_id);
      })();
    }
  }, []);

  return (
    <GuestSessionContext.Provider value={{ guestSessionId, setGuestSessionId }}>
      {children}
    </GuestSessionContext.Provider>
  );
};

export const useGuestSession = () => useContext(GuestSessionContext);