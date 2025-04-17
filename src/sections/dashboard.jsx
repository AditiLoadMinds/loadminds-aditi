import React from "react";
import { Link } from "react-router-dom"; // Import Link

const Dashboard = () => {
  const cards = [
    {
      icon: "/images/hamburger.png",
      title: "Orders",
      description: "Tracking and managing orders efficiently.",
      link: "/orders",  // Add route for each card
    },
    {
      icon: "/images/doc.png",
      title: "Customs",
      description: "Manage your customs documents with ease.",
      link: "/customs",
    },
    {
      icon: "/images/truck.png",
      title: "Transport",
      description: "Truck, Trailers & drivers, all info in one place.",
      link: "/sections/transport",
    },
    {
      icon: "/images/icon.png",
      title: "Loadminds AI",
      description: "An AI-powered tool by LoadMinds for your specific use case.",
      link: "/ai-tool",
    },
    {
      icon: "/images/pdf.png",
      title: "PDF Editor",
      description: "For editing, annotating and formatting your documents.",
      link: "/sections/pdf-editor",
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-black h-16 text-black p-4 text-lg font-thin flex items-center justify-between">
        <img src="/images/Logo.png" alt="logi" className="h-14" />
        <div className="text-white flex items-center gap-6">
          Welcome back, Sarim
          <div className="border-white border-2 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
            S
          </div>
        </div>
      </nav>

      <div className="font-semibold text-[20px] text-center mt-16">How can we help you today?</div>

      <div className="grid grid-cols-3 gap-6 m-72 mt-20">
        {cards.slice(0, 3).map((card, index) => (
          <Link key={index} to={card.link} className="bg-white rounded-3xl p-6 flex flex-col items-left text-left w-[284px] border border-gray-100">
            <img src={card.icon} alt={card.title} className="h-12 w-12 mb-4" />
            <h2 className="text-lg font-bold mb-2 text-[16px]">{card.title}</h2>
            <p className="text-gray-600 text-[12px]">{card.description}</p>
          </Link>
        ))}

        <div className="col-span-3 flex justify-center gap-6">
          {cards.slice(3).map((card, index) => (
            <Link key={index} to={card.link} className="bg-white rounded-3xl p-6 flex flex-col items-left w-[284px] text-left border border-gray-100">
              <img src={card.icon} alt={card.title} className="h-[32px] w-[32px] mb-4" />
              <h2 className="text-lg font-bold mb-2 text-[16px]">{card.title}</h2>
              <p className="text-gray-600 text-[12px]">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
