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

hiddenElements.forEach((item) => observer.observe(item));
