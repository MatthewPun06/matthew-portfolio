function FitnessApp({ theme }) {  
  return (
    <section className="space-y-8">
        <h2
          className={`text-3xl font-bold mb-10 p-5 select-none ${theme === 'day' ? 'bg-dayBg text-dayAccent' : 'bg-nightBg text-nightAccent'} rounded-xl shadow-md`}
        >
          Fitness App (In Progress)
        </h2>
        <div className="relative z-10 w-full mx-auto px-0 py-8 h-full overflow-y-auto">
          
        </div>
      </section>
  )
}
export default FitnessApp;