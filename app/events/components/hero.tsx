import MaxWidthWrapper from '@/components/max-width-wrapper';

export default function EventsHero() {
  return (
    <section className="relative  py-16 sm:py-20 md:py-24 overflow-hidden bg-gray-900">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/events-bg.webp')`,
        }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <MaxWidthWrapper className="relative z-10">
        <div className="text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Community Events
          </h1>
          <p className="text-lg sm:text-xl md:text-xl max-w-3xl mx-auto text-gray-100 px-4 leading-relaxed">
            Join us in creating meaningful connections and experiences. Discover
            upcoming events and community activities at Novel Care Services.
          </p>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
