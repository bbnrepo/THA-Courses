import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  Link2,
  // SendHorizonal,
  ChevronsLeft,
  ChevronsRight,
  BadgeDollarSign,
} from "lucide-react";

// Navigation items
const navItems = [
  { label: "Dashboard", path: "/", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Associate Token", path: "/associate", icon: <Link2 className="w-5 h-5" /> },
//   { label: "Transfer Token", path: "/transfer", icon: <SendHorizonal className="w-5 h-5" /> },
];

// Dummy token data
const associatedTokens = [
  { tokenId: process.env.REACT_APP_TOKEN_ID, name: "Token ID" },
   
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex items-start justify-between"
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

      {/* Nav links */}
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

      {/* Associated Tokens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10"
      >
        {!collapsed && (
          <>
            <h3 className="text-gray-500 text-xs font-semibold uppercase mb-2 px-2">
              Tokens
            </h3>
            <ul className="space-y-2 max-h-32 overflow-y-auto pr-1">
              {associatedTokens.map((token) => (
                <li
                  key={token.tokenId}
                  className="flex items-center px-3 py-2 rounded-xl bg-indigo-50 text-sm border border-indigo-100"
                >
                  <BadgeDollarSign className="w-4 h-4 text-indigo-500" />
                  <div className="ml-2 flex flex-col">
                    <span className="font-semibold text-indigo-700 truncate">{token.name}</span>
                    <span className="text-[10px] text-gray-500 truncate">{token.tokenId}</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </motion.div>
    </motion.aside>
  );
}
