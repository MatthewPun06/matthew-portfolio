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
export default Music;