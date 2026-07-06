// Styling method: Tailwind CSS
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { navArray } from "../utils/NavArray.js"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
      : "text-slate-600 hover:text-slate-900 font-medium"

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <span className="text-xl font-bold text-slate-900">
          KodeCamp 6.0
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {navArray.map((link) => (
            <li key={link.path}>
              <NavLink className={getLinkClass} to={link.path}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block w-6 h-0.5 bg-slate-700"></span>
          <span className="block w-6 h-0.5 bg-slate-700"></span>
          <span className="block w-6 h-0.5 bg-slate-700"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 px-4 list-none m-0 p-0">
          {navArray.map((link) => (
            <li key={link.path}>
              <NavLink
                className={getLinkClass}
                to={link.path}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar