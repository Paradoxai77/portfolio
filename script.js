document.addEventListener('DOMContentLoaded', () => {
	// 0. Preloader Logic
	const preloader = document.getElementById('preloader');
	if (preloader) {
		setTimeout(() => {
			preloader.classList.add('fade-out');
			setTimeout(() => {
				preloader.style.display = 'none';
			}, 500);
		}, 2000); // the loading bar takes 2s to complete
	}

	// 1. Typing Effect for Hero
	const words = ["Web Developer.", "AI Explorer.", "Problem Solver.", "AR/VR Enthusiast."];
	let i = 0;
	let j = 0;
	let currentWord = "";
	let isDeleting = false;
	const typingElement = document.querySelector(".typing-text");

	function type() {
		currentWord = words[i];
		if (isDeleting) {
			typingElement.textContent = currentWord.substring(0, j - 1);
			j--;
			if (j === 0) {
				isDeleting = false;
				i = (i + 1) % words.length;
			}
		} else {
			typingElement.textContent = currentWord.substring(0, j + 1);
			j++;
			if (j === currentWord.length) {
				isDeleting = true;
				setTimeout(type, 2000); // Pause at end of word
				return;
			}
		}
		const speed = isDeleting ? 50 : 150;
		setTimeout(type, speed);
	}

	if (typingElement) type();

	// 2. Simple Scroll Reveal (AOS-like)
	const observerOptions = {
		threshold: 0.1
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('aos-animate');
			}
		});
	}, observerOptions);

	document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

	// 3. Smooth Scrolling for internal Nav Links (only if href starts with #)
	document.querySelectorAll('nav a').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href.startsWith('#')) {
				e.preventDefault();
				const targetSector = document.querySelector(href);
				if (targetSector) {
					window.scrollTo({
						top: targetSector.offsetTop - 80,
						behavior: 'smooth'
					});
				}
			}
		});
	});

	// 4. Contact Form Interaction
	const form = document.getElementById('contactForm');
	if (form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const btn = form.querySelector('button');
			const originalText = btn.textContent;
			btn.textContent = "DECRYPTING_REQUEST...";
			btn.disabled = true;

			setTimeout(() => {
				btn.textContent = "SUCCESS: MESSAGE_RELAYED";
				btn.style.background = "#27c93f";
				form.reset();
				setTimeout(() => {
					btn.textContent = originalText;
					btn.disabled = false;
					btn.style.background = "";
				}, 3000);
			}, 2000);
		});
	}

	// 5. Active Nav Highlight on Scroll
	window.addEventListener('scroll', () => {
		let current = "";
		const sections = document.querySelectorAll('section');
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			if (pageYOffset >= sectionTop - 100) {
				current = section.getAttribute('id');
			}
		});

		document.querySelectorAll('nav a').forEach(a => {
			a.classList.remove('active');
			if (a.getAttribute('href') === `#${current}`) {
				a.classList.add('active');
			}
		});
	});

	// 6. Rotating Eyes Logic
	const eyes = document.querySelectorAll('.eye');
	
	window.addEventListener('mousemove', (e) => {
		eyes.forEach(eye => {
			const pupil = eye.querySelector('.pupil');
			const rect = eye.getBoundingClientRect();
			
			// Center of the eye
			const eyeX = rect.left + rect.width / 2;
			const eyeY = rect.top + rect.height / 2;
			
			// Angle between mouse and eye center
			const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
			
			// Max distance the pupil can move from center
			const distance = Math.min(rect.width / 4, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 10);
			
			// Calculate pupil position
			const moveX = Math.cos(angle) * distance;
			const moveY = Math.sin(angle) * distance;
			
			pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
		});
	});
});
