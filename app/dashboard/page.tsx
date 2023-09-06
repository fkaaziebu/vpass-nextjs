import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Link href="/create-password"> Click to create Password</Link>
    </div>
  );
};

export default Dashboard;
