const SocialProof = () => {
  return (
    <section className="w-full mx-auto py-16 px-8 bg-gradient-to-b from-white to-primary">
      <h2 className="text-2xl font-bold text-center mb-8">Featured On</h2>
      <div className="flex justify-center items-center gap-8 flex-wrap">
        <a 
          href="https://indievoice.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <img 
            src="https://1f08bbd99d1a620c734d44a7ea6c9651.cdn.bubble.io/f1732389027701x897901387835433300/find_us.png" 
            alt="IndieVoice Embed Badge" 
            width="250" 
            height="60" 
            style={{ 
              imageRendering: '-webkit-optimize-contrast'
            }}
          />
        </a>
        {/* Add more social proof items here as needed */}
      </div>
    </section>
  );
};

export default SocialProof; 