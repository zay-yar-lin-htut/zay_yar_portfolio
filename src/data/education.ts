export const educationData = {
  title: 'education.title',
  subtitle: 'education.subtitle',
  expertise: 'education.expertise',
  educations: [
    {
      id: 1,
      period: 'education.degree1.period',
      title: 'education.degree1.title',
      school: 'education.degree1.school',
      description: 'education.degree1.description',
      tags: ['Programming Fundamentals', 'Database Management', 'Networking Basics'],
      certificates: {
        cer: '/images/etacifitrec/level4-cer.jpg',
        tran: '/images/etacifitrec/level4-tran.jpg',
        // cer_verification: '/images/etacifitrec/level4-verification.jpg',
        // tran_verification: '/images/etacifitrec/level4-tran-verification.jpg'
      }
    },
    {
      id: 2,
      period: 'education.degree2.period',
      title: 'education.degree2.title',
      school: 'education.degree2.school',
      description: 'education.degree2.description',
      tags: ['Programming', 'Systems Analysis', 'Database Design'],
      certificates: {
        cer: '/images/etacifitrec/level5-cer.jpg',
        tran: '/images/etacifitrec/level5-tran.jpg',
        // cer_verification: 'https://example.com',
        // tran_verification: 'https://example.com'
      }
    },
    {
      id: 3,
      period: 'education.degree3.period',
      title: 'education.degree3.title',
      school: 'education.degree3.school',
      description: 'education.degree3.description',
      tags: ['Web Development', 'Mobile Development', 'Project Management'],
      certificates: {
        cer: '/images/etacifitrec/bechelor-cer.jpg',
        tran: '/images/etacifitrec/bechelor-tran.jpg',
        cer_verification: 'https://graduatedocsverifyqr.gre.ac.uk/?reference=08860383-01-D3GV',
        tran_verification: 'https://graduatedocsverifyqr.gre.ac.uk/?reference=56859080-01-SSYC',
      }
    }
  ],
  /** Simplified expertise grid shown under "Technical Expertise" in the Education section */
  expertiseCards: [
    { id: 1, icon: 'code', title: 'education.skill1.title', subtitle: 'education.skill1.subtitle' },
    { id: 2, icon: 'palette', title: 'education.skill2.title', subtitle: 'education.skill2.subtitle' },
    { id: 3, icon: 'cloud', title: 'education.skill3.title', subtitle: 'education.skill3.subtitle' },
    { id: 4, icon: 'database', title: 'education.skill4.title', subtitle: 'education.skill4.subtitle' },
    { id: 5, icon: 'smartphone', title: 'education.skill5.title', subtitle: 'education.skill5.subtitle' }
  ]
}
