import { Metadata } from "next";

import SettingsModule from "@/components/modules/Settings";

export const metadata: Metadata = {
  title: "Cài đặt tài khoản",
};

function Settings() {
  return <SettingsModule />;
}

export default Settings;
