const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");
const inputEl = document.getElementById("input");

async function fetchImage() {
    const inputValue = inputEl.value;

    // Validation
    if (inputValue < 1 || inputValue > 10) {
        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "Number must be between 1 and 10";
        galleryEl.style.display = "none";
        return;
    }

    errorMessageEl.style.display = "none";
    btnEl.style.display = "none";

    // Show spinner
    galleryEl.style.display = "flex";
    galleryEl.innerHTML = `<img src="spinner.svg" alt="loading">`;

    try {
        const response = await fetch(
            `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.floor(Math.random() * 1000)}&client_id=UPqwDkWxp5QfAME8iogntUrWR7d8MHvTmqdahGxsOnI`
        );

        const data = await response.json();

        let imgs = "";

        data.forEach((pic) => {
            imgs += `<img src="${pic.urls.small}" alt="Unsplash image">`;
        });

        galleryEl.innerHTML = imgs;
        btnEl.style.display = "block";

    } catch (error) {
        console.error(error);
        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "Something went wrong. Please try again.";
        galleryEl.style.display = "none";
        btnEl.style.display = "block";
    }
}

btnEl.addEventListener("click", fetchImage);
