import { Routes, Route } from 'react-router-dom';
import ProjectHome from './projects/ProjectHome.jsx';
import FitnessApp from './projects/FitnessApp.jsx';
import HeartMetrics from './projects/HeartMetrics.jsx';
// import DevLog from './components/projects/DevLog.jsx';
// import About from './components/projects/About.jsx';
// import Music from './components/projects/Music.jsx';
function Projects({ theme }) {
  return (
      <Routes>
        <Route path="/" element={<ProjectHome theme={theme} />} />
        <Route path="/heartmetrics" element={<div className="p"><HeartMetrics theme={theme} /></div>} />
        <Route path="/projects/fitnessApp" element={<div className="p"><FitnessApp theme={theme} /></div>} />
        {/* <Route path="/youtubeDownload" element={<div className="h-auto"><DevLog theme={theme} /></div>} />
        <Route path="/about" element={<About theme={theme} />} />
        <Route path="/blog" element={<div className="p-10 max-w-5xl"><Music theme={theme} /></div>} /> */}
      </Routes>
  );
}
export default Projects;