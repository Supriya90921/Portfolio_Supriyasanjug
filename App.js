import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
  Backend: ["Node.js", "Java", "Spring Boot", "REST APIs", "GraphQL"],
  Database: ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
  DevOps: ["Docker", "Kubernetes", "CI/CD", "AWS", "Git"],
};

const PROJECTS = [
  {
    title: "QuantumDB",
    desc: "A distributed database engine built in Java with adaptive query optimization and real-time replication across nodes.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    color: "#00ff88",
    year: "2024",
    demo: "https://quantumdb.demo.dev",
    github: "https://github.com/alexcarter/quantumdb",
  },
  {
    title: "NexusUI",
    desc: "An open-source React component library with 60+ components, dark mode, and full accessibility compliance.",
    tags: ["React", "TypeScript", "Storybook", "Rollup"],
    color: "#00cfff",
    year: "2024",
    demo: "https://nexusui.demo.dev",
    github: "https://github.com/alexcarter/nexusui",
  },
  {
    title: "StreamSync",
    desc: "Real-time event streaming platform processing 1M+ events/sec using Kafka and a custom WebSocket layer.",
    tags: ["Node.js", "Kafka", "Redis", "WebSocket"],
    color: "#ff6b6b",
    year: "2023",
    demo: "https://streamsync.demo.dev",
    github: "https://github.com/alexcarter/streamsync",
  },
  {
    title: "CodeAtlas",
    desc: "AI-powered code review tool that analyzes pull requests, detects patterns, and suggests architectural improvements.",
    tags: ["Python", "LLMs", "React", "FastAPI"],
    color: "#ffcc00",
    year: "2023",
    demo: "https://codeatlas.demo.dev",
    github: "https://github.com/alexcarter/codeatlas",
  },
];

const EXPERIENCE = [
  {
    role: "Senior Software Engineer",
    company: "TechCorp Global",
    period: "2022 – Present",
    desc: "Lead full-stack development of microservices architecture serving 5M+ users. Reduced API latency by 40%.",
  },
  {
    role: "Software Engineer",
    company: "Startup Labs",
    period: "2020 – 2022",
    desc: "Built core product features in React & Java. Architected the real-time notification system used by 500K users.",
  },
  {
    role: "Junior Developer",
    company: "Digital Agency Co.",
    period: "2018 – 2020",
    desc: "Developed client web applications, integrated third-party APIs, and maintained CI/CD pipelines.",
  },
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHovered(e.target.closest("a,button,[data-hover]") !== null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);
  return (
    <>
      <div style={{
        position: "fixed", left: pos.x, top: pos.y, width: hovered ? 40 : 12, height: hovered ? 40 : 12,
        borderRadius: "50%", background: "rgba(0,255,136,0.85)", pointerEvents: "none", zIndex: 9999,
        transform: "translate(-50%,-50%)", transition: "width 0.2s, height 0.2s",
        mixBlendMode: "screen",
      }} />
      <div style={{
        position: "fixed", left: pos.x, top: pos.y, width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(0,255,136,0.35)", pointerEvents: "none", zIndex: 9998,
        transform: "translate(-50%,-50%)", transition: "left 0.08s, top 0.08s",
      }} />
    </>
  );
}

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1.2rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(5,5,15,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,255,136,0.08)" : "none",
      transition: "all 0.4s",
    }}>
      <span style={{ fontFamily: "'Space Mono', monospace", color: "#00ff88", fontWeight: 700, fontSize: "1.15rem", letterSpacing: "2px" }}>
        &lt;DEV/&gt;
      </span>
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", letterSpacing: "1.5px",
            color: active === l.toLowerCase() ? "#00ff88" : "rgba(255,255,255,0.55)",
            textDecoration: "none", textTransform: "uppercase",
            transition: "color 0.2s",
            borderBottom: active === l.toLowerCase() ? "1px solid #00ff88" : "1px solid transparent",
            paddingBottom: "2px",
          }}>{l}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["Software Developer", "Java Engineer", "React Architect", "System Designer"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = deleting ? 40 : 90;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setTyped(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 1400);
      } else if (deleting && charIdx > 0) {
        setTyped(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setRoleIdx(r => (r + 1) % roles.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, roleIdx]);

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "0 3rem", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        animation: "gridMove 20s linear infinite",
      }} />
      <div style={{
        position: "absolute", right: "10%", top: "20%", width: 600, height: 600,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(0,207,255,0.08) 0%, transparent 70%)",
        animation: "pulse 6s ease-in-out infinite", zIndex: 0,
      }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
        <p style={{ fontFamily: "'Space Mono', monospace", color: "#00ff88", fontSize: "0.85rem", letterSpacing: "3px", marginBottom: "1.5rem", opacity: 0.8 }}>
          HELLO, WORLD — I AM
        </p>
        <h1 style={{
          fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(4rem, 10vw, 9rem)",
          lineHeight: 0.92, color: "#fff", margin: "0 0 1.5rem",
          textShadow: "0 0 80px rgba(0,255,136,0.15)",
        }}>
          ALEX<br />
          <span style={{ color: "#00ff88", WebkitTextStroke: "2px #00ff88", WebkitTextFillColor: "transparent" }}>CARTER</span>
        </h1>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1rem, 2.5vw, 1.6rem)", color: "#00cfff", marginBottom: "2rem", height: "2.2rem" }}>
          {typed}<span style={{ animation: "blink 1s step-end infinite", color: "#00ff88" }}>|</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", maxWidth: 560, lineHeight: 1.8, marginBottom: "3rem" }}>
          I build high-performance systems and beautiful interfaces. Passionate about clean architecture, scalable backends, and pixel-perfect frontends.
        </p>
        <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
          <a href="#projects" data-hover style={{
            background: "#00ff88", color: "#050510", padding: "0.85rem 2.2rem",
            fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", letterSpacing: "2px",
            textDecoration: "none", textTransform: "uppercase", fontWeight: 700,
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}>View Projects</a>
          <a href="#contact" data-hover style={{
            border: "1px solid rgba(0,255,136,0.4)", color: "#00ff88", padding: "0.85rem 2.2rem",
            fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", letterSpacing: "2px",
            textDecoration: "none", textTransform: "uppercase",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}>Contact Me</a>
        </div>
      </div>
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.4,
        animation: "bounce 2s ease-in-out infinite",
      }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "2px", color: "#fff" }}>SCROLL</span>
        <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, #00ff88, transparent)" }} />
      </div>
    </section>
  );
}

function Skills() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="skills" ref={ref} style={{ padding: "8rem 3rem" }}>
      <SectionTitle label="02" title="SKILLS" visible={visible} />
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.5rem", marginTop: "4rem",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
        transition: "all 0.8s cubic-bezier(.16,1,.3,1) 0.3s",
      }}>
        {Object.entries(SKILLS).map(([cat, items], i) => (
          <div key={cat} data-hover style={{
            border: "1px solid rgba(0,255,136,0.12)", padding: "2rem",
            background: "rgba(255,255,255,0.02)", position: "relative", overflow: "hidden",
            transition: "border-color 0.3s, transform 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.5)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.12)"; e.currentTarget.style.transform = "none"; }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${["#00ff88","#00cfff","#ff6b6b","#ffcc00"][i]}, transparent)`,
            }} />
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", letterSpacing: "3px", color: ["#00ff88","#00cfff","#ff6b6b","#ffcc00"][i], marginBottom: "1.2rem", textTransform: "uppercase" }}>
              {cat}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {items.map(skill => (
                <span key={skill} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.75)",
                  background: "rgba(255,255,255,0.05)", padding: "0.3rem 0.75rem",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2,
                }}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

function Projects() {
  const [ref, visible] = useScrollReveal();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" ref={ref} style={{ padding: "8rem 3rem" }}>
      <SectionTitle label="03" title="PROJECTS" visible={visible} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem", marginTop: "4rem" }}>
        {PROJECTS.map((p, i) => (
          <div key={p.title}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              border: `1px solid ${hovered === i ? p.color + "55" : "rgba(255,255,255,0.07)"}`,
              padding: "2.2rem",
              background: hovered === i ? "rgba(255,255,255,0.03)" : "transparent",
              position: "relative", overflow: "hidden",
              transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
              transform: hovered === i ? "translateY(-6px)" : "none",
              opacity: visible ? 1 : 0,
              transitionDelay: `${0.15 + i * 0.1}s`,
              display: "flex", flexDirection: "column",
            }}
          >
            {hovered === i && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 0,
                background: `radial-gradient(ellipse at top left, ${p.color}08, transparent 70%)`,
                pointerEvents: "none",
              }} />
            )}
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
              {/* Year + GitHub icon */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: p.color, letterSpacing: "2px" }}>
                  {p.year}
                </span>
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  title="View Source"
                  style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s", display: "flex" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
                >
                  <GitHubIcon />
                </a>
              </div>

              <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "2.2rem", color: "#fff", margin: "0 0 0.75rem", letterSpacing: "2px" }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem", flex: 1 }}>
                {p.desc}
              </p>

              {/* Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.8rem" }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: p.color,
                    border: `1px solid ${p.color}44`, padding: "0.2rem 0.6rem", borderRadius: 2, letterSpacing: "1px",
                  }}>{t}</span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{
                  flex: 1, textAlign: "center",
                  background: p.color, color: "#050510",
                  padding: "0.65rem 1rem",
                  fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "1.5px",
                  textDecoration: "none", textTransform: "uppercase", fontWeight: 700,
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  <ExternalIcon /> Live Demo
                </a>
                <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
                  flex: 1, textAlign: "center",
                  border: `1px solid ${p.color}55`, color: p.color,
                  padding: "0.65rem 1rem",
                  fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "1.5px",
                  textDecoration: "none", textTransform: "uppercase",
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = `${p.color}18`}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <GitHubIcon /> Source
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="experience" ref={ref} style={{ padding: "8rem 3rem" }}>
      <SectionTitle label="04" title="EXPERIENCE" visible={visible} />
      <div style={{ marginTop: "4rem", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #00ff88, rgba(0,255,136,0.1))" }} />
        {EXPERIENCE.map((ex, i) => (
          <div key={i} style={{
            paddingLeft: "3rem", paddingBottom: "3.5rem", position: "relative",
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-30px)",
            transition: `all 0.7s cubic-bezier(.16,1,.3,1) ${0.2 + i * 0.15}s`,
          }}>
            <div style={{
              position: "absolute", left: -5, top: 6, width: 11, height: 11,
              borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 16px #00ff88",
            }} />
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "baseline", flexWrap: "wrap", marginBottom: "0.6rem" }}>
              <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.7rem", color: "#fff", margin: 0, letterSpacing: "1.5px" }}>{ex.role}</h3>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#00ff88", letterSpacing: "1px" }}>@ {ex.company}</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", marginLeft: "auto" }}>{ex.period}</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.92rem", lineHeight: 1.75, maxWidth: 620, margin: 0 }}>{ex.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [ref, visible] = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => { if (form.name && form.email) setSent(true); };

  return (
    <section id="contact" ref={ref} style={{ padding: "8rem 3rem", maxWidth: 700 }}>
      <SectionTitle label="05" title="CONTACT" visible={visible} />
      {sent ? (
        <div style={{
          marginTop: "4rem", padding: "3rem", border: "1px solid rgba(0,255,136,0.3)",
          textAlign: "center", fontFamily: "'Space Mono', monospace", color: "#00ff88", fontSize: "1.1rem",
          animation: "fadeIn 0.6s ease",
        }}>
          MESSAGE TRANSMITTED ✓<br />
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "0.5rem", display: "block" }}>I'll get back to you shortly.</span>
        </div>
      ) : (
        <div style={{
          marginTop: "4rem", display: "flex", flexDirection: "column", gap: "1.2rem",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(.16,1,.3,1) 0.3s",
        }}>
          {["name", "email"].map(k => (
            <input key={k} placeholder={k.toUpperCase()} value={form[k]} onChange={handle(k)} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
              padding: "1rem 1.2rem", color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: "0.82rem",
              letterSpacing: "1.5px", outline: "none", width: "100%",
            }}
              onFocus={e => e.target.style.borderColor = "rgba(0,255,136,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          ))}
          <textarea placeholder="MESSAGE" value={form.message} onChange={handle("message")} rows={5} style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
            padding: "1rem 1.2rem", color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: "0.82rem",
            letterSpacing: "1.5px", outline: "none", resize: "vertical",
          }}
            onFocus={e => e.target.style.borderColor = "rgba(0,255,136,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          />
          <button onClick={submit} style={{
            background: "#00ff88", color: "#050510", border: "none", padding: "1rem 2.5rem",
            fontFamily: "'Space Mono', monospace", fontSize: "0.82rem", letterSpacing: "3px",
            textTransform: "uppercase", cursor: "pointer", fontWeight: 700, alignSelf: "flex-start",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}>SEND_MESSAGE</button>
        </div>
      )}
    </section>
  );
}

function SectionTitle({ label, title, visible }) {
  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.7s cubic-bezier(.16,1,.3,1)" }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: "rgba(0,255,136,0.5)", letterSpacing: "4px" }}>{label} //</span>
      <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#fff", margin: "0.2rem 0 0", letterSpacing: "4px", lineHeight: 1 }}>
        {title}<span style={{ color: "#00ff88" }}>.</span>
      </h2>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; cursor: none; }
        body { background: #050510; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050510; }
        ::-webkit-scrollbar-thumb { background: #00ff88; }
        @keyframes gridMove { 0% { backgroundPosition: 0 0; } 100% { backgroundPosition: 60px 60px; } }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:.6;}50%{transform:scale(1.15);opacity:1;} }
        @keyframes blink { 0%,100%{opacity:1;}50%{opacity:0;} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(8px);} }
        @keyframes fadeIn { from{opacity:0;transform:scale(.97);}to{opacity:1;transform:none;} }
      `}</style>
      <Cursor />
      <Navbar active={active} />
      <main style={{ maxWidth: 1200, margin: "0 auto", color: "#fff" }}>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 3rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", letterSpacing: "1.5px",
      }}>
        <span>© 2025 ALEX CARTER</span>
        <span>BUILT WITH REACT + JAVA</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["GitHub", "LinkedIn", "Twitter"].map(s => (
            <a key={s} href="#" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#00ff88"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
            >{s}</a>
          ))}
        </div>
      </footer>
    </>
  );
}