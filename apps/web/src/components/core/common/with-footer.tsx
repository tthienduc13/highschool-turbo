import React from "react";

export const WithFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    // <div
    //   style={{
    //     minHeight: "calc(100vh - 80px - 32px)",
    //     marginTop: "40px",
    //     paddingBottom: "112px",
    //   }}
    // >
    //   {children}
    // </div>
    <div>{children}</div>
  );
};
