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
  /** Simplified 4-category grid shown under "Technical Expertise" in the Education section */
  expertiseCards: [
    { id: 1, icon: 'code', title: 'education.skill1.title', subtitle: 'education.skill1.subtitle' },
    { id: 2, icon: 'palette', title: 'education.skill2.title', subtitle: 'education.skill2.subtitle' },
    { id: 3, icon: 'cloud', title: 'education.skill3.title', subtitle: 'education.skill3.subtitle' },
    { id: 4, icon: 'database', title: 'education.skill4.title', subtitle: 'education.skill4.subtitle' }
  ]
}
