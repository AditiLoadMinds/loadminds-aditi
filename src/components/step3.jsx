import { Link } from "react-router-dom";

export default function Step3({ formData, onChange, back, onSubmit }) {
    const tripOptions = ["Single", "Round", "Multi-stop"];
    const trucks = ["Truck A", "Truck B"];
    const trailers = ["Flatbed", "Tanker"];
    const drivers = ["John Doe", "Jane Smith"];
    const statusList = ["Assigned", "In Progress", "Completed"];
  
    return (
      <div className="space-y-4">
  
        {/* Trip Type */}
        <div>
          <label className="block font-medium mb-1">Trip Type</label>
          <select
            className="input w-full text-gray-400"
            value={formData.tripType || ""}
            onChange={e => onChange("tripType", null, e.target.value)}
          >
            <option value="" className="text-gray-400" disabled>Select Trip Type</option>
            {tripOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
  
        {/* Truck / Trailer / Driver / Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Truck</label>
            <select
              className="input w-full text-gray-400"
              value={formData.truck || ""}
              onChange={e => onChange("truck", null, e.target.value)}
            >
              <option value="" disabled>Select Truck</option>
              {trucks.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
  
          <div>
            <label className="block font-medium mb-1">Trailer</label>
            <select
              className="input w-full text-gray-400"
              value={formData.trailer || ""}
              onChange={e => onChange("trailer", null, e.target.value)}
            >
              <option value="" disabled>Select Trailer</option>
              {trailers.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
  
          <div>
            <label className="block font-medium mb-1">Driver</label>
            <select
              className="input w-full text-gray-400"
              value={formData.driver || ""}
              onChange={e => onChange("driver", null, e.target.value)}
            >
              <option value="" disabled>Select Driver</option>
              {drivers.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
  
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              className="input w-full text-gray-400"
              value={formData.status || ""}
              onChange={e => onChange("status", null, e.target.value)}
            >
              <option value="" disabled>Select Status</option>
              {statusList.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
  
        {/* Amount Received */}
        <div>
          <label className="block font-medium mb-1">Amount Received</label>
          <div className="flex gap-2">
            <select
              className="input min-w-[80px] max-w-[100px]"
              value={formData.currency}
              onChange={e => onChange("currency", null, e.target.value)}
            >
              <option value="" >Select</option>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
            <input
              placeholder="Amount Received"
              className="input flex-1"
              value={formData.amountReceived}
              onChange={e => onChange("amountReceived", null, e.target.value)}
            />
          </div>
        </div>
  
        {/* Driver's Quote */}
        <div>
          <label className="block font-medium mb-1">Driver's Quote</label>
          <div className="flex gap-2">
            <select
              className="input min-w-[80px] max-w-[100px]"
              value={formData.currency}
              onChange={e => onChange("currency", null, e.target.value)}
            >
              <option value="" >Select</option>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
            <input
              placeholder="Amount Received"
              className="input flex-1"
              value={formData.amountReceived}
              onChange={e => onChange("amountReceived", null, e.target.value)}
            />
          </div>
        </div>
  
        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <button className="btn-outline" onClick={back}>Back</button>
          <Link to="/addorders"><button className="btn" onClick={onSubmit}>Add Order</button></Link>
          
        </div>
      </div>
    );
  }
  