import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

export function useColorMode(lightColor: string, darkColor: string) {
  const { theme } = useTheme();
  const [color, setColor] = useState(lightColor);

  useEffect(() => {
    setColor(theme === "dark" ? darkColor : lightColor);
  }, [theme, lightColor, darkColor]);

  return color;
}

export default useColorMode;
