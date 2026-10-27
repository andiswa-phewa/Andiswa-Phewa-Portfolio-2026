const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('is-ready');

  const menuButton = $('.menu-toggle');
  const nav = $('.site-nav');
  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    $$('.site-nav a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('in-view'));
  }

  $$('[data-back-to-top]').forEach(button => {
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  const form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();
      const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'website visitor'}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:andiswa0310@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  initProjectPortfolio();
});

const projectData = {
  cyber: {
    type: 'Software development',
    title: 'Cybersecurity Awareness Chatbot',
    description: 'A C# cybersecurity awareness application that progressed from console interaction to a Windows Forms interface. The implementation focuses on conversational guidance, user interaction and core C# concepts.',
    features: [
      'Cybersecurity awareness responses',
      'Password, phishing and safe browsing guidance',
      'Keyword recognition and fallback handling',
      'Randomised responses and conversation flow',
      'Memory and recall',
      'Sentiment handling',
      'Audio greeting and graphical interface',
      'Collections, delegates, events and lambda expressions'
    ],
    tech: ['C#', '.NET', 'Windows Forms', 'Visual Studio', 'Git and GitHub']
  },
  raceday: {
    type: 'API and database development',
    title: 'RaceDay Event Management Platform',
    description: 'A structured ASP.NET Core REST API for event registration and race management. The system models users, roles, events, categories, enrolments and results through a relational design.',
    features: [
      'User registration and login architecture',
      'Roles and user profiles',
      'Event and category management',
      'Participant enrolments and race results',
      'DTOs and validation',
      'GET, POST, PUT and DELETE endpoints',
      'Relational database modelling',
      'Swagger and OpenAPI testing'
    ],
    tech: ['C#', 'ASP.NET Core', 'REST API', 'SQL Server', 'JSON', 'Visual Studio', 'GitHub']
  },
  login: {
    type: 'Java programming',
    title: 'Java Registration and Login System',
    description: 'A console-based Java implementation focused on registration, authentication, input rules, regular expressions and unit testing.',
    features: [
      'User registration',
      'Username validation',
      'Password complexity validation',
      'South African cellphone number validation',
      'Login authentication',
      'Personalised login messages',
      'Input validation',
      'JUnit testing'
    ],
    tech: ['Java', 'NetBeans', 'Maven', 'JUnit', 'Regular expressions']
  },
  lab: {
    type: 'Java programming',
    title: 'Java Laboratory Booking Data Analysis',
    description: 'A compact Java data-processing implementation that uses one-dimensional and two-dimensional arrays to calculate and compare booking information.',
    features: ['One-dimensional arrays', 'Two-dimensional arrays', 'Nested loops', 'Totals and averages', 'Minimum and maximum values', 'Structured console output'],
    tech: ['Java', 'NetBeans']
  },
  medicare: {
    type: 'Object-oriented programming',
    title: 'Medicare Patient Management System',
    description: 'An inheritance-based Java model that separates shared patient behaviour from specialised inpatient, outpatient and emergency patient requirements.',
    features: ['Patient superclass', 'Inpatient, Outpatient and Emergency Patient subclasses', 'Encapsulation', 'Constructors', 'Final and mutable fields', 'Ward and bed allocation', 'Object-oriented design', 'Unit testing'],
    tech: ['Java', 'Object-oriented programming', 'JUnit', 'NetBeans']
  },
  support: {
    type: 'Web application development',
    title: 'Support Ticket Management Application',
    description: 'An ASP.NET Core MVC application for capturing structured support requests and demonstrating the relationship between models, views and controllers.',
    features: ['Support ticket creation', 'Form submission', 'Models, views and controllers', 'Input validation', 'Confirmation flow', 'Structured MVC architecture'],
    tech: ['C#', 'ASP.NET Core MVC', 'Bootstrap', 'Visual Studio']
  },
  dealership: {
    type: 'Web and database development',
    title: 'Vehicle Dealership Web and Database System',
    description: 'A relational web system built around vehicle, customer and sales information with database design and server-side integration.',
    features: ['Vehicle records', 'Customer records', 'Sales data', 'Relational database design', 'ERD development', 'Primary and foreign keys', 'CRUD operations', 'Database queries'],
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'MariaDB', 'XAMPP', 'phpMyAdmin']
  },
  claims: {
    type: 'C# application development',
    title: 'Contract Lecturer Claim Preview System',
    description: 'A C# implementation for capturing lecturer claim information and calculating preview totals while demonstrating selected advanced language concepts.',
    features: ['Claim entry', 'Module codes', 'Hours worked', 'Hourly rate', 'Calculated totals', 'Operator overloading', 'Extension methods', 'Anonymous objects', 'Text file output'],
    tech: ['C#', '.NET', 'Visual Studio']
  },
  ticketapi: {
    type: 'REST API development',
    title: 'Ticket Management REST API',
    description: 'A RESTful ASP.NET Core Web API for managing ticket resources and practising resource-oriented controller design.',
    features: ['RESTful resources', 'Controllers', 'GET endpoints', 'POST endpoints', 'PUT endpoints', 'DELETE endpoints', 'JSON responses', 'HTTPS and API testing'],
    tech: ['C#', 'ASP.NET Core Web API', 'JSON', 'Swagger', 'OpenAPI']
  },
  testing: {
    type: 'Software quality and testing',
    title: 'Software Quality Assurance and Testing Portfolio',
    description: 'A practical testing portfolio focused on planning, documenting and evaluating software behaviour against requirements.',
    features: ['Test case design', 'Functional testing', 'Unit testing', 'Integration and system testing', 'User acceptance testing concepts', 'Expected versus actual results', 'Defect identification and reporting', 'Requirements traceability', 'Website and form testing', 'Quality documentation'],
    tech: ['Software quality assurance', 'JUnit', 'Test documentation', 'Functional testing', 'Statistical Process Control concepts']
  }
};

function initProjectPortfolio() {
  const grid = $('#project-grid');
  if (!grid) return;

  const cards = $$('.project-card', grid);
  const filters = $$('.filter');
  const count = $('#project-count');
  const modal = $('#project-modal');

  const refreshCount = () => {
    if (!count) return;
    const visible = cards.filter(card => !card.hidden).length;
    count.textContent = `${visible} project${visible === 1 ? '' : 's'} shown`;
  };

  filters.forEach(button => {
    button.addEventListener('click', () => {
      filters.forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      cards.forEach(card => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
      refreshCount();
    });
  });
  refreshCount();

  if (!modal) return;
  const title = $('#modal-title', modal);
  const kicker = $('#modal-kicker', modal);
  const description = $('#modal-description', modal);
  const features = $('#modal-features', modal);
  const tech = $('#modal-tech', modal);
  const close = $('.modal-close', modal);

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const data = projectData[card.dataset.project];
      if (!data) return;
      kicker.textContent = data.type;
      title.textContent = data.title;
      description.textContent = data.description;
      features.innerHTML = data.features.map(item => `<li>${escapeHtml(item)}</li>`).join('');
      tech.innerHTML = data.tech.map(item => `<li>${escapeHtml(item)}</li>`).join('');
      modal.showModal();
    });
  });

  close?.addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => {
    const rect = modal.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) modal.close();
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}
