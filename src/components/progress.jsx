export default function Progress({ step }) {
    const steps = ["Company Info", "Pickup & Delivery", "Trip & Quote"];
    return (
      <div className="mb-6 flex justify-between text-sm text-gray-500">
        {steps.map((label, i) => (
          <div key={i} className={i + 1 === step ? "font-bold text-blue-600" : ""}>
            {i + 1}. {label}
          </div>
        ))}
      </div>
    );
  }
  