// Hand-authored layout data for the three "story" pages (history, philosophy,
// fish maturation). NOT part of the generated content pipeline. Copy is taken
// verbatim from src/content/pages/{about-i-istoria-mas,about-i-filosofia-mas,
// orimansi-psarion}.ts (both locales enReviewed:true) and split into sections.
// Links point at content keys, resolved per locale via pathForKey().
import type { Localized } from '@/types/content'

const L = <T = string>(el: T, en: T): Localized<T> => ({ el, en })

export interface CtaLink {
  key: string
  label: Localized
}

/* ------------------------------------------------------------------ */
/* History: vertical timeline                                          */
/* ------------------------------------------------------------------ */

export interface Milestone {
  id: string
  /** Large gold label (a year, or a short word). */
  label: Localized
  title: Localized
  body: Localized<string[]>
  image?: string
  cta?: CtaLink
}

export const history = {
  lead: L(
    'Ο ιδιοκτήτης της Μαραθιάς στην Τήνο, Μαρίνος Σουράνης, από μικρός έκανε τη θάλασσα δεύτερο σπίτι του. Έμαθε όλα τα μυστικά του ψαρέματος, καθώς οι θείοι του είχαν δικά τους καΐκια, και έζησε μέσα στη μεγαλύτερη ψαραγορά του νησιού.',
    'The owner of Marathia in Tinos, Marinos Souranis, made the sea his second home from a young age. He learned all the secrets of fishing from his uncles who had their own boats, and he lived near the largest fish market on the island.',
  ),
  milestones: [
    {
      id: '2002',
      label: L('2002', '2002'),
      title: L('Η ταβέρνα στον Άγιο Φωκά', 'The taverna at Agios Fokas'),
      body: L(
        [
          'Το 2002 άνοιξε την ταβέρνα Μαραθιά, στον Άγιο Φωκά της Τήνου. Στην κουζίνα ήταν ο ίδιος, ως μάγειρας, μαζί με τη μητέρα του. Το μενού περιλάμβανε κυρίως φρέσκα ψάρια και θαλασσινά, που τα συμπλήρωναν μαγειρευτά με βάση τηνιακές συνταγές.',
        ],
        [
          'In 2002 he opened Marathia taverna, in Agios Fokas, Tinos. Marinos was the chef, and he and his mother worked together in the kitchen. The menu mainly featured fresh fish and seafood, which were complemented by dishes cooked following traditional recipes from Tinos.',
        ],
      ),
      image: '/assets/uploads/2025/01/istoria-800x450_DSC3723.jpg',
    },
    {
      id: 'dream',
      label: L('Με τον καιρό', 'Over time'),
      title: L('Το όνειρο', 'The dream'),
      body: L(
        [
          'Στην πορεία του χρόνου, ο Μαρίνος υλοποίησε το όνειρό του, που ήταν να κάνει τη Μαραθιά κορυφαίο εστιατόριο στην Τήνο για φρέσκο ψάρι. Δημιούργησε την ομάδα του και εστίασε στην εξέλιξη και τον εμπλουτισμό με σύγχρονες «νότες» των συνταγών που είναι ριζωμένες στη δίαιτα των τηνιακών εδώ και εκατοντάδες χρόνια.',
          'Η μέριμνα ήταν πάντα η τροφοσυλλογή και η προμήθεια των πρώτων υλών -όπως τα λαχανικά, τα τυριά, τα βότανα, τα όσπρια- από την Τήνο και κοντινά Κυκλαδονήσια. Επίσης, η τήρηση των αρχών της ελαχιστοποίησης της απώλειας, καθώς και της βιωσιμότητας.',
        ],
        [
          'Over time, Marinos realized his dream which was to make Marathia the leading fresh fish restaurant in Tinos. He created the team he needed and focused on evolving and enriching recipes which have been a fundamental part of the Tinos diet for hundreds of years, adding modern “notes” to revitalise them.',
          'His focus has always been on foraging and securing a supply of raw ingredients - such as vegetables, cheeses, herbs and legumes - from Tinos and nearby Cyclades islands. Also, the observance of the principles of minimizing loss, as well as sustainability.',
        ],
      ),
    },
    {
      id: '2010',
      label: L('2010', '2010'),
      title: L('Η έρευνα για την ωρίμανση', 'Research into aging'),
      body: L(
        [
          'Το 2010 άρχισε η έρευνα του Μαρίνου Σουράνη σχετικά με την ωρίμανση ψαριών, μια τεχνική που δεν είχε μέχρι τότε εφαρμοστεί στην Ελλάδα -και όχι μόνο.',
        ],
        [
          'In 2010, Marinos Souranis began research on fish aging and curing, a technique that had not been used in Greece, or in many other places, until then.',
        ],
      ),
      image: '/assets/uploads/2025/01/orimansi-arxiki.jpg',
      cta: { key: 'orimansi-psarion', label: L('Η ωρίμανση ψαριών', 'Fish aging') },
    },
    {
      id: '2018',
      label: L('2018', '2018'),
      title: L('Stagionello & Pesciugatore', 'Stagionello & Pesciugatore'),
      body: L(
        [
          'Το 2018, στη διάρκεια του RnD, ήρθε σε επαφή μαζί του ο Alessandro Cuomo, ιδιοκτήτης της ιταλικής εταιρείας Stagionello, η οποία ειδικεύεται στην κατασκευή θαλάμων ωρίμανσης. Η εταιρεία είχε μόλις κατασκευάσει το Pesciugatore, έναν θάλαμο για να γίνεται curing και σίτεμα σε σολομούς. Ο κ. Cuomo ενδιαφέρθηκε για τα πειράματα του Μαρίνου και του έστειλε έναν θάλαμο ώστε εκείνος να βοηθήσει, μεταξύ άλλων, στην εξέλιξή του.',
          'Έτσι, ο Μαρίνος πέτυχε σταδιακά τα αποτελέσματα που επιδίωκε και το μενού της Μαραθιάς εμπλουτίστηκε -και συνεχίζει να εμπλουτίζεται, καθώς η έρευνα δεν σταματά- με συνταγές που βασίζονται σε ψάρια που βγαίνουν από τους θαλάμους παλαίωσης, έχοντας υποστεί υγρή (νωπή), ή ξηρή ωρίμανση.',
        ],
        [
          'In 2018, during his R&D, he was contacted by Alessandro Cuomo, owner of the Italian company Stagionello which specializes in building maturation chambers. The company had just built the Pesciugatore, a chamber for aging salmon. Mr. Cuomo was interested in Marinos’ experiments and sent him a chamber so that he could help, among others, in the further development of the chamber.',
          'Marinos gradually achieved the results he was seeking and the Marathia menu was enriched - and continues to be enriched as the research never stops - with recipes based on the fish that come out of the aging chambers, having undergone wet or dry aging.',
        ],
      ),
    },
    {
      id: '2019',
      label: L('2019', '2019'),
      title: L('Ευριπίδης Αποστολίδης', 'Euripides Apostolidis'),
      body: L(
        [
          'Το 2019 ξεκίνησε η συνεργασία με τον Ευριπίδη Αποστολίδη, με 40 χρόνια εμπειρίας στον τομέα της εστίασης και επί 17 χρόνια διευθυντή στο φημισμένο εστιατόριο Σπονδή.',
        ],
        [
          'In 2019, Marathia began working with Euripides Apostolidis who has 40 years of experience in the catering sector including 17 years as manager of the famous Michelin Star Spondi restaurant in Athens.',
        ],
      ),
      image: '/assets/uploads/2024/08/Marinos-Souranis-kai-Evripidis-Apostolidis1-.jpg',
    },
    {
      id: '2022',
      label: L('2022', '2022'),
      title: L('Μια νέα, δημιουργική ομάδα', 'A new, creative team'),
      body: L(
        [
          'Με τη δημιουργία μιας ομάδας νέων και ταλαντούχων σεφ, το 2022, το μενού της Μαραθιάς πήρε πιο δημιουργική στροφή, υποστηρίζοντας πάντα την κεντρική της φιλοσοφία. Η φήμη του εστιατορίου απογειώθηκε, έχοντας, παράλληλα, πολλά θετικά δημοσιεύματα και κερδίζοντας διακρίσεις.',
        ],
        [
          'A team of young and talented chefs was created and, in 2022, Marathia’s menu took a more creative turn, without moving away from its central philosophy. The restaurant’s reputation grew and grew, and it featured in many highly positive press articles and won a considerable number of awards.',
        ],
      ),
      image: '/assets/uploads/2024/12/DSC3489.jpg',
    },
    {
      id: 'today',
      label: L('Σήμερα', 'Today'),
      title: L('Ο σεφ Βαλάντης Τσακαλίδης', 'Chef Valantis Tsakalidis'),
      body: L(
        [
          'Σήμερα, η ομάδα της Μαραθιάς έχει ως σεφ τον Βαλάντη Τσακαλίδη, με πλούσια θητεία σε καλά και μεγάλα εστιατόρια της Ελλάδας και του εξωτερικού. Συνεχίζει την επιτυχημένη της πορεία, διατηρώντας στην καρδιά της φιλοσοφίας της την ψαροφαγία.',
        ],
        [
          'Today, Marathia’s team has Valantis Tsakalidis as head chef. Valantis has a wealth of experience in great restaurants in Greece and abroad. The restaurant continues to evolve and develop, keeping fish-based cuisine at the heart of its philosophy.',
        ],
      ),
    },
  ] as Milestone[],
  closing: {
    body: L(
      'Το μενού εμπλουτίζεται πάντα σύμφωνα με τις πρώτες ύλες της κάθε εποχής (άνοιξη έως και φθινόπωρο). Διατηρώντας τον βασικό κορμό, που περιλαμβάνει κλασικές και δημοφιλείς συνταγές, κάθε εβδομάδα παρουσιάζονται διαφορετικά πιάτα ημέρας.',
      'The menu is always enriched with the season’s best ingredients (spring to autumn). We serve different dishes of the day every week while remaining true to our core philosophy which is built around classic popular recipes.',
    ),
    services: L(
      'Η Μαραθιά οργανώνει, επίσης, βιωματικά εργαστήρια για επαγγελματίες του χώρου της γαστρονομίας, γαστροτουρισμό και συμβουλευτική σε εστιατόρια από την Ελλάδα και το εξωτερικό.',
      'Marathia also organizes experiential workshops for gastronomy professionals and gastrotourism programmes and offers consulting services for restaurants in Greece and abroad.',
    ),
    links: [
      { key: 'biomatika-ergastiria-gia-epangelmaties', label: L('Εργαστήρια', 'Workshops') },
      { key: 'seminaria-gastrotourismou', label: L('Γαστροτουρισμός', 'Gastrotourism') },
      { key: 'symvouleftiki', label: L('Συμβουλευτική', 'Consulting') },
    ] as CtaLink[],
  },
}

/* ------------------------------------------------------------------ */
/* Philosophy: five pillars                                            */
/* ------------------------------------------------------------------ */

export interface Pillar {
  text: Localized
  cta?: CtaLink
}

export const philosophy = {
  image: '/assets/uploads/2024/12/new-orthia-filosofia-831x1274-1.jpg',
  intro: L(
    'Πέντε βασικές έννοιες βρίσκονται στο επίκεντρο της φιλοσοφίας της Μαραθιάς, τις οποίες κάνουμε πράξη καθημερινά:',
    'There are five basic concepts at the heart of Marathia’s philosophy, and we put each of these into practice every day:',
  ),
  pillars: [
    {
      text: L(
        'Η ψαροφαγία -με την ωρίμανση των ψαριών ως εξέλιξή της',
        'Fish-based cuisine - with fish aging as its evolution',
      ),
      cta: { key: 'orimansi-psarion', label: L('Ωρίμανση ψαριών', 'Fish aging') },
    },
    { text: L('Η υποστήριξη των τοπικών παραγωγών', 'Supporting local producers') },
    { text: L('Η τροφοσυλλογή', 'Foraging') },
    { text: L('Η εποχικότητα', 'Using seasonal produce') },
    {
      text: L(
        'Οι αρχές της ελαχιστοποίησης της απώλειας, καθώς και της βιωσιμότητας',
        'Minimizing waste in line with sustainability',
      ),
    },
  ] as Pillar[],
  identity: L(
    'Αυτή είναι η ταυτότητά μας την οποία σεβόμαστε, υποστηρίζουμε και εξελίσσουμε, ενώ παράλληλα αναβιώνουμε γεύσεις του τόπου μας, της Τήνου, με δημιουργικές και φρέσκες ιδέες.',
    'This is the identity that we respect, support and develop, while also revitalising the traditional dishes of our island, Tinos, with creative and fresh ideas.',
  ),
  identityImage: '/assets/uploads/2025/01/DSC3651-scaled.jpg',
  recognition: L(
    'Η Μαραθιά είναι μέλος της Ευρωπαϊκής πρωτοβουλίας I stars, με στόχο τη μείωση του περιβαλλοντικού μας αποτυπώματος. Έχει διακριθεί και τιμηθεί με ειδικό βραβείο Top Notch από τον θεσμό των Χρυσών Σκούφων και βραβείο Ελληνικής Κουζίνας από τον Alpha Guide του Αθηνοράματος. Επίσης, με δύο αστέρια FNL Best Restaurant Awards.',
    'Marathia is a member of the European I stars initiative with the aim of reducing our environmental footprint. It has been honoured with a special Top Notch award from the Golden Hats institution and a Greek Cuisine award from Athinorama’s Alpha Guide. The restaurant has also received two stars from the FNL Best Restaurant Awards.',
  ),
}

/* ------------------------------------------------------------------ */
/* Fish maturation: story + facts                                      */
/* ------------------------------------------------------------------ */

export interface StoryRow {
  id: string
  kicker: Localized
  title: Localized
  body: Localized<string[]>
  image: string
}

export const maturation = {
  opener: {
    context: L(
      'Όταν ξεκίνησε τους πειραματισμούς, δεν ήταν εξοικειωμένοι με το θέμα ούτε καν οι δημοσιογράφοι της γαστρονομίας, ενώ η πρώτη ερώτηση που του έκαναν συνήθως ήταν:',
      'When he began his experiments, not even food journalists were familiar with the subject. Usually, the first question they asked him was:',
    ),
    question: L(
      '«Μα, καλά, το ψάρι δεν πρέπει να τρώγεται φρέσκο;»',
      '“But, shouldn’t fish be eaten fresh?”',
    ),
    quote: L(
      '«Έχω την αίσθηση ότι το σίτεμα σε ειδικά ψυγεία με ρυθμιζόμενο μικροκλίμα και έλεγχο PH θα είναι the next big thing στο ψάρι...»',
      '“I have the feeling that storing it in special refrigerators with an adjustable microclimate and PH control will be the next big thing in fish…”',
    ),
    source: L('Συνέντευξη στον Δημήτρη Αντωνόπουλο, 2019', 'Interview with Dimitris Antonopoulos, 2019'),
    after: L(
      'Κάτι που όντως έχει αρχίσει να γίνεται τα πρόσφατα χρόνια.',
      'And he was right, this has indeed started happening recently.',
    ),
  },
  rows: [
    {
      id: 'idea',
      kicker: L('Η ιδέα', 'The idea'),
      title: L('Να διατηρήσουμε την ψαριά', 'Preserving the catch'),
      body: L(
        [
          'Το 2010 άρχισε η έρευνα του Μαρίνου Σουράνη σχετικά με την ωρίμανση ψαριών, μια τεχνική που δεν είχε μέχρι τότε εφαρμοστεί στην Ελλάδα -και όχι μόνο. Η βάση της βρίσκεται στην ανάγκη των ανθρώπων να συντηρήσουν την ψαριά τους για να την απολαύσουν στο μέλλον -κι έτσι φτιάχνουν τα παραδοσιακά αλίπαστα, τα λιόκαφτα, τα καπνιστά.',
          'Όπως εξηγεί ο Μαρίνος, στη θάλασσα υπάρχουν πολλά και διαφορετικά είδη ψαριών και το κάθε ένα θέλει τον δικό του χειρισμό. Κάποια ψάρια τρώγονται φρέσκα, άλλα όμως πρέπει να περνάνε από ωρίμανση -όπως ο ροφός, για τον οποίο οι παλιοί ψαράδες έλεγαν ότι πρέπει να τον αφήσεις δυο μέρες να «κάτσει» στο ψυγείο.',
        ],
        [
          'In 2010, Marinos Souranis began research on fish aging, a technique that had not been used in Greece, or in many other places, until then. The technique is based in people’s need to preserve their fish so they can enjoy it in the future – and this is how traditional salted, sun-dried, and smoked fish is made.',
          'As Marinos explains, there are many different types of fish in the sea and each one needs to be handled differently. Some fish should be eaten fresh, but others need to be aged to some extent. One example is dusky grouper – the fishermen of old said you should let it “sit” in the fridge for two days before cooking.',
        ],
      ),
      image: '/assets/uploads/2025/01/orimansi-arxiki.jpg',
    },
    {
      id: 'method',
      kicker: L('Η μέθοδος', 'The method'),
      title: L('Από τη φύση στους θαλάμους', 'From nature to chambers'),
      body: L(
        [
          'Ο ιδιοκτήτης της Μαραθιάς ξεκίνησε αρχικά την παλαίωση με φυσικό τρόπο και μετά με χρήση ψυγείων στα οποία είχε κάνει κάποιες πατέντες, εμπειρικά, φροντίζοντας αυτά να έχουν συγκεκριμένη υγρασία και θερμοκρασία ώστε εκεί να σιτεύει το καθαρισμένο ψάρι.',
        ],
        [
          'As the proprietor of Marathia, Marinos initially began aging fish using simple, natural methods and then began experimenting using refrigerators which he had patented. He made sure that these maintained a specific humidity and temperature so that the gutted fish could be aged.',
        ],
      ),
      image: '/assets/uploads/2024/08/Marinos-Souranis-kai-Evripidis-Apostolidis1-.jpg',
    },
    {
      id: 'pesciugatore',
      kicker: L('Η συνεργασία', 'The partnership'),
      title: L('Stagionello & Pesciugatore', 'Stagionello & Pesciugatore'),
      body: L(
        [
          'Καθώς δημοσίευε διάφορες από τις δοκιμές του στο Instagram, το 2018 ήρθε σε επαφή μαζί του ο Alessandro Cuomo, ιδιοκτήτης της ιταλικής εταιρείας Stagionello, η οποία ειδικεύεται στην κατασκευή θαλάμων ωρίμανσης. Η εταιρεία είχε μόλις κατασκευάσει το Pesciugatore, έναν θάλαμο για να γίνεται curing και σίτεμα σε σολομούς. Ο κ. Cuomo ενδιαφέρθηκε για τα πειράματα του Μαρίνου και συζήτησαν την πιθανότητα συνεργασίας. Έτσι, του έστειλαν έναν θάλαμο ώστε εκείνος να βοηθήσει, μεταξύ άλλων, στην εξέλιξή του.',
          'Με τη χρήση του Pesciugatore και πολλά πειράματα, πέτυχε σταδιακά τα αποτελέσματα που επιδίωκε. Το 2020 ο Μαρίνος Σουράνης και η Stagionello παρουσίασαν για πρώτη φορά τον θάλαμο στη HORECA των Αθηνών, στο περίπτερο της Βαρανάκης Catering Equipment -από τότε, μάλιστα, ο Pesciugatore πωλείται μαζί με δυο συνταγές του.',
        ],
        [
          'He posted several of his tests on Instagram, and in 2018 he was contacted by Alessandro Cuomo, owner of the Italian company Stagionello which specializes in building aging chambers. The company had just built the Pesciugatore, a chamber for aging salmon. Mr. Cuomo was interested in Marinos’s experiments and they discussed the possibility of working together with the result that Stagionello sent Marinos a chamber so that he could help, among others, in its further development.',
          'Marinos began using the Pesciugatore and, after many experiments, he gradually achieved the results he was looking for. In 2020, Marinos Souranis and Stagionello presented the chamber for the first time at HORECA in Athens, at the Varanakis Catering Equipment stand. Since then, the Pesciugatore has been sold together with two of Marinos’ recipes.',
        ],
      ),
      image: '/assets/uploads/2025/01/istoria-800x450_DSC3723.jpg',
    },
  ] as StoryRow[],
  lab: L(
    'Χάρη στα εξαιρετικά αποτελέσματα στην ωρίμανση των κατάλληλων ψαριών, η κουζίνα της Μαραθιάς εμπλουτίζεται διαρκώς με εξαιρετικά πιάτα βασισμένα σε αυτά. Από το 2021 και έπειτα έχει δημιουργηθεί ένα πλήρως εξοπλισμένο εργαστήριο το οποίο περιλαμβάνει πλέον 3 ειδικούς θαλάμους ωρίμανσης και άλλον σύγχρονο και εξειδικευμένο εξοπλισμό RnD.',
    'Thanks to the outstanding results he has achieved aging suitable fish, Marathia’s cuisine is now often enriched with excellent dishes based around this technique. In 2021, a fully equipped aging room was created and it now includes 3 special maturation chambers and other modern and specialized R&D equipment.',
  ),
  stats: [
    { value: '2010', label: L('Έναρξη της έρευνας', 'Research begins') },
    { value: '2020', label: L('HORECA Αθηνών', 'HORECA Athens') },
    { value: '3', label: L('Θάλαμοι ωρίμανσης', 'Maturation chambers') },
    { value: '176', label: L('Σελίδες στο βιβλίο', 'Pages in the book') },
  ] as { value: string; label: Localized }[],
  book: {
    image: L('/assets/book/book_cover_gr.webp', '/assets/book/book_cover_en.webp'),
    kicker: L('Εκδόσεις Νεφέλη · Ιούνιος 2025', 'Nefeli Publications · June 2025'),
    title: L(
      'Ψάρια και Ωρίμανση. Εγχειρίδιο ορθής ωρίμανσης και χειρισμού ψαριών',
      'Fish and Aging. A Manual for the Correct Aging and Handling of Fish',
    ),
    body: L(
      [
        'Μέσα από τις 176 καλαίσθητες και πλούσιες σε περιεχόμενο και ουσία σελίδες του, το βιβλίο φιλοδοξεί να καταρρίψει το προαιώνιο στερεότυπο που θέλει το ψάρι να πρέπει να τρώγεται φρέσκο. Το εξαιρετικό αποτέλεσμα, αντανακλά την αγάπη και την αφοσίωση του συγγραφέα στην παράδοση, στην καινοτομία, την εντοπιότητα και φυσικά, στο καλό φαγητό.',
        'Το βιβλίο είναι το πρώτο και το μόνο στη βιβλιογραφία που ασχολείται με το θέμα και έχει γίνει σε συνεργασία με τεχνολόγους τροφίμων. Περιλαμβάνει πλούσιο φωτογραφικό υλικό, σκίτσα και συνταγές.',
      ],
      [
        'Through its 176 elegant pages, rich in content and substance, the book aims to break the age-old stereotype that fish must be eaten fresh. The excellent result reflects the author’s love and dedication to tradition, innovation, localism, and, of course, good food.',
        'The book is the first and only one in the literature to deal with this subject and has been produced in collaboration with food technologists. It includes a wealth of photographs, sketches, and recipes.',
      ],
    ),
  },
}
