import React from "react";
import { useEffect, useState , useRef } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useIsSmallScreen } from "./App.jsx";

function BlogContent({ filePath }) {
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(filePath);
        const text = await response.text();
        const paras = text.split('\n'); // split on blank lines
        setParagraphs(paras);
      } catch (err) {
        console.error("Error loading blog:", err);
      }
    })();
  }, [filePath]);

  if (!paragraphs.length) return <p>Loading...</p>;

  return (
    <p className="mt-2">
      {paragraphs.map((para, idx) => (
        <span key={idx}>
          {para}
          <br />
          <br />
        </span>
      ))}
    </p>
  );
}

function Blog({ theme }) {
  const isSmallScreen = useIsSmallScreen();

  const logs = [
    { title: 'rocks', month: 'December', date: '12/15/2025', content: '/blogs/12-7-25.txt' },
    { title: 'reflections', month: 'November', date: '11/9/2025', content: '/blogs/11-9-25.txt' },
    { title: 'stained glass', month: 'October', date: '10/19/2025', content: '/blogs/10-19-25.txt'},
    { title: 'still waters run deep', month: 'October', date: '10/4/2025', content: '/blogs/10-4-25.txt'},
    { title: 'gears', month: 'September', date: '9/19/2025', content: '/blogs/9-19-25.txt' },
    { title: 'cognitive functions', month: 'September', date: '9/6/2025', content: '/blogs/9-6-25.txt'}  
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
            <h3 className={`text-2xl max-w-[150px] text-right font-bold mb-5 pr-0 select-none ${theme === 'day' ? 'text-dayPrimary' : 'text-nightPrimary'}
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
                    <BlogContent filePath={process.env.PUBLIC_URL + log.content} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </motion.section>
  </div>
  );

  // const blogs = [
  //   { title: 'stained glass', month: 'October', date: '10/19/2025', content: '/blogs/10-19-25.txt'},
  //   { title: 'still waters run deep', month: 'October', date: '10/4/2025', content: '/blogs/10-4-25.txt'},
  //   { title: 'gears', month: 'September', date: '9/19/2025', content: '/blogs/9-19-25.txt' },
  //   { title: 'cognitive functions', month: 'September', date: '9/6/2025', content: '/blogs/9-6-25.txt'}
  // ];

  // const isSmallScreen = useIsSmallScreen();

  // const monthRefs = React.useRef([]);

  // const scrollToMonth = (index) => {
  //   const ref = monthRefs.current[index];
  //   if (ref && sectionRef.current) {
  //   const top = ref.offsetTop - 40; // adjust 10 to your desired offset
  //   sectionRef.current.scrollTo({ top, behavior: 'smooth' });
  // };

  // const uniqueMonths = [...new Set(blogs.map(blog => blog.month))];

  // const [activeMonth, setActiveMonth] = React.useState(0);
  // const sectionRef = React.useRef();


  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = sectionRef.current?.scrollTop || 0;
  //     const offsets = monthRefs.current.map(ref => ref?.offsetTop || 0);
  //     let active = 0;
  //     for (let i = 0; i < offsets.length; i++) {
  //       if (scrollTop >= offsets[i] - 160) active = i;
  //     }
  //     setActiveMonth(active);
  //   };
  //   const container = sectionRef.current;
  //   container?.addEventListener('scroll', handleScroll, { passive: true });
  //   handleScroll();
  //   return () => container?.removeEventListener('scroll', handleScroll);
  // }, []);

  // { /* TOC */}
  // const [showTOC, setShowTOC] = useState(true);
  // const [mouseNearRight, setMouseNearRight] = useState(false);
  // let hideTimer = useRef(null);

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     const threshold = 40; // px from right edge
  //     if (window.innerWidth - e.clientX < threshold) {
  //       setMouseNearRight(true);
  //       setShowTOC(true);
  //     } else {
  //       setMouseNearRight(false);
  //       setShowTOC(false);
  //     }
  //   };

  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => window.removeEventListener('mousemove', handleMouseMove);
  // }, []);

  // useEffect(() => {
  //   if (!isSmallScreen) return; // Only mobile
  //   if (!mouseNearRight) return;

  //   const handleScroll = () => {
  //     setShowTOC(true);
  //     clearTimeout(hideTimer.current);
  //     hideTimer.current = setTimeout(() => setShowTOC(false), 2000); // Hide after 1.2s of no scroll
  //   };

  //   const section = sectionRef.current;
  //   if (section) {
  //     section.addEventListener('scroll', handleScroll);
  //   }
  //   return () => {
  //     if (section) section.removeEventListener('scroll', handleScroll);
  //     clearTimeout(hideTimer.current);
  //   };
  // }, [mouseNearRight, isSmallScreen]);

  // return (
  //     <div
  //       className={`flex max-h-screen h-full bg-dayBg`}
  //     >
  //       <AnimatePresence>
  //         {showTOC && (
  //           <motion.div 
  //             initial={{ x: 300, opacity: 0 }}
  //             animate={{ x: 0, opacity: 1 }}
  //             exit={{ x: 200, opacity: 0 }}
  //             transition={{ type: 'spring', stiffness: 150, damping: 30 }}
  //             className="pointer-events-none fixed top-0 pt-10 right-0 bg-dayBg shadow-lg rounded-lg p-6 z-20"
  //             style= {{
  //                 display: 'flex',
  //                 flexDirection: 'column',
  //                 alignItems: 'flex-end',
  //                 width: '300px',
  //                 height: '100vh',
  //                 background: theme === 'day'
  //                 ? 'linear-gradient(to right, rgba(253, 246, 227,0) 0%,rgba(253, 246, 227,0.1) 2%, rgba(253, 246, 227, 0.2) 5%, rgba(253, 246, 227,0.4) 10%, rgba(253,246,227,1) 40%)'
  //                 : 'linear-gradient(to right, rgba(11,18,32,0) 0%, rgba(11,18,32,1) 40%)',
  //             }}>
  //             <h3 className={`text-2xl max-w-[150px] text-right font-bold mb-5 pr-0 select-none ${theme === 'day' ? 'text-dayPrimary' : 'text-nightPrimary'}
  //             ${isSmallScreen ? 'pt-16' : ''}`}>
  //               Table of Contents
  //             </h3>
  //             {uniqueMonths.map((month, i) => (
  //                 <div key={i} className = {``}>
  //                   <button
  //                     onClick={() => scrollToMonth(i)}
  //                     className={`cursor-pointer block w-full text-right text-xl hover:underline font-normal overflow-hidden text-nowrap
  //                       ${i === activeMonth
  //                         ? theme === 'day'
  //                           ? 'text-dayAccent'
  //                           : 'text-nightAccent'
  //                         : theme === 'day'
  //                           ? 'text-dayPrimary'
  //                           : 'text-nightPrimary'
  //                       }
  //                     `}
  //                     style = {{ fontWeight: i === activeMonth ? 'bold' : 'normal' }}
  //                   >
  //                     {month}
  //                   </button>
  //                 </div>
  //               ))}
  //           </motion.div>
  //         )}
  //       </AnimatePresence>
  //       <div className="bg-dayBg hidden md:flex flex-col items-center p-6 pt-10 shadow-lg rounded-lg z-20">

  //       </div>
  //       <motion.section ref={sectionRef}
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.6 }}
  //         className="flex-1 overflow-y-auto p-10 space-y-16 max-h-screen pb-8 ">
  //         {uniqueMonths.map((month, i) => (
  //           <div key={i} ref={el => monthRefs.current[i] = el}>
  //             <div
  //               className={`sticky top-0 p-4 z-10 rounded-xl shadow-md
  //                 ${i === activeMonth
  //                   ? theme === 'day'
  //                     ? 'bg-dayAccent text-dayBg'
  //                     : 'bg-nightAccent text-nightBg'
  //                   : theme === 'day'
  //                     ? 'bg-dayBg text-dayPrimary'
  //                     : 'bg-nightBg text-nightPrimary'
  //                 }
  //               `}
  //             >
  //               {/* Get the first topic for this month, if any */}
  //               {(() => {
  //                 const blog = blogs.find(b => b.month === month);
  //                 return (
  //                   <h2 className="text-3xl font-bold select-none flex items-center gap-4">
  //                     <span>{month}</span>
  //                     {blog && (
  //                       <span className="text-xl font-normal opacity-80">{blog.time}</span>
  //                     )}
  //                   </h2>
  //                 );
  //               })()}
  //             </div>
  //             <div className="space-y-6 mt-4">
  //               {blogs.filter(blog => blog.month === month).map((blog, j) => (
  //                 <article
  //                   key={j}
  //                   className={`p-6 rounded-xl shadow-md
  //                     ${theme === 'day' ? 'bg-dayBg text-dayPrimary' : 'bg-nightBg text-nightPrimary'}
  //                   `}
  //                 >
  //                   <h3 className="font-semibold mb-1">{blog.title}</h3>
  //                   <time className="text-sm text-gray-500">{blog.time}</time>
  //                   <p className="mt-2">
  //                     <BlogContent filePath={process.env.PUBLIC_URL + blog.content} />
  //                   </p>
  //                 </article>
  //               ))}
  //             </div>
  //           </div>
  //         ))}
  //       </motion.section>
  //   </div>
  //   );
  // }
}
export default Blog;