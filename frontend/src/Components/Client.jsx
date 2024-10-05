import React from 'react'

const Client = () => {
  
    const items = [
        { id: 1, image: "https://via.placeholder.com/150", content:"3.2 milian happy customer" },
        { id: 2, image: "https://via.placeholder.com/150", heading: "Heading 2" },
        { id: 3, image: "https://via.placeholder.com/150", heading: "Heading 3" },
        { id: 4, image: "https://via.placeholder.com/150", heading: "Heading 4" },
        { id: 5, image: "https://via.placeholder.com/150", heading: "Heading 5" }
      ];
    
      return (
        <div className="container mx-auto p-4">
          {/* Centered Heading */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
            Centered Responsive Heading
          </h1>
    
          {/* Responsive Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {items.map(item => (
              <div key={item.id} className="flex flex-col items-center">
                <img
                  src={item.image}
                  alt={item.content}
                  className="w-full h-auto object-cover rounded-lg mb-4"
                />
                <p className="text-lg font-medium text-center">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
  )
}

export default Client
