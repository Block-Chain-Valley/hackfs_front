import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-8 border-blue-500"></div>
      </div>
    </div>
  );
};

export default Loading;
