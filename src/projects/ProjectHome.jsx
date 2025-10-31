import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProjectHome({ theme }) {
  const navigate = useNavigate();
  const projectCards = [
    {
      title: "Myria",
      description: "Track your workouts and progress.",
      content: (
        <p>An RPG set in a fantastical world, you follow Kai, a young boy caught in the middle of a war that threatens to consume everything. He travels the world, trying to relieve the suffering and rebuild the ruins of once thriving towns. Grappling with the reailty of the world, his optimism is slowly stripped away from him even as his friends try to realize his dreams with him.</p>
      ),
      canDownload: false,
      downloadFile: '',
      route: "/devlog",
    },
    // {
    //   title: "Fitness App",
    //   description: "Track your workouts and progress.",
    //   content: (
    //     <p>This app allows gamifies fitness, allowing users to log their workouts, track progress over time, and set fitness goals. We used React Native for cross-platform mobile use and used Figma to outline the UI experience, making it extremely intuitive and enjoyable for users to interact with.</p>
    //   ),
    //   canDownload: false,
    //   downloadFile: '',
    //   route: "/projects/fitnessApp",
    // },
  ]
  return (
    <section className="space-y-8">
        <h2
          className={`text-3xl font-extrabold mb-10 p-5 select-none transition-colors duration-200 ${theme === 'day' ? 'bg-dayAccent text-dayBg' : 'bg-nightAccent text-nightBg'} rounded-xl shadow-md`}
        >
          Projects
        </h2>
        <div className="relative z-10 w-full mx-auto px-0 py-8 h-full overflow-y-auto">
          <div className="space-y-8">
            {projectCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`rounded-3xl p-8 shadow-lg ${theme === 'day' ? 'bg-dayBg' : 'bg-nightBg'}`}
              >
                <h2
                  className={`text-3xl font-bold mb-6 ${theme === 'day' ? 'text-dayAccent' : 'text-nightAccent'}`}
                >
                  {card.title}
                </h2>
                <div
                  className={`text-lg ${theme === 'day' ? 'text-dayPrimary' : 'text-nightPrimary'}`}
                >
                  {typeof card.content === 'string' ? <p>{card.content}</p> : card.content}
                </div>

                {/* Download Button */}
                {card.canDownload && (
                  <a
                    href="./projects/"
                    download
                    className={`block mx-auto mt-6 w-fit px-6 py-2 rounded-lg font-bold shadow transition-colors duration-200
                      ${theme === 'day' ? 'bg-dayAccent text-dayBg hover:bg-dayPrimary' : 'bg-nightAccent text-nightBg hover:bg-nightPrimary'}
                      hover:font-bold`}
                  >
                    Download Project
                  </a>
                )}
                {/* Router Button */}
                <button
                onClick={() => navigate(card.route)}
                className={`block mx-auto mt-6 w-fit px-6 py-2 rounded-lg font-bold shadow transition-colors duration-200
                  ${theme === 'day' ? 'bg-dayAccent text-dayBg hover:bg-dayPrimary' : 'bg-nightAccent text-nightBg hover:bg-nightPrimary'}
                  hover:font-bold`}
                >
                  View Project
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}
export default ProjectHome;