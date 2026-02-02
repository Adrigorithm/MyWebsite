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

    return this.#translations[language][wordId];
  }

  translateAllWords(wordIds, language) {
    wordsTranslated = [];

    if (!this.#translations.has(language)) this.loadTranslations(language);

    wordIds.forEach((id) => {
      wordsTranslated.push(this.#translations[language][id]);
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
      .set("iAmA", "I am a")
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
      .set("tab", "Adri's kattenboom")
      .set("about", "Over")
      .set("projects", "Projecten");
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
