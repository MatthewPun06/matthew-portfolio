import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';    
function HeartMetrics({ theme }) {  
    const cards = [
        {
          title: "Introduction ",
          content: (
            <p>
                HeartMetrics is an app designed to facilitate the role of managers in monitoring and improving the health of their teams. 
                It provides a platform to allow managers to gain insights into the overall well-being of their team in order to raise their employees' workplace health index (WHI). 
                The app includes features such as integrations with calendar apps, Jira, and Asana; employee surveys; and an AI agent to assist with analysis and taking action to ensure the well-being of the team.

                <br></br>
                <br></br>
                You can view the project here: <a className={`underline transition-colors ${theme === 'day'? 'hover:text-dayAccent' : 'hover:text-nightAccent'}`} href="
                https://v0-manager-os-prototype.vercel.app/">Website</a>
                <br></br>
                You can also view the front-end on GitHub: <a className={`underline transition-colors ${theme === 'day'? 'hover:text-dayAccent' : 'hover:text-nightAccent'}`} href="https://github.com/kjodhpur/v0-manager-os-prototype?tab=readme-ov-file">Front End</a>
                <br></br>
                You can also view the back-end on GitHub: <a className={`underline transition-colors ${theme === 'day'? 'hover:text-dayAccent' : 'hover:text-nightAccent'}`} href="https://github.com/MatthewPun06/heart-metrics-back-end">Back End</a>
            </p>
          )
        },
        {
          title: "The Team",
          content: (
            <p>
                This project is developed in collaboration with a team as part of IBM's SkillsBuild AI Experiential Learning Lab. You can meet them here:
                <br></br>
                <br></br>
                CEO: <Link style = {{ fontWeight: 'bold'}}className={`underline transition-colors ${theme === 'day'? 'hover:text-dayAccent' : 'hover:text-nightAccent'}`} to="https://www.linkedin.com/in/vipulnavale/">Vipul Navale</Link>
                <br></br>
                CTO and CAIO: <Link style = {{ fontWeight: 'bold'}}className={`underline transition-colors ${theme === 'day'? 'hover:text-dayAccent' : 'hover:text-nightAccent'}`} to="https://www.linkedin.com/in/kjod/">Kanha Jodhpurkar</Link>
                <br></br>
                UX Lead: <Link style = {{ fontWeight: 'bold'}}className={`underline transition-colors ${theme === 'day'? 'hover:text-dayAccent' : 'hover:text-nightAccent'}`} to="https://www.linkedin.com/in/britneywang/">Britney Wang</Link>
                <br></br>
                Industry SME: <Link style = {{ fontWeight: 'bold'}}className={`underline transition-colors ${theme === 'day'? 'hover:text-dayAccent' : 'hover:text-nightAccent'}`} to="https://www.linkedin.com/in/anuhyaaryap/">Anuhya Pennepalli</Link>
                <br></br>
                Software Engineer: <Link style = {{ fontWeight: 'bold'}}className={`underline transition-colors ${theme === 'day'? 'hover:text-dayAccent' : 'hover:text-nightAccent'}`} to="https://www.linkedin.com/in/matthew-pun/">Matthew Pun</Link>
            </p>
          )
        },
        {
            title: "Learning Updates 3/02/26",
            content: (
                <p>
                    Through the IBM SkillsBuild Program, I have completed a course on Unleashing the Power of AI Agents and Retrieval Augmented eneration. 
                    I learned the definition and architecture of AI Agents and the differences between types of AI tools.
                    I also learned how RAG allows AI Agents to be more useful and accurate by retrieving up to date information rather than hallucinating or giving outdated data.
                </p>
            )
        },
        {
            title: "Learning Updates 2/16/26",
            content: (
                <p>
                    Through the IBM SkillsBuild Program, I have completed a course on Enterprise Design Thinking. 
                    I learned about how to uncover and explore user needs, and the importance to cater to user pain points.
                    I also learned about restless reinvention, prototyping, ideation, and iteration in the process of creating a solution. 
                </p>
            )
        }
      ];
  return (
    <div>
        <h2
          className={`text-3xl font-extrabold mb-10 p-5 select-none transition-colors duration-200 ${theme === 'day' ? 'bg-dayAccent text-dayBg' : 'bg-nightAccent text-nightBg'} rounded-xl shadow-md`}
        >
          HeartMetrics
        </h2>
        <div className="relative z-10 w-full   h-full overflow-y-auto, bg-transparent mb-10">
        <div className="space-y-6 mt-4">
              {cards.map((card, j) => (
                <article
                  key={j}
                  className={`p-6 rounded-xl shadow-md
                    ${theme === 'day' ? 'bg-dayBg text-dayPrimary' : 'bg-nightBg text-nightPrimary'}
                  `}
                >
                  <h3 className="font-semibold mb-1">{card.title}</h3>
                  <p className="mt-2">
                    {card.content}
                  </p>
                </article>
              ))}
            </div>
          </div>
      </div>
  )
}
export default HeartMetrics;