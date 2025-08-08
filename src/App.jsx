import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
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
} from 'react-icons/fi';

// Navigation items with icons and routes
const navItems = [
  { label: 'home', to: '/', icon: <FiHome size={20} /> },
  { label: 'projects', to: '/projects', icon: <FiFolder size={20} /> },
  { label: 'game dev log', to: '/devlog', icon: <FiBookOpen size={20} /> },
  { label: 'about', to: '/about', icon: <FiUser size={20} /> },
  // { label: 'music', to: '/music', icon: <FiMusic size={20} /> },
];

function App() {
  const [theme, setTheme] = useState('day');

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
        className={`min-h-screen flex text-gray-900 transition-colors duration-700
          ${theme === 'day' ? 'bg-dayBg text-dayPrimary' : 'bg-nightBg text-nightPrimary'}`}
      >
        {/* Left Sidebar */}
        <aside
          className={`w-72 flex flex-col justify-between bg-dayBg z-20
            border-r border-gray-300
            p-8
            fixed
            top-0
            bottom-0
            ${
              theme === 'day'
                ? 'bg-dayBg text-dayPrimary border-gray-400'
                : 'bg-nightBg text-nightPrimary border-gray-700'
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
                href="https://github.com/MatthewPun06"
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

        {/* Main Content */}
        <main className="flex-grow relative ml-72 z-10">
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/projects" element={<div className="p-10 max-w-5xl"><Projects theme={theme} /></div>} />
            <Route path="/devlog" element={<div className="h-screen"><DevLog theme={theme} /></div>} />
            <Route path="/about" element={<About theme={theme} />} />
            {/* <Route path="/music" element={<div className="p-10 max-w-5xl"><Music theme={theme} /></div>} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function NavLink({ to, label, icon, theme }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
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

// === Your page components with minimal tweaks to accept theme and style accordingly ===

function Home({ theme }) {
  const bgImage = theme === 'day' ? '/images/bamboo.jpg' : '/images/nightcity.jpg';

  const cards = [
    {
      title: "Welcome, my name is Matthew Pun",
      content: (
        <>
        <p>I'm a passionate software engineer, game developer, musician, and athlete. I am currently a sophomore at Penn State University studying Computer Science and Mathematics. In my free time, I love running, volleyball, and playing the piano.</p>
        <img
          src="./images/profile.jpg"
          alt="Profile Picture"
          className="rounded-full w-4/5 mx-auto mt-10 mb-5"
           />
        </>
      )
    },
    {
      title: "Skills & Technologies",
      content: (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-base">
          <li>Java / FX / Swing</li>
          <li>HTML / CSS / JS / React</li>
          <li>C / C++ / C#</li>
          <li>Unreal Engine / Blueprint</li>
          <li>SQL / SQL Lite</li>
          <li>Python</li>
          <li>AI Workflow Automation</li>
          <li>UI/UX Design</li>
          <li>French</li>
        </ul>
      )
    },
    {
      title: "Developments",
      content: (
        <div className="text-center">
          <p className="mb-4">Curious about my work?</p>
          <Link to="/projects" className={`underline transition-colors ${theme === 'day'? 'hover:text-dayAccent' : 'hover:text-nightAccent'}`}>
            Check out my projects &rarr;
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Fixed Background */}
      <img
        src={bgImage}
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

      {/* Scrollable Cards Container */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-8 h-full overflow-y-auto, bg-transparent pt-20 mt-20, mb-10">
        <div className="space-y-20" >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`rounded-3xl p-8 shadow-lg backdrop-blur-sm`}
              style={{
                backgroundColor: theme === 'day' ? 'rgba(253, 246, 227, 0.9)' : 'rgba(11, 18, 32, 0.9)',
              }}
            >
              <h2
                className={`text-4xl font-extrabold mb-6 text-center ${theme === 'day' ? 'text-dayAccent' : 'text-nightAccent'}`}
              >
                {card.title}
              </h2>
              <div
                className={`text-lg leading-relaxed text-center ${theme === 'day' ? 'text-dayPrimary' : 'text-nightPrimary'}`}
              >
                {typeof card.content === 'string' ? <p>{card.content}</p> : card.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Projects({ theme }) {
  return (
    <section className="space-y-8">
      <h2
        className="text-3xl font-bold mb-6 select-none"
        style={{ color: theme === 'day' ? '#6B4226' : '#C5D3E0' }}
      >
        Projects
      </h2>
      <ul className="space-y-6">
        <li className={`p-6 rounded-xl shadow-md ${theme === 'day' ? 'bg-white' : 'bg-gray-900'}`}>
          <h3 className={`font-semibold mb-2 ${theme === 'day' ? 'text-dayPrimary' : 'text-nightPrimary'}`}>
            Project 1
          </h3>
          <p className="mb-2">
            A short description of the project.
          </p>
          <a
            href="/downloads/project1.zip"
            className={`text-blue-600 hover:underline ${theme === 'day' ? '' : 'text-blue-400'}`}
          >
            Download
          </a>
        </li>
        <li className={`p-6 rounded-xl shadow-md ${theme === 'day' ? 'bg-white' : 'bg-gray-900'}`}>
          <h3 className={`font-semibold mb-2 ${theme === 'day' ? 'text-dayPrimary' : 'text-nightPrimary'}`}>
            Project 2 (In Progress)
          </h3>
          <p>Update logs and notes here.</p>
        </li>
      </ul>
    </section>
  );
}

function DevLog({ theme }) {
  const logs = [
    { month: 'Introduction', title: 'Inspiration', content: 'In 2017, Xenoblade Chronicles 2 was released on the Nintendo Switch when I was in 6th Grade. Its characters, story, and world had a profound impact on my world, reframing my perspective on life, relationships, and my own future. Since then, I have picked up the other games in the series, and they have inspired my to create my own video game in the hopes of being able to share the lessons I\'ve learned and will learn throughout my life and that feeling I got when I first played Xenoblade.\n\nI hope you will follow along with me on my journey and have fun with the prototypes coming soon!' },
    
    { month: 'August 2025', topic: 'Battle System Refinement', date: '2025-08-7', title: 'Vanguard and Rearguard Switching', content: 'Allows the player to pair up party members and switch their stances, having them access new abilities' },

    { month: 'July 2025', topic: 'Prototype Battle System', date: '2025-07-31', title: 'Stat Buffs and Debuffs', content: 'Created Buff and Debuff objects that change the stats and HP of their targets using timers' },
    { month: 'July 2025', topic: 'Prototype Battle System', date: '2025-07-31', title: 'Abilities and Attacks', content: 'Structured Abilities to play attacks with a user, target, and complex damage formula' },
    { month: 'July 2025', topic: 'Prototype Battle System', date: '2025-07-31', title: 'Enemy Death and Memory Management', content: 'Destroy enemy object upon reaching 0 HP to manage memory and fix the associated segmentation fault errors' },

    { month: 'June 2025', topic: 'UI and Battle System', date: '2025-06-30', title: 'HUD Prototype', content: 'Implemented a basic HUD with a minimap, location names, and placeholders for other UI elements', image: '/images/hud-screenshot.png' },
    { month: 'June 2025', topic: 'UI and Battle System', date: '2025-06-30', title: 'Battle System Overhead', content: 'Laid out the overhead for managing enemy interactions and starting combat', image: '/images/enemy-management-overhead.png' },
    { month: 'June 2025', topic: 'UI and Battle System', date: '2025-06-30', title: 'Battle System Outline', content: 'Outlined the main parts and structure of the battle system and its combatants', image: '/images/combatant-outline.png' },
    { month: 'June 2025', topic: 'UI and Battle System', date: '2025-06-30', title: 'Battle Sytem Ideas', content: 'Conceptualized the main structures, flow, and mechanics of the battle system', image: '/images/preliminary-battle-system.png' },
  ];

  const monthRefs = React.useRef([]);

  const scrollToMonth = (index) => {
    const ref = monthRefs.current[index];
    if (ref && sectionRef.current) {
    const top = ref.offsetTop - 40; // adjust 10 to your desired offset
    sectionRef.current.scrollTo({ top, behavior: 'smooth' });
}
  };

  const uniqueMonths = [...new Set(logs.map(log => log.month))];

  const [activeMonth, setActiveMonth] = React.useState(0);
  const sectionRef = React.useRef();

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = sectionRef.current?.scrollTop || 0;
      const offsets = monthRefs.current.map(ref => ref?.offsetTop || 0);
      let active = 0;
      for (let i = 0; i < offsets.length; i++) {
        if (scrollTop >= offsets[i] - 160) active = i;
      }
      setActiveMonth(active);
    };
    const container = sectionRef.current;
    container?.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex">
      <aside
        className={`w-1/4 min-w-[200px] p-4 sticky top-0 h-screen overflow-auto
          ${theme === 'day' ? 'bg-dayBg border-r border-gray-400 text-dayPrimary' : 'bg-nightBg border-r border-gray-700 text-nightPrimary'}
        `}
      >
        <h3 className="text-3xl font-bold mt-5 mb-5 select-none">Table of Contents</h3>
        <hr className="mb-5 border-dayPrimary w-full"></hr>
        <ul className="space-y-2">
          {uniqueMonths.map((month, i) => (
            <li key={i}>
              <button
                onClick={() => scrollToMonth(i)}
                className={`cursor-pointer hover:underline font-semibold overflow-hidden text-nowrap
                  ${i === activeMonth
                    ? theme === 'day'
                      ? 'text-dayAccent'
                      : 'text-nightAccent'
                    : theme === 'day'
                      ? 'text-dayPrimary'
                      : 'text-nightPrimary'
                  }
                `}
                style = {{ fontWeight: i === activeMonth ? 'bold' : 'normal' }}
              >
                {month}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section ref={sectionRef} className="flex-1 overflow-y-auto p-8 space-y-16 max-h-screen pb-[100px]">
        {uniqueMonths.map((month, i) => (
          <div key={i} ref={el => monthRefs.current[i] = el}>
            <div
              className={`sticky top-0 p-4 z-10 rounded-xl shadow-md
                ${i === activeMonth
                  ? theme === 'day'
                    ? 'bg-dayAccent text-dayBg'
                    : 'bg-nightAccent text-nightBg'
                  : theme === 'day'
                    ? 'bg-dayBg text-dayPrimary'
                    : 'bg-nightBg text-nightPrimary'
                }
              `}
            >
              {/* Get the first topic for this month, if any */}
              {(() => {
                const firstLog = logs.find(log => log.month === month && log.topic);
                return (
                  <h2 className="text-3xl font-bold select-none flex items-center gap-4">
                    <span>{month}</span>
                    {firstLog && (
                      <span className="text-xl font-normal opacity-80">{firstLog.topic}</span>
                    )}
                  </h2>
                );
              })()}
            </div>
            <div className="space-y-6 mt-4">
              {logs.filter(log => log.month === month).map((log, j) => (
                <article
                  key={j}
                  className={`p-6 rounded-xl shadow-md
                    ${theme === 'day' ? 'bg-white text-dayPrimary' : 'bg-gray-900 text-nightPrimary'}
                  `}
                >
                  <h3 className="font-semibold mb-1">{log.title}</h3>
                  <time className="text-sm text-gray-500">{log.date}</time>
                  <p className="mt-2">
                    {log.content.split('\n').map((para, idx) => (
                      <span key={idx}>
                        {para}
                        <br />
                      </span>
                    ))}
                  </p>
                  {log.image && (
                    <img
                      src={log.image}
                      alt={log.title}
                      className="mt-4 rounded-lg shadow-sm max-w-full h-auto"
                    />
                  )}  
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function About({ theme }) {
  const bgImage = theme === 'day' ? '/images/bamboo.jpg' : '/images/nightcity.jpg';

  const aboutCards = [
    {
      title: "About Me",
      content: (
        <>
          <p>I am currently studying Computer Science and Mathematics at Penn State University. My passion lies in creating immersive experiences through software, games, and music. When I'm not coding, you can find me running, playing volleyball, or playing the piano.</p>
          <img
            src="./images/profile.jpg"
            alt="Profile Picture"
            className="rounded-full w-4/5 mx-auto mt-10 mb-5"
            />
        </>
      )
    },
    {
      title: "My Journey",
      content: "From coding my first program to exploring distant lands, every experience has shaped my perspective as a creator and problem solver."
    },
    {
      title: "Get In Touch",
      content: (
        <div className="text-center">
          <p className="mb-4">Ready to work with me?</p>
          <a
            href="./public/files/Matthew_Pun_Resume.pdf"
            download
            className={`block mx-auto mt-6 w-fit px-6 py-2 rounded-lg font-bold shadow transition-colors duration-200
              ${theme === 'day' ? 'bg-dayAccent text-dayBg hover:bg-dayPrimary' : 'bg-nightAccent text-nightBg hover:bg-nightPrimary'}
              hover:font-bold`}
          >
            Download Résumé
          </a>
        </div>
      )
    },
    {
      title: "Contact Me",
      content: (
        <ContactForm theme={theme} />
      )
    }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Fixed Background */}
      <img
        src={bgImage}
        alt={theme === 'day' ? 'Bamboo forest' : 'Peaceful night city'}
        className="fixed inset-0 w-full h-full object-cover brightness-75"
        style={{ objectPosition: 'center top', zIndex: -2 }}
        aria-hidden="true"
      />
      <div
        className={`fixed inset-0 ${
          theme === 'day' ? 'bg-dayBg/40' : 'bg-nightBg/60'
        }`}
        style={{ zIndex: -1 }}
      />

      {/* Scrollable Cards Container */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-8 h-full overflow-y-auto">
        <div className="space-y-8">
          {aboutCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`rounded-3xl p-8 shadow-lg ${theme === 'day' ? 'bg-dayBg' : 'bg-nightBg'}`}
            >
              <h2
                className={`text-3xl font-extrabold mb-6 text-center ${theme === 'day' ? 'text-dayAccent' : 'text-nightAccent'}`}
              >
                {card.title}
              </h2>
              <div
                className={`text-lg leading-relaxed text-center ${theme === 'day' ? 'text-dayPrimary' : 'text-nightPrimary'}`}
              >
                {typeof card.content === 'string' ? <p>{card.content}</p> : card.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );


function ContactForm({ theme }) {
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('matthewpun06', 'contact-template', e.target, '4lZyAu1gblxvVTq9v')
      .then(() => {
        setSent(true);
        setError(null);
        e.target.reset();
      })
      .catch((err) => {
        setError('Failed to send. Please try again later.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 text-left">
      {sent && <div className="text-green-600 text-center">Message sent! Thank you.</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input type="text" name="user_name" required className={`w-full p-2 rounded border focus:outline-none ${theme === 'day' ? 'bg-white border-dayPrimary' : 'bg-nightBg border-nightPrimary text-nightPrimary'}`} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" name="user_email" required className={`w-full p-2 rounded border focus:outline-none ${theme === 'day' ? 'bg-white border-dayPrimary' : 'bg-nightBg border-nightPrimary text-nightPrimary'}`} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Subject</label>
        <input type="text" name="subject" required className={`w-full p-2 rounded border focus:outline-none ${theme === 'day' ? 'bg-white border-dayPrimary' : 'bg-nightBg border-nightPrimary text-nightPrimary'}`} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Message</label>
        <textarea name="message" required rows={4} className={`w-full p-2 rounded border focus:outline-none ${theme === 'day' ? 'bg-white border-dayPrimary' : 'bg-nightBg border-nightPrimary text-nightPrimary'}`}></textarea>
      </div>
      <button type="submit" className={`w-full py-2 rounded font-bold mt-2 ${theme === 'day' ? 'bg-dayAccent text-dayBg hover:bg-dayPrimary' : 'bg-nightAccent text-nightBg hover:bg-nightPrimary'} transition-colors`}>
        Send Message
      </button>
    </form>
  );
}
}

function Music({ theme }) {
  return (
    <section className="space-y-6 max-w-3xl">
      <h2
        className="text-3xl font-bold select-none"
        style={{ color: theme === 'day' ? '#6B4226' : '#C5D3E0' }}
      >
        Music
      </h2>
      <p>Here are some of my piano and violin recordings.</p>
      <audio controls src="/music/piano1.mp3" className="w-full max-w-lg rounded-lg" />
      <audio controls src="/music/violin1.mp3" className="w-full max-w-lg rounded-lg" />
    </section>
  );
}

export default App;