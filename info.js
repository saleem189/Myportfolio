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

let info = {
  name: "Saleem Ayoub",
  logo_name: "Saleem",
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
    return `I'm a Senior Laravel Engineer with ${experience.years}.${experience.months}+ years of experience building scalable SaaS platforms and FinTech solutions and E-commerce platforms. I specialize in architecting robust web applications using Laravel, Vue.js, and modern cloud technologies, with a proven track record of delivering high-impact solutions for international markets.<br><br> My expertise spans full-stack development, system architecture, and performance optimization. I've successfully led development teams, implemented enterprise-level design patterns, and delivered solutions that handle millions of transactions. I'm passionate about clean code architecture, scalable system design, and mentoring junior developers.<br><br> Currently open to remote opportunities worldwide, I bring a unique blend of technical expertise and business acumen to help companies build robust, scalable applications that drive business growth.`;
  },
  links: {
    linkedin: "https://www.linkedin.com/in/muhammad-saleem-ayoub-20bb581b8/",
    github: "https://github.com/saleem189",
    resume: "https://drive.google.com/file/d/1tWPmtZeEQsEclNiraaVezOCnE8SyxlOZ/view"
  },
  contact: {
    email: "saleemayoub1@gmail.com",
    phone: "+923001234567",
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
      name: "Priceoye Technology",
      place: "Islamabad, Federal Capital Territory, Pakistan",
      date: "Feb, 2024 - Aug, 2025",
      position: "Sr. Laravel Developer",
      description:
        "As a Senior Laravel Developer, I designed and implemented a Field Approval System for model/field changes. Led the Delivery Charges Module using Factory Pattern and OOP principles for scalability. Redesigned the Cart Page in Vue.js with Pinia, improving UX and performance. Integrated secure payment gateways and optimized SQL queries to enhance transaction efficiency and Core Web Vitals. Refactored legacy code using OOP, applied Repository and Service Patterns, and leveraged Laravel Service Container for maintainable, scalable applications. Implemented task scheduling, authentication, cron jobs, and queues for high-performance SaaS and E-commerce platforms.",
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
      name: "Peek International",
      place: "Rawalpindi, Punjab, Pakistan",
      date: "Aug, 2021 - Feb, 2024",
      position: "Full Stack Laravel Developer",
      description:
        "As a full-stack Laravel developer, I worked extensively on crafting robust web applications from backend to frontend. I have experience with Vue.js and Inertia.js, enabling seamless integration of dynamic user interfaces. I utilized AWS services for deployment and development, successfully managing servers for optimal performance and scalability across various projects. With a comprehensive skill set and a proven track record in problem-solving, I consistently delivered high-quality solutions that surpassed expectations",
      skills: ["cPanel", "OOP", "VueJS","ReactJs", "Nodejs", "ExpressJs" ,"NGINX", "Apache", "PHP", "Laravel", "SQL", "PostgreSQL","Supervisor", "Git", "CI/CD", "Docker", "Design Patterns", "HTML", "Bootstrap", "Tailwind CSS", "Laravel Forge", "Linux", "Server Configurations", "AWS", "Javascript", "CSS", "Jquery", "InertiaJs", "RESTful APIs", "API Documentation (Swagger)", "Cron jobs", "Queues", "Notifications", "Push Notifications", "AWS S3", "AWS DynamoDB", "AWS SES"]
    },
    {
      name: "MERN Stack Training",
      place: "Islamabad, Federal Capital Territory, Pakistan",
      date: "Feb, 2023 - Apr, 2023",
      position: "MERN Stack Trainee",
      description:
        "Completed Teresol Pvt Ltd's intensive 300-hour TechLift Program, specializing in the MERN stack. Acquired comprehensive skills in MongoDB, Express.js, React, and Node.js for full-stack web development. Developed expertise in building robust and scalable web applications through hands-on projects and real-world applications. Equipped with the knowledge and practical experience to excel as a skilled full-stack developer in today's dynamic industry.",
      skills: ["ReactJs", "MongoDB", "ExpressJS", "NodeJS", "Tailwind CSS", "FIGMA"]
    },
    {
      name: "Eziline Software House",
      place: "Rawalpindi, Punjab, Pakistan",
      date: "Apr, 2021 - Aug, 2021",
      position: "Laravel Intern",
      description:
        "My professional journey took its initial steps with a Software Engineer internship at Eziline Software House. This opportunity allowed me to delve into the realm of full-stack development, where I gained practical experience in utilizing technologies such as Bootstrap for responsive UI, templating for dynamic content, and JavaScript for enhancing user interactions. During this period, I was introduced to the powerful capabilities of the Laravel framework, igniting a passion for creating efficient and robust applications. This internship served as a crucial foundation for my ongoing career growth.",
      skills: ["Laravel", "PHP", "Bootstrap", "JavaScript", "VueJS", "Jquery", "MySQL"]
    },
  ],
  skills: [
    {
      title: "languages",
      info: [
        "PHP",
        "Javascript",
        "SQL",
        "NoSQL",
        "NodeJS"
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
      info: ["MySQL", "PostgreSQL", "MongoDB", "AWS DynamoDB"],
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
        "Cursor Ai",
        "VS Code",
      ],
      icon: "fas fa-tools"
    },
    {
      title: "Design & Development",
      info: ["Figma", "Design Patterns", "Object-Oriented Programming", "SOLID", "Services Pattern", "Factory Pattern", "Query Optimization", "RESTful API's", "API Documentation (Swagger)", "Cron jobs", "Queues", "Notifications", "Push Notifications"],
      icon: "fa fa-pencil-square-o"
    },
    {
      title: "Servers & Deployment",
      info: ["Ocean Digital", "Amazon Aws", "Apache", "Nginx", "Laravel Forge", "Server Configurations"],
      icon: "fa fa-server"
    }
  ],
  portfolio: [
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
      name: "SheenPay",
      pictures: [
        {
          img: sheenpayImage1 // Placeholder - you can replace with actual SheenPay image
        }
        //we can multiple picture here
      ],
      technologies: ["PHP", "Laravel","MySQL", "RESTful APIs", "Payment Gateway Integration", "Design Patterns", "SOLID Principles", "OOP", "Factory Pattern", "Repository Pattern", "Service Pattern", "Dependency Injection", "Task Scheduling", "Queues", "API Documentation (Swagger)", "Application Design", "Applicaion Architecture"],
      category: "FinTech & Payment Solutions",
      date: "" ,
      github:
        "",
      visit: "https://sheenpay.pk/",
      description:
        "Developed the SheenPay BNPL platform frontend using Blade templates and key modules. Engineered a dynamic, Google Forms–style stepform system fully configurable from the admin panel, allowing non-technical teams to create multi-step workflows without code changes. Built a complete Email Module with a live HTML preview and editor for dynamic email templates, fully managed from the admin panel. Contributed to application architecture and design, utilized Laravel Service Container for service classes and common classes, integrated RESTful APIs, managed backend tasks including cron jobs and queues, and integrated Firebase for mobile-based notifications to enhance real-time user engagement."
    },
    {
      name: "PriceOye",
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
        "3PL API's Intergration",
      ],
      category: "E-Commerce",
      github: "",
      date: "",
      visit: "https://priceoye.pk/",
      description:
        "As a Full Stack Laravel Developer on PriceOye, I developed and optimized Pakistan's leading e-commerce platform for mobile phones and electronics. Built frontend features using both Blade templates and Vue.js, enhancing UX across product listings, checkout workflows, and dynamic components. Integrated secure payment gateways and 3PL APIs for seamless order fulfillment, and optimized SQL queries for efficient transaction handling. Refactored legacy code with OOP principles and applied Repository & Service Patterns, leveraging Laravel Service Container for maintainable, scalable applications. Implemented RESTful APIs, cron jobs, and queues to automate processes and improve platform performance. Contributed to application architecture and design, ensuring a robust, high-performance E-commerce platform."
    },
    {
      name: "IQ Pages",
      pictures: [
        {
          img: iqpagesImage1
        }
        //we can multiple picture here
      ],
      technologies: ["PHP", "Laravel", "VueJs", "InertiaJs", "MySQL", "Laravel Forge", "PayPal"],
      category: "Marketing & Online Advertising",
      date: "" ,
      github:
        "",
      visit: "https://iqpages.com/",
      description:
        "IQ Pages is a game-changing marketing concept that combines a business directory with email, 'deal-of-the-day' and online advertising. It simplifies searches for companies and deals, while drastically reducing advertising costs for businesses, making their products and services less expensive. "
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
        //we can multiple picture here
      ],
      technologies: ["VueJs", "RESTful API", "API Documentation (Swagger)" , "PostgreSQL", "DynamoDB","AWS Elastic Compute Cloud", "AWS SES", "AWS S3", "AUTH0", "TURVO API"],
      category: "Website & API's",
      date: "",
      github: "",
      visit: "https://www.breaker19.app/",
      description:
        "I was involved in building the Breaked19 Carrier Portal, essentially like an Uber for Oilfield Hotshot & Trucking. My role primarily focused on developing RESTful APIs and backend functionalities. Additionally, I was responsible for crafting the carrier portal website using Vue.js."
    },
   
    {
      name: "Data Tranfer Object",
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
      category: "Packege",
      date: "",
      github: "",
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
      date: "" ,
      visit: "https://sheenpay.pk/",
      description:
        "Designed and developed the user interface for SheenPay, a Shariah-compliant BNPL platform. Created intuitive mobile-first designs for the installment management system, payment flows, and user dashboard. Implemented responsive design principles ensuring seamless experience across all devices."
    },
    {
      name: "IQ Pages",
      pictures: [
        {
          img: iqpagesImage1
        }
      ],
      technologies: ["VueJs", "InertiaJs","Tailwind CSS"],
      category: "Marketing & Online Advertising",
      date: "" ,
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
