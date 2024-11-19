import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  selectedCities: {
    dutyType: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    vechical: { type: String, required: true },
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  repTime: { type: String },
  estTime: { type: String },
  garageTime: { type: Number, required: true },
  addressData: {
    dropAddress: { type: String, required: true },
    flightTrainNumber: { type: String },
    reportingAddress: { type: String, required: true },
  },
  bill: { type: String },
  priceFormData: {
    price: { type: Number, required: true },
    pricePerHR: { type: Number, required: true },
    pricePerKM: { type: Number, required: true },
  },
  totalPrice: { type: Number },
  passengers: [
    {

      passengerEmail: { type: String, required: true },
      passengerName: { type: String, required: true },
      passengerPhone: { type: String, required: true },
    },
  ],
  bookedAgent:{
    AgentName:{type:String,required:true},
    AgentPhone:{type:String,required:true},
    AgentEmail:{type:String,required:true},
  }

},{timestamps: true});

export const BookingDetails = mongoose.model("BookingDetails", bookingSchema);
