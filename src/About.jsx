import React from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

function About({ theme }) {

  const aboutCards = [
    {
      title: "About Me",
      content: (
        <>
          <p>I am currently studying Computer Science and Mathematics at Penn State University. My passion lies in creating immersive experiences through software, games, and music. When I'm not coding, you can find me running, playing volleyball, or playing the piano.</p>
          <img
            src={process.env.PUBLIC_URL + `${theme === 'day' ? '/images/profile.jpg' : '/images/profilenight.jpg'}`}
            alt="Profile Picture"
            className="rounded-full w-4/5 mx-auto mt-10 mb-5"
            />
        </>
      )
    },
    {
      title: "My Background",
      content: (
        <div className="text-left">
          <p>
            I grew up in Delaware County, Pennsylvania, and I graduated from Garnet Valley High School. There, I developed a love for mathematics, the sciences, music, performance, writing, and sports. 
            However, with the extreme diversity of my hobbies and interests, I often find myself searching for a way to bridge these passions together.
          </p>

          <p className="mt-4">
            Now pursuing my education at Penn State University, I am readily embracing the breadth of my curiosity through things as simple as singing while running or as complex as integrating my life's lessons into the story of a video game, but
            nonetheless, the cross-section of my interests has been an invaluable source of inspiration and learning for me.
            As a Presidential Leader in the Presidential Leadership Academy (PLA) at Penn State, I have been given the opportunity to develop my personal, professional, and leadership skills while working with a diverse group of talented individuals who share my passion for making a positive impact in the world.
            This program has embranced my curiosity like no other through its interdisciplinary approach to learning and creating impact.
            Every day, I encounter new perspectives and ideas that spark new channels of curiosity I hadn't considered before, and it allows me to develop frameworks for thinking, learning, and leading that I can apply to every aspect of my life.
            
          </p>

          <p className="mt-4">
            In my work, you will find me constantly seeking growth and development, intertwining the extents technical excellence and creativity.
            My passion will shine through in all the small details, whether it be a single note in my music or a little cup of matcha in the corner of my website :).
            I strive to paint the world in vibrant meaning, sharing my love for the world with anyone that interacts with my work.
          </p>

          <p className="mt-4">
              I am excited to see where this journey takes me, and I look forward to sharing my work with the world.
            </p>
          
        </div>
      ),
    },
    {
      title: "Skills",
      content: (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-base">
          <li>Java / FX / Swing</li>
          <li>HTML / CSS / JS / React</li>
          <li>C / C++ / C#</li>
          <li>Unreal Engine / Blueprint</li>
          <li>SQL / SQL Lite</li>
          <li>Python</li>
          <li>AI Workflow Optimization</li>
          <li>UI/UX Design</li>
          <li>French</li>
        </ul>
      )
    },
    {
      title: "Get In Touch",
      content: (
        <div className="text-center">
          <p className="mb-4">Ready to work with me?</p>
          <a
            href="./files/Matthew_Pun_Resume.pdf"
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

      {/* Scrollable Cards Container */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-12 py-20 h-full overflow-y-auto">
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
export default About;