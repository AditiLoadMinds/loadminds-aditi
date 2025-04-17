export default function Step2({ formData, onChange, next, back }) {
    return (
      <div className="space-y-6">
        {/* Pickup Date */}
        <div>
          <label className="block font-medium mb-1">Pickup Date</label>
          <input
            type="date"
            className="input w-full"
            value={formData.pickupDate}
            onChange={e => onChange("pickupDate", null, e.target.value)}
          />
        </div>
  
        {/* Pickup Location */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Pickup Location</h3>
  
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              placeholder="House / Street / Locality"
              className="input w-full"
              value={formData.pickupLocation.house}
              onChange={e => onChange({ name: "pickupLocation", field: "house" }, null, e.target.value)}
            />
          </div>
  
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">City</label>
              <input
                placeholder="City"
                className="input w-full"
                value={formData.pickupLocation.city}
                onChange={e => onChange({ name: "pickupLocation", field: "city" }, null, e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">State</label>
              <input
                placeholder="State"
                className="input w-full"
                value={formData.pickupLocation.state}
                onChange={e => onChange({ name: "pickupLocation", field: "state" }, null, e.target.value)}
              />
            </div>
          </div>
  
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">ZIP Code</label>
              <input
                placeholder="ZIP Code"
                className="input w-full"
                value={formData.pickupLocation.zip}
                onChange={e => onChange({ name: "pickupLocation", field: "zip" }, null, e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1 ">Contact Number</label>
              <div className="flex gap-2">
                <input
                  placeholder="Phone"
                  className="input w-20"
                  value={formData.pickupLocation.phone}
                  onChange={e => onChange({ name: "pickupLocation", field: "phone" }, null, e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
  
        {/* Delivery Date */}
        <div>
          <label className="block font-medium mb-1">Delivery Date</label>
          <input
            type="date"
            className="input w-full"
            value={formData.deliveryDate}
            onChange={e => onChange("deliveryDate", null, e.target.value)}
          />
        </div>
  
        {/* Delivery Location */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Delivery Location</h3>
  
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              placeholder="House / Street / Locality"
              className="input w-full"
              value={formData.deliveryLocation.house}
              onChange={e => onChange({ name: "deliveryLocation", field: "house" }, null, e.target.value)}
            />
          </div>
  
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">City</label>
              <input
                placeholder="City"
                className="input w-full"
                value={formData.deliveryLocation.city}
                onChange={e => onChange({ name: "deliveryLocation", field: "city" }, null, e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">State</label>
              <input
                placeholder="State"
                className="input w-full"
                value={formData.deliveryLocation.state}
                onChange={e => onChange({ name: "deliveryLocation", field: "state" }, null, e.target.value)}
              />
            </div>
          </div>
  
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">ZIP Code</label>
              <input
                placeholder="ZIP Code"
                className="input w-full"
                value={formData.deliveryLocation.zip}
                onChange={e => onChange({ name: "deliveryLocation", field: "zip" }, null, e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Contact Number</label>
              <div className="flex gap-2">
                <input
                  placeholder="Phone"
                  className="input flex-1"
                  value={formData.deliveryLocation.phone}
                  onChange={e => onChange({ name: "deliveryLocation", field: "phone" }, null, e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
  
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <button className="btn-outline px-4 py-2 rounded border" onClick={back}>← Back</button>
          <button className="btn px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={next}>Next →</button>
        </div>
      </div>
    );
  }
  