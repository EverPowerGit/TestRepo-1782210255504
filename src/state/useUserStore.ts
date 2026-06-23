import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '@/types';

type UserState = {
  profile: UserProfile | null;
  setProfile: (p: Partial<UserProfile>) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: { name: 'Guest', email: '' },
      setProfile: (p) => set({ profile: { ...(get().profile || {}), ...p } as UserProfile }),
      wishlist: [],
      toggleWishlist: (id) => {
        const w = new Set(get().wishlist);
        if (w.has(id)) w.delete(id); else w.add(id);
        set({ wishlist: Array.from(w) });
      },
    }),
    { name: 'retail-user' }
  )
);
