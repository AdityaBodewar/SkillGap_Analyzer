// import React from 'react'
// import NavBar from '../Components/NavBar'

// const HomePage = () => {
//   return (
//     <>
//     <NavBar/>
//     </>
//   )
// }

// export default HomePage



import HeroSection from "../Components/landing/HeroSection";
import ResumeUploadSection from "../Components/landing/ResumeUploadSection";
import HowItWorksSection from "../Components/landing/HowItWorksSection"
import FeaturesSection from "../Components/landing/FeatutreSection";
import VisualExplanationSection from "../Components/landing/VisualExplanationSection";
import WhyChooseUsSection from "../Components/landing/WhyChooseUsSection";
import CTASection from "../Components/landing/CTAsection";
import NavBar from '../Components/NavBar'
const HomePage = () => {

  const Token=localStorage.getItem("Token");

if (!Token)
{
   return (
    <div className="min-h-screen gradient-background">
       <NavBar/>
      <HeroSection />
      {/* <ResumeUploadSection /> */}
      {/* <HowItWorksSection />
      <FeaturesSection />
      <VisualExplanationSection />
      <WhyChooseUsSection />
      <CTASection /> */}
    </div>
  );

}
else{
  return (
    <div className="min-h-screen gradient-background">
      <NavBar/>
      <HeroSection />
      {/* <ResumeUploadSection /> */}
      {/* <HowItWorksSection />
      <FeaturesSection />
      <VisualExplanationSection />
      <WhyChooseUsSection /> */}
     
    </div>
  );
}
};

export default HomePage;