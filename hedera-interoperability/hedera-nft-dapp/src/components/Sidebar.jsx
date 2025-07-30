import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  Link2,
  SendHorizonal,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Associate Token", path: "/associate", icon: <Link2 className="w-5 h-5" /> },
  { label: "Transfer Token", path: "/transfer", icon: <SendHorizonal className="w-5 h-5" /> },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className={`${
        collapsed ? "w-20" : "w-64"
      } hidden md:flex h-[90vh] flex-col bg-white/80 backdrop-blur-lg border-r border-gray-200 shadow-xl rounded-r-2xl m-2 p-4 transition-all duration-300`}
    >
   <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="mb-10 flex items-start justify-between"
>
  <div className={`${collapsed ? "hidden" : "block"}`}>
    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
      NFT Manager
    </h1>
    <p className="text-gray-500 text-sm mt-1">Manage your Hedera NFTs</p>
  </div>

  <button
    onClick={() => setCollapsed(!collapsed)}
    className="text-gray-500 hover:text-gray-700 transition ml-2"
  >
    {collapsed ? (
      <ChevronsRight className="w-5 h-5" />
    ) : (
      <ChevronsLeft className="w-5 h-5" />
    )}
  </button>
</motion.div>

      <ul className="space-y-3">
        {navItems.map(({ label, path, icon }) => (
          <motion.li
            key={label}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={path}
              className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                pathname === path
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <span className="text-xl">{icon}</span>
              {!collapsed && <span className="ml-3">{label}</span>}
            </Link>
          </motion.li>
        ))}
      </ul>

      {!collapsed && (
        <motion.div
          className="mt-auto bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl p-4 border border-indigo-200"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-indigo-700">Need Help?</h3>
          <p className="text-sm text-indigo-600 mt-1">
            Contact our support team
          </p>
          <button className="mt-3 w-full py-2 bg-white text-indigo-600 rounded-lg text-sm font-medium border border-indigo-200 hover:bg-indigo-50 transition">
            Contact Support
          </button>
        </motion.div>
      )}
    </motion.aside>
  );
}
