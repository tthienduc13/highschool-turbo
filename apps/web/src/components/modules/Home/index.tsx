import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";

import { Activities } from "./activities";
import { FinishProfile } from "./finish-profile";
import { RecentView } from "./recent-view";
import { TopFlascard } from "./top-flashcard";

function HomeModule() {
  return (
    <WithFooter>
      <Container maxWidth="7xl" className="flex flex-col gap-12">
        <FinishProfile />
        <RecentView />
        <TopFlascard />
        <Activities />
      </Container>
    </WithFooter>
  );
}
export default HomeModule;
