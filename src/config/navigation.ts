export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Doctors",
    href: "/doctors",
    children: [
      {
        label: "All Doctors",
        href: "/doctors",
      },
      {
        label: "Psychiatry",
        href: "/specialties/psychiatry",
      },
      {
        label: "Neurology",
        href: "/specialties/neurology",
      },
      {
        label: "Psychology",
        href: "/specialties/psychology",
      },
      {
        label: "Other Specialties",
        href: "/specialties",
      },
    ],
  },

  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Mental Health",
        href: "/services/mental-health",
      },
      {
        label: "Neuroscience",
        href: "/services/neuroscience",
      },
      {
        label: "Online Consultation",
        href: "/services/online-consultation",
      },
      {
        label: "All Services",
        href: "/services",
      },
    ],
  },

  {
    label: "About",
    href: "/about",
  },

  {
    label: "Contact",
    href: "/contact",
  },
];