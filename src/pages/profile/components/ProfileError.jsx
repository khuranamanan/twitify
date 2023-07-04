import React from "react";
import { useRouteError } from "react-router";

function ProfileError() {
  const error = useRouteError();

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen p-4 mb-[64px]">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl font-bold">Oops! User Not Found</h1>
        <p className="text-lg">{error.message}</p>
        <p className="text-lg">
          The user you are looking for does not exist or may have been removed.
          Please check the URL or try again later.
        </p>
      </div>

      <a href="/" className="text-blue-500 hover:underline duration-300">
        Go back to Twitify home page
      </a>
    </div>
  );
}

export default ProfileError;
