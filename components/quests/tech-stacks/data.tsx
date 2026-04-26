import { rotate } from "three/tsl";

export const techIconsByCategory = {
  "Frontend & Mobile": [
    { name: "React", icon: "https://cdn.simpleicons.org/react", invert: false },
    {
      name: "Next.js",
      icon: "https://cdn.simpleicons.org/nextdotjs/white",
      invert: true,
    },
    {
      name: "React-Native",
      icon: "https://cdn.simpleicons.org/react",
      invert: false,
    },
    {
      name: "Tanstack Start",
      icon: "https://cdn.simpleicons.org/reactquery",
      invert: false,
    },
    {
      name: "TypeScript",
      icon: "https://cdn.simpleicons.org/typescript",
      invert: false,
    },
    {
      name: "Angular",
      icon: "https://cdn.simpleicons.org/angular",
      invert: false,
    },
    {
      name: "Flutter",
      icon: "https://cdn.simpleicons.org/flutter",
      invert: false,
    },
    {
      name: "Three.js",
      icon: "https://cdn.simpleicons.org/threedotjs/white",
      invert: true,
    },
    {
      name: "JavaScript",
      icon: "https://cdn.simpleicons.org/javascript",
      invert: false,
    },
    {
      name: "Svelte",
      icon: "https://cdn.simpleicons.org/svelte",
      invert: false,
    },
    {
      name: "Angular Material",
      icon: "https://cdn.simpleicons.org/angular",
      invert: false,
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.simpleicons.org/tailwindcss",
      invert: false,
    },
    {
      name: "Bootstrap",
      icon: "https://cdn.simpleicons.org/bootstrap",
      invert: false,
    },
    { name: "SCSS", icon: "https://cdn.simpleicons.org/sass", invert: false },
    {
      name: "Chakra UI",
      icon: "https://cdn.simpleicons.org/chakraui",
      invert: false,
    },
    {
      name: "Material UI",
      icon: "https://cdn.simpleicons.org/mui",
      invert: false,
    },
  ],
  "Backend & Databases": [
    {
      name: "Node.js",
      icon: "https://cdn.simpleicons.org/nodedotjs",
      invert: false,
    },
    {
      name: "Express",
      icon: "https://cdn.simpleicons.org/express/white",
      invert: true,
    },
    {
      name: "NestJS",
      icon: "https://cdn.simpleicons.org/nestjs",
      invert: false,
    },
    { name: "PHP", icon: "https://cdn.simpleicons.org/php", invert: false },
    {
      name: "Laravel",
      icon: "https://cdn.simpleicons.org/laravel",
      invert: false,
    },
    {
      name: "Socket.io",
      icon: "https://cdn.simpleicons.org/socketdotio/white",
      invert: true,
    },
    {
      name: "RESTful APIs",
      icon: "https://cdn.simpleicons.org/postman",
      invert: false,
    },
    {
      name: "MongoDB",
      icon: "https://cdn.simpleicons.org/mongodb",
      invert: false,
    },
    {
      name: "DB Optimization",
      icon: "https://cdn.simpleicons.org/dbeaver/white",
      invert: true,
    },
    {
      name: "Query Tuning",
      icon: "https://cdn.simpleicons.org/apachespark",
      invert: false,
    },
    {
      name: "Schema Refactoring",
      icon: "https://cdn.simpleicons.org/prisma/white",
      invert: true,
    },
  ],
  "Cloud & DevOps": [
    {
      name: "Amazon Web Services",
      icon: "https://cdn.simpleicons.org/cloudways",
      invert: false,
    },
    {
      name: "Microsoft Azure",
      icon: "https://cdn.simpleicons.org/cloudcannon",
      invert: false,
    },
    {
      name: "GCP",
      icon: "https://cdn.simpleicons.org/googlecloud",
      invert: false,
    },
    {
      name: "Docker",
      icon: "https://cdn.simpleicons.org/docker",
      invert: false,
    },
  ],
  "Tools & Integrations": [
    {
      name: "Unlayer API",
      icon: "https://cdn.simpleicons.org/html5",
      invert: false,
    },
    { name: "Git", icon: "https://cdn.simpleicons.org/git", invert: false },
    { name: "Jira", icon: "https://cdn.simpleicons.org/jira", invert: false },
    { name: "Figma", icon: "https://cdn.simpleicons.org/figma", invert: false },
    {
      name: "Photoshop",
      icon: "https://cdn.simpleicons.org/phpstorm",
      invert: false,
    },
    {
      name: "Gemini",
      icon: "https://cdn.simpleicons.org/googlegemini",
      invert: false,
    },
  ],
};

export const techStackBuildings = [
  {
    category: "Frontend & Mobile",
    building: "/medieval-village/Archery Second Age Le.glb",
    position: { x: -40, y: 0, z: -70 }, // Left side, early in journey
    scale: 3,
    color: "#61DAFB",
    rotationY: Math.PI / 2,
    icons: techIconsByCategory["Frontend & Mobile"],
  },
  {
    category: "Backend & Databases",
    building: "/medieval-village/Castle Fortress.glb",
    position: { x: -20, y: 0, z: -30 }, // Right side, second
    scale: 3,
    color: "#339933",
    rotationY: Math.PI / 2,
    icons: techIconsByCategory["Backend & Databases"],
  },
  {
    category: "Cloud & DevOps",
    building: "/medieval-village/Watch Tower.glb",
    position: { x: 90, y: 0, z: 0 }, // Left side, center of journey
    scale: 3,
    color: "#FF9900",
    icons: techIconsByCategory["Cloud & DevOps"],
  },
  {
    category: "Tools & Integrations",
    building: "/medieval-village/Market Stalls.glb",
    position: { x: 45, y: 0, z: 30 }, // Right side, later in journey
    scale: 3,
    color: "#F24E1E",
    icons: techIconsByCategory["Tools & Integrations"],
  },
  {
    category: "Soft Skills",
    building: "/medieval-village/Castle Fortress.glb",
    position: { x: -5, y: 0, z: 60 },
    rotationY: Math.PI / 2,
    scale: 3,
    color: "#c4963a",
    icons: [
      {
        name: "Code Reviews",
        icon: "https://cdn.simpleicons.org/stackoverflow",
        invert: false,
      },
      {
        name: "Agile/Scrum",
        icon: "https://cdn.simpleicons.org/scrumalliance",
        invert: false,
      },
      {
        name: "Mentoring",
        icon: "https://cdn.simpleicons.org/group",
        invert: false,
      },
      {
        name: "Team Collaboration",
        icon: "https://cdn.simpleicons.org/teams",
        invert: false,
      },
      {
        name: "Problem Solving",
        icon: "https://cdn.simpleicons.org/brain",
        invert: false,
      },
    ],
  },
];
