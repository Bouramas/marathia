import { createI18n } from 'vue-i18n'
import type { Locale } from '@/types/content'

// UI chrome strings only. Page/post copy lives in typed content modules
// (src/content/*), extracted verbatim from the WordPress DB.
const messages = {
  el: {
    brand: 'Μαραθιά',
    nav: {
      home: 'Αρχική',
      restaurant: 'Εστιατόριο',
      philosophy: 'Η φιλοσοφία μας',
      history: 'Η ιστορία μας',
      team: 'Η ομάδα',
      menu: 'Μενού',
      wineBar: 'Astrea Wine Bar',
      stay: 'Διαμονή',
      suites: 'Σουίτες & δωμάτια',
      standardRooms: 'Στάνταρ δίκλινα',
      juniorSuites: 'Junior suites',
      superiorRooms: 'Superior δίκλινα',
      gastrotourism: 'Γαστροτουρισμός',
      seminars: 'Σεμινάρια',
      fishAgeing: 'Ωρίμανση ψαριών',
      tinos: 'Η Τήνος',
      beaches: 'Παραλίες',
      culture: 'Πολιτισμός',
      activities: 'Δραστηριότητες',
      discoveries: 'Ανακαλύψεις',
      blog: 'Νέα',
      contact: 'Επικοινωνία',
      reservation: 'Κράτηση',
    },
    footer: {
      rights: 'Με επιφύλαξη παντός δικαιώματος.',
      madeIn: 'Τήνος, Κυκλάδες, Ελλάδα',
    },
    home: {
      hours: 'Ώρες λειτουργίας',
      restaurantHours: 'Εστιατόριο 12:30–23:30 καθημερινά',
      breakfastHours: 'Πρωινό 08:30–11:30',
      bookTable: 'Κλείστε τραπέζι',
      awards: 'Βραβεύσεις',
      latestNews: 'Τα νέα μας',
    },
    form: {
      name: 'Ονοματεπώνυμο',
      email: 'Email',
      phone: 'Τηλέφωνο',
      date: 'Ημερομηνία',
      guests: 'Άτομα',
      message: 'Μήνυμα',
      submit: 'Αποστολή',
      submitting: 'Αποστολή…',
      required: 'Υποχρεωτικό πεδίο',
      invalidEmail: 'Μη έγκυρο email',
      success: 'Το αίτημά σας καταχωρήθηκε. Θα επικοινωνήσουμε σύντομα.',
      reservationTitle: 'Φόρμα κράτησης',
      contactTitle: 'Επικοινωνία',
    },
    common: {
      readMore: 'Διαβάστε περισσότερα',
      backToBlog: 'Πίσω στα νέα',
      language: 'Γλώσσα',
      notFound: 'Η σελίδα δεν βρέθηκε',
      backHome: 'Επιστροφή στην αρχική',
      draftTranslation: 'Αυτόματη μετάφραση σε αναμονή ελέγχου',
    },
  },
  en: {
    brand: 'Marathia',
    nav: {
      home: 'Home',
      restaurant: 'Restaurant',
      philosophy: 'Our philosophy',
      history: 'Our history',
      team: 'The team',
      menu: 'Menu',
      wineBar: 'Astrea Wine Bar',
      stay: 'Stay',
      suites: 'Suites & rooms',
      standardRooms: 'Standard double',
      juniorSuites: 'Junior suites',
      superiorRooms: 'Superior rooms',
      gastrotourism: 'Gastrotourism',
      seminars: 'Seminars',
      fishAgeing: 'Fish ageing',
      tinos: 'Tinos',
      beaches: 'Beaches',
      culture: 'Culture',
      activities: 'Activities',
      discoveries: 'Discoveries',
      blog: 'News',
      contact: 'Contact',
      reservation: 'Reservation',
    },
    footer: {
      rights: 'All rights reserved.',
      madeIn: 'Tinos, Cyclades, Greece',
    },
    home: {
      hours: 'Opening hours',
      restaurantHours: 'Restaurant 12:30–23:30 daily',
      breakfastHours: 'Breakfast 08:30–11:30',
      bookTable: 'Book a table',
      awards: 'Awards',
      latestNews: 'Our news',
    },
    form: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      date: 'Date',
      guests: 'Guests',
      message: 'Message',
      submit: 'Send',
      submitting: 'Sending…',
      required: 'Required field',
      invalidEmail: 'Invalid email',
      success: 'Your request has been received. We will contact you soon.',
      reservationTitle: 'Reservation form',
      contactTitle: 'Contact',
    },
    common: {
      readMore: 'Read more',
      backToBlog: 'Back to news',
      language: 'Language',
      notFound: 'Page not found',
      backHome: 'Back to home',
      draftTranslation: 'Machine translation pending review',
    },
  },
} as const

export const SUPPORTED_LOCALES: Locale[] = ['el', 'en']
export const DEFAULT_LOCALE: Locale = 'el'

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages,
})

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  document.documentElement.setAttribute('lang', locale)
}
