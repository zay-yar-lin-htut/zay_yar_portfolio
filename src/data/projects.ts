export const projectsData = {
  title: 'projects.title.main',
  subtitle: 'projects.title.main_subtitle',
  projects: {
    personal: {
      title: "projects.title.personal",
      projects: [
        {
          id: 1,
          type: 'projects.type.webapp',
          year: '2025',
          title: 'projects.project1.title',
          description: 'projects.project1.description',
          technologies: ['Laravel', 'React.js', 'Cloudflare R2', 'MySQL'],
          codeLinks: [
            {
              label: 'Frontend',
              url: 'https://github.com/zay-yar-lin-htut/car_rental_frontend'
            },
            {
              label: 'Backend',
              url: 'https://github.com/zay-yar-lin-htut/car_rental_backend'
            }
          ],
          demoLink: 'https://car-rental-frontend-weu1.vercel.app/',
          demoImage: "/images/carRental.png",
          imageClass: "h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105",
          private: false,
          privateStatus: 'Public Project'
        },
        {
          id: 2,
          type: 'projects.type.mobile',
          year: '2026',
          title: 'projects.project6.title',
          description: 'projects.project6.description',
          technologies: [
            'Flutter',
            'Dart',
            'YouTube Explode',
            'just_audio',
            'audio_service',
            'SQLite'
          ],
          codeLinks: [
            {
              label: 'Repository',
              url: 'https://github.com/zay-yar-lin-htut/youtube-mp3-downloader---player'
            }
          ],
          demoLink: null,
          demoImage: '/images/freevibe.png',
          imageClass: 'h-80 w-full object-contain p-12 transition-transform duration-500 group-hover:scale-105',
          private: false,
          privateStatus: 'Public Project'
        },
      ]
    },
    school: {
      title: "projects.title.school",
      projects: [
        {
          id: 1,
          type: 'projects.type.api',
          year: '2025',
          title: 'projects.project2.title',
          description: 'projects.project2.description',
          technologies: ['Laravel', 'REST API', 'AWS S3'],
          codeLinks: [
            {
              label: 'Repository',
              url: 'https://github.com/Group-4-EWSD/Website'
            }
          ],
          demoLink: "https://aurora-university.vercel.app/home",
          demoImage: "/images/aurora.png",
          imageClass: "h-30 w-30 object-cover transition-transform duration-500 group-hover:scale-105",
          private: false,
          privateStatus: 'School / Group project'
        },
      ],
    },
    work: {
      title: "projects.title.work",
      projects: [
        {
          id: 1,
          type: 'projects.type.ai',
          year: '2025',
          title: 'projects.project5.title',
          description: 'projects.project5.description',
          technologies: ['Python', 'FastAPI', 'Ubuntu'],
          codeLink: null,
          demoLink: null,
          demoImage: null,
          imageClass: null,
          private: true,
          privateStatus: 'Company / Private project'
        },
        {
          id: 2,
          type: 'projects.type.webapp',
          year: '2026',
          title: 'projects.project4.title',
          description: 'projects.project4.description',
          technologies: ['C# .NET Core', 'Vue', 'Hangfire'],
          codeLink: null,
          demoLink: null,
          demoImage: null,
          imageClass: null,
          private: true,
          privateStatus: 'Company / Private project'
        },
        {
          id: 3,
          type: 'projects.type.mobile',
          year: '2026',
          title: 'projects.project3.title',
          description: 'projects.project3.description',
          technologies: ['Flutter', 'Vue', 'AI-assisted migration', 'C# .NET'],
          codeLink: null,
          demoLink: null,
          demoImage: null,
          imageClass: null,
          private: true,
          privateStatus: 'Company / Private project'
        }
      ]
    }
  }
}
