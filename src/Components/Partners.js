import React from "react";

const Partners = () => {
  const partners = [
    { name: "Wired Learning", image: "wired-learning-color-logo-bw.png" },
    { name: "Ryich", image: "ryich-color-logo-bw.png" },
    { name: "Dhatri Fin", image: "dhatri-fin-logo-bw.png" },
  ];

  return (
    <div className="w-full flex justify-center items-center py-0 bg-gray-50">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-around -mt-8">
          {partners.map((partner, index) => (
            <div key={`partner-${index}`} className="px-6 md:px-8 py-4">
              <img
                src={partner.image}
                alt={partner.name}
                className="h-24 md:h-32 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
