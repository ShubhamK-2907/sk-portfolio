import { Hero } from '@/app/components/sections/hero';
import { About } from '@/app/components/sections/about';
import { Experience } from '@/app/components/sections/experience';
import { Projects } from '@/app/components/sections/projects';
import { Contact } from '@/app/components/sections/contact';
import {MyPicture} from "@/app/components/sections/myPicture";
import {Skills} from "@/app/components/sections/skills";

export default function Home() {
  return (
      <>
          <Hero/>
          <About/>
          <Skills/>
          <MyPicture/>
          <div className="w-full overflow-x-hidden">
              <Experience/>
          </div>
          <Projects/>
          <Contact/>
      </>
  );
}