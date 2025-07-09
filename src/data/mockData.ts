
export interface Course {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  shortDescription: string;
  longDescription: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  skills: string[];
  language: string;
  lastUpdated: string;
  students: number;
  certificate: boolean;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete English Conversation with Native Americans',
    price: 899000,
    originalPrice: 1299000,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    shortDescription: 'Master English conversation skills with certified American teachers through interactive lessons.',
    longDescription: 'This comprehensive course is designed to help you achieve fluency in English conversation with native American speakers. You\'ll learn authentic pronunciation, natural expressions, and cultural nuances that will make you sound like a native speaker. The course includes 1-on-1 sessions with certified American instructors, group practice sessions, and real-world conversation scenarios.',
    instructor: 'Sarah Johnson',
    rating: 4.9,
    reviewCount: 2847,
    duration: '12 weeks',
    level: 'Intermediate',
    category: 'Language Learning',
    skills: ['Conversation', 'Pronunciation', 'Grammar', 'Listening'],
    language: 'English',
    lastUpdated: '2024-01-15',
    students: 15420,
    certificate: true
  },
  {
    id: '2',
    title: 'React & TypeScript - Complete Developer Course',
    price: 1299000,
    originalPrice: 1899000,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    shortDescription: 'Build modern web applications with React, TypeScript, and industry best practices.',
    longDescription: 'Learn to build scalable, type-safe React applications from scratch. This course covers everything from basic React concepts to advanced patterns, state management with Redux Toolkit, testing, and deployment. You\'ll work on real-world projects and learn industry best practices used by top tech companies.',
    instructor: 'Alex Chen',
    rating: 4.8,
    reviewCount: 1923,
    duration: '16 weeks',
    level: 'Intermediate',
    category: 'Programming',
    skills: ['React', 'TypeScript', 'Redux', 'Testing', 'Deployment'],
    language: 'Vietnamese',
    lastUpdated: '2024-01-10',
    students: 8934,
    certificate: true
  },
  {
    id: '3',
    title: 'Digital Marketing Mastery 2024',
    price: 799000,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    shortDescription: 'Complete digital marketing course covering SEO, social media, PPC, and analytics.',
    longDescription: 'Master all aspects of digital marketing in this comprehensive course. Learn SEO optimization, social media marketing, Google Ads, Facebook advertising, email marketing, content strategy, and analytics. This course is perfect for beginners and includes hands-on projects with real businesses.',
    instructor: 'Maria Rodriguez',
    rating: 4.7,
    reviewCount: 3156,
    duration: '10 weeks',
    level: 'Beginner',
    category: 'Marketing',
    skills: ['SEO', 'Social Media', 'PPC', 'Analytics', 'Content Marketing'],
    language: 'English',
    lastUpdated: '2024-01-20',
    students: 12678,
    certificate: true
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    price: 1099000,
    originalPrice: 1499000,
    image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=300&fit=crop',
    shortDescription: 'Learn design thinking, user research, prototyping, and create stunning user interfaces.',
    longDescription: 'Become a professional UI/UX designer with this hands-on course. Learn design thinking methodology, conduct user research, create wireframes and prototypes, and design beautiful user interfaces. Master tools like Figma, Adobe XD, and Sketch while working on real client projects.',
    instructor: 'David Kim',
    rating: 4.9,
    reviewCount: 1654,
    duration: '14 weeks',
    level: 'Beginner',
    category: 'Design',
    skills: ['Design Thinking', 'User Research', 'Prototyping', 'Figma', 'User Testing'],
    language: 'Vietnamese',
    lastUpdated: '2024-01-12',
    students: 7832,
    certificate: true
  },
  {
    id: '5',
    title: 'Python Data Science & Machine Learning',
    price: 1599000,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
    shortDescription: 'Master data science and machine learning with Python, pandas, scikit-learn, and TensorFlow.',
    longDescription: 'Dive deep into data science and machine learning using Python. Learn data analysis with pandas, visualization with matplotlib and seaborn, machine learning with scikit-learn, and deep learning with TensorFlow. This course includes real-world projects and prepares you for a career in data science.',
    instructor: 'Dr. Jennifer Wang',
    rating: 4.8,
    reviewCount: 2341,
    duration: '20 weeks',
    level: 'Advanced',
    category: 'Data Science',
    skills: ['Python', 'Pandas', 'Machine Learning', 'TensorFlow', 'Data Visualization'],
    language: 'English',
    lastUpdated: '2024-01-08',
    students: 6543,
    certificate: true
  },
  {
    id: '6',
    title: 'Japanese Language for Beginners - JLPT N5',
    price: 699000,
    originalPrice: 999000,
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop',
    shortDescription: 'Learn Japanese from scratch and prepare for JLPT N5 certification with native speakers.',
    longDescription: 'Start your Japanese learning journey with this comprehensive beginner course. Learn hiragana, katakana, basic kanji, essential grammar, and everyday conversations. This course is designed to prepare you for the JLPT N5 exam and includes practice with native Japanese speakers.',
    instructor: 'Tanaka Hiroshi',
    rating: 4.6,
    reviewCount: 1876,
    duration: '16 weeks',
    level: 'Beginner',
    category: 'Language Learning',
    skills: ['Hiragana', 'Katakana', 'Basic Kanji', 'Grammar', 'Conversation'],
    language: 'Vietnamese',
    lastUpdated: '2024-01-18',
    students: 9876,
    certificate: true
  },
  {
    id: '7',
    title: 'Photography Masterclass - From Beginner to Pro',
    price: 899000,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
    shortDescription: 'Master photography techniques, composition, lighting, and post-processing with Adobe Lightroom.',
    longDescription: 'Transform your photography skills from beginner to professional level. Learn camera fundamentals, composition techniques, lighting mastery, portrait photography, landscape photography, and advanced post-processing with Adobe Lightroom and Photoshop. Includes hands-on assignments and portfolio development.',
    instructor: 'Michael Thompson',
    rating: 4.7,
    reviewCount: 2198,
    duration: '12 weeks',
    level: 'Beginner',
    category: 'Creative Arts',
    skills: ['Camera Basics', 'Composition', 'Lighting', 'Lightroom', 'Portfolio'],
    language: 'English',
    lastUpdated: '2024-01-14',
    students: 11234,
    certificate: true
  },
  {
    id: '8',
    title: 'Business Analysis & Project Management',
    price: 1199000,
    originalPrice: 1699000,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    shortDescription: 'Learn business analysis, project management methodologies, and prepare for PMP certification.',
    longDescription: 'Become a skilled business analyst and project manager with this comprehensive course. Learn requirements gathering, process improvement, Agile and Scrum methodologies, risk management, and stakeholder communication. This course prepares you for PMP and other professional certifications.',
    instructor: 'Linda Parker',
    rating: 4.8,
    reviewCount: 1432,
    duration: '18 weeks',
    level: 'Intermediate',
    category: 'Business',
    skills: ['Business Analysis', 'Project Management', 'Agile', 'Scrum', 'Risk Management'],
    language: 'Vietnamese',
    lastUpdated: '2024-01-16',
    students: 5678,
    certificate: true
  }
];

export const mockSuggestions = {
  "user123": [
    mockCourses[0], // English course
    mockCourses[3], // UI/UX Design
    mockCourses[6]  // Photography
  ],
  "user456": [
    mockCourses[1], // React TypeScript
    mockCourses[4], // Data Science
    mockCourses[7]  // Business Analysis
  ]
};

export const priceRanges = [
  { label: 'Tất cả giá', min: 0, max: Infinity },
  { label: 'Dưới 500K', min: 0, max: 500000 },
  { label: '500K - 1 triệu', min: 500000, max: 1000000 },
  { label: '1 - 1.5 triệu', min: 1000000, max: 1500000 },
  { label: 'Trên 1.5 triệu', min: 1500000, max: Infinity }
];

export const categories = [
  'Tất cả',
  'Language Learning',
  'Programming',
  'Marketing',
  'Design',
  'Data Science',
  'Creative Arts',
  'Business'
];
