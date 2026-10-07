interface Project {
  name: string;
  description: string;
  screenshots: string[];
  highlights?: string[];
  image?: string;
  links?: { name: string; url: string }[];
  isMobile?: boolean;
}

export const projects: Project[] = [
  {
    name: "Festive HR Portal",
    description:
      "An end-to-end Applicant Tracking System (ATS) built to replace a paid SaaS subscription — covering the full recruitment lifecycle from job posting to hire. Includes JazzHR-style templating for emails, assessments, and evaluations; calendar-based scheduling comparable to Calendly; a signature maker for offer letters and onboarding docs; and CTM phone integration so calls are logged against the right candidate automatically.",
    screenshots: [
      "/projects/festive-hr-portal/b6tpa9t3jt3aberkjj9m.webp",
      "/projects/festive-hr-portal/basuu3vnfmrpppzn23hr.webp",
      "/projects/festive-hr-portal/bebarj7ojvkklyhnjceu.webp",
      "/projects/festive-hr-portal/c7h51tqnqekzuvcuuaet.webp",
      "/projects/festive-hr-portal/cewfpvuizxreylwtl6p9.webp",
      "/projects/festive-hr-portal/dwhi2jaywlwodua78zai.webp",
      "/projects/festive-hr-portal/ehcwnqsgouq8cvwg32o2.webp",
      "/projects/festive-hr-portal/fettvethdcmr9zcyucki.webp",
      "/projects/festive-hr-portal/fs0qooksrpwufqu2474p.webp",
      "/projects/festive-hr-portal/h2jqwjtwqlxbsyziyz5r.webp",
      "/projects/festive-hr-portal/hxjszvwvin3sjd8g4qur.webp",
      "/projects/festive-hr-portal/iqfz1b7c4bzlr8vmwkto.webp",
      "/projects/festive-hr-portal/keho9fas1fodb0irxlp0.webp",
      "/projects/festive-hr-portal/mtjymrbheckx4wso9tyq.webp",
      "/projects/festive-hr-portal/nrgnxkr7irvx3bu15pfs.webp",
      "/projects/festive-hr-portal/pbdzaohm7pn9slolg4fk.webp",
      "/projects/festive-hr-portal/r2cclnsyngv8kjetybpf.webp",
      "/projects/festive-hr-portal/seiepg3nxhwvchfrcsfi.webp",
      "/projects/festive-hr-portal/tjvsjebludrduz1bnonu.webp",
      "/projects/festive-hr-portal/xyxj0jmcfwhwi5g3pzqy.webp",
    ],
    highlights: [
      "Applicant Tracking System (ATS)",
      "JazzHR-style Templating (Emails, Assessments, Evaluations)",
      "Email Automation via Azure Credentials",
      "Calendly-style Interview Scheduling",
      "Signature Maker for Offer Letters",
      "CTM Phone Integration",
      "Workflow Automation",
      "Dynamic Questionnaires",
      "Cost Savings vs. SaaS Licensing",
    ],
    links: [
      {
        name: "Careers Portal",
        url: "https://careers.festivelightingpros.com",
      },
      {
        name: "About FLP",
        url: "https://festivelightingpros.com/about-flp/#meet-the-team",
      },
    ],
  },
  {
    name: "Festive Express",
    description:
      "A sub-brand of Festive Lighting Pros — a to-go style ordering platform with a full CMS, order management, and automation pipeline. Designed and built the customer-facing storefront end-to-end, plus the admin dashboard powering operations.",
    screenshots: [
      "/projects/festive-express/screencapture-festive-express-monorepo-mu-vercel-app-2026-10-08-06_08_23.webp",
      "/projects/festive-express/screencapture-festive-express-monorepo-mu-vercel-app-packages-2026-10-08-06_08_50.webp",
      "/projects/festive-express/screencapture-festive-express-monorepo-mu-vercel-app-faq-2026-10-08-06_09_57.webp",
      "/projects/festive-express/em30rbfis5pvctgzabfi.webp",
      "/projects/festive-express/screencapture-admin-festive-express-admin-2026-10-08-06_10_59.webp",
      "/projects/festive-express/screencapture-admin-festive-express-admin-products-2026-10-08-06_11_32.webp",
      "/projects/festive-express/screencapture-admin-festive-express-admin-configuration-faq-2026-10-08-06_12_09.webp",
    ],
    highlights: [
      "Content Management System (CMS)",
      "Order Management & Automation",
      "Responsive Marketing Storefront",
      "Admin Dashboard",
      "SEO & Performance Optimized",
    ],
    links: [
      { name: "Website", url: "https://festive.express" },
      {
        name: "Staging",
        url: "https://festive-express-monorepo-mu.vercel.app/",
      },
      { name: "Admin", url: "https://admin.festive.express" },
    ],
  },
  {
    name: "Nextsys IT Solutions Website",
    description:
      "Created a web page for a start up company with futuristic styling and contact feature.",
    screenshots: ["/projects/nextsystech/nextsystech.webp"],
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
    screenshots: [
      "/projects/go-negosyo/go-negosyo.webp",
      "/projects/go-negosyo/go-negosyo-all-courses.webp",
      "/projects/go-negosyo/go-negosyo-all-mentees.webp",
      "/projects/go-negosyo/go-negosyo-all-mentors.webp",
      "/projects/go-negosyo/go-negosyo-all-ratings.webp",
      "/projects/go-negosyo/go-negosyo-all-topics.webp",
      "/projects/go-negosyo/go-negosyo-chat.webp",
      "/projects/go-negosyo/go-negosyo-course-page-complete.webp",
      "/projects/go-negosyo/go-negosyo-edit-course.webp",
      "/projects/go-negosyo/go-negosyo-edit-course-assessment.webp",
      "/projects/go-negosyo/go-negosyo-edit-course-final.webp",
      "/projects/go-negosyo/go-negosyo-edit-course-lecture.webp",
      "/projects/go-negosyo/go-negosyo-edit-course-upload.webp",
      "/projects/go-negosyo/go-negosyo-mentee.webp",
      "/projects/go-negosyo/go-negosyo-mentee-certificate.webp",
      "/projects/go-negosyo/go-negosyo-mentee-course-assessment.webp",
      "/projects/go-negosyo/go-negosyo-mentee-course-assessment-page.webp",
      "/projects/go-negosyo/go-negosyo-mentee-course-assessment-result.webp",
      "/projects/go-negosyo/go-negosyo-mentee-course-feedback.webp",
      "/projects/go-negosyo/go-negosyo-mentee-course-page.webp",
      "/projects/go-negosyo/go-negosyo-mentee-courses.webp",
      "/projects/go-negosyo/go-negosyo-mentee-profile.webp",
      "/projects/go-negosyo/go-negosyo-mentor.webp",
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
    screenshots: [
      "/projects/unleash-portal/unleash-portal.webp",
      "/projects/unleash-portal/unleash-portal-booking-management.webp",
      "/projects/unleash-portal/unleash-portal-booking-management-page.webp",
      "/projects/unleash-portal/unleash-portal-content-management-article.webp",
      "/projects/unleash-portal/unleash-portal-content-management-article-page.webp",
      "/projects/unleash-portal/unleash-portal-content-management-terms-and-conditions.webp",
      "/projects/unleash-portal/unleash-portal-content-management-terms-and-conditions-page.webp",
      "/projects/unleash-portal/unleash-portal-dashboard.webp",
      "/projects/unleash-portal/unleash-portal-merchant-dashboard.webp",
      "/projects/unleash-portal/unleash-portal-merchant-profile.webp",
      "/projects/unleash-portal/unleash-portal-order-management.webp",
      "/projects/unleash-portal/unleash-portal-order-management-cancellation-and-refund.webp",
      "/projects/unleash-portal/unleash-portal-order-management-cancellation-and-refund-sidebar.webp",
      "/projects/unleash-portal/unleash-portal-order-management-return-and-refund.webp",
      "/projects/unleash-portal/unleash-portal-order-management-return-and-refund-sidebar.webp",
      "/projects/unleash-portal/unleash-portal-product-management-revamp.webp",
      "/projects/unleash-portal/unleash-portal-services-management.webp",
      "/projects/unleash-portal/unleash-portal-services-management-rates.webp",
      "/projects/unleash-portal/unleash-portal-services-management-schedule.webp",
      "/projects/unleash-portal/unleash-portal-services-management-upload.webp",
      "/projects/unleash-portal/unleash-portal-user-management.webp",
    ],
    highlights: [
      "Role-based access",
      "Content management",
      "Analytics dashboard",
      "Point of Sales",
      "User Management",
    ],
    links: [{ name: "Admin Demo", url: "portal.unleash.ph" }],
  },
  {
    name: "Makati Waste Management System Admin Portal",
    description:
      "Admin portal for waste management operations, including collection scheduling and reporting.",
    screenshots: [
      "/projects/mws/makati-waste.webp",
      "/projects/mws/admin.webp",
      "/projects/mws/bulky-waste.webp",
      "/projects/mws/environmental-clearance.webp",
      "/projects/mws/greenhouse-gas-certificate.webp",
      "/projects/mws/noise-compliance-certificate.webp",
      "/projects/mws/ordinance-violation.webp",
      "/projects/mws/other-services.webp",
      "/projects/mws/truck-violations.webp",
      "/projects/mws/user.webp",
      "/projects/mws/user-roles.webp",
      "/projects/mws/waste-collection.webp",
      "/projects/mws/waste-collection-map.webp",
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
    screenshots: [
      "/projects/ulpi/ulpi.webp",
      "/projects/ulpi/ai-model.webp",
      "/projects/ulpi/annotating-geo.webp",
      "/projects/ulpi/annotation-images-list.webp",
      "/projects/ulpi/annotation-images-page.webp",
      "/projects/ulpi/annotation-images-sidebar.webp",
      "/projects/ulpi/annotation-summary.webp",
      "/projects/ulpi/farmer-area.webp",
      "/projects/ulpi/image-storage.webp",
      "/projects/ulpi/inference.webp",
      "/projects/ulpi/meta-data.webp",
    ],
    highlights: [
      "Dashboard features",
      "User management",
      "Image Annotation",
      "AI Training & Inference",
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
    screenshots: ["/projects/nightpulse/night-pulse.webp"],
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
      "Modern e-commerce landing page with product showcase and conversion-focused design. Implemented inside the Unleash Mobile App as a webview.",
    screenshots: [
      "/projects/unleash-shop/unleash-shop.webp",
      "/projects/unleash-shop/unleash-shop-cart.webp",
      "/projects/unleash-shop/unleash-shop-order.webp",
      "/projects/unleash-shop/unleash-shop-order-history.webp",
      "/projects/unleash-shop/unleash-shop-payment.webp",
      "/projects/unleash-shop/unleash-shop-product.webp",
      "/projects/unleash-shop/unleash-shop-service-location.webp",
      "/projects/unleash-shop/unleash-shop-services.webp",
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
    isMobile: true,
  },
  {
    name: "Unleash Landing Page - unleash.ph (old and new)",
    description:
      "Modern e-commerce landing page with product showcase and conversion-focused design.",
    screenshots: [
      "/projects/unleash/unleash-old.webp",
      "/projects/unleash/unleash-new.webp",
    ],
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
    description: "This is my first portfolio ^_^ V",
    screenshots: ["/projects/medieval/medieval.png"], // Add screenshots if available
    highlights: [
      "3D environment",
      "First-person controls",
      "Interactive NPCs",
      "Medieval Style Porfolio and Effects",
    ],
    links: [
      { name: "Play Demo", url: "/medieval-style" },
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
    screenshots: [], // Add screenshots if available
    highlights: ["Cross-platform", "UI polishing", "Performance optimization"],
    links: [
      { name: "App Store", url: "#" },
      { name: "Play Store", url: "#" },
      { name: "GitHub", url: "#" },
    ],
  },
];
