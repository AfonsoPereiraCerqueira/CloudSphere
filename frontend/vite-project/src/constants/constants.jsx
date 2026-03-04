export const navItems = [
  { label: "About Us", href: "/about" },
  { label: "Plans", href: "/plans" },
  { label: "Contacts", href: "/contact" },
];

export const features = [
  {
    icon: "fa-duotone fa-chart-line-up",
    title: "High Performance",
    description:
      "Harness the power of our cutting-edge virtual machines that deliver exceptional speed and efficiency. Whether you're running complex applications, databases, or development environments, our high-performance hosts ensure your operations are smooth and uninterrupted.",
  },
  {
    icon: "fa-duotone fa-folder-magnifying-glass",
    title: "Search Information",
    description:
      "Find exactly what you need, when you need it. Our advanced search capabilities allow you to quickly access and manage your data, streamlining your workflow and enhancing productivity.",
  },
  {
    icon: "fa-duotone fa-file-shield",
    title: "Automatic Backup",
    description:
      "Never lose a single byte of data with our automatic backup service. We ensure your data is consistently backed up at regular intervals, providing reliable protection and quick recovery options in case of any data loss incidents.",
  },
  {
    icon: "fa-duotone fa-hard-drive",
    title: "Unlimited Storage",
    description:
      "Say goodbye to storage limitations. With CloudSphere, you get unlimited storage, giving you the flexibility to grow your data and applications without any constraints. Store as much as you need and scale effortlessly.",
  },
  {
    icon: "fa-duotone fa-shield-check",
    title: "Data Protection",
    description:
      "Your data security is our top priority. We implement robust data protection measures, including advanced encryption, secure access controls, and regular security audits, to keep your sensitive information safe and secure from any threats.",
  },
  {
    icon: "fa-duotone fa-users",
    title: "User Friendly Interface",
    description:
      "Manage your virtual environments with ease using our intuitive and user-friendly interface. Designed for both beginners and experts, our platform simplifies complex tasks, making it easy to deploy, monitor, and scale your virtual machines.",
  },
];

export const checklistItems = [
  {
    title: "Code Hosting",
    description:
      "Easily host your code, applications, and websites on our high-performance virtual machines, offering scalability and reliability for all your projects.",
  },
  {
    title: "Review code without worry",
    description:
      "Review code without worrying about losing your work. Our automatic backup service ensures your data is consistently backed up at regular intervals.",
  },
  {
    title: "Share with your team",
    description:
      "Collaborate with your team members by sharing your virtual environments. Our advanced search capabilities allow you to quickly access and manage your data, streamlining your workflow and enhancing productivity.",
  },
  {
    title: "Fast and reliable",
    description:
      "Our cutting-edge virtual machines deliver exceptional speed and efficiency, ensuring your operations are smooth and uninterrupted. Whether you're running complex applications, databases, or development environments, our high-performance hosts have got you covered.",
  },
];

export const API = [
  {
    UsersAPI: "http://172.20.10.13:5000/api/users",
  },
  {
    LoginAPI: "http://172.20.10.13:5000/api/users/login",
  },
  {
    RegisterAPI: "http://172.20.10.13:5000/api/users/register",
  },
  {
    SingleUserAPI: "http://172.20.10.13:5000/api/name/",
  },
  {
    ProductAPI: "http://172.20.10.13:5000/api/products",
  },
  {
    SingleProdAPI: "http://172.20.10.13:5000/api/products/name/",
  },
];

export const PricingOptions = [
  {
    title: "Basic Plan",
    price: "$9.99",
    features: [
      "High Performance: Access to standard high-performance virtual machines",
      "Search Information: Basic search capabilities",
      "Automatic Backup: Daily backups",
      "Storage: 10GB",
      "RAM: 8GB",
      "Data Protection: Standard data encryption",
      "User-Friendly Interface: Easy-to-use management interface",
      "Support: 24/7",
    ]
  },
  {
    title: "Pro Plan",
    price: "$29.99",
    features: [
      "High Performance: Enhanced performance with priority processing power",
      "Search Information: Advanced search capabilities",
      "Automatic Backup: Hourly backups",
      "Storage: 30GB",
      "RAM: 16GB",
      "Data Protection: Advanced data encryption and secure access controls",
      "User-Friendly Interface: Intuitive interface with additional management tools",
      "Support: 24/7, Email Support",
    ]
  },
  {
    title: "CloudSphere Plan",
    price: "$99.99",
    features: [
      "High Performance: Top-tier performance with dedicated resources",
      "Search Information: Premium search capabilities with real-time indexing",
      "Automatic Backup: Continuous real-time backups",
      "Storage: 100GB",
      "RAM: 32GB",
      "Data Protection: Premium data protection with multi-layer encryption and security audits",
      "User-Friendly Interface: Comprehensive interface with advanced management and analytics tools",
      "Support: 24/7, All Platforms (Priority)",
    ]
  },
]
