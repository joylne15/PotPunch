import type { NavIconKey } from "../../constants/navigation";
import { AlertIcon, DashboardIcon, MessageIcon, UsersIcon } from "./icons";

type NavIconProps = {
  icon: NavIconKey;
  className?: string;
};

export function NavIcon({ icon, className }: NavIconProps) {
  switch (icon) {
    case "dashboard":
      return <DashboardIcon className={className} />;
    case "messages":
      return <MessageIcon className={className} />;
    case "users":
      return <UsersIcon className={className} />;
    default:
      return <AlertIcon className={className} />;
  }
}
