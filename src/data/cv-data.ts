export const personalInfo = {
  name: 'Manuel Buser',
  title: 'AI Engineer',
  subtitle: 'Full Stack Developer',
  dateOfBirth: '30.05.1999',
  nationality: 'CH',
  address: 'Davidsbodenstrasse 30, 4056 Basel, Switzerland',
  phone: '+41 78 752 75 05',
  email: 'buser.manuel@hotmail.com',
  linkedin: 'https://www.linkedin.com/in/manuel-buser',
  github: 'https://github.com/manuel-buser', // Update with actual if exists
};

export const tagline = `Building AI systems that go beyond the demo phase. Production-grade, at enterprise scale.`;

export const profile = `AI Engineer with practical experience across data science, conversational AI, and cloud-based system integration. Skilled in developing and deploying end-to-end AI solutions that bridge technical innovation with real-world business impact. Experienced in machine learning, API development, and DevOps practices, with a focus on designing scalable, data-driven architectures that enhance automation and decision-making.`;

export const skills = {
  languages: [
    { name: 'German', level: 'Native' },
    { name: 'English', level: 'Fluent' },
  ],
  technical: {
    'Languages & Frameworks': [
      'Python',
      'Java',
      'JavaScript',
      'React',
      'HTML',
      'CSS',
      'Spring Boot',
      'Quarkus',
    ],
    'Integrations & Architectures': [
      'REST APIs',
      'Kafka',
      'Microservices',
      'Onion Architecture',
      'MVC Architecture',
    ],
    'AI & Machine Learning': [
      'NLP',
      'LLMs',
      'RAG',
      'Clustering',
      'Vector Databases',
      'Semantic Search',
      'PyTorch',
      'LangChain',
      'LangGraph',
      'Hugging Face',
    ],
    'Cloud & DevOps': [
      'OpenShift',
      'Docker',
      'GitOps',
      'ArgoCD',
      'CI/CD',
      'MLOps Pipelines',
    ],
    'Data Management': [
      'MongoDB',
      'Oracle',
      'MySQL',
      'Data Warehouses',
      'ETL Processes',
      'SQL',
      'Data Quality Monitoring',
    ],
    'Analytics & Reporting': [
      'Power BI',
      'SAS Visual Analytics',
      'Data Visualization',
      'KPI Dashboards',
    ],
    'Process Modeling & Automation': ['Adonis', 'Camunda', 'N8N'],
  },
};

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  summary: string;
  description: string[];
  type: 'work' | 'education';
  technologies?: string[];
}

export const experiences: Experience[] = [
  {
    id: 'helvetia-ai-engineer',
    title: 'Conversational AI / DevOps Engineer',
    company: 'Helvetia Insurance Switzerland · AI & Bots',
    location: 'Basel, Switzerland (Hybrid)',
    period: 'August 2025 - Present',
    startDate: '2025-08',
    endDate: 'present',
    type: 'work',
    summary: 'Building enterprise voice AI agents on Parloa handling 500K+ calls/year, with cloud-native backends on OpenShift.',
    description: [
      'Conversational AI & Platform Engineering: Drive technical implementation of enterprise-scale AI voice agents on Parloa, managing 500,000+ calls/year (doubling through Helvetia–Baloise merger). Design complex conversation architectures, specialized Prompt Engineering, and RAG pipelines. Build automated testing infrastructures using simulation and evaluation agents to validate dialog flows and NLU performance at scale.',
      'Cloud-Native Backend & DevOps: Develop scalable microservices (Java/Quarkus, Python) on OpenShift. Implement API interfaces and business logic as deterministic services. Manage full deployment lifecycle via GitOps-based CI/CD with ArgoCD. Integrate and manage API interfaces on central Integration Platform (HIP) using declarative YAML for standardized delivery.',
      'Data Engineering & AI Analytics: Architect and operate cloud data pipelines using MongoDB and Azure to process conversation transcripts. Build LLM-based post-processing pipelines on Azure to extract structured KPIs. Co-developed PowerBI dashboards aggregating data from Webex, Salesforce, and transcript analysis for bot performance insights.',
    ],
    technologies: [
      'Python',
      'Java',
      'Quarkus',
      'LLMs',
      'RAG',
      'Prompt Engineering',
      'MongoDB',
      'Azure',
      'OpenShift',
      'ArgoCD',
      'GitOps',
      'Power BI',
      'Parloa',
    ],
  },
  {
    id: 'helvetia-data-scientist',
    title: 'Data Scientist',
    company: 'Helvetia Insurance Switzerland · Customer & Partner Data',
    location: 'Basel, Switzerland',
    period: 'October 2023 - July 2025',
    startDate: '2023-10',
    endDate: '2025-07',
    type: 'work',
    summary: 'Owned data quality for core systems; built dashboards, address verification, and customer-deduplication automation.',
    description: [
      'Advanced from Working Student to Data Scientist, responsible for ensuring data quality of Helvetia\'s core systems',
      'Planned and developed data quality dashboard prototype as my bachelor thesis using SAS Enterprise Guide and SAS Visual Analytics',
      'Created and maintained on-demand reporting for customer database and Salesforce UNO (CRM)',
      'Designed automation solutions including address verification service with Swiss Post',
      'Led development of customer duplicate-detection algorithm and automated merging process',
      'Served as project manager, coordinating cross-functional teams',
    ],
    technologies: [
      'Python',
      'SAS',
      'SQL',
      'Salesforce',
      'ETL',
      'Data Warehouses',
    ],
  },
  {
    id: 'blkb-consultant',
    title: 'Consultant Outbound / Intern',
    company: 'BLKB',
    location: 'Liestal, Switzerland',
    period: 'December 2018 - September 2023',
    startDate: '2018-12',
    endDate: '2023-09',
    type: 'work',
    summary: 'Banking and client consulting roles that gave me a strong business foundation. I still rely on it in IT to always understand the business side.',
    description: [
      'Held multiple positions including internship and client consulting roles',
      'Gained foundational experience in banking, business processes, and client communication',
      'Built the business intuition I still draw on as an engineer, so technical work always stays grounded in real business context',
    ],
  },
];

export const education: Experience[] = [
  {
    id: 'master-cs',
    title: 'M.Sc. Computer Science (Machine Intelligence)',
    company: 'University of Basel, Department of Mathematics and Computer Science',
    location: 'Basel, Switzerland',
    period: 'September 2024 - Present',
    startDate: '2024-09',
    endDate: 'present',
    type: 'education',
    summary: 'M.Sc. with a Machine Intelligence specialization, focused on deep learning, ML, and applied AI research.',
    description: [],
  },
  {
    id: 'bachelor-bit',
    title: 'BSc Business Information Technology (Software Engineering Leadership)',
    company: 'FHNW, University of Applied Sciences and Arts Northwestern Switzerland',
    location: 'Basel, Switzerland',
    period: 'September 2021 - August 2024',
    startDate: '2021-09',
    endDate: '2024-08',
    type: 'education',
    summary: 'BSc in Business Information Technology with a Software Engineering Leadership specialization. Graduated top of class with the 2024 Diploma Award.',
    description: [],
  },
];

export const hobbies = [
  { icon: '⚽', name: 'Ball Sports', description: 'Diverse range of ball sports' },
  {
    icon: '🎧',
    name: 'Audio Books & Podcasts',
    description: 'Continuous learning through audio content',
  },
  {
    icon: '🥾',
    name: 'Hiking & Photography',
    description: 'Exploring nature and capturing moments',
  },
];
