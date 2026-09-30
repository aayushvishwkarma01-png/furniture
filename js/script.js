document.addEventListener("DOMContentLoaded", () => {

    /* ================= 1. MOBILE MENU TOGGLE ================= */
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            
            // Toggle icon between bars and times
            const icon = menuBtn.querySelector("i");
            if (icon) {
                if (navLinks.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }

    /* ================= 2. HERO SLIDESHOW (SWAP FOLDER) ================= */
    const slideshowContainer = document.getElementById("heroSlideshow");
    
    // Images array inside swap/ directory
    const swapImages = [
        "image/swap/i1.png",
        "image/swap/i2.png",
        "image/swap/i3.png",
        "image/swap/i4.png",
        "image/swap/i5.png"
    ];

    if (slideshowContainer) {
        slideshowContainer.innerHTML = ""; // Clear initial static img

        swapImages.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = "Featured Furniture";
            img.classList.add("slide-img");
            if (index === 0) img.classList.add("active");
            slideshowContainer.appendChild(img);
        });

        const slides = slideshowContainer.querySelectorAll(".slide-img");
        let currentSlide = 0;

        if (slides.length > 1) {
            setInterval(() => {
                slides[currentSlide].classList.remove("active");
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add("active");
            }, 3000); // 3 seconds per slide
        }
    }

    /* ================= 3. RATING STAR SYSTEM ================= */
    const starButtons = document.querySelectorAll(".rating-stars button");
    const ratingResult = document.getElementById("rating-result");
    const ratingSubmit = document.getElementById("rating-submit");
    let selectedRating = 0;

    if (starButtons.length > 0) {
        starButtons.forEach(button => {
            button.addEventListener("click", () => {
                selectedRating = parseInt(button.getAttribute("data-star"), 10);
                
                // Highlight stars up to selected rate
                starButtons.forEach((btn, index) => {
                    if (index < selectedRating) {
                        btn.classList.add("selected");
                    } else {
                        btn.classList.remove("selected");
                    }
                });

                if (ratingResult) {
                    ratingResult.textContent = `You selected ${selectedRating} out of 5 stars.`;
                    ratingResult.style.color = "#d6a96d";
                }
            });
        });
    }

    if (ratingSubmit) {
        ratingSubmit.addEventListener("click", () => {
            if (selectedRating === 0) {
                if (ratingResult) {
                    ratingResult.textContent = "Please select a rating before submitting!";
                    ratingResult.style.color = "#e74c3c";
                }
            } else {
                if (ratingResult) {
                    ratingResult.textContent = `Thank you for your ${selectedRating}-star review!`;
                    ratingResult.style.color = "#2ecc71";
                }
            }
        });
    }

});

/* ================= 4. COLLECTION CARD EXPAND / CLOSE ================= */
function openCard(btn) {
    const currentCard = btn.closest(".collection-card");
    const collectionGrid = document.getElementById("collectionGrid");
    const allCards = collectionGrid.querySelectorAll(".collection-card");

    allCards.forEach(card => {
        if (card === currentCard) {
            card.classList.add("opened");
            card.classList.remove("hide-card");
        } else {
            card.classList.add("hide-card");
            card.classList.remove("opened");
        }
    });

    collectionGrid.classList.add("has-opened-card");
}

function closeCard(btn) {
    const collectionGrid = document.getElementById("collectionGrid");
    const allCards = collectionGrid.querySelectorAll(".collection-card");

    allCards.forEach(card => {
        card.classList.remove("opened", "hide-card");
    });

    collectionGrid.classList.remove("has-opened-card");
}
