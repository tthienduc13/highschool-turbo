import { toast } from "sonner";

import { useEffect, useState } from "react";

import { IconCheck, IconRefresh, IconWifiOff } from "@tabler/icons-react";

function useNetwork() {
  const [isOnline, setNetwork] = useState<boolean>(navigator.onLine);

  const checkNetworkStatus = () => {
    setNetwork(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, []);

  return isOnline;
}

export const NetworkStatusNotifier = () => {
  const isOnline = useNetwork();
  const [wasOffline, setWasOffline] = useState<boolean>(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true); // Track if the user went offline
      const now = new Date();
      toast("Bạn bị mất kết nối mạng", {
        description: `Kiểm tra lần cuối vào lúc ${now.toLocaleTimeString()}`,
        icon: <IconWifiOff size={20} className="text-destructive" />,
        action: {
          label: "Thử lại",
          onClick: () => {
            toast("Đang kết nối lại...", {
              description: "Vui lòng chờ...",
              icon: <IconRefresh size={20} className="animate-spin" />,
            });
            setTimeout(() => {
              if (navigator.onLine) {
                toast.success("Kết nối lại thành công!", {
                  icon: <IconCheck size={20} className="text-emerald-700" />,
                });
              } else {
                toast.error("Vẫn không có kết nối. Vui lòng thử lại.", {
                  icon: <IconWifiOff size={20} className="text-destructive" />,
                });
              }
            }, 1000);
          },
        },
      });
    } else if (wasOffline) {
      toast.success("Bạn đã kết nối mạng trở lại", {
        icon: <IconCheck size={20} className="text-emerald-700" />,
      });
      setWasOffline(false);
    }
  }, [isOnline, wasOffline]);

  return null;
};
