import axios from "axios";
import { create } from "zustand";

const API_URI="http://localhost:3000/api/auth";
axios.defaults.withCredentials=true;

export const useAuthStore= create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    signup: async(email,password,name)=>{
        set({isLoading:true,error:null});
        try{
          const response=  await axios.post(`${API_URI}/signup`,{email,password,name});
          set({user:response.data.user,isAuthenticated:true,isLoading:false});
        }catch(error){
            set({error: error.response.data.message || "Error signing up",isLoading:false});
            throw error;
        }
    },
    login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URI}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},
    logout:async()=>{
        set({isLoading: true,error:null});
        try{
            await axios.post(`${API_URI}/logout`);
            set({user: null ,isAuthenticated:false ,error:null,isLoading:false});
        }catch(error){
            set({error: "Error logging out",isLoading:false});
        }
    },
    verifyEmail:async (code)=>{
        set({isLoading:true,error:null});
        try{
            const response=await axios.post(`${API_URI}/verify-email`,{code});
            set({user:response.data.user,isAuthenticated:true,isLoading:false});
            return response.data
        }catch(error){
            set({error: error.response.data.message || "Error verifying email",isLoading:false});
            throw error;
        }
    },
    checkAuth:async()=>{
        set({isCheckingAuth:true,error:null});
        try{
            const response=await axios.get(`${API_URI}/check-auth`);
            set({user:response.data.user,isAuthenticated:true,isCheckingAuth:false});
        }catch(error){
            set({error: null ,isCheckingAuth:false,isAuthenticated:false});
        }
    }

}))