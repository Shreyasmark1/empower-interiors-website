import { Button } from "../ui/button";

import { HugeiconsIcon, LoginIcon } from "@/lib/icons";

interface LoginButtonProps {
  onLogin: () => void;
}

export type { LoginButtonProps };

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
