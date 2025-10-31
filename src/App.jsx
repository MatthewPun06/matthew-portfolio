import React, { useState, useEffect , useRef} from 'react';
import { HashRouter as Router, Route, Routes, Link, useLocation , useNavigate} from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import {
  FiHome,
  FiFolder,
  FiBookOpen,
  FiUser,
  FiMusic,
  FiSun,
  FiMoon,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiEdit
} from 'react-icons/fi';
import {
  MdCoffee
} from 'react-icons/md';
import {
  IoCloseCircleOutline
} from 'react-icons/io5';

// Importing main page components
import Home from './Home.jsx';
import Projects from './Projects.jsx';
import DevLog from './DevLog.jsx';
import About from './About.jsx';
import Blog from './Blog.jsx';
// import Music from './Music.jsx';

// Navigation items with icons and routes
const navItems = [
  { label: 'home', to: '/', icon: <FiHome size={20} /> },
  { label: 'projects', to: '/projects', icon: <FiFolder size={20} /> },
  { label: 'game dev log', to: '/devlog', icon: <FiBookOpen size={20} /> },
  { label: 'about', to: '/about', icon: <FiUser size={20} /> },
  { label: 'blog', to: '/blog', icon: <FiEdit size={20} /> },
  // { label: 'music', to: '/music', icon: <FiMusic size={20} /> },
];

function useIsSmallScreen(maxWidth = 1024) { // default: treat <1024px as mobile mode
    const [isSmall, setIsSmall] = useState(window.innerWidth < maxWidth);

    useEffect(() => {
      const onResize = () => setIsSmall(window.innerWidth < maxWidth);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, [maxWidth]);

    return isSmall;
  }
  
function App() {
  const isSmallScreen = useIsSmallScreen();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('day');

  const bgImage = theme === 'day' ? '/images/bamboo.jpg' : '/images/nightcity.jpg';
  
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'day' ? 'night' : 'day');
  };

  return (
    <Router>
      <div
        className={`min-h-screen flex transition-colors duration-700
          ${theme === 'day' ? 'bg-dayBg text-dayPrimary' : 'bg-nightBg text-nightPrimary'}`}
      >
        {/* Mobile Header */}
        {isSmallScreen && (
          <header
            className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 shadow-md w-full z-20
              ${theme === 'day' ? 'bg-dayBg text-dayAccent' : 'bg-nightBg text-nightAccent'}`}
          >
            <button
              aria-label="Open menu"
              className={`text-3xl p-1 rounded-md text-dayAccent ${theme === 'day' ? 'hover:bg-dayAccent hover:text-dayBg' : 'hover:bg-dayAccent hover:text-nightBg'} transition`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MdCoffee />
            </button>
            <span className={`text-2xl font-extrabold select-none ${theme==='day' ? 'text-dayPrimary' : 'text-nightPrimary'}`}>matthew pun</span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`px-3 py-1 rounded-md font-semibold
                ${theme === 'day' ? 'bg-dayAccent text-dayBg hover:bg-dayPrimary' : 'bg-nightAccent text-nightBg hover:bg-nightPrimary'}
                transition-colors duration-300`}
            >
              {theme === 'day' ? (
                <div className="flex items-center space-x-2">
                  <FiMoon /> <span className="hidden sm:inline">Night</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <FiSun /> <span className="hidden sm:inline">Day</span>
                </div>
              )}
            </button>
          </header>
        )}
        {/* Left Sidebar on Desktop */}
        {!isSmallScreen && (
          <aside
            className={`w-72 flex flex-col justify-between bg-dayBg z-20
              p-8
              fixed
              top-0
              bottom-0
              ${
                theme === 'day'
                  ? 'bg-dayBg text-dayPrimary'
                  : 'bg-nightBg text-nightPrimary'
              }
            `}
          >
            <div>
              {/* Name & Tagline */}
              <h1 className="text-3xl font-extrabold mb-2 select-none">matthew pun</h1>
              <p className="text-sm mb-8 font-medium" style={{ color: theme === 'day' ? '#4A7C59' : '#8C99B1' }}>
                  software engineer
              </p>

              {/* Navigation */}
              <nav className="flex flex-col space-y-4 mb-12">
                {navItems.map(({ label, to, icon }) => (
                  <NavLink key={to} to={to} label={label} icon={icon} theme={theme} />
                ))}
              </nav>

              {/* Social / Contact */}
              <div className="flex space-x-4 text-xl">
                <a
                  href="mailto:matthewpun06@gmail.com"
                  aria-label="Email"
                  className={`hover:text-${theme === 'day' ? 'dayAccent' : 'nightAccent'}`}
                >
                  <FiMail />
                </a>
                <a
                  href="https://github.com/MatthewPun06/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className={`hover:text-${theme === 'day' ? 'dayAccent' : 'nightAccent'}`}
                >
                  <FiGithub />
                </a>
                <a
                  href="https://linkedin.com/in/matthew-pun-b5aa39298/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className={`hover:text-${theme === 'day' ? 'dayAccent' : 'nightAccent'}`}
                >
                  <FiLinkedin />
                </a>
              </div>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`self-start px-4 py-2 rounded-md font-semibold
              ${
                theme === 'day'
                  ? 'bg-dayAccent text-dayBg hover:bg-dayPrimary'
                  : 'bg-nightAccent text-nightBg hover:bg-nightPrimary'
              }
              transition-colors duration-300`}
            >
              {theme === 'day' ? (
                <div className="flex items-center space-x-2">
                  <FiMoon /> <span>Night</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <FiSun /> <span>Day</span>
                </div>
              )}
            </button>
          </aside>
        )}
        {/* Mobile Menu Button */}
        {/* removed floating button; replaced by header button */}
        
        {/* Mobile Fullscreen Menu */}
        {mobileMenuOpen && (
          <div
            className={`w-full flex flex-col justify-between z-20
              p-8
              fixed
              top-0
              bottom-0
              items-center
              text-center
              ${
                theme === 'day'
                  ? 'bg-dayBg text-dayPrimary'
                  : 'bg-nightBg text-nightPrimary'
              }
            `}
          >
            <button
              className={`absolute top-6 right-6 text-4xl font-bold flex items-center justify-center ${'hover:text-dayAccent' } transition`}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <IoCloseCircleOutline />
            </button>
            <div>
              {/* Name & Tagline */}
              <h1 className="text-3xl font-extrabold mb-2 select-none">matthew pun</h1>
              <p className="text-sm mb-8 font-medium" style={{ color: theme === 'day' ? '#4A7C59' : '#8C99B1' }}>
                  software engineer
              </p>

              {/* Navigation */}
              <nav className="flex flex-col items-center space-y-4 mb-12 max-w-[200px]">
                {navItems.map(({ label, to, icon }) => (
                  <NavLink key={to} to={to} label={label} icon={icon} theme={theme} click = {() => setMobileMenuOpen(false)}/>
                ))}
              </nav>

              {/* Social / Contact */}
              <div className="flex flex-row justify-center gap-4 text-xl items-center">
                <a
                  href="mailto:matthewpun06@gmail.com"
                  aria-label="Email"
                  className={`hover:text-${theme === 'day' ? 'dayAccent' : 'nightAccent'}`}
                >
                  <FiMail />
                </a>
                <a
                  href="https://github.com/MatthewPun06/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className={`hover:text-${theme === 'day' ? 'dayAccent' : 'nightAccent'}`}
                >
                  <FiGithub />
                </a>
                <a
                  href="https://linkedin.com/in/matthew-pun-b5aa39298/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className={`hover:text-${theme === 'day' ? 'dayAccent' : 'nightAccent'}`}
                >
                  <FiLinkedin />
                </a>
              </div>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`self-start px-4 py-2 rounded-md font-semibold
              ${
                theme === 'day'
                  ? 'bg-dayAccent text-dayBg hover:bg-dayPrimary'
                  : 'bg-nightAccent text-nightBg hover:bg-nightPrimary'
              }
              transition-colors duration-300`}
            >
              {theme === 'day' ? (
                <div className="flex items-center space-x-2">
                  <FiMoon /> <span>Night</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <FiSun /> <span>Day</span>
                </div>
              )}
            </button>
          </div>
        )}
        {/* Main Content */}
        <main className={`flex-grow relative ${isSmallScreen ? 'ml-0 pt-16' : 'ml-72'}  z-10`}>
            {/* Fixed Background */}
            <img
              src={process.env.PUBLIC_URL + bgImage}
              alt={theme === 'day' ? 'Bamboo forest' : 'Peaceful night city'}
              className="fixed inset-0 w-full h-full object-cover brightness-75"
              style={{ objectPosition: 'center top', zIndex: -1 }}
              aria-hidden="true"
            />
            <div
              className={`fixed inset-0 ${
                theme === 'day' ? 'bg-dayBg/40' : 'bg-nightBg/60'
              }`}
              style={{ zIndex: -1}}
            />
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/projects/*" element={<div className="p-10"><Projects theme={theme} /></div>} />
            <Route path="/devlog" element={<div className="h-auto"><DevLog theme={theme} /></div>} />
            <Route path="/about" element={<About theme={theme} />} />
            {/* <Route path="/music" element={<div className="p-10 max-w-5xl"><Music theme={theme} /></div>} /> */}
            <Route path="/blog" element={<div className="h-auto"><Blog theme={theme} /></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function NavLink({ to, label, icon, theme, click}) {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
  return (
    <Link
      to={to}
      onClick = {click}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md font-semibold cursor-pointer
        transition-colors duration-200
        ${
          isActive
            ? theme === 'day'
              ? 'bg-dayAccent text-dayBg'
              : 'bg-nightAccent text-nightBg'
            : theme === 'day'
            ? 'text-dayPrimary hover:bg-dayAccent hover:text-dayBg'
            : 'text-nightPrimary hover:bg-nightAccent hover:text-nightBg'
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export { useIsSmallScreen };
export default App;