// install node, pdfkit

const PDFDocument = require("pdfkit");

// Etap 1: rozmiar, metadane
const doc = new PDFDocument({size: "B5", margins: {top: 72, bottom: 72, left: 72, right: 42}});
doc.info.Author = "Filip Kaczmarek";

const fs = require("fs");
doc.pipe(fs.createWriteStream("./zse.pdf"));

// Etap 2: nagłówek
doc.registerFont("lato", "./assets/Lato-Regular.ttf");
doc.registerFont("lato-bold", "./assets/Lato-Bold.ttf");
doc.font("lato-bold", 20).text("Zespół Szkół Elektrycznych", {align: "right"});
doc.font("lato", 16).text("4Tp Kaczmarek Filip", 270);

// Etap 3: obraz
doc.image("./assets/zse-logo.png", 25, 25, {width: doc.page.width * 0.3, align: 'left'});

// Etap 4: lista
doc.font("lato-bold", 10).text("Znane mi technologie Web: ", 140, 180, {underline: true});
doc.font("lato", 10).list(["HTML5, CSS3, ES6", "Joomla, Wordpress, PrestaShop", "Node.js i React"], {bulletRadius: 1.5, textIndent: 16});

/* Etap 5: odnośnik (Z tego co wyczytałem, w PDFKit nie ma opcji dodawania hiperłącza do elementu listy,
                    dlatego zrobiłem link jako nowy tekst pod listą) */
doc.font("lato-bold", 10).fillColor('blue').text("Aby dowiedzieć się więcej kliknij tutaj", {underline: true, link: "https://google.pl/"});

doc.end();
