import { ExternalLink, Code, Terminal, Cpu } from "lucide-react";
import Logo from "./Logo";
import { useDataStore } from "../store/userdataStore";

// Custom inline SVG icons for social platforms
const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const WelcomeArea = () => {
  const user_name = useDataStore((state) => state.user_name);

  const skills = [
    {
      category: "Frontend Development",
      icon: <Code className="size-4 text-brand-teal shrink-0" />,
      items: ["React", "Next.js", "TailwindCSS", "HTML5", "CSS3", "JavaScript"],
    },
    {
      category: "Backend & Systems",
      icon: <Terminal className="size-4 text-brand-teal shrink-0" />,
      items: ["Node.js", "Express", "MongoDB", "RESTful APIs", "C Language"],
    },
    {
      category: "DevOps & Automation",
      icon: <Cpu className="size-4 text-brand-teal shrink-0" />,
      items: ["Docker", "CI/CD Pipelines", "GitHub Actions", "Bash Scripting"],
    },
  ];

  const featuredProjects = [
    {
      name: "AI-Psychologist",
      desc: "A MERN stack AI therapist companion leveraging LLM APIs with real-time empathetic support.",
      url: "https://github.com/Dev-Saurabh-K/AI-Psychologist",
    },
    {
      name: "Bus-Yatra",
      desc: "A real-time transit tracking app with live map updates and routing for commuters.",
      url: "https://github.com/Dev-Saurabh-K/Bus-Yatra",
    },
    {
      name: "Collaborative-Docs",
      desc: "Multi-user synced workspace supporting real-time document creation and simultaneous edits.",
      url: "https://github.com/Dev-Saurabh-K/Collaborative-Docs",
    },
    {
      name: "chat-app",
      desc: "This dashboard! An instant-messaging app built with React, Zustand, and Tailwind CSS v4.",
      url: "https://github.com/Dev-Saurabh-K/chat-app",
    },
  ];

  return (
    <div className="flex-1 h-full flex flex-col items-center justify-start p-4 md:p-8 select-none bg-brand-purple overflow-y-auto">
      {/* Top Welcome Header */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-5 border-b border-brand-teal/10">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">Current User Session</div>
          <div className="font-outfit font-bold text-2xl text-white">
            Welcome back, <span className="text-brand-teal font-extrabold">{user_name}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-brand-deep/30 px-4 py-2 rounded-xl border border-brand-teal/5">
          <Logo />
        </div>
      </div>

      {/* Developer Profile Card */}
      <div className="w-full max-w-2xl glass-panel-light rounded-2xl p-6 border border-brand-teal/10 hover:border-brand-teal/20 transition-all duration-300 animate-fade-in">
        {/* Header Section: Avatar + Bio */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
          <div className="relative shrink-0 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-teal to-orange-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <img
              src="https://avatars.githubusercontent.com/u/225661539?v=4"
              alt="Saurabh Kumar"
              className="relative size-20 rounded-full border-2 border-brand-teal/50 object-cover shadow-2xl"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";
              }}
            />
          </div>

          <div className="flex-1 text-center md:text-left min-w-0">
            <h1 className="font-outfit font-extrabold text-2xl text-brand-mint">Saurabh Kumar</h1>
            <p className="text-sm font-semibold text-brand-teal mt-0.5 tracking-wide">
              MERN Stack Developer & DevOps Explorer
            </p>
            <p className="text-xs text-brand-slate mt-2 leading-relaxed max-w-lg">
              Passionate full-stack developer who loves building modern, scalable, and efficient applications.
              Currently exploring containerization, workflow automation, and cloud deployments.
            </p>
          </div>
        </div>

        {/* Social Media Link Badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-5 pt-4 border-t border-brand-teal/5">
          <a
            href="https://github.com/Dev-Saurabh-K"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-brand-mint bg-brand-deep/60 hover:bg-brand-deep border border-brand-teal/15 hover:border-brand-teal rounded-xl transition-all duration-200 cursor-pointer"
          >
            <GithubIcon className="size-4 text-brand-teal" />
            <span>GitHub</span>
            <ExternalLink className="size-3 text-brand-slate/50" />
          </a>

          <a
            href="https://www.linkedin.com/in/saurabh-kumar-sakr/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-brand-mint bg-brand-deep/60 hover:bg-brand-deep border border-brand-teal/15 hover:border-brand-teal rounded-xl transition-all duration-200 cursor-pointer"
          >
            <LinkedinIcon className="size-4 text-[#0077B5]" />
            <span>LinkedIn</span>
            <ExternalLink className="size-3 text-brand-slate/50" />
          </a>

          <a
            href="https://www.instagram.com/saurabh_kumar_0100110/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-brand-mint bg-brand-deep/60 hover:bg-brand-deep border border-brand-teal/15 hover:border-brand-teal rounded-xl transition-all duration-200 cursor-pointer"
          >
            <InstagramIcon className="size-4 text-[#E1306C]" />
            <span>Instagram</span>
            <ExternalLink className="size-3 text-brand-slate/50" />
          </a>
        </div>

        {/* Technical Expertise Grid */}
        <div className="mt-6 pt-5 border-t border-brand-teal/10">
          <h2 className="text-xs font-bold text-brand-slate uppercase tracking-wider mb-3 pl-1">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skills.map((skillGroup, idx) => (
              <div
                key={idx}
                className="p-3 bg-brand-deep/30 rounded-xl border border-brand-teal/5 hover:border-brand-teal/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  {skillGroup.icon}
                  <span className="text-xs font-bold text-white font-outfit truncate">{skillGroup.category}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((item, keyIdx) => (
                    <span
                      key={keyIdx}
                      className="px-2 py-0.5 text-[10px] bg-brand-purple/60 border border-brand-slate/10 text-brand-slate rounded-md hover:text-white hover:border-brand-teal/30 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="mt-6 pt-5 border-t border-brand-teal/10">
          <div className="flex items-center justify-between mb-3 pl-1">
            <h2 className="text-xs font-bold text-brand-slate uppercase tracking-wider">Featured Repositories</h2>
            <a
              href="https://github.com/Dev-Saurabh-K?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-brand-teal hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ExternalLink className="size-2.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {featuredProjects.map((project, idx) => (
              <a
                key={idx}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 bg-brand-deep/30 hover:bg-brand-deep/50 rounded-xl border border-brand-teal/5 hover:border-brand-teal/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-brand-mint group-hover:text-brand-teal transition-colors font-outfit">
                      {project.name}
                    </span>
                    <ExternalLink className="size-3 text-brand-slate/40 group-hover:text-brand-teal transition-colors" />
                  </div>
                  <p className="text-[11px] text-brand-slate mt-1.5 leading-relaxed group-hover:text-brand-slate/90 transition-colors">
                    {project.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

