export const heroData = {
  stats: [
    { value: '1+', labelKey: 'hero.stats.yearsExperience' },
    { value: '10+', labelKey: 'hero.stats.projects' },
    { value: '2', labelKey: 'hero.stats.companies' }
  ],
  title: 'hero.title',
  subtitle: 'hero.subtitle',
  description: 'hero.description',
  notAvailable: 'hero.notAvailable',
  contactBtn: 'hero.contactBtn',
  viewProjectsBtn: 'hero.viewProjectsBtn'
}

export const aboutData = {
  title: 'about.title',
  subtitle: 'about.subtitle',
  name: 'about.name',
  role: 'about.role',
  whoAmI: 'about.whoAmI',
  whoAmIText: 'about.whoAmIText',
  whatIDo: 'about.whatIDo',
  whatIDoText: 'about.whatIDoText'
}

export const experienceData = {
  title: 'experience.title',
  subtitle: 'experience.subtitle',
  experiences: [
    {
      id: 1,
      jobTitle: 'experience.job1.title',
      company: 'experience.job1.company',
      period: 'experience.job1.period',
      description: 'experience.job1.description',
      skills: ['Vue.js', 'Node.js', 'Docker', 'AWS']
    },
    {
      id: 2,
      jobTitle: 'experience.job2.title',
      company: 'experience.job2.company',
      period: 'experience.job2.period',
      description: 'experience.job2.description',
      skills: ['React', 'Python', 'AWS', 'PostgreSQL']
    },
    {
      id: 3,
      jobTitle: 'experience.job3.title',
      company: 'experience.job3.company',
      period: 'experience.job3.period',
      description: 'experience.job3.description',
      skills: ['JavaScript', 'MongoDB', 'Git', 'REST API']
    }
  ]
}

export const educationData = {
  title: 'education.title',
  subtitle: 'education.subtitle',
  expertise: 'education.expertise',
  certificates: [
    {
      id: 1,
      title: 'education.cert1.title',
      issuer: 'education.cert1.issuer',
      date: '2023',
      skills: ['AWS', 'Cloud']
    },
    {
      id: 2,
      title: 'education.cert2.title',
      issuer: 'education.cert2.issuer',
      date: '2023',
      skills: ['Docker', 'Kubernetes']
    },
    {
      id: 3,
      title: 'education.cert3.title',
      issuer: 'education.cert3.issuer',
      date: '2024',
      skills: ['JavaScript', 'TypeScript']
    }
  ],
  educations: [
    {
      id: 1,
      period: 'education.degree1.period',
      title: 'education.degree1.title',
      school: 'education.degree1.school',
      description: 'education.degree1.description',
      tags: ['Relevant Course', 'GPA: X.XX']
    },
    {
      id: 2,
      period: 'education.degree2.period',
      title: 'education.degree2.title',
      school: 'education.degree2.school',
      description: 'education.degree2.description',
      tags: ['Web Development', 'Programming']
    },
    {
      id: 3,
      period: 'education.degree3.period',
      title: 'education.degree3.title',
      school: 'education.degree3.school',
      description: 'education.degree3.description',
      tags: ['Science', 'Mathematics']
    }
  ],
  skills: [
    {
      id: 1,
      icon: '💻',
      title: 'education.skill1.title',
      subtitle: 'education.skill1.subtitle'
    },
    {
      id: 2,
      icon: '🎨',
      title: 'education.skill2.title',
      subtitle: 'education.skill2.subtitle'
    },
    {
      id: 3,
      icon: '☁️',
      title: 'education.skill3.title',
      subtitle: 'education.skill3.subtitle'
    },
    {
      id: 4,
      icon: '🗄️',
      title: 'education.skill4.title',
      subtitle: 'education.skill4.subtitle'
    }
  ]
}

export const skillsData = {
  title: 'skills.title',
  subtitle: 'skills.subtitle',
  categories: [
    {
      id: 1,
      icon: '💻',
      title: 'skills.backend.title',
      subtitle: 'skills.backend.subtitle',
      items: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 80 },
        { name: 'Go', level: 70 }
      ]
    },
    {
      id: 2,
      icon: '🎨',
      title: 'skills.frontend.title',
      subtitle: 'skills.frontend.subtitle',
      items: [
        { name: 'Vue.js', level: 90 },
        { name: 'React', level: 80 },
        { name: 'Tailwind CSS', level: 85 }
      ]
    },
    {
      id: 3,
      icon: '☁️',
      title: 'skills.devops.title',
      subtitle: 'skills.devops.subtitle',
      items: [
        { name: 'Docker', level: 85 },
        { name: 'AWS', level: 80 },
        { name: 'CI/CD', level: 75 }
      ]
    },
    {
      id: 4,
      icon: '🗄️',
      title: 'skills.database.title',
      subtitle: 'skills.database.subtitle',
      items: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'Redis', level: 70 }
      ]
    },
    {
      id: 5,
      icon: '🛠️',
      title: 'skills.tools.title',
      subtitle: 'skills.tools.subtitle',
      items: ['Git', 'VS Code', 'Postman', 'Figma']
    },
    {
      id: 6,
      icon: '🤝',
      title: 'skills.soft.title',
      subtitle: 'skills.soft.subtitle',
      items: ['Teamwork', 'Problem Solving', 'Communication', 'Adaptability']
    }
  ]
}

export const projectsData = {
  title: 'projects.title',
  subtitle: 'projects.subtitle',
  projects: [
    {
      id: 1,
      type: 'projects.type.webapp',
      year: '2024',
      title: 'projects.project1.title',
      description: 'projects.project1.description',
      technologies: ['Vue.js', 'Node.js'],
      codeLink: '#',
      demoLink: '#'
    },
    {
      id: 2,
      type: 'projects.type.api',
      year: '2024',
      title: 'projects.project2.title',
      description: 'projects.project2.description',
      technologies: ['Python', 'FastAPI'],
      codeLink: '#',
      demoLink: '#'
    },
    {
      id: 3,
      type: 'projects.type.mobile',
      year: '2023',
      title: 'projects.project3.title',
      description: 'projects.project3.description',
      technologies: ['React Native', 'Firebase'],
      codeLink: '#',
      demoLink: '#'
    },
    {
      id: 4,
      type: 'projects.type.tool',
      year: '2023',
      title: 'projects.project4.title',
      description: 'projects.project4.description',
      technologies: ['Go', 'CLI'],
      codeLink: '#',
      demoLink: '#'
    },
    {
      id: 5,
      type: 'projects.type.cloud',
      year: '2023',
      title: 'projects.project5.title',
      description: 'projects.project5.description',
      technologies: ['AWS', 'Terraform'],
      codeLink: '#',
      demoLink: '#'
    },
    {
      id: 6,
      type: 'projects.type.data',
      year: '2022',
      title: 'projects.project6.title',
      description: 'projects.project6.description',
      technologies: ['Python', 'ML'],
      codeLink: '#',
      demoLink: '#'
    }
  ]
}

export const navData = {
  home: 'nav.home',
  about: 'nav.about',
  experience: 'nav.experience',
  skills: 'nav.skills',
  projects: 'nav.projects',
  education: 'nav.education',
  contact: 'nav.contact'
}
