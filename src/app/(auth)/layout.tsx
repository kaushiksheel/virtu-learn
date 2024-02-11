import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen grid place-content-center">
      {children}
    </div>
  );
}

export default AuthLayout;
