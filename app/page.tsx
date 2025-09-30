import { HeroSection } from "../../components/(public)/home/hero-section"
import { AboutSection } from "../../components/(public)/home/about-section"
import { CoursesSection } from "../../components/(public)/home/courses-section"
import { EventsSection } from "../../components/(public)/home/events-section"
import { ContactSection } from "../../components/(public)/home/contact-section"
import { TestimonialsSection } from "../../components/(public)/home/testimonials-section"
import { PhilosophySection } from "../../components/(public)/home/philosophy-section"


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PhilosophySection/>
      
      <CoursesSection />
      <AboutSection />  
      <EventsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  )
}
