import { Language } from "./enums.js";

class Translator {
  #translations = new Map();

  initialTranslate() {
    const language = localStorage.getItem("lang");

    if (!language || language === Language.English) return;

    if (!this.#translations.has(language)) this.loadTranslations(language);

    this.translateDocument(language);
  }

  translateWord(wordId, language) {
    if (!this.#translations.has(language)) this.loadTranslations(language);

    return this.#translations.get(language).get(wordId);
  }

  translateAllWords(wordIds, language) {
    let wordsTranslated = [];

    if (!this.#translations.has(language)) this.loadTranslations(language);

    wordIds.forEach((id) => {
      wordsTranslated.push(this.#translations.get(language).get(id));
    });

    return wordsTranslated;
  }

  translate(language) {
    let storedLanguage = localStorage.getItem("lang") ?? Language.English;

    if (language === storedLanguage) return;

    if (!this.#translations.has(language)) this.loadTranslations(language);

    localStorage.lang = language;

    this.translateDocument(language);

    document.documentElement.lang = language;
  }

  translateDocument(language) {
    let translatableElements = document.querySelectorAll("[data-translatable]");

    for (let i = 0; i < translatableElements.length; i++) {
      let translatableElement = translatableElements[i];
      translatableElement.innerHTML = this.#translations
        .get(language)
        .get(translatableElement.dataset.translatable);
    }
  }

  /**
   * Load translations for a specific language and sets active language.
   * @param {string} language Language to load translations for. Unknown will fall back to English.
   */
  loadTranslations(language) {
    switch (language) {
      case Language.English:
      default:
        this.#translations.set(Language.English, this.getEnglishTranslations());

        return;
      case Language.Dutch:
        this.#translations.set(Language.Dutch, this.getDutchTranslations());

        return;
      case Language.French:
        this.#translations.set(Language.French, this.getFrenchTranslations());

        return;
      case Language.German:
        this.#translations.set(Language.German, this.getGermanTranslations());

        return;
    }
  }

  getActiveLanguage() {
    return localStorage.getItem("lang") ?? Language.English;
  }

  getEnglishTranslations() {
    return new Map()
      .set("settingsUpdated", "Settings updated!")
      .set("settingsReverted", "Reverted setting changes!")
      .set("tab", "Adri's cat tree")
      .set("about", "About")
      .set("projects", "Projects")
      .set("configurator", "Configurator")
      .set("theme", "Theme")
      .set("language", "Language")
      .set("hi", "Hi :3")
      .set("iAmA", "I am a ")
      .set("yearOldDutch", "-year-old Dutch")
      .set("softwareEngineer", "Software Engineer")
      .set("catCuddler", "Cat Cuddler")
      .set("cloudEngineer", "Cloud Engineer")
      .set("pentester", "Pentester")
      .set("belgiumCats", " from Belgium. I like cats.")
      .set("interests", "Interests")
      .set("problemSolving", "Problem Solving")
      .set("greenTech", "Green Tech")
      .set("cats", "Cats")
      .set("cybersecurity", "Cybersecurity")
      .set("neuroscience", "Neuroscience")
      .set("bores", "Bores")
      .set("politics", "Politics")
      .set("influencers", "Influencers")
      .set("aISlop", "AI Slop")
      .set("cryptocurrency", "Cryptocurrency")
      .set("techGigantism", "Tech Gigantism")
      .set("environment", "Environment")
      .set("sport", "Sport")
      .set("computer", "Computer")
      .set("petsCats", "Pets (cats)")
      .set("travel", "Travel")
      .set("software", "Software")
      .set("humans", "Humans")
      .set(
        "humansText",
        "We are without a doubt the worst thing that has ever happened to this planet. I therefore try my best to minimise what negative impact I cause and <b>you</b> can (and should) do it too.",
      )
      .set("transport", "Transportation")
      .set(
        "transportText",
        "Cars are probably the worst form of transporation. I either go by foot or bike when doing so would take 1 hour at the most, otherwise I use public transportation. Using a car should be a <b>last resort</b>.",
      )
      .set("products", "Products")
      .set(
        "productsText",
        'When buying anything, price is important but it should not take prescedence over <b>durability, quality and sustainability</b>. Unless the alternatives to "bad products" are significally more expensive (2x or more) I tend to go with the most eco-friendly products.',
      )
      .set("karate", "Karate")
      .set(
        "karateText",
        "Pretty much the only sport I do practice (I sometimes teach too). I am currently graded <b>black belt</b>. (did you know there are 8 grades (dan grades) after black belt?)",
      )
      .set("fitness", "Fitness?")
      .set(
        "fitnessText",
        "Ew no. I do not get some primordial thrill from showing off to other people. Furthermore, the stench of sweat and deodorant overuse is abhorrent to my senses. I do a little workout at home and try to get some daily steps in.",
      )
      .set("machine", '"The computer/laptop"')
      .set(
        "machineText",
        "There are not many brands I endorse. The most popular brands are the cheapest but they are also the worst in terms of repairability, upgradability, customisation and sometimes even durability. The computers I buy and like are either entirely <b>custom</b>, built by me or a certified company. An official brand I do like a lot is <b>Framework</b> (you should really check it out). At last I also like mini-pcs, simply because that way I can choose (and replace) the keyboard, screen and maybe even a battery.",
      )
      .set("oS", "Operating system")
      .set(
        "oSText",
        "I like <b>GNU/Linux</b>. I do not want Windows to know what I do on my device nor do I want to sell my soul to Apple and use a mediocore operating system (MacOS) that completely violates what it was built on (Unix). Usually I try to buy my machine without operating system installed but that is often not possible, in which case I wipe it clean and install a Linux distro on it as soon as it is shipped to my residence.",
      )
      .set("cats", "Cats")
      .set(
        "catsText",
        "I like all <b>felines</b>, both tiny, normal and large. My favourite colour for a house cat is full black. In the unfortunate event you meet me and you have a cat, it will probably pick me as favourite human :3. Ps, fun cat fact: The bombay is a full black cat usually accompanied by orange eyes, meow meow.",
      )
      .set("onlyCats", "Only cats?")
      .set(
        "onlyCatsText",
        "Well... in a sense. I don't dislike dogs but I will never consider them pets as I have experienced two <b>traumatic events involving dogs</b> (sorry). I would like to perhaps alter my perception of dogs though. I do like foxes, wolves, red pandas, raccoons, otters, ravens and crows as well but they ought not to be kept as pets.",
      )
      .set("inShort", "In short")
      .set(
        "inShortText",
        "I like discovering and experiencing to me yet unknown <b>cultures, vegetation (or countries as a whole)</b>. I try to make my trips <b>active and surrounded in nature with a city trip</b> every now and then. I have a soft spot for <b>nordic countries</b> and I prefer not to go warm countries.",
      )
      .set("destinations", "Destinations")
      .set(
        "destinationsText",
        "I love Sweden, Norway, Finland and Denmark. I would love to go Japan, South-Korea, Thailand and Canada and maybe Australia/NZ (when it's winter there).",
      )
      .set("inGeneral", "In general")
      .set(
        "inGeneralText",
        "I think all software should be <b>free</b>. Companies willing to make money out of it should not do so by restricting access to features, or the product itself, especially since the use of AI is turning most new projects into insecure AI slop. Instead companies that wish to make money this way should do so in one or more of the following ways:",
      )
      .set(
        "inGeneralText0",
        "<li>SaaS (hosting costs)</li><li>Support</li><li>Customisation affecting <b>only</b> appearance (colour themes/font/...)</li>",
      )
      .set("openSource", "Open source")
      .set(
        "openSourceText",
        "Software I use and make (and sometimes contribute to) is almost exclusively open source. I try to get more people to <b>use OSS and appreciate FOSS</b> as a whole. A few examples are Zed instead of Jetbrains, LibreOffice instead of MS Office, Matrix instead of Teams... the list goes on. I have adopted a few people to the world of FOSS at university and even my mum uses GNU/Linux now!",
      )
      .set("adriTemplater", "A simple templating engine written in Python")
      .set("adribot", "A discord bot written in C#")
      .set(
        "websiteText",
        "A website using HTML, CSS and JS. Absolutely no framework bloat. TailwindCSS for style compilation.",
      )
      .set("someFriends", "Some friends")
      .set("you", "You?")
      .set(
        "couldBeYou",
        "This could be you (or I just forgot you), in any case, if you want to be on here, contact me using any method in the website footer.",
      )
      .set("utils", "Utilities")
      .set("rng", "Random number generator")
      .set("rngText", "Generates a number between two integers.")
      .set("lowerBound", "Lower bound (inclusive)")
      .set("upperBound", "Upper bound (inclusive)")
      .set("generate", "Generate!")
      .set("lower<Upper", "Lower number must be smaller than upper number")
      .set(
        "lower>Limit",
        `Lower value must be a number bigger or equal to <b>${Number.MIN_SAFE_INTEGER}</b>`,
      )
      .set(
        "bigger<Limit",
        `Upper value must be a number smaller or equal to <b>${Number.MAX_SAFE_INTEGER}</b>`,
      )
      .set("blackBeauty", "My queen of darkness")
      .set("emojiful", "Emojiful datapack generator")
      .set("emojifulText", "Transforms discord's frontend HTML into \"Emojiful\" datapacks.")
      .set("missingDateEvent", "Pick the last \"What\" if you prefer to be surprised :3")
      .set("missingDateDate", "I have yet to master telepathy, in the meantime, set a date :3")
      .set("invalidDateDate", "Time traveling is not my strong suit unfortunately")
      .set("missingDateLocation", "The nothingness? Pick a place in the observable universe :3")
      .set("hingeNotice", "Please do <b>not</b> share this site, it is for your eyes only :)")
      .set("hingeNotice0", "What you send here is only ever <b>seen by you</b> (and me when you send me the code at the end)")
      .set("hingeNotice1", "I only included options I would say yes to, so no wrong answers are possible ^.^")
      .set("what", "What")
      .set("where", "Where")
      .set("when", "When")
      .set("extraNote", "Extra note (optional):")
      .set("extraNote0", "Note:")
      .set("whereInstruction", "Ideally pick a location that is not too far for either of us. Cities are usually a good idea due to accessibility and abundance of facilities. Pinned on the map here is <b>Hasselt</b>. While I do not limit myself to it, it is still my closest city.")
      .set("location", "Location:")
      .set("noon", "Noon")
      .set("afternoon", "Afternoon")
      .set("evening", "Evening")
      .set("whenInstruction", "I usually comply with date requests (noon-evening) in the weekend :). On weekdays, evenings <b>may</b> work, depending on distance.")
      .set("done", "All done :)")
      .set("hingeReview", "Send me the code below through Hinge or somewhere else (see bottom right corner :) ).")
      .set("hingeReview0", "I will review it ASAP. When approved, I shall send you specific location and time ^.^ .")
      .set("event", "Event:")
      .set("date", "Date:")
      .set("time", "Time:")
      .set("cafe", "drinks")
      .set("resto", "food")
      .set("park", "park/nature")
      .set("museum", "cultural/artistic")
      .set("mystery", "mystery");
  }

  getDutchTranslations() {
    return new Map()
      .set("settingsUpdated", "Instellingen bijgewerkt!")
      .set("settingsReverted", "Instellingenwijzigingen teruggedraaid!")
      .set("tab", "Adri's kattentoren")
      .set("about", "Over")
      .set("projects", "Projecten")
      .set("configurator", "Configurator")
      .set("theme", "Thema")
      .set("language", "Taal")
      .set("hi", "Hey :3")
      .set("iAmA", "Ik ben een ")
      .set("yearOldDutch", "-jarige Nederlandse")
      .set("softwareEngineer", "Software Engineer")
      .set("catCuddler", "Kat knuffelaar")
      .set("cloudEngineer", "Cloud Engineer")
      .set("pentester", "Pentester")
      .set("belgiumCats", " uit België. Ik hou van katten.")
      .set("interests", "Interesses")
      .set("problemSolving", "Probleemoplossing")
      .set("greenTech", "Groene Technologie")
      .set("cats", "Katten")
      .set("cybersecurity", "Cybersecurity")
      .set("neuroscience", "Neurowetenschappen")
      .set("bores", "Saaiheid")
      .set("politics", "Politiek")
      .set("influencers", "Invloedrijke personen")
      .set("aISlop", "AI Slop")
      .set("cryptocurrency", "Cryptocurrency")
      .set("techGigantism", "Technologisch Gigantisme")
      .set("environment", "Omgeving")
      .set("sport", "Sport")
      .set("computer", "Computer")
      .set("petsCats", "Huisdieren (katten)")
      .set("travel", "Reizen")
      .set("software", "Software")
      .set("humans", "Mensen")
      .set(
        "humansText",
        "We zijn zonder twijfel het slechtste wat ooit met deze planeet is gebeurd. Daarom doe ik mijn best om mijn negatieve impact te minimaliseren en <b>jij</b> kunt (en zou) dat ook moeten doen.",
      )
      .set("transport", "Vervoer")
      .set(
        "transportText",
        "Auto's zijn waarschijnlijk de slechtste vorm van vervoer. Ik ga te voet of met de fiets als dat maximaal 1 uur duurt, anders gebruik ik openbaar vervoer. Het gebruik van een auto zou een <b>laatste redmiddel</b> moeten zijn.",
      )
      .set("products", "Producten")
      .set(
        "productsText",
        'Bij het kopen van iets is de prijs belangrijk, maar deze mag niet boven <b>duurzaamheid, kwaliteit en milieuvriendelijkheid</b> gaan. Tenzij de alternatieven voor "slechte producten" significant duurder zijn (2x of meer), ga ik meestal voor de meest milieuvriendelijke producten.',
      )
      .set("karate", "Karate")
      .set(
        "karateText",
        "Vrijwel de enige sport die ik beoefen (ik geef soms ook les). Ik ben momenteel <b>zwarte band</b>. (wist je dat er 8 graden (dan-graden) zijn na de zwarte band?)",
      )
      .set("fitness", "Fitness?")
      .set(
        "fitnessText",
        "Ieuw nee. Ik krijg geen primitieve opwinding van het flexen voor andere mensen. Bovendien is de stank van zweet en overmatig gebruik van deodorant weerzinwekkend voor mijn zintuigen. Ik doe een beetje training thuis en probeer elke dag wat stappen te zetten.",
      )
      .set("machine", '"De computer/laptop"')
      .set(
        "machineText",
        "Er zijn niet veel merken die ik aanbeveel. De populairste merken zijn de goedkoopste, maar ze zijn ook het slechtste wat betreft repareerbaarheid, uitbreidbaarheid, personalisatie en soms zelfs duurzaamheid. De computers die ik koop en leuk vind zijn ofwel volledig <b>op maat</b>, gebouwd door mij of een gecertificeerd bedrijf. Een officieel merk dat ik heel leuk vind is <b>Framework</b> (je moet het echt bekijken). Tot slot hou ik ook van mini-pc's, simpelweg omdat ik zo het toetsenbord, scherm en misschien zelfs een batterij kan kiezen (en vervangen).",
      )
      .set("oS", "Besturingssysteem")
      .set(
        "oSText",
        "Ik hou van <b>GNU/Linux</b>. Ik wil niet dat Windows weet wat ik op mijn apparaat doe, noch wil ik mijn ziel verkopen aan Apple en een middelmatig besturingssysteem (MacOS) gebruiken dat volledig in strijd is met wat het gebouwd was (Unix). Gewoonlijk probeer ik mijn machine zonder besturingssysteem te kopen, maar dat is vaak niet mogelijk, in welk geval ik het schoonmaak en zo snel mogelijk een Linux-distributie installeer zodra het bij mij thuis komt.",
      )
      .set("cats", "Katten")
      .set(
        "catsText",
        "Ik hou van alle <b>katachtigen</b>, zowel kleine, normale als grote. Mijn favoriete kleur voor een huiskat is volledig zwart. In het ongelukkige geval dat je me ontmoet en je hebt een kat, zal het me waarschijnlijk als favoriete mens kiezen :3. Ps, leuk kattenfeit: De Bombay is een volledig zwarte kat die meestal wordt vergezeld door oranje ogen, miauw miauw.",
      )
      .set("onlyCats", "Alleen katten?")
      .set(
        "onlyCatsText",
        "Nou... in zekere zin. Ik heb niets tegen honden, maar ik zal ze nooit als huisdieren beschouwen omdat ik twee <b>traumatische gebeurtenissen met honden</b> heb meegemaakt (sorry). Ik zou misschien mijn perceptie van honden willen veranderen. Ik hou echter van vossen, wolven, rode panda's, wasberen, otters, raven en kraaien, maar die zouden niet als huisdieren moeten worden gehouden.",
      )
      .set("inShort", "Kortom")
      .set(
        "inShortText",
        "Ik hou ervan om te ontdekken en te ervaren wat voor mij nog onbekende <b>culturen, vegetatie (of landen als geheel)</b> zijn. Ik probeer mijn reizen <b>actief en omringd door de natuur te maken met af en toe een citytrip</b>. Ik heb een zwak voor <b>Noordse landen</b> en ik geef er de voorkeur aan om niet naar warme landen te gaan.",
      )
      .set("destinations", "Bestemmingen")
      .set(
        "destinationsText",
        "Ik hou van Zweden, Noorwegen, Finland en Denemarken. Ik zou graag naar Japan, Zuid-Korea, Thailand en Canada gaan en misschien Australië/NZ (wanneer het daar winter is).",
      )
      .set("inGeneral", "In het algemeen")
      .set(
        "inGeneralText",
        "Ik denk dat alle software <b>gratis</b> moet zijn. Bedrijven die er geld mee willen verdienen zouden dit niet mogen doen door de toegang tot functies of het product zelf te beperken. Zeker nu het gebruik van AI de meeste nieuwe projecten in onveilige AI-slop verandert. In plaats daarvan zouden bedrijven die op deze manier geld willen verdienen, dit op een of meer van de volgende manieren moeten doen:",
      )
      .set(
        "inGeneralText0",
        "<li>SaaS (hostingkosten)</li><li>Ondersteuning</li><li>Personalisatie die <b>alleen</b> uiterlijk beïnvloedt (kleurthema's/lettertypes/...)</li>",
      )
      .set("openSource", "Open source")
      .set(
        "openSourceText",
        "Software die ik gebruik en maak (en soms aan bijdraag) is bijna uitsluitend open source. Ik probeer meer mensen <b>OSS te laten gebruiken en FOSS als geheel te waarderen</b>. Enkele voorbeelden zijn Zed in plaats van Jetbrains, LibreOffice in plaats van MS Office, Matrix in plaats van Teams... de lijst gaat maar door. Ik heb een paar mensen van de universiteit in de wereld van FOSS gebracht en zelfs mijn moeder gebruikt nu GNU/Linux!",
      )
      .set(
        "adriTemplater",
        "Een eenvoudige templating-engine geschreven in Python",
      )
      .set("adribot", "Een discord-bot geschreven in C#")
      .set(
        "websiteText",
        "Een website die HTML, CSS en JS gebruikt. Absoluut geen framework-bloating. TailwindCSS voor stijlcompilatie.",
      )
      .set("someFriends", "Enkele vrienden")
      .set("you", "Jij?")
      .set(
        "couldBeYou",
        "Dit zou jij kunnen zijn (of ik ben je gewoon vergeten), maar als je hier wilt staan, neem dan contact met me op via een van de methoden die je onderaan de website vindt.",
      )
      .set("utils", "Nuttigheden")
      .set("rng", "Willekeurige getallengenerator")
      .set("rngText", "Genereert een getal tussen twee gehele getallen.")
      .set("lowerBound", "Ondergrens (inclusief)")
      .set("upperBound", "Bovengrens (inclusief)")
      .set("generate", "Genereer!")
      .set("lower<Upper", "Lagere nummer moet kleiner zijn dan hogere nummer")
      .set(
        "lower>Limit",
        `Lagere waarde moet een getal zijn dat groter of gelijk is aan <b>${Number.MIN_SAFE_INTEGER}</b>`,
      )
      .set(
        "bigger<Limit",
        `Hogere waarde moet een getal zijn dat kleiner of gelijk is aan <b>${Number.MAX_SAFE_INTEGER}</b>`,
      )
      .set("blackBeauty", "Mijn koningin van de duisternis")
      .set("emojiful", "Emojiful-datapakketgenerator")
      .set("emojifulText", "Zet de HTML van de Discord-frontend om in \"Emojiful\"-datapakketten")
      .set("missingDateEvent", "Kies de laatste \"Wat\" als je liever verrast wordt :3")
      .set("missingDateDate", "Ik heb nog geen telepathie onder de knie, stel ondertussen maar een datum in :3")
      .set("invalidDateDate", "Tijdreizen is helaas niet mijn sterkste kant")
      .set("missingDateLocation", "Het niets? Kies een plek in het waarneembare universum :3")
      .set("hingeNotice", "Deel deze site alsjeblieft <b>niet</b>, deze is alleen voor jouw ogen bestemd :)")
      .set("hingeNotice0", "Wat je hier stuurt wordt alleen ooit door <b>jou</b> gezien (en door mij als je me de code aan het einde stuurt)")
      .set("hingeNotice1", "Ik heb alleen opties toegevoegd waar ik ja tegen zou zeggen, dus foute antwoorden zijn niet mogelijk ^.^")
      .set("what", "Wat")
      .set("where", "Waar")
      .set("when", "Wanneer")
      .set("extraNote", "Extra notitie (optioneel):")
      .set("extraNote0", "Notitie:")
      .set("whereInstruction", "Kies idealiter een locatie die voor ons allebei niet te ver weg is. Steden zijn meestal een goed idee vanwege bereikbaarheid en het overaanbod aan faciliteiten. Hier op de kaart gepind staat <b>Hasselt</b>. Hoewel ik me er niet toe beperk, is het nog steeds mijn dichtstbijzijnde stad.")
      .set("location", "Locatie:")
      .set("noon", "Middag")
      .set("afternoon", "Namiddag")
      .set("evening", "Avond")
      .set("whenInstruction", "Ik ga meestal akkoord met date-verzoeken (middag-avond) in het weekend :). Op weekdagen kunnen avonden <b>mogelijk</b> werken, afhankelijk van de afstand.")
      .set("done", "Helemaal klaar :)")
      .set("hingeReview", "Stuur me de onderstaande code via Hinge of ergens anders (zie rechtsonder :) ).")
      .set("hingeReview0", "Ik bekijk hem zo snel mogelijk. Zodra goedgekeurd, stuur ik je een specifieke locatie en tijd ^.^ .")
      .set("event", "Activiteit:")
      .set("date", "Datum:")
      .set("time", "Tijd:")
      .set("cafe", "drankjes")
      .set("resto", "eten")
      .set("park", "park/natuur")
      .set("museum", "cultureel/kunst")
      .set("mystery", "mysterie");
  }

  getFrenchTranslations() {
    return new Map()
      .set("settingsUpdated", "Paramètres mis à jour!")
      .set("settingsReverted", "Modifications des paramètres annulées!")
      .set("tab", "L'arbre à chats d'Adri")
      .set("about", "À propos")
      .set("projects", "Projets")
      .set("configurator", "Configurateur")
      .set("theme", "Thème")
      .set("language", "Langue")
      .set("hi", "Salut :3")
      .set("iAmA", "Je suis un ")
      .set("yearOldDutch", "-ans néerlandais")
      .set("softwareEngineer", "Ingénieur logiciel")
      .set("catCuddler", "Câlineur de chats")
      .set("cloudEngineer", "Ingénieur cloud")
      .set("pentester", "Pentesteur")
      .set("belgiumCats", " de Belgique. J'aime les chats.")
      .set("interests", "Intérêts")
      .set("problemSolving", "Résolution de problèmes")
      .set("greenTech", "Technologie verte")
      .set("cats", "Chats")
      .set("cybersecurity", "Cybersécurité")
      .set("neuroscience", "Neurosciences")
      .set("bores", "Ennuies")
      .set("politics", "Politique")
      .set("influencers", "Influenceurs")
      .set("aISlop", "AI Slop")
      .set("cryptocurrency", "Cryptomonnaie")
      .set("techGigantism", "Géantisme technologique")
      .set("environment", "Environnement")
      .set("sport", "Sport")
      .set("computer", "Ordinateur")
      .set("petsCats", "Animaux de compagnie (chats)")
      .set("travel", "Voyages")
      .set("software", "Logiciel")
      .set("humans", "Humains")
      .set(
        "humansText",
        "Nous sommes sans aucun doute la pire chose qui soit jamais arrivée à cette planète. J'essaie donc de minimiser l'impact négatif que je cause et <b>vous</b> pouvez (et devriez) le faire aussi.",
      )
      .set("transport", "Transport")
      .set(
        "transportText",
        "Les voitures sont probablement la pire forme de transport. Je marche ou fais du vélo si cela prend au maximum 1 heure, sinon j'utilise les transports en commun. Utiliser une voiture devrait être un <b>dernier recours</b>.",
      )
      .set("products", "Produits")
      .set(
        "productsText",
        'Lorsque j\'achète quelque chose, le prix est important, mais il ne doit pas primer sur <b>durabilité, qualité et durabilité</b>. À moins que les alternatives aux "mauvais produits" ne soient significativement plus chères (2x ou plus), je tends à opter pour les produits les plus écologiques.',
      )
      .set("karate", "Karate")
      .set(
        "karateText",
        "Pratiquement le seul sport que je pratique (je donne parfois des cours aussi). Je suis actuellement classé <b>ceinture noire</b>. (saviez-vous qu'il existe 8 grades (grades dan) après la ceinture noire ?)",
      )
      .set("fitness", "Fitness ?")
      .set(
        "fitnessText",
        "Brr non. Je n'éprouve pas de plaisir primitif à me vanter devant d'autres personnes. De plus, l'odeur de la sueur et de l'excès de déodorant est abominable pour mes sens. Je fais un peu d'exercice à la maison et essaie de prendre quelques pas chaque jour.",
      )
      .set("machine", '"L\'ordinateur/laptop"')
      .set(
        "machineText",
        "Il y a peu de marques que je recommande. Les marques les plus populaires sont les moins chères, mais elles sont aussi les pires en termes de réparabilité, d'extensibilité, de personnalisation et parfois même de durabilité. Les ordinateurs que j'achète et que j'aime sont soit entièrement <b>sur mesure</b>, construits par moi ou une entreprise certifiée. Une marque officielle que j'apprécie beaucoup est <b>Framework</b> (vous devriez vraiment le vérifier). Enfin, j'aime aussi les mini-PC, simplement parce que cela me permet de choisir (et de remplacer) le clavier, l'écran et peut-être même une batterie.",
      )
      .set("oS", "Système d'exploitation")
      .set(
        "oSText",
        "J'aime <b>GNU/Linux</b>. Je ne veux pas que Windows sache ce que je fais sur mon appareil, ni vendre mon âme à Apple en utilisant un système d'exploitation médiocre (MacOS) qui viole complètement ce pour quoi il a été conçu (Unix). En général, j'essaie d'acheter ma machine sans système d'exploitation installé, mais cela n'est souvent pas possible, auquel cas je l'efface complètement et installe une distribution Linux sur elle dès qu'elle est livrée chez moi.",
      )
      .set("cats", "Chats")
      .set(
        "catsText",
        "J'aime tous les <b>félins</b>, petits, normaux et grands. Ma couleur préférée pour un chat de maison est entièrement noire. Dans l'éventualité malheureuse où vous me rencontrez et que vous avez un chat, il me choisira probablement comme humain préféré :3. Ps, fait amusant sur les chats : Le Bombay est un chat entièrement noir généralement accompagné d'yeux orange, miaou miaou.",
      )
      .set("onlyCats", "Que des chats ?")
      .set(
        "onlyCatsText",
        "Eh bien... en un sens. Je n'ai rien contre les chiens, mais je ne les considérerai jamais comme des animaux de compagnie car j'ai vécu deux <b>événements traumatisants avec des chiens</b> (désolé). J'aimerais peut-être changer ma perception des chiens. J'aime aussi les renards, les loups, les pandas rouges, les ratons laveurs, les loutres, les corbeaux et les corneilles, mais ils ne devraient pas être gardés comme animaux de compagnie.",
      )
      .set("inShort", "En bref")
      .set(
        "inShortText",
        "J'aime découvrir et vivre des <b>cultures, végétation (ou pays dans leur ensemble)</b> qui m'étaient encore inconnues. J'essaie de rendre mes voyages <b>actifs et entourés par la nature avec une escapade en ville</b> de temps à autre. J'ai un faible pour <b>les pays nordiques</b> et je préfère ne pas aller dans des pays chauds.",
      )
      .set("destinations", "Destinations")
      .set(
        "destinationsText",
        "J'adore la Suède, la Norvège, la Finlande et le Danemark. J'aimerais aller au Japon, en Corée du Sud, en Thaïlande et au Canada, et peut-être en Australie/NZ (quand c'est l'hiver là-bas).",
      )
      .set("inGeneral", "En général")
      .set(
        "inGeneralText",
        "Je pense que tous les logiciels devraient être <b>gratuits</b>. Les entreprises souhaitant en tirer profit ne devraient pas le faire en limitant l'accès aux fonctionnalités, ou au produit lui-même, surtout compte tenu de l'utilisation de l'IA qui transforme la plupart des nouveaux projets en AI slop non sécurisé. Au lieu de cela, les entreprises souhaitant gagner de l'argent de cette manière devraient le faire de l'une ou plusieurs des manières suivantes :",
      )
      .set(
        "inGeneralText0",
        "<li>SaaS (coûts d'hébergement)</li><li>Soutien</li><li>Personnalisation n'affectant que <b>l'apparence</b> (thèmes/couleurs police/...)</li>",
      )
      .set("openSource", "Open source")
      .set(
        "openSourceText",
        "Les logiciels que j'utilise et que je fais (et parfois auxquels je contribue) sont presque exclusivement open source. J'essaie de convaincre plus de gens d'<b>utiliser OSS et d'apprécier FOSS</b> dans son ensemble. Quelques exemples : Zed au lieu de Jetbrains, LibreOffice au lieu de MS Office, Matrix au lieu de Teams... la liste continue. J'ai introduit quelques personnes dans le monde de FOSS à l'université et même ma mère utilise maintenant GNU/Linux !",
      )
      .set("adriTemplater", "Un moteur de templating simple écrit en Python")
      .set("adribot", "Un bot Discord écrit en C#")
      .set(
        "websiteText",
        "Un site web utilisant HTML, CSS et JS. Absolument aucun poids de framework. TailwindCSS pour la compilation de styles.",
      )
      .set("someFriends", "Quelques amis")
      .set("you", "Toi?")
      .set(
        "couldBeYou",
        "Cela pourrait être vous (ou peut-être que je vous ai simplement oublié), dans tous les cas, si vous souhaitez figurer ici, contactez-moi en utilisant l'une des méthodes indiquées en bas de page du site web.",
      )
      .set("utils", "Utilitaires")
      .set("rng", "Générateur de nombres aléatoires")
      .set("rngText", "Génère un nombre entre deux entiers.")
      .set("lowerBound", "Borne inférieure (inclusive)")
      .set("upperBound", "Borne supérieure (inclusive)")
      .set("generate", "Générez!")
      .set(
        "lower<Upper",
        "Le nombre inférieur doit être plus petit que le nombre supérieur",
      )
      .set(
        "lower>Limit",
        `La valeur inférieure doit être un nombre supérieur ou égal à <b>${Number.MIN_SAFE_INTEGER}</b>`,
      )
      .set(
        "bigger<Limit",
        `La valeur supérieure doit être un nombre inférieur ou égal à <b>${Number.MAX_SAFE_INTEGER}</b>`,
      )
      .set("blackBeauty", "Ma reine des ténèbres")
      .set("emojiful", "Générateur de packs de données Emojiful")
      .set("emojifulText", "Transforme le code HTML de l'interface utilisateur de Discord en datapacks \"Emojiful\".")
      .set("missingDateEvent", "Choisis le dernier « Quoi » si tu préfères être surpris·e :3")
      .set("missingDateDate", "Je n'ai pas encore maîtrisé la télépathie, en attendant, choisis une date :3")
      .set("invalidDateDate", "Le voyage dans le temps n'est malheureusement pas mon fort")
      .set("missingDateLocation", "Le néant ? Choisis un endroit dans l'univers observable :3")
      .set("hingeNotice", "Ne partage <b>pas</b> ce site, il est uniquement pour tes yeux :)")
      .set("hingeNotice0", "Ce que tu envoies ici n'est jamais vu que par <b>toi</b> (et par moi quand tu m'envoies le code à la fin)")
      .set("hingeNotice1", "Je n'ai inclus que des options auxquelles je dirais oui, donc aucune mauvaise réponse n'est possible ^.^")
      .set("what", "Quoi")
      .set("where", "Où")
      .set("when", "Quand")
      .set("extraNote", "Note supplémentaire (facultatif) :")
      .set("extraNote0", "Note :")
      .set("whereInstruction", "Idéalement, choisis un endroit qui n'est pas trop loin pour nous deux. Les villes sont généralement une bonne idée grâce à l'accessibilité et à l'abondance d'infrastructures. Épinglé sur la carte ici se trouve <b>Hasselt</b>. Bien que je ne me limite pas à cela, c'est toujours ma ville la plus proche.")
      .set("location", "Lieu :")
      .set("noon", "Midi")
      .set("afternoon", "Après-midi")
      .set("evening", "Soir")
      .set("whenInstruction", "J'accepte généralement les demandes de rendez-vous (midi-soir) le week-end :). En semaine, les soirées <b>peuvent</b> fonctionner, selon la distance.")
      .set("done", "Tout est prêt :)")
      .set("hingeReview", "Envoie-moi le code ci-dessous via Hinge ou ailleurs (voir en bas à droite :) ).")
      .set("hingeReview0", "Je l'examinerai au plus vite. Une fois approuvé, je t'enverrai un lieu et une heure précis ^.^ .")
      .set("event", "Activité :")
      .set("date", "Date :")
      .set("time", "Heure :")
      .set("cafe", "boissons")
      .set("resto", "repas")
      .set("park", "parc/nature")
      .set("museum", "culturel/art")
      .set("mystery", "mystère");
  }

  getGermanTranslations() {
    return new Map()
      .set("settingsUpdated", "Einstellungen aktualisiert!")
      .set("settingsReverted", "Einstellungsänderungen rückgängig gemacht!")
      .set("tab", "Adris Katzenbaum")
      .set("about", "Über")
      .set("projects", "Projekte")
      .set("configurator", "Konfigurator")
      .set("theme", "Thema")
      .set("language", "Sprache")
      .set("hi", "Hallo :3")
      .set("iAmA", "Ich bin ein ")
      .set("yearOldDutch", "-jähriger Niederländer")
      .set("softwareEngineer", "Software-Ingenieur")
      .set("catCuddler", "Katzenkuscheler")
      .set("cloudEngineer", "Cloud-Ingenieur")
      .set("pentester", "Pentester")
      .set("belgiumCats", " aus Belgien. Ich mag Katzen.")
      .set("interests", "Interessen")
      .set("problemSolving", "Problemlösung")
      .set("greenTech", "Grüne Technologie")
      .set("cats", "Katzen")
      .set("cybersecurity", "Cybersicherheit")
      .set("neuroscience", "Neurowissenschaften")
      .set("bores", "Langweiligkeiten")
      .set("politics", "Politik")
      .set("influencers", "Einflussnehmer")
      .set("aISlop", "AI Slop")
      .set("cryptocurrency", "Kryptowährung")
      .set("techGigantism", "Technologie-Gigantismus")
      .set("environment", "Umwelt")
      .set("sport", "Sport")
      .set("computer", "Computer")
      .set("petsCats", "Haustiere (Katzen)")
      .set("travel", "Reisen")
      .set("software", "Software")
      .set("humans", "Menschen")
      .set(
        "humansText",
        "Wir sind ohne Zweifel das Schlechteste, was dieser Planet je erlebt hat. Daher versuche ich, meinen negativen Einfluss zu minimieren und <b>du</b> kannst (und solltest) das auch tun.",
      )
      .set("transport", "Transport")
      .set(
        "transportText",
        "Autos sind wahrscheinlich die schlechteste Form des Transports. Ich gehe entweder zu Fuß oder mit dem Fahrrad, wenn es höchstens 1 Stunde dauert, andernfalls benutze ich öffentliche Verkehrsmittel. Ein Auto sollte ein <b>letztes Mittel</b> sein.",
      )
      .set("products", "Produkte")
      .set(
        "productsText",
        'Beim Kauf von etwas ist der Preis wichtig, aber er sollte nicht über <b>Haltbarkeit, Qualität und Nachhaltigkeit</b> stehen. Sofern die Alternativen zu "schlechten Produkten" nicht erheblich teurer sind (2x oder mehr), tendiere ich dazu, die umweltfreundlichsten Produkte zu wählen.',
      )
      .set("karate", "Karate")
      .set(
        "karateText",
        "So gut wie der einzige Sport, den ich praktiziere (ich unterrichte manchmal auch). Ich bin momentan <b>schwarzgurtträchtig</b>. (Wusstest du, dass es 8 Grade (Dan-Grades) nach dem schwarzen Gurt gibt?)",
      )
      .set("fitness", "Fitness?")
      .set(
        "fitnessText",
        "Bäh, nein. Ich bekomme keinen primitiven Nervenkitzel daraus, anderen Leuten zu zeigen. Außerdem ist der Geruch von Schweiß und übermäßigem Deodorant für meine Sinne widerlich. Ich mache ein wenig Workout zu Hause und versuche, jeden Tag ein paar Schritte zu gehen.",
      )
      .set("machine", '"Der Computer/Laptop"')
      .set(
        "machineText",
        "Es gibt nicht viele Marken, die ich unterstütze. Die beliebtesten Marken sind die günstigsten, aber sie sind auch die schlechtesten in Bezug auf Reparierbarkeit, Erweiterbarkeit, Anpassungsfähigkeit und manchmal sogar Haltbarkeit. Die Computer, die ich kaufe und mag, sind entweder vollständig <b>maßgeschneidert</b>, gebaut von mir oder einer zertifizierten Firma. Eine offizielle Marke, die ich sehr mag, ist <b>Framework</b> (du solltest es dir wirklich ansehen). Außerdem mag ich Mini-PCs, weil ich so das Tastatur, den Bildschirm und vielleicht sogar einen Akku auswählen (und ersetzen) kann.",
      )
      .set("oS", "Betriebssystem")
      .set(
        "oSText",
        "Ich mag <b>GNU/Linux</b>. Ich möchte nicht, dass Windows weiß, was ich auf meinem Gerät mache, noch will ich meine Seele an Apple verkaufen und ein mittelmäßiges Betriebssystem (MacOS) verwenden, das komplett gegen das verstößt, worauf es gebaut wurde (Unix). Gewöhnlich versuche ich, meine Maschine ohne vorinstalliertes Betriebssystem zu kaufen, aber das ist oft nicht möglich, in welchem Fall ich sie bereinige und so schnell wie möglich eine Linux-Distribution darauf installiere, sobald sie bei mir ankommt.",
      )
      .set("cats", "Katzen")
      .set(
        "catsText",
        "Ich mag alle <b>Feline</b>, sei es klein, normal oder groß. Meine Lieblingsfarbe für eine Hauskatze ist tiefschwarz. Im unglücklichen Fall, dass du mir begegnest und einen Kater hast, wird er mich wahrscheinlich als Lieblingsmenschen wählen :3. Ps, lustige Katzen Tatsache: Die Bombay ist eine tiefschwarze Katze, die normalerweise mit orangen Augen kommt, miau miau.",
      )
      .set("onlyCats", "Nur Katzen?")
      .set(
        "onlyCatsText",
        "Nun... insofern. Ich habe nichts gegen Hunde, aber ich werde sie nie als Haustiere betrachten, da ich zwei <b>traumatische Ereignisse mit Hunden</b> erlebt habe (sorry). Ich würde vielleicht meine Wahrnehmung von Hunden ändern. Ich mag auch Füchse, Wölfe, Rote Pandas, Waschbären, Otter, Raben und Krähen, aber die sollten nicht als Haustiere gehalten werden.",
      )
      .set("inShort", "Kurz gesagt")
      .set(
        "inShortText",
        "Ich entdecke und erlebe gerne mir unbekannte <b>Kulturen, Vegetation (oder Länder insgesamt)</b>. Ich versuche, meine Reisen <b>aktiv und von der Natur umgeben mit einem Stadttrip</b> von Zeit zu Zeit zu gestalten. Ich habe eine Schwäche für <b>nordische Länder</b> und ziehe es vor, nicht in warme Länder zu reisen.",
      )
      .set("destinations", "Reiseziele")
      .set(
        "destinationsText",
        "Ich liebe Schweden, Norwegen, Finnland und Dänemark. Ich würde gerne nach Japan, Südkorea, Thailand und Kanada reisen und vielleicht Australien/NZ (wenn dort Winter ist).",
      )
      .set("inGeneral", "Im Allgemeinen")
      .set(
        "inGeneralText",
        "Ich denke, dass alle Software <b>kostenlos</b> sein sollte. Unternehmen, die Geld damit verdienen möchten, sollten dies nicht tun, indem sie den Zugriff auf Funktionen oder das Produkt selbst einschränken, insbesondere da der Einsatz von KI die meisten neuen Projekte in unsicheren AI-Slop verwandelt. Stattdessen sollten Unternehmen, die auf diese Weise Geld verdienen möchten, dies auf eine oder mehrere der folgenden Arten tun:",
      )
      .set(
        "inGeneralText0",
        "<li>SaaS (Hostingkosten)</li><li>Unterstützung</li><li>Anpassungen, die <b>nur</b> das Aussehen betreffen (Farbthemen/Schriftarten/...)</li>",
      )
      .set("openSource", "Open Source")
      .set(
        "openSourceText",
        "Die Software, die ich benutze und erstelle (und manchmal zu der ich beitrage), ist fast ausschließlich Open Source. Ich versuche, mehr Menschen dazu zu bringen, <b>OSS zu verwenden und FOSS als Ganzes zu schätzen</b>. Einige Beispiele sind Zed anstelle von Jetbrains, LibreOffice anstelle von MS Office, Matrix anstelle von Teams... die Liste geht weiter. Ich habe ein paar Leute an der Universität in die Welt von FOSS eingeführt und sogar meine Mutter verwendet jetzt GNU/Linux!",
      )
      .set(
        "adriTemplater",
        "Eine einfache Templating-Engine, die in Python geschrieben ist",
      )
      .set("adribot", "Ein Discord-Bot, der in C# geschrieben ist")
      .set(
        "websiteText",
        "Eine Website, die HTML, CSS und JS verwendet. Absolut keine Framework-Überladung. TailwindCSS für Stilkompilierung.",
      )
      .set("someFriends", "Einige Freunde")
      .set("you", "Sie?")
      .set(
        "couldBeYou",
        "Das könnten Sie sein (oder ich habe Sie einfach vergessen). Wenn Sie hier aufgeführt werden möchten, kontaktieren Sie mich bitte über eine der in der Fußzeile der Website angegebenen Methoden.",
      )
      .set("utils", "Nützliches")
      .set("rng", "Zufallszahlengenerator")
      .set("rngText", "Generiert eine Zahl zwischen zwei Ganzzahlen.")
      .set("lowerBound", "Untere Grenze (einschließlich)")
      .set("upperBound", "Obere Grenze (einschließlich)")
      .set("generate", "Generieren!")
      .set(
        "lower<Upper",
        "Die untere Zahl muss kleiner sein als die obere Zahl",
      )
      .set(
        "lower>Limit",
        `Der untere Wert muss eine Zahl sein, die größer oder gleich <b>${Number.MIN_SAFE_INTEGER}</b> ist`,
      )
      .set(
        "bigger<Limit",
        `Der obere Wert muss eine Zahl sein, die kleiner oder gleich <b>${Number.MAX_SAFE_INTEGER}</b> ist`,
      )
      .set("blackBeauty", "Meine Königin der Dunkelheit")
      .set("emojiful", "Emojiful-Datenpaket-Generator")
      .set("emojifulText", "Wandelt den HTML-Code des Discord-Frontends in \"Emojiful\"-Datapacks um.")
      .set("missingDateEvent", "Wähle das letzte \"Was\", wenn du lieber überrascht werden möchtest :3")
      .set("missingDateDate", "Ich habe noch keine Telepathie gemeistert, stell bis dahin einfach ein Datum ein :3")
      .set("invalidDateDate", "Zeitreisen ist leider nicht meine Stärke")
      .set("missingDateLocation", "Das Nichts? Wähle einen Ort im beobachtbaren Universum :3")
      .set("hingeNotice", "Bitte teile diese Seite <b>nicht</b>, sie ist nur für deine Augen bestimmt :)")
      .set("hingeNotice0", "Was du hier sendest, wird <b>nur von dir</b> gesehen (und von mir, wenn du mir den Code am Ende schickst)")
      .set("hingeNotice1", "Ich habe nur Optionen aufgenommen, zu denen ich Ja sagen würde, also sind keine falschen Antworten möglich ^.^")
      .set("what", "Was")
      .set("where", "Wo")
      .set("when", "Wann")
      .set("extraNote", "Zusätzliche Notiz (optional):")
      .set("extraNote0", "Notiz:")
      .set("whereInstruction", "Wähle idealerweise einen Ort, der für uns beide nicht zu weit entfernt ist. Städte sind aufgrund der Erreichbarkeit und der Vielzahl an Möglichkeiten meist eine gute Idee. Hier auf der Karte markiert ist <b>Hasselt</b>. Auch wenn ich mich nicht darauf beschränke, ist es dennoch meine nächstgelegene Stadt.")
      .set("location", "Ort:")
      .set("noon", "Mittag")
      .set("afternoon", "Nachmittag")
      .set("evening", "Abend")
      .set("whenInstruction", "Ich gehe meistens auf Date-Anfragen ein (Mittag-Abend) am Wochenende :). Unter der Woche können Abende <b>möglicherweise</b> klappen, je nach Entfernung.")
      .set("done", "Alles erledigt :)")
      .set("hingeReview", "Schick mir den untenstehenden Code über Hinge oder woanders (siehe unten rechts :) ).")
      .set("hingeReview0", "Ich werde ihn so schnell wie möglich prüfen. Bei Genehmigung schicke ich dir einen konkreten Ort und eine Uhrzeit ^.^ .")
      .set("event", "Aktivität:")
      .set("date", "Datum:")
      .set("time", "Uhrzeit:")
      .set("cafe", "Getränke")
      .set("resto", "Essen")
      .set("park", "Park/Natur")
      .set("museum", "Kultur/Kunst")
      .set("mystery", "Mysterium");
  }
}

export { Translator };
