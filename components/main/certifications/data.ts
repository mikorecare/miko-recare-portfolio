export interface Certification {
    platform: string;
    title: string;
    issuedDate: string;
    credentialId: string | null;
    credentialUrl: string;
    skills: string[];
}

export const certifications: Certification[] = [
    {
        platform: "Scrimba",
        title: "Learn TypeScript",
        issuedDate: "Sep 2024",
        credentialId: "X1JHUWDZMQ27",
        credentialUrl: "https://www.coursera.org/account/accomplishments/verify/X1JHUWDZMQ27",
        skills: ["TypeScript", "Object-Oriented Programming (OOP)"],
    },
    {
        platform: "Coursera",
        title: "E-Commerce Payments Using Stripe and NodeJS",
        issuedDate: "Nov 2023",
        credentialId: "RNE3DJWTH259",
        credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/RNE3DJWTH259",
        skills: [
            "TypeScript",
            "Stripe",
            "Node.js",
            "Express",
            "Payment Processing",
            "Security",
        ],
    },
    {
        platform: "Coursera",
        title: "Building RESTful APIs with Node.js and Express",
        issuedDate: "Nov 2023",
        credentialId: "F6PG6WR8LDMS",
        credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/F6PG6WR8LDMS",
        skills: [
            "MongoDB",
            "TypeScript",
            "Node.js",
            "Express",
            "REST APIs",
            "JWT",
            "Authentication",
            "Postman",
        ],
    },
    {
        platform: "Coursera",
        title: "Learning MEAN Stack by Building Real world Application Specialization",
        issuedDate: "Nov 2023",
        credentialId: "HY6U4NZB6LT3",
        credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/HY6U4NZB6LT3",
        skills: [
            "MongoDB",
            "TypeScript",
            "Express.js",
            "Angular",
            "Node.js",
            "REST APIs",
            "Authentication",
            "Deployment",
            "Security",
            "Testing",
            "Performance",
            "Real-time Updates",
        ],
    },
    {
        platform: "Coursera",
        title: "Frontend Development using Angular",
        issuedDate: "Nov 2023",
        credentialId: "RBPN4P2E9QRZ",
        credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/RBPN4P2E9QRZ",
        skills: ["TypeScript", "JavaScript", "Angular", "RxJS", "HTML5", "CSS3"],
    },
    {
        platform: "Great Learning",
        title: "ReactJS Tutorial",
        issuedDate: "Oct 2023",
        credentialId: null,
        credentialUrl: "https://olympus.mygreatlearning.com/courses/52045/certificate",
        skills: ["React.js", "Hooks", "Components", "State Management"],
    },
    {
        platform: "Great Learning",
        title: "Angular7 for Advanced Level",
        issuedDate: "Oct 2023",
        credentialId: "ZWGBTPCZ",
        credentialUrl: "https://verify.mygreatlearning.com/verify/ZWGBTPCZ",
        skills: [
            "TypeScript",
            "JavaScript",
            "Angular 7",
            "Advanced Concepts",
            "Performance Optimization",
        ],
    },
    {
        platform: "Great Learning",
        title: "Angular7 for Intermediate Level",
        issuedDate: "Oct 2023",
        credentialId: "AMEQPVSD",
        credentialUrl: "https://verify.mygreatlearning.com/verify/AMEQPVSD",
        skills: [
            "TypeScript",
            "Angular Material",
            "Routing",
            "Forms",
            "Services",
            "Dependency Injection",
        ],
    },
    {
        platform: "Great Learning",
        title: "Angular7 - For Beginners",
        issuedDate: "Oct 2023",
        credentialId: "IWCUSLNR",
        credentialUrl: "https://verify.mygreatlearning.com/verify/IWCUSLNR",
        skills: [
            "TypeScript",
            "JavaScript",
            "Angular 7",
            "Components",
            "Directives",
            "Pipes",
        ],
    },
];