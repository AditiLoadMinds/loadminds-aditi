import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // If using React Router
import Step1 from "../components/step1";
import Step2 from "../components/step2";
import Step3 from "../components/step3";
import Progress from "../components/progress";

export default function MultiStepForm() {
  const navigate = useNavigate(); 
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    orderNumber: "",
    companyName: "",
    accountingEmail: "",
    dispatcherEmail: "",
    address: {
      house: "",
      city: "",
      state: "",
      zip: "",
      phone: ""
    },
    pickupDate: "",
    pickupLocation: {
      house: "",
      city: "",
      state: "",
      zip: "",
      phone: ""
    },
    deliveryDate: "",
    deliveryLocation: {
      house: "",
      city: "",
      state: "",
      zip: "",
      phone: ""
    },
    tripType: "",
    truck: "",
    trailer: "",
    driver: "",
    status: "",
    amountReceived: "",
    currency: "USD",
    driverQuote: "",
    driverCurrency: "USD"
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const handleChange = (section, field, value) => {
    if (typeof section === "string") {
      setFormData((prev) => ({
        ...prev,
        [section]: value
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section.name]: {
          ...prev[section.name],
          [section.field]: value
        }
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Final Submission: ", formData);
    // Send data to your backend here
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      {/* 🧭 Go Back to /add-order */}
      <button
        onClick={() => navigate("/add-order")}
        className="text-black hover:text-blue-600 mb-4 flex text-lg items-center"
      >
        ← Add Order
      </button>

      {/* 🔄 Step Progress Bar */}
      <Progress step={step} />

      {/* 🧩 Step Components */}
      {step === 1 && (
        <Step1 formData={formData} onChange={handleChange} next={next} />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          onChange={handleChange}
          next={next}
          back={back}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          onChange={handleChange}
          back={back}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
