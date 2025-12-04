import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSidebar } from "./SidebarContext";

export const SidebarLink = ({ link }) => {
  const { open, animate } = useSidebar();

  return (
    <Link
      to={link.href}
      className="flex items-center gap-3 py-2 px-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition"
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm text-neutral-900 dark:text-neutral-200 whitespace-nowrap"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
