const four = 4;
const filmek = [
  {
    id: 0,
    cim: 'Fur',
    borito: "kep1.webp",
    ertekeles: 5,
    videoid: 'SODvv2xxvgI',
    leiras: [
      "A Fur: An Imaginary Porttrait of Diane Arbus egy 2006-ban bemutatott amerikai romantikus dráma, amelyet Steven Shainberg rendezett és Erin Cressida Wilson írt, Patricia Bosworth Diane Arbus: Életrajz című könyve alapján.",
    ],
    felkapott: true,
    kategoria: ["Életrajzi","Dráma"],
  },
  {
    id: 1,
    cim: 'Nine',
    borito: "kep2.webp",
    ertekeles: 4,
    videoid: 'cSAmAP_yWpY',
    leiras: [
      "A Kilenc egy 2009-es romantikus zenés drámafilm, amelyet Rob Marshall rendezett és társproducerként Michael Tolkin és Anthony Minghella forgatókönyve alapján, az azonos nevű színpadi musical alapján, amely viszont az 1963-as 8½ című filmen alapul.",
    ],
    felkapott: true,
    kategoria: ["Zenés", "Dráma"],
  },
  {
    id: 2,
    cim: 'Stoker',
    borito: "kep3.webp",
    ertekeles: 5,
    videoid: 'YJWrXKoTpL0',
    leiras: [
      "A Vonzások 2013-ban bemutatott brit-amerikai filmthriller, melyet Wentworth Miller forgatókönyvéből Pak Cshanuk rendezett. A főbb szerepekben Nicole Kidman, Matthew Goode és Mia Wasikowska látható.",
    ],
    felkapott: true,
    kategoria: ["Thriller", "Dráma"],
  },
];

const tisztaKategoriak = []

// életrajzi,dráma,thriller,zenés

//1. feladat
//A filmek tömbben lévő elemek kategóriái szerint az id="menu" elemet töltsük fel gombokkal, 
//aminek az értékei a kategória.

document.addEventListener('DOMContentLoaded',(event) => {
  kategoriaTombLetrehoz()
  kattintasGombaEsemeny()
  keresEsemeny()
  visszaGomb()
  video()
  
})


function kategoriaTombLetrehoz(){ // létrehozzuk a kategóriák tömböt hogy később végig tudjunk rajta iterálni

  const kategoriakTomb = filmek.map((kategoria) => {
    return kategoria.kategoria
  })

  const flatTomb = kategoriakTomb.flat(Infinity)
  //console.log(flatTomb) // itt tettük egyszintűvé a kategóriák egyesített tömbét

  const elsoSet = new Set()

  flatTomb.forEach((elem) => { // itt az ismétlódést kivettük
    elsoSet.add(elem)
  })
  //console.log(elsoSet)

  elsoSet.forEach((elem) => {
    tisztaKategoriak.push(elem) //beleraktum egy tömbbe a szűrt 4 db kategóriát
  })

  menuLetrehoz()

}

function menuLetrehoz() {
  const menu = document.querySelector('#menu')

  tisztaKategoriak.forEach((kategoria) => { // végig megyünk a kategóra tömbbön, és létrehozzuk a menü gombokat

    const button = document.createElement('button')
    button.textContent = kategoria
    button.classList = ('buttons')
    menu.append(button)
  })
  kategoriaKartyaLetrehoz()
  
}

/* 2. feladat
A filmek tömb alapján jelenítsük meg a filmek kártyáit kategárióba rendezve
például:
Romantikus
film_kartya1, film_kartya2

Vígjáték
film_kartya3, film_kartya4*/

function kategoriaKartyaLetrehoz() { //kártyák kiirása kategóriák szerint a fő oldalon
  const filmBox = document.querySelector('#filmek')

    tisztaKategoriak.forEach((kategoria) => { //kategória tömbje, mely alapján kreálja a kategória elemeket html-ben
      const kategoriaNev = document.createElement('h3')
      kategoriaNev.textContent = kategoria
      filmBox.append(kategoriaNev)
      const kategoriaBox = document.createElement('div')
      kategoriaBox.classList = ('kategoria')
      filmBox.append(kategoriaBox)
      console.log(kategoria)
      filmKartyaLetrehoz(kategoria,kategoriaBox) // megkell hívni a fgv-t és átadni az aktuális műfajt és azt a kategóriaboxot amibe mi belerakjuk

  })

}


  function filmKartyaLetrehoz(mufaj,kategoriaBox) { //filmkártya létrehozása
    //console.log(mufaj)
    //const filmBox = document.querySelector('#filmek')
     //console.log(mufaj)
    //console.log(kategoriaBox)
    console.log(mufaj)
    filmek.forEach((film) => {
      if(film.kategoria.includes(mufaj) ){
        //console.log('beléptem')
        const filmKartya = document.createElement('div')
        filmKartya.classList = ('kartya')
        const h4 = document.createElement('h4')
        const img = document.createElement('img')
        h4.textContent = film.cim
        img.src = 'images/' + film.borito
        filmKartya.append(h4,img)
        kategoriaBox.append(filmKartya)
        console.log(filmKartya)

      
      }
    })

  }
    

/*4. Ha a menüben lévő gombra kattintunk jelenítsük meg azokat a filmeket, aminek a
kategóriája megfelel a filmnek*/

function kattintasGombaEsemeny() { //gombokra kattintás eseményt kell rakni, hogy kategórák szerint szűrjön

  const gombok = document.querySelectorAll('.buttons')
  const filmBox = document.querySelector('#filmek')

  gombok.forEach((gomb) =>{
    
    gomb.addEventListener('click',(event) =>{

      const szoveg = event.target.textContent //kiszedtük a gombok szövegét ami a film kategóriája,műfaja
      filmBox.innerHTML = '' //kitörlünk mindent, a helyes megjelenítés miatt
      filmek.forEach(elem => {
        if(elem.kategoria.includes(szoveg)){ //ha a filmek tömb kategóriái között ott szerepel a gomb szövege akkor
          const kategoriaBox = document.createElement('div')
          kategoriaBox.classList.add('kategoria');
          filmKartyaLetrehoz(szoveg,kategoriaBox) // átvisszük a műfajt, és a div-et amibe pakoljuk
          filmBox.innerHTML = ''
          filmBox.appendChild(kategoriaBox) //megjelenít
          video()
        }
        
      })

    })

  })
}

function keresEsemeny() { //eltároljuk a keresés input értékét
  const input = document.querySelector('#keres')
  const button = document.querySelector('#kereses')
  let szo = ""

  //console.log(input.value) input értékének lekérése
  input.addEventListener("input", (event) => {
    szo = event.target.value
   
  });// itt kell esemény kezelőt adni az inputnak

  button.addEventListener('click',(event) => {
    keresSzo(szo) //átvisszük az input értéket
  })

}

function keresSzo(szo) { // itt kezeljük le az input értéket
  
  const filmBox = document.querySelector('#filmek')

  let nagybetusSzo = szo.charAt(0).toUpperCase() + szo.slice(1).toLowerCase(); //az input érték 1.karaktere nagy a többi kicsi
 
      if (nagybetusSzo.length >= 3) { // ha az input értéke nagyobb vagy egyenlő 3 karakternél
        const talalatok = filmek.filter(film => film.cim.startsWith(nagybetusSzo)); // megvizsgáljuk benne van-e a filmek címében ez az érték
        console.log('beléptem')

        if(talalatok.length == 0){ // ha nincs benne
            filmBox.innerHTML = ''
            const szoveg = document.createElement('p')
            szoveg.textContent = 'Nincs találat!  :('
            filmBox.append(szoveg)
            console.log('ide is')

        }
        if(talalatok.length != 0){ // ha benne van
            megjelenit(talalatok);

        }

      }else{ // ha az input értéke kisebb mint 3 karakter
        filmBox.innerHTML = ''
        const szoveg = document.createElement('p')
        szoveg.textContent = 'Nincs találat!  :('
        filmBox.append(szoveg)
        console.log('ide is')
    }
    
}

function megjelenit(talalatTomb) { // találat megjelenítése
  const filmBox = document.querySelector('#filmek')
  filmBox.innerHTML = ""
  
  talalatTomb.forEach(talalat => {
    const kategoriaNev = document.createElement('h3')
    kategoriaNev.textContent = "Talalatok"
    filmBox.append(kategoriaNev)
    const kategoriaBox = document.createElement('div')
    kategoriaBox.classList = ('kategoria')
    filmBox.append(kategoriaBox)
    const filmKartya = document.createElement('div')
    filmKartya.classList = ('kartya')
    const h4 = document.createElement('h4')
    const img = document.createElement('img')
    h4.textContent = talalat.cim
    img.src = 'images/' + talalat.borito
    filmKartya.append(h4,img)
    kategoriaBox.append(filmKartya)
    video()
 
  });

}

function visszaGomb() {
  const szuroBox = document.querySelector('#szuro')
  const button = document.createElement('button')
  const img = document.createElement('img')

  img.src = 'images/left.svg'
  img.id = 'left'
  button.append(img)
  szuroBox.append(button)

  button.addEventListener('click', (event) => {
    location.reload();

  })

}

function video() { //video, leírás, szövegek beillesztése a megfelelő filmekhez
  const filmBox = document.querySelector('#filmek')
  const filmKartya = document.querySelectorAll('.kartya')

  filmKartya.forEach(kartya => {
    kartya.addEventListener('click',(event) => {
      const cim = event.currentTarget.textContent.trim() //elmentettük a címet a kártyának
      console.log(cim)
      megjelenVideo(cim)

    })
  
  });

  
}

function megjelenVideo(filmCim) {
  const filmKartya = document.querySelectorAll('.kartya')
  const filmBox = document.querySelector('#filmek')
  //console.log(filmCim) átvittük a film címét

  filmek.forEach(elem => {

    const {videoid,cim,leiras,borito} = elem

    if(cim.includes(filmCim)){
      filmBox.innerHTML = `<div class = 'kontener'><div class = 'holder'><h4 class = 'cim'>${cim}</h4>
                            <div class = 'box'><img src = 'images/${borito}' ></img>
                            <p class = 'szoveg'>${leiras}</p></div>
                            <div><iframe width="620" height="545" src="https://www.youtube.com/embed/${videoid}?autoplay=1&mute=1">
                            </iframe></div>
                            </div>
                            </div>`


    }
    
  });
  
}
  