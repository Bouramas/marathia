

Note down the pages and check one by one
Custom Google Map with only the restaurant

FIX SEO
FIX HEADER
FIX FOOTER


Site Navigation System:
about
    /history
    /philosophy
    /fish-aging
services
    /workshops
    /gastronomy-tourism
    /consulting
guesthouse
    /booking
    /suites
        /suite-a
        /suite-b
        /suite-c
tinos
    /tinos
    /attractions
    /beaches
contact

--------------


Substack - Maybe add a more obvious link somewhere.

~~Generate a privacy policy and add a subtle link in the footer under the social media links.~~ DONE (draft; needs legal review).


CLEANUP
Check the backup folder
Check the scripts folder and delete whatever is not required.



TODO
Setup SEO tracking - after site goes live
Make sure not too many requests towards google api are made. Is this a problem ? Can we do something about caching? maybe cache for each session?
Create WEB3FORM account link with form in website.

MAKE GOOGLE CLOUD API KEY RESTRAINED TO DOMAIN CALLS ONLY

WEB3FORM PUBLIC KEY
VITE_WEB3FORMS_KEY=3c58fc07-5bce-4b9d-98ed-bc34a0c25f1e

Change image in /booking page.
Change image of hotel in main page.

Fix the transitions from page to page


Ανεξαρτητοποίηση DNS & ανέβασμα νέου site: Μεταφορά των ρυθμίσεων DNS εκτός cPanel (ώστε να μη βασίζονται στο παλιό πακέτο φιλοξενίας), δημοσίευση της νέας ιστοσελίδας και σύνδεση της φόρμας επικοινωνίας με το Gmail.

Ενεργοποίηση Google Analytics (στατιστικά επισκεψιμότητας): Δημιουργία λογαριασμού Google Analytics με τον νέο εταιρικό λογαριασμό Google και σύνδεσή του τόσο με το marathiatinos.gr όσο και με το thefishdryagingschool.com, ώστε να παρακολουθείτε πόσοι επισκέπτες μπαίνουν κάθε μήνα στις δύο ιστοσελίδες.

Ακύρωση παλιού hosting: Αφού επιβεβαιωθεί ότι email, νέα ιστοσελίδα και στατιστικά λειτουργούν κανονικά, ακύρωση μόνο του πακέτου φιλοξενίας (cPanel/WordPress) στο iphost.net, διατηρώντας ενεργή την ανανέωση του domain marathiatinos.gr.


In ROUTE 53 change to p=reject after 2 days? why ? google it
_dmarc -> "v=DMARC1; p=quarantine; adkim=r; aspf=r; pct=100"
