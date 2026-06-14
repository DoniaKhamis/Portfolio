// 1. Your Engineering Data Array
const journeyData = [
    {
        title: "The Spark & Core Foundations",
        subtitle: "Low-Level Exploration",
        description: "Diving deep into core computer science theory, computer architecture, and understanding exactly how hardware interfaces with software logic.",
        tags: ["Systems", "Architecture", "Algorithms"]
    },
    {
        title: "Distributed Systems & Infrastructure",
        subtitle: "Architecting Solutions",
        description: "Designing multi-tier client-server environments, implementing data synchronization mechanics, and handling robust state management.",
        tags: ["Java", "Concurrency", "Databases"]
    },
    {
        title: "Interactive & Creative Engineering",
        subtitle: "Visualizing Code",
        description: "Blending algorithmic logic with front-end rendering engines to build highly interactive, visual software environments.",
        tags: ["JavaScript", "Canvas", "UI/UX"]
    }
];

// 2. Render the Timeline dynamically onto the screen
const container = document.getElementById('timeline-container');

journeyData.forEach((item, index) => {
    const itemHTML = `
        <div class="timeline-item relative" style="animation-delay: ${index * 0.2}s">
            <span class="timeline-dot absolute -left-[41px] top-1.5 bg-indigo-500 w-4 h-4 rounded-full border-4 border-slate-900"></span>
            
            <div class="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 hover:border-indigo-500/40 transition-colors duration-300">
                <span class="text-xs font-semibold tracking-wider text-indigo-400 uppercase">${item.subtitle}</span>
                <h3 class="text-xl font-bold mt-1 text-slate-100">${item.title}</h3>
                <p class="mt-3 text-slate-400 leading-relaxed text-sm">${item.description}</p>
                
                <div class="mt-4 flex flex-wrap gap-2">
                    ${item.tags.map(tag => `<span class="text-xs bg-slate-700/50 text-slate-300 px-2.5 py-1 rounded-md">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    container.innerHTML += itemHTML;
});

// 3. Simple, Lightweight Canvas Particle Animation for Visual Flair
const canvas = document.getElementById('visual-background');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize random points
for (let i = 0; i < 40; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedY: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.5 + 0.2
    });
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(99, 102, 241, '; // Indigo base
    
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();
        
        // Move upward gently
        p.y -= p.speedY;
        if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
        }
    });
    
    requestAnimationFrame(animate);
}
animate();
