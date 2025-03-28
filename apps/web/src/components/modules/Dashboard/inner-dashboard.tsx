import { Calendar } from "./calendar";
import ActivityHeatMap from "./heatmap";
import { ProfileArea } from "./profile-area";
import Stats from "./stats";

export const InnerDashboard = () => {
  return (
    <div className="flex flex-col gap-12 ">
      <ProfileArea />
      <div className=" flex w-full flex-1 flex-col gap-12">
        <Stats />
        <ActivityHeatMap />
        <Calendar />
      </div>
    </div>
  );
};
