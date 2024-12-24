import { FinishProfile } from "./finish-profile";
import { RecentView } from "./recent-view";
import { TopFlascard } from "./top-flashcard";

function HomeModule() {
    return (
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
            <FinishProfile />
            <RecentView />
            <TopFlascard />
        </div>
    );
}
export default HomeModule;
