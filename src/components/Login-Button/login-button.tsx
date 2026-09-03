import { Button } from "../ui/button";

import { HugeiconsIcon, LoginIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface LoginButtonProps {
  onLogin: () => void;
}

export const LoginButton = ({ onLogin }: LoginButtonProps) => {
  return (
    <Button variant="default" onClick={onLogin}>
      <HugeiconsIcon
        icon={LoginIcon}
        strokeWidth={2}
        className="size-5 shrink-0"
      />
      Login
    </Button>
  );
};
