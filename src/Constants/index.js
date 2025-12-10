
export const skillsData = [
  {
    title: "Programming Languages",
    description: "Languages I code in.",
    items: [
      { title: "JavaScript" },
      { title: "C++" },
      { title: "SQL" },
      { title: "Familiar with Python"},
      { title: "Familiar with Java"},
    ],
  },
  {
    title: "Frontend & State Management",
    description: "Building user interfaces with proper state handling and animations.",
    items: [
      { title: "React" },
      { title: "Tailwind CSS" },
      { title: "HTML & CSS" },
      { title: "Redux & Zustand" },
      { title: "GSAP & MOTION" },
    ],
  },
  {
    title: "Backend",
    description: "Server-side logic, APIs, and real-time communication.",
    items: [
      { title: "Node.js" },
      { title: "gRPC, RabbitMQ & BullMQ" },
      { title: "REST API" },
      { title: "Socket.io" },
      { title: "Microservices" },
    ],
  },
  {
    title: "Database & Cloud",
    description: "Storing and managing data, with cloud services for media and hosting.",
    items: [
      { title: "MongoDB" },
      { title: "MySQL" },
      { title: "Redis" },
      { title: "AWS S3" },
      { title: "Cloudinary & Firebase" },
    ],
  },
];


export const projectData = [
  {
    id: 1,
    title: "Shop Sphere",
    xp: 240,
    image: "/assets/projects/ShopSphereCoverImage.png", 
    description:
      "A fully-featured microservices e-commerce platform using RabbitMQ and gRPC, built for scalability, decoupled services, and fast, reliable asynchronous communication.",
    techStack: [
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "RabbitMQ",
      "BullMQ",
      "gRPC",
      "Socket.io",
      "AWS S3",
      "React",
      "Tailwind",
      "Redux"
    ],
    weakness: "Complex deployment pipeline",
    retreatCost: "5 sprints",
    ctaLink:"https://github.com/shivvv-ang/ShopSphere"
  },

  {
    id: 2,
    title: "Home Quest",
    xp: 180,
    image: "/assets/projects/RealEstateCoverImage.png",
    description:
      "A comprehensive real estate platform with advanced search, role-based access, Firebase authentication, and powerful filtering to manage property listings efficiently",
    techStack: [
      "React",
      "TailwindCSS",
      "Redux",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Firebase"
    ],
    weakness: "Heavy search queries under massive data load",
    retreatCost: "4 sprints",
    ctaLink:"https://github.com/shivvv-ang/HomeQuest"
  },

  {
    id: 3,
    title: "Connectify",
    xp: 200,
    image: "/assets/projects/ChatAppCoverImage.png",
    description:
      "A real-time chat system with direct messages, group chats, file uploads, Redis-backed scaling, and Socket.io for instant communication across users.",
    techStack: [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Socket.io",
      "Redis",
      "Zustand",
      "React",
      "TailwindCSS",
      "Cloudinary"
    ],
    weakness: "High Redis memory usage during peak load",
    retreatCost: "3 sprints",
    ctaLink:"https://github.com/shivvv-ang/Connectify"
  },

  {
    id: 4,
    title: "Developer Portfolio",
    xp: 120,
    image: "/assets/projects/devPortfolioCoverImage.png",
    description:
      "A personal developer portfolio showcasing skills, projects, and animations, built with React, Tailwind CSS, and Framer Motion for smooth interactions.",
    techStack: ["React", "TailwindCSS", "Framer Motion"],
    weakness: "Not SEO optimized for large content",
    retreatCost: "1 sprint",
    ctaLink:"https://github.com/shivvv-ang/My-Dev-Portfolio"
  },
];


export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/shivang-hariakar-b62872256/" },
  { name: "GitHub", href: "https://github.com/shivvv-ang" },
];

export const titles = ["Frontend", "Backend", "Fullstack"];

export const timelineData = [
  { title: "May 2025 – Aug 2025", company: "DevX Technology", role: "Frontend Developer Trainee", summary: "Converted Figma designs into fully responsive Shopify pages and improved page performance.", points: ["Implemented page performance optimizations", "Learned Shopify Admin and Liquid", "Converted Figma designs into responsive Shopify pages with 100% design fidelity",], skills: ["HTML", "CSS", "JavaScript", "Shopify", "Liquid", "Git", "GitHub"],
    logo:"https://imgs.search.brave.com/KeBiKz2sESqSYkHhNUFvLjm7aqPBmbDKBDBmlEYf8ek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy81YTcxMXVi/ZC9wcm9kdWN0aW9u/L2M1NWQ2ZmViOGZk/NTgzZDNjZjg3ZTM0/YjdiNDJlMzRiYTM0/NTdjNjYtNjR4NjQu/c3ZnP3c9MTI4Jmg9/MTI4"
   }, 
  { title: "Aug 2025 – Oct 2025", company: "DevX Technology", role: "Frontend Developer Intern", summary: "Built custom tooling and Shopify apps while migrating large product datasets.", points: ["Developed a semi-automated process to migrate 9,500+ product records into Shopify collections with 99% accuracy", "Built a Shopify app extension and Product Detail Page (PDP) for live stores", "Created reusable web components and sections implemented across multiple live stores",], skills: ["HTML", "CSS", "JavaScript", "Shopify", "Liquid", "Git", "GitHub", "Tailwind CSS",], 
    logo:"https://imgs.search.brave.com/KeBiKz2sESqSYkHhNUFvLjm7aqPBmbDKBDBmlEYf8ek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy81YTcxMXVi/ZC9wcm9kdWN0aW9u/L2M1NWQ2ZmViOGZk/NTgzZDNjZjg3ZTM0/YjdiNDJlMzRiYTM0/NTdjNjYtNjR4NjQu/c3ZnP3c9MTI4Jmg9/MTI4"
  },
];