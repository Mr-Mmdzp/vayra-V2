fetch("./dataBase.json")
.then(response => response.json())
.then(data => {
    // headerLogo 
    let companyLogo = document.querySelector(".logo");
    companyLogo.src = data.logo
    // heroBanner 
    let heroBanner = document.querySelector(".hero-img");
    heroBanner.src = data.hbanner
    // products
    let products = document.querySelector(".products");
    data.properties.forEach(pr => {
        // createTheElements
        let prCard = document.createElement("div")
        let prName = document.createElement("p")
        let prPrice = document.createElement("p")
        let prImage = document.createElement("img")
        let prType = document.createElement("p")
        let prLocation = document.createElement("p")
        //Fill Them With Contents
        prName.textContent = pr.title
        prPrice.textContent = `$${pr.price.toLocaleString()}`
        prImage.src = pr.image 
        prLocation.textContent = `Location: ${pr.location}`
        prType.textContent = pr.type
        // Classes!!
        prCard.className =
        "group overflow-hidden rounded-3xl border border-black/10 bg-white/70 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer dark:border-white/10 dark:bg-gradient-to-br dark:from-[#1C1916] dark:to-[#141210]";

        prImage.className =
        "h-64 w-full object-cover transition duration-500 group-hover:scale-105";

        prName.className =
        "mt-5 mx-5 text-xl font-semibold text-[#25221D] inline-block relative after:absolute after:content-[''] after:-left-full after:bottom-0 after:bg-[#A6814C] group-hover:after:left-0 after:w-full after:h-[2px] overflow-hidden after:transition-all after:duration-400 after:ease-in-out property-name dark:text-white";

        prType.className =
        "mt-2 px-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#A6814C]";

        prPrice.className =
        "mt-4 px-5 text-lg font-bold  text-[#25221D] dark:text-[#E8DCC8]";

        prLocation.className =
        "mt-2 px-5 pb-5 text-sm text-[#777067]";
        // appent
        products.appendChild(prCard)
        prCard.append(prImage, prName , prPrice, prType, prLocation)
        //inspectEvent
        prCard.addEventListener("click", () => {

    let modal = document.querySelector("#property-modal");
    let modalBody = document.querySelector("#modal-body");

    modalBody.innerHTML = `
        <div class="grid lg:grid-cols-2">

            <div class="h-72 lg:h-full">
                <img
                    src="${pr.image}"
                    alt="${pr.title}"
                    class="h-full w-full object-cover"
                >
            </div>

            <div class="p-7 sm:p-10">

                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[#A6814C]">
                    ${pr.type}
                </p>

                <h2 class="mt-3 text-3xl font-semibold text-[#25221D] dark:text-white">
                    ${pr.title}
                </h2>

                <p class="mt-3 text-sm text-[#777067] dark:text-white/50">
                    ${pr.location}
                </p>

                <p class="mt-8 text-3xl font-bold text-[#25221D] dark:text-white">
                    $${pr.price.toLocaleString()}
                </p>

                <div class="mt-8 grid grid-cols-3 gap-3">

                    <div class="rounded-2xl border border-black/10 p-4 dark:border-white/10">
                        <p class="text-xs text-[#777067] dark:text-white/40">
                            Beds
                        </p>
                        <p class="mt-1 text-lg font-semibold dark:text-white">
                            ${pr.beds}
                        </p>
                    </div>

                    <div class="rounded-2xl border border-black/10 p-4 dark:border-white/10">
                        <p class="text-xs text-[#777067] dark:text-white/40">
                            Baths
                        </p>
                        <p class="mt-1 text-lg font-semibold dark:text-white">
                            ${pr.baths}
                        </p>
                    </div>

                    <div class="rounded-2xl border border-black/10 p-4 dark:border-white/10">
                        <p class="text-xs text-[#777067] dark:text-white/40">
                            Area
                        </p>
                        <p class="mt-1 text-lg font-semibold dark:text-white">
                            ${pr.area} m²
                        </p>
                    </div>

                </div>

                <div class="mt-8 border-t border-black/10 pt-6 dark:border-white/10">

                    <p class="text-sm leading-7 text-[#777067] dark:text-white/50">
                        A carefully selected Veyra property located in
                        ${pr.location}, offering an exceptional combination
                        of space, comfort and modern living.
                    </p>

                </div>

                <button
                    class="mt-8 w-full rounded-2xl bg-[#25221D] py-4 text-sm font-semibold text-white transition hover:bg-[#A6814C]"
                >
                    Contact Veyra
                </button>

            </div>

        </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    let closeBtn = document.querySelector("#modal-close");
    closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
})
});

    });
    // SearchSystem / FilterSystem !!!
    let searchResult = document.querySelector("#search-results") 
    let searchBtn = document.querySelector("#search-submit") 
    function searchSystem() {
        let locationInput = document.querySelector("#property-location") 
        let typeInput = document.querySelector("#property-type") 
        let searchInput = document.querySelector("#property-search") 
        console.log(searchInput.value);
console.log(typeInput.value);
console.log(locationInput.value);
        let filteredProperties = data.properties.filter(pr => {
    let searchMaches =
        pr.title.toLowerCase().includes(searchInput.value.toLowerCase().trim());

    let typeMaches =
        typeInput.value === "all" ||
        pr.type.toLowerCase().includes(typeInput.value.toLowerCase());

    let locationMaches =
        locationInput.value === "all" ||
        pr.location.toLowerCase().includes(locationInput.value.toLowerCase());

    return searchMaches && typeMaches && locationMaches;
});
searchResult.innerHTML = "";

searchResult.className =
    "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

if (filteredProperties.length === 0) {
    searchResult.innerHTML = `
        <div class="col-span-full rounded-2xl border border-black/10 bg-white/70 p-8 text-center dark:border-white/10 dark:bg-white/5">
            <p class="text-sm font-medium text-[#777067] dark:text-white/50">
                No properties found.
            </p>
        </div>
    `;
    return;
}

filteredProperties.forEach(pr => {

    let resultCard = document.createElement("div");

    resultCard.className =
        "group overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5";

    resultCard.innerHTML = `
        <div class="overflow-hidden">
            <img
                src="${pr.image}"
                alt="${pr.title}"
                class="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
            >
        </div>

        <div class="p-5">
            <p class="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A6814C]">
                ${pr.type}
            </p>

            <h3 class="mt-2 text-lg font-semibold text-[#25221D] dark:text-white">
                ${pr.title}
            </h3>

            <p class="mt-2 text-sm text-[#777067] dark:text-white/50">
                ${pr.location}
            </p>

            <div class="mt-4 flex items-center justify-between border-t border-black/10 pt-4 dark:border-white/10">
                <span class="text-lg font-bold text-[#25221D] dark:text-white">
                    $${pr.price.toLocaleString()}
                </span>

                <span class="text-xs text-[#A6814C]">
                    ${pr.beds} Beds · ${pr.baths} Baths
                </span>
            </div>
        </div>
    `;

    searchResult.appendChild(resultCard);
});

searchResult.classList.remove("hidden");

console.log(filteredProperties);
    }   
    searchBtn.addEventListener("click" , () => {
        searchSystem()
    })
     
    let aboutBanner = document.querySelector(".about-banner");

    aboutBanner.src = data.aboutBanner;
let locationImg1 = document.querySelector(".location-img-1");
let locationImg2 = document.querySelector(".location-img-2");
let locationImg3 = document.querySelector(".location-img-3");

locationImg1.src = data.realS1;
locationImg2.src = data.realS2;
locationImg3.src = data.realS3;
let footerLogo = document.querySelector(".footer-logo");

footerLogo.src = data.logo;
let authLogo = document.querySelector(".auth-logo");

authLogo.src = data.logo;
})
localStorage.getItem("theme") === "dark"
? document.documentElement.classList.add("dark")
: document.documentElement.classList.remove("dark")
// dark/Light Mode 
let themeBtn = document.querySelector("#theme-toggle");
themeBtn.addEventListener("click" , () => {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")){
    localStorage.setItem("theme", "dark");
} else {
    localStorage.setItem("theme", "light")
}
})
// moblieResposiveHeader
const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
// ================= AUTH MODAL =================

let authModal = document.querySelector("#auth-modal");
let authClose = document.querySelector("#auth-close");

let loginBtns = document.querySelectorAll(".login-btn");
let createAccountBtns = document.querySelectorAll(".create-account-btn");

let loginForm = document.querySelector("#login-form");
let createForm = document.querySelector("#create-form");

let showCreate = document.querySelector("#show-create");
let showLogin = document.querySelector("#show-login");


// Open Login
loginBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        authModal.classList.remove("hidden");
        authModal.classList.add("flex");

        loginForm.classList.remove("hidden");
        createForm.classList.add("hidden");
    });
});


// Open Create Account
createAccountBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        authModal.classList.remove("hidden");
        authModal.classList.add("flex");

        createForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
    });
});


// Login → Create
showCreate.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    createForm.classList.remove("hidden");
});


// Create → Login
showLogin.addEventListener("click", () => {
    createForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
});


// Close
authClose.addEventListener("click", () => {
    authModal.classList.add("hidden");
    authModal.classList.remove("flex");
});


// Close by clicking backdrop
authModal.addEventListener("click", (e) => {
    if (e.target === authModal) {
        authModal.classList.add("hidden");
        authModal.classList.remove("flex");
    }
});


// ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        authModal.classList.add("hidden");
        authModal.classList.remove("flex");
    }
});
// loginEye 
let eye = document.querySelector(".eye");
let loginPass = document.querySelector("#login-password");
let see = false
eye.addEventListener("click", () => {
    if(see === false ){
        loginPass.type = "text"
        see = true
    }
    else {
        loginPass.type = "password"
        see = false
    }
})