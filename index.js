const access_key = "Bs4Qe4VUtjYry1O4e7D7BjR0G7UhOXnPPi4IkRYw3kM";
const searchBtn = document.getElementById("search-btn");
const imageCont = document.getElementById("image-container");
const input = document.getElementById("input");
const loadMoreBtn = document.getElementById("load-more");
const loadMoreBtnCont = document.getElementsByClassName(
  "load-more-btn-container"
);

let searchValue = input.value;
let page = 1;
let totalPages;

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!input.value) {
    alert("Please Enter Search Value");
    return;
  }
  searchValue = input.value;
  page = 1;
  imageCont.innerHTML = "";
  input.value = "";

  fetchApi();
});

loadMoreBtn.addEventListener("click", () => {
  page++;
  fetchApi();
});

async function fetchApi() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${searchValue}&client_id=${access_key}&page=${page}`
    );
    const result = await response.json();

    if (result.results.length === 0) {
      imageCont.innerHTML = `<h3>Result Not Found</h3>`;
      return;
    }
    totalPages = result.total_pages;

    displayData(result.results);
    if (page === totalPages) {
      loadMoreBtnCont[0].classList.remove("visible");
      loadMoreBtnCont[0].classList.add("hidden");
    }
    loadMoreBtnCont[0].classList.remove("hidden");
    loadMoreBtnCont[0].classList.add("visible");
  } catch (err) {
    alert(err.message);
  }
}

function displayData(data) {
  data.map((item) => {
    const div = document.createElement("div");
    div.setAttribute("class", "image-card");

    div.innerHTML = `<div class="user-details">
              <img
                src=${item.user.profile_image.medium}
                alt="userProfile"
              />
              <p class="user-name">${item.user.name}</p>
            </div>
            <div class="picture-details">
           <a href=${item.user.links.html} target=${"_blank"}> <img
                src=${item.urls.raw}
                alt="pic"
              /></a>
              <p class="desc">${item.alt_description}</p>
            </div>`;

    imageCont.appendChild(div);
  });
}
