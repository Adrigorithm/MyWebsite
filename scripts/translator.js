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
      case Language.Polish:
        this.#translations.set(Language.Polish, this.getPolishTranslations());

        return;
      case Language.Catalan:
        this.#translations.set(Language.Catalan, this.getCatalanTranslations());

        return;
      case Language.Chinese:
        this.#translations.set(Language.Chinese, this.getChineseTranslations());

        return;
      case Language.Japanese:
        this.#translations.set(
          Language.Japanese,
          this.getJapaneseranslations(),
        );

        return;
      case Language.Norwegian:
        this.#translations.set(
          Language.Norwegian,
          this.getNorwegianTranslations(),
        );

        return;
    }
  }

  getActiveLanguage() {
    return localStorage.getItem("lang") ?? Language.English;
  }

  getEnglishTranslations() {
    return new Map()
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
      );
  }

  getDutchTranslations() {
    return new Map()
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
        "We zijn zonder twijfel het slechtste wat ooit voor deze planeet is gebeurd. Daarom doe ik mijn best om mijn negatieve impact te minimaliseren en <b>jij</b> kunt (en zou) dat ook moeten doen.",
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
        "Vrijwel de enige sport die ik beoefen (ik geef soms ook les). Ik ben momenteel <b>zwarte band</b> gekleed. (wist je dat er 8 graden (dan-graden) zijn na de zwarte band?)",
      )
      .set("fitness", "Fitness?")
      .set(
        "fitnessText",
        "Brr nee. Ik krijg geen primitieve opwinding van het showen voor andere mensen. Bovendien is de stank van zweet en overmatig gebruik van deodorant weerzinwekkend voor mijn zintuigen. Ik doe een beetje training thuis en probeer elke dag wat stappen te zetten.",
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
        "Ik hou van alle <b>felinen</b>, zowel kleine, normale als grote. Mijn favoriete kleur voor een huiskat is volledig zwart. In het ongelukkige geval dat je me ontmoet en je hebt een kat, zal het me waarschijnlijk als favoriete mens kiezen :3. Ps, leuk kattenfeit: De Bombay is een volledig zwarte kat die meestal wordt vergezeld door oranje ogen, miauw miauw.",
      )
      .set("onlyCats", "Alleen katten?")
      .set(
        "onlyCatsText",
        "Nou... in zekere zin. Ik heb niets tegen honden, maar ik zal ze nooit als huisdieren beschouwen, omdat ik twee <b>traumatische gebeurtenissen met honden</b> heb meegemaakt (sorry). Ik zou misschien mijn perceptie van honden willen veranderen. Ik hou echter ook van vossen, wolven, rood panda's, wasberen, otters, raven en kraaien, maar die zouden niet als huisdieren moeten worden gehouden.",
      )
      .set("inShort", "Kortom")
      .set(
        "inShortText",
        "Ik hou ervan om te ontdekken en te ervaren wat voor mij nog onbekende <b>culturen, vegetatie (of landen als geheel)</b> zijn. Ik probeer mijn reizen <b>actief en omringd door de natuur te maken met af en toe een stadsreis</b>. Ik heb een zwak voor <b>Noordse landen</b> en ik geef er de voorkeur aan om niet naar warme landen te gaan.",
      )
      .set("destinations", "Bestemmingen")
      .set(
        "destinationsText",
        "Ik hou van Zweden, Noorwegen, Finland en Denemarken. Ik zou graag naar Japan, Zuid-Korea, Thailand en Canada gaan en misschien Australië/NZ (wanneer het daar winter is).",
      )
      .set("inGeneral", "In het algemeen")
      .set(
        "inGeneralText",
        "Ik denk dat alle software <b>gratis</b> moet zijn. Bedrijven die bereid zijn om er geld aan te verdienen, zouden dit niet mogen doen door de toegang tot functies of het product zelf te beperken, vooral omdat het gebruik van AI de meeste nieuwe projecten in onveilige AI-slop verandert. In plaats daarvan zouden bedrijven die op deze manier geld willen verdienen, dit op een of meer van de volgende manieren moeten doen:",
      )
      .set(
        "inGeneralText0",
        "<li>SaaS (hostingkosten)</li><li>Ondersteuning</li><li>Personalisatie die <b>alleen</b> uiterlijk beïnvloedt (kleurthema's/font/...)</li>",
      )
      .set("openSource", "Open source")
      .set(
        "openSourceText",
        "Software die ik gebruik en maak (en soms aan bijdraag) is bijna uitsluitend open source. Ik probeer meer mensen te <b>OSS te laten gebruiken en FOSS als geheel te waarderen</b>. Enkele voorbeelden zijn Zed in plaats van Jetbrains, LibreOffice in plaats van MS Office, Matrix in plaats van Teams... de lijst gaat maar door. Ik heb een paar mensen in de wereld van FOSS aan de universiteit gebracht en zelfs mijn moeder gebruikt nu GNU/Linux!",
      )
      .set(
        "adriTemplater",
        "Een eenvoudige templating-engine geschreven in Python",
      )
      .set("adribot", "Een discord-bot geschreven in C#")
      .set(
        "websiteText",
        "Een website die HTML, CSS en JS gebruikt. Absoluut geen framework-bloating. TailwindCSS voor stijlcompilatie.",
      );
  }

  getFrenchTranslations() {
    return ["Hi"];
  }

  getGermanTranslations() {
    return ["Hi"];
  }

  getPolishTranslations() {
    return ["Hi"];
  }

  getCatalanTranslations() {
    return ["Hi"];
  }

  getChineseTranslations() {
    return ["Hi"];
  }

  getJapaneseranslations() {
    return ["Hi"];
  }

  getNorwegianTranslations() {
    return ["Hi"];
  }
}

export { Translator };
