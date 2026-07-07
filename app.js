// Handle circle button clicks
const circleButtons = document.querySelectorAll('.circle-btn');
const mainPage = document.getElementById('main-page');
const detailPage = document.getElementById('detail-page');
const backArrow = document.getElementById('back-arrow');

// Target the container inside your detail page where the project will live
const projectContainer = document.getElementById('project-frame-container'); 

circleButtons.forEach(button => {
    button.addEventListener('click', function() {
        const label = this.getAttribute('data-label');
        console.log(`${label} clicked!`);
        
        // 1. Map the button data-labels to your relative project paths with web slashes
        let projectPath = '';
        if (label === 'Wormhole') {
            projectPath = './freeCodeCamp/three.js-sketches/flying-through-a-wormhole/index.html';
        } else if (label === '3D Earth') {
            projectPath = './freeCodeCamp/three.js-sketches/threejs-earth-update-2024/index.html'; 
        } else if (label === 'Circle 3') {
            projectPath = './freeCodeCamp/three.js-sketches/getting-started-with-threejs-main/index.html';
        }
        
        // 2. Inject the project page into the detail container via an iframe
        if (projectPath && projectContainer) {
            projectContainer.innerHTML = `
                <iframe src="${projectPath}" 
                        class="w-full h-[80vh] border-none rounded-lg shadow-inner" 
                        title="${label} Simulation">
                </iframe>`;
        }

        // Transition views smoothly
        mainPage.classList.add('hidden');
        detailPage.classList.remove('hidden');
    });
});

// Handle back arrow click
backArrow.addEventListener('click', function() {
    // Clear the iframe when leaving so Three.js GPU rendering loop stops!
    if (projectContainer) {
        projectContainer.innerHTML = ''; 
    }
    
    detailPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
});

// Set up descriptive accessibility labels
circleButtons.forEach((button, index) => {
    const label = button.getAttribute('data-label') || `Project ${index + 1}`;
    button.setAttribute('aria-label', `View details for ${label}`);
});