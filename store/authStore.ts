import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

import { BASE_URL } from '../utils';

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`); 
    //set function provided by zustand
    set({ allUsers: response.data });
  } 
});

const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
);

//allo us to call useAuthStore as a hook from inside of any components
export default useAuthStore;