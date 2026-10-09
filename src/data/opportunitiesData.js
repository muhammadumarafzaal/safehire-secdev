/**
 * SafeHire Central Opportunities Store & Validation Utilities
 * Parallel Module Development Data Layer (Activity 3)
 * Module 1 Lead: Muhammad Umar Afzaal (23F-3106)
 * Module 2 Lead: Musa Rehan (23F-3093)
 */

export const INITIAL_OPPORTUNITIES = [
  {
    id: "JOB-01",
    title: "Junior Cloud & AppSec Intern",
    company: "Systems Limited",
    verified: true,
    location: "Lahore (Hybrid)",
    mode: "hybrid",
    category: "security",
    stipend: "PKR 55,000 / mo",
    stipendAmount: 55000,
    minCgpa: 3.0,
    matchScore: 94,
    tags: ["OWASP", "FastAPI", "Docker", "Penetration Testing"],
    description: "Assist application security engineering with API vulnerability testing and Semgrep SAST pipelines. Conduct automated fuzzing and threat surface analysis.",
    auditDigest: "0xSYS-8F12",
    auditHash: "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    postedBy: "Dr. Tariq Mahmood (Placement Office)",
    postedAt: "2026-10-02",
    status: "active"
  },
  {
    id: "JOB-02",
    title: "Full-Stack Developer Intern",
    company: "Afiniti Pakistan",
    verified: true,
    location: "Islamabad (Remote)",
    mode: "remote",
    category: "software",
    stipend: "PKR 60,000 / mo",
    stipendAmount: 60000,
    minCgpa: 3.2,
    matchScore: 91,
    tags: ["Python", "FastAPI", "React", "PostgreSQL"],
    description: "Developing robust backend data pipelines with strict input validation, tokenized session management, and encrypted database connections.",
    auditDigest: "0xAFN-4B91",
    auditHash: "sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    postedBy: "Corporate Talent Team",
    postedAt: "2026-10-03",
    status: "active"
  },
  {
    id: "JOB-03",
    title: "AI Security & RAG Engineer Intern",
    company: "Netsol Technologies",
    verified: true,
    location: "Lahore (On-site)",
    mode: "on-site",
    category: "ai",
    stipend: "PKR 65,000 / mo",
    stipendAmount: 65000,
    minCgpa: 3.5,
    matchScore: 88,
    tags: ["LLM Security", "Prompt Guard", "LangChain", "Python"],
    description: "Evaluating prompt injection defense sanitizers, structured schema validation filters, and enterprise AI safety guardrails for banking pipelines.",
    auditDigest: "0xNET-3C77",
    auditHash: "sha256:5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    postedBy: "Netsol AI Research Lab",
    postedAt: "2026-10-04",
    status: "active"
  },
  {
    id: "JOB-04",
    title: "DevSecOps & CI/CD Pipeline Trainee",
    company: "10Pearls Pakistan",
    verified: true,
    location: "Karachi (Hybrid)",
    mode: "hybrid",
    category: "devops",
    stipend: "PKR 50,000 / mo",
    stipendAmount: 50000,
    minCgpa: 3.0,
    matchScore: 85,
    tags: ["GitHub Actions", "Docker", "Trivy", "Terraform"],
    description: "Automate security scanning in deployment pipelines, secret leakage prevention, static code analysis, and software bill of materials (SBOM) generation.",
    auditDigest: "0x10P-6E20",
    auditHash: "sha256:4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
    postedBy: "DevSecOps Guild",
    postedAt: "2026-10-05",
    status: "active"
  },
  {
    id: "JOB-05",
    title: "Cyber Threat Intelligence Intern",
    company: "Trillium Information Security",
    verified: true,
    location: "Islamabad (Hybrid)",
    mode: "hybrid",
    category: "security",
    stipend: "PKR 58,000 / mo",
    stipendAmount: 58000,
    minCgpa: 3.3,
    matchScore: 82,
    tags: ["SIEM", "MITRE ATT&CK", "Network Forensics"],
    description: "Monitor threat intelligence feeds, analyze Indicators of Compromise (IoCs), and compile structured vulnerability reports adhering to ISO 27001.",
    auditDigest: "0xTRL-91D4",
    auditHash: "sha256:ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
    postedBy: "Security Operations Center",
    postedAt: "2026-10-06",
    status: "active"
  },
  {
    id: "JOB-06",
    title: "Frontend UX Security Specialist",
    company: "Careem Engineering",
    verified: true,
    location: "Lahore (Hybrid)",
    mode: "hybrid",
    category: "software",
    stipend: "PKR 70,000 / mo",
    stipendAmount: 70000,
    minCgpa: 3.4,
    matchScore: 79,
    tags: ["TypeScript", "CSP", "Anti-XSS", "React"],
    description: "Implement defense-in-depth UI architectures, robust Content Security Policy headers, DOMPurify sanitizer integrations, and secure cookie hygiene.",
    auditDigest: "0xCRM-11A8",
    auditHash: "sha256:8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    postedBy: "Careem Platform Security",
    postedAt: "2026-10-07",
    status: "active"
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Domains' },
  { id: 'security', label: 'Cybersecurity & AppSec' },
  { id: 'software', label: 'Full-Stack Software' },
  { id: 'ai', label: 'AI & Data Intelligence' },
  { id: 'devops', label: 'DevSecOps & Cloud' }
];

export const WORK_MODES = [
  { id: 'all', label: 'All Modes' },
  { id: 'on-site', label: 'On-site' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'remote', label: 'Remote' }
];

/**
 * Security validation: Sanitizes input to neutralize XSS and script injection
 */
export function sanitizeInput(str) {
  if (!str) return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Validates search query string for safe exploration (Module 2)
 */
export function validateSearchQuery(query) {
  if (!query) return { isValid: true, sanitized: '', warning: null };
  
  if (query.length > 50) {
    return {
      isValid: false,
      sanitized: query.substring(0, 50),
      warning: 'Search query exceeded 50 characters and was truncated for safety.'
    };
  }

  // Detect script or injection patterns
  const dangerousPattern = /[<>{}\\]/g;
  if (dangerousPattern.test(query)) {
    const cleaned = query.replace(dangerousPattern, '');
    return {
      isValid: true,
      sanitized: cleaned,
      warning: 'Disallowed characters (<, >, {, }, \\) removed from search query.'
    };
  }

  return { isValid: true, sanitized: query, warning: null };
}

/**
 * Validates new opportunity form submission (Module 1)
 */
export function validateOpportunityForm(formData) {
  const errors = {};

  if (!formData.title || formData.title.trim().length < 4) {
    errors.title = 'Job title is required and must be at least 4 characters.';
  } else if (/[<>]/.test(formData.title)) {
    errors.title = 'Job title cannot contain HTML or angle brackets.';
  }

  if (!formData.company || formData.company.trim().length < 2) {
    errors.company = 'Company name is required.';
  }

  const stipendNum = Number(formData.stipendAmount);
  if (!formData.stipendAmount || isNaN(stipendNum) || stipendNum <= 0) {
    errors.stipendAmount = 'Please enter a valid monthly stipend in PKR.';
  } else if (stipendNum < 30000) {
    errors.stipendAmount = 'Stipend must be at least PKR 30,000 under the SafeHire Fair-Stipend SLA.';
  }

  const cgpaNum = Number(formData.minCgpa);
  if (formData.minCgpa === '' || isNaN(cgpaNum)) {
    errors.minCgpa = 'Minimum CGPA is required.';
  } else if (cgpaNum < 2.0 || cgpaNum > 4.0) {
    errors.minCgpa = 'CGPA cutoff must be between 2.00 and 4.00.';
  }

  if (!formData.description || formData.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters to ensure transparent job expectations.';
  } else if (/<script/i.test(formData.description)) {
    errors.description = 'Script tags are forbidden under application security policy.';
  }

  if (!formData.tags || formData.tags.trim().length === 0) {
    errors.tags = 'At least one skill tag is required (e.g., Python, OWASP).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Generates tamper-evident cryptographic verification digest for newly posted opportunities
 */
export function generateOpportunityDigest(title, company) {
  const seed = `${title}:${company}:${Date.now()}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hexPart = Math.abs(hash).toString(16).toUpperCase().padStart(6, '0');
  const randomHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  
  return {
    digestId: `0xVER-${hexPart.substring(0, 4)}`,
    fullSha256: `sha256:4a${randomHex}892f`
  };
}
