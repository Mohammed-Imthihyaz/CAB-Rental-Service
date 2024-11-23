import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
  passengerName: {
    type: String,
    required: [true, "Passenger name is required"],
    trim: true
  },
  passengerPhone: {
    type: String,
    required: [true, "Passenger phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"]
  },
  passengerEmail: {
    type: String,
    required: [true, "Passenger email is required"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    trim: true,
    lowercase: true
  }
});

const bookingSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true
  },
  selectedCities: {
    from: {
      type: String,
      required: [true, "Departure city is required"],
      trim: true
    },
    to: {
      type: String,
      required: [true, "Destination city is required"],
      trim: true
    },
    vechical: {
      type: String,
      required: [true, "Vehicle type is required"],
      trim: true
    },
    dutyType: {
      type: String,
      required: [true, "Duty type is required"],
      trim: true
    }
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"]
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
    validate: {
      validator: function(value) {
        return value >= this.startDate;
      },
      message: "End date must be after or equal to start date"
    }
  },
  repTime: {
    type: String,
    required: [true, "Reporting time is required"]
  },
  estTime: {
    type: String,
    required: [true, "Estimated drop time is required"]
  },
  garageTime: {
    type: Number,
    required: [true, "Garage time is required"],
    min: [0, "Garage time cannot be negative"]
  },
  addressData: {
    reportingAddress: {
      type: String,
      required: [true, "Reporting address is required"],
      trim: true
    },
    dropAddress: {
      type: String,
      required: [true, "Drop address is required"],
      trim: true
    },
    flightTrainNumber: {
      type: String,
      trim: true
    }
  },
  bill: {
    type: String,
    required: [true, "Billing type is required"],
    enum: {
      values: ["Company/Customer", "Company Credit", "Company Direct", "Personal"],
      message: "{VALUE} is not a valid billing type"
    }
  },
  priceFormData: {
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"]
    },
    pricePerKM: {
      type: Number,
      required: [true, "Price per KM is required"],
      min: [0, "Price per KM cannot be negative"]
    },
    pricePerHR: {
      type: Number,
      required: [true, "Price per hour is required"],
      min: [0, "Price per hour cannot be negative"]
    }
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
    min: [0, "Total price cannot be negative"]
  },
  passengers: {
    type: [passengerSchema],
    required: [true, "At least one passenger is required"],
    validate: {
      validator: function(value) {
        return value.length > 0;
      },
      message: "At least one passenger is required"
    }
  },
  bookedAgent: {
    AgentName: {
      type: String,
      required: [true, "Agent name is required"],
      trim: true
    },
    AgentPhone: {
      type: String,
      required: [true, "Agent phone number is required"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"]
    },
    AgentEmail: {
      type: String,
      required: [true, "Agent email is required"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
      trim: true,
      lowercase: true
    }
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending"
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for common queries
bookingSchema.index({ customer: 1 });
bookingSchema.index({ startDate: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ "selectedCities.from": 1, "selectedCities.to": 1 });

// Virtual for trip duration in hours
bookingSchema.virtual('tripDuration').get(function() {
  return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60));
});

// Pre-save middleware to validate dates
bookingSchema.pre('save', function(next) {
  if (this.startDate > this.endDate) {
    next(new Error('Start date must be before end date'));
  }
  next();
});

const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;