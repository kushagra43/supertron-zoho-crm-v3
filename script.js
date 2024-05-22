document.querySelector("#myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect form data
  let formData = new FormData(this);

  const email = formData.get("email");
  if (email.endsWith("@qu.edu.qa")) {
    // Show error message
    document.querySelector("#emailError").innerHTML =
      "Sorry, submissions from this domain are not allowed.";
    document.querySelector("#emailError").style.color = "red";
    document.querySelector("#emailError").style.display = "block";
    return;
  }

  const number = formData.get("mobilephone");

  var expr = /^(0|91)?[6-9][0-9]{9}$/;
  if (!expr.test(number)) {
    document.querySelector("#mobileError").innerHTML =
      "Please enter a valid 10 digit mobile number";
    document.querySelector("#mobileError").style.color = "red";
    document.querySelector("#mobileError").style.display = "block";
    return;
  }

  // Send post request to the server
  fetch(
    "https://forms.hubspot.com/uploads/form/v2/23736002/688d8b8a-37c8-4bf1-bd94-9e2e31d4c0d8",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        // Show success message
        document.querySelector("#thankYou").innerHTML =
          "Thank you for submitting the form!";
        document.querySelector("#thankYou").style.color = "green";
        document.querySelector("#thankYou").style.display = "block";
      } else {
        // Show error message
        document.querySelector("#thankYou").innerHTML =
          "An error occurred while submitting the form. Please try again later.";
        document.querySelector("#thankYou").style.color = "red";
        document.querySelector("#thankYou").style.display = "block";
      }

      // Remove form
      this.remove();
    })
    .catch((error) => {
      console.error(error);
      // Show error message
      document.querySelector("#thankYou").innerHTML =
        "Something went wrong, please try again later.";
      document.querySelector("#thankYou").style.color = "red";
      document.querySelector("#thankYou").style.display = "block";
      // Remove form
      this.remove();
    });
});

// Slider Movements
const moveSliderToLeft = () => {
  const scrollableElement = document.querySelector("#sliderCont");

  const screenWidth = window.innerWidth;
  const scrollAmount = screenWidth < 760 ? 280 : 520;

  scrollableElement.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
};

const moveSliderToRight = () => {
  const scrollableElement = document.querySelector("#sliderCont");

  const screenWidth = window.innerWidth;
  const scrollAmount = screenWidth < 760 ? -280 : -520;

  scrollableElement.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
};

// Slider Movements
const moveSliderToLeft2 = () => {
  console.log("hi2");

  const scrollableElement = document.querySelector("#gridSlider");
  console.log(scrollableElement);

  const screenWidth = window.innerWidth;
  const scrollAmount = 400;

  scrollableElement.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
};

const moveSliderToRight2 = () => {
  console.log("hi1");
  const scrollableElement = document.querySelector("#gridSlider");
  console.log(scrollableElement);

  const screenWidth = window.innerWidth;
  const scrollAmount = -400;

  scrollableElement.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
};

const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const indicators = document.querySelectorAll(".indicator");

let currentSlide = 0;

const slidesContent = [
  {
    left: "Blue Star's sales teams now enjoy a better grip on their day-to-day activities.",
    right:
      "“Zoho CRM helps us bring our organisation together—pieces fragmented across emails, notebooks and different applications are now centralised. Zoho CRM is a game changer for us and for Indian businesses of the digital era.” ",
    author: "Suresh Iyer,",
    post: " CIO, Blue Star Limited",
    src: "/zoho-new/bluestar.png",
  },
  {
    left: "India’s largest online Investment Platform Increases Productivity 5X by Implementing Zoho CRM",
    right:
      "“As a CRM manager, I can plug myself in directly to the sales team and make sure they never slip out of deals, with the help of working tips provided by Zia. In addition, Zoho Support is amazing. They have assisted me any time I needed help.”",
    author: "Divya Sundaraju,",
    post: " Assistant manager - Learning & Development, FundsIndia",
    src: "/zoho-new/fundsindia.svg",
  },
  {
    left: "A CRM deployment of this magnitude would normally require 18 to 24 months.",
    right:
      "“The launch of Zoho CRM is one of TAFE’s significant initiatives to drive digital transformation and growth. The solution with Zoho is very innovative and truly digital. There was a complete re-engineering of processes done for simplification, and Zoho team completed this project in an astounding six month.” ",
    author: "Shobhana Ravi,",
    post: " Chief IT, Innovation and Learning Officer, TAFE",
    src: "/zoho-new/tafe.png",
  },
  {
    left: "Agappe Diagnostics achieves complete digital business transformation with Zoho CRM",
    right:
      " “Zoho CRM offers us technology that allows us to be more proactive and insight-driven, with all information in a single place. With our complete business under control, our productivity is up by 80% in the last year that we have been using Zoho.” ",
    author: "Thomas John,",
    post: " Managing Director, Agappe",
    src: "/zoho-new/agappe.svg",
  },
];

const leftSlide = document.getElementById("left-slide");
const rightSlide = document.getElementById("right-slide");

function updateSlide(index) {
  document.getElementById("left-paragraph").innerText =
    slidesContent[index].left;
  document.getElementById("right-paragraph").innerText =
    slidesContent[index].right;
  document.getElementById("right-author").innerText =
    slidesContent[index].author;
  document.getElementById("right-author-post").innerText =
    slidesContent[index].post;
  document.getElementById("right-image").src = slidesContent[index].src;
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });
  leftSlide.style.transform = `translateX(-${index * 100}%)`;
  rightSlide.style.transform = `translateX(-${index * 100}%)`;
}

prevButton.addEventListener("click", () => {
  currentSlide = currentSlide > 0 ? currentSlide - 1 : slidesContent.length - 1;
  updateSlide(currentSlide);
});

nextButton.addEventListener("click", () => {
  currentSlide = currentSlide < slidesContent.length - 1 ? currentSlide + 1 : 0;
  updateSlide(currentSlide);
});

indicators.forEach((indicator) => {
  indicator.addEventListener("click", (event) => {
    currentSlide = parseInt(event.target.getAttribute("data-slide"));
    updateSlide(currentSlide);
  });
});

updateSlide(currentSlide);
