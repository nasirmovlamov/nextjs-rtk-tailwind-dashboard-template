"use client";

import { useState } from "react";
import Login from "./login";

export default function Home() {
  const [auth, setAuth] = useState(true);
  return <>{auth ? "login" : <Login />}</>;
}
