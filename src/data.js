export const portfolio = {
  person: {
    name: 'Sai Shashank Maktala',
    role: 'MSc Computer Science & Engineering',
    location: 'Copenhagen, Denmark',
    email: 'smaktala@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sasha175/',
    github: 'https://github.com/SashaDoesntDie',
    intro:
      'MSc Computer Science & Engineering student at DTU with a strong interest in backend systems, cloud infrastructure and full-stack software development. I enjoy building practical software, learning new technologies and turning technical ideas into reliable products.',
  },
  landmarks: [
    {
      id: 'about',
      index: '01',
      label: 'PROFILE',
      title: 'About me',
      subtitle: 'The driver behind the work.',
      position: [-18, 0, -10],
      accent: '#e8ff5b',
      kind: 'orbital',
      body:
        'I am currently studying for my MSc in Computer Science and Engineering at DTU. My main interests are Java and Python development, backend engineering, full-stack development and cloud technologies. I am early in my career and focused on building strong practical engineering skills through projects, teamwork and real-world software development.',
      meta: ['Java', 'Python', 'Backend', 'Cloud'],
      sections: [
        {
          title: 'Engineering focus',
          text: 'My studies and projects have given me hands-on experience with Java, Python, JavaScript, SQL, Node.js, Express.js, REST APIs, MySQL, PostgreSQL, MongoDB, Git, Docker and CI/CD workflows.',
        },
        {
          title: 'How I work',
          text: 'I enjoy solving problems, learning new technologies and working with others. I bring a serious approach to my work, strong willingness to learn and the adaptability to grow into unfamiliar technical areas.',
        },
        {
          title: 'What I am looking for',
          text: 'I am looking for an entry-level software development opportunity where I can gain real-world experience, contribute to a good engineering team and grow into a strong software engineer. I am open to backend, full-stack and related development roles.',
        },
      ],
      note: 'Profile content is based on my current CV and general motivation letter.',
    },
    {
      id: 'projects',
      index: '02',
      label: 'PROJECTS',
      title: 'Selected projects',
      subtitle: 'Backend, full-stack and software engineering work.',
      position: [17, 0, -16],
      accent: '#ff5f1f',
      kind: 'pavilion',
      body:
        'These projects reflect the areas I have spent the most time building and studying: backend architecture, databases, APIs, collaborative software development and software testing.',
      meta: ['REST APIs', 'Java', 'Node.js', 'Databases'],
      sections: [
        {
          title: 'Full-Stack Wikipedia Web Application',
          kicker: 'Backend-focused · Node.js + Express.js + MongoDB',
          bullets: [
            'Designed and implemented RESTful APIs using Node.js and Express.js.',
            'Developed the backend architecture using MVC principles for separation of concerns.',
            'Implemented JWT-based authentication and role-based authorization.',
            'Integrated MongoDB for persistent data storage and efficient querying.',
            'Handled request validation, routing and error management.',
            'Managed version control using Git.',
          ],
        },
        {
          title: 'Timeline Database Management System',
          kicker: 'Java + MySQL',
          bullets: [
            'Developed a Java-based backend system for managing project timelines.',
            'Designed the relational database schema and implemented SQL-based data operations.',
            'Built application logic using object-oriented design principles.',
            'Implemented CRUD operations and data validation.',
            'Collaborated in a 12-person team using Git for version control.',
          ],
        },
        {
          title: 'Bachelor Thesis',
          kicker: 'Automated test case generation in Java',
          bullets: [
            'Conducted controlled experiments comparing automated test-case generation tools for Java systems.',
            'Analyzed generated test suites using coverage and performance metrics.',
            'Strengthened my understanding of software testing strategies, code quality and test effectiveness in backend systems.',
          ],
        },
      ],
      note: 'Project descriptions are taken from my current CV.',
    },
    {
      id: 'experience',
      index: '03',
      label: 'EXPERIENCE',
      title: 'Engineering experience',
      subtitle: 'Practical work developed through projects, research and teamwork.',
      position: [23, 0, 12],
      accent: '#8fd7ff',
      kind: 'monolith',
      body:
        'I am at the beginning of my professional career, so my strongest experience currently comes from academic software projects, collaborative development and my bachelor thesis rather than a long employment history.',
      meta: ['Teamwork', 'Backend', 'Testing', 'Git'],
      sections: [
        {
          title: 'Backend & full-stack development',
          text: 'Across my studies I have worked with software architecture, databases, authentication, APIs and application logic using Java, Node.js, Express.js and SQL/NoSQL databases.',
        },
        {
          title: 'Collaborative development',
          text: 'On the Timeline Database Management System I worked as part of a 12-person team and used Git for version control while developing backend logic, database operations and validation.',
        },
        {
          title: 'Software testing research',
          text: 'My bachelor thesis focused on automated test generation for Java applications. I compared tools through controlled experiments and evaluated test suites using coverage and performance metrics.',
        },
      ],
      note: 'I have intentionally described this as engineering experience rather than inventing professional roles that are not listed on my CV.',
    },
    {
      id: 'cv',
      index: '04',
      label: 'CV',
      title: 'Curriculum vitae',
      subtitle: 'Education, technical skills and credentials.',
      position: [-22, 0, 16],
      accent: '#c8b6ff',
      kind: 'tower',
      body:
        'Computer Science & Engineering MSc student at DTU with a strong foundation in backend development, cloud architecture and software engineering, with hands-on experience building software using Java, Node.js, REST APIs and databases.',
      meta: ['DTU', 'AWS', 'Backend', 'Databases'],
      sections: [
        {
          title: 'MSc · Computer Science and Engineering',
          kicker: 'Technical University of Denmark (DTU), Lyngby · 2025–2027',
          text: 'Current master’s degree studies in Computer Science and Engineering.',
        },
        {
          title: 'Bachelor of Computer Science',
          kicker: 'Linnaeus University, Sweden · 2019–2025',
          text: 'Bachelor studies in Computer Science, including a thesis on automated test-case generation tools for Java.',
        },
        {
          title: 'AWS Certified Solutions Architect – Associate',
          kicker: 'Issued 09 Oct 2024 · Expires 09 Oct 2027',
          text: 'Certification supporting my understanding of cloud architecture and AWS services.',
        },
        {
          title: 'Programming languages',
          text: 'Java · C# · JavaScript · Python · SQL',
        },
        {
          title: 'Backend & web development',
          text: 'Node.js · Express.js · REST APIs · MVC architecture · JWT authentication',
        },
        {
          title: 'Cloud & DevOps',
          text: 'AWS (EC2, S3, IAM, RDS) · Docker · CI/CD pipelines · Git',
        },
        {
          title: 'Databases',
          text: 'MySQL · PostgreSQL · MongoDB',
        },
      ],
      note: 'For privacy, this public web version does not display my street address, phone number or private professional references.',
    },
    {
      id: 'letters',
      index: '05',
      label: 'LETTERS',
      title: 'Motivation',
      subtitle: 'What I am looking for and why software engineering interests me.',
      position: [2, 0, -27],
      accent: '#ffd77a',
      kind: 'gate',
      body:
        'My current motivation letter is aimed at entry-level software development opportunities where I can build practical experience, contribute to a strong team and continue developing as an engineer.',
      meta: ['Entry-level', 'Java', 'Python', 'Growth'],
      sections: [
        {
          title: 'Areas I want to work in',
          text: 'My strongest interests are Java and Python development, backend engineering and full-stack development. I am also interested in cloud technologies and the engineering practices around reliable software delivery.',
        },
        {
          title: 'What I bring',
          text: 'A strong willingness to learn, adaptability, a serious approach to my work and genuine interest in becoming a better developer. I enjoy solving problems, learning new technologies and working with others.',
        },
        {
          title: 'My goal',
          text: 'I want to join a good team and company, gain real-world experience and grow into a strong software engineer. I am open to different development roles and willing to relocate for the right opportunity.',
        },
      ],
      note: 'This section summarizes my general motivation letter dated August 2026 rather than reproducing it as a generic application letter.',
    },
    {
      id: 'contact',
      index: '06',
      label: 'CONTACT',
      title: 'Start a conversation',
      subtitle: 'Open to entry-level software development opportunities.',
      position: [0, 0, 25],
      accent: '#90f0c2',
      kind: 'beacon',
      body:
        'I am currently based in Copenhagen, Denmark and studying at DTU. I am open to software development opportunities and would be happy to discuss backend, full-stack, Java, Python or cloud-focused roles.',
      meta: ['Copenhagen', 'Email', 'LinkedIn', 'GitHub'],
      sections: [
        {
          title: 'Email',
          text: 'smaktala@gmail.com',
        },
        {
          title: 'LinkedIn',
          text: 'linkedin.com/in/sasha175',
        },
        {
          title: 'Location',
          text: 'Copenhagen, Denmark · Open to relocation for the right opportunity.',
        },
      ],
      actions: [
        { label: 'EMAIL ME', href: 'mailto:smaktala@gmail.com' },
        { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/sasha175/' },
        { label: 'GITHUB', href: 'https://github.com/SashaDoesntDie' },
      ],
      note: 'The fastest way to reach me is by email or LinkedIn.',
    },
  ],
}
