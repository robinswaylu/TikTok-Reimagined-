import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
 

const authStore = (set: any) => ({
  userProfile: null, 
  
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }), 
  
});

const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
);

//allo us to call useAuthStore as a hook from inside of any components
export default useAuthStore;