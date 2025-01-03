import { Banner } from "./banner";
import { Features } from "./features";
import { FeedBack } from "./feed-back";
import { Subscribe } from "./subscribe";

function HomeModule() {
  return (
    <>
      <Banner />
      <Features />
      <FeedBack />
      <Subscribe />
    </>
  );
}

export default HomeModule;
