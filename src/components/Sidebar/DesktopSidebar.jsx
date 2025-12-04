import React from "react";
import { motion } from "framer-motion";
import { useSidebar } from "./SidebarContext";

export const DesktopSidebar = ({ children }) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <motion.div
      className="hidden md:flex flex-col h-full bg-neutral-100 dark:bg-neutral-800"
      animate={{ width: animate ? (open ? 300 : 60) : 300 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
};
