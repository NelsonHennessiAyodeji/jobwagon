import { AreaChart, Layers, AppWindow } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const link: NavLink[] = [
  {
    href: "/add-job",
    label: "Add Jobs",
    icon: <Layers />,
  },
  {
    href: "/jobs",
    label: "View Jobs",
    icon: <AppWindow />,
  },
  {
    href: "/stats",
    label: "Statistics",
    icon: <AreaChart />,
  },
];

export default link;
