import saleemImage from './src/assets/saleem.jpg';
import iqpagesImage1 from './src/assets/portfolio/iqpages.png';
import breaker19Image1 from './src/assets/portfolio/breaker19.png';
import breaker19Image2 from './src/assets/portfolio/breaker19-carrierportal.png';
import priceoyeImage from './src/assets/portfolio/priceoye.png';
import libraryImage1 from './src/assets/portfolio/library.png';
import libraryImage2 from './src/assets/portfolio/library2.png';
import sheenpayImage1 from './src/assets/portfolio/sheenpay.png';

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
    return `I'm a passionate Laravel engineer with ${experience.years}.${experience.months} years of hands-on experience, specializing in building robust and scalable web applications. With a Masters in Computer Science (MSc) from Khawaja Fareed University of Engineering and Information Technology (KFUEIT), I've built a strong foundation in software engineering principles and modern development practices. <br><br> I excel in modern web development, with deep expertise in Laravel, Vue.js, and Inertia.js. My approach combines clean code practices with powerful design patterns to create maintainable and efficient solutions. I'm a strong advocate for Agile methodologies, focusing on delivering value through collaborative development and continuous improvement. <br><br> What sets me apart is my attention to detail and systematic approach to problem-solving. I take pride in writing clean, well-documented code and implementing best practices that make applications both performant and maintainable. I'm constantly learning and adapting to new technologies, always eager to take on new challenges and contribute to innovative projects.`;
  },
  links: {
    linkedin: "https://www.linkedin.com/in/saleem-ayoub-20bb581b8/",
    github: "https://github.com/saleem189",
    resume: "https://drive.google.com/file/d/1tWPmtZeEQsEclNiraaVezOCnE8SyxlOZ/view"
  },
  education: [
    {
      name: "Khawaja Fareed Unveristy of Engineering and Information Technology",
      place: "Pakistan",
      date: "Oct, 2018 - Mar, 2021",
      degree: "Masters in Computer Science (MSc)",
      gpa: "",
      description:
        "Graduated with a MSc degree in Computer Science.",
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
      place: "Pakistan",
      date: "2016 - 2018",
      degree: "Bsc in Computer Science",
      gpa: "",
      description:
        "Graduated with a BSc degree in Computer Science.",
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
      place: "Islamabad, Pakistan",
      date: "Feb, 2024 - Present",
      position: "Sr. Laravel Developer",
      description:
        "As a Senior Laravel Developer, Built a Field Approval System for model/field changes. Led Delivery Charges Module with Factory Pattern and OOP for scalability. Redesigned Cart Page in Vue.js with Pinia, improving UX and performance. Integrated secure payment gateways, optimized SQL queries, and enhanced Core Web Vitals. Refactored legacy code using OOP, applied Repository & Service Patterns, and leveraged Laravel’s Service Container. Implemented scheduling, authentication, cron jobs, and queues for scalable apps.",
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
      place: "Rawalpindi, Pakistan",
      date: "Aug, 2021 - Feb, 2024",
      position: "Full Stack Laravel Developer",
      description:
        "As a full-stack Laravel developer, I worked extensively on crafting robust web applications from backend to frontend. I have experience with Vue.js and Inertia.js, enabling seamless integration of dynamic user interfaces. I utilized AWS services for deployment and development, successfully managing servers for optimal performance and scalability across various projects. With a comprehensive skill set and a proven track record in problem-solving, I consistently delivered high-quality solutions that surpassed expectations",
      skills: ["cPanel", "OOP", "VueJS","ReactJs", "Nodejs", "ExpressJs" ,"NGINX", "Apache", "PHP", "Laravel", "SQL", "PostgreSQL","Supervisor", "Git", "CI/CD", "Docker", "Design Patterns", "HTML", "Bootstrap", "Tailwind CSS", "Laravel Forge", "Linux", "Server Configurations", "AWS", "Javascript", "CSS", "Jquery", "InertiaJs", "RESTful APIs", "API Documentation (Swagger)", "Cron jobs", "Queues", "Notifications", "Push Notifications", "AWS S3", "AWS DynamoDB", "AWS SES"]
    },
    {
      name: "MERN Stack Training",
      place: "Teresol, Pakistan",
      date: "Feb, 2023 - Apr, 2023",
      position: "MERN Stack Trainee",
      description:
        "Completed Teresol Pvt Ltd's intensive 300-hour TechLift Program, specializing in the MERN stack. Acquired comprehensive skills in MongoDB, Express.js, React, and Node.js for full-stack web development. Developed expertise in building robust and scalable web applications through hands-on projects and real-world applications. Equipped with the knowledge and practical experience to excel as a skilled full-stack developer in today's dynamic industry.",
      skills: ["ReactJs", "MongoDB", "ExpressJS", "NodeJS", "Tailwind CSS", "FIGMA"]
    },
    {
      name: "Eziline Software House",
      place: "Rawalpindi, Pakistan",
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
        "SheenPay is a Shariah-compliant BNPL (Buy Now Pay Later) platform that enables customers to shop now and pay in 4 easy installments. As a Full Stack Developer, I worked on both frontend and backend development, implementing payment gateway integrations, user authentication, installment management, and mobile app development. The platform provides a seamless shopping experience with halal installment options, making it easier for customers to purchase their favorite products while maintaining Islamic financial principles."
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
        "Priceoye is Pakistan's No.1 marketplace for buying original mobile phones and electronics. Priceoye is Pakistan's most trusted online store and offers the lowest prices every day."
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
