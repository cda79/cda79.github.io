const section3 = document.querySelector("#third-section");

// observe the section
// const observer = new IntersectionObserver(
//   (entries) => {
//     console.log(entries);

//     if (entries[0].isIntersecting) {
//       //observe only 1 element
//       // true = element in view -> play animation
//       entries[0].target.classList.add("show");
//     } else {
//       entries[0].target.classList.remove("show");
//     }
//   },
//   {
//     // when the animation should trigger
//     // only when a certain amount of the section is visible - 0.5=half
//     threshold: 0.5,
//   },
// );

// observer.observe(section3);

// observe each image individually
const images = document.querySelectorAll("#third-section .image-container");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // check if each one is intersecting, then add the class
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0, rootMargin: "0px 0px -400px 0px" },
);

images.forEach((img) => observer.observe(img));
