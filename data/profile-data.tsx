import { Mail, Phone, MapPin, Globe } from "lucide-react"

export const profileData = {
  name: "Anshan Haso",
  role: "Project Manager",
  avatar: "/placeholder.svg?height=128&width=128",
  badge: "Pro",
  stats: [
    { value: 184, label: "Posts" },
    { value: 32, label: "Projects" },
    { value: "4.5K", label: "Members" },
  ],
  contactInfo: [
    {
      icon: <Mail className="w-5 h-5 text-muted-foreground" />,
      content: "anshan@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-muted-foreground" />,
      content: "(+1-876) 8654 239 581",
    },
    {
      icon: <MapPin className="w-5 h-5 text-muted-foreground" />,
      content: "New York",
    },
    {
      icon: <Globe className="w-5 h-5 text-muted-foreground" />,
      content: "https://shadcnuikit.com",
      isLink: true,
      href: "https://shadcnuikit.com",
    },
  ],
  profileCompletion: {
    title: "Complete Your Profile",
    progress: 65,
  },
  skills: {
    title: "Skills",
    list: ["Photoshop", "Figma", "HTML", "React", "Tailwind CSS", "CSS", "Laravel", "Node.js"],
  },
  activities: {
    title: "Latest Activity",
    viewAllLink: "#",
    list: [
      {
        title: "Shadcn UI Kit Application UI v2.0.0",
        date: "Released on January 13th, 2022",
        description:
          "Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.",
        isLatest: true,
        hasDownload: true,
      },
      {
        title: "Shadcn UI Kit Figma v1.3.0",
        date: "Released on December 7th, 2021",
        description:
          "All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.",
      },
      {
        title: "Shadcn UI Kit Library v1.2.2",
        date: "Released on December 2nd, 2021",
        description: "Get started with dozens of web components and interactive elements built on top of Tailwind CSS.",
      },
    ],
  },
  aboutMe: {
    title: "About Me",
    highlightedText:
      "Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family.",
    regularText:
      "You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. This may be the most commonly encountered tip I received from the designers I spoke with. They highly encourage that you use different fonts in one design, but do not over-exaggerate and go overboard.",
  },
  connections: {
    title: "Connections",
    list: [
      {
        id: "1",
        initials: "OD",
        name: "Olivia Davis",
        email: "olivia.davis@example.com",
        isConnected: false,
      },
      {
        id: "2",
        initials: "JD",
        name: "John Doe",
        email: "john.doe@example.com",
        isConnected: false,
      },
      {
        id: "3",
        initials: "AS",
        name: "Alice Smith",
        email: "alice.smith@example.com",
        isConnected: false,
      },
      {
        id: "4",
        initials: "MJ",
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        isConnected: false,
      },
      {
        id: "5",
        initials: "EM",
        name: "Emily Martinez",
        email: "emily.martinez@example.com",
        isConnected: true,
      },
      {
        id: "6",
        initials: "JW",
        name: "James Wilson",
        email: "james.wilson@example.com",
        isConnected: true,
      },
    ],
  },
}

