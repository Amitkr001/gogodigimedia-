document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------
    // CUSTOM CURSOR
    // -----------------------------------------
    const cursor = document.getElementById('custom-cursor');
    const cursorFollower = document.getElementById('custom-cursor-follower');

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Slight delay for follower
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });
    }

    // -----------------------------------------
    // LOADING SCREEN
    // -----------------------------------------
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', () => {
        // Add a slight delay for dramatic effect
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                
                // Initialize animations only after loading screen is gone
                initAnimations();
                initVantaBackgrounds();
            }, 800);
        }, 1000);
    });

    // -----------------------------------------
    // SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // -----------------------------------------
    function initAnimations() {
        const scrollElements = document.querySelectorAll('.scroll-anim');
        
        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
        };

        const displayScrollElement = (element) => {
            element.classList.add('visible');
        };

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.1)) {
                    displayScrollElement(el);
                }
            });
        };

        // Trigger once on load
        handleScrollAnimation();
        
        // Trigger on scroll
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
    }

    // -----------------------------------------
    // VANTA.JS BACKGROUNDS
    // -----------------------------------------
    function initVantaBackgrounds() {
        const vantaInstances = {};

        const initVanta = (id, effect, options) => {
            if(window.VANTA && document.getElementById(id)) {
                return VANTA[effect]({
                    el: "#" + id,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    ...options
                });
            }
            return null;
        };

        const vantaConfigs = {
            'features': { effect: 'HALO', options: { backgroundColor: 0x050505, baseColor: 0x00f3ff, color2: 0xff007f, amplitudeFactor: 2.00, xOffset: 0.1, yOffset: 0.1, size: 1.5 } },
            'global-map': { effect: 'GLOBE', options: { backgroundColor: 0x050505, color: 0x00f3ff, color2: 0xff007f, size: 1.2 } },
            'analytics': { effect: 'FOG', options: { highlightColor: 0x00f3ff, midtoneColor: 0xff007f, lowlightColor: 0x110526, baseColor: 0x050505, blurFactor: 0.60, zoom: 0.8 } },
            'distribution-flow': { effect: 'CELLS', options: { color1: 0x00f3ff, color2: 0xff007f, size: 1.5, speed: 1.5 } },
            'royalty-splits': { effect: 'NET', options: { color: 0x00f3ff, backgroundColor: 0x050505, points: 15.00, maxDistance: 25.00, spacing: 20.00 } },
            'marketing': { effect: 'RINGS', options: { backgroundColor: 0x050505, color: 0x00f3ff } },
            'fan-hub': { effect: 'WAVES', options: { color: 0x110526, shininess: 30.00, waveHeight: 15.00, waveSpeed: 0.50, zoom: 0.90 } },
            'label-manager': { effect: 'DOTS', options: { backgroundColor: 0x050505, color: 0x00f3ff, color2: 0xff007f, spacing: 30.00 } }
        };

        // Use Intersection Observer to only run Vanta effects when they are visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                if (entry.isIntersecting) {
                    if (!vantaInstances[id] && vantaConfigs[id]) {
                        try {
                            vantaInstances[id] = initVanta(id, vantaConfigs[id].effect, vantaConfigs[id].options);
                        } catch (e) {
                            console.error('Error initializing Vanta effect for', id, e);
                        }
                    }
                } else {
                    if (vantaInstances[id]) {
                        vantaInstances[id].destroy();
                        vantaInstances[id] = null;
                    }
                }
            });
        }, { threshold: 0.1 });

        // Observe all sections with vanta-bg class
        document.querySelectorAll('.vanta-bg').forEach(section => {
            observer.observe(section);
        });
    }

    // -----------------------------------------
    // NAVBAR SCROLL EFFECT
    // -----------------------------------------
    const navWrapper = document.querySelector('.nav-wrapper');
    if (navWrapper) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navWrapper.classList.add('scrolled');
            } else {
                navWrapper.classList.remove('scrolled');
            }
        });
    }
});
