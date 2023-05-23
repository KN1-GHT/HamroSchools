// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjHbLCSLPiS3VggGLoiMRvmhdbcNrP9pQ",
  authDomain: "school-review-631cb.firebaseapp.com",
  projectId: "school-review-631cb",
  storageBucket: "school-review-631cb.appspot.com",
  messagingSenderId: "179044950338",
  appId: "1:179044950338:web:4d4c0da0052e273d23e8db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const checkIfExists = async (email) => {
  const fetchQuery = query(
    collection(db, "users"),
    where("email", "==", email)
  );
  const querySnapshot = await getDocs(fetchQuery);
  if (!querySnapshot.empty) {
    return true;
  } else {
    return false;
  }
};

const registerFunction = async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  try {
    const isExists = await checkIfExists(email);
    if (isExists) {
      alert("User already exists");
      return;
    }
    await addDoc(collection(db, "users"), {
      fullname: name,
      email: email,
      password: password,
    });
    alert("added user");
  } catch (e) {
    console.log(e);
  }
  email.value = "";
  password.value = "";
  name.value = "";
};

const loginFunction = async (e) => {
  e.preventDefault();
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passLogin").value;

  try {
    const fetchQuery = query(
      collection(db, "users"),
      where("email", "==", email),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(fetchQuery);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log("Document data:", doc.data());
        alert("Logged in: " + JSON.stringify(doc.data()));
        localStorage.setItem("user", JSON.stringify(doc.data()));
        window.location.href = "Homepage.html";
      });
    } else {
      console.log("No matching documents found!");
      alert("Login failed");
    }
  } catch (e) {
    console.log(e);
  }
  email.value = "";
  password.value = "";
};
const registerForm = document.getElementById("register");
if (registerForm) {
  registerForm.addEventListener("submit", registerFunction);
}

const loginForm = document.getElementById("login");
if (loginForm) {
  loginForm.addEventListener("submit", loginFunction);
}
const form = document.getElementById("RatingHandler");
const submitButton = document.getElementById("submitReview");
const stars = document.querySelectorAll('input[name="rating-2"]');

let selectedRating = 0;

// Add click event listener to each star input
stars.forEach((star) => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.getAttribute("data-rating"));
    console.log(selectedRating);
  });
});
const school = document.getElementsByTagName("title")[0].innerHTML;
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const rating = selectedRating;
    const review = document.getElementById("reviewText").value;
    const name = JSON.parse(localStorage.getItem("user")).fullname;
    console.log(rating, review, name, school);
    try {
      await addDoc(collection(db, "reviews"), {
        rating: rating,
        review: review,
        name: name,
        school: school,
      });
      alert("Review added successfully");
      // Clear the form inputs
      document.getElementById("reviewText").value = "";
      for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove("selected");
      }
    } catch (e) {
      console.log(e);
    }
  });
}
const schoolData = [
  {
    name: "Rato Bangala School",
    address: "Patan",
    board: "CIE",
    co: "Co-ed",
    level: "p",
    phone: "01-5542045",
    email: "rbs@mos.com.np",
    imageUrl:
      "https://www.schoolmykids.com/smk-media/2019/04/Rato-Bangala-School-Patan.png",
    URL: "http://127.0.0.1:5500/dist/Rato.html",
    reviews: [
      // Add more reviews here
    ],
  },

  {
    name: "Rai School",
    address: "Kathmandu",
    board: "CBSE",
    co: "Boys",
    level: "ss",
    phone: "01-4437537",
    email: "raischoolktm@gmail.com",
    imageUrl: "https://raischool.edu.np/img/railogo.png",
    URL: "http://127.0.0.1:5500/dist/Rai.html",
    reviews: [
      // Add more reviews here
    ],
  },
  {
    name: "The British School ",
    address: "Kathmandu",
    board: "NCN",
    co: "Co-ed",
    level: "ss",
    phone: "+977-1-5521794",
    email: "admissions@tbs.edu.np",
    imageUrl:
      "https://media.edusanjal.com/__sized__/logos/logo-the-british-school-kathmandux200-thumbnail-200x200.png",
    URL: "http://127.0.0.1:5500/dist/British.html",
    reviews: [
      // Add more reviews here
    ],
  },
  {
    name: "LACM ",
    address: "Kathmandu",
    board: "CBSE",
    co: "Girls",
    level: "sss",
    phone: "01-5521794",
    email: "info@lacm.edu.np",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVGgfMSPlFizR91k6ROWd9HVcIDcrrVWClug&usqp=CAU",
    URL: "http://127.0.0.1:5500/dist/LACM.html",
    reviews: [
      // Add more reviews here
    ],
  },

  // Add more schools here
];
const uploadDocuments = async () => {
  try {
    schoolData.forEach(async (school) => {
      await addDoc(collection(db, "schools"), {
        name: school.name,
        address: school.address,
        phone: school.phone,
        email: school.email,
        reviews: school.reviews,
        imageUrl: school.imageUrl,
        URL: school.URL,
        board: school.board,
        co: school.co,
        level: school.level,
      });
    });
  } catch (e) {
    console.log(e);
  }
};

//uploadDocuments();

// Add event listener to the apply button
const applyButton = document.getElementById("applyButton");

const fetchSchools = async () => {
  const checkboxes = document.querySelectorAll('input[type="radio"]');
  const productsContainer = document.getElementById("products");

  // Create an array to store the selected options
  const selectedOptions = [];

  // Iterate over each checkbox and check if it is selected
  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      console.log(checkbox.value);
      console.log(checkbox.name);
      selectedOptions.push({ [checkbox.name]: checkbox.value });
    }
  }
  console.log(selectedOptions);

  // Clear the products container before applying the filter
  productsContainer.innerHTML = "";
  let queryRef = collection(db, "schools");
  try {
    if (selectedOptions && selectedOptions.length > 0) {
      // Construct the query using `array-contains-any` operator
      selectedOptions.forEach((option) => {
        const key = Object.keys(option)[0];
        const value = option[key];
        queryRef = query(queryRef, where(key, "==", value));
      });
    }
    const querySnapshot = await getDocs(queryRef);
    console.log(querySnapshot.size);
    const productsContainer = document.getElementById("products");
    if (querySnapshot.size === 0) {
      productsContainer.textContent =
        "No schools with the given filters found.";
    }
    querySnapshot.forEach((doc) => {
      const schoolData = doc.data();
      console.log(schoolData.name);

      // Create a new card element
      const card = document.createElement("div");
      card.classList.add("product");
      card.setAttribute("data-main-titles", schoolData.mainTitle);
      card.setAttribute("data-sub-titles", schoolData.subTitle);
      card.setAttribute("data-location", schoolData.location);
      card.setAttribute("data-level", schoolData.level);

      // Build the card's inner HTML structure
      const cardContent = `
          <a href="${schoolData.URL}">
          <div class="container">
          <div class="product" data-main-title="CIE" data-sub-title="Co-ed" data-management="Management 1" data-location="Location 3" data-level="pre">
            <div class="py-8 flex flex-wrap md:flex-nowrap">
              <div class="md:w-60 md:h-40 md:mb-0 mb-6 flex-shrink-0 flex flex-col mr-14 py-1">
                <img src="${schoolData.imageUrl}" alt="" style="object-fit: cover; width: 100%; height: 90%;">
              </div>
              <div class="md:flex-grow mr-2">
                <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">${schoolData.name}</h2>
                <div class="location-details">
                  <i class="fa-solid fa-location-dot"></i> ${schoolData.address}
                  <div class="icon-text" style="margin-left: auto;">
                    <i class="fa-solid fa-icon"></i>
                    <i class="fa-regular fa-envelope fa-sm"></i> ${schoolData.email} 
                  </div>
                </div>
                <i class="fa-solid fa-school fa-xs"></i> ${schoolData.phone}
              </div>
            </div>
          </div>
        </div>
        </a>
        
          `;

      // Set the card's inner HTML content
      card.innerHTML = cardContent;

      // Append the card to the products container
      productsContainer.appendChild(card);
    });
  } catch (e) {
    console.log(e);
  }
};

fetchSchools();
if (applyButton) {
  applyButton.addEventListener("click", fetchSchools);
}

const reviewSection = document.getElementById("user-reviews-container");
const fetchReviews = async () => {
  console.log("hi mom");
  const querySnapshot = await getDocs(
    query(collection(db, "reviews"),where("school", "==" ,school))
  );
  if (querySnapshot.size === 0) {
    productsContainer.textContent =
      "No schools with the given filters found.";
  }
  querySnapshot.forEach((doc) => {
    const schoolData = doc.data();
    console.log(schoolData.name);

    // Create a new card element
    const card = document.createElement("div");
    card.classList.add("product");
    card.setAttribute("data-main-titles", schoolData.mainTitle);
    card.setAttribute("data-sub-titles", schoolData.subTitle);
    card.setAttribute("data-location", schoolData.location);
    card.setAttribute("data-level", schoolData.level);

    // Build the card's inner HTML structure
    const cardContent = `
        <p="${schoolData.name}"></p>
        <div class="container">
        <div class="product" data-main-title="CIE" data-sub-title="Co-ed" data-management="Management 1" data-location="Location 3" data-level="pre">
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:w-60 md:h-40 md:mb-0 mb-6 flex-shrink-0 flex flex-col mr-14 py-1">
            </div>
            <div class="md:flex-grow mr-2">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">${schoolData.name}</h2>
              <div class="location-details">
                <i class="fa-solid fa-location-dot"></i> ${schoolData.rating}
                <div class="icon-text" style="margin-left: auto;">
                  <i class="fa-solid fa-icon"></i>
                  <i class="fa-regular fa-envelope fa-sm"></i> ${schoolData.review} 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </=>
      
        `;

    // Set the card's inner HTML content
    card.innerHTML = cardContent;

    // Append the card to the products container
    reviewSection.appendChild(card);
  });
} 
fetchReviews();


