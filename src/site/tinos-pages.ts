// Hand-authored layout data for the three "Tinos" pages (at a glance, attractions,
// beaches). NOT part of the generated content pipeline. Copy is taken verbatim from
// src/content/pages/i-tinos-{me-mia-matia,mi-chasete,paralies}.ts (both locales
// enReviewed:true) and split into sections / entries.
// Images are PLACEHOLDERS: swap the paths in PH (or per item) for final photography.
import type { Localized } from '@/types/content'
import type { CtaLink } from '@/site/about-pages'

const L = <T = string>(el: T, en: T): Localized<T> => ({ el, en })

/** Placeholder photography. Replace these paths with the final images. */
const PH = {
  landscape: '/assets/pictures/tinos/Tinos-stroggyloi-granites-Valy-Vaimaki.jpg',
  village: '/assets/pictures/tinos/Pyrgos-Marmarotexnias-1.jpg',
  art: '/assets/pictures/tinos/Halepas-Idryma-Tin-Politismou-V-24.jpg',
  people: '/assets/pictures/tinos/PIOP-Evelyn-.jpg',
  sea: '/assets/uploads/2025/01/pammostiniakos.jpg',
  table: '/assets/pictures/tinos_food/olives.jpg',
  hero: '/assets/hero/dining.jpg',
}

/* ------------------------------------------------------------------ */
/* Tinos at a glance                                                   */
/* ------------------------------------------------------------------ */

export interface TinosSection {
  id: string
  title: Localized
  body: Localized
  image: string
}

export const tinos = {
  heading: L('Καλώς τους', 'Welcome'),
  lead: L(
    'Δείτε την Τήνο όπως η ομάδα της Μαραθιάς -γι\' αυτό άλλωστε έχουμε δημιουργήσει και ειδικές προτάσεις δράσεων που αφορούν τον γαστροτουρισμό.',
    'Travel around the beautiful and authentic Cycladic island of Tinos, where nature and artistry intertwine.',
  ),
  image: '/assets/pictures/tinos/peristeronas.jpg',
  sections: [
    {
      id: 'marble',
      title: L('Μάρμαρο και χωριά', 'Marble and villages'),
      body: L(
        'Θαυμάστε τα έργα των φημισμένων μαρμαρογλυπτών που άφησαν το ανεξίτηλο στίγμα τους όχι μόνο στο νησί μας, αλλά στην Αθήνα και σε όλη την Ελλάδα. Τα βράχια όπου ο άνεμος και η θάλασσα κάνουν τη δική τους γλυπτική αιώνες τώρα. Το οροπέδιο του Βωλάξ με τους απίθανους στρογγυλούς γρανίτες, το Ξώμπουργο με το ερειπωμένο φράγκικο κάστρο. Το ανεμοδαρμένο τοπίο της Λιβάδας και τον φάρο της. Την Καρδιανή, τα Υστέρνια, τον Πύργο και τον Πάνορμο με τον Πλανήτη. Τα Λουτρά με τη μονή-μουσείο των Ουρσουλίνων και την Καθολική μονή των Ιησουιτών. Και όλα τα άλλα, μικρά και μεγάλα μαρμαροστρωμένα χωριά με τις σκιερές πλατείες, τις κρήνες και τα θαυμαστά σπίτια κυκλαδίτικης αρχιτεκτονικής.',
        'The island that nurtured the famous Tinian marble sculptors who left their indelible mark—not just on local villages but also on Athens and across Greece. Here, the island itself is a masterpiece, fashioned over the centuries both by its people and by the wind and the sea. You can visit Volax with the remarkable spherical granite boulders, explore the ruins of the Frankish castle at Xobourgo or marvel at the rugged beauty of Livada’s windswept landscape and its lighthouse. Make time to become acquainted with the beautiful villages of Kardiani, Ysternia, Pyrgos, and Panormos with Planitis island, not forgetting Loutra where the echoes of history linger in the Ursuline monastery-museum and the Jesuit Catholic monastery. Wherever you go on Tinos, you are never far from one of its seemingly countless marble-paved villages, both small and large, with their shady squares, fountains and wonderful Cycladic houses.',
      ),
      image: PH.village,
    },
    {
      id: 'walk',
      title: L('Περπατώντας το νησί', 'Walking the island'),
      body: L(
        'Ανακαλύψτε περπατώντας ή οδηγώντας μερικούς από τους 1000 περιστεριώνες με τα περίτεχνα λιθοκεντήματα που είχε άλλοτε το νησί, ξωκλήσια που ασπρίζουν στις πλαγιές, παλιά αλώνια και "κελιά" όπου φύλαγαν τα ζώα τους. Παραλίες με γαλαζοπράσινα νερά και άμμο που χρυσίζει και αστράφτει. Τις αμέτρητες ξερολιθιές που δένουν με τα "λουριά" τους τις πλαγιές, συγκρατούν το χώμα και ορίζουν τις στράτες. Περπατήστε όσο περισσότερο μπορείτε. Ετσι θα δείτε όλο τον λαογραφικό πλούτο του νησιού, βαδίζοντας στους αγροτικούς δρόμους που ένωναν τα χωριά μεταξύ τους. Γευτείτε τα αυθεντικά προϊόντα που παράγει το νησί, τις τοπικές συνταγές, την Τηνιακή ρακή και τα εξαίσια κρασιά από τους αμπελώνες του Βολάξ.',
        'You can walk or drive to some of the island’s 1000 famous stone dovecotes with their elaborate geometric designs. You’ll see whitewashed chapels dotted on the island’s steep slopes, along with old threshing floors and rustic stone shelters once used for livestock. And then there are the beaches with their turquoise waters and golden sparkling sands. Or, if you want to go for a longer walk, you can follow paths along the countless dry-stone walls that weave like ribbons across the hillsides, tying the land together. Tinos is best explored slowly, so walk as much as you can. This is the best way to truly experience the island’s folk history, following the old farm tracks that connected each village to its neighbors. Savor authentic island products, enjoy traditional local recipes and sip Tinos raki and the exquisite wines from the vineyards in Volax.',
      ),
      image: PH.landscape,
    },
    {
      id: 'people',
      title: L('Οι άνθρωποι', 'The people'),
      body: L(
        'Και τέλος μιλήστε με τους φιλόξενους κατοίκους των χωριών που θα σας υποδεχθούν με τη φράση «καλώς τους». Συζητήστε με όλους εκείνους που ήρθαν να μείνουν και να δουλέψουν στην Τήνο τα τελευταία χρόνια και την αγαπάνε σαν πατρίδα τους. Καθώς και με όλους όσους ασχολούνται με τον πολιτισμό, αναδεικνύουν έμπρακτα την αυθεντική της ταυτότητα και προσπαθούν να την προστατέψουν από την επέλαση της κακώς εννοούμενης ανάπτυξης...',
        'Finally, talk to the friendly villagers who will welcome you with the phrase "kalostous", or “welcome”. Chat to all the people who have come to stay and work in Tinos in recent years and who have adopted it as their homeland. Take time to discuss things with those who are involved in the island’s culture, working to highlight its true identity and trying to protect it from the onslaught of ill-conceived development...',
      ),
      image: PH.people,
    },
  ] as TinosSection[],
  links: [
    { key: 'i-tinos/mi-chasete', label: L('Αξιοθέατα', 'Attractions') },
    { key: 'i-tinos/paralies', label: L('Παραλίες', 'Beaches') },
    { key: 'seminaria-gastrotourismou', label: L('Γαστροτουρισμός', 'Gastronomy tourism') },
  ] as CtaLink[],
}

/* ------------------------------------------------------------------ */
/* Attraction + beach entries                                         */
/* ------------------------------------------------------------------ */

export interface Entry {
  id: string
  title: Localized
  body: Localized
  image?: string
  /** Short labels shown above the title. */
  tags?: Localized[]
}

export interface EntryGroup {
  id: string
  title: Localized
  items: Entry[]
}

/* ------------------------------------------------------------------ */
/* Attractions                                                         */
/* ------------------------------------------------------------------ */

export const attractions = {
  intro: L(
    'Η Τήνος ξεχωρίζει από τα άλλα νησιά του Αιγαίου.',
    'Tinos stands apart from the other Aegean islands.',
  ),
  image: PH.village,
  groups: [
    {
      id: 'sacred',
      title: L('Προσκύνημα και πόλη', 'Pilgrimage and town'),
      items: [
        {
          id: 'evangelistria',
          title: L('Η Παναγία της Τήνου', 'Our Lady of Tinos (Evangelistria)'),
          body: L(
            'Εμβλημα του νησιού, καθόρισε την εικόνα του για πολλά χρόνια. Ο σημερινός ναός της Ευαγγελίστριας άρχισε να κτίζεται μετά την εύρεση της εικόνας της Παναγίας, το 1823, πάνω από τον πρώτο ναό της Ζωοδόχου Πηγής. Η επίσημη τελετή εγκαινίων έγινε το 1825. Το προσκύνημα της Ευαγγελίστριας αποτελείται από το παρεκκλήσι, τον κυρίως ναό, που είναι γεμάτος αφιερώματα και τάματα- και τον ναό της Ευρέσεως με το αγιασμένο νερό. Εκεί υπάρχουν 3 βαπτιστήρια και πλάι του το μικρό μαυσωλείο της Έλλης. Στο προαύλιο του συγκροτήματος της Ευαγγελίστριας υψώνεται η Φιάλη (σιντριβάνι), όπου στα Θεοφάνια γίνεται ο αγιασμός.',
            'An emblem of Tinos, the Church of Evangelistria has shaped the island’s identity for centuries. After the miraculous appearance of an icon of the Virgin Mary above the original Zoodochos Pigi church, work began on today’s Holy Church of the Virgin Mary Evangelistia in 1823. It was officially inaugurated just two years later, in 1825, becoming one of the most famous pilgrimage sites in Greece. The church complex includes the chapel, the main church—adorned with countless offerings — and the Church of the Zoodochos Pigi and the Discovery. There are three baptisteries which have served generations of pilgrims, and the small mausoleum to those who lost their lives in WWII when the Greek warship The Elli was torpedoed off Tinos. At the heart of the courtyard, is the Phiali (fountain) where the Epiphany blessing is given. More than a landmark, Evangelistria is the spiritual soul of Tinos, drawing pilgrims from all over Greece.',
          ),
          image: PH.village,
        },
        {
          id: 'town',
          title: L('Η πόλη της Τήνου', 'Tinos Town'),
          body: L(
            'Οι περισσότεροι παλιά την γνώριζαν μόνο χάρη στην Ευαγγελίστρια. Πλέον αντικατοπτρίζει την εξέλιξη του νησιού τα τελευταία χρόνια και συγκεντρώνει πολλά και καλαίσθητα μαγαζιά, μοντέρνα καφέ με άποψη, εξαιρετικά εστιατόρια κ.α. Η πιο γραφική πλευρά της πόλης κρύβεται στα σοκάκια πίσω από την περιοχή της Παλλάδας, απ’ όπου ξεκινάει πεζόδρομος με ωραία παλιά σπίτια που καταλήγει στο πλάι της Ευαγγελίστριας, καθώς και σε άλλα σημεία, όπως η γειτονιές της Μαλαματένιας, του Αη Νικόλα του καθολικού, το λαγκάδι των Τριών Ιεραρχών. Στον περίπατό σας επισκεφτείτε το αρχαιολογικό μουσείο, καθώς και το εξαιρετικό και πολύ δραστήριο Ίδρυμα Τηνιακού Πολιτισμού, στην παραλία, που φιλοξενεί περιοδικές εκθέσεις και τη μόνιμη έκθεση έργων του Γιαννούλη Χαλεπά.',
            'In the past, the only thing most people knew about the town was Evangelistria Church. However, Tinos Town is now a vibrant hub that reflects the island’s renaissance. Today, it blends Cycladic charm with cosmopolitan flair, offering stylish boutiques, modern, stylish cafés with exceptional restaurants etc. The most picturesque part of the town is hidden in the alleys behind the Pallada area. From here, a pedestrian street lined with beautiful old houses leads to the side of the Evangelistria. Those who explore further will come across other “hidden gems” such as the neighborhoods of Malamatenia, Ai Nikolas tou Katholikon and Trion Iarchon. A visit to the Archaeological Museum offers a glimpse into Tinos’ past, while the Cultural Foundation of Tinos, located on the waterfront, is a must-see for art lovers. This is a very active centre which hosts temporary exhibitions and a permanent exhibition of the work of Yannoulis Chalepas, one of Greece’s most renowned sculptors.',
          ),
          image: PH.sea,
        },
      ],
    },
    {
      id: 'landscape',
      title: L('Τοπίο και χωριά', 'Landscape and villages'),
      items: [
        {
          id: 'exombourgo',
          title: L('Το Ξώμπουργο', 'Exombourgo'),
          body: L(
            'Στα 540 μέτρα πάνω από τη θάλασσα, σ’ αυτά τα απόκρημνα και φυσικά οχυρά βράχια, βρισκόταν άλλοτε το ισχυρότερο κάστρο του Αιγαίου και στην περιοχή ήταν η πρωτεύουσα του νησιού σε αρκετές ιστορικές περιόδους. Στη ρίζα του βράχου βρίσκονται τα ορθόδοξα ξωκλήσια του Αγίου Μηνά και της Ελεούσας, καθώς και το μεγάλο καθολικό προσκύνημα της Ιεράς Καρδίας του Ιησού, το οποίο ιδρύθηκε από Ιησουίτες μοναχούς και ανακαινίστηκε το 1893.',
            'At 540 meters above sea level, these steep and naturally fortified rocks, were once the site of the strongest castle in the Aegean. The area was also the capital of the island during several historical periods. At the base of the rock, two Orthodox chapels—Agios Minas and Agia Eleousa—offer a moment of reflection. Nearby, you can see the impressive Catholic pilgrimage site of the Sacred Heart of Jesus which was founded by Jesuit monks and rebuilt in 1893.',
          ),
          image: PH.landscape,
        },
        {
          id: 'dovecotes',
          title: L('Οι περιστεριώνες', 'The dovecotes'),
          body: L(
            'Στολίδια ανάμεσα στις ξερολιθιές και τα ρέματα, αριστουργήματα των λαϊκών τεχνιτών με τα περίτεχνα λιθοκεντήματά τους, οι περιστεριώνες χαρακτηρίζουν την Τήνο. Σύμφωνα με τους ερευνητές φτάνουν τους 1000 σε όλο το νησί.',
            'Tinos is famous for its beautifully decorative dovecots which are scattered among the island’s dry stone walls and streams. They are masterpieces of folk craftsmanship with their elaborate geometric patterns, and have come to characterize Tinos. According to researchers, there are up to 1000 of them on the island.',
          ),
          image: PH.village,
        },
        {
          id: 'villages',
          title: L('Τα χωριά', 'The villages'),
          body: L(
            'Η Τήνος ξεχωρίζει από τα άλλα νησιά του Αιγαίου καθώς έχει περί τα 34 χωριά και οικισμούς με εξαιρετική κυκλαδίτικη αρχιτεκτονική και πολλά μαρμάρινα στοιχεία. Μεταξύ άλλων θα επισκεφθείτε τον Πύργο και τον Πάνορμο, την Καρδιανή και τα Υστέρνια, τον Τριαντάρο και τον Μπερδεμιάρο, τα Λουτρά, τον Τριπόταμο και το Κτικάδο, την Ξυνάρα, τον Φαλατάδο. Πολύ όμορφα είναι και άλλα χωριά της ενδοχώρας όπως τα Δυό Χωριά και ο Αρνάδος, η Μυρσίνη, η Καρυά, ο Κουμάρος, η Ποταμιά, ο Ταραμπάδος κ.α.',
            'Unlike other Aegean islands, Tinos is home to many villages—34 in total—each with its own distinct charm, yet all united by the island’s signature Cycladic architecture and its famous marble craftsmanship. Make sure to visit Pyrgos and Panormos, Kardiani, Ysternia, Triantaros, Berdemiaros, Loutra, Tripotamos, Ktikado, Xynara, and Falatados. The inland villages of Dyo Choria, Arnados, Myrsini, Karya, Koumaros, Potamia, and Tarambados are also beautiful.',
          ),
        },
        {
          id: 'volax',
          title: L('Το Βωλάξ και οι στρογγυλοί γρανίτες', 'Volax and the round granite rocks'),
          body: L(
            'Xιλιάδες μικροί και μεγάλοι στρογγυλοί γρανίτες, σαν να τους έχει πετάξει εκεί ένα γιγάντιο χέρι, γεμίζουν ένα τριγωνικό οροπέδιο 23 τ.χλμ. Οι γεωλόγοι εξηγούν ότι πρόκειται για «γρανίτη με σφαιρική αποσάθρωση και γρανιτικές γεωμορφές τύπου tafoni και alveoles». Ανάμεσα στους γρανίτες ασπρίζει το μικρό χωριό του Βωλάξ. Από τον γειτονικό Φαλατάδο ξεκινάει η διαδρομή μέσα στο λεγόμενο Κακόβολο, όπου υπάρχουν αμπελώνες και δυο οινοποιεία. Οι στρογγυλεμένοι γρανίτες κάθε μεγέθους δημιουργούν ένα από τα εντυπωσιακά τοπία των Κυκλάδων, ένα συγκλονιστικό υπαίθριο γεωλογικό μουσείο. Ανάμεσά τους θα ανακαλύψετε αλώνια, εκκλησάκια και «κελιά» για τη φύλαξη των ζώων.',
            'Volax is famous for the thousands of spherical granite rocks, both large and small, which lie scattered across a 23-square-kilometer triangular plateau as if they had been flung there by a giant. Geologists say these rocks are examples of \'granite with spherical, honeycomb and alveolar weathering.\' In amongst these granite formations lies the small village of Volax. The nearby village of Falatados, known for its vineyards and two wineries, is the start of the route through Kakovolo, as the area with the rocks is known. This is one of most remarkable landscapes in the Cyclades—an amazing open-air geological museum. In between the rocks, you’ll find threshing floors, small chapels, and stone enclosures for livestock.',
          ),
          image: PH.landscape,
        },
      ],
    },
    {
      id: 'museums',
      title: L('Μουσεία', 'Museums'),
      items: [
        {
          id: 'itip',
          title: L('Ίδρυμα Τηνιακού Πολιτισμού', 'Cultural Foundation of Tinos'),
          body: L(
            'Ενας εξαιρετικός χώρος στην πόλη, που φιλοξενεί τη μόνιμη έκθεση των έργων του Γιαννούλη Χαλεπά, περιοδικές εκθέσεις, σημαντικά συνέδρια και διάφορες εκδηλώσεις. Λειτουργεί και καφέ.',
            'This is a charming venue which hosts a permanent exhibition of works by Giannoulis Chalepas, a famous Greek sculptor, as well as temporary exhibitions, important conferences and various other events. It also has a café.',
          ),
        },
        {
          id: 'evangelistria-galleries',
          title: L('Πινακοθήκη και μουσεία της Ευαγγελίστριας', 'Evangelistria galleries and museums'),
          body: L(
            'Στο συγκρότημα της Ευαγγελίστριας υπάρχει πινακοθήκη με έργα των Λύρα, Γύζη, Δούκα, Ιωαννίδη κ.α., το μουσείο Τηνίων Καλλιτεχνών με σημαντικά έργα των Λ. Σώχου, Δ. Φιλιππότη, Ν. Λύτρα, αδερφών Φυτάλη, Γ. Βιτάλη κ.α., η αίθουσα με έργα του Αντώνη Σώχου, η αίθουσα Εικόνων και Κειμηλίων και το μικρό μαυσωλείο της Ελλης.',
            'The Evangelistria complex includes an art gallery with works by artists such as Lyras, Gyzis, Doukas, Ioannidis, etc. It also houses the The Tinian Artists Museum with important works by L. Sochos, D. Filippotis, N. Lytras, the Fytalis brothers and G. Vitalis. There is an exhibition room with works by Antonis Sochos, as well as a room with icons and other artifacts. Additionally, there is a small mausoleum dedicated to those who lost their lives when the Greek ship The Elli was torpedoed off Tinos during WWII.',
          ),
        },
        {
          id: 'archaeological',
          title: L('Αρχαιολογικό Μουσείο', 'Archaeological Museum'),
          body: L(
            'Στην πόλη λειτουργεί και Αρχαιολογικό Μουσείο με ευρήματα από τους αρχαίους ναούς της Δήμητρας και του Ποσειδώνα στα Κιόνια.',
            'If you are interested in archaeology, head for the town’s Archaeological Museum where you can see finds from the ancient temple of Poseidon and Amphitrite in Kionia.',
          ),
        },
        {
          id: 'pyrgos',
          title: L('Μουσεία του Πύργου', 'Museums of Pyrgos'),
          body: L(
            'Στον Πύργο βρίσκεται το Μουσείο Μαρμαροτεχνίας, το Μουσείο Τηνίων Καλλιτεχνών και το σπίτι του Γιαννούλη Χαλεπά.',
            'If you are visiting Pyrgos, check out the informative Marble Crafts Museum, the Museum of Tinian Artists and Giannoulis Chalepas’ House, a traditional home which has been turned into a small museum giving visitors a good idea of life in Tinos during the sculptor’s lifetime.',
          ),
          image: PH.village,
        },
        {
          id: 'loutra',
          title: L('Σχολή των Ουρσουλίνων, Λουτρά', 'Ursuline School, Loutra'),
          body: L(
            'Στα Λουτρά θα δείτε την Σχολή των Ουρσουλίνων, πτέρυγες της οποίας έχουν διαμορφωθεί σε μουσείο.',
            'In Loutra you will see the Ursuline School, parts of which have been transformed into a museum.',
          ),
        },
      ],
    },
  ] as EntryGroup[],
}

/* ------------------------------------------------------------------ */
/* Beaches                                                             */
/* ------------------------------------------------------------------ */

const T = {
  sandy: L('Άμμος', 'Sandy'),
  pebbles: L('Βότσαλο', 'Pebbles'),
  bar: L('Beach bar', 'Beach bar'),
  organised: L('Οργανωμένη', 'Organised'),
  wild: L('Άγρια', 'Wild'),
  family: L('Οικογένειες', 'Family'),
  surf: L('Σερφ', 'Surf'),
  town: L('Κοντά στην πόλη', 'Near town'),
}

export const beaches = {
  intro: L(
    'Παραλίες με γαλαζοπράσινα νερά και άμμο που χρυσίζει και αστράφτει.',
    'Beaches with turquoise waters and golden sparkling sands.',
  ),
  image: PH.sea,
  items: [
    {
      id: 'agios-petros',
      title: L('Άγιος Πέτρος', 'Agios Petros'),
      body: L(
        'Μεγάλη παραλία την οποία χωρίζει στα δύο ένας βράχος που μπαίνει στη θάλασσα. Πάνω του βρίσκεται το εκκλησάκι του Αγίου Πέτρου (16ος αι.).',
        'A large beach divided in two by a rocky outcrop that juts out into the sea. The 16th century chapel of Agios Petros perches on top of the rocks.',
      ),
      image: PH.sea,
    },
    {
      id: 'agios-romanos',
      title: L('Άγιος Ρωμανός', 'Agios Romanos'),
      body: L(
        'Μεγάλη, αμμώδης, με beach bar και υπέροχα νερά.',
        'Large, sandy beach with a beach bar and beautiful sea.',
      ),
      tags: [T.sandy, T.bar],
    },
    {
      id: 'agios-sostis',
      title: L('Άγιος Σώστης', 'Agios Sostis'),
      body: L(
        'Ο μεγάλος, και πολύ δημοφιλής όρμος στα νοτιοανατολικά της Τήνου έχει διάφορα ονόματα ανά περιοχές: Aγιος Σώστης- Λαούτι (Σκυλαντάρ)- Αγία Κυριακή-Άγιος Ιωάννης Πόρτο. Είναι αμμώδης, με αρμυρίκια και ομπρέλες-ξαπλώστρες μπροστά από τα ξενοδοχεία.',
        'This large, very popular bay in the southeast of Tinos is made up of various sections, each with its own name: Agios Sostis, Laouti (Skylander), Agia Kyriaki and Agios Ioannis Porto. It is a sandy beach with tamarisk trees and umbrellas and sunbeds set out in front of the hotels.',
      ),
      tags: [T.sandy, T.organised],
    },
    {
      id: 'agios-fokas',
      title: L('Άγιος Φωκάς', 'Agios Fokas'),
      body: L(
        'Αμμουδιά μήκους 1 χλμ. που βρίσκεται πολύ κοντά στην πόλη της Τήνου και έχει beach bar, εστιατόρια, μικρά ξενοδοχεία.',
        'A 1 km long sandy beach located very close to the town of Tinos with beach bars, restaurants, small hotels.',
      ),
      tags: [T.sandy, T.town, T.bar],
    },
    {
      id: 'apothikes',
      title: L('Αποθήκες', 'Apothikes'),
      body: L(
        'Μεγάλη αμμουδιά κοντά στην παραλία Κολυμπήθρα.',
        'Large sandy beach near Kolymbithra beach.',
      ),
      tags: [T.sandy],
    },
    {
      id: 'kalyvia',
      title: L('Καλύβια', 'Kalyvia'),
      body: L(
        'Με άμμο και ωραία νερά. Λειτουργεί beach bar.',
        'A sandy beach with beautiful sea and a beach bar.',
      ),
      tags: [T.sandy, T.bar],
    },
    {
      id: 'livada',
      title: L('Λιβάδα', 'Livada'),
      body: L(
        'Η πιο άγρια και εντυπωσιακή παραλία της Τήνου κοντά στην οποία βρίσκεται και ο περίφημος φάρος. Έχει άμμο, βότσαλα και τεράστιους γρανίτες με υπέροχα σχήματα.',
        'The wildest and most impressive beach in Tinos, with sand, pebbles and huge, stangely-shaped granite rocks. It is close to a famous lighthouse which was built in 1910 but is now abandoned.',
      ),
      image: PH.landscape,
      tags: [T.wild, T.sandy, T.pebbles],
    },
    {
      id: 'kionia',
      title: L('Κιόνια', 'Kionia'),
      body: L(
        'Μεγάλη αμμώδης παραλία, απέναντι από το ιερό του Ποσειδώνα και της Αμφιτρίτης. Είναι οργανωμένη κατά σημεία.',
        'A large sandy beach beside the Temple of Poseidon and Amphitrite. Some sections of the beach have sun lounges etc.',
      ),
      tags: [T.sandy, T.organised],
    },
    {
      id: 'megali-kolymbithra',
      title: L('Μεγάλη Κολυμπήθρα', 'Megali Kolymbithra'),
      body: L(
        'Βρίσκεται στα βόρεια του νησιού. Είναι ιδανική για σερφ, εξ ου και υπάρχει σχολή και ωραίο beach bar.',
        'This beach is in the north of the island. It is ideal for surfing, with a surf school and a nice beach bar.',
      ),
      tags: [T.surf, T.bar],
    },
    {
      id: 'mikri-kolymbithra',
      title: L('Μικρή Κολυμπήθρα', 'Mikri Kolymbithra'),
      body: L(
        'Βρίσκεται στα βόρεια του νησιού. Είναι αγαπητή στις οικογένειες, οργανωμένη, με ταβέρνες.',
        'This beach is in the north of the island. It is popular with families and is an organised tourist beach with loungers and tavernas.',
      ),
      tags: [T.family, T.organised],
    },
    {
      id: 'lychnaftia',
      title: L('Λυχναφτιά', 'Lychnaftia'),
      body: L(
        'Μεγάλη παραλία με βότσαλα, στην ανατολική ακτή του νησιού.',
        'A large pebble beach, on the east coast of the island.',
      ),
      tags: [T.pebbles],
    },
    {
      id: 'pachia-ammos',
      title: L('Παχιά Άμμος', 'Pachia Ammos'),
      body: L(
        'Μια καταπληκτική αμμουδιά με αμμολόφο και πράσινα νερά, κρυμμένη σ’ έναν κολπίσκο πίσω από τον Αϊ-Γιάννη Πόρτο. Υπέροχα τα γλυπτά της βράχια.',
        'This amazing sandy beach with fascinating rock sculptures to explore, a sand dune and beautiful turquoise waters is tucked away in a cove behind Ai-Ioannis Porto.',
      ),
      image: PH.landscape,
      tags: [T.sandy, T.wild],
    },
    {
      id: 'santa-margarita',
      title: L('Σάντα Μαργαρίτα', 'Santa Margarita'),
      body: L(
        'Μια υπέροχη αμμουδιά στην ανατολική ακτή του νησιού.',
        'A wonderful sandy beach on the east coast of the island.',
      ),
      tags: [T.sandy],
    },
  ] as Entry[],
}
