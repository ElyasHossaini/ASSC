// Bilingual dictionary for the entire site.
// EN = English (default). FA = Farsi/Persian (Dari).
// All translatable strings live here so editors can update copy in one place.

export type Lang = "en" | "fa";

export const LANG_STORAGE_KEY = "assc:lang";

const en = {
  meta: {
    languageName: "English",
    altLanguageName: "Farsi",
    switchToOther: "تغییر به فارسی",
    code: "EN",
    altCode: "فا",
  },
  nav: {
    home: "Home",
    prayerTimes: "Prayer Times",
    about: "About",
    programs: "Programs",
    upcoming: "Upcoming",
    weeklyEvents: "Weekly Events",
    gallery: "Gallery",
    donations: "Donations",
    membership: "Membership",
    contact: "Contact",
    donate: "Donate",
    contactUs: "Contact Us",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeAria: "home",
    mainNav: "Main navigation",
    siteFullName: "Afghanistan Shia Society",
    siteSubName: "of Calgary",
  },
  hero: {
    welcome: "Welcome to ASSC",
    titleA: "Afghanistan",
    titleB: "Shia Society",
    titleC: "of Calgary",
    tagline:
      "Serving the Afghan Shia Muslim community in Calgary through worship, education, culture, and community support.",
    secondary:
      "A place to pray, learn, and connect — rooted in faith, family, and the rich Afghan Islamic tradition.",
    viewPrograms: "View Programs",
    contactUs: "Contact Us",
    welcomeCardTitle: "Welcome, Brothers & Sisters",
    welcomeCardSub: "A community built on faith, knowledge & service.",
  },
  prayer: {
    eyebrow: "Prayer Times",
    headingA: "Today's Prayer",
    headingB: "Schedule",
    intro:
      "Live prayer times for Calgary using the Shia Ithna-Ashari (Jafari) calculation method.",
    cityLabel: "Calgary, Alberta",
    gregorian: "Gregorian",
    hijri: "Hijri",
    upNext: "Up Next",
    tomorrowSuffix: " · Tomorrow",
    at: "at",
    inLabel: "In",
    hr: "hr",
    min: "min",
    current: "Current",
    next: "Next",
    now: "Now",
    fajr: "Fajr",
    sunrise: "Sunrise",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    fajrDesc: "Dawn",
    sunriseDesc: "Fajr ends",
    dhuhrDesc: "Midday",
    asrDesc: "Afternoon",
    maghribDesc: "Evening",
    ishaDesc: "Night",
    footer1A: "Times calculated using the",
    footer1B: "Shia Ithna-Ashari (Jafari)",
    footer1C: "method.",
    footer2: "Auto-updates daily · Live countdown",
    errorTitle: "Couldn't load live prayer times right now.",
    errorBody:
      "Please refresh the page in a moment, or contact the centre for today's schedule.",
  },
  about: {
    eyebrow: "About Our Society",
    headingA: "A community of faith, family,",
    headingB: "and service",
    p1Pre: "The",
    p1Strong: "Afghanistan Shia Society of Calgary",
    p1Post:
      " is a community organization dedicated to serving the Afghan Shia Muslim community in Calgary. We provide religious, educational, cultural, and social programs that nurture faith, strengthen families, and bring our community together.",
    p2: "From daily prayers and Quran classes to youth programs, Muharram majalis, and Ramadan iftars, our doors are open to every member of the community — elders, families, youth, and newcomers alike.",
    p3: "Our mission is to preserve our Afghan Islamic identity, support one another through worship and service, and raise a new generation grounded in the timeless values of Islam and the teachings of the Ahlul Bayt (a.s.).",
    rootedTitle: "Rooted in Faith",
    rootedText:
      "Following the path of the Ahlul Bayt (a.s.) with sincerity and love.",
    values: [
      {
        title: "Faith & Worship",
        text: "Daily prayers, Quran recitation, and Islamic learning rooted in the teachings of Ahlul Bayt (a.s.).",
      },
      {
        title: "Unity & Family",
        text: "A welcoming home for elders, families, youth, and newcomers in Calgary.",
      },
      {
        title: "Service & Charity",
        text: "Supporting one another through community programs, mutual aid, and charitable work.",
      },
      {
        title: "Afghan Heritage",
        text: "Preserving our Afghan Islamic identity, language, and traditions for future generations.",
      },
    ],
  },
  programs: {
    eyebrow: "Our Programs",
    headingA: "Programs that nurture",
    headingB: "faith and community",
    intro:
      "From weekly prayers and Quran classes to youth activities and cultural gatherings, our programs are designed to serve every member of the Afghan Shia community in Calgary.",
    items: [
      {
        title: "Daily & Weekly Religious Programs",
        description:
          "Regular prayer programs, Dua sessions, and majalis held throughout the week to keep our community connected to worship and remembrance.",
      },
      {
        title: "Quran & Islamic Education",
        description:
          "Quran recitation, Tajweed, and Islamic studies classes for children, youth, and adults — taught by knowledgeable community members.",
      },
      {
        title: "Youth Programs",
        description:
          "Activities, mentorship, and Islamic learning designed to engage the next generation and help our youth grow rooted in their faith.",
      },
      {
        title: "Community Gatherings",
        description:
          "Family nights, dinners, and social events that strengthen friendships and bring families together in a welcoming environment.",
      },
      {
        title: "Muharram & Ramadan Programs",
        description:
          "Nightly majalis during Muharram and Safar, communal iftars in Ramadan, and special programs marking the holy months and Islamic occasions.",
      },
      {
        title: "Family & Cultural Events",
        description:
          "Eid celebrations, Afghan cultural evenings, and family-friendly gatherings that honor our heritage and bring joy to all ages.",
      },
    ],
  },
  upcoming: {
    eyebrow: "Upcoming Events",
    headingA: "Reserve your seat for our",
    headingB: "next gatherings",
    intro:
      "Let us know how many family members will be joining so we can prepare a warm welcome for everyone.",
    events: [
      {
        title: "Upcoming Community Event",
        date: "Coming Soon",
        time: "TBA",
        location: "ASSC Centre",
        description:
          "Join us for our next community gathering. Reserve your spot below so we can prepare enough food and seating for your family.",
        poem: [] as string[],
        programTitle: "",
        programItems: [] as string[],
        fromOrganizer: "",
      },
      {
        title: "Birth Anniversary of Imam Hassan al-Mujtaba (a.s.)",
        date: "Friday, March 14 · 6:00 PM",
        time: "From 6:00 PM (18:00)",
        location: "Markaz-e Tawhid Calgary",
        description:
          "Congratulations on the blessed birth anniversary of Imam Hassan al-Mujtaba (a.s.). We warmly invite you, dear friends, to join us at the iftar table of the Karim of Ahlul Bayt, Imam Hassan al-Mujtaba (a.s.), at Markaz-e Tawhid Calgary. Please RSVP below so we can welcome you and your family properly. We look forward to seeing you.",
        poem: [
          "The blessed mid-month carries great honor tonight,",
          "For God shows grace upon His servants tonight.",
          "The celebration of Hassan's (a.s.) birth fills the highest heavens,",
          "And so tonight resembles Laylat al-Isra.",
        ],
        programTitle: "Program includes",
        programItems: [
          "Quran recitation (Juz reading)",
          "Lecture by Dr. Shams (first session)",
          "Iftar and dinner",
          "Financial report",
          "Performance by the Nur al-Mahdi choir group",
        ],
        fromOrganizer: "From Markaz-e Tawhid Calgary",
      },
    ],
    totalAttending: "Total Attending",
    familyOne: "family",
    familyMany: "families",
    rsvped: "RSVP'd",
    refresh: "Refresh",
    organizerBadge: "Organizer",
    rsvpButton: "Join Event / RSVP",
    nameLabel: "Your Name / Family Name",
    namePlaceholder: "e.g. Ahmadi Family",
    countLabel: "Number of people attending",
    countHelp: "Include yourself in the total. One RSVP per device.",
    decrease: "Decrease",
    increase: "Increase",
    confirm: "Confirm RSVP",
    submitting: "Submitting…",
    cancel: "Cancel",
    familiesHeading: "Families attending",
    retry: "Retry",
    emptyList: "No one has RSVP'd yet — be the first!",
    youBadge: "You",
    personOne: "person",
    personMany: "people",
    grandTotal: "Total people coming",
    onTheListTitle: "You're on the list!",
    onTheListPersonOne: "person attending.",
    onTheListPersonMany: "people attending.",
    onTheListChangeA: "Need to make a change? Call",
    onTheListChangeB: ".",
    disabledTitle: "RSVPs not yet enabled",
    disabledBodyA: "Please call",
    disabledBodyB: "to reserve a spot.",
    organizerToolsTitle: "Organizer Tools",
    closeOrganizer: "Close organizer panel",
    organizerLoggedInText:
      "Trash icons are visible next to each RSVP. Removing a family also unlocks their device so they can RSVP again.",
    organizerLogout: "Log out of organizer mode",
    organizerPasswordLabel: "Enter organizer password",
    organizerPasswordPlaceholder: "Password",
    organizerLogin: "Log in",
    footerEnabled:
      "Each device can RSVP once. Only the event organizer can remove an entry.",
    footerDisabled: "RSVPs are currently disabled. Please call to reserve.",
    removeAria: "Remove {{name}}'s RSVP",
    removeConfirm:
      "Remove {{name}}'s RSVP ({{count}} {{unit}})?\n\nTheir device will be able to RSVP again.",
    errors: {
      nameMin: "Please enter your name (at least 2 characters).",
      countInvalid: "Please enter a valid number of people (1–50).",
      alreadyRsvped:
        "This device has already RSVP'd for this event. Please contact the organizer if you need to change your reservation.",
      submitFailed:
        "Could not submit your RSVP. Please try again or call the organizer.",
      network: "Network error. Please check your connection and try again.",
      adminMinPass: "Please enter your organizer password.",
      adminWrong: "Incorrect password. Please try again.",
      adminReach: "Could not reach the server. Please try again.",
      adminExpired: "Your organizer session expired. Please log in again.",
      removeFailed: "Could not remove this RSVP. Please try again.",
      removeNetwork: "Network error while removing RSVP.",
      flashLoggedIn:
        "Organizer mode active. Delete buttons are now available.",
    },
  },
  events: {
    eyebrow: "Weekly & Seasonal Events",
    headingA: "Our regular",
    headingB: "community gatherings",
    intro:
      "These are the recurring programs you can count on throughout the week and during the holy months — open to all families and visitors.",
    findCentre: "Find Our Centre",
    items: [
      {
        title: "Friday Program",
        date: "Every Friday",
        time: "7:30 PM",
        location: "ASSC Centre",
        description:
          "Weekly Friday evening program featuring prayer, Quran recitation, and a community lecture.",
        tag: "Weekly",
      },
      {
        title: "Dua Kumayl Night",
        date: "Thursday Nights",
        time: "After Isha Prayer",
        location: "ASSC Centre",
        description:
          "Recitation of the beloved Dua Kumayl followed by reflection and community fellowship.",
        tag: "Spiritual",
      },
      {
        title: "Ramadan Community Iftar",
        date: "During Holy Ramadan",
        time: "Sunset (Maghrib)",
        location: "ASSC Centre",
        description:
          "Open community iftars during the blessed month of Ramadan — all families and visitors are welcome.",
        tag: "Seasonal",
      },
      {
        title: "Muharram Majlis",
        date: "Muharram & Safar",
        time: "Nightly After Maghrib",
        location: "ASSC Centre",
        description:
          "Nightly majalis remembering Imam Hussain (a.s.) and the martyrs of Karbala, with recitation and reflection.",
        tag: "Annual",
      },
      {
        title: "Youth Quran Class",
        date: "Weekends",
        time: "TBA",
        location: "ASSC Centre",
        description:
          "Quran recitation, Tajweed, and Islamic studies for children and youth in a fun, supportive environment.",
        tag: "Education",
      },
    ],
    confirmPre: "Exact dates and times may change. Please contact us at",
    confirmPost: "to confirm program schedules.",
  },
  announcements: {
    eyebrow: "Notice Board",
    headingA: "Announcements &",
    headingB: "community updates",
    intro:
      "Important news, reminders, and updates from the Afghanistan Shia Society of Calgary.",
    scheduleEyebrow: "Weekly Schedule",
    scheduleTitle: "Program Schedule",
    scheduleIntro:
      "A snapshot of regular programs at our centre. Please call ahead to confirm.",
    scheduleNote:
      "Schedules may change during holy months. Please contact us for the latest program times.",
    items: [
      {
        tag: "Announcement",
        title: "Welcome to the new ASSC website",
        text: "Stay connected with the latest news, programs, and community updates from the Afghanistan Shia Society of Calgary.",
      },
      {
        tag: "Community",
        title: "Volunteers and donations welcome",
        text: "Help support our religious programs, youth education, and community events. Reach out to learn how you can contribute.",
      },
      {
        tag: "Reminder",
        title: "Holy month programs",
        text: "Special nightly programs are held during Muharram, Safar, and Ramadan. Please contact us for the current schedule.",
      },
    ],
    schedule: [
      { label: "Friday Program", time: "Every Friday  ·  7:30 PM" },
      { label: "Dua Kumayl", time: "Thursday Nights  ·  After Isha" },
      { label: "Youth Quran Class", time: "Weekends  ·  TBA" },
      { label: "Muharram Majlis", time: "Nightly  ·  After Maghrib" },
      { label: "Ramadan Iftar", time: "Daily during Ramadan  ·  Sunset" },
    ],
  },
  gallery: {
    eyebrow: "Our Gallery",
    headingA: "Moments from our",
    headingB: "community",
    intro:
      "A glimpse into our gatherings, events, and the people who make the Afghanistan Shia Society of Calgary a true community home.",
    eidTitle: "Eid Celebration",
    eidIntro:
      "Joyful moments from our recent Eid celebration, shared together as one community.",
    communityTitle: "Community Gatherings",
    openPhoto: "Open photo {{i}} of {{total}}",
    viewAll: "View all {{n}} photos",
    showFewer: "Show fewer photos",
    shownOf: "{{shown}} of {{total}} shown",
    photoViewer: "Photo viewer",
    closeViewer: "Close photo viewer",
    prev: "Previous photo",
    next: "Next photo",
  },
  donations: {
    eyebrow: "Support Our Community",
    headingA: "Support the Afghanistan",
    headingB: "Shia Society of Calgary",
    intro:
      "Your donations help support religious programs, youth education, community events, and ongoing services for the community. Together, we keep the doors of our centre open for prayer, learning, and gathering.",
    quoteEn:
      "\u201cWho is it that will lend to Allah a goodly loan?\u201d \u2014 Holy Quran 2:245",
    cardEyebrow: "Donate by Interac e-Transfer",
    cardTitle: "Send your donation via e-Transfer",
    cardIntro:
      "We accept donations through Interac e-Transfer. Please send your contribution to the email address below from your online banking.",
    sendTo: "Send e-Transfer to",
    copy: "Copy",
    copied: "Copied",
    copyAria: "Copy e-Transfer email address",
    step1Pre: "Sign in to your online banking and select",
    step1Strong: "Interac e-Transfer",
    step1Post: ".",
    step2Pre: "Send your donation to",
    step2Post: ".",
    step3Pre: "Add a note like",
    step3Italic: "\u201cDonation \u2013 ASSC\u201d",
    step3Post: " so we can track your contribution.",
    emailUs: "Email Us",
    callUs: "Call Us",
    closing:
      "May Allah (s.w.t.) accept your generosity and reward you abundantly. Jazak Allahu Khairan.",
    items: [
      {
        title: "Religious Programs",
        text: "Support daily worship, lectures, and majalis at our centre.",
      },
      {
        title: "Youth Education",
        text: "Fund Quran classes, mentorship, and youth activities.",
      },
      {
        title: "Community Services",
        text: "Help with events, iftars, and ongoing community support.",
      },
    ],
  },
  newsletter: {
    eyebrow: "Stay Connected",
    headingA: "Join our",
    headingB: "community list",
    intro:
      "Be the first to hear about upcoming events, prayer times, programs, and community announcements from the Afghanistan Shia Society of Calgary.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone Number",
    firstPlaceholder: "Ali",
    lastPlaceholder: "Ahmadi",
    emailPlaceholder: "you@example.com",
    phonePlaceholder: "403-555-0123",
    subscribe: "Subscribe",
    subscribing: "Subscribing...",
    privacy:
      "We respect your privacy. Your information is only used to send community updates from ASSC and is never shared.",
    thankYouTitle: "Thank you!",
    successPosted:
      "You're on the list! We'll be in touch with community updates and event invitations.",
    successMailto:
      "Thanks! Your email app should open with a pre-filled message — just hit send to complete your signup.",
    addAnother: "Sign up another person",
    errors: {
      firstName: "Please enter your first name.",
      lastName: "Please enter your last name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a valid phone number (at least 10 digits).",
      submit:
        "We couldn't submit your information. Please try again or email us directly.",
    },
  },
  membership: {
    eyebrow: "Become a Member",
    headingA: "Join the Afghanistan Shia",
    headingB: "Society of Calgary",
    intro:
      "We welcome members from across our community. Membership helps us strengthen our programs, support one another, and grow the centre that serves all of us.",
    description:
      "If you would like to become a member of the Afghanistan Shia Society of Calgary, please download the membership application form, fill it out completely, and email the completed form to us. Our committee will review your application and reach out to confirm your membership.",
    step1Title: "Download the form",
    step1Text:
      "Save the PDF membership application form to your phone or computer.",
    step2Title: "Fill it out",
    step2Text:
      "Complete every section of the form with your details — print and sign by hand, or fill it digitally.",
    step3Title: "Email it to us",
    step3Text:
      "Send the completed form to the email address below. We'll review and follow up with next steps.",
    downloadButton: "Download Application Form (PDF)",
    sendTo: "Send the completed form to",
    fileLabel: "PDF · ASAC Membership Application",
    questionsPre: "Questions? Call us at",
    questionsPost: "or email us anytime.",
    closing:
      "We look forward to welcoming you to our community. Jazak Allahu Khairan.",
  },
  footer: {
    description:
      "A welcoming Afghan Shia Muslim community in Calgary — serving through worship, education, culture, and community support.",
    quickLinks: "Quick Links",
    getInTouch: "Get in Touch",
    rights: "All rights reserved.",
    builtWith: "Built with care for the community.",
    organizer: "Organizer",
  },
};

// --- Farsi (Persian / Dari) translations ---
// Translated to communicate the same meaning, tuned for an Afghan
// audience while remaining understandable across Persian readers.
// Have your client review and adjust phrasing as needed.
const fa: typeof en = {
  meta: {
    languageName: "فارسی",
    altLanguageName: "English",
    switchToOther: "Switch to English",
    code: "فا",
    altCode: "EN",
  },
  nav: {
    home: "خانه",
    prayerTimes: "اوقات نماز",
    about: "درباره ما",
    programs: "برنامه‌ها",
    upcoming: "رویداد آینده",
    weeklyEvents: "برنامه‌های هفتگی",
    gallery: "گالری",
    donations: "کمک‌های مالی",
    membership: "عضویت",
    contact: "تماس",
    donate: "کمک مالی",
    contactUs: "تماس با ما",
    openMenu: "باز کردن منو",
    closeMenu: "بستن منو",
    homeAria: "خانه",
    mainNav: "ناوبری اصلی",
    siteFullName: "انجمن شیعیان افغانستان",
    siteSubName: "کلگری",
  },
  hero: {
    welcome: "به ASSC خوش آمدید",
    titleA: "انجمن",
    titleB: "شیعیان افغانستان",
    titleC: "کلگری",
    tagline:
      "خدمت به جامعهٔ مسلمانان شیعهٔ افغانستان در کلگری از طریق عبادت، آموزش، فرهنگ و حمایت اجتماعی.",
    secondary:
      "جایی برای نماز، یادگیری و ارتباط — ریشه در ایمان، خانواده و سنت غنی اسلامی افغانستان.",
    viewPrograms: "مشاهدهٔ برنامه‌ها",
    contactUs: "تماس با ما",
    welcomeCardTitle: "خوش آمدید، برادران و خواهران",
    welcomeCardSub: "جامعه‌ای بنا شده بر ایمان، دانش و خدمت.",
  },
  prayer: {
    eyebrow: "اوقات نماز",
    headingA: "برنامهٔ نمازهای",
    headingB: "امروز",
    intro:
      "اوقات نماز برای شهر کلگری بر اساس روش محاسبهٔ شیعهٔ اثنی‌عشری (جعفری).",
    cityLabel: "کلگری، آلبرتا",
    gregorian: "میلادی",
    hijri: "هجری قمری",
    upNext: "نماز بعدی",
    tomorrowSuffix: " · فردا",
    at: "ساعت",
    inLabel: "تا",
    hr: "ساعت",
    min: "دقیقه",
    current: "نماز فعلی",
    next: "بعدی",
    now: "اکنون",
    fajr: "صبح",
    sunrise: "طلوع",
    dhuhr: "ظهر",
    asr: "عصر",
    maghrib: "مغرب",
    isha: "عشاء",
    fajrDesc: "سپیده‌دم",
    sunriseDesc: "پایان وقت صبح",
    dhuhrDesc: "نیمروز",
    asrDesc: "بعدازظهر",
    maghribDesc: "غروب آفتاب",
    ishaDesc: "شب",
    footer1A: "اوقات بر اساس روش",
    footer1B: "شیعهٔ اثنی‌عشری (جعفری)",
    footer1C: "محاسبه شده است.",
    footer2: "بروزرسانی روزانه · شمارش معکوس زنده",
    errorTitle: "در حال حاضر امکان بارگیری اوقات نماز وجود ندارد.",
    errorBody:
      "لطفاً صفحه را پس از چند لحظه دوباره بارگذاری کنید یا برای برنامهٔ امروز با مرکز تماس بگیرید.",
  },
  about: {
    eyebrow: "دربارهٔ انجمن ما",
    headingA: "جامعه‌ای از ایمان، خانواده",
    headingB: "و خدمت",
    p1Pre: "",
    p1Strong: "انجمن شیعیان افغانستان کلگری",
    p1Post:
      " یک سازمان اجتماعی است که به خدمت‌رسانی به جامعهٔ مسلمانان شیعهٔ افغانستان در کلگری اختصاص دارد. ما برنامه‌های مذهبی، آموزشی، فرهنگی و اجتماعی ارائه می‌دهیم که ایمان را پرورش می‌دهد، خانواده‌ها را تقویت می‌کند و جامعهٔ ما را گرد هم می‌آورد.",
    p2: "از نمازهای روزانه و کلاس‌های قرآن گرفته تا برنامه‌های جوانان، مجالس محرم و افطاری‌های رمضان، درهای ما به روی تمام اعضای جامعه باز است — بزرگ‌ترها، خانواده‌ها، جوانان و تازه‌واردان.",
    p3: "مأموریت ما حفظ هویت اسلامی-افغانی، حمایت از یکدیگر از طریق عبادت و خدمت، و تربیت نسلی جدید بر پایهٔ ارزش‌های جاودانهٔ اسلام و آموزه‌های اهل بیت (علیهم‌السلام) است.",
    rootedTitle: "ریشه در ایمان",
    rootedText:
      "پیروی از راه اهل بیت (علیهم‌السلام) با اخلاص و محبت.",
    values: [
      {
        title: "ایمان و عبادت",
        text: "نمازهای روزانه، تلاوت قرآن و آموزش اسلامی بر پایهٔ آموزه‌های اهل بیت (علیهم‌السلام).",
      },
      {
        title: "وحدت و خانواده",
        text: "خانه‌ای گرم برای بزرگسالان، خانواده‌ها، جوانان و تازه‌واردان در کلگری.",
      },
      {
        title: "خدمت و خیریه",
        text: "حمایت از یکدیگر از طریق برنامه‌های اجتماعی، کمک‌های متقابل و کارهای خیرخواهانه.",
      },
      {
        title: "میراث افغانی",
        text: "حفظ هویت اسلامی-افغانی، زبان و سنت‌های ما برای نسل‌های آینده.",
      },
    ],
  },
  programs: {
    eyebrow: "برنامه‌های ما",
    headingA: "برنامه‌هایی که",
    headingB: "ایمان و جامعه را پرورش می‌دهد",
    intro:
      "از نمازهای هفتگی و کلاس‌های قرآن گرفته تا فعالیت‌های جوانان و گردهمایی‌های فرهنگی، برنامه‌های ما برای خدمت به همهٔ اعضای جامعهٔ شیعیان افغانستان در کلگری طراحی شده‌اند.",
    items: [
      {
        title: "برنامه‌های مذهبی روزانه و هفتگی",
        description:
          "برنامه‌های منظم نماز، دعا و مجالسی که در طول هفته برگزار می‌شود تا جامعهٔ ما را به عبادت و یاد خدا متصل نگه دارد.",
      },
      {
        title: "آموزش قرآن و اسلامی",
        description:
          "کلاس‌های تلاوت قرآن، تجوید و علوم اسلامی برای کودکان، جوانان و بزرگسالان — توسط اعضای آگاه جامعه تدریس می‌شود.",
      },
      {
        title: "برنامه‌های جوانان",
        description:
          "فعالیت‌ها، راهنمایی و آموزش اسلامی برای ایجاد ارتباط با نسل بعدی و کمک به جوانان ما برای رشد در ایمانشان.",
      },
      {
        title: "گردهمایی‌های اجتماعی",
        description:
          "شب‌های خانوادگی، شام‌ها و رویدادهای اجتماعی که دوستی‌ها را تقویت می‌کند و خانواده‌ها را در محیطی گرم گرد هم می‌آورد.",
      },
      {
        title: "برنامه‌های محرم و رمضان",
        description:
          "مجالس شبانه در محرم و صفر، افطاری‌های جمعی در رمضان و برنامه‌های ویژه به مناسبت ماه‌های مقدس و اعیاد اسلامی.",
      },
      {
        title: "رویدادهای خانوادگی و فرهنگی",
        description:
          "جشن‌های عید، شب‌های فرهنگی افغانی و گردهمایی‌های خانوادگی که میراث ما را گرامی می‌دارد و برای تمام سنین شادی به ارمغان می‌آورد.",
      },
    ],
  },
  upcoming: {
    eyebrow: "رویدادهای آینده",
    headingA: "جای خود را برای",
    headingB: "گردهمایی‌های بعدی ما رزرو کنید",
    intro:
      "به ما بگویید چند نفر از اعضای خانواده‌تان همراه شما خواهند بود تا پذیرایی گرمی برای همه آماده کنیم.",
    events: [
      {
        title: "رویداد اجتماعی پیش‌رو",
        date: "به‌زودی",
        time: "متعاقباً اعلام می‌شود",
        location: "مرکز ASSC",
        description:
          "در گردهمایی بعدی جامعه‌مان به ما بپیوندید. لطفاً جای خود را ثبت کنید تا غذا و صندلی کافی برای خانوادهٔ شما آماده کنیم.",
        poem: [] as string[],
        programTitle: "",
        programItems: [] as string[],
        fromOrganizer: "",
      },
      {
        title: "جشن میلاد امام حسن مجتبی (ع)",
        date: "جمعه ۱۴ مارچ · ساعت ۱۸",
        time: "از ساعت ۱۸",
        location: "مرکز توحید کلگری",
        description:
          "پیشاپیش سالروز میلاد امام حسن مجتبی (ع) مبارک باد. بدینوسیله از شما عزیزان دعوت می‌کنیم تا مهمان سفرهٔ افطار کریم اهل بیت، امام حسن مجتبی (ع)، در مرکز توحید کلگری باشید. لطفاً جهت هماهنگی بهتر با تکمیل فرم زیر، ما را از حضور گرمتان با خبر کنید. مشتاق دیدار شما هستیم.",
        poem: [
          "نیمه ماه مبارک بس شرافت دارد امشب",
          "چون خدا بر بندگان خود عنایت دارد امشب",
          "جشن میلاد حسن(ع) در عرش اعلا گشته بر پا",
          "زین سبب بر لیلة الاسرا شباهت دارد امشب",
        ],
        programTitle: "برنامه شامل",
        programItems: [
          "جزء‌خوانی قرآن",
          "سخنرانی توسط دکتر شمس (جلسه اول)",
          "افطار و شام",
          "گزارش مالی",
          "اجرای گروه سرود نورالمهدی",
        ],
        fromOrganizer: "از طرف مرکز توحید کلگری",
      },
    ],
    totalAttending: "مجموع شرکت‌کنندگان",
    familyOne: "خانواده",
    familyMany: "خانواده",
    rsvped: "ثبت‌نام کرده‌اند",
    refresh: "بروزرسانی",
    organizerBadge: "سازمان‌دهنده",
    rsvpButton: "ثبت‌نام در رویداد",
    nameLabel: "نام شما / نام خانوادگی",
    namePlaceholder: "مثلاً خانوادهٔ احمدی",
    countLabel: "تعداد افراد همراه",
    countHelp: "خودتان را نیز در مجموع لحاظ کنید. یک ثبت‌نام به ازای هر دستگاه.",
    decrease: "کاهش",
    increase: "افزایش",
    confirm: "تأیید ثبت‌نام",
    submitting: "در حال ثبت…",
    cancel: "انصراف",
    familiesHeading: "خانواده‌های شرکت‌کننده",
    retry: "تلاش دوباره",
    emptyList: "هنوز کسی ثبت‌نام نکرده — اولین نفر باشید!",
    youBadge: "شما",
    personOne: "نفر",
    personMany: "نفر",
    grandTotal: "مجموع افراد",
    onTheListTitle: "شما در فهرست هستید!",
    onTheListPersonOne: "نفر شرکت می‌کند.",
    onTheListPersonMany: "نفر شرکت می‌کنند.",
    onTheListChangeA: "نیاز به تغییر دارید؟ تماس بگیرید:",
    onTheListChangeB: ".",
    disabledTitle: "ثبت‌نام هنوز فعال نیست",
    disabledBodyA: "لطفاً برای رزرو جای خود با شماره",
    disabledBodyB: "تماس بگیرید.",
    organizerToolsTitle: "ابزارهای سازمان‌دهنده",
    closeOrganizer: "بستن پنل سازمان‌دهنده",
    organizerLoggedInText:
      "آیکن سطل آشغال در کنار هر ثبت‌نام نمایش داده می‌شود. حذف یک خانواده باعث می‌شود دستگاه آن‌ها بتواند دوباره ثبت‌نام کند.",
    organizerLogout: "خروج از حالت سازمان‌دهنده",
    organizerPasswordLabel: "رمز سازمان‌دهنده را وارد کنید",
    organizerPasswordPlaceholder: "رمز",
    organizerLogin: "ورود",
    footerEnabled:
      "هر دستگاه فقط یک‌بار می‌تواند ثبت‌نام کند. تنها سازمان‌دهندهٔ رویداد می‌تواند یک ثبت‌نام را حذف کند.",
    footerDisabled:
      "ثبت‌نام در حال حاضر غیرفعال است. لطفاً برای رزرو تماس بگیرید.",
    removeAria: "حذف ثبت‌نام {{name}}",
    removeConfirm:
      "ثبت‌نام {{name}} ({{count}} {{unit}}) حذف شود؟\n\nدستگاه آن‌ها می‌تواند دوباره ثبت‌نام کند.",
    errors: {
      nameMin: "لطفاً نام خود را وارد کنید (حداقل ۲ حرف).",
      countInvalid: "لطفاً یک عدد معتبر وارد کنید (۱ تا ۵۰).",
      alreadyRsvped:
        "این دستگاه قبلاً برای این رویداد ثبت‌نام کرده است. اگر نیاز به تغییر دارید با سازمان‌دهنده تماس بگیرید.",
      submitFailed:
        "ثبت‌نام شما انجام نشد. لطفاً دوباره تلاش کنید یا با سازمان‌دهنده تماس بگیرید.",
      network:
        "خطای شبکه. لطفاً اتصال خود را بررسی کنید و دوباره تلاش کنید.",
      adminMinPass: "لطفاً رمز سازمان‌دهنده را وارد کنید.",
      adminWrong: "رمز نادرست است. لطفاً دوباره تلاش کنید.",
      adminReach:
        "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.",
      adminExpired:
        "نشست سازمان‌دهندهٔ شما منقضی شده است. لطفاً دوباره وارد شوید.",
      removeFailed: "حذف این ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید.",
      removeNetwork: "خطای شبکه هنگام حذف ثبت‌نام.",
      flashLoggedIn:
        "حالت سازمان‌دهنده فعال است. دکمه‌های حذف اکنون در دسترس‌اند.",
    },
  },
  events: {
    eyebrow: "برنامه‌های هفتگی و فصلی",
    headingA: "گردهمایی‌های منظم",
    headingB: "جامعهٔ ما",
    intro:
      "این برنامه‌های منظم در طول هفته و در ماه‌های مقدس برگزار می‌شود — برای همهٔ خانواده‌ها و بازدیدکنندگان آزاد است.",
    findCentre: "مرکز ما را بیابید",
    items: [
      {
        title: "برنامهٔ جمعه",
        date: "هر جمعه",
        time: "۷:۳۰ شب",
        location: "مرکز ASSC",
        description:
          "برنامهٔ هفتگی شب‌های جمعه شامل نماز، تلاوت قرآن و سخنرانی اجتماعی.",
        tag: "هفتگی",
      },
      {
        title: "شب دعای کمیل",
        date: "شب‌های پنج‌شنبه",
        time: "پس از نماز عشاء",
        location: "مرکز ASSC",
        description:
          "قرائت دعای کمیل به همراه تأمل و همراهی جمعی جامعه.",
        tag: "معنوی",
      },
      {
        title: "افطار جمعی رمضان",
        date: "در ماه مبارک رمضان",
        time: "غروب آفتاب (مغرب)",
        location: "مرکز ASSC",
        description:
          "افطاری جمعی در ماه مبارک رمضان — همهٔ خانواده‌ها و بازدیدکنندگان دعوت‌اند.",
        tag: "فصلی",
      },
      {
        title: "مجلس محرم",
        date: "محرم و صفر",
        time: "شبانه پس از مغرب",
        location: "مرکز ASSC",
        description:
          "مجالس شبانه به یاد امام حسین (علیه‌السلام) و شهدای کربلا با مرثیه‌خوانی و تأمل.",
        tag: "سالانه",
      },
      {
        title: "کلاس قرآن جوانان",
        date: "آخر هفته‌ها",
        time: "متعاقباً اعلام می‌شود",
        location: "مرکز ASSC",
        description:
          "تلاوت قرآن، تجوید و علوم اسلامی برای کودکان و جوانان در محیطی شاد و حمایت‌گر.",
        tag: "آموزش",
      },
    ],
    confirmPre:
      "تاریخ‌ها و ساعات دقیق ممکن است تغییر کند. لطفاً برای تأیید برنامه‌ها با ما تماس بگیرید:",
    confirmPost: "",
  },
  announcements: {
    eyebrow: "تابلوی اعلانات",
    headingA: "اعلانات و",
    headingB: "اخبار جامعه",
    intro:
      "خبرهای مهم، یادآوری‌ها و اخبار انجمن شیعیان افغانستان کلگری.",
    scheduleEyebrow: "برنامهٔ هفتگی",
    scheduleTitle: "جدول برنامه‌ها",
    scheduleIntro:
      "نمایی از برنامه‌های منظم مرکز ما. لطفاً پیش از حضور تماس بگیرید.",
    scheduleNote:
      "برنامه‌ها ممکن است در ماه‌های مقدس تغییر کند. برای آخرین ساعات برنامه با ما تماس بگیرید.",
    items: [
      {
        tag: "اطلاعیه",
        title: "به وب‌سایت جدید ASSC خوش آمدید",
        text: "با آخرین اخبار، برنامه‌ها و اطلاعات انجمن شیعیان افغانستان کلگری در ارتباط بمانید.",
      },
      {
        tag: "جامعه",
        title: "از داوطلبان و کمک‌های مالی استقبال می‌کنیم",
        text: "از برنامه‌های مذهبی، آموزش جوانان و رویدادهای جامعهٔ ما حمایت کنید. برای کسب اطلاع از نحوهٔ مشارکت تماس بگیرید.",
      },
      {
        tag: "یادآوری",
        title: "برنامه‌های ماه‌های مقدس",
        text: "در محرم، صفر و رمضان برنامه‌های شبانهٔ ویژه برگزار می‌شود. لطفاً برای جدول فعلی با ما تماس بگیرید.",
      },
    ],
    schedule: [
      { label: "برنامهٔ جمعه", time: "هر جمعه  ·  ۷:۳۰ شب" },
      { label: "دعای کمیل", time: "شب‌های پنج‌شنبه  ·  پس از عشاء" },
      { label: "کلاس قرآن جوانان", time: "آخر هفته  ·  متعاقباً اعلام می‌شود" },
      { label: "مجلس محرم", time: "شبانه  ·  پس از مغرب" },
      { label: "افطار رمضان", time: "هر روز در رمضان  ·  غروب آفتاب" },
    ],
  },
  gallery: {
    eyebrow: "گالری ما",
    headingA: "لحظاتی از",
    headingB: "جامعهٔ ما",
    intro:
      "نگاهی به گردهمایی‌ها، رویدادها و کسانی که انجمن شیعیان افغانستان کلگری را به خانه‌ای واقعی برای جامعه تبدیل کرده‌اند.",
    eidTitle: "جشن عید",
    eidIntro:
      "لحظات شاد جشن عید اخیر ما، که همگی به‌عنوان یک جامعه در کنار هم گرد آمدیم.",
    communityTitle: "گردهمایی‌های جامعه",
    openPhoto: "باز کردن عکس {{i}} از {{total}}",
    viewAll: "مشاهدهٔ همهٔ {{n}} عکس",
    showFewer: "نمایش کمتر",
    shownOf: "{{shown}} از {{total}}",
    photoViewer: "نمایشگر عکس",
    closeViewer: "بستن نمایشگر",
    prev: "عکس قبلی",
    next: "عکس بعدی",
  },
  donations: {
    eyebrow: "از جامعه‌مان حمایت کنید",
    headingA: "حمایت از انجمن",
    headingB: "شیعیان افغانستان کلگری",
    intro:
      "کمک‌های مالی شما به برنامه‌های مذهبی، آموزش جوانان، رویدادهای اجتماعی و خدمات مستمر جامعه کمک می‌کند. با همراهی شما، درهای مرکزمان برای نماز، آموزش و گردهمایی باز می‌ماند.",
    quoteEn:
      "«کیست که به خداوند قرض‌الحسنه دهد؟» — قرآن کریم، سورهٔ بقره ۲:۲۴۵",
    cardEyebrow: "کمک مالی از طریق Interac e-Transfer",
    cardTitle: "کمک خود را از طریق e-Transfer ارسال کنید",
    cardIntro:
      "کمک‌های مالی از طریق Interac e-Transfer پذیرفته می‌شود. لطفاً مبلغ خود را از طریق بانکداری آنلاین به آدرس ایمیل زیر ارسال کنید.",
    sendTo: "ارسال e-Transfer به",
    copy: "کپی",
    copied: "کپی شد",
    copyAria: "کپی ایمیل دریافت e-Transfer",
    step1Pre: "وارد بانکداری آنلاین خود شوید و گزینهٔ",
    step1Strong: "Interac e-Transfer",
    step1Post: "را انتخاب کنید.",
    step2Pre: "کمک خود را به آدرس زیر ارسال کنید:",
    step2Post: ".",
    step3Pre: "یادداشتی مانند",
    step3Italic: "«Donation – ASSC»",
    step3Post: " اضافه کنید تا بتوانیم کمک شما را پیگیری کنیم.",
    emailUs: "ایمیل بزنید",
    callUs: "تماس بگیرید",
    closing:
      "خداوند (سبحانه و تعالی) سخاوت شما را قبول کند و پاداش فراوان عطا فرماید. جزاکم الله خیراً.",
    items: [
      {
        title: "برنامه‌های مذهبی",
        text: "حمایت از نمازهای روزانه، سخنرانی‌ها و مجالس در مرکز ما.",
      },
      {
        title: "آموزش جوانان",
        text: "تأمین مالی کلاس‌های قرآن، راهنمایی و فعالیت‌های جوانان.",
      },
      {
        title: "خدمات اجتماعی",
        text: "کمک به برگزاری رویدادها، افطاری‌ها و حمایت مستمر جامعه.",
      },
    ],
  },
  newsletter: {
    eyebrow: "در ارتباط بمانید",
    headingA: "به فهرست",
    headingB: "جامعهٔ ما بپیوندید",
    intro:
      "اولین کسی باشید که از رویدادهای پیش‌رو، اوقات نماز، برنامه‌ها و اطلاعیه‌های انجمن شیعیان افغانستان کلگری مطلع می‌شود.",
    firstName: "نام",
    lastName: "نام خانوادگی",
    email: "ایمیل",
    phone: "شمارهٔ تلفن",
    firstPlaceholder: "علی",
    lastPlaceholder: "احمدی",
    emailPlaceholder: "you@example.com",
    phonePlaceholder: "403-555-0123",
    subscribe: "عضویت",
    subscribing: "در حال عضویت...",
    privacy:
      "ما به حریم خصوصی شما احترام می‌گذاریم. اطلاعات شما فقط برای ارسال اخبار ASSC استفاده می‌شود و هرگز به اشتراک گذاشته نمی‌شود.",
    thankYouTitle: "متشکریم!",
    successPosted:
      "شما در فهرست ما قرار گرفتید! اخبار جامعه و دعوت‌نامهٔ رویدادها را برایتان ارسال خواهیم کرد.",
    successMailto:
      "متشکریم! برنامهٔ ایمیل شما باید با یک پیام آماده باز شود — کافی است دکمهٔ ارسال را بزنید تا ثبت‌نام تکمیل شود.",
    addAnother: "ثبت‌نام یک نفر دیگر",
    errors: {
      firstName: "لطفاً نام خود را وارد کنید.",
      lastName: "لطفاً نام خانوادگی خود را وارد کنید.",
      email: "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
      phone:
        "لطفاً یک شمارهٔ تلفن معتبر وارد کنید (حداقل ۱۰ رقم).",
      submit:
        "اطلاعات شما ثبت نشد. لطفاً دوباره تلاش کنید یا مستقیماً ایمیل بزنید.",
    },
  },
  membership: {
    eyebrow: "عضویت در انجمن",
    headingA: "به انجمن شیعیان",
    headingB: "افغانستان کلگری بپیوندید",
    intro:
      "از اعضای جامعه برای پیوستن به انجمن استقبال می‌کنیم. عضویت شما به تقویت برنامه‌ها، حمایت متقابل و رشد مرکزی که در خدمت همهٔ ماست کمک می‌کند.",
    description:
      "اگر مایل به عضویت در انجمن شیعیان افغانستان کلگری هستید، لطفاً فرم درخواست عضویت را دانلود کنید، آن را به‌طور کامل تکمیل کنید و فرم پر شده را به ایمیل ما ارسال کنید. کمیتهٔ ما درخواست شما را بررسی کرده و برای تأیید عضویت با شما تماس خواهد گرفت.",
    step1Title: "فرم را دانلود کنید",
    step1Text:
      "فایل PDF فرم درخواست عضویت را در گوشی یا رایانهٔ خود ذخیره کنید.",
    step2Title: "فرم را تکمیل کنید",
    step2Text:
      "تمام بخش‌های فرم را با اطلاعات خود تکمیل کنید — می‌توانید چاپ و امضا کنید یا به‌صورت دیجیتال پر کنید.",
    step3Title: "برای ما ایمیل کنید",
    step3Text:
      "فرم تکمیل‌شده را به آدرس ایمیل زیر ارسال کنید. ما بررسی کرده و مراحل بعدی را به شما اطلاع خواهیم داد.",
    downloadButton: "دانلود فرم درخواست عضویت (PDF)",
    sendTo: "فرم تکمیل‌شده را به این آدرس ارسال کنید",
    fileLabel: "PDF · فرم درخواست عضویت ASAC",
    questionsPre: "سؤالی دارید؟ با ما تماس بگیرید:",
    questionsPost: "یا هر زمان ایمیل بزنید.",
    closing:
      "از پیوستن شما به جامعهٔ ما خرسند خواهیم شد. جزاکم الله خیراً.",
  },
  footer: {
    description:
      "جامعه‌ای گرم از مسلمانان شیعهٔ افغانستان در کلگری — در خدمت از طریق عبادت، آموزش، فرهنگ و حمایت اجتماعی.",
    quickLinks: "لینک‌های سریع",
    getInTouch: "تماس با ما",
    rights: "تمامی حقوق محفوظ است.",
    builtWith: "با عشق برای جامعه ساخته شده است.",
    organizer: "سازمان‌دهنده",
  },
};

export const translations: Record<Lang, typeof en> = { en, fa };
