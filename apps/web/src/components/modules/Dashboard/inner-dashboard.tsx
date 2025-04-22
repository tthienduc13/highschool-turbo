import { Calendar } from "./calendar";
import { CareerGuidanceSummary } from "./career-guidance-summary";
import ActivityHeatMap from "./heatmap";
import { ProfileArea } from "./profile-area";
import Stats from "./stats";

export const InnerDashboard = () => {
  return (
    <div className="flex flex-col gap-12 ">
      <ProfileArea />
      <Stats />
      <ActivityHeatMap />
      <CareerGuidanceSummary />
      <Calendar />
      <div className=" flex w-full flex-1 flex-col gap-12" />
    </div>
  );
};
