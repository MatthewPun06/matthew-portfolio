import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useIsSmallScreen from './App.jsx';
function DevLog({ theme }) {

  const isSmallScreen = useIsSmallScreen();

  const logs = [
    { month: 'Introduction', title: 'Inspiration', content: 'In 2017, Xenoblade Chronicles 2 was released on the Nintendo Switch when I was in 6th Grade. Its characters, story, and world had a profound impact on my world, reframing my perspective on life, relationships, and my own future. Since then, I have picked up the other games in the series, and they have inspired my to create my own video game in the hopes of being able to share the lessons I\'ve learned and will learn throughout my life and that feeling I got when I first played Xenoblade.\n\nI hope you will follow along with me on my journey and have fun with the prototypes coming soon!' },
    
    { month: 'October 2025', topic: 'UI Update', date: '2025-10-15', title: 'UI Functionality', content: 'Reimplemented UI Functionality by fixing bugs in problems with focusing and input consumption. The tabs at the top now work and the UI for each tab was updated to match previous diagrams', image: '/images/uifunctionality.jpg' },

    { month: 'September 2025', topic: 'World Building', date: '2025-09-31', title: 'Terrain Practice', content: 'Started to play around with the terrain tools provided by Unreal Engine. Created a landscape that could be used for beta testing and even be the starting area for the actual game', image: '/images/terrain0.jpg' },
    { month: 'September 2025', topic: 'Quest System', date: '2025-09-31', title: 'Quest System Outline', content: 'Created an Object-Oriented Quest System that also uses concepts of Functional Programming to distribute quest rewards, update quest objectives, and add quests to the party list', image: '/images/questoutline.jpg' },
    
    { month: 'August 2025', topic: 'Battle System Refinement', date: '2025-08-7', title: 'Vanguard and Rearguard Switching', content: 'Allows the player to pair up party members and switch their stances, having them access new abilities', image: '/images/vanguardswitch.jpg' },

    { month: 'July 2025', topic: 'Prototype Battle System', date: '2025-07-31', title: 'Stat Buffs and Debuffs', content: 'Created Buff and Debuff objects that change the stats and HP of their targets using timers', image: '/images/buffs.jpg' },
    { month: 'July 2025', topic: 'Prototype Battle System', date: '2025-07-31', title: 'Abilities and Attacks', content: 'Structured Abilities to play attacks with a user, target, and complex damage formula', image: '/images/battlesystemprototype1.jpg' },
    { month: 'July 2025', topic: 'Prototype Battle System', date: '2025-07-31', title: 'Enemy Death and Memory Management', content: 'Destroy enemy object upon reaching 0 HP to manage memory and fix the associated segmentation fault errors', image: '/images/enemydeath.jpg' },

    { month: 'June 2025', topic: 'UI and Battle System', date: '2025-06-30', title: 'HUD Prototype', content: 'Implemented a basic HUD with a minimap, location names, and placeholders for other UI elements', image: '/images/hudprototype.jpg' },
    { month: 'June 2025', topic: 'UI and Battle System', date: '2025-06-30', title: 'Battle System Overhead', content: 'Laid out the overhead for managing enemy interactions and starting combat', image: '/images/battlesystemoverhead.jpg' },
    { month: 'June 2025', topic: 'UI and Battle System', date: '2025-06-30', title: 'Battle System Outline', content: 'Outlined the main parts and structure of the battle system and its combatants', image: '/images/battlesystemoutline.jpg' },
    { month: 'June 2025', topic: 'UI and Battle System', date: '2025-06-30', title: 'Battle System Ideas', content: 'Conceptualized the main structures, flow, and mechanics of the battle system', image: '/images/battlesystemideas.jpg' },
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

  { /* Mobile TOC */}
  const [showTOC, setShowTOC] = useState(true);
  const [mouseNearRight, setMouseNearRight] = useState(false);
  let hideTimer = useRef(null);

  useEffect(() => {
  const handleMouseMove = (e) => {
    const threshold = 40; // px from right edge
    if (window.innerWidth - e.clientX < threshold) {
      setMouseNearRight(true);
      setShowTOC(true);
    } else {
      setMouseNearRight(false);
      setShowTOC(false);
    }
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);

  useEffect(() => {
    if (!isSmallScreen) return; // Only mobile
    if (!mouseNearRight) return;

    const handleScroll = () => {
      setShowTOC(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setShowTOC(false), 2000); // Hide after 1.2s of no scroll
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (section) section.removeEventListener('scroll', handleScroll);
      clearTimeout(hideTimer.current);
    };
  }, [mouseNearRight, isSmallScreen]);

  return (
    <div
      className={`flex max-h-screen h-full`}
    >

      <motion.section ref={sectionRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 overflow-y-auto p-10 space-y-16 max-h-screen pb-8 ">
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
                    ${theme === 'day' ? 'bg-dayBg text-dayPrimary' : 'bg-nightBg text-nightPrimary'}
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
                      src={process.env.PUBLIC_URL + log.image}
                      alt={log.title}
                      className="mt-4 rounded-lg shadow-sm max-w-full h-auto"
                    />
                  )}  
                </article>
              ))}
            </div>
          </div>
        ))}
      </motion.section>

      <AnimatePresence>
        {showTOC && (
          <motion.div 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 30 }}
            className="fixed top-0 pt-10 right-0 bg-dayBg shadow-lg rounded-lg p-6 z-20"
            style= {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '300px',
                height: '100vh',
                background: theme === 'day'
                ? 'linear-gradient(to right, rgba(253, 246, 227,0) 0%,rgba(253, 246, 227,0.1) 2%, rgba(253, 246, 227, 0.2) 5%, rgba(253, 246, 227,0.4) 10%, rgba(253,246,227,1) 40%)'
                : 'linear-gradient(to right, rgba(11,18,32,0) 0%, rgba(11,18,32,1) 40%)',
            }}>
            <h3 className={`text-2xl max-w-[150px] text-right font-bold mb-5 pt-16 pr-0 select-none ${theme === 'day' ? 'text-dayPrimary' : 'text-nightPrimary'}
            ${isSmallScreen ? 'pt-16' : ''}`}>
              Table of Contents
            </h3>
            {uniqueMonths.map((month, i) => (
                <div key={i} className = {``}>
                  <button
                    onClick={() => scrollToMonth(i)}
                    className={`cursor-pointer block w-full text-right text-xl hover:underline font-normal overflow-hidden text-nowrap
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
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
  </div>
  );
}
export default DevLog;