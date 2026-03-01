import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
}

interface UserStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}

// Mock user data for demonstration
const mockUser: UserProfile = {
  id: "mock-user-1",
  email: "customer@asperbeauty.com",
  firstName: "Sarah",
  lastName: "Johnson",
  phone: "+1 (555) 123-4567",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: mockUser, // Initialize with mock data
      isAuthenticated: true, // Mock authentication

      setUser: (user) => set({ user, isAuthenticated: true }),

      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "user-profile",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
