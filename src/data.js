export const portfolio = {
  person: {
    name: 'Sai Shashank Maktala',
    role: 'MSc Computer Science & Engineering',
    location: 'Copenhagen, Denmark',
    email: 'smaktala@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sasha175/',
    github: 'https://github.com/SashaDoesntDie',
    intro:
      'MSc Computer Science & Engineering student at DTU with a strong foundation in backend development, cloud architecture and software engineering, and growing hands-on experience in data engineering and process mining. I enjoy building practical software, analysing real-world data and learning new technologies.',
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
        'I am currently studying for my MSc in Computer Science and Engineering at DTU. My main interests are Java and Python development, backend engineering, data-related development and cloud technologies. I am focused on building strong practical engineering skills through software projects, data analysis, teamwork and real-world problem solving.',
      meta: ['Java', 'Python', 'Backend', 'Data'],
      sections: [
        {
          title: 'Engineering focus',
          text: 'My studies and projects have given me hands-on experience with Java, Python, JavaScript, SQL, Node.js, Express.js, REST APIs, MySQL, PostgreSQL, MongoDB, Git, Docker and CI/CD workflows. I have also worked with Pandas, PM4Py and Celonis in process-mining and data-analysis work.',
        },
        {
          title: 'How I work',
          text: 'I enjoy solving problems, learning new technologies and working with others. In a six-person DTU project with Novo Nordisk and Celonis, I served as group leader and helped coordinate the project schedule, weekly meetings and work distribution.',
        },
        {
          title: 'What I am looking for',
          text: 'I am looking for opportunities where I can gain real-world experience and continue developing as a software and data engineer. I am especially interested in work involving Python, Java, SQL, backend systems, data pipelines, testing and cloud technologies.',
        },
      ],
      note: 'Profile content is based on my current CV and motivation letter.',
    },
    {
      id: 'projects',
      index: '02',
      label: 'PROJECTS',
      title: 'Selected projects',
      subtitle: 'Backend, full-stack, data and process-mining work.',
      position: [17, 0, -16],
      accent: '#ff5f1f',
      kind: 'pavilion',
      body:
        'These projects reflect the areas I have spent the most time building and studying: backend architecture, databases, APIs, collaborative software development, data analysis and process mining.',
      meta: ['Python', 'Java', 'REST APIs', 'Celonis'],
      sections: [
        {
          title: 'Full-Stack Wikipedia Web Application',
          kicker: 'Backend-focused · Node.js + Express.js + MongoDB',
          bullets: [
            'Designed and implemented RESTful APIs using Node.js and Express.js.',
            'Developed the backend architecture using MVC principles for separation of concerns.',
            'Implemented JWT-based authentication and role-based authorization.',
            'Integrated MongoDB for persistent data storage and efficient querying.',
            'Handled API request validation, routing and error management.',
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
          title: 'Process Mining – Novo Nordisk × Celonis',
          kicker: 'DTU group project · Python + Pandas + PM4Py + Celonis',
          bullets: [
            'Led a six-person DTU group project in collaboration with Novo Nordisk and Celonis, coordinating the project schedule, weekly meetings and work distribution.',
            'Analyzed clinical-trial issue-management processes using Celonis, Python, Pandas and PM4Py to identify process deviations, rework patterns and bottlenecks.',
            'Cleaned and transformed case and event-log data, deriving timing, sequence, resolution-time and activity-based features for process analysis.',
            'Led the work on process discovery and bottleneck identification, comparing the actual workflow with the designed process and identifying major causes of prolonged issue resolution.',
          ],
        },
      ],
      note: 'Project descriptions are based on my current CV.',
    },
    {
      id: 'experience',
      index: '03',
      label: 'EXPERIENCE',
      title: 'Engineering experience',
      subtitle: 'Practical work developed through projects, data analysis and teamwork.',
      position: [23, 0, 12],
      accent: '#8fd7ff',
      kind: 'monolith',
      body:
        'I am at the beginning of my professional career, so my strongest experience currently comes from academic software projects, collaborative development and a real-world process-mining project completed with Novo Nordisk and Celonis.',
      meta: ['Leadership', 'Data Analysis', 'Backend', 'Git'],
      sections: [
        {
          title: 'Process mining & team leadership',
          text: 'I led a six-person DTU group project in collaboration with Novo Nordisk and Celonis, helping organise the project schedule, divide the work and coordinate weekly meetings while the team analysed clinical-trial issue-management data.',
        },
        {
          title: 'Data engineering & process analysis',
          text: 'Using Python, Pandas, PM4Py and Celonis, I worked with case and event-log data, cleaned and transformed datasets, derived process-analysis features, discovered actual workflows and helped identify rework patterns, bottlenecks and causes of prolonged issue resolution.',
        },
        {
          title: 'Backend & full-stack development',
          text: 'Across my studies I have worked with software architecture, databases, authentication, APIs and application logic using Java, Node.js, Express.js and SQL/NoSQL databases. I have also collaborated in a 12-person development team using Git for version control.',
        },
        {
          title: 'Software testing',
          text: 'My bachelor thesis focused on automated test generation for Java applications, strengthening my understanding of software quality, test coverage and maintainable code.',
        },
      ],
      note: 'This section reflects the academic and project experience described in my current CV and motivation letter.',
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
        'Computer Science & Engineering MSc student at DTU with a strong foundation in backend development, cloud architecture and software engineering, with hands-on experience building full-stack applications and working with process-mining and data-analysis tools.',
      meta: ['DTU', 'AWS', 'Backend', 'Data'],
      sections: [
        {
          title: 'MSc · Computer Science and Engineering',
          kicker: 'Technical University of Denmark (DTU), Lyngby · 2025–2027',
          text: 'Current master’s degree studies in Computer Science and Engineering.',
        },
        {
          title: 'Bachelor of Computer Science',
          kicker: 'Linnaeus University, Sweden · 2019–2025',
          text: 'Bachelor studies in Computer Science. My bachelor thesis focused on automated test-generation tools for Java systems.',
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
          title: 'Data & process analysis',
          text: 'Python · Pandas · PM4Py · Celonis · event-log cleaning and transformation · process discovery · bottleneck analysis',
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
      note: 'For privacy, this public web version does not display my street address, phone number or professional references.',
    },
    {
      id: 'letters',
      index: '05',
      label: 'LETTERS',
      title: 'Motivation',
      subtitle: 'Why software and data engineering interest me.',
      position: [2, 0, -27],
      accent: '#ffd77a',
      kind: 'gate',
      body:
        'My current motivation letter is focused on a Data Engineering Intern opportunity at Novo Nordisk, where I can gain practical work experience and further develop my skills in software and data engineering.',
      meta: ['Data Engineering', 'Python', 'SQL', 'Cloud'],
      sections: [
        {
          title: 'Why data engineering',
          text: 'My main interests are Java and Python development, backend systems and data-related development. I am especially interested in opportunities where software engineering and real-world data come together.',
        },
        {
          title: 'Relevant project experience',
          text: 'At DTU I worked on a Process Mining project in collaboration with Novo Nordisk and Celonis. Our six-person team used Python, Pandas, PM4Py and Celonis to clean and analyse clinical-trial issue-management data and identify process bottlenecks, rework and data-quality issues. I served as the group leader.',
        },
        {
          title: 'What I bring',
          text: 'I bring a strong willingness to learn, good adaptability, a serious approach to my work and a genuine interest in becoming a better developer and engineer. I have experience with Java, Python, SQL, backend development, databases, Git, Docker and CI/CD workflows, together with an AWS cloud certification.',
        },
        {
          title: 'What I want to develop further',
          text: 'I want to gain hands-on experience with Python, SQL, data pipelines, testing and cloud technologies while contributing to a professional engineering team and continuing to grow.',
        },
      ],
      note: 'This section summarizes my current motivation letter for the Novo Nordisk Data Engineering Intern position.',
    },
    {
      id: 'contact',
      index: '06',
      label: 'CONTACT',
      title: 'Start a conversation',
      subtitle: 'Open to software and data engineering opportunities.',
      position: [0, 0, 25],
      accent: '#90f0c2',
      kind: 'beacon',
      body:
        'I am currently based in Copenhagen, Denmark and studying at DTU. I am interested in software and data engineering opportunities involving backend development, Java, Python, SQL, data analysis or cloud technologies.',
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
          text: 'Copenhagen, Denmark',
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
