/**
 * projects.js – Static project data.
 * Replace placeholder images with real screenshots in /src/assets/images/
 */
export const projects = [
  {
    id: 1,
    title: 'Online Shopping Data Analyzer',
    description:
      'A Python/Pandas pipeline that cleans, preprocesses, and visualizes e-commerce transaction data. Includes trend analysis, customer segmentation, and an interactive dashboard.',
    image: 'https://placehold.co/600x360/111118/7c3aed?text=Data+Analyzer',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
    github: 'https://github.com/yourusername/shopping-analyzer',
    live: '',
  },
  {
    id: 2,
    title: 'REST API with Flask & PostgreSQL',
    description:
      'A production-ready RESTful API built with Flask, featuring JWT authentication, CRUD operations, database connection pooling, and Swagger documentation.',
    image: 'https://placehold.co/600x360/111118/06b6d4?text=Flask+API',
    tech: ['Python', 'Flask', 'PostgreSQL', 'JWT', 'Postman'],
    github: 'https://github.com/yourusername/flask-rest-api',
    live: '',
  },
  {
    id: 3,
    title: 'Full-Stack Todo App',
    description:
      'A full-stack task manager with a React frontend and Node.js/Express backend. Supports user auth, real-time updates, and MySQL persistence. Containerized with Docker.',
    image: 'https://placehold.co/600x360/111118/a78bfa?text=Todo+App',
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'Docker'],
    github: 'https://github.com/yourusername/fullstack-todo',
    live: 'https://your-live-demo.vercel.app',
  },
  {
    id: 4,
    title: 'Java File I/O Manager',
    description:
      'A command-line Java application for efficient file read/write operations, supporting bulk CSV processing, custom serialization, and error-resilient buffered I/O.',
    image: 'https://placehold.co/600x360/111118/34d399?text=Java+FileIO',
    tech: ['Java', 'OOP', 'CSV', 'BufferedIO', 'JUnit'],
    github: 'https://github.com/yourusername/java-file-manager',
    live: '',
  },
  {
    id: 5,
    title: '3D Portfolio Website',
    description:
      'This very portfolio – built with React, Vite, and Three.js via @react-three/fiber. Features a 3D interactive skill sphere, smooth animations, and dark glassmorphism design.',
    image: 'https://placehold.co/600x360/111118/f472b6?text=3D+Portfolio',
    tech: ['React', 'Vite', 'Three.js', 'R3F', 'CSS3'],
    github: 'https://github.com/yourusername/portfolio',
    live: 'https://your-portfolio.vercel.app',
  },
  {
    id: 6,
    title: 'AWS S3 File Upload Service',
    description:
      'A Node.js microservice for securely uploading, retrieving, and deleting files from AWS S3. Supports presigned URLs, MIME validation, and size limits.',
    image: 'https://placehold.co/600x360/111118/fb923c?text=S3+Service',
    tech: ['Node.js', 'AWS S3', 'Express', 'Multer', 'IAM'],
    github: 'https://github.com/yourusername/s3-upload-service',
    live: '',
  },
]
