import React from "react";

const Loader = () => (
  <div className="fixed top-0 right-0 m-4 z-50">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
  </div>
);

export default Loader;
