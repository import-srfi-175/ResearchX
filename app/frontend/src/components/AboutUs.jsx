import React from 'react';
import '../styles/AboutUs.css';
import YK from '../images/yk.png';
import AJ from '../images/ja.png';
import PK from '../images/pk.png';
import MK from '../images/mk.png';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const teamMembers = [
  {
    name: 'Yash Kambli',
    role: 'Full Stack Developer, UI/UX Designer',
    image: YK,
    github: 'https://github.com/yashkambli',
    linkedin: 'https://linkedin.com/in/yashkambli',
    email: 'yash@arxivclone.com',
    resume: '/resumes/yash-resume.pdf',
    interests: [
      'Passionate about crafting intuitive user experiences that bridge the gap between functionality and aesthetics.',
      'Enjoys optimizing web performance and ensuring fast loading times for better user engagement.',
      'Avid learner of new technologies and trends in web development, particularly in React and design frameworks.'
    ],
    techStack: ['React.js', 'Next.js', 'JavaScript', 'Node.js', 'FastAPI', 'PostgreSQL', 'Figma'],
    experience: [
      '2 years of experience in web development, focusing on both front-end and back-end technologies.',
      'Led front-end team on various projects, emphasizing collaborative development and code reviews.',
      'Proficient in building responsive UI with accessibility in mind.'
    ]
  },
  {
    name: 'Atharva Jagtap',
    role: 'Frontend Developer, UI/UX Designer',
    image: AJ,
    github: 'https://github.com/atharvajagtap',
    linkedin: 'https://linkedin.com/in/atharvajagtap',
    email: 'atharva@arxivclone.com',
    resume: '/resumes/atharva-resume.pdf',
    interests: [
      'Fascinated by cloud infrastructure and its role in scalable web applications.',
      'Passionate about designing APIs that are both intuitive and efficient for developers.',
      'Strong interest in database management and optimization techniques, especially in PostgreSQL.'
    ],
    techStack: ['React.js', 'PostgreSQL', 'Figma', 'Adobe XD', 'Canva'],
    experience: [
      '3 years of experience in frontend development, focusing on user-centric design principles.',
      'Built scalable microservices for production systems, ensuring high availability and performance.',
      'Experienced in database design and optimization, significantly improving query performance in live applications.'
    ]
  },
  {
    name: 'Prathamesh Khachane',
    role: 'Full Stack Developer, Data Scientist',
    image: PK,
    github: 'https://github.com/prathameshkachane',
    linkedin: 'https://linkedin.com/in/prathameshkachane',
    email: 'prathamesh@arxivclone.com',
    resume: '/resumes/prathamesh-resume.pdf',
    interests: [
      'Deeply engaged in machine learning techniques and their application in real-world scenarios.',
      'Passionate about natural language processing and its potential to enhance user interactions.',
      'Keen interest in data analytics and visualization to derive actionable insights from complex datasets.'
    ],
    techStack: ['FastAPI', 'React.js', 'Pandas', 'PyTorch', 'Scikit-learn', 'TensorFlow', 'Keras'],
    experience: [
      '2 years of experience in data science, focusing on predictive analytics and model development.',
      'Developed models for predictive analysis, improving accuracy rates for business decisions.',
      'Conducted research on NLP techniques, resulting in significant advancements in automated text analysis.'
    ]
  },
  {
    name: 'Mohit Kasliwal',
    role: 'Full Stack Developer',
    image: MK,
    github: 'https://github.com/mohitkasliwal',
    linkedin: 'https://linkedin.com/in/mohitkasliwal',
    email: 'mohit@arxivclone.com',
    resume: '/resumes/mohit-resume.pdf',
    interests: [
      'Strong advocate for user-centered design, ensuring that user needs drive the development process.',
      'Enjoys creating prototypes to visualize concepts before full-scale development.',
      'Interest in design systems to maintain consistency across products and enhance team collaboration.'
    ],
    techStack: ['React', 'JavaScript', 'Node.js', 'Express', 'FastAPI'],
    experience: [
      '3 years of experience in UI/UX design and full-stack development, bridging design and functionality.',
      'Designed intuitive interfaces for web apps, focusing on user feedback and usability testing.',
      'Led design sprints and user research sessions to refine product features and user experience.'
    ]
  }
];

export default function AboutUs() {
  return (
    <>
      <div className="aboutus-container">
        <h1>About Us</h1>
        <p>Welcome to Project arXiv, a platform for researchers to publish and discover scientific work. We're a team of passionate developers and designers committed to making research accessible.</p>
        <div className="team-members-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card">
              <img src={member.image} alt={member.name} className="team-member-image" />
              <h2>{member.name}</h2>
              <p className="team-member-role">{member.role}</p>
              <div className="team-member-details">
                <h3>Interests</h3>
                <ul>
                  {member.interests.map((interest, i) => (
                    <li key={i}>{interest}</li>
                  ))}
                </ul>
                <h3>Tech Stack</h3>
                <div className="tech-stack">
                  {member.techStack.map((tech, i) => (
                    <span key={i} className="badge">{tech}</span>
                  ))}
                </div>
                <h3>Experience</h3>
                <ul>
                  {member.experience.map((exp, i) => (
                    <li key={i}>{exp}</li>
                  ))}
                </ul>
              </div>
              <div className="team-member-social">
                <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href={`mailto:${member.email}`} aria-label="Email">
                  <Mail size={20} />
                </a>
                <a href={member.resume} target="_blank" rel="noopener noreferrer" aria-label="Resume">
                  <FileText size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
