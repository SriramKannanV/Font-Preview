const apiKey = "AIzaSyDuz1J9KcmgdZk9J0WQbeAYJw7sd2SA3HI"; 
const apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;
const input = document.getElementById("textInput");
const container = document.getElementById("fontsContainer");

let fonts = [];
let currentPage = 1;
const fontsPerPage = 200;

let mybutton = document.getElementById("toTopBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function fetchFonts() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  const excludedFonts = ["42dot Sans", "Alumni Sans Collegiate One", "Alumni Sans Inline One", "Badeen Display", "Baloo Bhai 2", "Baloo Bhaijaan 2", "Baloo Bhaina 2", "Baloo Chettan 2", "Baloo Da 2", "Baloo Paaji 2", "Baloo Tamma 2", "Baloo Tammudu 2", "Baloo Thambi 2", "Barlow Condensed", "Barlow Semi Condensed", "Baskervville SC", "Big Shoulders Inline", "Blaka Hollow", "Blaka Ink", "Bungee Inline", "Bungee Spice", "Bungee Tint", "Cascadia Mono", "Chivo Mono", "Codystar", "Comforter Brush", "Coral Pixels", "Cormorant Garamond", "Cormorant Infant", "Crimson Text", "DM Serif Text", "DotGothic16", "Doto", "Dr Sugiyama", "Edu AU VIC WA NT Arrows", "Edu AU VIC WA NT Guides", "Edu AU VIC WA NT Pre", "Edu QLD Beginner", "Edu SA Beginner", "Edu TAS Beginner", "Edu VIC WA NT Beginner", "Encode Sans Semi Condensed", "Encode Sans Semi Expanded", "Fira Sans Extra Condensed", "Flow Block", "Flow Circular", "Flow Rounded", "Foldit", "GFS Neohellenic", "Gentium Plus", "Grandiflora One", "Hind Guntur", "Hind Madurai", "Hind Mysuru", "Hind Siliguri", "Hind Vadodara", "Honk", "IBM Plex Sans Arabic", "IBM Plex Sans Devanagari", "IBM Plex Sans Hebrew", "IBM Plex Sans JP", "IBM Plex Sans KR", "IBM Plex Sans Thai", "IBM Plex Sans Thai Looped", "IBM Plex Serif", "IM Fell Double Pica", "IM Fell Great Primer", "Inter Tight", "Jacquard 12 Charted", "Jacquard 24", "Jacquard 24 Charted", "Jacquarda Bastarda 9", "Jacquarda Bastarda 9 Charted", "Jaini Purva", "Jersey 10 Charted", "Jersey 15 Charted", "Jersey 20 Charted", "Jersey 25 Charted", "Kaisei HarunoUmi", "Kaisei Opti", "Kaisei Tokumin", "Kalnia Glaze", "Karla Tamil Inclined", "Karla Tamil Upright", "Kosugi Maru", "LXGW WenKai TC", "Lexend Deca", "Lexend Exa", "Lexend Giga", "Lexend Mega", "Lexend Peta", "Lexend Tera", "Lexend Zetta", "Libre Barcode 128", "Libre Barcode 128 Text", "Libre Barcode 39", "Libre Barcode 39 Extended", "Libre Barcode 39 Extended Text", "Libre Barcode 39 Text", "Libre Barcode EAN13 Text", "Libre Bodoni", "Libre Caslon Text", "Linefont", "Long Cang", "M PLUS 1p", "M PLUS 2", "Material Icons", "Material Icons Outlined", "Material Icons Round", "Material Icons Sharp", "Material Icons Sharp", "Micro 5 Charted", "Mochiy Pop P One", "Monofett", "Mukta Mahee", "Mukta Malar", "Mukta Vaani", "Nabla", "Noto Emoji", "Noto Kufi Arabic", "Noto Music", "Noto Nastaliq Urdu", "Noto Rashi Hebrew", "Noto Sans Adlam", "Noto Sans Adlam Unjoined", "Noto Sans Anatolian Hieroglyphs", "Noto Sans Arabic", "Noto Sans Armenian", "Noto Sans Avestan", "Noto Sans Balinese", "Noto Sans Bamum", "Noto Sans Bassa Vah", "Noto Sans Batak", "Noto Sans Bengali", "Noto Sans Bhaiksuki", "Noto Sans Brahmi", "Noto Sans Buginese", "Noto Sans Buhid", "Noto Sans Canadian Aboriginal", "Noto Sans Carian", "Noto Sans Caucasian Albanian", "Noto Sans Chakma", "Noto Sans Cham", "Noto Sans Cherokee", "Noto Sans Chorasmian", "Noto Sans Coptic", "Noto Sans Cuneiform", "Noto Sans Cypriot", "Noto Sans Cypro Minoan", "Noto Sans Deseret", "Noto Sans Devanagari", "Noto Sans Display", "Noto Sans Duployan", "Noto Sans Egyptian Hieroglyphs", "Noto Sans Elbasan", "Noto Sans Elymaic", "Noto Sans Ethiopic", "Noto Sans Georgian", "Noto Sans Glagolitic", "Noto Sans Gothic", "Noto Sans Grantha"];

  fonts = data.items.filter(item => !excludedFonts.includes(item.family));

  renderFonts();
}

function getFontsForPage(page) {
  const start = (page - 1) * fontsPerPage;
  const end = start + fontsPerPage;
  return fonts.slice(start, end);
}

function renderFonts(text = "Preview Text") {
  container.innerHTML = "";

  const currentFonts = getFontsForPage(currentPage);
  currentFonts.forEach(font => {
    // console.log(font);
    const fontName = font.family;
    const fontLink = document.createElement("link");
    fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}&display=swap`;
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    const card = document.createElement("div");
    card.className = "font-card";
    card.style.fontFamily = `'${fontName}', sans-serif`;
    card.innerHTML = `
      <p style="font-family: 'Roboto', sans-serif;">${fontName}</p>
      <h2>${text}</h2>
    `;
    container.appendChild(card);
  });

  renderPaginationControls();
}

input.addEventListener("input", (e) => {
  renderFonts(e.target.value);
});

fetchFonts();

function renderPaginationControls() {
  const totalPages = Math.ceil(fonts.length / fontsPerPage);
  const controls = document.getElementById("paginationControls");
  controls.innerHTML = `
    <button ${currentPage === 1 ? "disabled" : ""} onclick="changePage(${currentPage - 1})">Prev</button>
    Page ${currentPage} of ${totalPages}
    <button ${currentPage === totalPages ? "disabled" : ""} onclick="changePage(${currentPage + 1})">Next</button>
  `;
}

function changePage(newPage) {
  currentPage = newPage;
  renderFonts(input.value || "Preview Text");
}