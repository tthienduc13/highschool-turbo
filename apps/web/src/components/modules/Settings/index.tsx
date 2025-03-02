import { IconSettings } from "@tabler/icons-react";

import { AvatarSetting } from "./avatar";
import { DangerZone } from "./danger";
import { Notification } from "./notification";
import { Profile } from "./profile";
import { Theme } from "./theme";

import { Container } from "@/components/core/layouts/container";
import { WithFooter } from "@/components/core/common/with-footer";

function SettingsModule() {
  const Divider = () => {
    return <div className="h-px w-full bg-gray-400 dark:bg-gray-600" />;
  };

  return (
    <WithFooter>
      {" "}
      <Container maxWidth="4xl">
        <div className="flex w-full flex-col gap-12">
          <div className="flex items-center gap-3">
            <IconSettings size={32} />
            <h1 className="text-4xl font-bold md:text-5xl">Cài đặt</h1>
          </div>
          <div className="flex flex-col gap-8">
            <AvatarSetting />
            <Divider />
            <Profile />
            <Divider />
            <Theme />
            <Divider />
            <Notification />
            <Divider />
            <DangerZone />
          </div>
        </div>
      </Container>
    </WithFooter>
  );
}

export default SettingsModule;
