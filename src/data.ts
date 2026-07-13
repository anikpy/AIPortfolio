export interface Project {
  id: string;
  name: string;
  technology: string[];
  role: string;
  description: string;
  category: 'AI/ML & NLP' | 'DevOps & Cloud' | 'Automation & Scraping';
}

export interface Experience {
  company: string;
  location: string;
  title: string;
  period: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  major?: string;
  gpa: string;
  period: string;
  additionalInfo?: string;
}

export const personalInfo = {
  name: "Md Arifur Rahman Anik",
  title: "AI FullStack Developer & ML-DevOps Engineer",
  subtitle: "AI/ML and DevOps Specialist",
  email: "aniklpu01@gmail.com",
  phone: "+8801627220072",
  address: "Nikunja 2, Dhaka, Bangladesh",
  github: "https://github.com/anikpy",
  linkedin: "https://www.linkedin.com/in/md-arifur-rahman-anik-a32232172/",
  portfolio: "https://anikpy.github.io/MyPortfolio/",
  summary: "AI FullStack Developer and ML–DevOps Engineer with experience in building scalable machine learning systems, interactive data visualization portals, and automating cloud-based deployments. Skilled in developing intelligent APIs, managing CI/CD pipelines, and deploying AI models into production environments. Passionate about delivering full-stack platforms that combine modern React/Next.js interfaces with Python, Django, and reliable, maintainable infrastructure.",
  avatarUrl: "/src/assets/images/anik_actual_profile_1783940385651.jpg",
  bannerUrl: "/src/assets/images/devops_ml_hero_banner_1783939349778.jpg",
  achievements: [
    "IELTS: 6 (British Council)",
    "Elasticsearch 8 certifications from Udemy"
  ]
};

export const skillsData = {
  programmingLanguages: [
    { name: "Python", level: "Expert" },
    { name: "Django", level: "Expert" },
    { name: "LangChain", level: "Advanced" },
    { name: "LangGraph", level: "Advanced" },
    { name: "Agentic AI", level: "Advanced" },
    { name: "RAG & LLM Fine-Tuning", level: "Advanced" },
    { name: "Vector Embedding", level: "Advanced" }
  ],
  devopsAndCloud: [
    { name: "Docker", level: "Expert" },
    { name: "Kubernetes", level: "Advanced" },
    { name: "Nginx", level: "Expert" },
    { name: "CI/CD (Jenkins, ArgoCD)", level: "Advanced" },
    { name: "Terraform", level: "Intermediate" },
    { name: "Git", level: "Expert" },
    { name: "Load Balancing & Monitoring", level: "Advanced" }
  ],
  mlAndNlp: [
    { name: "TensorFlow", level: "Advanced" },
    { name: "Keras", level: "Advanced" },
    { name: "PyTorch", level: "Advanced" },
    { name: "Scikit-Learn", level: "Expert" },
    { name: "BERT", level: "Advanced" },
    { name: "NLP", level: "Expert" },
    { name: "OpenCV", level: "Advanced" },
    { name: "Text Classification", level: "Expert" },
    { name: "Data Preprocessing", level: "Expert" }
  ],
  databasesAndSearch: [
    { name: "ElasticSearch", level: "Expert" },
    { name: "PostgreSQL", level: "Expert" },
    { name: "ETL & ELT", level: "Advanced" },
    { name: "Kibana", level: "Advanced" },
    { name: "Redis Caching", level: "Advanced" }
  ],
  automation: [
    { name: "n8n Automation", level: "Expert" },
    { name: "Selenium", level: "Advanced" },
    { name: "Scrapy", level: "Expert" },
    { name: "API Development (FastAPI, Flask)", level: "Expert" }
  ]
};

export const experiences: Experience[] = [
  {
    company: "Nitol Niloy Group",
    location: "Dhaka, Bangladesh",
    title: "AI FullStack Developer",
    period: "July 2026 - Present",
    highlights: [
      "Engineered an enterprise-grade data visualization project using React, Next.js, and Django to deliver high-performance visual insights.",
      "Developed rich interactive charting interfaces and custom widgets to model key AI output matrices and multi-source analytics telemetry.",
      "Built and optimized API endpoints and database schemas in Django REST framework to handle high-volume analytical workloads.",
      "Fostered robust integration of full-stack AI services, ensuring smooth communication between Next.js clients and Python-based server cores."
    ]
  },
  {
    company: "Jobdesk Ltd",
    location: "Uttara, Dhaka",
    title: "Python Developer",
    period: "October 2023 - June 2026",
    highlights: [
      "Built and deployed a RAG-based model using gpt-oss to match CVs with job descriptions and retrieve the best candidates efficiently.",
      "Deployed a Gemma 4B based model in production to read images and generate explanations.",
      "Deployed a Ollama based ML model (gpt-oss:20b) in production to extract skills and other things from CV.",
      "Deployed an n8n instance to automate Gmail functionalities for candidates.",
      "Led deployment of multiple machine learning models and pipelines on high-availability infrastructures like vast.ai and containerized environments."
    ]
  },
  {
    company: "JobXprss Limited",
    location: "Niketon, Gulshan-1, Dhaka",
    title: "Junior Machine Learning Engineer",
    period: "Nov 2022 - May 2023",
    highlights: [
      "Automated an e-commerce platform by scraping 15,000 product listings from Startech and seamlessly uploading the data to a WordPress localhost.",
      "Implemented robust data scraping workflows using Selenium, Scrapy, and API integration to automate job data extraction from diverse websites, supporting high volume data ingestion.",
      "Managed end-to-end data scraping projects, ensuring quality control and timely delivery of accurate data into recruiting platforms.",
      "Enhanced data retrieval processes, improving overall search efficiency and maintaining up-to-date listings on the platform."
    ]
  },
  {
    company: "Ishraak Solutions Limited",
    location: "Niketon, Gulshan-1, Dhaka",
    title: "Junior Machine Learning Engineer (Intern)",
    period: "Nov 2021 - May 2023 (1.5 years overlapping)",
    highlights: [
      "Gained hands-on experience in computer vision, focusing on training and fine-tuning machine learning models for image detection and processing.",
      "Developed image detection models that enhanced object recognition accuracy, laying a foundation for automated visual inspection.",
      "Worked collaboratively with experienced engineers, gaining key insights into model optimization and deployment processes for scalable production-grade applications."
    ]
  }
];

export const educations: Education[] = [
  {
    institution: "Lovely Professional University",
    location: "Punjab, India",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    major: "Machine Learning",
    gpa: "7.15 CGPA",
    period: "Passing Year: 2022",
    additionalInfo: "Total credits: 160"
  },
  {
    institution: "Cantonment Public School and College",
    location: "Mymensingh, Bangladesh",
    degree: "Higher Secondary Certificate (HSC)",
    major: "Science",
    gpa: "4.67 GPA",
    period: "Passing Year: 2017"
  },
  {
    institution: "Kendua Joy Hari Spry Govt. High School",
    location: "Netrokona, Bangladesh",
    degree: "Secondary School Certificate (SSC)",
    major: "Science",
    gpa: "4.72 GPA",
    period: "Passing Year: 2015"
  }
];

export const projects: Project[] = [
  {
    id: "nitol-niloy-data-viz",
    name: "Enterprise AI Data Visualization Dashboard",
    technology: ["React", "Next.js", "Django", "D3.js", "PostgreSQL", "REST API", "Tailwind CSS"],
    role: "AI FullStack Developer",
    description: "Designed and engineered an interactive high-performance data analytics and visualization platform for Nitol Niloy Group. Integrates Next.js frontend with a Django backend to deliver stunning, real-time responsive analytics, SVG metrics, and predictive AI charts.",
    category: "AI/ML & NLP"
  },
  {
    id: "candidate-search-rag",
    name: "Candidate Search with GPT-OSS RAG",
    technology: ["ML", "Python", "gpt-oss", "Nginx", "DevOps", "ElasticSearch"],
    role: "Lead Developer",
    description: "Built and deployed a RAG-based (Retrieval-Augmented Generation) model using gpt-oss to match candidate CVs with job descriptions, indexing vectors in ElasticSearch to retrieve the best candidates efficiently.",
    category: "AI/ML & NLP"
  },
  {
    id: "gemma-explain",
    name: "Gemma 4B Image Explanation Model",
    technology: ["ML", "Python", "Gemma", "Ollama", "Nginx", "DevOps"],
    role: "ML Engineer",
    description: "Deployed Gemma 4B model in production via Ollama. Built an API wrapper to receive images and generate text explanations, used for automated resume/document image scanning.",
    category: "AI/ML & NLP"
  },
  {
    id: "ollama-cv-extraction",
    name: "Ollama (gpt-oss:20b) CV Extractor",
    technology: ["ML", "Python", "gpt-oss", "Ollama", "Nginx", "DevOps"],
    role: "ML-DevOps Engineer",
    description: "Deployed a large gpt-oss:20b model inside a vast.ai instance. Created pipeline for extracting structured skills, contact details, and experience information from unstructured raw PDF and Word CVs.",
    category: "AI/ML & NLP"
  },
  {
    id: "elasticsearch-cluster",
    name: "Triple-Node ElasticSearch Cluster",
    technology: ["Python", "Gunicorn", "ElasticSearch", "Kibana", "Nginx"],
    role: "Cluster Architect",
    description: "Configured and deployed a highly available three-node ElasticSearch cluster behind an Nginx load balancer. Built a custom Python ingestion API to store bulk document data with high-dimensional vector embeddings, implementing custom semantic search.",
    category: "DevOps & Cloud"
  },
  {
    id: "app-deployment-optimization",
    name: "Enterprise App Deployment & Tuning",
    technology: ["Kubernetes", "Nginx", "Apache", "Ingress", "Docker", "Python"],
    role: "Analyst & Lead DevOps",
    description: "Led the deployment and performance tuning of over 50 applications across Nginx, Apache, and Kubernetes. Optimized configuration files for load balancing, caching, and ingress rules, resulting in higher fault-tolerance and scalability.",
    category: "DevOps & Cloud"
  },
  {
    id: "cicd-jenkins-kubes",
    name: "Containerized CI/CD Integration",
    technology: ["Docker", "Jenkins", "Kubernetes", "ArgoCD", "Git"],
    role: "Pipeline Manager",
    description: "Established continuous integration and deployment (CI/CD) pipelines using Jenkins and Docker. Automated building, testing, and containerized deployment to Kubernetes clusters, ensuring resilient zero-downtime rolling updates.",
    category: "DevOps & Cloud"
  },
  {
    id: "web-scraping-engine",
    name: "Scalable Web Scraping Engine",
    technology: ["Python", "Scrapy", "Selenium", "Nginx"],
    role: "Scraping Architect",
    description: "Developed and deployed an enterprise-grade scalable web scraping engine using Scrapy and Selenium on Nginx. Capable of parsing dynamic JavaScript-rendered pages across over 500 websites, extracting thousands of structured data records daily.",
    category: "Automation & Scraping"
  },
  {
    id: "n8n-gmail-automation",
    name: "Automated Gmail Candidate Funnel",
    technology: ["n8n", "Gmail API", "Automation", "Workflow Engineering"],
    role: "Automation Engineer",
    description: "Deployed and customized an n8n workflow automation server. Programmed conditional logic to automatically parse incoming candidates' applications, reply with screening forms, and sync statuses with ATS systems.",
    category: "Automation & Scraping"
  },
  {
    id: "redis-caching-layer",
    name: "Redis High-Traffic Cache Layer",
    technology: ["Redis", "Python", "API Performance", "Backend Tuning"],
    role: "Backend Optimizer",
    description: "Integrated Redis caching into heavy-traffic endpoints of the recruitment APIs, slashing database read times and reducing overall latency by 75% under intense simulated traffic loads.",
    category: "DevOps & Cloud"
  },
  {
    id: "ollama-recreate-jd",
    name: "Llama2 Job Description Recreator",
    technology: ["ML", "Python", "Llama2", "Ollama", "Nginx"],
    role: "ML Engineer",
    description: "Deployed Llama2 via Ollama, exposing a secured endpoint to rewrite and structure rough notes or raw user descriptions into professional, search-optimized job descriptions.",
    category: "AI/ML & NLP"
  },
  {
    id: "geo-traveltime-service",
    name: "Geolocation & Travel-Time Query API",
    technology: ["Nominatim", "PostgreSQL", "GIS", "Python"],
    role: "API Developer",
    description: "Installed and self-hosted Nominatim and Isochrone engines on a PostgreSQL GIS backend. Designed custom query endpoints for real-time calculation of driving/walking distances and geographical boundaries.",
    category: "Automation & Scraping"
  },
  {
    id: "doc-processing-api",
    name: "Document Processing API Suite",
    technology: ["Python", "FastAPI", "PDF Libraries", "OCR"],
    role: "API Developer",
    description: "Designed and engineered a suite of RESTful microservices for complex document manipulation. Includes parallelized PDF merging, image extraction from rich-media PDFs, and high-precision text OCR extraction.",
    category: "Automation & Scraping"
  },
  {
    id: "advanced-nlp-solutions",
    name: "Advanced NLP & CV APIs",
    technology: ["TensorFlow", "OpenCV", "BERT", "Python"],
    role: "Machine Learning Engineer",
    description: "Developed robust Natural Language Processing solutions utilizing BERT embeddings for resume semantic categorization. Also deployed a CV image verification API using TensorFlow and OpenCV.",
    category: "AI/ML & NLP"
  },
  {
    id: "job-refactoring-api",
    name: "Job Post Refactoring & Location Extractor",
    technology: ["Nominatim", "PostgreSQL", "Python", "Regex Parsing"],
    role: "Backend Engineer",
    description: "Engineered high-performance data cleaning and structural parsing algorithms to normalize unstructured scraper outputs. Integrated Nominatim for geographical coordinates normalization and indexation.",
    category: "Automation & Scraping"
  }
];
