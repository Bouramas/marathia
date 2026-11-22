// Hand-authored homepage layout data (NOT part of the auto-generated content
// pipeline). Rebuilds the live front page as a sequence of alternating
// image/text teaser bands, each linking to the full content page. Copy is taken
// verbatim (trimmed to a teaser) from the WP front-page body in
// src/content/pages/home.ts — both locales there are enReviewed:true. CTA
// targets are content keys resolved per-locale via pathForKey().
import type { Localized } from '@/types/content'

export interface HomeBand {
  id: string
  kicker: Localized
  title: Localized
  body: Localized
  image: string
  /** Content key for the "read more" target (resolved per locale). */
  ctaKey: string
  ctaLabel: Localized
  /** Optional secondary button rendered before the main CTA. */
  secondaryCta?: { key: string; label: Localized }
  /** Optional extra links (content keys) shown as an elegant list instead of the single CTA. */
  links?: { key: string; label: Localized }[]
  /** Portrait crop with an offset gold outline. */
  framed?: boolean
  /** Arched top on the framed image. */
  arch?: boolean
  /** Image on the right (text on the left) from lg up. */
  reverse?: boolean
  /** Warm cream background band, for vertical rhythm. */
  tint?: boolean
  /** Optional second text block shown under the first, sharing the band's image. */
  extra?: {
    kicker: Localized
    title: Localized
    body: Localized
    ctaKey: string
    ctaLabel: Localized
  }
}

export const homeBands: HomeBand[] = [
  {
    id: 'maturation',
    kicker: { el: 'Ωρίμανση ψαριών', en: 'Fish aging' },
    title: {
      el: 'Πρωτοπορία στην ωρίμανση ψαριών',
      en: 'Pioneers in fish aging',
    },
    body: {
      el: 'Η Μαραθιά πρωτοπορεί στην Ελλάδα στην ωρίμανση ψαριών χάρη σε διαρκές R&D και ενδελεχή έρευνα του ιδιοκτήτη της, Μαρίνου Σουράνη, που ξεκίνησε από το 2010. Τον Ιούνιο του 2025 εκδόθηκε το βιβλίο του «Ψάρια και Ωρίμανση» από τις εκδόσεις Νεφέλη.',
      en: 'Marathia is the Greek leader in fish aging techniques thanks to the continuous R&D and thorough research that the owner, Marinos Souranis, began in 2010. In June 2025 his book “Fish and Aging” was published by Nefeli.',
    },
    image: '/assets/pictures/dining/dark_plate.jpg',
    framed: true,
    ctaKey: 'orimansi-psarion',
    ctaLabel: { el: 'Διαβάστε περισσότερα', en: 'Read more' },
    reverse: true,
    tint: true,
  },
  {
    id: 'services',
    kicker: { el: 'Υπηρεσίες', en: 'Services' },
    title: {
      el: 'Εργαστήρια, γαστροτουρισμός & συμβουλευτική',
      en: 'Workshops, gastrotourism & consulting',
    },
    body: {
      el: 'Η Μαραθιά διοργανώνει βιωματικά εργαστήρια για επαγγελματίες της γαστρονομίας, καθώς και προγράμματα γαστροτουρισμού, και προσφέρει συμβουλευτική σε εστιατόρια από την Ελλάδα και το εξωτερικό.',
      en: 'Marathia organises experiential workshops for culinary professionals, as well as gastrotourism programmes, and provides consulting services for restaurants in Greece and abroad.',
    },
    image: '/assets/pictures/dining/dish_4.jpg',
    framed: true,
    links: [
      { key: 'biomatika-ergastiria-gia-epangelmaties', label: { el: 'Εργαστήρια', en: 'Workshops' } },
      { key: 'seminaria-gastrotourismou', label: { el: 'Γαστροτουρισμός', en: 'Gastrotourism' } },
      { key: 'symvouleftiki', label: { el: 'Συμβουλευτική', en: 'Consulting' } },
    ],
    ctaKey: 'biomatika-ergastiria-gia-epangelmaties',
    ctaLabel: { el: 'Διαβάστε περισσότερα', en: 'Read more' },
  },
  {
    id: 'guesthouse',
    kicker: { el: 'Family Guesthouse', en: 'Family Guesthouse' },
    title: {
      el: 'Μια υπέροχη εμπειρία ξεγνοιασιάς',
      en: 'A wonderful, carefree experience',
    },
    body: {
      el: 'Ο ξενώνας της Μαραθιάς είναι οικογενειακή επιχείρηση. Μας χαρακτηρίζει η αυθεντική και ανεπιτήδευτη φιλοξενία, με σουίτες και δωμάτια σχεδιασμένα σε λιτή κυκλαδίτικη αρχιτεκτονική. Διαθέτει πιστοποίηση Green Key από το 2016.',
      en: 'Marathia Guesthouse is a family business, known for its authentic and unpretentious hospitality, with suites and rooms designed in simple Cycladic architecture. It has been Green Key certified since 2016.',
    },
    image: '/assets/uploads/2024/12/rooms-in-800x451_DSC3501.jpg',
    framed: true,
    arch: true,
    ctaKey: 'forma-kratisis-domatiou',
    ctaLabel: { el: 'Κάντε κράτηση', en: 'Book now' },
    secondaryCta: { key: 'souites-kai-domatia', label: { el: 'Δείτε περισσότερα', en: 'See more' } },
    reverse: true,
    tint: true,
  },
  {
    id: 'delicacies',
    kicker: { el: 'Χειροποίητες λιχουδιές', en: 'Handmade delicacies' },
    title: {
      el: 'Πρωινό & τοπικά προϊόντα',
      en: 'Breakfast & local products',
    },
    body: {
      el: 'Η ημέρα ξεκινάει με πρωινό στο μπουφέ της Μαραθιάς, με θέα στη θάλασσα: γλυκές και αλμυρές πίτες, φρούτα και φρέσκους χυμούς, τυριά και αλλαντικά της Τήνου, ζυμωτό ψωμί, χειροποίητες μαρμελάδες και μέλι.',
      en: 'The day starts with breakfast at the Marathia buffet with its view of the sea: sweet and savoury pies, fruit and fresh juices, cheeses and cold cuts from Tinos, sourdough bread, handmade jams and honey.',
    },
    image: '/assets/pictures/dining/restaurant_a.jpg',
    framed: true,
    ctaKey: 'souites-kai-domatia',
    ctaLabel: { el: 'Διαβάστε περισσότερα', en: 'Read more' },
    // Second text block sharing this band's image (formerly the separate "seaside" band).
    extra: {
      kicker: { el: 'Ζωή δίπλα στη θάλασσα', en: 'Life by the sea' },
      title: {
        el: 'Στην παραλία του Αγίου Φωκά',
        en: 'On Agios Fokas beach',
      },
      body: {
        el: 'Ξεκουραστείτε και αναζωογονηθείτε κάνοντας μπάνιο, περιπάτους και αθλητικές δραστηριότητες στη μεγάλη παραλία του Αγίου Φωκά, που εκτείνεται μέχρι τον αρχαιολογικό χώρο του Βρέκαστρου. Η πόλη της Τήνου απέχει μόλις 2,8 χιλιόμετρα.',
        en: 'Relax and rejuvenate by swimming, walking and enjoying sports on the long Agios Fokas beach, which reaches the archaeological site of Vrekastro. Tinos town is just 2.8 km away.',
      },
      ctaKey: 'i-tinos/me-mia-matia',
      ctaLabel: { el: 'Διαβάστε για την Τήνο', en: 'Discover Tinos' },
    },
  },
]

/** Award badges: original images in public/assets/awards, framed uniformly by CSS in HomeView. */
export const homeAwards: string[] = [
  '2019',
  '2020',
  'skoufoi-2020',
  'skoufoi-2024',
  'fnl-2024',
  'fnl-2025',
  'fnl-2026',
  'greek-kitchen-2026',
].map(
  (n) => `/assets/awards/${n}.jpg`,
)

/** Text-only opening of the homepage (welcome + "everything Tinos produces" story). */
export const homeIntro = {
  intro: [
    {
      el: 'Καλωσήρθατε στο εστιατόριο και τα διαμερίσματα της Μαραθιάς στην παραλία του Αγίου Φωκά της Τήνου. Μια οικογενειακή επιχείρηση που λειτουργεί εδώ και 23 χρόνια στο νησί προσφέροντας αυθεντική φιλοξενία και αξέχαστα γευστικά ταξίδια.',
      en: 'Welcome to Marathia’s restaurant and apartments which enjoy the perfect location on Agios Fokas beach in Tinos. Our family-run business has been operating for 23 years, and we take pride in offering authentic hospitality and taking diners on a wonderful and unforgettable journey through the island’s cuisine.',
    },
    {
      el: 'Στο εστιατόριο της Μαραθιάς αναβιώνουμε με σεβασμό και ζωντανεύουμε ντόπιες γεύσεις και συνταγές, δίνοντάς τους νότες σημερινές και δημιουργικές. Η ψαροφαγία -με την ωρίμανση των ψαριών ως εξέλιξή της-, η τροφοσυλλογή, η υποστήριξη των τοπικών παραγωγών, η εποχικότητα, οι αρχές της ελαχιστοποίησης της απώλειας και της βιωσιμότητας, συνοψίζουν την ταυτότητά μας. Μάλιστα, η Μαραθιά είναι μέλος της Ευρωπαϊκής πρωτοβουλίας I stars, με στόχο τη μείωση του περιβαλλοντικού μας αποτυπώματος.',
      en: 'At Marathia’s restaurant, we respect local dishes and recipes while invigorating and revitalising them by adding creative contemporary touches. Our philosophy and identity revolve around fish cuisine—including fish curing and aging as an extension of this —along with foraging, supporting local producers, using seasonal produce, and minimizing waste in line with sustainable practices. Marathia is also a member of the European I-STARS initiative, and is committed to reducing our environmental footprint.',
    },
  ] as Localized[],
  storyTitle: {
    el: 'Ό,τι βγάζει η Τήνος είναι στο τραπέζι μας',
    en: 'Everything Tinos produces is on our table',
  } as Localized,
  story: [
    {
      el: 'Η Μαραθιά των γεύσεων δημιουργήθηκε το 2002 από τον Μαρίνο Σουράνη, με ένα όνειρο που ζωντανεύει κάθε μέρα και διαφορετικά: «Ό,τι βγάζει η Τήνος να είναι στο τραπέζι μας».',
      en: 'Marathia was created in 2002 by Marinos Souranis, and his dream that “Our tables should be filled with everything Tinos produces” comes to life in a different way every day.',
    },
    {
      el: 'Τα ψάρια και τα τυριά, τα λαχανικά, τα βότανα, ακόμα και τα όσπρια, προέρχονται από το νησί μας, την Τήνο, και κοντινά Κυκλαδονήσια. Στη Μαραθιά, παρέα με καλούς συνοδοιπόρους παραγωγούς, αναβιώνουμε με σεβασμό ό,τι έφτιαχναν και καλλιεργούσαν οι παλιοί, ζωντανεύουμε ντόπιες γεύσεις και συνταγές, δίνοντάς τους νότες σημερινές, δημιουργικές.',
      en: 'Everything we serve - the fish and cheeses, vegetables, herbs, and even the legumes - come from our island, Tinos, and the nearby Cyclades. At Marathia we work with expert producers and we respectfully revitalise both the dishes made in the olden days and the produce grown in the past, bringing traditional recipes and dishes to life with a contemporary creative touch.',
    },
    {
      el: 'Είμαστε, επίσης, πρωτοπόροι στην ωρίμανση ψαριών, για την οποία ο Μαρίνος εκδίδει ένα εμπεριστατωμένο βιβλίο.',
      en: 'We are also pioneers in fish curing and aging, and Marinos is publishing a comprehensive book on the subject.',
    },
    {
      el: 'Κάθε μέρα οι προτάσεις είναι διαφορετικές, ανάλογα με το τι έφερε το καΐκι, τι βρήκαμε στην τοπική αγορά, τι θησαυρούς ξετρυπώσαμε κάνοντας τροφοσυλλογή στο βουνό, τι ευωδιάζει στον βοτανόκαμπο.',
      en: 'Our menu changes every day, depending on what the boat brought in, what we found at the local street market, what treasures we unearthed while foraging in the mountains and what smells best in the herb garden.',
    },
  ] as Localized[],
  closing: {
    el: 'Κάθε πρωί που ξημερώνει για τη Μαραθιά σημαίνει και ένα νέο γευστικό ταξίδι…',
    en: 'Every morning that dawns at Marathia is a new culinary journey…',
  } as Localized,
  links: [
    { key: 'about/i-istoria-mas', label: { el: 'Η ιστορία μας', en: 'Our history' } as Localized },
    { key: 'about/i-filosofia-mas', label: { el: 'Η φιλοσοφία μας', en: 'Our philosophy' } as Localized },
  ],
}
