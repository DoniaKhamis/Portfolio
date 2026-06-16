// Scatter circles randomly across the page
function scatterCircles() {
    const circles = document.querySelectorAll('.circle-btn');
    const margin = 100; // Keep circles away from edges
    
    circles.forEach(circle => {
        const randomX = Math.random() * (window.innerWidth - 200 - margin * 2) + margin;
        const randomY = Math.random() * (window.innerHeight - 200 - margin * 2) + margin;
        
        circle.style.left = randomX + 'px';
        circle.style.top = randomY + 'px';
    });
}

// Scatter circles on page load
scatterCircles();

// Scatter circles on window resize
window.addEventListener('resize', scatterCircles);

// Handle circle button clicks
const circleButtons = document.querySelectorAll('.circle-btn');
const mainPage = document.getElementById('main-page');
const detailPage = document.getElementById('detail-page');
const backArrow = document.getElementById('back-arrow');

circleButtons.forEach(button => {
    button.addEventListener('click', function() {
        const label = this.getAttribute('data-label');
        console.log(`${label} clicked!`);
        // Transition to white page
        mainPage.classList.add('hidden');
        detailPage.classList.remove('hidden');
    });
});

// Handle back arrow click
backArrow.addEventListener('click', function() {
    detailPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
});

// Optional: Add keyboard support
circleButtons.forEach((button, index) => {
    button.setAttribute('aria-label', `Button ${index + 1}`);
});
