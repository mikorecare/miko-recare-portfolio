interface Project {
  name: string;
  description: string;
  tech: string[];
  highlights?: string[];
  image?: string;
  links?: { name: string; url: string }[]; // Array of links
}

export const projects: Project[] = [
  {
    name: "Nextsys IT Solutions Website",
    description:
      "Created a web page for a start up company with futuristic styling and contact feature.",
    tech: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Framer-motion",
      "Resend API",
      "CloudFlare",
      "Vercel",
      "Git",
      "Supabase",
      "Expo",
      "Tanstack Query",
      "Zod",
    ],
    highlights: [
      "Futuristic Appeal",
      "Contact Us working form with security",
      "Secured Form",
      "Mobile Responsive Page",
    ],
    links: [
      { name: "Website", url: "https://nextsystech.com" },
      { name: "GitHub", url: "https://github.com/mikorecare/nextsys" },
    ],
  },
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
      "React-Redux",
      "Joi",
      "Send Grid",
    ],
    highlights: [
      "Full LMS functionality",
      "Course management",
      "Student progress tracking",
    ],
    links: [
      { name: "Demo", url: "https://go-negosyo-web-dev.azurewebsites.net/" },
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
      "Bitbucket",
      "Jira",
      "Leaflet",
      "React-Redux",
      "Joi",
      "Send Grid",
      "Tanstack Query",
      "Azure",
    ],
    highlights: [
      "Role-based access",
      "Content management",
      "Analytics dashboard",
    ],
    links: [{ name: "Admin Demo", url: "portal.unleash.ph" }],
  },
  {
    name: "Makati Waste Management System Admin Portal",
    description:
      "Admin portal for waste management operations, including collection scheduling and reporting.",
    tech: [
      "React Vite",
      "NestJS",
      "PostgreSQL",
      "Chart.js",
      "Azure App Services",
      "CI/CD Pipepline",
      "SQL Server Management",
      "React-Redux",
      "Drizzle",
    ],
    highlights: ["Collection scheduling", "Real-time reporting"],
    links: [
      {
        name: "Live Demo",
        url: "https://makati-waste-fe.azurewebsites.net/login",
      },
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
      "React Vite",
      "NestJS",
      "Azure App Services",
      "CI/CD Pipepline",
      "Joi",
      "Zod",
    ],
    highlights: [
      "Dashboard features",
      "User management",
      "Image Annotation",
      "AI Training & Inferrence",
      "Data visualization",
      "Workflow optimization",
    ],
    links: [
      {
        name: "Admin Panel",
        url: "https://ulpi-plant-ai-web-poc-dteyagdka2h3c8hd.eastasia-01.azurewebsites.net/",
      },
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
    links: [{ name: "Dashboard", url: "#" }],
  },
  {
    name: "Unleash - E-Commerce Website",
    description:
      "Modern e-commerce landing page with product showcase and conversion-focused design. Implemented inside the Unleash Mobile App as a webview",
    tech: [
      "NextJS",
      "Tailwind CSS",
      "Framer Motion",
      "Leaflet",
      "ExpressJS",
      "MongoDB",
      "Bitbucket",
      "Jira",
      "Leaflet",
      "Socket.io",
    ],
    highlights: [
      "Product showcase",
      "Responsive design",
      "Performance optimized",
      "Bug Fixing",
      "Feature Development",
    ],
    links: [
      {
        name: "Mobile App",
        url: "https://play.google.com/store/apps/details?id=com.hs.unleash",
      },
    ],
  },
  {
    name: "Unleash Landing Page - unleash.ph (old and new)",
    description:
      "Modern e-commerce landing page with product showcase and conversion-focused design.",
    tech: ["React-Vite", "NextJS", "Tailwind CSS", "Framer Motion", "SCSS"],
    highlights: [
      "Product showcase",
      "Responsive design",
      "Performance optimized",
    ],
    links: [
      {
        name: "New Version",
        url: "https://app-unleash-landing-page-stg.azurewebsites.net/home",
      },
      { name: "Old Version", url: "https://unleash.ph/" },
    ],
  },
  {
    name: "Medieval Village Explorer",
    description:
      "A 3D medieval world built with Three.js, featuring two villages, monsters with dialog, and first-person exploration.",
    tech: ["Three.js", "Next.js", "TypeScript"],
    highlights: ["3D environment", "First-person controls", "Interactive NPCs"],
    links: [
      { name: "Play Demo", url: "#" },
      {
        name: "Source Code",
        url: "https://github.com/mikorecare/miko-recare-portfolio",
      },
    ],
  },
  {
    name: "Mobile App Development - Flutter",
    description:
      "Polishing and enhancing mobile applications built with Flutter for cross-platform deployment.",
    tech: ["Flutter", "Dart", "Firebase", "Angular"],
    highlights: ["Cross-platform", "UI polishing", "Performance optimization"],
    links: [
      { name: "App Store", url: "#" },
      { name: "Play Store", url: "#" },
      { name: "GitHub", url: "#" },
    ],
  },
];
