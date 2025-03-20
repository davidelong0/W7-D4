const API_KEY = "ysdQx9X343kS0ZdjsnSetGZieaOeisAf9FnX7ygJf7R9Xq3lRYd2zjFR";
const API_URL = "https://api.pexels.com/v1/search?query=";
const gallery = document.querySelector(".album .container .row");
const searchInput = document.createElement("input");
const loadImagesBtn = document.querySelector(".btn-primary");
const loadSecondaryBtn = document.querySelector(".btn-secondary");

// Aggiunta barra di ricerca
document.querySelector(".jumbotron .container").appendChild(searchInput);
searchInput.placeholder = "Search for images...";
searchInput.classList.add("form-control", "mt-3");

// Funzione per caricare immagini
const loadImages = (query) => {
  fetch(API_URL + query, {
    headers: { Authorization: API_KEY },
  })
    .then((response) => response.json())
    .then((data) => {
      gallery.innerHTML = "";
      data.photos.forEach((photo) => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top" onclick="showDetails(${photo.id})"/>
                    <div class="card-body">
                        <h5 class="card-title" onclick="showDetails(${photo.id})">${photo.photographer}</h5>
                        <p class="card-text">Photo ID: ${photo.id}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="viewImage('${photo.src.original}')">View</button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="hideCard(this)">Hide</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        gallery.appendChild(col);
      });
    });
};

// Eventi sui bottoni
loadImagesBtn.addEventListener("click", () => loadImages("mountains"));
loadSecondaryBtn.addEventListener("click", () => loadImages("kittens"));
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") loadImages(searchInput.value);
});

// Nascondere una card
const hideCard = (button) => {
  button.closest(".col-md-4").remove();
};

// Visualizzare immagine in modale
const viewImage = (imgSrc) => {
  const modal = document.createElement("div");
  modal.className = "modal fade show";
  modal.style.display = "block";
  modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Image Preview</h5>
                    <button type="button" class="btn-close" onclick="closeModal(this)"></button>
                </div>
                <div class="modal-body text-center">
                    <img src="${imgSrc}" class="img-fluid"/>
                </div>
            </div>
        </div>
    `;
  document.body.appendChild(modal);
};

// Chiudere il modale
const closeModal = (button) => {
  button.closest(".modal").remove();
};

// Dettagli immagine
const showDetails = (id) => {
  window.location.href = `details.html?id=${id}`;
};
