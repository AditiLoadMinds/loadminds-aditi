export default function Step1({ formData, onChange, next }) {
    return (
      <div className="space-y-6">
        {/* Order Number */}
        <div>
          <label className="block font-medium mb-1">Order Number</label>
          <input
            type="text"
            placeholder="Order number"
            className="input w-full"
            value={formData.orderNumber}
            onChange={e => onChange("orderNumber", null, e.target.value)}
          />
        </div>
  
        {/* Company Name */}
        <div>
          <label className="block font-medium mb-1">Company Name</label>
          <input
            type="text"
            placeholder="Company name"
            className="input w-full"
            value={formData.companyName}
            onChange={e => onChange("companyName", null, e.target.value)}
          />
        </div>
  
        {/* Emails */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Accounting Email</label>
            <input
              type="email"
              placeholder="Accounting email"
              className="input w-full"
              value={formData.accountingEmail}
              onChange={e => onChange("accountingEmail", null, e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Dispatcher Email</label>
            <input
              type="email"
              placeholder="Dispatcher email"
              className="input w-full"
              value={formData.dispatcherEmail}
              onChange={e => onChange("dispatcherEmail", null, e.target.value)}
            />
          </div>
        </div>
  
        {/* Address */}
        <div className="space-y-4">
          <label className="block font-medium mb-1">Company Address</label>
  
          <input
            placeholder="House / Street / Locality"
            className="input w-full"
            value={formData.address.house}
            onChange={e => onChange({ name: "address", field: "house" }, null, e.target.value)}
          />
  
          <div className="flex gap-4">
            <input
              placeholder="City"
              className="input flex-1"
              value={formData.address.city}
              onChange={e => onChange({ name: "address", field: "city" }, null, e.target.value)}
            />
            <input
              placeholder="State"
              className="input flex-1"
              value={formData.address.state}
              onChange={e => onChange({ name: "address", field: "state" }, null, e.target.value)}
            />
          </div>
  
          <div className="flex gap-4">
            <input
              placeholder="ZIP Code"
              className="input flex-1"
              value={formData.address.zip}
              onChange={e => onChange({ name: "address", field: "zip" }, null, e.target.value)}
            />
            <input
              placeholder="Contact number"
              className="input flex-1"
              value={formData.address.phone}
              onChange={e => onChange({ name: "address", field: "phone" }, null, e.target.value)}
            />
          </div>
        </div>
  
        {/* Next Button */}
        <div className="pt-4">
          <button className="btn bg-blue-600 text-white w-full px-6 py-2 rounded hover:bg-blue-700" onClick={next}>
            Next →
          </button>
        </div>
      </div>
    );
  }
  