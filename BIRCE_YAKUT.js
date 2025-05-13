let carouselTrack;
let carouselSection;
let favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];

// sayfa kontrolü
if (window.location.pathname !== "/") {
  console.log("wrong page");
} else {
  console.log("Home page confirmed");

  // carousel section
  createCarouselSection();

  const DATA_URL = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";

  // veri yükleme
  if (localStorage.getItem("recommendedProducts")) {
    const productData = JSON.parse(localStorage.getItem("recommendedProducts"));
    console.log("Veri localStorage'tan geldi");
    renderProducts(productData);
  } else {
    fetch(DATA_URL)
      .then(res => res.json())
      .then(data => {
        console.log("Veri API'den geldi");
        localStorage.setItem("recommendedProducts", JSON.stringify(data));
        renderProducts(data);
      })
      .catch(err => console.error("HATA:", err));
  }
}

function createCarouselSection() {
  //section
  carouselSection = document.createElement("section");
  carouselSection.style.backgroundColor = "transparent";
  carouselSection.style.padding = "0";
  carouselSection.style.margin = "40px auto";
  carouselSection.style.maxWidth = "1200px";
  carouselSection.style.boxSizing = "border-box";
  carouselSection.style.fontFamily = "Arial, sans-serif";
  carouselSection.style.width = "calc(100% - 32px)";
  carouselSection.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
  


 //başlık
 const headingBox = document.createElement("div");
 headingBox.textContent = "Beğenebileceğinizi düşündüklerimiz";
 

 headingBox.style.backgroundColor = "#FEF6EB"; 
 headingBox.style.padding = "16px 24px";
 headingBox.style.borderTopLeftRadius = "16px";
 headingBox.style.borderTopRightRadius = "16px";
 headingBox.style.fontWeight = "700";
 headingBox.style.fontSize = "20px";
 headingBox.style.color = "#f28e00"; 
 headingBox.style.borderBottom = "1px solid #fff";
 

// carousel container
const carouselContainer = document.createElement("div");
carouselContainer.style.position = "relative";
carouselContainer.style.marginTop = "16px";
if (window.innerWidth < 768) {
    carouselContainer.style.marginLeft = "-16px";
    carouselContainer.style.marginRight = "-16px";
  }
  


//carouselTrack
carouselTrack = document.createElement("div");
carouselTrack.style.display = "flex";
carouselTrack.style.padding = "0 48px"; 
carouselTrack.style.gap = "16px";
carouselTrack.style.overflowX = "auto";
carouselTrack.style.scrollBehavior = "smooth";
carouselTrack.style.paddingBottom = "8px";
carouselTrack.style.scrollbarWidth = "none"; 
carouselTrack.style.msOverflowStyle = "none"; 
carouselTrack.style.WebkitOverflowScrolling = "touch"; 

// ccrollbar gizleme 
const scrollbarStyle = document.createElement("style");
scrollbarStyle.textContent = `
  .carousel-track::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(scrollbarStyle);

carouselTrack.classList.add("carousel-track");

// navigation butonları
const prevButton = createNavButton(true, carouselTrack);
const nextButton = createNavButton(false, carouselTrack);


if (window.innerWidth >= 768) {
  const prevButton = createNavButton(true, carouselTrack);
  const nextButton = createNavButton(false, carouselTrack);
  carouselContainer.appendChild(prevButton);
  carouselContainer.appendChild(carouselTrack);
  carouselContainer.appendChild(nextButton);
} else {
  //mobilde ok yok
  carouselContainer.appendChild(carouselTrack);
}


//elemanları ekle
carouselSection.appendChild(headingBox);
carouselSection.appendChild(carouselContainer);



  //doma ekle

let targetSection;

const allHeadings = [...document.querySelectorAll("h2")];
for (const h of allHeadings) {
  if (h.textContent?.trim()?.includes("Sizin için Seçtiklerimiz")) {
    targetSection = h.closest("section") || h.parentElement;
    break;
  }
}


if (targetSection) {
  targetSection.insertAdjacentElement("beforebegin", carouselSection);
} else {
  console.warn("bulunamadı body sonuna eklendi.");
  document.body.appendChild(carouselSection);
}

}

function createNavButton(isPrev, track) {
  const button = document.createElement("button");

  const leftArrowSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#f28e00" stroke-width="2" viewBox="0 0 24 24">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  `;

  const rightArrowSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#f28e00" stroke-width="2" viewBox="0 0 24 24">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  `;

  button.innerHTML = isPrev ? leftArrowSVG : rightArrowSVG;

  button.style.position = "absolute";
  button.style.top = "50%";
  button.style.transform = "translateY(-50%)";
  const positionValue = window.innerWidth < 768 ? "-24px" : "-52px";
  button.style[isPrev ? "left" : "right"] = positionValue;
  
  button.style.zIndex = "10";
  button.style.width = "36px";
  button.style.height = "36px";
  button.style.borderRadius = "50%";
  button.style.border = "none";
  button.style.backgroundColor = "#FEF6EB";
  button.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
  button.style.cursor = "pointer";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const scrollAmount = isPrev ? -300 : 300;
    track.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  });

  return button;
}

  

function renderProducts(products) {
  //önceki içeriği temizle
  carouselTrack.innerHTML = ""; 

  products.forEach(product => {
    const card = document.createElement("div");
    card.style.display = "flex"; 
card.style.flexDirection = "column"; 
card.style.flex = "0 0 auto";
card.style.width = "200px";
card.style.backgroundColor = "#fff";
card.style.borderRadius = "8px";
card.style.padding = "16px";
card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
card.style.position = "relative";
card.style.cursor = "pointer";
card.style.transition = "transform 0.2s";
card.style.marginBottom = "8px";


    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
      card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "none";
      card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
    });

    //product img
    const img = document.createElement("img");
    img.src = product.img;

    img.alt = product.name;
    img.style.width = "100%";
    img.style.height = "160px";
    img.style.objectFit = "contain";
    img.style.borderRadius = "4px";

    //product name
    const name = document.createElement("p");
    name.textContent = product.name;
    name.style.fontSize = "14px";
    name.style.margin = "12px 0 8px";
    name.style.color = "#333";
    name.style.height = "40px";
    name.style.overflow = "hidden";
    name.style.textOverflow = "ellipsis";
    name.style.display = "-webkit-box";
    name.style.WebkitLineClamp = "2";
    name.style.WebkitBoxOrient = "vertical";

    //price and rating
const priceContainer = document.createElement("div");
priceContainer.style.display = "flex";
priceContainer.style.flexDirection = "column";
priceContainer.style.gap = "4px";


// yıldız puanı ve yorum sayısı
const randomRating = (Math.random() * 0.7 + 4.3).toFixed(1); // 4.3 - 5.0
const randomReviewCount = Math.floor(Math.random() * 200 + 100); // 100 - 300

const starsWrapper = document.createElement("div");
starsWrapper.style.display = "flex";
starsWrapper.style.alignItems = "center";
starsWrapper.style.gap = "4px";

//yıldızlar
const filledStarSVG = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFA500" stroke="#FFA500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 15 8.5 22 9 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9 9 8.5 12 2" />
  </svg>
`;

const emptyStarSVG = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFA500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 15 8.5 22 9 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9 9 8.5 12 2" />
  </svg>
`;

for (let i = 1; i <= 5; i++) {
  const star = document.createElement("span");
  star.innerHTML = i <= Math.round(randomRating) ? filledStarSVG : emptyStarSVG;
  star.style.display = "inline-block";
  starsWrapper.appendChild(star);
}


// Yorum sayısı
const reviewCount = document.createElement("span");
reviewCount.textContent = `(${randomReviewCount})`;
reviewCount.style.color = "#666";
reviewCount.style.fontSize = "13px";

starsWrapper.appendChild(reviewCount);
priceContainer.appendChild(starsWrapper);

// Eski fiyat ve indirim oranı
if (product.original_price && product.original_price !== product.price) {
    if (product.original_price && product.original_price !== product.price) {
        const originalAndDiscountWrapper = document.createElement("div");
        originalAndDiscountWrapper.style.display = "flex";
        originalAndDiscountWrapper.style.alignItems = "center";
        originalAndDiscountWrapper.style.gap = "8px"; 
        
        const originalPrice = document.createElement("span");
        originalPrice.textContent = `${product.original_price} TL`;
        originalPrice.style.fontSize = "14px";
        originalPrice.style.color = "#000";
        originalPrice.style.textDecoration = "line-through";
      
        const discountPercent = Math.round((1 - product.price / product.original_price) * 100);
        const discount = document.createElement("span");
        discount.textContent = `-%${discountPercent}`;
        discount.style.fontSize = "14px";
        discount.style.color = "#4CAF50";
        discount.style.fontWeight = "bold";
      
        originalAndDiscountWrapper.appendChild(originalPrice);
        originalAndDiscountWrapper.appendChild(discount);
      
        priceContainer.appendChild(originalAndDiscountWrapper);
      }
      
}

// Yeni fiyat
const currentPrice = document.createElement("span");
currentPrice.innerHTML = `<strong>${product.price} TL</strong>`;
currentPrice.style.color = "#4CAF50";
currentPrice.style.fontSize = "18px";
currentPrice.style.fontWeight = "bold";
priceContainer.appendChild(currentPrice);

// Sepete Ekle butonu
const addToCartBtn = document.createElement("button");
addToCartBtn.textContent = "Sepete Ekle";
addToCartBtn.style.marginTop = "auto";
addToCartBtn.style.padding = "10px 20px";
addToCartBtn.style.backgroundColor = "#FEF6EB";
addToCartBtn.style.color = "#f28e00";

addToCartBtn.style.border = "none";
addToCartBtn.style.borderRadius = "32px";
addToCartBtn.style.fontSize = "14px";
addToCartBtn.style.fontWeight = "600";
addToCartBtn.style.cursor = "pointer";
addToCartBtn.style.transition = "all 0.2s ease-in-out";
addToCartBtn.style.alignSelf = "center";
addToCartBtn.style.width = "100%";

addToCartBtn.addEventListener("mouseenter", () => {
  addToCartBtn.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
});
addToCartBtn.addEventListener("mouseleave", () => {
  addToCartBtn.style.boxShadow = "none";
});




    // Favori butonu
    const favoriteButton = document.createElement("div");
    favoriteButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="${favoriteProducts.includes(product.id) ? '#f57c00' : 'none'}" stroke="#f57c00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    `;
    
    favoriteButton.style.position = "absolute";
    favoriteButton.style.top = "8px";
    favoriteButton.style.right = "8px";
    favoriteButton.style.width = "36px";
    favoriteButton.style.height = "36px";
    favoriteButton.style.borderRadius = "50%";
    favoriteButton.style.backgroundColor = "#fff"; 
    favoriteButton.style.display = "flex";
    favoriteButton.style.alignItems = "center";
    favoriteButton.style.justifyContent = "center";
    favoriteButton.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
    favoriteButton.style.cursor = "pointer";
    

    favoriteButton.addEventListener("click", (e) => {
      //card click eventini engelle
      e.stopPropagation(); 
      toggleFavorite(product.id, favoriteButton);
    });

    card.addEventListener("click", () => {
      window.open(product.url, "_blank");
    });

    card.append(img, name, priceContainer, addToCartBtn); 
card.appendChild(favoriteButton); 

    carouselTrack.appendChild(card);
  });
}

function toggleFavorite(productId, buttonElement) {
    const index = favoriteProducts.indexOf(productId);
  
    if (index === -1) {
      favoriteProducts.push(productId);
    } else {
      favoriteProducts.splice(index, 1);
    }
  
    //localStorage güncelle
    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
  
    //favorite güncelle
    const isFavorited = favoriteProducts.includes(productId);
    buttonElement.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFavorited ? '#f57c00' : 'none'}" stroke="#f57c00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    `;
  }
  
 