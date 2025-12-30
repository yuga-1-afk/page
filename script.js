/* -------------------------------------scratch card----------------------- */

function initScratchCard() {
    const canvas = document.getElementById("scratchCanvas");
    const container = document.querySelector(".scratch-container");
    const copyBtn = document.getElementById("copyCoupon");
    const couponText = document.getElementById("couponText").innerText;

    if (!canvas || !container) return;

    canvas.style.display = "block";
    copyBtn.style.display = "none";

    const ctx = canvas.getContext("2d");

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Reset canvas
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#b5b5b5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-out";

    let isDrawing = false;

    function scratch(e) {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();

        checkScratchProgress();
    }

    function checkScratchProgress() {
        const custom_quizz5_apply = document.querySelector(
            ".custom_quizz5_apply"
        );
        const custom_code_text = document.querySelector("#couponText");

        const custom_copied_code_text = document.querySelector(
            ".custom_quizz5_copied"
        );

        const jsConfetti = new JSConfetti();

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        ).data;
        let transparentPixels = 0;

        for (let i = 3; i < imageData.length; i += 4) {
            if (imageData[i] === 0) transparentPixels++;
        }

        if (transparentPixels > imageData.length / 15) {
            canvas.style.display = "none";
            copyBtn.style.display = "inline-block";
            jsConfetti.addConfetti();
            custom_quizz5_apply.style.display = "block";
            navigator.clipboard.writeText(custom_code_text.innerText);
            custom_copied_code_text.style.display = "block";
        }
    }

    canvas.onmousedown = () => (isDrawing = true);
    canvas.onmouseup = () => (isDrawing = false);
    canvas.onmousemove = scratch;

    canvas.ontouchstart = () => (isDrawing = true);
    canvas.ontouchend = () => (isDrawing = false);
    canvas.ontouchmove = scratch;

    copyBtn.onclick = () => {
        navigator.clipboard.writeText(couponText);
        copyBtn.innerText = "Copied!";
    };
}

/* -------------------------------------scratch card----------------------- */

//----------------------------------------pop up start-----------------------------------------------------

const custom_quizz_section = document.querySelector(".custom_quiz_section");

const custom_quizz_email_signup = document.querySelector(
    ".custom_email_signup"
);
const custom_quizz_popup1 = document.querySelector(".custom_quizz1");
const custom_quizz_popup2 = document.querySelector(".custom_quizz2");
const custom_quizz_popup3 = document.querySelector(".custom_quizz3");
const custom_quizz_popup4 = document.querySelector(".custom_quizz4");
const custom_quizz_popup5 = document.querySelector(".custom_quizz5");
const custom_quizz_popup6 = document.querySelector(".custom_quizz6");

const email_input = document.getElementById("quizEmail");
const email_submit_button = document.querySelector(
    ".custom_email_input_button"
);
const errorMsg = document.querySelector(".custom_email_error_msg");

const custom_quizz1_input1_button = document.querySelector(
    ".custom_quizz1_input1_button"
);

const custom_quizz1_input2_button = document.querySelector(
    ".custom_quizz1_input2_button"
);

const custom_quizz4_options_button = document.querySelectorAll(
    ".custom_quizz4_input1_button,.custom_quizz4_input2_button"
);

const custom_quizz3_input_button = document.querySelectorAll(
    ".custom_quizz3_input_button"
);
const custom_quizz4_input_button = document.querySelector(
    ".custom_quizz4_input_button"
);
const custom_quizz5_input_button = document.querySelector(
    ".custom_quizz5_input_button"
);

let quizzpopupindex = 0;

let quizzAnswers = {
    q1: "",
    q2: "",
};

const storedEmail = localStorage.getItem("quizEmail");

if (localStorage.getItem("quizCompleted") === "true") {
    custom_quizz_section.style.display = "none";
}

email_submit_button.addEventListener("click", () => {
    const email = email_input.value.trim();

    if (email === "") {
        errorMsg.style.display = "block";
        errorMsg.innerText = "Please enter email";
        return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(email)) {
        errorMsg.style.display = "block";
        errorMsg.innerText = "Not a valid email";
        return;
    }

    errorMsg.style.display = "none";

    // ✅ STORE EMAIL + QUIZ STATUS
    localStorage.setItem("quizEmail", email);

    fetch(
        "https://script.google.com/macros/s/AKfycbyxvp9Oqn5w8aZa90cuRarlqTvqnuOqHc36nQPkBHgljzxkOLR_XUaMWqC6YTnyyfM5/exec",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                email: email,
            }).toString(),
        }
    );

    quizzpopupindex = 1;
    custom_quizz_email_signup.style.display = "none";
    custom_quizz_popup1.style.display = "block";
});

custom_quizz1_input1_button.addEventListener("click", () => {
    quizzpopupindex = 2;
    custom_quizz_popup1.style.display = "none";
    custom_quizz_popup2.style.display = "block";
    quizzAnswers.q1 = "Chemical Hair Dye";
});

custom_quizz1_input2_button.addEventListener("click", () => {
    quizzpopupindex = 3;
    custom_quizz_popup1.style.display = "none";
    custom_quizz_popup3.style.display = "block";
    quizzAnswers.q1 = "Natural Hair Fixing Cream";
});

custom_quizz3_input_button.forEach((button, index) => {
    button.addEventListener("click", () => {
        quizzpopupindex = 4;
        custom_quizz_popup2.style.display = "none";
        custom_quizz_popup3.style.display = "none";
        custom_quizz_popup4.style.display = "block";
    });
});

custom_quizz4_options_button.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("custom_quizz4_input1_button")) {
            quizzAnswers.q2 = "10 mins Hair Dye";
        } else if (button.classList.contains("custom_quizz4_input2_button")) {
            quizzAnswers.q2 = "Instant 30-Second Fixing Cream";
        }

        quizzpopupindex = 5;
        custom_quizz_popup4.style.display = "none";
        custom_quizz_popup5.style.display = "block";

        // ✅ WAIT until popup is visible & layout is calculated
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                initScratchCard();
            });
        });
    });
});

custom_quizz5_input_button.addEventListener("click", () => {
    localStorage.setItem("quizCompleted", "true");
    quizzpopupindex = 6;
    custom_quizz_popup5.style.display = "none";
    custom_quizz_popup6.style.display = "block";
    const email = email_input.value.trim();

    console.log("Submitting:", email, quizzAnswers);

    fetch(
        "https://script.google.com/macros/s/AKfycbyxvp9Oqn5w8aZa90cuRarlqTvqnuOqHc36nQPkBHgljzxkOLR_XUaMWqC6YTnyyfM5/exec",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                type: "quiz_complete",
                email: email,
                source: "Scratch Quiz",
                question1: quizzAnswers.q1,
                question2: quizzAnswers.q2,
            }).toString(),
        }
    );
});

console.log(quizzAnswers);

// custom_quizz5_input_button.addEventListener("click", () => {
//     localStorage.setItem("quizCompleted", "true");
//     custom_quizz_section.style.display = "none";
//     if (localStorage.getItem("quizCompleted")) {
//         custom_quizz_section.style.display = "none";
//     }
// });

// --------------------------------------pop up end----------------------------------------------------------

// --------------------------------------Image Comparison Start----------------------------------------------------------

const ImageCompareContainer = document.querySelectorAll(
    ".img-comparison-container"
);

const compareImage = function (containerEl) {
    let _ci_container = containerEl;
    let _ci_width = _ci_container.clientWidth;
    let _ci_slider = _ci_container.querySelector("span");
    let _ci_img2 = _ci_container.querySelector(
        ".img-comparison-item:nth-child(2)"
    );

    // Set initial width
    _ci_img2.style.width = _ci_width / 2 + "px";
    _ci_slider.style.left = _ci_width / 2 + "px";

    // --- Mouse events ---
    _ci_slider.addEventListener("mousedown", function (e) {
        e.preventDefault();
        containerEl.addEventListener("mousemove", move_slider_mouse);
        containerEl.addEventListener("mouseup", function () {
            containerEl.removeEventListener("mousemove", move_slider_mouse);
        });
    });

    function move_slider_mouse(e) {
        slideHandler(e.clientX);
    }

    // --- Touch events for mobile ---
    _ci_slider.addEventListener("touchstart", function (e) {
        containerEl.addEventListener("touchmove", move_slider_touch);
        containerEl.addEventListener("touchend", function () {
            containerEl.removeEventListener("touchmove", move_slider_touch);
        });
    });

    function move_slider_touch(e) {
        let touchX = e.touches[0].clientX;
        slideHandler(touchX);
    }

    // --- Shared slider logic ---
    function slideHandler(clientX) {
        let _container_margin = containerEl.offsetLeft;

        if (
            clientX - _container_margin > 0 &&
            clientX - _container_margin <=
                containerEl.clientWidth - _ci_slider.clientWidth
        ) {
            _ci_img2.style.width = clientX - _container_margin + "px";
            _ci_slider.style.left = clientX - _container_margin + "px";
        }
    }
};

// Initialize comparison
ImageCompareContainer.forEach((ICC) => {
    compareImage(ICC);
});

// Adjust on resize
window.onresize = function () {
    ImageCompareContainer.forEach((ICC) => {
        compareImage(ICC);
    });
};

// --------------------------------------Image Comparison end----------------------------------------------------------

// --------------------------------------Video section mute toggle button----------------------------------------------------------

const grey_hair_fixing_video = document.querySelector(
    ".grey-hair-fixing-video"
);
const video_mute_toggle = document.querySelector(".content-video-mute-toggle");

video_mute_toggle.addEventListener("click", () => {
    grey_hair_fixing_video.muted = !grey_hair_fixing_video.muted;
    video_mute_toggle.textContent = grey_hair_fixing_video.muted ? "🔇" : "🔊";
});

// --------------------------------------how to apply slider ----------------------------------------------------------

// const how_to_apply_slider = document.querySelector(".how-to-apply-sections");

// const how_to_apply_slides = document.querySelectorAll(".how-to-apply-section");

// let how_to_apply_index = 0;

// function how_to_apply_slide() {
//     how_to_apply_index++;

//     if (how_to_apply_index > how_to_apply_slides.length - 1) {
//         how_to_apply_index = 0;
//     }

//     how_to_apply_slider.style.transform = `translateX(-${
//         how_to_apply_index * 220
//     }px)`;
// }

// setInterval(how_to_apply_slide, 3000);

///------------------------------

const track = document.querySelector(".how-to-apply-sections");
const cards = document.querySelectorAll(".how-to-apply-section");
let indexx = 0;
const cardWidth = cards[0].offsetWidth + 20; // card + margin

const clonedCards = Array.from(cards)
    .slice(0, 3)
    .map((card) => card.cloneNode(true));
clonedCards.forEach((clonedCard) => track.appendChild(clonedCard));

function moveSlider() {
    indexx++;
    track.style.transform = `translateX(-${indexx * cardWidth}px)`;

    if (indexx >= cards.length) {
        setTimeout(() => {
            track.style.transition = "none";
            indexx = 0;
            track.style.transform = `translateX(0)`;
            // Force reflow before restoring transition
            void track.offsetWidth;
            track.style.transition = "transform 0.5s ease-in-out";
        }, 500);
    }
}

setInterval(moveSlider, 3000);

// --------------------------------------how to apply slider end----------------------------------------------------------
