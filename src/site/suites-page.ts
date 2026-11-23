// Hand-authored copy + layout data for the /suites overview (SuitesView).
// Intro copy is verbatim from src/content/pages/souites-kai-domatia.ts.
import type { Localized } from '@/types/content'

const L = <T = string>(el: T, en: T): Localized<T> => ({ el, en })

export const suites = {
  kicker: L('Family Guesthouse · Άγιος Φωκάς', 'Family Guesthouse · Agios Fokas'),
  image: '/assets/pictures/guesthouse/standard/standard_room.jpg',
  intro: L(
    [
      'Ο ξενώνας της Μαραθιάς που βρίσκεται στην παραλία του Αγίου Φωκά, στην Τήνο, είναι οικογενειακή επιχείρηση. Μας χαρακτηρίζει η αυθεντική και ανεπιτίδευτη φιλοξενία με χαμόγελο και αγάπη, κάτι που κάνει πολλούς πελάτες να γίνουν φίλοι και να ξανάρχονται για να περάσουν τις διακοπές τους μαζί μας. Μας αρέσει να εξελισσόμαστε διαρκώς και να προσφέρουμε ολοένα και περισσότερες από τις υπηρεσίες που έχει ανάγκη ο σύγχρονος ταξιδιώτης.',
      'Στις παροχές που μας κάνουν να ξεχωρίζουμε είναι το μπουφέ του πρωινού με τις χειροποίητες γεύσεις και τα ολόφρεσκα τοπικά υλικά, που δημιουργεί καθημερινά η ομάδα του εστιατορίου της Μαραθιάς.',
      'Ο ξενώνας μας έχει πιστοποίηση Green Key από το 2016 με την οποία βεβαιώνονται οι ορθές πρακτικές μας ως προς τη μείωση του περιβαλλοντικού αποτυπώματος.',
      'Οι σουίτες και τα δωμάτιά μας είναι πλήρως εξοπλισμένα και τα χαρακτηρίζουν τα ποιοτικά υλικά, οι λιτές γραμμές και τα γήινα χρώματα. Έχουν σχεδιαστεί από τον αρχιτέκτονα Κώστα Μπόμπολα, με λιτή κυκλαδίτικη αρχιτεκτονική και χρήση τσιμεντοκονίας. Οι δροσερές, ήσυχες αυλές και βεράντες, γεμάτες βασιλικούς, μπουκαμβίλιες και αρωματικά βότανα, είναι ιδανικές για να πάρετε πρωινό, να διαβάσετε το βιβλίο σας και να χαλαρώσετε.',
    ],
    [
      'Marathia Guesthouse, located on Agios Fokas beach, in Tinos, is a family business. Our trademark is authentic and unpretentious hospitality with a smile, which is why so many customers become friends and return again and again to spend their holidays with us. We like to keep on evolving and offering more and more of the services that today’s travellers need.',
      'One of the amenities that make us stand out from the crowd is our breakfast buffet featuring handmade food and fresh local ingredients, all created daily by the team at the Marathia restaurant.',
      'Our guesthouse has been Green Key certified since 2016, something which confirms our good practice in reducing our environmental footprint.',
      'Our suites and rooms are fully equipped and are characterised by quality materials, simple lines and earthy colours. They were designed by the architect Kostas Bobolas, in line with the simplicity of traditional Cycladic architecture including the use of cement mortar. The cool, quiet courtyards and verandas filled with basil, bougainvillea and herbs are the ideal place to enjoy breakfast, read your book or just relax.',
    ],
  ),
  highlights: [
    { value: L('2016', '2016'), label: L('Πιστοποίηση Green Key', 'Green Key certified') },
    { value: L('8', '8'), label: L('Δωμάτια και σουίτες', 'Rooms and suites') },
    { value: L('Πρωινό', 'Breakfast'), label: L('Μπουφέ με τοπικά υλικά', 'Buffet of local ingredients') },
    { value: L('1\'', '1\''), label: L('Περπάτημα μέχρι την παραλία', 'Walk to the beach') },
  ],
  roomsKicker: L('Τα δωμάτιά μας', 'Our rooms'),
  roomsTitle: L('Επιλέξτε το δικό σας', 'Find your place'),
  view: L('Δείτε τα δωμάτια', 'View rooms'),
  rooms: [
    {
      key: 'souites-kai-domatia/diklina',
      name: L('Standard Δίκλινα', 'Standard Doubles'),
      size: L('22-24 τ.μ.', '22-24 sqm'),
      sleeps: L('Φιλοξενεί 2', 'Sleeps 2'),
      count: L('3 δωμάτια', '3 rooms'),
      image: '/assets/pictures/guesthouse/standard/standard_room.jpg',
      body: L(
        'Studios στη δροσερή και επιπλωμένη αυλή μας, με Queen size κρεβάτι, ή δύο μονά. Είναι εξοπλισμένα και ωραία διακοσμημένα σε γήινα χρώματα.',
        'Studios in our cool furnished yard, featuring a Queen size bed, or two singles. They are fully equipped and beautifully decorated in earthy colours.',
      ),
      tags: L(['Queen ή 2 μονά', 'Αυλή'], ['Queen or 2 singles', 'Courtyard']),
    },
    {
      key: 'souites-kai-domatia/superior-diklina-orofou',
      name: L('Superior Δίκλινα', 'Superior Doubles'),
      size: L('30 τ.μ.', '30 sqm'),
      sleeps: L('Φιλοξενεί 2 + 1 παιδί', 'Sleeps 2 + 1 child'),
      count: L('2 δωμάτια', '2 rooms'),
      image: '/assets/pictures/guesthouse/superior/superior_room.jpg',
      body: L(
        'Ιδανικά για οικογένειες με ένα παιδί, αποτελούν ενιαίο χώρο, είναι εξοπλισμένα, άνετα και καλαίσθητα. Διαθέτουν Queen size κρεβάτι και σαλονάκι.',
        'Ideal for families with one child, these are an open plan, fully-equipped, comfortable and stylish space. They have a Queen size bed and a living area.',
      ),
      tags: L(['Queen', 'Σαλονάκι'], ['Queen bed', 'Living area']),
    },
    {
      key: 'souites-kai-domatia/junior-suites',
      name: L('Junior Suites', 'Junior Suites'),
      size: L('40-42 τ.μ.', '40-42 sqm'),
      sleeps: L('Φιλοξενεί 4', 'Sleeps 4'),
      count: L('3 σουίτες', '3 suites'),
      image: '/assets/pictures/guesthouse/junior/junior_suites.jpg',
      body: L(
        'Τα δίχωρα αυτά διαμερίσματα βρίσκονται στον όροφο ή στη δροσερή αυλή μας. Είναι ευρύχωρα, διαθέτουν Queen size κρεβάτι και δύο μονά, ή καναπέ-κρεβάτι. Μπορούν να φιλοξενήσουν οικογένειες και παρέες.',
        'These two room apartments are located on the first floor or in our cool courtyard. They are spacious, with a Queen size bed and two singles, or a sofa bed. They can accommodate families and groups of friends.',
      ),
      tags: L(['Queen + 2 μονά', 'Οικογένειες & παρέες'], ['Queen + 2 singles', 'Families & groups']),
    },
  ],
  ctaTitle: L('Ετοιμάστε τις διακοπές σας', 'Plan your stay'),
  ctaBody: L(
    'Στείλτε μας το αίτημα κράτησης και θα επικοινωνήσουμε μαζί σας για την επιβεβαίωση.',
    'Send us a booking request and we will get back to you to confirm.',
  ),
  ctaBook: L('Κράτηση', 'Book now'),
  ctaContact: L('Επικοινωνία', 'Contact us'),
}
