import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import SignInSide from "../SignIn/Signing";
import HeaderH1 from "./Header";

const Div = styled("div")({
  margin: 0,
  backgroundColor: "#121212",
  color: "#1E88E5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

export default function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  return (
    <div>
      {isLoggedIn ? (
        <Div>
          <HeaderH1 emailAddress={emailAddress} />
        </Div>
      ) : (
        <SignInSide
          setIsLoggedIn={setIsLoggedIn}
          setEmailAddress={setEmailAddress}
        />
      )}
    </div>
  );
}
