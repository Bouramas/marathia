// Hand-authored data for the three room pages (RoomView): standard, superior, junior.
// Copy is verbatim from src/content/pages/souites-kai-domatia-{diklina,
// superior-diklina-orofou,junior-suites}.ts (both locales enReviewed:true), regrouped
// into the shared page layout. Room names/sizes come from `suites.rooms`.
import type { Localized } from '@/types/content'

const L = <T = string>(el: T, en: T): Localized<T> => ({ el, en })

export type AmenityIcon = 'bed' | 'cup' | 'leaf' | 'bell'

export interface AmenityGroupData {
  icon: AmenityIcon
  title: Localized
  items: Localized[]
}

export interface RoomPage {
  key: string
  hero: string
  /** Quick facts shown under the hero title. */
  facts: { label: Localized; value: Localized }[]
  intro: Localized
  /** What makes this room different, shown as a highlighted row above the amenities. */
  signature: Localized[]
  /** Room-specific sleeping items, prepended to the shared "comfort" group. */
  beds: Localized[]
  /** Extra kitchen items for this room (e.g. a kitchenette). */
  kitchen: Localized[]
  gallery: { src: string; alt: Localized }[]
}

const G = '/assets/pictures/guesthouse'

export const roomUi = {
  kicker: L('Family Guesthouse · Άγιος Φωκάς', 'Family Guesthouse · Agios Fokas'),
  back: L('Όλα τα δωμάτια', 'All rooms'),
  includedKicker: L('Περιλαμβάνεται στην τιμή', 'Included in your stay'),
  included: [
    L('Παραδοσιακό ελληνικό-τηνιακό πρωινό σε μπουφέ στο εστιατόριο Μαραθιά', 'Traditional Greek-Tinian buffet breakfast at the Marathia restaurant'),
    L('Ομπρέλα με ξαπλώστρες στην παραλία μας', 'An umbrella with sun loungers on our beach'),
  ],
  galleryKicker: L('Φωτογραφίες', 'Gallery'),
  galleryTitle: L('Ρίξτε μια ματιά', 'Take a look inside'),
  galleryOpen: L('Μεγέθυνση φωτογραφίας', 'Enlarge photo'),
  close: L('Κλείσιμο', 'Close'),
  prev: L('Προηγούμενη', 'Previous'),
  next: L('Επόμενη', 'Next'),
  amenitiesKicker: L('Παροχές', 'Amenities'),
  amenitiesTitle: L('Όλα όσα χρειάζεστε', 'Everything you need'),
  signatureKicker: L('Το δωμάτιο ξεχωρίζει για', 'What sets this room apart'),
  linenNote: L('* Τα σεντόνια & οι πετσέτες είναι από 100% βαμβάκι', '* Bed linens & towels are 100% cotton'),
  othersKicker: L('Ανακαλύψτε και', 'Also at Marathia'),
  othersTitle: L('Τα υπόλοιπα δωμάτια', 'Other rooms'),
  view: L('Δείτε το δωμάτιο', 'View room'),
  ctaTitle: L('Ετοιμάστε τις διακοπές σας', 'Plan your stay'),
  ctaBody: L(
    'Στείλτε μας το αίτημα κράτησης και θα επικοινωνήσουμε μαζί σας για την επιβεβαίωση.',
    'Send us a booking request and we will get back to you to confirm.',
  ),
  ctaBook: L('Κράτηση', 'Book now'),
  ctaContact: L('Επικοινωνία', 'Contact us'),
  factSize: L('Εμβαδόν', 'Size'),
  factBeds: L('Κρεβάτια', 'Beds'),
  factSetting: L('Χώρος', 'Setting'),
}

/** Amenities shared by every room (the room's own beds/kitchen items are merged in by the view). */
export const sharedAmenities = {
  comfort: {
    icon: 'bed' as const,
    title: L('Άνεση', 'Comfort & sleep'),
    items: [
      L('Air condition', 'Air conditioning'),
      L('Free Wi-Fi', 'Free Wi-Fi'),
      L('Χρηματοκιβώτιο', 'Safe'),
      L('Σίδερο', 'Iron'),
      L('Kαλάθι υποδοχής με φρούτα', 'Welcome basket with fruit'),
    ],
  },
  kitchen: {
    icon: 'cup' as const,
    title: L('Καφές & κουζίνα', 'Coffee & kitchen'),
    items: [L('Ψυγείο', 'Refrigerator'), L('Βραστήρας, καφετιέρα, κουζινικά', 'Kettle, coffee maker, kitchenware')],
  },
  bath: {
    icon: 'leaf' as const,
    title: L('Μπάνιο & περιποίηση', 'Bath & care'),
    items: [
      L('Φυτικά καλλυντικά μπάνιου', 'Natural bath cosmetics'),
      L('Πιστολάκι μαλλιών', 'Hairdryer'),
      L('Καλάθι με amenities', 'Basket with amenities'),
      L('Παντόφλες μιας χρήσης', 'Disposable slippers'),
      L('Πετσέτες παραλίας', 'Beach towels'),
    ],
  },
  services: {
    icon: 'bell' as const,
    title: L('Υπηρεσίες', 'Services'),
    items: [
      L('Καθημερινή υπηρεσία καθαρισμού', 'Daily cleaning service'),
      L('Laundry (κατόπιν συνεννόησης)', 'Laundry service (upon request)'),
      L('Πρωινό στο δωμάτιο (κατόπιν συνεννόησης)', 'Breakfast served in the room (upon request)'),
      L('Room Service από το εστιατόριο μας (12.30 - 20.00)', 'Room service from our restaurant (12:30 – 20:00)'),
      L('Transfer από το λιμάνι, κατόπιν συνεννόησης (με ανάλογη χρέωση)', 'Transfer to and from the port (upon request, with additional charge)'),
    ],
  },
}

export const roomPages: Record<string, RoomPage> = {
  'souites-kai-domatia/diklina': {
    key: 'souites-kai-domatia/diklina',
    hero: `${G}/standard/standard_room.jpg`,
    facts: [
      { label: roomUi.factSize, value: L('22-24 τ.μ.', '22-24 sqm') },
      { label: roomUi.factBeds, value: L('Queen ή 2 μονά', 'Queen or 2 singles') },
      { label: roomUi.factSetting, value: L('Αυλή με βότανα', 'Herb courtyard') },
    ],
    intro: L(
      'Τα studios του ξενώνα της Μαραθιάς, στην Τήνο, είναι καλόγουστα διακοσμημένα, σε γήινες αποχρώσεις, φτιαγμένα με ποιοτικά υλικά. Έχουν κυκλαδίτικη αρχιτεκτονική, με χρήση τσιμεντοκονίας και είναι εξοπλισμένα. Υπάρχει η επιλογή studio με Queen size κρεβάτι, ή δύο μονών. Βλέπουν στη δροσερή και ήσυχη αυλή, που είναι γεμάτη με φυτά και αρωματικά βότανα. Στο άνετο καθιστικό της μπορείτε να πάρετε το πρωινό σας, να διαβάσετε το βιβλίο σας και να χαλαρώσετε.',
      'These fully-equipped studios have been built using quality materials and are tastefully decorated in earthy tones. They were designed to reflect traditional Cycladic architecture including the use of cement mortar. You can choose between a studio with a Queen size bed, or one with two singles. All these studios overlook the cool, peaceful courtyard, which is full of plants and herbs – the perfect place to enjoy your breakfast, read your book or just relax.',
    ),
    signature: [L('Ιδιωτική είσοδος', 'Private entrance'), L('Επιπλωμένη αυλή', 'Furnished courtyard')],
    beds: [L('Queen size κρεβάτι / ή 2 μονά', 'Queen-size bed / or 2 single beds')],
    kitchen: [],
    gallery: [
      { src: `${G}/standard/standard_garden2.jpg`, alt: L('Η δροσερή αυλή με την πέτρινη καμάρα', 'The cool courtyard under the stone arch') },
      { src: `${G}/standard/standard_double2.jpg`, alt: L('Studio με Queen size κρεβάτι', 'Studio with a Queen-size bed') },
      { src: `${G}/standard/standard_singles.jpg`, alt: L('Studio με δύο μονά κρεβάτια', 'Studio with two single beds') },
      { src: `${G}/standard/standard_desk.jpg`, alt: L('Γραφείο με καθρέφτη και φρέσκα λουλούδια', 'Desk with a mirror and fresh flowers') },
      { src: `${G}/standard/standard_garden.jpg`, alt: L('Το καθιστικό της αυλής', 'The courtyard seating area') },
      { src: `${G}/standard/standard_bathroom.jpg`, alt: L('Μπάνιο με τσιμεντοκονία', 'Bathroom with cement mortar finish') },
    ],
  },
  'souites-kai-domatia/superior-diklina-orofou': {
    key: 'souites-kai-domatia/superior-diklina-orofou',
    hero: `${G}/superior/superior_room.jpg`,
    facts: [
      { label: roomUi.factSize, value: L('30 τ.μ.', '30 sqm') },
      { label: roomUi.factBeds, value: L('Queen + σαλονάκι', 'Queen + living area') },
      { label: roomUi.factSetting, value: L('Όροφος, θέα στη θάλασσα', 'Upper floor, sea view') },
    ],
    intro: L(
      'Τα διαμερίσματα αυτά του ξενώνα της Μαραθιάς στην Τήνο, βρίσκονται στον πρώτο όροφο και αποτελούν ενιαίο χώρο. Είναι εξοπλισμένα και άνετα, φτιαγμένα με ποιοτικά υλικά και έχουν κυκλαδίτικη διακόσμηση με χρήση τσιμεντοκονίας. Διαθέτουν Queen size κρεβάτι και μικρό σαλόνι. Προσφέρουν θέα στη θάλασσα από ψηλά και είναι ιδανικά για οικογένειες με ένα παιδί.',
      'These open plan apartments in the Marathia guesthouse Tinos are located on the upper floor of the guesthouse. They are fully equipped and spacious, built using quality materials and are decorated in the traditional Cycladic style including the use of cement mortar. The suites have a Queen size bed, a small living area, and a view out over the sea. Ideal for families with one child.',
    ),
    signature: [L('Σε όροφο', 'Upper floor'), L('Θέα στη θάλασσα', 'Sea view'), L('Μικρό σαλόνι', 'Small living area')],
    beds: [L('Queen size κρεβάτι', 'Queen-size bed')],
    kitchen: [],
    gallery: [
      { src: `${G}/superior/superior_window.jpg`, alt: L('Παράθυρο με θέα σε μπουκαμβίλιες', 'Window overlooking bougainvillea') },
      { src: `${G}/superior/superior_double.jpg`, alt: L('Το Queen size κρεβάτι', 'The Queen-size bed') },
      { src: `${G}/superior/superior_couch.jpg`, alt: L('Το σαλονάκι', 'The living area') },
      { src: `${G}/superior/superior_desk.jpg`, alt: L('Γραφείο με καθρέφτη και έξοδο στη βεράντα', 'Desk with a mirror and door to the balcony') },
      { src: `${G}/superior/superior_flower.jpg`, alt: L('Ηλιοτρόπια και πορσελάνες δίπλα στο παράθυρο', 'Sunflowers and porcelain by the window') },
      { src: `${G}/superior/superior_bathroom.jpg`, alt: L('Μπάνιο με τσιμεντοκονία', 'Bathroom with cement mortar finish') },
    ],
  },
  'souites-kai-domatia/junior-suites': {
    key: 'souites-kai-domatia/junior-suites',
    hero: `${G}/junior/junior_suites.jpg`,
    facts: [
      { label: roomUi.factSize, value: L('40-42 τ.μ.', '40-42 sqm') },
      { label: roomUi.factBeds, value: L('Queen + 2 μονά ή καναπές-κρεβάτι', 'Queen + 2 singles or sofa bed') },
      { label: roomUi.factSetting, value: L('Βεράντα ή αυλή', 'Veranda or courtyard') },
    ],
    intro: L(
      'Δίχωρα διαμερίσματα στον ξενώνα της Μαραθιάς, στην Τήνο, που είναι ιδανικά για οικογένειες και παρέες. Βρίσκονται στον πρώτο όροφο και έχουν άνετη βεράντα, ή στο ισόγειο με τη λουλουδιασμένη, δροσερή και ήσυχη αυλή. Είναι μεγάλα, φτιαγμένα με ποιοτικά υλικά και χρήση τσιμεντοκονίας -ειδικά στα καλόγουστα μπάνια. Διαθέτουν Queen size κρεβάτι και δύο μονά ή καναπέ - κρεβάτι, καθώς και εξοπλισμένο κουζινάκι.',
      'Two-room apartments in the Marathia guesthouse, Tinos. These are ideal for families and groups. They are located on the upper floor with a large veranda, or on the ground floor with the cool, peaceful courtyard which is filled with plants. They are large, and made with quality materials including the traditional Cycladic cement mortar - especially in the tasteful bathrooms. They include a Queen size bed and two singles or a sofa bed, and a fully-equipped kitchenette.',
    ),
    signature: [
      L('Στον όροφο, με βεράντα', 'Upper floor with veranda'),
      L('Ιδιωτική είσοδος', 'Private entrance'),
      L('Εξοπλισμένο κουζινάκι', 'Fully-equipped kitchenette'),
    ],
    beds: [L('Queen size κρεβάτι', 'Queen-size bed'), L('Δύο μονά κρεβάτια ή καναπές-κρεβάτι', 'Two single beds or sofa beds')],
    kitchen: [L('Εξοπλισμένο κουζινάκι', 'Fully-equipped kitchenette')],
    gallery: [
      { src: `${G}/junior/junior_suite1.jpg`, alt: L('Υπνοδωμάτιο με Queen size κρεβάτι', 'Bedroom with a Queen-size bed') },
      { src: `${G}/junior/junior_outside.jpg`, alt: L('Η αυλή με την πέτρινη καμάρα', 'The courtyard under the stone arch') },
      { src: `${G}/junior/junior_suite2.jpg`, alt: L('Ο χώρος με τον καναπέ-κρεβάτι', 'The sofa bed area') },
      { src: `${G}/junior/junior_suite_kitchen.jpg`, alt: L('Το εξοπλισμένο κουζινάκι', 'The fully-equipped kitchenette') },
      { src: `${G}/junior/junior_suite3.jpg`, alt: L('Κουζινάκι με έξοδο στη βεράντα', 'Kitchenette opening onto the veranda') },
      { src: `${G}/junior/junior_suite4.jpg`, alt: L('Καναπές-κρεβάτι με φυσικό φως', 'Sofa bed in natural light') },
      { src: `${G}/junior/junior_suite_bathroom.jpg`, alt: L('Μπάνιο με τσιμεντοκονία', 'Bathroom with cement mortar finish') },
      { src: `${G}/junior/junior_suite6.jpg`, alt: L('Λεπτομέρεια από το ξύλινο κεφαλάρι', 'Detail of the wooden headboard') },
      { src: `${G}/junior/junior_suite_bathroom1.jpg`, alt: L('Μπάνιο με φωτιζόμενο καθρέφτη', 'Bathroom with a backlit mirror') },
    ],
  },
}
