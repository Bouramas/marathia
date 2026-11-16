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
  /** Image on the right (text on the left) from lg up. */
  reverse?: boolean
  /** Warm cream background band, for vertical rhythm. */
  tint?: boolean
}

export const homeBands: HomeBand[] = [
  {
    id: 'philosophy',
    kicker: { el: 'Μαραθιά', en: 'Marathia' },
    title: {
      el: '«Ό,τι βγάζει η Τήνος να είναι στο τραπέζι μας»',
      en: '“Our tables should be filled with everything Tinos produces”',
    },
    body: {
      el: 'Καλωσήρθατε στο εστιατόριο και τα διαμερίσματα της Μαραθιάς στην παραλία του Αγίου Φωκά της Τήνου. Μια οικογενειακή επιχείρηση που λειτουργεί εδώ και 23 χρόνια στο νησί, προσφέροντας αυθεντική φιλοξενία και αξέχαστα γευστικά ταξίδια.',
      en: 'Welcome to Marathia’s restaurant and apartments which enjoy the perfect location on Agios Fokas beach in Tinos. Our family-run business has been operating for 23 years, offering authentic hospitality and taking diners on an unforgettable journey through the island’s cuisine.',
    },
    image: '/assets/uploads/2024/12/new-orthia-filosofia-831x1274-1.jpg',
    ctaKey: 'about/i-filosofia-mas',
    ctaLabel: { el: 'Διαβάστε περισσότερα', en: 'Read more' },
  },
  {
    id: 'maturation',
    kicker: { el: 'Ωρίμανση ψαριών', en: 'Fish ageing' },
    title: {
      el: 'Πρωτοπορία στην ωρίμανση ψαριών',
      en: 'Pioneers in fish ageing',
    },
    body: {
      el: 'Η Μαραθιά πρωτοπορεί στην Ελλάδα στην ωρίμανση ψαριών χάρη σε διαρκές R&D και ενδελεχή έρευνα του ιδιοκτήτη της, Μαρίνου Σουράνη, που ξεκίνησε από το 2010. Τον Ιούνιο του 2025 εκδόθηκε το βιβλίο του «Ψάρια και Ωρίμανση» από τις εκδόσεις Νεφέλη.',
      en: 'Marathia is the Greek leader in fish ageing techniques thanks to the continuous R&D and thorough research that the owner, Marinos Souranis, began in 2010. In June 2025 his book “Fish and Ageing” was published by Nefeli.',
    },
    image: '/assets/uploads/2025/01/orimansi-arxiki.jpg',
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
    image: '/assets/uploads/2025/01/seminars.jpg',
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
    ctaKey: 'forma-kratisis-domatiou',
    ctaLabel: { el: 'Κάντε κράτηση', en: 'Book now' },
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
    image: '/assets/uploads/2024/12/oti-vgazei-i-tinos1.jpg',
    ctaKey: 'souites-kai-domatia',
    ctaLabel: { el: 'Διαβάστε περισσότερα', en: 'Read more' },
  },
  {
    id: 'seaside',
    kicker: { el: 'Ζωή δίπλα στη θάλασσα', en: 'Life by the sea' },
    title: {
      el: 'Στην παραλία του Αγίου Φωκά',
      en: 'On Agios Fokas beach',
    },
    body: {
      el: 'Ξεκουραστείτε και αναζωογονηθείτε κάνοντας μπάνιο, περιπάτους και αθλητικές δραστηριότητες στη μεγάλη παραλία του Αγίου Φωκά, που εκτείνεται μέχρι τον αρχαιολογικό χώρο του Βρέκαστρου. Η πόλη της Τήνου απέχει μόλις 2,8 χιλιόμετρα.',
      en: 'Relax and rejuvenate by swimming, walking and enjoying sports on the long Agios Fokas beach, which reaches the archaeological site of Vrekastro. Tinos town is just 2.8 km away.',
    },
    image: '/assets/uploads/2024/12/dipla-sto-opario.jpg',
    ctaKey: 'i-tinos/me-mia-matia',
    ctaLabel: { el: 'Διαβάστε για την Τήνο', en: 'Discover Tinos' },
    reverse: true,
    tint: true,
  },
]

/** Award badges shown in the logo strip near the foot of the homepage. */
export const homeAwards: string[] = [
  '/assets/uploads/2024/12/skoufoi-24.jpg',
  '/assets/uploads/2024/12/scoufoi-2020.jpg',
  '/assets/uploads/2024/12/fnl_2024.jpg',
  '/assets/uploads/2024/12/2020.jpg',
]
