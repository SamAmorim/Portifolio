import { 
  Award, Globe2, Layers, // Para Stats
  Github, Linkedin, Mail, // Para Footer/Hero
  Database, Brain, Cloud, // Para Hero Cards
  Terminal, // Para Logo
  ShieldCheck, Zap, TrendingUp, // Para KPIs
  MessageSquare, // Para Global
  CalendarClock, // Novo icone para tempo de experiencia
  MapPin, // Novo icone para local
  Sword, Scroll, // RPG Icons (Mantidos apenas para compatibilidade de tipos)
  Code2, 
  Cpu,
  Server,
  BarChart3,
  Network,
  Users // Adicionado para o KPI de usuários
} from 'lucide-react';
import { SkillPoint, SkillCategory, TimelineItem, Project, Stat, EducationItem, CertificationItem } from './types';

// =================================================================================
// 1. INFORMAÇÕES GERAIS & HERO
// =================================================================================
export const heroData = {
  pt: {
    logoName: "Samuel",
    logoSurname: "Amorim",
    openToWork: true,
    openToWorkText: "Open to Work: Data Science & Analytics",
    title: "Samuel",
    titleHighlight: "Amorim.",
    description: (
      <>
        Profissional de Dados focado em <strong>Análise e Modelagem de Dados</strong> e <strong>Data Science</strong> aplicada.
        <br className="hidden md:block" />
        Meu foco é em transformar dados brutos em inteligência estratégica, governança e modelos preditivos de alta performance.
      </>
    ),
    primaryCtaText: "Ver Projetos",
    secondaryCtaText: "Linkedin",
    secondaryCtaLink: "https://linkedin.com/in/samamorim",
    githubLink: "https://github.com/SamAmorim/",
    heroImage: "https://media.licdn.com/dms/image/v2/D4D03AQFShUiExc_lgA/profile-displayphoto-scale_400_400/B4DZoTTcF4G8Ag-/0/1761260456153?e=1768435200&v=beta&t=kTSr5nyvDfTqm7ogk-CyHcaBQSztg7S6zHjgQ0bgji8", 
    floatCard1: {
      icon: Database, 
      label: "Stack Principal", 
      text: "Azure & Databricks"
    },
    floatCard2: {
      icon: Brain, 
      label: "Especialidade",
      text: "Machine Learning"
    }
  },
  en: {
    logoName: "Samuel",
    logoSurname: "Amorim",
    openToWork: true,
    openToWorkText: "Open to Work: Data Science & Analytics",
    title: "Samuel",
    titleHighlight: "Amorim.",
    description: (
      <>
        Data Professional focused on <strong>Data Analysis & Modeling</strong> and applied <strong>Data Science</strong>.
        <br className="hidden md:block" />
        My focus is on transforming raw data into strategic intelligence, governance, and high-performance predictive models.
      </>
    ),
    primaryCtaText: "View Projects",
    secondaryCtaText: "Linkedin",
    secondaryCtaLink: "https://linkedin.com/in/samamorim",
    githubLink: "https://github.com/SamAmorim/",
    heroImage: "https://media.licdn.com/dms/image/v2/D4D03AQFShUiExc_lgA/profile-displayphoto-scale_400_400/B4DZoTTcF4G8Ag-/0/1761260456153?e=1768435200&v=beta&t=kTSr5nyvDfTqm7ogk-CyHcaBQSztg7S6zHjgQ0bgji8", 
    floatCard1: {
      icon: Database, 
      label: "Main Stack", 
      text: "Azure & Databricks"
    },
    floatCard2: {
      icon: Brain, 
      label: "Specialty",
      text: "Machine Learning"
    }
  }
};

// =================================================================================
// 2. ESTATÍSTICAS (Barra Limpa e Profissional)
// =================================================================================
export const statsData = {
  pt: [
    { label: 'Experiência em Dados', value: '3+ Anos', icon: CalendarClock }, 
    { label: 'Projetos Globais', value: 'Multinacionais', icon: Globe2 }, 
    { label: 'Foco Técnico', value: 'Data & AI', icon: Layers }, 
  ],
  en: [
    { label: 'Data Experience', value: '3+ Years', icon: CalendarClock }, 
    { label: 'Global Projects', value: 'Multinationals', icon: Globe2 }, 
    { label: 'Tech Focus', value: 'Data & AI', icon: Layers }, 
  ]
};

// =================================================================================
// 3. SKILLS DASHBOARD
// =================================================================================

export const skillColors: Record<SkillCategory, string> = {
  'Engenharia de Dados': '#3b82f6',     
  'Data Engineering': '#3b82f6',
  'Data Science & AI': '#10b981',       
  'Data Science & AI (EN)': '#10b981',
  'Analytics & Viz': '#f59e0b',         
  'Analytics & Viz (EN)': '#f59e0b',
  'Estratégia & Soft Skills': '#6366f1',
  'Strategy & Soft Skills': '#6366f1'
};

// Dados do Gráfico de Dispersão
const commonSkills = [
  { name: 'Python', x: 95, y: 95, z: 110 },
  { name: 'SQL', x: 85, y: 90, z: 105 },
  { name: 'PySpark', x: 80, y: 85, z: 100 },
  { name: 'Databricks', x: 90, y: 60, z: 105 },
  { name: 'ADF', x: 75, y: 55, z: 95 },
  { name: 'Lakehouse', x: 70, y: 70, z: 100 },
  { name: 'Microservices', x: 50, y: 30, z: 80 },
  { name: 'REST API', x: 65, y: 45, z: 85 },
  { name: 'ML', x: 65, y: 20, z: 95 },
  { name: 'TensorFlow', x: 60, y: 10, z: 90 },
  { name: 'Keras', x: 62, y: 12, z: 85 },
  { name: 'Statistics', x: 80, y: 5, z: 90 },
  { name: 'Scikit-Learn', x: 75, y: 15, z: 85 },
  { name: 'MLflow', x: 70, y: 25, z: 80 },
  { name: 'Power BI', x: 30, y: 90, z: 100 },
  { name: 'DAX', x: 40, y: 80, z: 95 },
  { name: 'Star Schema', x: 35, y: 60, z: 90 },
  { name: 'Governance', x: -50, y: 70, z: 90 },
  { name: 'Agile', x: -40, y: 50, z: 85 },
  { name: 'Six Sigma', x: -30, y: 40, z: 80 },
  { name: 'Prob. Solving', x: -70, y: 80, z: 95 },
];

export const skillsClusterData = {
  pt: [
    // --- Engenharia de Dados ---
    { name: 'Python', x: 95, y: 95, z: 110, category: 'Engenharia de Dados' },
    { name: 'SQL', x: 85, y: 90, z: 105, category: 'Engenharia de Dados' },
    { name: 'PySpark', x: 80, y: 85, z: 100, category: 'Engenharia de Dados' },
    { name: 'Databricks', x: 90, y: 60, z: 105, category: 'Engenharia de Dados' },
    { name: 'ADF', x: 75, y: 55, z: 95, category: 'Engenharia de Dados' },
    { name: 'Lakehouse', x: 70, y: 70, z: 100, category: 'Engenharia de Dados' },
    { name: 'Microservices', x: 50, y: 30, z: 80, category: 'Engenharia de Dados' },
    { name: 'REST API', x: 65, y: 45, z: 85, category: 'Engenharia de Dados' },
    // --- Data Science & AI ---
    { name: 'ML', x: 65, y: 20, z: 95, category: 'Data Science & AI' },
    { name: 'TensorFlow', x: 60, y: 10, z: 90, category: 'Data Science & AI' },
    { name: 'Keras', x: 62, y: 12, z: 85, category: 'Data Science & AI' },
    { name: 'Statistics', x: 80, y: 5, z: 90, category: 'Data Science & AI' },
    { name: 'Scikit-Learn', x: 75, y: 15, z: 85, category: 'Data Science & AI' },
    { name: 'MLflow', x: 70, y: 25, z: 80, category: 'Data Science & AI' },
    // --- Analytics & Viz ---
    { name: 'Power BI', x: 30, y: 90, z: 100, category: 'Analytics & Viz' },
    { name: 'DAX', x: 40, y: 80, z: 95, category: 'Analytics & Viz' },
    { name: 'Star Schema', x: 35, y: 60, z: 90, category: 'Analytics & Viz' },
    // --- Estratégia & Soft Skills ---
    { name: 'Governance', x: -50, y: 70, z: 90, category: 'Estratégia & Soft Skills' },
    { name: 'Agile', x: -40, y: 50, z: 85, category: 'Estratégia & Soft Skills' },
    { name: 'Six Sigma', x: -30, y: 40, z: 80, category: 'Estratégia & Soft Skills' },
    { name: 'Prob. Solving', x: -70, y: 80, z: 95, category: 'Estratégia & Soft Skills' },
  ] as SkillPoint[],
  en: [
    // --- Data Engineering ---
    { name: 'Python', x: 95, y: 95, z: 110, category: 'Data Engineering' },
    { name: 'SQL', x: 85, y: 90, z: 105, category: 'Data Engineering' },
    { name: 'PySpark', x: 80, y: 85, z: 100, category: 'Data Engineering' },
    { name: 'Databricks', x: 90, y: 60, z: 105, category: 'Data Engineering' },
    { name: 'ADF', x: 75, y: 55, z: 95, category: 'Data Engineering' },
    { name: 'Lakehouse', x: 70, y: 70, z: 100, category: 'Data Engineering' },
    { name: 'Microservices', x: 50, y: 30, z: 80, category: 'Data Engineering' },
    { name: 'REST API', x: 65, y: 45, z: 85, category: 'Data Engineering' },
    // --- Data Science & AI ---
    { name: 'ML', x: 65, y: 20, z: 95, category: 'Data Science & AI (EN)' },
    { name: 'TensorFlow', x: 60, y: 10, z: 90, category: 'Data Science & AI (EN)' },
    { name: 'Keras', x: 62, y: 12, z: 85, category: 'Data Science & AI (EN)' },
    { name: 'Statistics', x: 80, y: 5, z: 90, category: 'Data Science & AI (EN)' },
    { name: 'Scikit-Learn', x: 75, y: 15, z: 85, category: 'Data Science & AI (EN)' },
    { name: 'MLflow', x: 70, y: 25, z: 80, category: 'Data Science & AI (EN)' },
    // --- Analytics & Viz ---
    { name: 'Power BI', x: 30, y: 90, z: 100, category: 'Analytics & Viz (EN)' },
    { name: 'DAX', x: 40, y: 80, z: 95, category: 'Analytics & Viz (EN)' },
    { name: 'Star Schema', x: 35, y: 60, z: 90, category: 'Analytics & Viz (EN)' },
    // --- Strategy & Soft Skills ---
    { name: 'Governance', x: -50, y: 70, z: 90, category: 'Strategy & Soft Skills' },
    { name: 'Agile', x: -40, y: 50, z: 85, category: 'Strategy & Soft Skills' },
    { name: 'Six Sigma', x: -30, y: 40, z: 80, category: 'Strategy & Soft Skills' },
    { name: 'Prob. Solving', x: -70, y: 80, z: 95, category: 'Strategy & Soft Skills' },
  ] as SkillPoint[]
};

// KPIs DE IMPACTO
export const impactMetrics = {
  pt: [
    {
      id: 1,
      label: "Confiabilidade",
      value: "100%",
      suffix: "Golden Record",
      description: "Single Source of Truth no Data Hub",
      icon: ShieldCheck,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      id: 2,
      label: "Impacto",
      value: "+80",
      suffix: "Usuários Globais",
      description: "Acessando dashboards no mundo todo",
      icon: Users,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      id: 3,
      label: "Precisão AI",
      value: "95%+",
      suffix: "Modelagem Avançada",
      description: "Qualidade de dados e modelos preditivos",
      icon: Brain,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      id: 4,
      label: "Visualização",
      value: "KPIs",
      suffix: "Data Viz",
      description: "Visibilidade de dados para decisão",
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    }
  ],
  en: [
    {
      id: 1,
      label: "Reliability",
      value: "100%",
      suffix: "Golden Record",
      description: "Single Source of Truth in Data Hub",
      icon: ShieldCheck,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      id: 2,
      label: "Impact",
      value: "+80",
      suffix: "Global Users",
      description: "Accessing dashboards worldwide",
      icon: Users,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      id: 3,
      label: "AI Precision",
      value: "95%+",
      suffix: "Advanced Modeling",
      description: "Data quality & predictive models",
      icon: Brain,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      id: 4,
      label: "Visualization",
      value: "KPIs",
      suffix: "Data Viz",
      description: "Data visibility for decision making",
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    }
  ]
};

// DADOS DE COLABORAÇÃO GLOBAL (Global Collaboration)
export const globalLocations = {
  pt: [
    { country: "Brasil", flag: "🇧🇷", city: "São Paulo", role: "HQ & Data Engineering", status: "Active" },
    { country: "EUA", flag: "🇺🇸", city: "St. Louis / NJ", role: "Stakeholder Management", status: "Active" },
    { country: "Alemanha", flag: "🇩🇪", city: "Leverkusen", role: "Strategy & Directives", status: "Sync" },
    { country: "Índia", flag: "🇮🇳", city: "Bangalore", role: "Dev & Delivery", status: "Active" },
    { country: "LATAM", flag: "🌎", city: "Regional Hubs", role: "Business Partners", status: "Active" },
  ],
  en: [
    { country: "Brazil", flag: "🇧🇷", city: "São Paulo", role: "HQ & Data Engineering", status: "Active" },
    { country: "USA", flag: "🇺🇸", city: "St. Louis / NJ", role: "Stakeholder Management", status: "Active" },
    { country: "Germany", flag: "🇩🇪", city: "Leverkusen", role: "Strategy & Directives", status: "Sync" },
    { country: "India", flag: "🇮🇳", city: "Bangalore", role: "Dev & Delivery", status: "Active" },
    { country: "LATAM", flag: "🌎", city: "Regional Hubs", role: "Business Partners", status: "Active" },
  ]
};

export const hardSkillsList = [
  "Python", "SQL", "PySpark", 
  "Azure Databricks", "Azure Data Factory", 
  "TensorFlow", "Keras", "Java", "Microsserviços",
  "Power BI", "Data Governance", "Scrum", "Six Sigma"
];

// =================================================================================
// 4. LINHA DO TEMPO (Experiência)
// =================================================================================
export const timelineData = {
  pt: [
    {
      id: 1,
      year: 'Atual',
      title: 'Analista de Dados & Engenharia',
      company: 'Conquest One (Alocado na Bayer)',
      description: 'Atuação no Data Driven Hub. Desenvolvimento de pipelines de dados robustos (ETL/ELT) utilizando Azure Databricks e PySpark. Implementação de Governança de Dados para garantir confiabilidade (Single Source of Truth). Criação de Dashboards executivos em Power BI para suporte à decisão estratégica.',
      skills: ['Azure Databricks', 'PySpark', 'Data Governance', 'Power BI', 'SQL']
    },
    {
      id: 2,
      year: 'Anterior',
      title: 'Estágio em Strategy, Governance & Data',
      company: 'Bayer',
      description: 'Suporte à estratégia de dados e governança global. Participação na modernização de arquitetura de dados e colaboração com times globais usando metodologias ágeis (Scrum). Automação de processos e análise de qualidade de dados.',
      skills: ['ITIL', 'Data Governance', 'Agile', 'Comunicação Global', 'Excel']
    },
  ],
  en: [
    {
      id: 1,
      year: 'Current',
      title: 'Data Analyst & Engineering',
      company: 'Conquest One (Allocated at Bayer)',
      description: 'Working at the Data Driven Hub. Developing robust data pipelines (ETL/ELT) using Azure Databricks and PySpark. Implementing Data Governance to ensure reliability (Single Source of Truth). Creating executive Power BI dashboards to support strategic decision-making.',
      skills: ['Azure Databricks', 'PySpark', 'Data Governance', 'Power BI', 'SQL']
    },
    {
      id: 2,
      year: 'Previous',
      title: 'Strategy, Governance & Data Intern',
      company: 'Bayer',
      description: 'Supporting global data strategy and governance. Participating in data architecture modernization and collaborating with global teams using agile methodologies (Scrum). Process automation and data quality analysis.',
      skills: ['ITIL', 'Data Governance', 'Agile', 'Global Communication', 'Excel']
    },
  ]
};

// =================================================================================
// 5. PROJETOS
// =================================================================================
export const projectsData = {
  pt: [
    {
      id: 1,
      title: 'IARA: Antifraude AI',
      category: 'Data Science & Cloud',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop', 
      description: 'Solução de segurança para o PIX utilizando Deep Learning. Superação de sigilo bancário via dados sintéticos e arquitetura em cascata na Azure (Functions) para inferência em tempo real com baixo recall de fraude.',
      tags: ['TensorFlow', 'Azure', 'Microsserviços', 'MLflow', 'Python'],
      link: 'https://github.com/SamAmorim/IARA'
    },
    {
      id: 2,
      title: 'Music RecSys: AI Semissupervisionada',
      category: 'Machine Learning',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
      description: 'Sistema premiado de recomendação musical. Utiliza Aprendizado Semissupervisionado e Análise de Clusters (Elbow Method) para categorizar perfis sem rótulos e sugerir músicas via similaridade por cosseno.',
      tags: ['Scikit-Learn', 'Clustering', 'API REST', 'Flask', 'Pandas'],
      link: 'https://github.com/SamAmorim/Music_Recommendation_Algorithm_Semisupervised_AI'
    },
    {
      id: 3,
      title: 'PBI Kpi Builder',
      category: 'Open Source Tool',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 
      description: 'Acelerador de desenvolvimento que cria visuais HTML/CSS complexos para Power BI automaticamente. Elimina a concatenação manual de DAX, suportando temas dinâmicos (Light/Dark mode) e personalização via UI.',
      tags: ['Power BI', 'DAX', 'HTML/CSS', 'Open Source', 'UI/UX'],
      link: 'https://github.com/SamAmorim/pbi-ui-kit'
    }
  ],
  en: [
    {
      id: 1,
      title: 'IARA: Antifraud AI',
      category: 'Data Science & Cloud',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop', 
      description: 'PIX security solution using Deep Learning. Overcoming banking secrecy via synthetic data and cascaded Azure architecture (Functions) for real-time inference with low fraud recall.',
      tags: ['TensorFlow', 'Azure', 'Microservices', 'MLflow', 'Python'],
      link: 'https://github.com/SamAmorim/IARA'
    },
    {
      id: 2,
      title: 'Music RecSys: Semi-supervised AI',
      category: 'Machine Learning',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
      description: 'Award-winning music recommendation system. Uses Semi-Supervised Learning and Cluster Analysis (Elbow Method) to categorize unlabeled profiles and suggest songs via cosine similarity.',
      tags: ['Scikit-Learn', 'Clustering', 'API REST', 'Flask', 'Pandas'],
      link: 'https://github.com/SamAmorim/Music_Recommendation_Algorithm_Semisupervised_AI'
    },
    {
      id: 3,
      title: 'PBI Kpi Builder',
      category: 'Open Source Tool',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 
      description: 'Development accelerator creating complex HTML/CSS visuals for Power BI automatically. Eliminates manual DAX concatenation, supporting dynamic themes (Light/Dark mode) and UI customization.',
      tags: ['Power BI', 'DAX', 'HTML/CSS', 'Open Source', 'UI/UX'],
      link: 'https://github.com/SamAmorim/pbi-ui-kit'
    }
  ]
};

// =================================================================================
// 6. FOOTER & CONTATO
// =================================================================================
export const footerData = {
  pt: {
    title: "Vamos conversar sobre dados?",
    description: "Disponível para desafios em Engenharia de Dados, Analytics e Data Science.",
    navLinks: [
      { name: 'Início', href: '#' },
      { name: 'Skills', href: '#skills' },
      { name: 'Experiência', href: '#experience' }, 
      { name: 'Projetos', href: '#projects' },
    ],
    email: "contato.samuelamorim@email.com", 
    location: "São Paulo, SP - Brasil",
  },
  en: {
    title: "Let's talk data?",
    description: "Available for challenges in Data Engineering, Analytics, and Data Science.",
    navLinks: [
      { name: 'Home', href: '#' },
      { name: 'Skills', href: '#skills' },
      { name: 'Experience', href: '#experience' }, 
      { name: 'Projects', href: '#projects' },
    ],
    email: "contato.samuelamorim@email.com", 
    location: "São Paulo, SP - Brazil",
  },
  socialLinks: [
    { icon: Linkedin, href: "https://linkedin.com/in/samamorim" }, 
    { icon: Github, href: "https://github.com/samuelamorim" }, 
    { icon: Mail, href: "mailto:contato.samuelamorim@email.com" },
  ],
  legalLinks: [
    { name: "Linkedin", href: "https://linkedin.com" },
    { name: "GitHub", href: "https://github.com" }
  ]
};