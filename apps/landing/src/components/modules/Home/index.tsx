import { Banner } from "./banner";
import { Features } from "./features";
import { GettingStarted } from "./getting-started";
import { Info } from "./info";

function HomeModule() {
  return (
    <>
      <Banner />
      <Features />
      {/* <FeedBack /> */}
      <Info />
      <GettingStarted />
    </>
  );
}

export default HomeModule;
