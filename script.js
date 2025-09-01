// Typing effect for terminal
const terminalText = `> Initializing system...
> Running security protocols...
> Access granted...
> Welcome to my portfolio...`;

const typingDelay = 50;
const terminalContent = document.querySelector('.typing-text');

function typeText() {
    let charIndex = 0;
    const textArray = terminalText.split('');
    
    const typing = setInterval(() => {
        if (charIndex < textArray.length) {
            terminalContent.innerHTML += textArray[charIndex];
            charIndex++;
        } else {
            clearInterval(typing);
        }
    }, typingDelay);
}

// Matrix rain effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.initialize();
    }

    initialize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
        
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        this.animate();
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = this.fontSize + 'px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Glitch Effects
function createGlitchEffect(element) {
    const text = element.textContent;
    element.setAttribute('data-text', text);
    
    // Random glitch timing
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance to trigger glitch
            const glitchDuration = Math.random() * 200 + 50; // 50-250ms
            element.style.animation = 'none';
            void element.offsetWidth; // Trigger reflow
            element.style.animation = `glitch-skew ${glitchDuration}ms infinite linear alternate-reverse`;
            
            setTimeout(() => {
                element.style.animation = '';
            }, glitchDuration);
        }
    }, 2000);
}

// Initialize glitch effects for text
document.querySelectorAll('.glitch-text').forEach(createGlitchEffect);

// Enhanced image glitch effect

// Initialize glitch effects for images
document.querySelectorAll('.glitch-image').forEach(createImageGlitch);

// Intensify glitch effects on hover
document.querySelectorAll('.glitch-text, .glitch-image').forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.animationDuration = '0.5s';
        element.style.animationTimingFunction = 'linear';
        element.style.opacity = '0.9';
    });
    
    element.addEventListener('mouseout', () => {
        element.style.animationDuration = '';
        element.style.animationTimingFunction = '';
        element.style.opacity = '';
    });
});

// Glitch effect on hover
const glitchElements = document.querySelectorAll('.glitch-effect');

glitchElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.animation = 'glitch 0.3s infinite';
    });
    
    element.addEventListener('mouseout', () => {
        element.style.animation = 'none';
    });
});

// Theme Toggle Functionality


function updateGlitchEffects(theme) {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    const glitchImages = document.querySelectorAll('.glitch-image');
    
    // Update text glitch effects
    glitchTexts.forEach(element => {
        element.style.animation = 'none';
        void element.offsetWidth; // Trigger reflow
        element.style.animation = '';
    });
    
    // Update image glitch effects
    glitchImages.forEach(element => {
        element.style.animation = 'none';
        void element.offsetWidth; // Trigger reflow
        element.style.animation = '';
    });
}

// Form handling --------------------------------------------------------------------------
// const contactForm = document.getElementById('contact-form');
// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     // Add your form submission logic here
//     const formData = {
       
//     };
    
//     // Simulated form submission
//     console.log('Form submitted:', formData);
//     alert('URL sent successfully!');
//     contactForm.reset();
// });

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    typeText();
    new MatrixRain();
    
    // Reveal animations for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });
});

// Particle effect background
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00ff00'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff00',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Matrix Rain Effect


// Typing Effect
class TypingEffect {
    constructor(element, words, waitTime = 3000) {
        this.element = element;
        this.words = words;
        this.waitTime = waitTime;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = false;
        this.isDeleting = false;
        
        this.type();
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if(this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.innerHTML = `<span class="txt">${this.txt}</span>`;
        
        let typeSpeed = 50;
        
        if(this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if(!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.waitTime;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        
        const updateCount = () => {
            if(current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                setTimeout(updateCount, 10);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain
    const matrix = new MatrixRain();
    matrix.draw();
    
    // Initialize Typing Effect
    const typedTextElement = document.querySelector('.typed-text');
    const words = [
        'Ethical Hacker',
        'Security Researcher',
        'Bug Hunter',
        'Penetration Tester'
    ];
    new TypingEffect(typedTextElement, words);
    
    // Animate Stats
    animateStats();
    
    // Theme Toggle (existing code)
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('light-theme');
            const theme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });
    }
    
});

// Terminal Simulation
class TerminalSimulation {
    constructor() {
        this.lines = [
            'Initializing system...',
            'Loading security protocols...',
            'Scanning for vulnerabilities...',
            'Access granted. Welcome back.',
        ];
        this.currentLine = 0;
        this.terminal = document.querySelector('.terminal-body');
        this.simulate();
    }
    
    async simulate() {
        for(const line of this.lines) {
            await this.typeLine(line);
            await this.wait(1000);
        }
    }
    
    async typeLine(text) {
        const lineElement = document.createElement('div');
        lineElement.classList.add('line');
        this.terminal.appendChild(lineElement);
        
        for(const char of text) {
            lineElement.textContent += char;
            await this.wait(50);
        }
    }
    
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize Terminal Simulation
new TerminalSimulation();

// Initialize skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-line span');
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.setProperty('--percent', percent + '%');
    });
}

// Animate elements when they come into view
function initIntersectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
        item.classList.add('fade-in-up');
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
        card.classList.add('fade-in-up');
    });

    // Observe tech items
    document.querySelectorAll('.tech-item').forEach(item => {
        observer.observe(item);
        item.classList.add('fade-in-right');
    });
}

// Code window typing effect
class CodeTypingEffect {
    constructor(element) {
        this.element = element;
        this.text = element.textContent;
        this.element.textContent = '';
        this.currentChar = 0;
        this.type();
    }

    type() {
        if (this.currentChar < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentChar);
            this.currentChar++;
            setTimeout(() => this.type(), 50);
        }
    }
}

// Form validation and submission
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Simulate encryption animation
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        submitBtn.disabled = true;
        btnText.textContent = 'Encrypting...';
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        btnText.textContent = 'Transmitting...';
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        btnText.textContent = 'Message Sent!';
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Reset form
        form.reset();
        submitBtn.disabled = false;
        btnText.textContent = originalText;
    });
}

// Add glitch effect to project cards on hover
function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.classList.add('glitch');
        });
        
        card.addEventListener('mouseout', () => {
            card.classList.remove('glitch');
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain (existing code)
    const matrix = new MatrixRain();
    matrix.draw();
    
    // Initialize Typing Effect (existing code)
    const typedTextElement = document.querySelector('.typed-text');
    const words = [
        'Ethical Hacker',
        'Security Researcher',
        'Bug Hunter',
        'Penetration Tester'
    ];
    new TypingEffect(typedTextElement, words);
    
    // Initialize Terminal Simulation (existing code)
    new TerminalSimulation();
    
    // Initialize new features
    initSkillBars();
    initIntersectionObserver();
    initContactForm();
    initProjectCards();
    enableTechSelection();
    
    // Initialize code window typing effect
    const codeContent = document.querySelector('.code-content code');
    if (codeContent) {
        new CodeTypingEffect(codeContent);
    }
});
function enableTechSelection() {
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove "selected" from all items
            techItems.forEach(i => i.classList.remove('selected'));

            // Add "selected" to clicked item
            item.classList.add('selected');

            // Get selected value
            const selectedTech = item.dataset.tech;
            console.log('Selected website:', selectedTech);
        });
    });
}

// Create glitch particles
function createGlitchParticles() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'glitch-particle';
            
            // Random position
            const x = Math.random() * section.offsetWidth;
            const y = Math.random() * section.offsetHeight;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Random movement
            const moveX = (Math.random() - 0.5) * 200;
            const moveY = (Math.random() - 0.5) * 200;
            particle.style.setProperty('--x', `${moveX}px`);
            particle.style.setProperty('--y', `${moveY}px`);
            
            section.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }, 100);
    });
}

// Add RGB split effect on scroll
function addRGBSplitEffect() {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const intensity = Math.min(Math.abs(lastScrollY) / 500, 20);
                document.documentElement.style.setProperty('--rgb-split', `${intensity}px`);
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Add glitch on hover for all interactive elements
function addGlitchOnHover() {
    const elements = document.querySelectorAll('.project-card, .skill-item, .contact-info');
    
    elements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = 'crazyGlitch 0.3s infinite';
        });
        
        element.addEventListener('mouseout', () => {
            element.style.animation = 'none';
        });
    });
}

// Initialize all crazy effects
document.addEventListener('DOMContentLoaded', () => {
    // Existing initializations
    typeText();
    new MatrixRain();
    
    // Reveal animations for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });
    
    // New crazy effects
    createGlitchParticles();
    addRGBSplitEffect();
    addGlitchOnHover();
});

// Add these CSS classes
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-right {
        opacity: 0;
        transform: translateX(-20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate {
        opacity: 1;
        transform: translate(0);
    }
    
    .glitch {
        animation: glitch-effect 0.3s infinite;
    }
    
    @keyframes glitch-effect {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(-2px, -2px);
        }
        60% {
            transform: translate(2px, 2px);
        }
        80% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0);
        }
    }
`;
document.head.appendChild(style);
