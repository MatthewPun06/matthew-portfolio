import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home({ theme}) {

  const cards = [
    {
      title: "Welcome, my name is Matthew Pun",
      content: (
        <>
        <p>I'm a passionate software engineer, game developer, musician, and athlete. I am currently a sophomore at Penn State University studying Computer Science and Mathematics. In my free time, I love running, volleyball, and playing the piano.</p>
        <img
          src={process.env.PUBLIC_URL + `${theme === 'day' ? '/images/profile.jpg' : '/images/profilenight.jpg'}`}
          alt="Profile Picture"
          className="rounded-full w-4/5 mx-auto mt-10 mb-5"
           />
        </>
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

      {/* Scrollable Cards Container */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-12 py-8 h-full overflow-y-auto, bg-transparent pt-20 mt-20, mb-10">
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

export default Home;