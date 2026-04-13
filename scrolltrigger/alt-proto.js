const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    // threshold: 0.1, // Trigger when 10% is visible
    // rootMargin: "0px 0px -50px 0px",
  },
);

// const lenis = new Lenis({
//   lerp: 0.1,
//   smooth: true,
//   direction: "vertical",
//   wheelMultiplier: 1, // Scroll speed
// });

// // Use requestAnimationFrame to continuously update the scroll
// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

hiddenElements.forEach((item) => observer.observe(item));
