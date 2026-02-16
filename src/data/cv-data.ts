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
  description: string[];
  type: 'work' | 'education';
  technologies?: string[];
}

export const experiences: Experience[] = [
  {
    id: 'helvetia-ai-engineer',
    title: 'Conversational AI / DevOps Engineer',
    company: 'Helvetia Versicherungen Schweiz',
    location: 'Basel, Switzerland (Hybrid)',
    period: 'August 2025 - Present (7 months)',
    startDate: '2025-08',
    endDate: 'present',
    type: 'work',
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
    company: 'Team Customer & Partner Data at Helvetia',
    location: 'Basel, Switzerland',
    period: 'October 2023 - July 2025',
    startDate: '2023-10',
    endDate: '2025-07',
    type: 'work',
    description: [
      'Advanced from Working Student to Data Scientist, responsible for ensuring data quality of Helvetia\'s core systems',
      'Planned and developed data quality dashboard prototype using SAS Enterprise Guide and SAS Visual Analytics',
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
    description: [
      'Held multiple positions including internship and client consulting roles',
      'Gained foundational experience in banking, business processes, and client communication',
      'Supported transition into data and AI roles',
    ],
  },
];

export const education: Experience[] = [
  {
    id: 'master-cs',
    title: 'Computer Science (Machine Intelligence)',
    company: 'University of Basel - Department of Mathematics and Informatics',
    location: 'Basel, Switzerland',
    period: 'September 2024 - Present',
    startDate: '2024-09',
    endDate: 'present',
    type: 'education',
    description: ['Master\'s program in Computer Science with focus on Machine Intelligence'],
  },
  {
    id: 'bachelor-bit',
    title: 'Business Information Technology',
    company: 'FHNW',
    location: 'Basel, Switzerland',
    period: 'September 2021 - August 2024',
    startDate: '2021-09',
    endDate: '2024-08',
    type: 'education',
    description: ['Bachelor Program in English at FHNW'],
  },
  {
    id: 'ef-london',
    title: 'English Language Exchange',
    company: 'EF Education First',
    location: 'London, UK',
    period: 'June 2021 - July 2021',
    startDate: '2021-06',
    endDate: '2021-07',
    type: 'education',
    description: ['Language exchange as preparation for Bachelor Program'],
  },
  {
    id: 'vocational',
    title: 'Swiss Federal Vocational Baccalaureate',
    company: 'kvBL',
    location: 'Liestal, Switzerland',
    period: 'August 2015 - July 2018',
    startDate: '2015-08',
    endDate: '2018-07',
    type: 'education',
    description: ['Business school for obtaining the vocational baccalaureate'],
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
