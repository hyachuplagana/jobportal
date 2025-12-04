import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export const MobileSidebar = ({ children }) => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <div className="md:hidden flex p-4 bg-neutral-100 dark:bg-neutral-800 justify-between">
        <Menu onClick={() => setOpen(true)} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 p-8 bg-white dark:bg-neutral-900 md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <X
              className="absolute right-6 top-6 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            <div className="mt-10">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
