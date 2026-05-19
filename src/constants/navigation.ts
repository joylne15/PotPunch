export type NavIconKey = "dashboard" | "messages" | "users" | "notfound";

export type NavItem = {
  label: string;
  path: string;
  icon: NavIconKey;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: "dashboard" },
  { label: "Messages", path: "/messages", icon: "messages" },
  { label: "Users", path: "/member", icon: "users" },
  { label: "404", path: "/404", icon: "notfound" },
];
