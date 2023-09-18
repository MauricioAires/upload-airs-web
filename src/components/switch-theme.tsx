import { useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";

enum SystemTheme {
  "DARK",
  "LIGHT",
}

export function SwitchTheme() {
  const [theme, setTheme] = useState<SystemTheme>(SystemTheme.DARK);

  return (
    <Button
      onClick={() =>
        setTheme((state) => {
          return state === SystemTheme.DARK
            ? SystemTheme.LIGHT
            : SystemTheme.DARK;
        })
      }
      variant="outline"
    >
      {theme === SystemTheme.DARK ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </Button>
  );
}
