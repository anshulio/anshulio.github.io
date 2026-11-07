
/**
 * Portfolio Data Configuration
 * Manage profile, projects, skills and current interests here.
 */

const portfolioData = {
  profile: {
    name: "Anshul Raj",
    terminalPrompt: "> anshulraj_",

    role: "ECE Student · VLSI Design & Technology",
    institution: "National Institute of Technology, Patna",

    identity: "Developer · Learner · Builder",

    tagline:
      "Exploring technology, building useful software, and learning how things work.",

    about: [
      "I'm an Electronics and Communication Engineering student specializing in VLSI Design and Technology at NIT Patna.",

      "Beyond electronics, I'm interested in programming, Linux, computer systems, and AI/ML. I enjoy understanding how things work and turning ideas into practical tools.",

      "I believe in learning by building, experimenting, and keeping things simple."
    ],

    social: {
      github: "https://github.com/anshulio",
      email: "codery114187@gmail.com",
      linkedin: "https://linkedin.com/in/anshulraj"
    }
  },

  projects: [
    {
      id: "pastebin",
      title: "Snip",
      description:
        "A lightweight personal pastebin for storing and sharing code snippets and text, powered by Cloudflare Workers.",

      tags: ["Cloudflare Workers", "JavaScript", "KV Storage", "REST API"],

      github: "https://github.com/anshulio/snip",
      demo: "https://pastebin.anshulraj.workers.dev/",

      featured: true
    },

    {
      id: "file-manager",
      title: "Android File Manager",
      description:
        "An Android file management project focused on efficient file operations, a clean interface, and advanced storage workflows.",

      tags: ["Android", "Kotlin", "Jetpack Compose"],

      github: "https://github.com/anshulio/android-file-manager",
      demo: null,

      featured: true
    },

    {
      id: "movie-library",
      title: "CineVault",
      description:
        "A personal movie library for organizing collections, tracking watched titles, and managing movie metadata.",

      tags: ["Python", "SQLite", "API Integration"],

      github: "https://github.com/anshulio/cinevault",
      demo: null,

      featured: true
    },

    {
      id: "developer-tools",
      title: "Developer Tools",
      description:
        "A collection of small utilities, scripts, and experiments designed to simplify everyday development workflows.",

      tags: ["Linux", "Bash", "Python", "CLI"],

      github: "https://github.com/anshulio/dev-tools",
      demo: null,

      featured: true
    }
  ],

  skills: [
    {
      category: "Languages",
      items: ["C", "C++", "Python", "Java", "JavaScript"]
    },

    {
      category: "Web Development",
      items: ["HTML", "CSS", "JavaScript", "REST APIs"]
    },

    {
      category: "Android Development",
      items: ["Kotlin", "Jetpack Compose"]
    },

    {
      category: "Systems & Tools",
      items: ["Linux", "Git", "Bash", "VS Code"]
    },

    {
      category: "AI & Machine Learning",
      items: ["Machine Learning", "LLMs", "AI Experimentation"]
    },

    {
      category: "Databases",
      items: ["SQLite", "Cloudflare KV"]
    }
  ],

  currentlyExploring: [
    "VLSI Design & Digital Electronics",
    "Data Structures & Algorithms",
    "Linux & System Internals",
    "Artificial Intelligence & Machine Learning",
    "Software Development"
  ]
};


// Export for Node.js or browser usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
} else {
  window.portfolioData = portfolioData;
}

