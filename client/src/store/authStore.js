 import { create } from 'zustand';
import axiosInstance from '../api/axios';

const useAuthStore = create((set, get) => ({
   user: null,
  isAuthenticated: false,
  initialCheckLoading: true,
  actionLoading: false,
  authError: null,

   checkUserStatus: async () => {
    
    if (get().initialCheckLoading) {
     } else {
         set({ initialCheckLoading: true });
    }

    try {
      const response = await axiosInstance.get('/auth/me');
      if (response.data && response.data.success) {
         set({ user: response.data.data, isAuthenticated: true, initialCheckLoading: false });
      } else {
         set({ user: null, isAuthenticated: false, initialCheckLoading: false });
      }
    } catch (error) {
       set({ user: null, isAuthenticated: false, initialCheckLoading: false });
      if (!error.response || error.response.status !== 401) {
       }
    }
  },

  loginAction: async (credentials) => {
    set({ actionLoading: true, authError: null });
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      if (response.data && response.data.success) {
        set({
          user: response.data.data.user,
          isAuthenticated: true,
          actionLoading: false,
          authError: null,
           initialCheckLoading: false
        });
        return { success: true };
      } else {
        const errorMsg = response.data?.error || 'Login failed (unknown reason).';
        set({ actionLoading: false, authError: errorMsg });
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Login error.';
      set({ actionLoading: false, authError: message });
      return { success: false, error: message };
    }
  },

  logoutAction: async () => {
    set({ actionLoading: true, authError: null });
    try {
      await axiosInstance.get('/auth/logout');
      set({ user: null, isAuthenticated: false, actionLoading: false, authError: null, initialCheckLoading: false });
    } catch (error) {
       set({
         user: null,
         isAuthenticated: false,
         actionLoading: false,
         authError: "Server logout failed, logged out locally.",
         initialCheckLoading: false  
      });
    }
  },
}));


export default useAuthStore;