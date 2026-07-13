import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal as TerminalIcon,
  Cpu,
  Layers,
  Database,
  Server,
  Workflow,
  FileText,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Shield,
  Search,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  CheckCircle,
  Copy,
  Download,
  RefreshCw,
  Sliders,
  X,
  Menu,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Globe
} from 'lucide-react';
import {
  personalInfo,
  skillsData,
  experiences,
  educations,
  projects,
  Project
} from './data';

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'all' | 'AI/ML & NLP' | 'DevOps & Cloud' | 'Automation & Scraping'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedResume, setCopiedResume] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Interactive 3D Tilt State
  const [heroCardStyle, setHeroCardStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.5s ease-out'
  });
  const heroCardRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = heroCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 15; // Max 15 degree rotation
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setHeroCardStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transformStyle: 'preserve-3d',
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroCardStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.5s ease-out'
    });
  };

  // Terminal Simulator States
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "System initialized. Type 'help' to see list of available commands.",
    "Guest session established on md-arifur-rahman-anik-cluster.",
    "Current active stack: React | Next.js | Django | Python | DevOps | NLP | ElasticSearch"
  ]);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Form States
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll spy to change active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'terminal', 'about', 'projects', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects by Tab and Search
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesTab = activeTab === 'all' || p.category === activeTab;
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technology.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // Terminal command executor
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response: string[] = [];

    switch (cmd) {
      case 'help':
        response = [
          `> ${terminalInput}`,
          "Available commands:",
          "  help           - Show list of active shell commands",
          "  skills         - List specialized high-level core competencies",
          "  projects       - Display selected enterprise-ready system deployments",
          "  experience     - Print career chronology & roles in DevOps and Python Development",
          "  run-pipeline   - Trigger a simulated CI/CD compilation and Kubernetes deploy",
          "  clear          - Flush console buffer screen",
          "  contact        - Output phone, secure email, and geolocation parameters"
        ];
        break;
      case 'clear':
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      case 'skills':
        response = [
          `> ${terminalInput}`,
          "--- CORE CAPABILITIES MATRIX ---",
          "• Programming: Python, Django, LangChain, LangGraph, RAG, Agentic AI, Vector Embedding",
          "• DevOps & Infra: Docker, Kubernetes, Nginx, CI/CD, Terraform, ArgoCD, Git",
          "• ML/NLP Systems: TensorFlow, PyTorch, BERT, OpenCV, Scikit-Learn, Text Classification",
          "• Databases: ElasticSearch Cluster, PostgreSQL, Redis, ETL & ELT, Kibana",
          "• Automation: n8n Workflow Automation, Scrapy, Selenium Web Harvesting, FastAPI, Flask"
        ];
        break;
      case 'projects':
        response = [
          `> ${terminalInput}`,
          "--- SELECTED ARCHITECTURE SCHEMATICS ---",
          "1. CANDIDATE-SEARCH-RAG: Retrieval-Augmented Generation to match CVs & JDs with ElasticSearch.",
          "2. GEMMA-EXPLAIN: Gemma 4B image-to-text processing for resume layout scanning.",
          "3. TRIPLE-NODE-ELASTICSEARCH: Highly available clustered indexing with Gunicorn ingestion.",
          "4. CI-CD-INTEGRATION: Jenkins + Docker automated rollout onto multi-node Kubernetes clusters.",
          "Type 'projects' on the page below to filter and inspect detailed schemas."
        ];
        break;
      case 'experience':
        response = [
          `> ${terminalInput}`,
          "--- CAREER PATHWAY ---",
          "[PRESENT] Nitol Niloy Group - AI FullStack Developer",
          "  ↳ Engineered enterprise data visualization projects with React, Next.js & Django",
          "[2023-2026] Jobdesk Ltd - Python Developer",
          "  ↳ Developed RAG engines, automated Gmail integrations, deployed LLMs in production via vast.ai",
          "[2022-2023] JobXprss Ltd - Junior Machine Learning Engineer",
          "  ↳ Scraped 500+ portals, indexed 15,000+ products, automated data ingestion streams",
          "[2021-2023] Ishraak Solutions Limited - Junior ML Engineer (Intern)",
          "  ↳ Developed visual object detection pipelines and model compression workflows"
        ];
        break;
      case 'contact':
        response = [
          `> ${terminalInput}`,
          `• Phone:       ${personalInfo.phone}`,
          `• Email:       ${personalInfo.email}`,
          `• Location:    ${personalInfo.address}`,
          `• GitHub:      ${personalInfo.github}`,
          `• LinkedIn:    ${personalInfo.linkedin}`
        ];
        break;
      case 'run-pipeline':
        setTerminalInput('');
        triggerPipeline();
        return;
      default:
        response = [
          `> ${terminalInput}`,
          `Command not found: '${cmd}'. Type 'help' for available commands.`
        ];
    }

    setTerminalLogs(prev => [...prev, ...response]);
    setTerminalInput('');
  };

  const triggerPipeline = () => {
    if (isPipelineRunning) return;
    setIsPipelineRunning(true);
    setTerminalLogs(prev => [...prev, "> run-pipeline", "🚀 Initializing automated ML-DevOps orchestration pipeline..."]);

    const logs = [
      "⚙️ [STEP 1/5] Pulling codebase 'github.com/anikpy/candidate-search-rag' [BRANCH: main]...",
      "🐳 [STEP 2/5] Creating optimized multi-stage Docker build cache...",
      "🤖 [STEP 3/5] Instantiating Ollama (gpt-oss:20b) model weights inside sandbox runtime...",
      "🔍 [STEP 4/5] Bootstrapping highly-available 3-Node ElasticSearch index cluster on Nginx...",
      "📦 [STEP 5/5] Performing Kubernetes rollout deployment of REST API wrapper...",
      "🔬 Running internal integration checks & latency latency validation [200 OK]...",
      "✅ [SUCCESS] Production model live! Cluster endpoint configured: anikpy.dev/api/v1/search",
      "📊 Monitoring agents (Prometheus/Grafana) status: ACTIVE"
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setIsPipelineRunning(false);
        }
      }, (index + 1) * 800);
    });
  };

  // Auto scroll terminal to bottom
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Copy Markdown Resume handler
  const handleCopyResume = () => {
    const mdResume = `
# ${personalInfo.name}
**${personalInfo.title}** | ${personalInfo.subtitle}

- **Email:** ${personalInfo.email}
- **Phone:** ${personalInfo.phone}
- **Location:** ${personalInfo.address}
- **GitHub:** ${personalInfo.github}
- **LinkedIn:** ${personalInfo.linkedin}

## Professional Summary
${personalInfo.summary}

## Key Projects
${projects.map(p => `- **${p.name}** (${p.technology.join(', ')}): ${p.description}`).join('\n')}

## Experience
${experiences.map(e => `### ${e.title} - ${e.company}\n*${e.period}* | ${e.location}\n${e.highlights.map(h => `- ${h}`).join('\n')}`).join('\n\n')}

## Education
${educations.map(edu => `- **${edu.degree}** - ${edu.institution} (${edu.period})`).join('\n')}
    `;
    navigator.clipboard.writeText(mdResume.trim());
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 3000);
  };

  // Contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-gray-100 select-none selection:bg-emerald-500 selection:text-black font-sans relative">
      {/* Background Tech Overlays */}
      <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none z-0" />
      <div className="absolute inset-0 tech-dot-bg opacity-30 pointer-events-none z-0" />

      {/* Decorative Aurora Glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#070b13]/85 backdrop-blur-md border-b border-gray-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <TerminalIcon className="w-5 h-5 text-emerald-400" />
            </div>
            <a href="#home" className="font-display font-bold text-lg tracking-wider text-white hover:text-emerald-400 transition-colors">
              ANIK <span className="text-emerald-400 font-mono animate-pulse">_</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'terminal', label: 'Console' },
              { id: 'about', label: 'Core Stack' },
              { id: 'projects', label: 'Architectures' },
              { id: 'experience', label: 'Journey' },
              { id: 'education', label: 'Education' },
              { id: 'contact', label: 'Contact' }
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'text-emerald-400 bg-emerald-500/5 border border-emerald-500/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 border border-transparent'
                }`}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={triggerPipeline}
              disabled={isPipelineRunning}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isPipelineRunning ? 'animate-spin' : ''}`} />
              <span>{isPipelineRunning ? "Running Pipeline..." : "Build ML Pipeline"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 right-0 z-40 bg-[#070b13] border-b border-gray-800 px-4 py-6 space-y-3 shadow-2xl"
          >
            {[
              { id: 'home', label: 'Home' },
              { id: 'terminal', label: 'Console' },
              { id: 'about', label: 'Core Stack' },
              { id: 'projects', label: 'Architectures' },
              { id: 'experience', label: 'Journey' },
              { id: 'education', label: 'Education' },
              { id: 'contact', label: 'Contact' }
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  activeSection === section.id
                    ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
                }`}
              >
                {section.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-800/80">
              <button
                onClick={() => {
                  triggerPipeline();
                  setMobileMenuOpen(false);
                }}
                disabled={isPipelineRunning}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isPipelineRunning ? 'animate-spin' : ''}`} />
                <span>{isPipelineRunning ? "Running Pipeline..." : "Build ML Pipeline"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO SECTION */}
        <section id="home" className="py-20 md:py-32 flex flex-col lg:flex-row items-center gap-16 border-b border-gray-800/60">
          <div className="flex-1 space-y-8 text-left">
            {/* Animated Status Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase font-mono shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{personalInfo.title}</span>
            </motion.div>

            {/* Name */}
            <div className="space-y-4">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight text-white leading-[1.1]">
                MD ARIFUR RAHMAN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-glow-emerald">
                  ANIK
                </span>
              </h1>
              <p className="text-xl text-gray-300 font-medium max-w-xl">
                I build scalable machine learning systems, architect RAG solutions, and automate complex cloud-native deployments.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4 border-y border-gray-800/50">
              <div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-emerald-400">3+ Years</div>
                <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">Professional Experience</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-cyan-400">50+ Apps</div>
                <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">Deployed & Optimized</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-teal-400">15 Projects</div>
                <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">Architected Solutions</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#projects"
                className="flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all text-base text-center cursor-pointer"
              >
                <span>Explore Architectures</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#terminal"
                className="flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gray-800/40 border border-gray-700 hover:bg-gray-800/80 hover:border-emerald-500/40 text-gray-200 font-semibold transition-all hover:scale-[1.02] active:scale-95 text-base text-center cursor-pointer"
              >
                <TerminalIcon className="w-5 h-5 text-emerald-400" />
                <span>Interactive Console</span>
              </a>
            </div>
          </div>

          {/* Visual Side Card with 3D Interactive Tilt */}
          <div className="flex-1 w-full flex justify-center items-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 rounded-3xl filter blur-2xl opacity-50 z-0 animate-pulse" />
            
            <div
              ref={heroCardRef}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              style={heroCardStyle}
              className="relative w-full max-w-md bg-[#0e1423] rounded-3xl border border-gray-800/80 p-6 glow-emerald z-10 overflow-hidden group cursor-pointer select-none"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500" />
              
              <div className="flex items-center justify-between border-b border-gray-800/60 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">SYSTEM MONITOR v3.0 [3D ENABLED]</div>
              </div>

              {/* Avatar Frame with custom border glow */}
              <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden border-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all p-1 bg-gray-900 shadow-xl mb-6">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent mix-blend-overlay" />
              </div>

              <div className="text-center space-y-2 mb-6">
                <h3 className="font-display font-semibold text-lg text-white tracking-wide">{personalInfo.name}</h3>
                <p className="text-sm text-emerald-400 font-mono font-medium">{personalInfo.title}</p>
                <div className="flex items-center justify-center space-x-1.5 text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>

              {/* Minimalist Stats Overlay */}
              <div className="bg-[#080d17]/80 rounded-xl border border-gray-800/80 p-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-gray-400">
                  <span>DEPLOYMENT:</span>
                  <span className="text-emerald-400 font-semibold uppercase">ONLINE</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>KUBERNETES DEPLOYS:</span>
                  <span className="text-cyan-400 font-semibold">50+ APPS</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>CERTIFIED:</span>
                  <span className="text-yellow-400 font-semibold">ELASTICSEARCH 8</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TERMINAL CONSOLE */}
        <section id="terminal" className="py-24 border-b border-gray-800/60 scroll-mt-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                <TerminalIcon className="w-4 h-4" />
                <span>Simulation Sandbox</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Interactive Shell Interface
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Execute core pipeline queries to explore my backend, databases, models, and orchestration live.
              </p>
            </div>

            {/* Shell Console Terminal UI */}
            <div className="bg-[#0b0f19] rounded-2xl border border-gray-800 shadow-2xl glow-emerald overflow-hidden flex flex-col h-[480px]">
              {/* Header Bar */}
              <div className="bg-[#0e1424] border-b border-gray-800 px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <span className="text-xs font-mono text-gray-400 pl-2">guest@anikpy-cluster:~</span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400">PROD STATUS</span>
                  </div>
                </div>
              </div>

              {/* Logs area */}
              <div className="flex-1 p-6 overflow-y-auto font-mono text-xs sm:text-sm space-y-3 text-left">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap leading-relaxed">
                    {log.startsWith('>') ? (
                      <span className="text-emerald-400 font-bold">{log}</span>
                    ) : log.startsWith('🤖') || log.startsWith('⚙️') || log.startsWith('🐳') || log.startsWith('🔍') || log.startsWith('📦') || log.startsWith('🔬') || log.startsWith('✅') ? (
                      <span className="text-gray-200">{log}</span>
                    ) : log.includes('---') ? (
                      <span className="text-cyan-400 font-semibold">{log}</span>
                    ) : (
                      <span className="text-gray-400">{log}</span>
                    )}
                  </div>
                ))}
                {isPipelineRunning && (
                  <div className="flex items-center space-x-2 text-cyan-400 animate-pulse font-bold mt-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing orchestration tasks...</span>
                  </div>
                )}
                <div ref={terminalBottomRef} />
              </div>

              {/* Preset Buttons for Quick Interaction */}
              <div className="bg-[#0e1424]/90 border-t border-gray-800 px-4 py-3 flex flex-wrap gap-2 justify-start">
                <span className="text-xs font-mono text-gray-500 self-center mr-2">Quick queries:</span>
                {[
                  { cmd: 'help', label: 'help' },
                  { cmd: 'skills', label: 'core skills' },
                  { cmd: 'projects', label: 'projects' },
                  { cmd: 'experience', label: 'experience' },
                  { cmd: 'contact', label: 'contact' },
                  { cmd: 'run-pipeline', label: 'run-pipeline' }
                ].map((item) => (
                  <button
                    key={item.cmd}
                    onClick={() => {
                      if (item.cmd === 'run-pipeline') {
                        triggerPipeline();
                      } else {
                        setTerminalLogs(prev => [...prev, `> ${item.cmd}`]);
                        // Execute directly
                        const mockEvent = { preventDefault: () => {} } as React.FormEvent;
                        setTerminalInput(item.cmd);
                        setTimeout(() => {
                          const customInput = item.cmd;
                          let response: string[] = [];
                          switch (customInput) {
                            case 'help':
                              response = [
                                "Available commands:",
                                "  help           - Show list of active shell commands",
                                "  skills         - List specialized high-level core competencies",
                                "  projects       - Display selected enterprise-ready system deployments",
                                "  experience     - Print career chronology & roles in DevOps and Python Development",
                                "  run-pipeline   - Trigger a simulated CI/CD compilation and Kubernetes deploy",
                                "  clear          - Flush console buffer screen",
                                "  contact        - Output phone, secure email, and geolocation parameters"
                              ];
                              break;
                            case 'skills':
                              response = [
                                "--- CORE CAPABILITIES MATRIX ---",
                                "• Programming: Python, Django, LangChain, LangGraph, RAG, Agentic AI, Vector Embedding",
                                "• DevOps & Infra: Docker, Kubernetes, Nginx, CI/CD, Terraform, ArgoCD, Git",
                                "• ML/NLP Systems: TensorFlow, PyTorch, BERT, OpenCV, Scikit-Learn, Text Classification",
                                "• Databases: ElasticSearch Cluster, PostgreSQL, Redis, ETL & ELT, Kibana",
                                "• Automation: n8n Workflow Automation, Scrapy, Selenium Web Harvesting, FastAPI, Flask"
                              ];
                              break;
                            case 'projects':
                              response = [
                                "--- SELECTED ARCHITECTURE SCHEMATICS ---",
                                "1. CANDIDATE-SEARCH-RAG: Retrieval-Augmented Generation to match CVs & JDs with ElasticSearch.",
                                "2. GEMMA-EXPLAIN: Gemma 4B image-to-text processing for resume layout scanning.",
                                "3. TRIPLE-NODE-ELASTICSEARCH: Highly available clustered indexing with Gunicorn ingestion.",
                                "4. CI-CD-INTEGRATION: Jenkins + Docker automated rollout onto multi-node Kubernetes clusters.",
                                "Type 'projects' on the page below to filter and inspect detailed schemas."
                              ];
                              break;
                            case 'experience':
                              response = [
                                "--- CAREER PATHWAY ---",
                                "[PRESENT] Nitol Niloy Group - AI FullStack Developer",
                                "  ↳ Engineered enterprise data visualization projects with React, Next.js & Django",
                                "[2023-2026] Jobdesk Ltd - Python Developer",
                                "  ↳ Developed RAG engines, automated Gmail integrations, deployed LLMs in production via vast.ai",
                                "[2022-2023] JobXprss Ltd - Junior Machine Learning Engineer",
                                "  ↳ Scraped 500+ portals, indexed 15,000+ products, automated data ingestion streams",
                                "[2021-2023] Ishraak Solutions Limited - Junior ML Engineer (Intern)",
                                "  ↳ Developed visual object detection pipelines and model compression workflows"
                              ];
                              break;
                            case 'contact':
                              response = [
                                `• Phone:       ${personalInfo.phone}`,
                                `• Email:       ${personalInfo.email}`,
                                `• Location:    ${personalInfo.address}`,
                                `• GitHub:      ${personalInfo.github}`,
                                `• LinkedIn:    ${personalInfo.linkedin}`
                              ];
                              break;
                          }
                          setTerminalLogs(prev => [...prev, ...response]);
                          setTerminalInput('');
                        }, 50);
                      }
                    }}
                    className="px-2.5 py-1 text-xs font-mono bg-gray-800/60 hover:bg-emerald-500/10 hover:text-emerald-400 border border-gray-700/60 hover:border-emerald-500/30 rounded text-gray-400 transition-all cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Form Input Line */}
              <form onSubmit={handleTerminalSubmit} className="bg-[#080d17] border-t border-gray-800 px-4 py-3 flex items-center">
                <span className="text-emerald-400 font-mono font-bold mr-2">anik@devops-cluster:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type command (e.g. 'skills' or 'run-pipeline') and hit Enter..."
                  className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-white placeholder-gray-600 focus:ring-0"
                  disabled={isPipelineRunning}
                />
                <button
                  type="submit"
                  className="p-1 text-gray-500 hover:text-emerald-400 transition-colors cursor-pointer"
                  disabled={isPipelineRunning}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* CORE EXPERTISE MATRIX */}
        <section id="about" className="py-24 border-b border-gray-800/60 scroll-mt-16">
          <div className="space-y-16">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                <Cpu className="w-4 h-4" />
                <span>Competencies Matrix</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Technological Infrastructure
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                A granular map of my engineering stack structured across primary domains.
              </p>
            </div>

            {/* Bento-style Skills Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Category 1: Languages & AI Core */}
              <div className="bg-[#0e1423]/90 rounded-2xl border border-gray-800/80 p-6 space-y-6 hover:border-emerald-500/20 transition-all shadow-lg hover:shadow-2xl">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-800/60">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Code className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white tracking-wide">Programming & AI Systems</h3>
                    <p className="text-xs text-gray-500">Core system architectures</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {skillsData.programmingLanguages.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-[10px] uppercase font-mono text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded bg-emerald-500/5">{skill.level}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-800/80 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: skill.level === 'Expert' ? '95%' : '85%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: DevOps & Infrastructure */}
              <div className="bg-[#0e1423]/90 rounded-2xl border border-gray-800/80 p-6 space-y-6 hover:border-cyan-500/20 transition-all shadow-lg hover:shadow-2xl">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-800/60">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <Server className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white tracking-wide">DevOps & Cloud Architecture</h3>
                    <p className="text-xs text-gray-500">Deployments & containerization</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {skillsData.devopsAndCloud.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-[10px] uppercase font-mono text-cyan-400 border border-cyan-500/20 px-1.5 py-0.5 rounded bg-cyan-500/5">{skill.level}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-800/80 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '85%' : '70%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 3: ML Engineering & NLP */}
              <div className="bg-[#0e1423]/90 rounded-2xl border border-gray-800/80 p-6 space-y-6 hover:border-teal-500/20 transition-all shadow-lg hover:shadow-2xl">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-800/60">
                  <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
                    <Cpu className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white tracking-wide">ML Engineering & NLP</h3>
                    <p className="text-xs text-gray-500">Neural networks & text embeddings</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {skillsData.mlAndNlp.slice(0, 7).map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-[10px] uppercase font-mono text-teal-400 border border-teal-500/20 px-1.5 py-0.5 rounded bg-teal-500/5">{skill.level}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-800/80 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500" style={{ width: skill.level === 'Expert' ? '95%' : '85%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 4: Databases & Engine Cluster */}
              <div className="bg-[#0e1423]/90 rounded-2xl border border-gray-800/80 p-6 space-y-6 hover:border-yellow-500/20 transition-all shadow-lg hover:shadow-2xl">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-800/60">
                  <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <Database className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white tracking-wide">Databases & Vector Engines</h3>
                    <p className="text-xs text-gray-500">Fast lookup & data extraction</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {skillsData.databasesAndSearch.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-[10px] uppercase font-mono text-yellow-400 border border-yellow-500/20 px-1.5 py-0.5 rounded bg-yellow-500/5">{skill.level}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-800/80 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: skill.level === 'Expert' ? '95%' : '85%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 5: Workflows & Scraping Engines */}
              <div className="bg-[#0e1423]/90 rounded-2xl border border-gray-800/80 p-6 space-y-6 hover:border-emerald-500/20 transition-all shadow-lg hover:shadow-2xl lg:col-span-2">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-800/60">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Workflow className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white tracking-wide">Scraping & API Automation Workflows</h3>
                    <p className="text-xs text-gray-500">Automated job harvesting & microservice pipelines</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {skillsData.automation.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-[10px] uppercase font-mono text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded bg-emerald-500/5">{skill.level}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-800/80 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400" style={{ width: skill.level === 'Expert' ? '95%' : '85%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PROJECTS PORTFOLIO */}
        <section id="projects" className="py-24 border-b border-gray-800/60 scroll-mt-16">
          <div className="space-y-12">
            
            {/* Titles */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                <Layers className="w-4 h-4" />
                <span>Architecture Blueprints</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Enterprise-Ready Deployments
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Filter and inspect the active architecture design parameters and system logs of my key deployments.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between bg-gray-900/60 border border-gray-800 p-4 rounded-xl">
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {(['all', 'AI/ML & NLP', 'DevOps & Cloud', 'Automation & Scraping'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-emerald-500 text-black font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                    }`}
                  >
                    {tab === 'all' ? 'All Deployments' : tab}
                  </button>
                ))}
              </div>

              {/* Live Search */}
              <div className="relative w-full md:w-80">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </span>
                <input
                  type="text"
                  placeholder="Filter by technology (e.g. Docker, BERT)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-[#0b0f19] border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            {/* Projects Grid with Staggered Elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col bg-[#0e1423]/95 rounded-2xl border border-gray-800 hover:border-emerald-500/20 transition-all p-5 shadow-md hover:shadow-xl group"
                  >
                    {/* Header: Role / Status */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-mono uppercase bg-gray-800/80 px-2 py-0.5 rounded text-gray-400 border border-gray-700/50">
                        {p.role}
                      </span>
                      <span className="flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>DEPLOYED</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-emerald-400 transition-colors tracking-wide leading-snug mb-3">
                      {p.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                      {p.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.technology.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#070b13] text-cyan-400 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Footer: Trigger interactive specs */}
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-gray-800/40 hover:bg-emerald-500/10 border border-gray-700 hover:border-emerald-500/30 text-xs text-gray-300 hover:text-emerald-400 font-semibold transition-all cursor-pointer"
                    >
                      <span>Show Architecture Details</span>
                      <Sliders className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Zero Results */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12 text-gray-500 font-mono text-sm border border-dashed border-gray-800 rounded-2xl">
                No active schematics found matching "{searchQuery}" under "{activeTab}"...
              </div>
            )}
          </div>
        </section>

        {/* DETAILED PROJECT SPEC DRAWER MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-[#0b0f19] border border-emerald-500/20 rounded-2xl glow-emerald overflow-hidden flex flex-col max-h-[90vh]"
              >
                {/* Header */}
                <div className="bg-[#0e1424] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <TerminalIcon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white">{selectedProject.name}</h3>
                      <p className="text-xs font-mono text-emerald-400 uppercase font-semibold">Active Pipeline Log Schema</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 rounded bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto space-y-6 text-left">
                  {/* Summary */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">DEPLOYMENT OVERVIEW</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {/* Config Details */}
                  <div className="grid grid-cols-2 gap-4 bg-[#080d17] border border-gray-800 p-4 rounded-xl font-mono text-xs">
                    <div>
                      <div className="text-gray-500">ROLE ARCHITECT:</div>
                      <div className="text-white mt-1 font-semibold">{selectedProject.role}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">SYSTEM DOMAIN:</div>
                      <div className="text-emerald-400 mt-1 font-semibold uppercase">{selectedProject.category}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">ROUTING ENGINE:</div>
                      <div className="text-cyan-400 mt-1 font-semibold">Nginx Load Balancer</div>
                    </div>
                    <div>
                      <div className="text-gray-500">DEPLOYMENT STATE:</div>
                      <div className="text-yellow-400 mt-1 font-semibold">Active & Monitored</div>
                    </div>
                  </div>

                  {/* Simulated Infrastructure Stack diagram */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">SYSTEM SCHEMATIC DATA FLOW</h4>
                    <div className="border border-gray-800 rounded-xl bg-[#090d15] p-4 text-xs font-mono text-gray-400 flex flex-col space-y-2">
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>[INGRESS] HTTP Clients / Hooks</span>
                      </div>
                      <div className="pl-4 border-l border-gray-800 py-1 flex flex-col space-y-1">
                        <span className="text-cyan-400">⬇ Routing via Nginx Reverse Proxy</span>
                        <span className="text-gray-200">⬇ Python Gunicorn microservice ({selectedProject.technology.join(', ')})</span>
                        {selectedProject.category === 'AI/ML & NLP' && (
                          <span className="text-teal-400">⬇ Pre-trained embeddings loaded (Ollama / vast.ai)</span>
                        )}
                        <span className="text-yellow-400">⬇ Indexed search query response</span>
                      </div>
                      <div className="text-emerald-400 font-semibold">[OUTGRESS] 200 SUCCESS Response Payload</div>
                    </div>
                  </div>

                  {/* Tech stack representation */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">INVOLVED TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technology.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-emerald-500/5 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-mono font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-[#0e1424] border-t border-gray-800 px-6 py-4 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl text-sm transition-all active:scale-95 cursor-pointer"
                  >
                    Dismiss Specification
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="py-24 border-b border-gray-800/60 scroll-mt-16">
          <div className="space-y-16">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-yellow-400 uppercase tracking-widest">
                <Briefcase className="w-4 h-4" />
                <span>Professional Timeline</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Engineering Chronology
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                A structured record of my engineering contributions and operational roles.
              </p>
            </div>

            {/* Timeline UI */}
            <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 border-l-2 border-gray-800/80 space-y-12 text-left">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timline Dot with active status indicator */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#070b13] border-2 border-emerald-500 flex items-center justify-center">
                    {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                  </span>

                  <div className="bg-[#0e1423]/90 rounded-2xl border border-gray-800 p-6 space-y-4 hover:border-emerald-500/15 transition-all group-hover:shadow-lg">
                    {/* Header: Dates & Title */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-display font-bold text-lg text-white tracking-wide">
                          {exp.title}
                        </h3>
                        <div className="text-emerald-400 font-semibold text-sm">
                          {exp.company}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs font-mono text-gray-400">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.location}</span>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2.5 pt-2">
                      {exp.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start space-x-3 text-sm text-gray-300 leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-emerald-500/60 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION & ACCOMPLISHMENTS */}
        <section id="education" className="py-24 border-b border-gray-800/60 scroll-mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left side: Education */}
            <div className="space-y-10 text-left">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  <BookOpen className="w-4 h-4" />
                  <span>Academic Qualifications</span>
                </div>
                <h2 className="font-display font-bold text-3xl text-white tracking-tight">
                  Educational Background
                </h2>
              </div>

              <div className="space-y-8">
                {educations.map((edu, idx) => (
                  <div key={idx} className="bg-[#0e1423]/90 rounded-2xl border border-gray-800 p-6 space-y-4 hover:border-cyan-500/15 transition-all">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-display font-bold text-base text-white tracking-wide">
                          {edu.degree}
                        </h3>
                        <div className="text-cyan-400 font-semibold text-sm mt-1">
                          {edu.institution}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded text-cyan-400">
                        {edu.gpa}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{edu.period}</span>
                      </div>
                    </div>

                    {edu.additionalInfo && (
                      <p className="text-xs font-mono text-emerald-400 border-t border-gray-800/80 pt-3">
                        • {edu.additionalInfo}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Certifications & Printable Resume Options */}
            <div className="space-y-10 text-left">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  <Award className="w-4 h-4" />
                  <span>Verified Badges</span>
                </div>
                <h2 className="font-display font-bold text-3xl text-white tracking-tight">
                  Certifications & Resources
                </h2>
              </div>

              <div className="space-y-6">
                {/* ElasticSearch 8 Cert */}
                <div className="bg-[#0e1423]/90 rounded-2xl border border-gray-800 p-6 flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shrink-0">
                    <Award className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white tracking-wide">
                      Elasticsearch 8 Certification
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Udemy Verified Credentials. Highly skilled in Lucene mapping, node routing and high dimensional vector embeddings.
                    </p>
                  </div>
                </div>

                {/* IELTS Badge */}
                <div className="bg-[#0e1423]/90 rounded-2xl border border-gray-800 p-6 flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0">
                    <Globe className="w-8 h-8 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white tracking-wide">
                      IELTS: Band 6 (British Council)
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Professional-grade English speaking, writing, and logical listening proficiency verified.
                    </p>
                  </div>
                </div>

                {/* Markdown Resume Copy Box */}
                <div className="bg-emerald-500/5 rounded-2xl border border-emerald-500/20 p-6 space-y-4">
                  <h3 className="font-display font-bold text-base text-white flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <span>Copy Structured Markdown CV</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Need to review the CV layout on a local terminal or machine learning pipeline? Extract it directly.
                  </p>
                  <button
                    onClick={handleCopyResume}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl text-sm transition-all cursor-pointer active:scale-95"
                  >
                    {copiedResume ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Markdown CV Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Markdown CV</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* QUICK SECURE CONTACT */}
        <section id="contact" className="py-24 scroll-mt-16">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                <Mail className="w-4 h-4" />
                <span>Secure Terminal Route</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Establish Direct Handshake
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Transmit your system parameters or job requests directly to my secure mailbox.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
              {/* Left col: Contact Details */}
              <div className="md:col-span-2 space-y-6 text-left">
                <div className="bg-[#0e1423]/90 rounded-2xl border border-gray-800 p-6 space-y-6">
                  <h3 className="font-display font-bold text-base text-white tracking-wide pb-3 border-b border-gray-800/60">
                    Contact Parameters
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3.5">
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-mono">SECURE EMAIL:</div>
                        <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors">
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-mono">SECURE VOIP:</div>
                        <a href={`tel:${personalInfo.phone}`} className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
                          {personalInfo.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-mono">GEOLOCATION:</div>
                        <div className="text-sm font-semibold text-white">
                          {personalInfo.address}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Handles */}
                  <div className="pt-6 border-t border-gray-800/60 flex items-center justify-center space-x-3">
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-800/40 hover:bg-emerald-500/10 border border-gray-700 hover:border-emerald-500/30 text-gray-400 hover:text-emerald-400 rounded-xl transition-all hover:scale-105"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-800/40 hover:bg-cyan-500/10 border border-gray-700 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 rounded-xl transition-all hover:scale-105"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={personalInfo.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-800/40 hover:bg-teal-500/10 border border-gray-700 hover:border-teal-500/30 text-gray-400 hover:text-teal-400 rounded-xl transition-all hover:scale-105"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right col: Secure Transmission Form */}
              <div className="md:col-span-3 text-left">
                <form onSubmit={handleContactSubmit} className="bg-[#0e1423]/90 rounded-2xl border border-gray-800 p-6 space-y-6">
                  <h3 className="font-display font-bold text-base text-white tracking-wide pb-3 border-b border-gray-800/60 flex items-center justify-between">
                    <span>Message Envelope</span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">MD5 CHECKED</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-400">SENDER IDENTIFIER:</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-[#0b0f19] border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-400">SENDER RETURN ROUTE:</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-[#0b0f19] border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-400">TRANSMISSION BODY:</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter details of your project, role requirement, or system parameters..."
                      className="w-full px-4 py-2.5 bg-[#0b0f19] border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 resize-none"
                    />
                  </div>

                  {/* Form Submission status check */}
                  {formSubmitted ? (
                    <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs border border-emerald-500/30 bg-emerald-500/5 p-4 rounded-xl">
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <span>Transmission Success! MD5 hash verified. Message dispatched successfully.</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold rounded-xl text-sm transition-all cursor-pointer active:scale-95"
                    >
                      <Workflow className="w-4 h-4" />
                      <span>Transmit Message Envelope</span>
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer credits */}
      <footer className="bg-[#04070d] border-t border-gray-900 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
          <div>
            © 2026 Md Arifur Rahman Anik. All clusters synchronized.
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Host Node Live</span>
            </span>
            <span>|</span>
            <span>Uptime: 99.99%</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
