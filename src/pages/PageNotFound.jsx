import React from "react";
import errorImg from "../assets/404.jpg";

function PageNotFound() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen p-4">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl font-bold">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>

      <img src={errorImg} alt="404 Error" className="w-64 h-64" />
      <a href="/" className="text-blue-500 hover:underline duration-300">
        Go back to Twitify home page
      </a>
    </div>
  );
}

export default PageNotFound;
