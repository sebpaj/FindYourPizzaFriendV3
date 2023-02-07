import React, { useState } from "react";
import SignInSide from "../SignIn/Signing";

export default function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {" "}
          <h1>Welcome back!</h1>
        </div>
      ) : (
        <SignInSide setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
