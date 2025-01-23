import { Suspense } from 'react';
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Hero from "@/components/Landing/Hero";
import FeaturesAccordion from "@/components/Landing/FeaturesAccordion";
// import TimeSavings from "@/components/Landing/TimeSavings";
import SocialProof from "@/components/Landing/SocialProof";
import VideoGallery from "@/components/Landing/VideoGallery";

const LandingPage = () => {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <Hero type="quizLanding" />
      <VideoGallery type="landing" />
      {/* <TimeSavings /> */}
      <FeaturesAccordion 
        type="teachers" 
        title="Everything you need to create engaging quizzes" 
      />
      <SocialProof />
      <Footer />
    </>
  );
};

export default LandingPage;
