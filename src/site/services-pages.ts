// Hand-authored layout data for the three "services" pages (workshops,
// gastrotourism, consulting). NOT part of the generated content pipeline. Copy is
// taken verbatim from src/content/pages/{biomatika-ergastiria-gia-epangelmaties,
// seminaria-gastrotourismou,symvouleftiki}.ts (both locales enReviewed:true) and
// split into sections. Links point at content keys, resolved via pathForKey().
import type { Localized } from '@/types/content'
import type { CtaLink } from '@/site/about-pages'

const L = <T = string>(el: T, en: T): Localized<T> => ({ el, en })

const PRINCIPLES = [
  L('Τροφοσυλλογή', 'Foraging'),
  L('Ζυμώσεις', 'Curing'),
  L('Συνεργασίες με τοπικούς παραγωγούς', 'Working with local producers'),
  L('Ωρίμανση ψαριών', 'Fish aging'),
  L('Εποχικότητα', 'Seasonality'),
]

const SUSTAINABILITY = L(
  'Πάντα σύμφωνα με τις αρχές της ελαχιστοποίησης της απώλειας, καθώς και της βιωσιμότητας, σε μια προσπάθεια μείωσης του περιβαλλοντικού μας αποτυπώματος.',
  'These courses also emphasize in minimizing waste and working sustainably in an effort to reduce our environmental footprint.',
)

const SEASONS = L('Μάρτιο-Ιούνιο και Σεπτέμβριο-Νοέμβριο', 'March-June and September-November')

/* ------------------------------------------------------------------ */
/* Workshops                                                           */
/* ------------------------------------------------------------------ */

export const workshops = {
  headerImage: {
    src: '/assets/pictures/restaurant/workshops_kitchen_plating.jpg',
    w: 1551,
    h: 2326,
    alt: L(
      'Μάγειρες της Μαραθιάς πλατάρουν ταρτάρ σε πέτρινα πιάτα στην κουζίνα',
      'Marathia chefs plating tartare on stone plates in the kitchen',
    ),
  },
  bandImage: {
    src: '/assets/pictures/restaurant/workshops_kitchen_chef.jpg',
    w: 2400,
    h: 1600,
    alt: L('Σεφ της Μαραθιάς πλατάρει σαλάτα στην κουζίνα', 'A Marathia chef plating a salad in the kitchen'),
  },
  seoDescription: L(
    'Τριήμερα βιωματικά εργαστήρια στην Τήνο για επαγγελματίες της γαστρονομίας, μέσα στην κουζίνα της Μαραθιάς. Μάρτιο-Ιούνιο και Σεπτέμβριο-Νοέμβριο.',
    'Three-day hands-on workshops in the Marathia kitchen on Tinos for gastronomy professionals. Held March-June and September-November.',
  ),
  intro: L(
    'Η ομάδα της Μαραθιάς σχεδιάζει και υλοποιεί τριήμερα βιωματικά εργαστήρια στην Τήνο, που απευθύνονται στους επαγγελματίες του χώρου της γαστρονομίας από όλη την Ελλάδα και το εξωτερικό.',
    'Marathia designs and holds three-day experiential workshops aimed at gastronomy professionals from all over Greece and abroad.',
  ),
  basis: L(
    'Τα σεμινάρια βασίζονται στη φιλοσοφία της Μαραθιάς:',
    'The seminars are based on the Marathia philosophy:',
  ),
  principles: PRINCIPLES,
  principleLinks: { 3: { key: 'orimansi-psarion', label: L('Ωρίμανση ψαριών', 'Fish aging') } } as Record<
    number,
    CtaLink
  >,
  sustainability: SUSTAINABILITY,
  process: L(
    'Πριν από κάθε σεμινάριο υπάρχει επικοινωνία με τους συμμετέχοντες ώστε να καθοριστεί, σύμφωνα με τα ενδιαφέροντά τους, το ακριβές πρόγραμμα.',
    'Before each seminar, the Marathia team gets in touch with participants to find out what they are interested in and to discuss which program is best suited to them.',
  ),
  facts: [
    { value: '3', label: L('Ημέρες', 'Days') },
    { value: '2×', label: L('Περίοδοι τον χρόνο', 'Seasons a year') },
  ] as { value: string; label: Localized }[],
  seasons: SEASONS,
  email: 'info@marathiatinos.gr',
}

/* ------------------------------------------------------------------ */
/* Gastrotourism                                                       */
/* ------------------------------------------------------------------ */

export interface ActivityItem {
  id: string
  title: Localized
  body: Localized
}

export const gastrotourism = {
  headerImage: '/assets/pictures/tinos_food/olives.jpg',
  lead: L(
    'Μία ολιστική βιωματική εμπειρία πλημμυρισμένη από τα χρώματα, τις μυρωδιές και τις γεύσεις της Τήνου. Μία εκ βάθους γνωριμία με το νησί, που θυμίζει ζωντανό ντοκιμαντέρ και το βάζει στον χάρτη όλες τις εποχές του χρόνου.',
    'A holistic experiential experience full of the colours, smells and flavours of Tinos. This in-depth acquaintance with the island, somewhat like living in a documentary, puts Tinos on the map at all times of the year.',
  ),
  story: {
    image: '/assets/pictures/tinos_food/carrots.jpg',
    paragraphs: L(
      [
        'Η Τήνος είναι ένα από τα δημοφιλέστερα νησιά της Ελλάδας. Κάθε καλοκαίρι, βρίσκεται πολύ ψηλά στη λίστα των προτιμήσεων ως αγαπημένος προορισμός διακοπών. Και καθόλου άδικα, καθώς συγκεντρώνει πολλά μοναδικά στοιχεία: υπέροχο φαγητό, καταπληκτικές παραλίες, μοναδική φιλοξενία, πολυάριθμα χωριά που σφύζουν από ζωή.',
        'Όμως, πόσο καλά πιστεύετε ότι γνωρίζετε την Τήνο; Τι θα λέγατε αν σας δινόταν η ευκαιρία να ανακαλύψετε δεκάδες ακόμη από τις κρυφές της χάρες, μέσα από εμπειρίες, ξεναγήσεις, περιηγήσεις, διαδρομές και δραστηριότητες που σας προάγουν από τη θέση του τουρίστα στον πολύ πιο ενδιαφέροντα ρόλο του ταξιδιώτη;',
      ],
      [
        'Tinos is one of the most popular islands in Greece. Every summer, it is very high on everyone’s list as a favourite vacation destination. And there is a very good reason for this - it combines many unique elements: delicious food, amazing beaches, unbeatable hospitality and numerous villages that are bustling with life.',
        'But how well do you think you know Tinos? What would you say if you were given the opportunity to discover dozens more of its hidden charms, through experiences, guided tours, trips, excursions and activities that mean you are no longer a tourist, but rather you enjoy the interesting role of a traveller?',
      ],
    ),
    /** Inline links: first occurrence of `word` inside paragraph `para` links to page `key`. */
    links: [
      { para: 0, key: 'i-tinos/paralies', word: L('παραλίες', 'beaches') },
      { para: 1, key: 'i-tinos/me-mia-matia', word: L('Τήνο', 'Tinos') },
    ] as { para: number; key: string; word: Localized }[],
  },
  mission: {
    quote: L(
      'Το φιλόδοξο και φιλόξενο πρότζεκτ έχει ως στόχο να βάλει την Τήνο στον χάρτη των επιλογών μας όλες τις εποχές του χρόνου, όχι μόνο το καλοκαίρι.',
      'This ambitious project aims to put Tinos on the map all year round, not just as a summer destination.',
    ),
    body: L(
      [
        'Γιατί πολύ απλά, η Τήνος έχει δεκάδες πράγματα που μπορείς να κάνεις, αμέτρητα μέρη να επισκεφτείς, αναρίθμητες εμπειρίες για να ζήσεις 365 ημέρες τον χρόνο! Απευθυνόμαστε σε άτομα, ομάδες, επιχειρήσεις και εταιρείες που αναζητούν να ξαφνιαστούν ευχάριστα με το που πατήσουν το πόδι τους στο πανέμορφο νησί των Κυκλάδων.',
        'Ένα ταξίδι στον μαγικό αυτό τόπο, ένα ταξίδι μέσα στον χρόνο, γνωρίζοντας την πλούσια παράδοση που είναι ολοζώντανη μέχρι σήμερα και έχει το βλέμμα στραμμένο στο μέλλον, την καινοτομία, τη βιωσιμότητα, την εντοπιότητα και την εποχικότητα.',
      ],
      [
        'Quite simply, Tinos has dozens of things to do, countless places to visit and countless experiences to live 365 days a year! The experiences are open to individuals, groups, businesses and companies that want to be pleasantly surprised when they set foot on this beautiful Cycladic island.',
        'This is a journey in this magical place, a journey through time, a journey which will allow you interact with the island’s rich traditions that are alive to this day. It is a journey which is looking to the future, to innovation, sustainability, locality and seasonality.',
      ],
    ),
    closing: L('Το ταξίδι τώρα ξεκινά!', 'The journey starts now!'),
  },
  activitiesIntro: L(
    'Tailor made πακέτα εκδρομών στο νησί, όλο το χρόνο (διήμερα, τριήμερα, πενθήμερα) που περιλαμβάνουν διάφορες δραστηριότητες, σχετικά με:',
    'Tailor made packages of excursions on the island all year round (two days, three days, five days). Excursions include various activities, related to:',
  ),
  activitiesImage: '/assets/pictures/tinos_food/artichokes.jpg',
  activities: [
    {
      id: 'history',
      title: L('Iστορία, παράδοση, πεζοπορίες / εξερευνήσεις', 'History, tradition, hiking / exploration'),
      body: L(
        'Επισκέψεις σε παραδοσιακά σπίτια χωρίς ρεύμα που σε ταξιδεύουν πίσω στον χρόνο, μαγείρεμα όπως παλιά σε ξυλόφουρνο, επισκέψεις σε χωριά και μονοπάτια για τους λάτρεις της άθλησης και της περιπέτειας, κ.ά.',
        'Trips back in time to traditional island houses without electricity, cooking in a wood-fired oven, just like the olden days, visits to villages and hiking paths and trails for those who love adventure and exercising, etc.',
      ),
    },
    {
      id: 'foraging',
      title: L('Τροφοσυλλογή και παραδοσιακά μαγειρέματα', 'Foraging and traditional cooking'),
      body: L(
        'Γευστικές διαδρομές, συγκομιδή λαχανικών και βοτάνων κατευθείαν από τη φύση και αξιοποίησή τους στη μαγειρική, γνωριμία με όλα τα είδη τυριών του νησιού και όλα τα προϊόντα της Μαραθιάς, μύηση στην επεξεργασία των υλικών.',
        'Excursions harvesting vegetables and herbs directly from nature and using them in our cooking, getting to know all the cheeses produced on the island and all the produce we use here at Marathia, introduction to handling ingredients.',
      ),
    },
    {
      id: 'tasting',
      title: L('Γευσιγνωσία, οινογνωσία, επισκέψεις σε παραγωγούς', 'Tasting, wine tasting, visits to producers'),
      body: L(
        'Όλοι οι θησαυροί της τηνιακής γης και πώς να τους αξιοποιήσουμε.',
        'All the treasures of the Tinian land and how to use them.',
      ),
    },
    {
      id: 'workshops',
      title: L('Βιωματικά εργαστήρια', 'Experiential workshops'),
      body: L(
        'Μαθαίνουμε να ζυμώνουμε παραδοσιακό ψωμί από τους γνώστες του είδους, επισκεπτόμαστε θεματοφύλακες της λαϊκής τέχνης και παράδοσης (αγιογράφους, μαρμαρογλύπτες, πηλοπλάστες, καλαθοπλάστες κ.ά), τεχνικές που κρατούν την παράδοση ζωντανή.',
        'Learning to make traditional bread from the experts, visiting the custodians of folk art and the techniques that keep traditions alive (icon painters, marble sculptors, potters, basket makers, etc.).',
      ),
    },
  ] as ActivityItem[],
  audience: [
    {
      title: L('Σε εταιρείες', 'Companies'),
      body: L(
        'Ιδανικά και εξατομικευμένα προγράμματα για internal δράσεις που ενισχύουν το ομαδικό πνεύμα και το team bonding.',
        'Ideal personalised programmes that enhance team spirit and team bonding.',
      ),
    },
    {
      title: L('Σε μεμονωμένους', 'Individuals'),
      body: L(
        'Λάτρεις της φύσης, της παράδοσης, της γαστρονομίας και του εναλλακτικού τρόπου ζωής.',
        'Individuals who love nature, tradition, gastronomy and alternative lifestyles.',
      ),
    },
    {
      title: L('Σε επαγγελματίες Horeca', 'HORECA professionals'),
      body: L(
        'Που ενδιαφέρονται να εμπλουτίσουν τη γκάμα τους με προϊόντα υψηλής ποιότητας.',
        'Who are interested in enriching their range with high quality products.',
      ),
    },
    {
      title: L('Σε λάτρεις του εναλλακτικού τουρισμού', 'Alternative tourism'),
      body: L('Περιπατητές και τροφοσυλλέκτες.', 'People who enjoy alternative tourism, hikers and foragers.'),
    },
    {
      title: L('Σε εγχώριο και ξένο τουρισμό', 'Greeks and non-Greeks'),
      body: L('', ''),
    },
  ] as { title: Localized; body: Localized }[],
  tips: L(
    [
      'Όλες οι δράσεις στοχεύουν στη βιωσιμότητα και παρουσιάζουν τρόπους για μείωση του περιβαλλοντικού αποτυπώματος',
      'Ανά διαστήματα θα υπάρχουν καλεσμένοι inspirational ομιλητές από διαφορετικούς τομείς, που θα έχουν ενδιαφέροντα πράγματα να μοιραστούν',
      'Δυνατότητα διοργάνωσης outdoor activities με εξειδικευμένους συνεργάτες (αναρρίχηση, ψάρεμα με σκάφος, μαθήματα αγγειοπλαστικής, μαρμαρογλυπτικής, μαθήματα αρτοποιίας σε παραδοσιακό φούρνο, γιόγκα, διαλογισμός)',
      'Δυνατότητα συνδυασμού δράσεων, προσαρμοσμένων στις ανάγκες και τα ενδιαφέροντα του κάθε γκρουπ',
    ],
    [
      'All activities aim at sustainability and show ways to reduce our environmental footprint',
      'From time to time there will be inspirational guest speakers from different sectors.',
      'Possibility of organizing outdoor activities with specialized partners (climbing, fishing from a boat, pottery lessons, marble carving lessons, lessons on baking in a traditional oven, yoga, meditation)',
      'Possibility of combining activities, depending on the needs and interests of each group',
    ],
  ),
  facts: [
    { value: '10', label: L('Ελάχιστη συμμετοχή', 'Minimum participants') },
    { value: '20', label: L('Μέγιστη συμμετοχή', 'Maximum participants') },
    { value: '365', label: L('Ημέρες τον χρόνο', 'Days a year') },
  ] as { value: string; label: Localized }[],
  seasons: SEASONS,
  contact: {
    details: L('psourani@gmail.com / 697 4339652', 'psourani@gmail.com / +30 6974339652'),
    email: 'info@marathiatinos.gr',
  },
}

/* ------------------------------------------------------------------ */
/* Consulting                                                          */
/* ------------------------------------------------------------------ */

export const consulting = {
  intro: L(
    'Η Μαραθιά παρέχει συμβουλευτικές υπηρεσίες σε εστιατόρια της Ελλάδας και του εξωτερικού που ενδιαφέρονται να γνωρίσουν τη φιλοσοφία της.',
    'Marathia provides consulting services to restaurants in Greece and abroad which are interested in learning about its philosophy.',
  ),
  basis: L(
    'Η φιλοσοφία μας ακουμπά στις αρχές της:',
    'Our philosophy is based on the principles of:',
  ),
  principles: PRINCIPLES,
  principleLinks: { 3: { key: 'orimansi-psarion', label: L('Ωρίμανση ψαριών', 'Fish aging') } } as Record<
    number,
    CtaLink
  >,
  sustainability: L(
    'Πάντα σύμφωνα με τις αρχές της ελαχιστοποίησης της απώλειας και της βιωσιμότητας, καθώς και τη μείωση του περιβαλλοντικού αποτυπώματος.',
    'These services always adhere to our principles of minimizing waste, operating sustainably and reducing our environmental footprint.',
  ),
  tailor: {
    kicker: L('Tailor made', 'Tailor made'),
    body: L(
      'Η υπηρεσία συμβουλευτικής παρέχεται tailor made, σύμφωνα με τις ανάγκες και τις επιθυμίες των εστιατορίων που απευθύνονται σε εμάς.',
      'Our consulting service is tailor made according to the needs and interests of the restaurants attending them.',
    ),
  },
  gallery: [
    { src: '/assets/pictures/dining/dish_1.jpg', ratio: 'aspect-[2/3]' },
    { src: '/assets/pictures/dining/dish_2.jpg', ratio: 'aspect-[3/4]' },
    { src: '/assets/pictures/dining/dish_3.jpg', ratio: 'aspect-[4/5]' },
  ],
  email: 'info@marathiatinos.gr',
  links: [
    { key: 'biomatika-ergastiria-gia-epangelmaties', label: L('Εργαστήρια', 'Workshops') },
    { key: 'seminaria-gastrotourismou', label: L('Γαστροτουρισμός', 'Gastrotourism') },
  ] as CtaLink[],
}
