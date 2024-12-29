import React from "react";

import { Footer } from "../layouts/footer";

export const WithFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <div
        style={{
          minHeight: "calc(100vh - 80px - 32px)",
          marginTop: "32px",
          paddingBottom: "112px",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};
