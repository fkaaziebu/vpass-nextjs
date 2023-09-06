"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

const AuthProviders = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flexCenter gap-4">
      <Button title="Login" handleClick={handleClick} />
    </div>
  );
};

export default AuthProviders;
