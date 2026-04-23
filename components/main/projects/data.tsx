interface Project {
  name: string;
  description: string;
  tech: string[];
  highlights?: string[];
  image?: string;
}

export const projects: Project[] = [
  {
    name: "Go Negosyo MBA Learning Management System",
    description:
      "Learning Management System conversion from React Portal to Next.js 15 with TypeScript, improving performance, maintainability, and scalability.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "ExpressJS",
      "MongoDB",
      "Bitbucket",
      "Jira",
    ],
    highlights: [
      "Full LMS functionality",
      "Course management",
      "Student progress tracking",
    ],
  },
  {
    name: "Unleash PH Admin Portal",
    description:
      "Administrative dashboard for managing content, users, and system settings with role-based access control.",
    tech: [
      "NextJS",
      "TypeScript",
      "Express.js",
      "MongoDB",
      "ExpressJS",
      "MongoDB",
      "Bitbucket",
      "Jira",
      "Leaflet",
    ],
    highlights: [
      "Role-based access",
      "Content management",
      "Analytics dashboard",
    ],
  },
  {
    name: "Makati Waste Management System Admin Portal",
    description:
      "Admin portal for waste management operations, including collection scheduling and reporting.",
    tech: [
      "NextJS",
      "NestJS",
      "PostgreSQL",
      "Chart.js",
      "Azure App Services",
      "CI/CD Pipepline",
      "SQL Server Management",
    ],
    highlights: [
      "Collection scheduling",
      "Route optimization",
      "Real-time reporting",
    ],
  },
  {
    name: "Plant AI – Admin Panel",
    description:
      "Main developer responsible for continuing the project. Implemented dashboard features, user management, and data visualization. Optimized workflows and added new functionalities based on stakeholder requirements.",
    tech: [
      "NextJS",
      "NestJS",
      "Chart.js",
      "Tailwind",
      "TypeScript",
      "ExpressJS",
      "MongoDB",
      "Bitbucket",
      "Jira",
      "Leaflet",
      "Socket.io",
    ],
    highlights: [
      "Dashboard features",
      "User management",
      "Image Annotation",
      "AI Training & Inferrence",
      "Data visualization",
      "Workflow optimization",
    ],
  },
  {
    name: "Night Pulse – Admin & LED Screen Dashboard",
    description:
      "Built and maintained real-time LED display dashboard. Developed admin panel for managing content, schedules, and system monitoring. Ensured responsive UI and smooth integration with back-end services.",
    tech: ["NextJS", "Socket.io", "Express.js", "Node.js"],
    highlights: [
      "Real-time LED display",
      "Content scheduling",
      "System monitoring",
      "Responsive UI",
    ],
  },
  {
    name: "Unleash - E-Commerce Website",
    description:
      "Modern e-commerce landing page with product showcase and conversion-focused design. Implemented inside the Unleash Mobile App as a webview",
    tech: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Leaflet",
      "ExpressJS",
      "MongoDB",
      "Bitbucket",
      "Jira",
      "Leaflet",
    ],
    highlights: [
      "Product showcase",
      "Responsive design",
      "Performance optimized",
      "Bug Fixing",
      "Feature Development",
    ],
  },
  {
    name: "Unleash Landing Page - unleash.ph (old and new)",
    description:
      "Modern e-commerce landing page with product showcase and conversion-focused design.",
    tech: ["NextJS", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Product showcase",
      "Responsive design",
      "Performance optimized",
    ],
  },
  {
    name: "Medieval Village Explorer",
    description:
      "A 3D medieval world built with Three.js, featuring two villages, monsters with dialog, and first-person exploration.",
    tech: ["Three.js", "Next.js", "TypeScript"],
    highlights: ["3D environment", "First-person controls", "Interactive NPCs"],
  },
  {
    name: "Nextsys IT Solutions website - nextsystech.com",
    description: "Create the website for a startup company",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    highlights: [
      "Product showcase",
      "Responsive design",
      "Performance optimized",
    ],
  },
  {
    name: "Mobile App Development - Flutter",
    description:
      "Polishing and enhancing mobile applications built with Flutter for cross-platform deployment.",
    tech: ["Flutter", "Dart", "Firebase"],
    highlights: ["Cross-platform", "UI polishing", "Performance optimization"],
  },
];
