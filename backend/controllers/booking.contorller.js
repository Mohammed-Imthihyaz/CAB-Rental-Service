import { BookingDetails } from "../models/booking.model.js";

export const newBooking = async (req, res) => {
    try{
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
          } = req.body;
          if (
            !customer ||
            !selectedCities ||
            !startDate ||
            !endDate ||
            !repTime ||
            !estTime ||
            !garageTime ||
            !addressData ||
            !bill ||
            !priceFormData ||
            !totalPrice ||
            !passengers ||
            !bookedAgent
          ) {
            return res.status(404).json({success:false,error:'All required fields must be provided'});
          }
          const booking = new BookingDetails({
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
            bookedAgent
          });
          console.log(req.body)
        await booking.save();
        res.status(201).json({sucess:true,message: "booking created successfully",booking})

    }catch(error){
        return res.status(400).json({success:false,message:error.message});
    }
  
};
