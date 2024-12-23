import React, { useState, useRef } from 'react';
import {
  Award,
  GraduationCap,
  Briefcase,
  Code,
  Book,
  Plus,
  Download,
  UserCircle,
  Mail,
  Phone,
  Linkedin,
  Github,
  Trophy,
  Globe,
  Languages,
  Target,
  Star,
  Calendar
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Types for resume sections
interface BaseInfo {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  website?: string;
  location: string;
  about: string;
}

interface Education {
  institution: string;
  degree: string;
  years: string;
  gpa?: string;
  achievements?: string[];
}

interface Skill {
  category: string;
  items: string[];
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
  technologies?: string[];
}

interface Project {
  title: string;
  description: string;
  link?: string;
  technologies: string[];
  duration: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface ResumeData extends BaseInfo {
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  achievements: string[];
  extraCurricular: string[];
  interests: string[];
}

const emptyResumeData: ResumeData = {
  name: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  website: '',
  location: '',
  about: '',
  education: [],
  skills: [],
  experience: [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: [],
  extraCurricular: [],
  interests: []
};

const DynamicResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experienced' | 'fresher'>('experienced');
  const [resumeData, setResumeData] = useState<ResumeData>({
    ...emptyResumeData,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    location: 'New York, USA',
    about: 'Passionate professional with expertise in software development...',
  });

  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resumeData.name}_Resume.pdf`);
  };

  const handleInputChange = (field: keyof ResumeData, value: any) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const addSection = (section: keyof ResumeData, item: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...(prev[section] as any[]), item]
    }));
  };

  const removeSection = (section: keyof ResumeData, index: number) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'experienced'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveTab('experienced')}
              >
                Experienced
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'fresher'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveTab('fresher')}
              >
                Fresher
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <UserCircle className="mr-2" /> Personal Information
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resumeData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={resumeData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={resumeData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={resumeData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="About Me"
                  value={resumeData.about}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={4}
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Globe className="mr-2" /> Social Links
              </h2>
              <div className="space-y-4">
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  value={resumeData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={resumeData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="url"
                  placeholder="Personal Website"
                  value={resumeData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <GraduationCap className="mr-2" /> Education
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => {
                      const newEducation = [...resumeData.education];
                      newEducation[index].institution = e.target.value;
                      handleInputChange('education', newEducation);
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEducation = [...resumeData.education];
                      newEducation[index].degree = e.target.value;
                      handleInputChange('education', newEducation);
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Years"
                      value={edu.years}
                      onChange={(e) => {
                        const newEducation = [...resumeData.education];
                        newEducation[index].years = e.target.value;
                        handleInputChange('education', newEducation);
                      }}
                      className="w-1/2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="GPA"
                      value={edu.gpa}
                      onChange={(e) => {
                        const newEducation = [...resumeData.education];
                        newEducation[index].gpa = e.target.value;
                        handleInputChange('education', newEducation);
                      }}
                      className="w-1/2 p-2 border rounded"
                    />
                  </div>
                  <button
                    onClick={() => removeSection('education', index)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSection('education', {
                  institution: '',
                  degree: '',
                  years: '',
                  gpa: ''
                })}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="mr-1" size={16} /> Add Education
              </button>
            </div>

            {activeTab === 'experienced' && (
              /* Experience Section - Only shown for experienced tab */
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Briefcase className="mr-2" /> Experience
                </h2>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const newExperience = [...resumeData.experience];
                        newExperience[index].company = e.target.value;
                        handleInputChange('experience', newExperience);
                      }}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) => {
                        const newExperience = [...resumeData.experience];
                        newExperience[index].role = e.target.value;
                        handleInputChange('experience', newExperience);
                      }}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) => {
                        const newExperience = [...resumeData.experience];
                        newExperience[index].duration = e.target.value;
                        handleInputChange('experience', newExperience);
                      }}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <textarea
                      placeholder="Description (one per line)"
                      value={exp.description.join('\n')}
                      onChange={(e) => {
                        const newExperience = [...resumeData.experience];
                        newExperience[index].description = e.target.value.split('\n');
                        handleInputChange('experience', newExperience);
                      }}
                      className="w-full p-2 border rounded mb-2"
                      rows={4}
                    />
                    <button
                      onClick={() => removeSection('experience', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addSection('experience', {
                    company: '',
                    role: '',
                    duration: '',
                    description: []
                  })}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Plus className="mr-1" size={16} /> Add Experience
                </button>
              </div>
            )}

            {/* Projects */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Book className="mr-2" /> Projects
              </h2>
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => {
                      const newProjects = [...resumeData.projects];
                      newProjects[index].title = e.target.value;
                      handleInputChange('projects', newProjects);
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = [...resumeData.projects];
                      newProjects[index].description = e.target.value;
                      handleInputChange('projects', newProjects);
                    }}
                    className="w-full p-2 border rounded mb-2"
                    rows={3}
                  />
                  <input
                    type="url"
                    placeholder="Project Link"
                    value={project.link}
                    onChange={(e) => {
                      const newProjects = [...resumeData.projects];
                      newProjects[index].link = e.target.value;
                      handleInputChange('projects', newProjects);
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma-separated)"
                    value={project.technologies.join(', ')}
                    onChange={(e) => {
                      const newProjects = [...resumeData.projects];
                      newProjects[index].technologies = e.target.value.split(',').map(t => t.trim());
                      handleInputChange('projects', newProjects);
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <button
                    onClick={() => removeSection('projects', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSection('projects', {
                  title: '',
                  description: '',
                  link: '',
                  technologies: [],
                  duration: ''
                })}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="mr-1" size={16} /> Add Project
              </button>
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Code className="mr-2" /> Skills
              </h2>
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <input
                    type="text"
                    placeholder="Skill Category"
                    value={skill.category}
                    onChange={(e) => {
                      const newSkills = [...resumeData.skills];
                      newSkills[index].category = e.target.value;
                      handleInputChange('skills', newSkills);
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Skills (comma-separated)"
                    value={skill.items.join(', ')}
                    onChange={(e) => {
                      const newSkills = [...resumeData.skills];
                      newSkills[index].items = e.target.value.split(',').map(s => s.trim());
                      handleInputChange('skills', newSkills);
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={() => removeSection('skills', index)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSection('skills', { category: '', items: [] })}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="mr-1" size={16} /> Add Skill Category
              </button>
            </div>

            {/* Certifications */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="mr-2" /> Certifications
              </h2>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => {
                      const newCerts = [...resumeData.certifications];
                      newCerts[index].name = e.target.value;
                      handleInputChange('certifications', newCerts);
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Issuer"
                    value={cert.issuer}
                    onChange={(e) => {
                      const newCerts = [...resumeData.certifications];
                      newCerts[index].issuer = e.target.value;
                      handleInputChange('certifications', newCerts);
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    value={cert.date}
                    onChange={(e) => {
                      const newCerts = [...resumeData.certifications];
                      newCerts[index].date = e.target.value;
                      handleInputChange('certifications', newCerts);
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="url"
                    placeholder="Certificate Link"
                    value={cert.link}
                    onChange={(e) => {
                      const newCerts = [...resumeData.certifications];
                      newCerts[index].link = e.target.value;
                      handleInputChange('certifications', newCerts);
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={() => removeSection('certifications', index)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSection('certifications', {
                  name: '',
                  issuer: '',
                  date: '',
                  link: ''
                })}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="mr-1" size={16} /> Add Certification
              </button>
            </div>

            {/* Languages */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Languages className="mr-2" /> Languages
              </h2>
              {resumeData.languages.map((lang, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <input
                    type="text"
                    placeholder="Language"
                    value={lang.name}
                    onChange={(e) => {
                      const newLangs = [...resumeData.languages];
                      newLangs[index].name = e.target.value;
                      handleInputChange('languages', newLangs);
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <select
                    value={lang.proficiency}
                    onChange={(e) => {
                      const newLangs = [...resumeData.languages];
                      newLangs[index].proficiency = e.target.value;
                      handleInputChange('languages', newLangs);
                    }}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Proficiency</option>
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                  <button
                    onClick={() => removeSection('languages', index)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSection('languages', { name: '', proficiency: '' })}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="mr-1" size={16} /> Add Language
              </button>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Trophy className="mr-2" /> Achievements
              </h2>
              {resumeData.achievements.map((achievement, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    placeholder="Achievement"
                    value={achievement}
                    onChange={(e) => {
                      const newAchievements = [...resumeData.achievements];
                      newAchievements[index] = e.target.value;
                      handleInputChange('achievements', newAchievements);
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={() => removeSection('achievements', index)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSection('achievements', '')}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="mr-1" size={16} /> Add Achievement
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Resume Preview</h2>
              <button
                onClick={downloadPDF}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <Download className="mr-2" /> Download PDF
              </button>
            </div>

            <div ref={resumeRef} className="p-8 bg-white">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{resumeData.name}</h1>
                <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-600">
                  {resumeData.email && (
                    <div className="flex items-center">
                      <Mail className="mr-1" size={16} />
                      {resumeData.email}
                    </div>
                  )}
                  {resumeData.phone && (
                    <div className="flex items-center">
                      <Phone className="mr-1" size={16} />
                      {resumeData.phone}
                    </div>
                  )}
                  {resumeData.location && (
                    <div className="flex items-center">
                      <Globe className="mr-1" size={16} />
                      {resumeData.location}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  {resumeData.linkedin && (
                    <a href={resumeData.linkedin} className="text-blue-600 hover:underline flex items-center">
                      <Linkedin className="mr-1" size={16} />
                      LinkedIn
                    </a>
                  )}
                  {resumeData.github && (
                    <a href={resumeData.github} className="text-blue-600 hover:underline flex items-center">
                      <Github className="mr-1" size={16} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* About */}
              {resumeData.about && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">About</h2>
                  <p className="text-gray-700">{resumeData.about}</p>
                </section>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Education</h2>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{edu.institution}</h3>
                        <span className="text-gray-600">{edu.years}</span>
                      </div>
                      <p>{edu.degree}</p>
                      {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </section>
              )}

              {/* Experience - Only shown for experienced candidates */}
              {activeTab === 'experienced' && resumeData.experience.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Experience</h2>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{exp.company}</h3>
                        <span className="text-gray-600">{exp.duration}</span>
                      </div>
                      <p className="font-medium">{exp.role}</p>
                       {exp.description.map((desc, i) => (
                        <li key={i} className="text-gray-700 ml-4">{desc}</li>
                      ))}
                    </div>
                  ))}
                </section>
              )}

              {/* Projects */}
              {resumeData.projects.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Projects</h2>
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-gray-700">{project.description}</p>
                      <p className="text-gray-600">Technologies: {project.technologies.join(', ')}</p>
                      {project.link && (
                        <a href={project.link} className="text-blue-600 hover:underline">
                          View Project
                        </a>
                      )}
                    </div>
                  ))}
                </section>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Skills</h2>
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold">{skill.category}</h3>
                      <p className="text-gray-700">{skill.items.join(' • ')}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Certifications */}
              {resumeData.certifications.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Certifications</h2>
                  {resumeData.certifications.map((cert, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{cert.name}</h3>
                        <span className="text-gray-600">{cert.date}</span>
                      </div>
                      <p className="text-gray-700">{cert.issuer}</p>
                      {cert.link && (
                        <a href={cert.link} className="text-blue-600 hover:underline">
                          View Certificate
                        </a>
                      )}
                    </div>
                  ))}
                </section>
              )}

              {/* Languages */}
              {resumeData.languages.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Languages</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {resumeData.languages.map((lang, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{lang.name}</span>
                        <span className="text-gray-600">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Achievements */}
              {resumeData.achievements.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Achievements</h2>
                  <ul className="list-disc list-inside">
                    {resumeData.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-700 mb-2">{achievement}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicResumeBuilder;