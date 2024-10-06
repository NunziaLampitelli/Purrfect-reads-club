import React from "react";
import "./pageContainer.css";

interface PageContainerProps {
  children: React.ReactNode; 
}

function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="page-container">
      <section className="content">
        {children}  
      </section>
    </div>
  );
}

export default PageContainer;