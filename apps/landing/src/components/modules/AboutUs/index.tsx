import { Developers } from "./developers";
import { ProjectTimeLine } from "./time-line";

function AboutUsModule() {
  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="w-full max-w-7xl">
        <ProjectTimeLine />
      </div>
      <Developers />
    </div>
  );
}
export default AboutUsModule;
