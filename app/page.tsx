
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContributionSection from '@/components/ContributionSection';
import ContactForm from '@/components/ContactForm';
import BootAnimation from '@/components/BootAnimation';

export default function Home() {
  return (
    <>
      <BootAnimation />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ContributionSection />
      <ContactForm />
    </>
  );
}
