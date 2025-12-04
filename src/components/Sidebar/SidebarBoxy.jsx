import React from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";

export const SidebarBody = ({ children }) => {
  return (
    <>
      <DesktopSidebar>{children}</DesktopSidebar>
      <MobileSidebar>{children}</MobileSidebar>
    </>
  );
};
