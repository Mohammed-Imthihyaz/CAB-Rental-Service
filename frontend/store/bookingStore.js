import axios from "axios";
import { create } from "zustand";

const API = "http://localhost:3000/api/bookings";
axios.defaults.withCredentials = true;

export const useBookingStore = create((set) => ({
  bookingDetails:null,
  isLoading: false,
  message: null,
  error: null,
  newBooking: async (formData) => {
    set({ isLoading: true, error: null });
    try {
        const {
            customer,
            selectedCities,
            startDate,
            endDate,
            repTime,
            estTime,
            garageTime,
            addressData,
            bill,
            priceFormData,
            totalPrice,
            passengers,
            bookedAgent,
          } = formData;
          
      const response = await axios.post(`${API}/duties`, {
        customer,
        selectedCities,
        startDate,
        endDate,
        repTime,
        estTime,
        garageTime,
        addressData,
        bill,
        priceFormData,
        totalPrice,
        passengers,
        bookedAgent,
      });
      set({ bookingDetails: response.data.bookingDetails, isLoading: false, error: null });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
}));

