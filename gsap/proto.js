document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // --- Smoothscrolling setup ---
  const lenis = new Lenis();
  // keep scrolltrigger in sync with lenis
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Tell ScrollTrigger to use Lenis's scroll position instead of the native one
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length
        ? lenis.scrollTo(value, { immediate: true })
        : lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  // --- GSAP cards setup ---
  // all elements w class name card
  const cards = gsap.utils.toArray(".card");
  // set first card aside as intro card
  const introCard = cards[0];
  // Animating the card images
  const cardImgWrapper = introCard.querySelector(".card-img");
  const cardImg = introCard.querySelector(".card-img img");
  // first scale wrapper down and add border radius
  gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px" });
  // scale image up so it looks like we're zoomed in
  gsap.set(cardImg, { scale: 1.5 });

  // H1 card setup, animate each letter. Wrap each letter in a <char> and then <span>
  const titles = gsap.utils.toArray(".card-title h1");
  titles.forEach((title) => {
    const split = new SplitText(title, {
      type: "chars",
      charsClass: "char",
      tag: "div",
    });
    split.chars.forEach((char) => {
      char.innerHTML = `<span>${char.textContent}</span>`;
    });
  });

  const titleChars = gsap.utils.toArray(".char span");
  const description = introCard.querySelector(".card-description");
  console.log("IntroCard:", introCard);
  console.log("Found Chars:", description);

  // utility functions -> show / hide content
  // animate on show
  function animateContentIn(titleChars, description) {
    // Animate letters with a stagger
    gsap.to(titleChars, {
      x: "0%",
      duration: 0.8,
      stagger: 0.02,
      ease: "power4.out",
    });

    // Animate description: Move X AND Fade IN
    gsap.to(description, {
      x: 0,
      opacity: 1, // Added this
      duration: 0.8,
      ease: "power4.out",
      delay: 0.2, // Small delay so it follows the title
    });
  }

  // animate on hide
  function animateContentOut(titleChars, description) {
    gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.in" });

    gsap.to(description, {
      x: "40px",
      opacity: 0, // Added this
      duration: 0.5,
      ease: "power4.in",
    });
  }

  if (titleChars.length > 0) {
    gsap.set(titleChars, { x: "100%" }); //slide out
  }
  if (description) {
    gsap.set(description, { x: 40, opacity: 0 }); // Hide description initially
  }

  ScrollTrigger.create({
    trigger: introCard,
    start: "top top",
    // 3x vh to play out full animation
    end: "+=200vh",
    // updates continuously
    pin: true,
    pinSpacing: true, // Ensure this is true to push other content down
    // pinType: "transform",
    onUpdate: (self) => {
      // progressbar that goes from 0-1
      const progress = self.progress;
      const imgScale = 0.5 + progress * 0.5;
      const borderRadius = 400 - progress * 375;
      const innerImgScale = 1.5 - progress * 0.5;

      gsap.set(cardImgWrapper, {
        scale: imgScale,
        borderRadius: borderRadius + "px",
      });
      // flatten image out as scroll out
      gsap.set(cardImg, { scale: innerImgScale });

      // when we fully reveal the content, animate it in/out
      if (progress > 0.98 && !introCard.contentRevealed) {
        introCard.contentRevealed = true;
        animateContentIn(titleChars, description);
      }
      if (progress <= 0.98 && introCard.contentRevealed) {
        introCard.contentRevealed = false;
        animateContentOut(titleChars, description);
      }
    },
  });

  ScrollTrigger.refresh();
  // cardImg.forEach((card, index) => {
  //   const isLastCard = index == cards.length - 1;
  //   ScrollTrigger.create({
  //     trigger: card,
  //     start: "top top",
  //     end: isLastCard ? "+=100vh" : "top top",
  //     endTrigger: isLastCard ? null : cards[card.length - 1],
  //     pin: true,
  //     pinSpacing: isLastCard,
  //   });
  // });
});
