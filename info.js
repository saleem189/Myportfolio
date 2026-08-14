import saleemImage from './src/assets/saleem.jpg';
import iqpagesImage1 from './src/assets/portfolio/iqpages.png';
import breaker19Image1 from './src/assets/portfolio/breaker19.png';
import breaker19Image2 from './src/assets/portfolio/breaker19-carrierportal.png';
import priceoyeImage from './src/assets/portfolio/priceoye.png';
import libraryImage1 from './src/assets/portfolio/library.png';
import libraryImage2 from './src/assets/portfolio/library2.png';
import sheenpayImage1 from './src/assets/portfolio/sheenpay.png';
import transproImage1 from './src/assets/portfolio/transpro-crm.png';
import transproImage2 from './src/assets/portfolio/admin-subdomain.png';
import transproImage3 from './src/assets/portfolio/tenant-subdomain.png';
import transproImage4 from './src/assets/portfolio/redis-monitor.png';

const calculateExperience = (experiences) => {
  let totalMonths = 0;

  experiences.forEach(exp => {
    // Skip training experiences
    if (exp.position.toLowerCase().includes('trainee') ||
      exp.position.toLowerCase().includes('training')) {
      return;
    }

    // Parse the date string (e.g., "Feb, 2024 - Present" or "Aug, 2021 - Feb, 2024")
    const [startPart, endPart] = exp.date.split(' - ');
    const [startMonth, startYear] = startPart.split(', ');

    // Convert month name to month number (0-11)
    const monthMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    const start = new Date(parseInt(startYear), monthMap[startMonth], 1);
    const end = endPart.toLowerCase() === 'present'
      ? new Date()
      : new Date(parseInt(endPart.split(', ')[1]), monthMap[endPart.split(', ')[0]], 1);

    const months = (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    totalMonths += months;
  });

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return { years, months, totalMonths };
};

const info = {
  name: "Saleem Ayoub",
  logo_name: "Saleem",
  role: "Full-Stack Software Engineer",
  flat_picture: saleemImage,
  config: {
    use_cookies: true,
    navbar: {
      blur: false
    },
    show_recommendations: false
  },
  get description() {
    const experience = calculateExperience(this.experience);
    return `I'm a full-stack software engineer with ${experience.years}.${experience.months}+ years of experience building product systems for SaaS, fintech, and e-commerce. My focus is Laravel, PHP, and Vue.js, with hands-on experience designing APIs, integrating third-party services, and improving application performance.<br><br>I build practical, maintainable systems: reliable background processing, well-structured backend modules, and frontend workflows that support real product teams. I am open to remote opportunities worldwide.`;
  },
  get totalExperience() {
    return calculateExperience(this.experience);
  },
  links: {
    linkedin: "https://www.linkedin.com/in/muhammad-saleem-ayoub-20bb581b8/",
    github: "https://github.com/saleem189",
    resume: "https://drive.google.com/file/d/1tWPmtZeEQsEclNiraaVezOCnE8SyxlOZ/view"
  },
  contact: {
    email: "saleemayoub1@gmail.com",
    phone: "+923176808418",
    location: "Pakistan",
    availability: "Open to opportunities",
  },
  education: [
    {
      name: "Khawaja Fareed Unveristy of Engineering and Information Technology (KFUEIT)",
      place: "Rahim Yar Khan, Punjab, Pakistan",
      date: "Oct, 2018 - Mar, 2021",
      degree: "Masters in Computer Science (MSc)",
      gpa: "",
      description: "Graduated with a MSc in Computer Science, focusing on software architecture, algorithms, and AI.",
      skills: [
        "Artificial Intelligence",
        "Software Engineering",
        "Algorithms",
        "Data Structures",
        "OS"
      ]
    },
    {
      name: "The Islamia University of Bahawalpur",
      place: "Bahawalpur, Punjab, Pakistan",
      date: "2016 - 2018",
      degree: "Bsc in Computer Science",
      gpa: "",
      description: "Graduated with a BSc in Computer Science, emphasizing programming, data structures, and statistics.",
      skills: [
        "Data Structures",
        "Statistics",
        "Algorithms",
      ]
    }
  ],
  experience: [
    {
      id: 1,
      name: "Priceoye Technology",
      company: "Priceoye Technology",
      role: "Sr. Laravel Developer",
      position: "Sr. Laravel Developer",
      place: "Islamabad, Federal Capital Territory, Pakistan",
      location: "Islamabad",
      period: "Feb, 2024 - Present",
      date: "Feb, 2024 - Present",
      description:
        "Contribute as a full-stack engineer across the PriceOye e-commerce platform: Laravel/PHP backend, Vue.js and Blade frontend, administration systems, APIs, legacy modernization, and performance work. The role combines feature delivery with improving maintainability, reuse, and operational reliability across product workflows.",
      achievements: [
        "Solely owned the Delivery Charges Module and contributed to the administration-side approval and audit system for traceable changes, approvals, and historical records",
        "Participated in the Laravel 10 → 11 migration as part of the engineering team, maintaining compatibility across modules",
        "Contributed to Docker-based containerization for consistent dev/prod environments, improving deployment reliability",
        "Migrated Cart flows from Blade toward Vue.js with reusable components and Pinia state management",
        "Improved frontend performance by reducing unnecessary large JSON/object processing and contributing to Web Vitals work",
        "Optimized SQL queries, caching, queues, scheduled tasks, model observers, and backend application logic",
        "Contributed to Elasticsearch optimization for product discovery, search performance, and relevancy",
        "Implemented and documented REST APIs using Swagger/OpenAPI and contributed to Docker-based development environments"
      ],
      skills: [
        "Laravel",
        "Vue.js",
        "Pinia State Management",
        "Factory Pattern",
        "Repository Pattern",
        "Service Pattern",
        "OOP",
        "SOLID Principles",
        "SQL Query Optimization",
        "Payment Gateway Integration",
        "Core Web Vitals",
        "Performance Optimization",
        "Service Container",
        "Dependency Injection",
        "Task Scheduling",
        "Custom Authentication",
        "Cron Jobs",
        "Queues",
        "Git",
        "CI/CD",
        "Docker",
        "API Documentation (Swagger)",
        "Cross-functional Collaboration",
        "Elasticsearch"
      ]
    },
    {
      id: 2,
      name: "Peek International",
      company: "Peek International",
      role: "Full Stack Laravel Developer",
      position: "Full Stack Laravel Developer",
      place: "Rawalpindi, Punjab, Pakistan",
      location: "Rawalpindi",
      period: "Aug, 2021 - Feb, 2024",
      date: "Aug, 2021 - Feb, 2024",
      description:
        "Delivered full-stack solutions for diverse client projects as part of a service-based development team, architecting applications using Laravel, Vue.js, and Inertia.js. Designed and documented RESTful APIs, implemented real-time features with Laravel WebSockets, and automated deployments with custom Artisan commands. Managed AWS infrastructure (EC2, S3, SES, DynamoDB) and configured production servers (NGINX, Apache, Supervisor) for optimal performance across multiple client environments. Applied design patterns and OOP principles to ensure maintainable, scalable solutions tailored to each client's unique requirements.",
      achievements: [
        "Delivered 3 full-stack applications in collaboration with distributed teams across UK, Brazil, and Bangladesh",
        "Architected and documented RESTful APIs using Swagger, enabling seamless cross-team integrations",
        "Implemented real-time features with Laravel WebSockets for live notifications and data synchronization",
        "Built modern SPAs using Laravel + Inertia.js with server-side rendering and reactive frontends",
        "Automated deployment workflows with custom Artisan commands, reducing deployment complexity",
        "Managed AWS infrastructure (EC2, S3, SES, DynamoDB) and optimized server configurations for production environments",
        "Collaborated effectively across time zones, maintaining code quality and architectural consistency"
      ],
      skills: ["cPanel", "OOP", "VueJS", "ReactJs", "Nodejs", "ExpressJs", "NGINX", "Apache", "PHP", "Laravel", "SQL", "PostgreSQL", "Supervisor", "Git", "CI/CD", "Docker", "Design Patterns", "HTML", "Bootstrap", "Tailwind CSS", "Laravel Forge", "Linux", "Server Configurations", "AWS", "Javascript", "CSS", "Jquery", "InertiaJs", "RESTful APIs", "API Documentation (Swagger)", "Cron jobs", "Queues", "Notifications", "Push Notifications", "AWS S3", "AWS DynamoDB", "AWS SES"]
    },
    {
      id: 3,
      name: "MERN Stack Training",
      company: "Teresol Pvt Ltd",
      role: "MERN Stack Trainee",
      position: "MERN Stack Trainee",
      place: "Islamabad, Federal Capital Territory, Pakistan",
      location: "Islamabad",
      period: "Feb, 2023 - Apr, 2023",
      date: "Feb, 2023 - Apr, 2023",
      description:
        "Completed a 300-hour intensive MERN stack training program, building full-stack applications with MongoDB, Express.js, React, and Node.js. Developed hands-on projects implementing RESTful APIs, React component architecture, state management, and NoSQL database design. Applied modern JavaScript practices and gained practical experience in full-stack development workflows.",
      achievements: [
        "Completed 300-hour intensive TechLift Program specializing in MERN stack development",
        "Built full-stack applications using MongoDB, Express.js, React, and Node.js",
        "Implemented RESTful APIs, React component architecture, and state management patterns",
        "Developed responsive UIs with React and modern JavaScript (ES6+), integrating with Node.js backends"
      ],
      skills: ["ReactJs", "MongoDB", "ExpressJS", "NodeJS", "Tailwind CSS", "FIGMA"]
    },
    {
      id: 4,
      name: "Eziline Software House",
      company: "Eziline Software House",
      role: "Laravel Intern",
      position: "Laravel Intern",
      place: "Rawalpindi, Punjab, Pakistan",
      location: "Rawalpindi",
      period: "Apr, 2021 - Aug, 2021",
      date: "Apr, 2021 - Aug, 2021",
      description:
        "Contributed to full-stack web development projects during a Software Engineer internship, working with Laravel, PHP, Vue.js, and MySQL. Developed responsive UI components using Bootstrap and JavaScript, implemented CRUD operations, and assisted in database design. Gained practical experience in MVC architecture, RESTful API development, and version control with Git.",
      achievements: [
        "Contributed to 2-3 client projects, developing features and UI components using Laravel and Vue.js",
        "Built responsive web interfaces with Bootstrap and JavaScript, implementing dynamic user interactions",
        "Developed CRUD operations and database schemas using MySQL and Laravel Eloquent ORM",
        "Gained hands-on experience with MVC architecture, RESTful APIs, and Git version control"
      ],
      skills: ["Laravel", "PHP", "Bootstrap", "JavaScript", "VueJS", "Jquery", "MySQL"]
    },
  ],
  // Curated featured case studies for the portfolio-first experience
  featuredExperiences: [
    {
      id: 'fe-priceoye',
      company: 'Priceoye Technology',
      role: 'Senior Laravel Developer - Full-Stack Product Engineering',
      period: 'Feb, 2024 - Present',
      date: 'Feb, 2024 - Present',
      summary: 'Full-stack product work across e-commerce workflows, administration systems, legacy modernization, and performance engineering.',
      problem: 'E-commerce workflows and administration systems need to evolve while keeping the codebase maintainable, reusable, and responsive.',
      approach: 'Modernize Laravel modules with object-oriented design and reusable abstractions, migrate selected frontend workflows from Blade to Vue.js, and improve data-processing and query efficiency.',
      contributions: [
        'Migrated Cart experience from Blade toward Vue.js with reusable components and Pinia state management',
        'Solely owned the Delivery Charges Module and contributed to the approval and audit system',
        'Optimized large JSON/object processing, SQL queries, caching, queues, and scheduled workflows',
        'Contributed to Elasticsearch relevance and performance work, API documentation, and Docker environments'
      ],
      outcomes: ['More reusable frontend and backend building blocks for product development', 'Improved administrative traceability through approval and audit records', 'A clearer foundation for ongoing performance and legacy-modernization work'],
      technologies: ['Laravel', 'PHP', 'Vue.js', 'Pinia', 'MySQL', 'Docker', 'Elasticsearch', 'OpenAPI/Swagger'],
      images: [priceoyeImage],
      visit: 'https://priceoye.pk/'
    },
  {
    "id": "fe-sheenpay",
    "company": "Priceoye Technology",
    "parentCompany": "Priceoye Technology",
    "role": "Full-Stack Engineer - BNPL Platform",
    "period": "2024 - 2025",
    "date": "2024 - 2025",
    "summary": "Full-stack development and application planning for a BNPL platform serving web, Android, and external application integrations.",
    "problem": "The platform needed configurable customer flows, dependable payment and installment operations, integration-ready APIs, and administration-managed communications without hardcoded frontend structures.",
    "approach": "Participated in research, application planning, architecture, and implementation planning before development. Designed backend-defined form configuration that the frontend renders dynamically; supported integration-ready APIs, idempotent payment workflows, administration systems, and provider abstraction.",
    "contributions": [
      "Participated in research, application planning, architecture, and implementation planning before and during development",
      "Solely owned frontend development, including configuration-driven multi-step forms rendered from backend-managed field names, field types, steps, and ordering",
      "Solely owned the Email Module: WYSIWYG editing, live HTML preview, template testing, and AWS SES/SendGrid provider switching",
      "Contributed to APIs for web, Android, and external consumers, plus payment/installment idempotency, payment gateway integrations, architecture, and documentation",
      "Contributed to administration systems and external API capabilities for integrations with other applications"
    ],
    "outcomes": [
      "Admin-configurable form workflows without hardcoded frontend structures",
      "A provider-agnostic, administration-managed email capability",
      "Integration-ready API and payment-workflow foundations for the platform",
      "Planning and architecture involvement from research through implementation"
    ],
    "technologies": [
      "Laravel",
      "PHP",
      "Vue.js",
      "MySQL",
      "REST APIs",
      "Queues",
      "AWS SES",
      "SendGrid"
    ],
    "images": [
      sheenpayImage1
    ],
    "visit": "https://sheenpay.pk/"
  },
    {
      id: 'fe-echo',
      company: 'Priceoye Technology',
      parentCompany: 'Priceoye Technology',
      role: 'Full-Stack Engineer - Customer Engagement Platform',
      period: '2026 - Ongoing',
      date: '2026 - Ongoing',
      summary: 'Ongoing internal customer-engagement platform work for PriceOye and SheenPay.',
      problem: 'The products need a shared internal platform for customer-engagement capabilities.',
      approach: 'Contribute across research, planning, architecture, technical documentation, frontend, backend, APIs, and implementation as the platform develops.',
      contributions: [
        'Participate in research, application planning, and system-architecture discussions',
        'Contribute to technical documentation, backend and frontend development, and API implementation',
        'Support the ongoing design and development of core customer-engagement capabilities'
      ],
      outcomes: ['Ongoing platform development; production outcomes are not yet claimed publicly'],
      technologies: ['Laravel', 'PHP', 'Vue.js', 'PostgreSQL', 'Redis', 'Queues', 'REST APIs'],
      images: [],
      visit: ''
    }
  ],
  skills: [
    {
      title: "languages",
      info: [
        "PHP",
        "Javascript",
        "SQL",
        "NoSQL",
        "JavaScript"
      ],
      icon: "fa fa-code"
    },
    {
      title: "AWS services",
      info: [
        "SES",
        "S3",
        "DynamoDB",
        "EC2 (Elastic Compute Cloud)",
        "AWS Amplify"
      ],
      icon: "fa fa-cubes"
    },
    {
      title: "Web Technologies",
      info: ["Vue", "React", "Node", "HTML", "CSS", "Laravel"],
      icon: "fas fa-laptop-code"
    },
    {
      title: "Databases",
      info: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "AWS DynamoDB",
        "Redis",
        "Elasticsearch"
      ],
      icon: "fa fa-database"
    },
    {
      title: "Operating Systems & Tools",
      info: [
        "MacOS",
        "Ubuntu",
        "Windows",
        "JIRA",
        "Heroku",
        "Git",
        "Docker",
        "CI/CD",
        "Slack",
        "Trello",
        "Copilot",
        "Cursor",
        "VS Code",
      ],
      icon: "fas fa-tools"
    },
    {
      title: "Design & Development",
      info: [
        "Figma",
        "Design Patterns",
        "Object-Oriented Programming",
        "SOLID",
        "Services Pattern",
        "Factory Pattern",
        "CQRS",
        "Query Optimization",
        "RESTful APIs",
        "API Documentation (Swagger)",
        "Cron jobs",
        "Queues",
        "Notifications",
        "Push Notifications",
        "Sockets",
        "Laravel Reverb",
        "Laravel Echo"
      ],
      icon: "fa fa-pencil-square-o"
    },
    {
      title: "Servers & Deployment",
      info: ["DigitalOcean", "Amazon Web Services", "Apache", "Nginx", "Laravel Forge", "Server Configuration"],
      icon: "fa fa-server"
    },
    {
      title: "Engineering Workflow",
      info: [
        "AI-assisted engineering: Cursor, Claude Code, ChatGPT, GitHub Copilot",
        "Planning, architecture exploration, documentation, and implementation support",
        "Engineering review and validation"
      ],
      icon: "fa fa-lightbulb-o"
    }
  ],
  portfolio: [
    {
      id: 1,
      name: "TransPro Alliance CRM",
      title: "TransPro Alliance CRM",
      pictures: [
        {
          img: transproImage1
        },
        {
          img: transproImage2
        },
        {
          img: transproImage3
        },
        {
          img: transproImage4
        }
        //we can multiple picture here
      ],
      technologies: ["PHP", "Laravel", "MySQL", "Redis", "Multi-Tenant Architecture", "Tenant-Aware Middleware", "Database-per-Tenant Architecture", "Database Sharding", "CQRS (Command Query Responsibility Segregation)", "Domain Driven Design (DDD)", "Spatie Multi-tenancy", "Subdomain Routing", "React.js", "Inertia.js", "RESTful APIs", "Design Patterns", "SOLID Principles", "OOP", "Factory Pattern", "Repository Pattern", "Service Pattern", "Dependency Injection", "Task Scheduling", "Queues", "API Documentation (Swagger)", "Application Design", "Application Architecture", "Blade Templates", "Authentication", "Authorization", "Database Optimization", "Performance Optimization", "DevOps", "Server Configuration", "Deployment Pipelines", "Production Monitoring", "Maintenance", "CI/CD"],
      category: "Multi-tenant CRM & Business Management",
      date: "",
      github: "",
      visit: "https://crm.transproalliance.com/",
      description: "Led the complete development lifecycle of a comprehensive multi-tenant CRM system for TransPro Alliance, from initial architecture design to production deployment and ongoing maintenance. Implemented advanced multi-tenant architecture using Spatie Multi-tenancy package with database-per-tenant isolation and database sharding for optimal performance and security. Built the frontend using React.js with Inertia.js for seamless server-side rendering and client-side interactivity. Applied CQRS (Command Query Responsibility Segregation) and Domain Driven Design (DDD) patterns for clean architecture and maintainable codebase. Implemented tenant-aware middleware and subdomain routing to ensure proper tenant isolation and seamless user experience. Developed advanced CRM features including customer management, lead tracking, sales pipeline, reporting dashboards, and automated workflows. Integrated Redis for high-performance cache management and queue processing to handle background tasks and improve application responsiveness. Handled complete DevOps responsibilities including server configuration, deployment pipelines, monitoring, and performance optimization. Utilized Laravel's service container and dependency injection for scalable application architecture. Applied SOLID principles, Repository and Service patterns for maintainable code architecture. Optimized database queries and implemented Redis-based caching strategies for enhanced performance across multiple tenant environments. Managed production environment, implemented monitoring solutions, and provided ongoing maintenance and feature enhancements."
    },
    {
      id: 2,
      name: "SheenPay",
      title: "SheenPay",
      pictures: [
        {
          img: sheenpayImage1 // Placeholder - you can replace with actual SheenPay image
        }
        //we can multiple picture here
      ],
      technologies: ["PHP", "Laravel", "MySQL", "RESTful APIs", "Payment Gateway Integration", "Design Patterns", "SOLID Principles", "OOP", "Factory Pattern", "Repository Pattern", "Service Pattern", "Dependency Injection", "Task Scheduling", "Queues", "API Documentation (Swagger)", "Application Design", "Application Architecture"],
      category: "FinTech & Payment Solutions",
      categories: ["FinTech & Payment Solutions", "Website & API's"],
      date: "",
      github: "",
      visit: "https://sheenpay.pk/",
      description:
        "SheenPay is a BNPL platform serving web, Android, and external application integrations. I solely owned its frontend work, including configuration-driven multi-step forms that render from backend-managed fields and step order. I also solely owned the Email Module with WYSIWYG editing, live HTML preview, template testing, and AWS SES/SendGrid provider switching. My contributions also include APIs, payment and installment idempotency, administration systems, architecture, planning, and technical documentation."
    },
    {
      id: 3,
      name: "PriceOye",
      title: "PriceOye",
      pictures: [
        {
          img: priceoyeImage
        }
        //we can multiple picture here
      ],
      technologies: [
        "Laravel",
        "PHP",
        "MySQL",
        "Vue",
        "Jquery",
        "Blade",
        "3PL API Integration",
      ],
      category: "E-Commerce",
      github: "",
      date: "",
      visit: "https://priceoye.pk/",
      description:
        "PriceOye is an e-commerce platform for mobile phones and electronics. My full-stack work spans Laravel/PHP backend, Vue.js and Blade frontend, administration systems, Cart modernization with Pinia, SQL and payload optimization, queues, caching, APIs, Elasticsearch, and third-party logistics integrations. I solely owned the Delivery Charges Module and contributed to the administration-side approval and audit system."
    },
    {
      id: 4,
      name: "IQ Pages",
      title: "IQ Pages",
      pictures: [
        {
          img: iqpagesImage1
        }
        //we can multiple picture here
      ],
      technologies: ["PHP", "Laravel", "VueJs", "InertiaJs", "MySQL", "Laravel Forge", "PayPal"],
      category: "Marketing & Online Advertising",
      date: "",
        parentCompany: 'Priceoye Technology',
      github: "",
      visit: "https://iqpages.com/",
      description:
        "IQ Pages is a game-changing marketing concept that combines a business directory with email, 'deal-of-the-day' and online advertising. It simplifies searches for companies and deals, while drastically reducing advertising costs for businesses, making their products and services less expensive. "
    },
    {
      id: 5,
      name: "Breaker19 - Carrier Portal",
      title: "Breaker19",
      pictures: [
        {
          img: breaker19Image1
        },
        {
          img: breaker19Image2
        }
        //we can multiple picture here
      ],
      technologies: ["VueJs", "RESTful API", "API Documentation (Swagger)", "PostgreSQL", "DynamoDB", "AWS Elastic Compute Cloud", "AWS SES", "AWS S3", "AUTH0", "TURVO API"],
      category: "Website & API's",
      date: "",
      github: "",
      visit: "https://www.breaker19.app/",
      description:
        "I was involved in building the Breaked19 Carrier Portal, essentially like an Uber for Oilfield Hotshot & Trucking. My role primarily focused on developing RESTful APIs and backend functionalities. Additionally, I was responsible for crafting the carrier portal website using Vue.js."
    },

    {
      id: 7,
      name: "Echo",
      title: "Echo — Customer Engagement Platform",
      parentCompany: 'Priceoye Technology',
      pictures: [],
      technologies: ["Laravel", "PHP", "PostgreSQL", "Redis", "Queues", "Event-driven Architecture", "API Design", "Elasticsearch"],
      category: "Customer Engagement / Internal Platform",
      date: "",
      github: "",
      visit: "",
      description:
        "Echo is an internal customer-engagement platform in ongoing development for PriceOye and SheenPay. I contribute across research, application planning, system architecture, technical documentation, frontend, backend, APIs, and core customer-engagement capabilities. Production outcomes and internal architecture details are not published here."
    },

    {
      id: 6,
      name: "Data Transfer Object",
      title: "DTO Package",
      pictures: [
        {
          img: libraryImage1
        },
        {
          img: libraryImage2
        }
        //we can multiple picture here
      ],
      technologies: ["PHP", "Laravel", "SOLID Principles", "OOP", "Factory Pattern"],
      category: "Package",
      date: "",
      github: "https://github.com/saleem189/data-transfer-object",
      visit: "https://github.com/saleem189/data-transfer-object",
      description:
        "This package facilitates handling Data Transfer Objects. It allows easy access to individual properties and conversion to JSON or Arrays."
    }
    // can add more Projects here
  ],
  portfolio_design: [
    {
      name: "TransPro Alliance CRM",
      pictures: [
        {
          img: transproImage1
        },
        {
          img: transproImage2
        },
        {
          img: transproImage3
        },
        {
          img: transproImage4
        }
      ],
      technologies: ["React.js", "Inertia.js", "Laravel", "Blade Templates", "Responsive Design", "Multi-tenant UI", "Dashboard Design", "Custom CSS", "Bootstrap", "Subdomain Routing", "Tenant-Aware Frontend"],
      category: "Multi-tenant CRM & Business Management",
      date: "",
      visit: "https://crm.transproalliance.com/",
      description: "Designed and developed the user interface for TransPro Alliance CRM using React.js with Inertia.js for seamless server-side rendering and client-side interactivity. Created intuitive dashboards for customer management, sales pipeline visualization, and reporting analytics with tenant-aware frontend components. Implemented responsive design principles ensuring seamless experience across all devices and tenant configurations. Built dynamic forms and workflows that adapt to different tenant requirements while maintaining consistent branding and user experience. Utilized subdomain routing for proper tenant isolation and seamless navigation between different tenant environments."
    },
    {
      name: "SheenPay",
      pictures: [
        {
          img: sheenpayImage1
        }
      ],
      technologies: ["Responsive Design", "Custom Scss", "Blade Templates"],
      category: "FinTech & Payment Solutions",
      parentCompany: 'Priceoye Technology',
      date: "",
      visit: "https://sheenpay.pk/",
      description:
        "Designed and developed the user interface for SheenPay, a Shariah-compliant BNPL platform. Created mobile-first designs for installment management, payment flows, and the user dashboard. Implemented admin-configurable step-forms, email templates, and payment workflows, and supported integrations with payment gateways and backend processing for installments and idempotent payment handling."
    },
    {
      name: "IQ Pages",
      pictures: [
        {
          img: iqpagesImage1
        }
      ],
      technologies: ["VueJs", "InertiaJs", "Tailwind CSS"],
      category: "Marketing & Online Advertising",
      date: "",
    },
    {
      name: "Breaker19 - Carrier Portal",
      pictures: [
        {
          img: breaker19Image1
        },
        {
          img: breaker19Image2
        }
      ],
      technologies: ["VueJs", "Tailwind CSS"],
      category: "Website",
      date: "",
      github: "",
      visit: "https://www.breaker19.app/",
      description:
        "I was involved in building the Breaked19 Carrier Portal, essentially like an Uber for Oilfield Hotshot & Trucking. My role primarily focused on developing RESTful APIs and backend functionalities. Additionally, I was responsible for crafting the carrier portal website using Vue.js."
    },
    {
      name: "Echo",
      pictures: [],
      technologies: ["Laravel", "PHP", "PostgreSQL", "Redis", "Event-driven Architecture"],
      category: "Customer Engagement",
      date: "",
      visit: "",
      description: "Echo is an internal customer engagement platform used by PriceOye and SheenPay. Work included designs for journeys, campaigns, segmentation and profiles to support personalized engagement flows."
    },
    {
      name: "PriceOye",
      pictures: [
        {
          img: priceoyeImage
        }
      ],
      technologies: [
        "Vue",
        "Jquery",
        "Blade",
      ],
      category: "Website",
      github: "",
      date: "",
      visit: "https://priceoye.pk/",
      description:
        "Priceoye is Pakistan's No.1 marketplace for buying original mobile phones and electronics. Priceoye is Pakistan's most trusted online store and offers the lowest prices every day."
    },
  ],
  
  recommendations: [
    {
      title: "Saleem is an exceptional Laravel developer who consistently delivers high-quality solutions. His expertise in Vue.js and Inertia.js, combined with his strong understanding of design patterns, makes him a valuable asset to any development team. He's particularly skilled at writing clean, maintainable code and implementing SOLID principles.",
      author: "Muhammad Usman",
      position: "Technical Lead",
      company: "Peek International",
      location: "Rawalpindi, Pakistan"
    },
    {
      title: "Working with Saleem on the Breaker19 project was a great experience. His ability to design and implement complex RESTful APIs, combined with his expertise in AWS services, helped us deliver a robust and scalable solution. His attention to detail and problem-solving skills are outstanding.",
      author: "Ahmed Khan",
      position: "Project Manager",
      company: "Breaker19",
      location: "United States"
    },
    {
      title: "Saleem's contribution to our e-commerce platform at Priceoye was invaluable. His deep understanding of Laravel and Vue.js, along with his ability to integrate third-party services, helped us improve our platform's performance and user experience significantly.",
      author: "Sarah Malik",
      position: "CTO",
      company: "Priceoye Technology",
      location: "Islamabad, Pakistan"
    },
    {
      title: "As Saleem's mentor during his MERN stack training, I was impressed by his quick learning ability and dedication to mastering new technologies. His transition from Laravel to the MERN stack was seamless, demonstrating his adaptability and strong foundation in software development principles.",
      author: "Zain Ali",
      position: "Senior Developer",
      company: "Teresol",
      location: "Pakistan"
    }
  ]
};

export default info;
