# -*- coding: utf-8 -*-
"""Genera index.html, las 6 fichas de servicio y nude-i18n.js (DE/EN/FR).
   Fuente única de verdad del sitio estebanmarco.ch (rediseño Nude)."""
import json, io, os

OUT = r"D:\Webs clientes\estebanmarco_nude"

# ============================ TEXTOS COMPARTIDOS ============================
SH = {
"tk1":("Erstgespräch kostenlos · 15 Minuten","Free first call · 15 minutes","Premier entretien gratuit · 15 minutes"),
"tk2":("Daten bleiben in der Schweiz","Your data stays in Switzerland","Vos données restent en Suisse"),
"tk3":("Pilot zum Festpreis","Fixed-price pilot","Pilote à prix fixe"),
"tk4":("On-Premise statt Cloud","On-premise instead of cloud","On-premise plutôt que cloud"),
"tk5":("Ein Ansprechpartner, der baut","One partner who builds","Un seul interlocuteur qui construit"),
"nav.lei":("Leistungen","Services","Prestations"),
"nav.suite":("Treuhand-Suite","Treuhand Suite","Suite fiduciaire"),
"nav.priv":("On-Premise","On-premise","On-premise"),
"nav.abl":("Ablauf","Process","Déroulement"),
"nav.cta":("Gespräch","Let's talk","Entretien"),
"hero.h":("Weniger<br>Routine.<br>Mehr<br>Kunden.","Less<br>routine.<br>More<br>clients.","Moins de<br>routine.<br>Plus de<br>clients."),
"hero.lede":("Für KMU und Treuhänder in Zürich. Private KI auf Ihrem eigenen Server, Sichtbarkeit bei Google, Software nach Mass. Ein Ansprechpartner, der baut.","For SMEs and fiduciaries in Zurich. Private AI on your own server, visibility on Google, software built to measure. One partner who builds.","Pour PME et fiduciaires à Zurich. IA privée sur votre propre serveur, visibilité sur Google, logiciel sur mesure. Un seul interlocuteur qui construit."),
"hero.new":("Neu: Treuhand-Suite","New: Treuhand Suite","Nouveau : Suite fiduciaire"),
"hero.col":("KI · SEO · Software · Zürich","AI · SEO · Software · Zurich","IA · SEO · Logiciel · Zurich"),
"hero.tag":("Digitalisierung aus einer Hand.","Digitalisation from one hand.","La digitalisation d'une seule main."),
"btn.demo":("Live-Demo öffnen","Open live demo","Ouvrir la démo"),
"bn1.col":("ZH26 — Treuhand-Suite","ZH26 — Treuhand Suite","ZH26 — Suite fiduciaire"),
"bn1.h":("Belege in<br>4 Sekunden.","Receipts in<br>4 seconds.","Justificatifs en<br>4 secondes."),
"bn1.p":("Belege erfassen, Konten abgleichen, Dossiers befragen — in Sekunden statt Stunden. Drei Module, live an Ihren echten Daten.","Capture receipts, reconcile accounts, query client files — in seconds instead of hours. Three modules, live on your real data.","Saisir les justificatifs, rapprocher les comptes, interroger les dossiers — en secondes au lieu d'heures. Trois modules, en direct sur vos vraies données."),
"bn1.b1":("Demo öffnen","Open demo","Ouvrir la démo"),
"bn1.b2":("Zur Lösung","See the solution","Voir la solution"),
"bn2.col":("Privatsphäre","Privacy","Confidentialité"),
"bn2.h":("Ihre Daten<br>bleiben im Haus.","Your data<br>stays in-house.","Vos données<br>restent chez vous."),
"bn2.p":("Die KI läuft komplett auf Ihrer eigenen Hardware. Kein Datenabfluss, keine Übermittlung ins Ausland, keine Nutzung Ihrer Akten als Trainingsmaterial. AVV inklusive, nDSG-konform.","The AI runs entirely on your own hardware. No data outflow, no transfers abroad, no use of your files as training material. DPA included, nDSG-compliant.","L'IA tourne entièrement sur votre propre matériel. Aucune fuite de données, aucun transfert à l'étranger, aucune utilisation de vos dossiers comme données d'entraînement. Contrat inclus, conforme nLPD."),
"bn2.b1":("On-Premise entdecken","Discover on-premise","Découvrir l'on-premise"),
"st.f1":("weniger manuelle Belegerfassung","less manual document entry","de saisie manuelle en moins"),
"st.f2n":("~4 Sek.","~4 sec.","~4 sec."),
"st.f2":("pro Beleg statt Minuten","per receipt instead of minutes","par justificatif au lieu de minutes"),
"st.f3":("Daten auf Ihrem Server, mit AVV","data on your server, with DPA","données sur votre serveur, avec contrat"),
"abl.h":("Drei Schritte. Kein Pitch.","Three steps. No pitch.","Trois étapes. Pas de pitch."),
"abl.eye":("So fangen wir an","How we start","Comment nous commençons"),
"abl.s1t":("Gespräch · 15 Min.","Call · 15 min.","Entretien · 15 min."),
"abl.s1p":("Wir schauen, wo bei Ihnen die meiste Handarbeit anfällt. Unverbindlich.","We look at where most manual work piles up for you. No strings attached.","Nous regardons où s'accumule le plus de travail manuel chez vous. Sans engagement."),
"abl.s2t":("Pilot · fixer Preis","Pilot · fixed price","Pilote · prix fixe"),
"abl.s2p":("Ich baue eine konkrete Automatisierung. Sie sehen das Ergebnis an Ihren echten Daten.","I build one concrete automation. You see the result on your real data.","Je construis une automatisation concrète. Vous voyez le résultat sur vos vraies données."),
"abl.s3t":("Betrieb &amp; Ausbau","Operation &amp; growth","Exploitation &amp; extension"),
"abl.s3p":("Produktiv auf Ihrem Server, integriert in Ihre Buchhaltung.","In production on your server, integrated with your accounting.","En production sur votre serveur, intégré à votre comptabilité."),
"sto.city":("Zürich","Zurich","Zurich"),
"sto.d1":("Mo–Fr","Mon–Fri","Lun–Ven"),
"sto.h2":("nach Vereinbarung","by appointment","sur rendez-vous"),
"sto.d2":("Sa–So","Sat–Sun","Sam–Dim"),
"cta.eye":("Beginnen","Begin","Commencer"),
"cta.h":("Bereit, Zeit zurückzugewinnen?","Ready to win back your time?","Prêt à regagner du temps ?"),
"cta.lede":("15 Minuten genügen, um zu sehen, wo bei Ihnen am meisten Handarbeit anfällt — und ob sich etwas automatisieren lässt.","15 minutes are enough to see where most manual work piles up — and whether it can be automated.","15 minutes suffisent pour voir où s'accumule le travail manuel — et si cela peut s'automatiser."),
"cta.fn":("Ihr Name","Your name","Votre nom"),
"cta.fe":("Ihre E-Mail","Your e-mail","Votre e-mail"),
"cta.fm":("Wo drückt es? Kurz reicht.","What hurts? A few words are enough.","Où ça coince ? Quelques mots suffisent."),
"cta.send":("Nachricht senden","Send message","Envoyer le message"),
"cta.sending":("Wird gesendet …","Sending …","Envoi …"),
"cta.ok":("Danke! Ihre Nachricht ist unterwegs — ich melde mich innert 24 Stunden.","Thank you! Your message is on its way — I'll get back to you within 24 hours.","Merci ! Votre message est parti — je vous réponds sous 24 heures."),
"cta.err":("Senden fehlgeschlagen — schreiben Sie direkt an info@estebanmarco.ch.","Sending failed — please write directly to info@estebanmarco.ch.","Échec de l'envoi — écrivez directement à info@estebanmarco.ch."),
"cta.b1":("Gespräch vereinbaren","Book a call","Convenir d'un entretien"),
"f.h3":("Ein Ansprechpartner, der baut.","One partner who builds.","Un seul interlocuteur qui construit."),
"f.p":("KI · SEO · Software — für KMU und Treuhänder in Zürich. Direkt, ohne Agentur-Overhead.","AI · SEO · Software — for SMEs and fiduciaries in Zurich. Direct, without agency overhead.","IA · SEO · Logiciel — pour PME et fiduciaires à Zurich. En direct, sans frais d'agence."),
"f.send":("Senden","Send","Envoyer"),
"f.nlok":("Danke — Sie sind dabei!","Thanks — you're in!","Merci — c'est noté !"),
"f.lei":("Leistungen","Services","Prestations"),
"f.demos":("Live-Demos","Live demos","Démos live"),
"f.kont":("Kontakt","Contact","Contact"),
"f.copy":("© 2026 Esteban Marco — Zürich, Schweiz","© 2026 Esteban Marco — Zurich, Switzerland","© 2026 Esteban Marco — Zurich, Suisse"),
"f.tag":("KI · SEO · Software nach Mass","AI · SEO · Software built to measure","IA · SEO · Logiciel sur mesure"),
"pdp.start":("Start","Home","Accueil"),
"pdp.approach":("Der Ansatz","The approach","L'approche"),
"pdp.book":("Gespräch buchen","Book a call","Réserver un entretien"),
"pdp.more":("Weitere Leistungen","More services","Autres prestations"),
"pdp.all":("Alle ansehen","View all","Tout voir"),
"pdp.demos":("Live-Demos","Live demos","Démos live"),
"pdp.back":("← Alle Leistungen","← All services","← Toutes les prestations"),
"acc.q1":("Was macht dieser Service genau?","What exactly does this service do?","Que fait ce service exactement ?"),
"acc.q2":("Für wen ist er gedacht?","Who is it for?","À qui s'adresse-t-il ?"),
"acc.q3":("Was bringt er Ihnen konkret?","What does it get you, concretely?","Qu'est-ce que cela vous apporte concrètement ?"),
"badge.best":("Bestseller","Bestseller","Bestseller"),
"badge.neu":("Neu","New","Nouveau"),
"badge.onp":("On-Premise","On-premise","On-premise"),
"badge.unv":("Unverbindlich","No strings","Sans engagement"),
"cafe.nm":("Erstgespräch · 15 Min","First call · 15 min","Premier entretien · 15 min"),
"cafe.s1":("15 Min","15 min","15 min"),
"cafe.s2":("Kein Pitch","No pitch","Pas de pitch"),
}

# ============================ SERVICIOS ============================
# Campos por idioma: nm, pr, prnote, h1, lede, p1, p2, modeye, mods[9], a1-3, q, qby, s1-3 (chips card), crumb
def T(de,en,fr): return {"de":de,"en":en,"fr":fr}

S = [
 dict(slug="service-seo", num="01", badge="badge.best",
  title="SEO Zürich für KMU — lokale Sichtbarkeit &amp; KI-SEO | Esteban Marco",
  desc="SEO für KMU in Zürich: Google Maps, lokale Rankings und KI-SEO (ChatGPT, Gemini). Audit CHF 890, ab CHF 690/Monat, monatlich kündbar.",
  card="media/card-seo.jpg", pdp2="media/pdp-seo-2.jpg",
  alt="Laptop auf hellem Schreibtisch — Sichtbarkeit und SEO",
  nm=T("Sichtbarkeit &amp; SEO","Visibility &amp; SEO","Visibilité &amp; SEO"),
  pr=T("ab CHF 690 / Monat","from CHF 690 / month","dès CHF 690 / mois"),
  prnote=T("Audit CHF 890 einmalig — wird angerechnet","audit CHF 890 one-off — credited later","audit CHF 890 unique — déduit ensuite"),
  h1=T("Sichtbarkeit<br>&amp; SEO","Visibility<br>&amp; SEO","Visibilité<br>&amp; SEO"),
  lede=T("In Zürich sucht Ihr nächster Mandant nicht nach Ihrem Namen — er sucht nach «Treuhänder Zürich». Wer dort nicht auf Seite eins steht, existiert für ihn nicht.",
         "In Zurich, your next client doesn't search for your name — they search for “fiduciary Zurich”. If you're not on page one, you don't exist for them.",
         "À Zurich, votre prochain client ne cherche pas votre nom — il cherche « fiduciaire Zurich ». Qui n'est pas en première page n'existe pas pour lui."),
  p1=T("Lokale Sichtbarkeit in Google und Google Maps, ein technisches Fundament, das rankt, und Inhalte, die auch KI-Systeme zitieren: Ihre Mandanten fragen längst ChatGPT und Gemini statt Google.",
       "Local visibility on Google and Maps, a technical foundation that ranks, and content that AI systems cite: your clients already ask ChatGPT and Gemini instead of Google.",
       "Visibilité locale sur Google et Maps, un socle technique qui se positionne, et des contenus que les IA citent : vos clients interrogent déjà ChatGPT et Gemini au lieu de Google."),
  p2=T("Der Einstieg ist ein SEO-Audit (CHF 890 einmalig, wird angerechnet). Danach ab CHF 690 / Monat, monatlich kündbar.",
       "The entry point is an SEO audit (CHF 890 one-off, credited later). Then from CHF 690 / month, cancellable monthly.",
       "Le point d'entrée est un audit SEO (CHF 890 unique, déduit ensuite). Puis dès CHF 690 / mois, résiliable mensuellement."),
  modeye=T("Module","Modules","Modules"),
  mods=[T("Google Unternehmensprofil","Google Business Profile","Profil d'établissement Google"),
        T("Maps-Ranking Kanton Zürich","Maps ranking, canton of Zurich","Classement Maps, canton de Zurich"),
        T("NAP-Konsistenz &amp; Verzeichnisse","NAP consistency &amp; directories","Cohérence NAP &amp; annuaires"),
        T("Bewertungsstrategie","Review strategy","Stratégie d'avis"),
        T("Core Web Vitals","Core Web Vitals","Core Web Vitals"),
        T("Strukturierte Daten","Structured data","Données structurées"),
        T("Interne Verlinkung","Internal linking","Maillage interne"),
        T("KI-SEO / GEO — ChatGPT &amp; Gemini","AI-SEO / GEO — ChatGPT &amp; Gemini","SEO-IA / GEO — ChatGPT &amp; Gemini"),
        T("Monitoring &amp; Reporting","Monitoring &amp; reporting","Suivi &amp; reporting")],
  a1=T("Ich sorge dafür, dass Ihr Betrieb bei Google, in Google Maps und in KI-Antworten (ChatGPT, Gemini) erscheint, wenn jemand in Zürich nach Ihrer Leistung sucht — nicht nach Ihrem Namen.",
       "I make sure your business shows up on Google, Google Maps and in AI answers (ChatGPT, Gemini) when someone in Zurich searches for what you do — not for your name.",
       "Je fais en sorte que votre entreprise apparaisse sur Google, Google Maps et dans les réponses des IA (ChatGPT, Gemini) quand quelqu'un à Zurich cherche votre prestation — pas votre nom."),
  a2=T("Für Firmen, die Anfragen verlieren, weil die Konkurrenz weiter oben steht — oder in KI-Antworten gar nicht erst vorkommen.",
       "For companies losing enquiries because competitors rank higher — or because AI answers never mention them at all.",
       "Pour les entreprises qui perdent des demandes parce que la concurrence est mieux classée — ou qui n'apparaissent jamais dans les réponses des IA."),
  a3=T("Mehr qualifizierte Anfragen aus Ihrer Region, monatlich messbar im Report — ohne Werbebudget zu verbrennen.",
       "More qualified enquiries from your region, measured in a monthly report — without burning an ad budget.",
       "Plus de demandes qualifiées de votre région, mesurées chaque mois dans un rapport — sans brûler de budget publicitaire."),
  q=T("Gefunden werden — auch wenn die Suche heute in einem KI-Chat beginnt.","Be found — even when the search starts in an AI chat.","Être trouvé — même quand la recherche commence dans un chat IA."),
  qby=T("Sichtbarkeit &amp; SEO · Esteban Marco","Visibility &amp; SEO · Esteban Marco","Visibilité &amp; SEO · Esteban Marco"),
  s=[T("Lokal","Local","Local"),T("Technisch","Technical","Technique"),T("KI-SEO","AI-SEO","SEO-IA")],
  crumb=T("Leistung 01 — ZH26","Service 01 — ZH26","Prestation 01 — ZH26"), demos=False),

 dict(slug="service-ki", num="02", badge="badge.neu",
  title="KI-Automatisierung für Treuhänder &amp; KMU in Zürich | Esteban Marco",
  desc="Belege erfassen, Bank abgleichen, Dossiers befragen — automatisch, auf Ihrem Server. Bis zu 80% weniger Handarbeit für Treuhänder und KMU in Zürich.",
  card="media/card-ki.jpg", pdp2="media/pdp-ki-2.jpg",
  alt="Belegstapel im warmen Licht — KI-Automatisierung",
  nm=T("KI-Automatisierung","AI automation","Automatisation par IA"),
  pr=T("Pilot zum Festpreis","Fixed-price pilot","Pilote à prix fixe"),
  prnote=T("gebaut an Ihren echten Daten","built on your real data","construit sur vos vraies données"),
  h1=T("KI-<br>Automatisierung","AI<br>automation","Automatisation<br>par IA"),
  lede=T("Jeder von Hand erfasste Beleg ist Zeit qualifizierter Fachkräfte, die nicht verrechnet wird. Der Schreibtisch, der sich selbst ordnet — das ist keine Metapher, das ist das Produkt.",
         "Every receipt typed by hand is time of qualified staff that is never billed. The desk that tidies itself — that's not a metaphor, that's the product.",
         "Chaque justificatif saisi à la main est du temps qualifié jamais facturé. Le bureau qui se range tout seul — ce n'est pas une métaphore, c'est le produit."),
  p1=T("Der <strong>Beleg-Scanner</strong> erkennt Lieferant, Datum, MwSt und Buchungsvorschlag in ~4 Sekunden. Der <strong>Konto-Abgleich</strong> ordnet jede Bankbewegung zu — nur Zweifelsfälle landen bei Ihnen. Der <strong>Treuhand-Assistent</strong> antwortet mit Quellenangabe.",
       "The <strong>receipt scanner</strong> reads supplier, date, VAT and booking proposal in ~4 seconds. The <strong>bank reconciliation</strong> matches every movement — only real doubts reach you. The <strong>fiduciary assistant</strong> answers with sources.",
       "Le <strong>scanner de justificatifs</strong> lit fournisseur, date, TVA et proposition d'écriture en ~4 secondes. Le <strong>rapprochement bancaire</strong> associe chaque mouvement — seuls les vrais doutes vous parviennent. L'<strong>assistant fiduciaire</strong> répond avec ses sources."),
  p2=T("Der Einstieg: ein Pilot zum Festpreis, gebaut an Ihren echten Daten. Oder testen Sie die Suite gleich jetzt.",
       "The entry point: a fixed-price pilot, built on your real data. Or try the suite right now.",
       "Le point d'entrée : un pilote à prix fixe, construit sur vos vraies données. Ou testez la suite dès maintenant."),
  modeye=T("Was drinsteckt","What's inside","Ce qu'il y a dedans"),
  mods=[T("Beleg-Scanner","Receipt scanner","Scanner de justificatifs"),
        T("Konto-Abgleich","Bank reconciliation","Rapprochement bancaire"),
        T("Treuhand-Assistent","Fiduciary assistant","Assistant fiduciaire"),
        T("CAMT.053 / MT940","CAMT.053 / MT940","CAMT.053 / MT940"),
        T("Buchungsvorschläge nach Kontenplan","Booking proposals per your chart","Écritures selon votre plan comptable"),
        T("Mandantentrennung","Client separation","Séparation des mandats"),
        T("Betrieb on-premise","Runs on-premise","Fonctionne on-premise"),
        T("AVV · nDSG-konform","DPA · nDSG-compliant","Contrat · conforme nLPD"),
        T("Lernt aus Korrekturen","Learns from corrections","Apprend de vos corrections")],
  a1=T("Eine private KI-Suite auf Ihrem Server: Belege erfassen, Bank abgleichen, Dossiers befragen — automatisch statt von Hand.",
       "A private AI suite on your server: capturing receipts, reconciling bank statements, querying client files — automatically instead of by hand.",
       "Une suite d'IA privée sur votre serveur : saisie des justificatifs, rapprochement bancaire, interrogation des dossiers — automatiquement, au lieu de le faire à la main."),
  a2=T("Für Treuhänder und KMU, deren Fachkräfte Stunden mit Abtippen, Suchen und Abgleichen verlieren.",
       "For fiduciaries and SMEs whose skilled staff lose hours to typing, searching and reconciling.",
       "Pour les fiduciaires et PME dont les spécialistes perdent des heures à saisir, chercher et rapprocher."),
  a3=T("Bis zu 80% weniger Handarbeit: rund 4 Sekunden pro Beleg, Abschlüsse ohne Nachtschichten — und alles bleibt im Haus.",
       "Up to 80% less manual work: about 4 seconds per receipt, closings without night shifts — and everything stays in-house.",
       "Jusqu'à 80% de travail manuel en moins : environ 4 secondes par justificatif, des clôtures sans nuits blanches — et tout reste chez vous."),
  q=T("Ihre Daten bleiben im Haus. Kein Abfluss, kein Ausland, kein Training mit Ihren Akten.",
      "Your data stays in the house. No outflow, no abroad, no training on your files.",
      "Vos données restent chez vous. Aucune fuite, aucun étranger, aucun entraînement sur vos dossiers."),
  qby=T("Private KI · On-Premise","Private AI · on-premise","IA privée · on-premise"),
  s=[T("Belege","Receipts","Justificatifs"),T("Abgleich","Reconciliation","Rapprochement"),T("Assistent","Assistant","Assistant")],
  crumb=T("Leistung 02 — ZH26","Service 02 — ZH26","Prestation 02 — ZH26"), demos=True),

 dict(slug="service-ai", num="03", badge="badge.onp",
  title="Private KI lokal — eigenes Sprachmodell, DSG-konform | Esteban Marco",
  desc="Ihr eigenes Sprachmodell auf Ihrer Hardware: KI-Antworten aus Ihren Dokumenten, ohne Cloud, ohne Abo, ohne Datenabfluss. Für Firmen in Zürich und der Schweiz.",
  card="media/card-ai.jpg", pdp2="media/pdp-ai-2.jpg",
  alt="Kleiner Computer auf beigem Studiohintergrund — private KI",
  nm=T("Private KI · lokal","Private AI · local","IA privée · locale"),
  pr=T("auf Anfrage","on request","sur demande"),
  prnote=T("einmalig — kein Abo pro Nutzer","one-off — no per-seat subscription","unique — pas d'abonnement par poste"),
  h1=T("Private KI<br>· lokal","Private AI<br>· local","IA privée<br>· locale"),
  lede=T("ChatGPT ist stark — aber Ihre Dossiers gehören nicht in fremde Clouds. Die Alternative: Ihr eigenes Sprachmodell, auf Ihrer Hardware, hinter Ihrer Tür.",
         "ChatGPT is powerful — but your files don't belong in someone else's cloud. The alternative: your own language model, on your hardware, behind your door.",
         "ChatGPT est puissant — mais vos dossiers n'ont rien à faire dans le cloud d'un tiers. L'alternative : votre propre modèle de langage, sur votre matériel, derrière votre porte."),
  p1=T("Ich installiere ein offenes Sprachmodell auf Ihrer eigenen Box und verbinde es mit Ihren Dokumenten: Fragen in natürlicher Sprache, Antworten mit Quellenangabe — komplett offline möglich.",
       "I install an open language model on your own box and connect it to your documents: questions in natural language, answers with sources — fully offline if you wish.",
       "J'installe un modèle de langage ouvert sur votre propre machine et je le relie à vos documents : questions en langage naturel, réponses avec sources — entièrement hors ligne si vous voulez."),
  p2=T("Einmal eingerichtet, gehört das System Ihnen: kein Abo pro Nutzer, keine Datenübermittlung, kein Anbieter, der die Regeln ändert.",
       "Once set up, the system is yours: no per-seat subscription, no data transfer, no vendor changing the rules.",
       "Une fois installé, le système est à vous : pas d'abonnement par poste, pas de transfert de données, pas de fournisseur qui change les règles."),
  modeye=T("Was drinsteckt","What's inside","Ce qu'il y a dedans"),
  mods=[T("Lokales Sprachmodell auf Ihrer Box","Local language model on your box","Modèle de langage local"),
        T("Fragen an Ihre Dokumente (RAG)","Ask your documents (RAG)","Interroger vos documents (RAG)"),
        T("Antworten mit Quellenangabe","Answers with sources","Réponses avec sources"),
        T("Komplett offline möglich","Fully offline possible","Entièrement hors ligne possible"),
        T("Kein Abo pro Nutzer","No per-seat subscription","Pas d'abonnement par poste"),
        T("Mandantentrennung","Client separation","Séparation des mandats"),
        T("AVV · nDSG-konform","DPA · nDSG-compliant","Contrat · conforme nLPD"),
        T("Wartung &amp; Modell-Updates","Maintenance &amp; model updates","Maintenance &amp; mises à jour"),
        T("Schulung Ihres Teams","Team training","Formation de votre équipe")],
  a1=T("Ich installiere ein eigenes Sprachmodell (wie ChatGPT, aber privat) auf Ihrer Hardware und verbinde es mit Ihren Dokumenten.",
       "I install your own language model (like ChatGPT, but private) on your hardware and connect it to your documents.",
       "J'installe votre propre modèle de langage (comme ChatGPT, mais privé) sur votre matériel et je le relie à vos documents."),
  a2=T("Für alle, die KI nutzen wollen, deren Daten aber vertraulich sind: Mandate, Verträge, Personal- oder Patientenakten.",
       "For anyone who wants to use AI but whose data is confidential: mandates, contracts, HR or patient files.",
       "Pour tous ceux qui veulent utiliser l'IA mais dont les données sont confidentielles : mandats, contrats, dossiers RH ou patients."),
  a3=T("KI-Antworten mit Quellenangabe aus Ihren eigenen Akten — ohne Abo pro Kopf, und kein Byte verlässt das Haus.",
       "AI answers with sources from your own files — no per-seat subscription, and not a single byte leaves the building.",
       "Des réponses d'IA avec sources, tirées de vos propres dossiers — sans abonnement par poste, et pas un octet ne quitte la maison."),
  q=T("Die Intelligenz im Haus — nicht im Abo.","Intelligence in the house — not in a subscription.","L'intelligence dans la maison — pas dans un abonnement."),
  qby=T("Private KI · lokal","Private AI · local","IA privée · locale"),
  s=[T("Ohne Cloud","No cloud","Sans cloud"),T("Ohne Abo","No subscription","Sans abonnement"),None],
  crumb=T("Leistung 03 — ZH26","Service 03 — ZH26","Prestation 03 — ZH26"), demos=False),

 dict(slug="service-crm", num="04", badge=None,
  title="CRM nach Mass für KMU in Zürich — Festpreis statt Abo | Esteban Marco",
  desc="Kundenverwaltung, gebaut auf Ihren Ablauf: Kontakte, Pipeline, Fristen, E-Mail und Rechnung an einem Ort. Festpreis statt Abo pro Sitzplatz.",
  card="media/card-crm.jpg", pdp2="media/pdp-crm-2.jpg",
  alt="Hände mit Karteikarte — CRM nach Mass",
  nm=T("CRM nach Mass","CRM built to measure","CRM sur mesure"),
  pr=T("Festpreis","Fixed price","Prix fixe"),
  prnote=T("statt Abo pro Sitzplatz","instead of per-seat subscription","au lieu d'un abonnement par poste"),
  h1=T("CRM<br>nach Mass","CRM<br>built to measure","CRM<br>sur mesure"),
  lede=T("Drei Tabellen, ein Postfach und das Gedächtnis des Chefs sind kein Kundensystem. Ein CRM nach Mass schon — gebaut für Ihren Ablauf, nicht für den eines US-Konzerns.",
         "Three spreadsheets, an inbox and the boss's memory are not a client system. A CRM built to measure is — made for your process, not a US corporation's.",
         "Trois tableaux, une boîte mail et la mémoire du chef ne font pas un système client. Un CRM sur mesure, si — fait pour votre processus, pas celui d'un groupe américain."),
  p1=T("Pipeline, Kontakte, Fristen, E-Mail und Rechnung an einem Ort. Gebaut auf Ihre Begriffe und Ihre Schritte — nicht ein Standard-CRM, das Sie verbiegen müssen.",
       "Pipeline, contacts, deadlines, e-mail and invoicing in one place. Built on your terms and your steps — not a standard CRM you have to bend.",
       "Pipeline, contacts, échéances, e-mail et facturation au même endroit. Construit sur vos termes et vos étapes — pas un CRM standard à tordre."),
  p2=T("Auf Wunsch mit KI: Anfragen werden automatisch erfasst, zugeordnet und mit einem Antwortvorschlag versehen. Festpreis statt Abo pro Sitzplatz.",
       "With AI if you wish: enquiries are captured, assigned and given a draft reply automatically. Fixed price instead of per-seat subscription.",
       "Avec IA si vous voulez : les demandes sont saisies, attribuées et dotées d'un brouillon de réponse automatiquement. Prix fixe au lieu d'un abonnement par poste."),
  modeye=T("Was drinsteckt","What's inside","Ce qu'il y a dedans"),
  mods=[T("Pipeline &amp; Verkaufsphasen","Pipeline &amp; sales stages","Pipeline &amp; phases de vente"),
        T("Kontakte &amp; Firmenakten","Contacts &amp; company files","Contacts &amp; dossiers"),
        T("Fristen &amp; Wiedervorlagen","Deadlines &amp; follow-ups","Échéances &amp; relances"),
        T("E-Mail-Anbindung","E-mail integration","Intégration e-mail"),
        T("Offerten &amp; Rechnungen","Quotes &amp; invoices","Offres &amp; factures"),
        T("KI-Antwortvorschläge","AI reply drafts","Brouillons de réponse IA"),
        T("Auswertungen &amp; Reports","Insights &amp; reports","Analyses &amp; rapports"),
        T("Import aus Excel/Outlook","Import from Excel/Outlook","Import Excel/Outlook"),
        T("Betrieb on-premise oder CH-Cloud","On-premise or Swiss cloud","On-premise ou cloud suisse")],
  a1=T("Ein Kundensystem, gebaut auf Ihren Ablauf: Kontakte, Pipeline, Fristen, E-Mail und Rechnung an einem Ort.",
       "A client system built around your workflow: contacts, pipeline, deadlines, e-mail and invoicing in one place.",
       "Un système client construit sur votre façon de travailler : contacts, pipeline, échéances, e-mail et facturation au même endroit."),
  a2=T("Für Teams, die Kunden in Excel, Outlook und im Kopf verwalten — und dabei Anfragen und Fristen verlieren.",
       "For teams managing clients in Excel, Outlook and memory — losing enquiries and deadlines along the way.",
       "Pour les équipes qui gèrent leurs clients dans Excel, Outlook et de mémoire — en perdant demandes et échéances au passage."),
  a3=T("Nichts fällt mehr durch: jede Anfrage erfasst, jede Frist gemeldet. Festpreis statt Abo pro Sitzplatz.",
       "Nothing slips through anymore: every enquiry captured, every deadline flagged. Fixed price instead of per-seat fees.",
       "Plus rien ne passe entre les mailles : chaque demande saisie, chaque échéance signalée. Prix fixe au lieu d'un abonnement par poste."),
  q=T("Kein Kunde vergessen, keine Frist verpasst — ohne ein Abo pro Kopf.","No client forgotten, no deadline missed — without a per-seat subscription.","Aucun client oublié, aucune échéance manquée — sans abonnement par tête."),
  qby=T("CRM nach Mass · Esteban Marco","CRM built to measure · Esteban Marco","CRM sur mesure · Esteban Marco"),
  s=[T("Pipeline","Pipeline","Pipeline"),T("Fristen","Deadlines","Échéances"),T("Rechnung","Invoicing","Factures")],
  crumb=T("Leistung 04 — ZH26","Service 04 — ZH26","Prestation 04 — ZH26"), demos=False),

 dict(slug="service-software", num="05", badge=None,
  title="Software nach Mass Zürich — Web-Apps &amp; Schnittstellen | Esteban Marco",
  desc="Individuelle Web-Apps, Portale und Schnittstellen (Abacus, Bexio, CAMT.053) für KMU in Zürich. On-Premise möglich — der Quellcode gehört Ihnen.",
  card="media/card-sw.jpg", pdp2="media/pdp-sw-2.jpg",
  alt="Architekturzeichnung — Software nach Mass",
  nm=T("Software nach Mass","Software built to measure","Logiciel sur mesure"),
  pr=T("Festpreis pro Phase","Fixed price per phase","Prix fixe par phase"),
  prnote=T("Ausstieg jederzeit","exit any time","sortie à tout moment"),
  h1=T("Software<br>nach Mass","Software<br>built to measure","Logiciel<br>sur mesure"),
  lede=T("Irgendwann passt keine Standardsoftware mehr: der Prozess ist zu speziell, drei Systeme sprechen nicht miteinander. Dann baut man das Werkzeug selbst.",
         "At some point no standard software fits: the process is too specific, three systems don't talk to each other. Then you build the tool yourself.",
         "Un jour, aucun logiciel standard ne convient plus : le processus est trop spécifique, trois systèmes ne se parlent pas. Alors on construit l'outil soi-même."),
  p1=T("Bevor Code entsteht, steht das Zielbild: Prozessaufnahme vor Ort, Datenmodell schriftlich. Gebaut wird in kleinen, nutzbaren Blöcken — nach jedem Block läuft etwas.",
       "Before any code, the target picture: process mapping on site, data model in writing. Built in small usable blocks — after each block, something runs.",
       "Avant toute ligne de code, la cible : relevé de processus sur place, modèle de données par écrit. Construit en petits blocs utilisables — après chaque bloc, quelque chose tourne."),
  p2=T("Festpreis pro Phase, Ausstieg jederzeit. Übergabe heisst Übergabe: Quellcode und Dokumentation gehören Ihnen.",
       "Fixed price per phase, exit any time. Handover means handover: source code and documentation are yours.",
       "Prix fixe par phase, sortie possible à chaque étape. La remise est une vraie remise : code source et documentation vous appartiennent."),
  modeye=T("Was gebaut wird","What gets built","Ce qui est construit"),
  mods=[T("Interne Web-Apps","Internal web apps","Applications web internes"),
        T("Kundenportale","Client portals","Portails clients"),
        T("Dashboards &amp; Daten-Werkzeuge","Dashboards &amp; data tools","Dashboards &amp; outils de données"),
        T("Abacus-Anbindung","Abacus integration","Intégration Abacus"),
        T("Bexio-Anbindung","Bexio integration","Intégration Bexio"),
        T("CAMT.053 &amp; Bankdaten","CAMT.053 &amp; bank data","CAMT.053 &amp; données bancaires"),
        T("Microsoft 365 / Google Workspace","Microsoft 365 / Google Workspace","Microsoft 365 / Google Workspace"),
        T("REST &amp; Webhooks","REST &amp; webhooks","REST &amp; webhooks"),
        T("On-Premise oder CH-Hosting","On-premise or Swiss hosting","On-premise ou hébergement suisse")],
  a1=T("Ich baue das Werkzeug, das es für Ihren Prozess nicht zu kaufen gibt — als Web-App, Portal oder Schnittstelle.",
       "I build the tool your process needs but no one sells — as a web app, portal or integration.",
       "Je construis l'outil dont votre processus a besoin mais que personne ne vend — application web, portail ou interface."),
  a2=T("Für Firmen, deren Abläufe in zu gross gewordenen Excel-Dateien leben oder deren Systeme nicht miteinander sprechen.",
       "For companies whose workflows live in overgrown spreadsheets, or whose systems refuse to talk to each other.",
       "Pour les entreprises dont les processus vivent dans des fichiers Excel devenus trop grands, ou dont les systèmes ne se parlent pas."),
  a3=T("Ein Werkzeug, das exakt passt, in Etappen geliefert — und am Ende gehört der Quellcode Ihnen.",
       "A tool that fits exactly, delivered in stages — and in the end, the source code is yours.",
       "Un outil qui vous va exactement, livré par étapes — et à la fin, le code source vous appartient."),
  q=T("Übergabe heisst wirklich Übergabe — Quellcode und Dokumentation gehören Ihnen.","Handover really means handover — source code and documentation are yours.","La remise est une vraie remise — code source et documentation vous appartiennent."),
  qby=T("Software nach Mass · Esteban Marco","Software built to measure · Esteban Marco","Logiciel sur mesure · Esteban Marco"),
  s=[T("Web-Apps","Web apps","Apps web"),T("Schnittstellen","Integrations","Interfaces"),None],
  crumb=T("Leistung 05 — ZH26","Service 05 — ZH26","Prestation 05 — ZH26"), demos=False),

 dict(slug="service-voice", num="06", badge="badge.neu",
  title="KI-Voice-Agents — Telefon-KI für Leads &amp; Termine | Esteban Marco",
  desc="KI-Telefonagenten rufen jeden neuen Lead in unter 30 Sekunden an, qualifizieren ihn und buchen den Termin — mit automatischem Follow-up. Für KMU in Zürich.",
  card="media/card-voice.jpg", pdp2="media/pdp-voice-2.jpg",
  alt="Cremefarbenes Telefon an heller Wand — KI-Voice-Agents",
  nm=T("KI-Voice-Agents","AI voice agents","Agents vocaux IA"),
  pr=T("auf Anfrage","on request","sur demande"),
  prnote=T("Setup einmalig + Betrieb pro Monat","one-off setup + monthly operation","installation unique + exploitation mensuelle"),
  h1=T("KI-Voice-<br>Agents","AI voice<br>agents","Agents vocaux<br>IA"),
  lede=T("Ein Lead, der eine Stunde wartet, ist kein Lead mehr. Der Voice-Agent ruft in unter 30 Sekunden zurück — freundlich, zu jeder Uhrzeit, und er gibt nicht auf, bis der Kontakt steht.",
         "A lead that waits an hour is no longer a lead. The voice agent calls back in under 30 seconds — friendly, at any hour, and it doesn't give up until contact is made.",
         "Un lead qui attend une heure n'est plus un lead. L'agent vocal rappelle en moins de 30 secondes — aimable, à toute heure, et il n'abandonne pas tant que le contact n'est pas établi."),
  p1=T("Der Agent meldet sich sofort nach jeder Anfrage, stellt die richtigen Fragen, erkennt echtes Interesse und bucht den Termin direkt in Ihren Kalender. Erreicht er niemanden, fasst er automatisch nach.",
       "The agent responds right after every enquiry, asks the right questions, detects real interest and books the appointment straight into your calendar. If nobody answers, it follows up automatically.",
       "L'agent se manifeste juste après chaque demande, pose les bonnes questions, détecte l'intérêt réel et réserve le rendez-vous directement dans votre calendrier. Si personne ne répond, il relance automatiquement."),
  p2=T("Jedes Gespräch wird protokolliert und zusammengefasst — Ihr Team übernimmt nur noch die Termine. Der Einstieg: ein Pilot an Ihren echten Anfragen.",
       "Every call is logged and summarised — your team only takes over the appointments. The entry point: a pilot on your real enquiries.",
       "Chaque appel est consigné et résumé — votre équipe ne reprend que les rendez-vous. Le point d'entrée : un pilote sur vos vraies demandes."),
  modeye=T("Was drinsteckt","What's inside","Ce qu'il y a dedans"),
  mods=[T("Anruf in &lt; 30 Sekunden","Call in &lt; 30 seconds","Appel en &lt; 30 secondes"),
        T("Lead-Qualifizierung","Lead qualification","Qualification des leads"),
        T("Terminbuchung im Kalender","Calendar booking","Prise de rendez-vous"),
        T("Automatisches Follow-up","Automatic follow-up","Relance automatique"),
        T("Inbound &amp; Outbound","Inbound &amp; outbound","Entrant &amp; sortant"),
        T("Mehrsprachig DE / EN / FR","Multilingual DE / EN / FR","Multilingue DE / EN / FR"),
        T("Gesprächsprotokoll &amp; Zusammenfassung","Call log &amp; summary","Journal &amp; résumé d'appel"),
        T("CRM-Anbindung","CRM integration","Intégration CRM"),
        T("nDSG-konform","nDSG-compliant","Conforme nLPD")],
  a1=T("Ein KI-Telefonagent ruft jeden neuen Lead in unter 30 Sekunden an, qualifiziert ihn im Gespräch und bucht den Termin für Ihr Team — mit Follow-up, bis er jemanden erreicht.",
       "An AI phone agent calls every new lead in under 30 seconds, qualifies them in conversation and books the appointment for your team — following up until someone is reached.",
       "Un agent téléphonique IA appelle chaque nouveau lead en moins de 30 secondes, le qualifie en conversation et réserve le rendez-vous pour votre équipe — avec relances jusqu'à joindre quelqu'un."),
  a2=T("Für Firmen, deren Anfragen erkalten, weil niemand sofort zurückruft: Immobilien, Treuhand, Praxen, Handwerk und Vertrieb.",
       "For companies whose enquiries go cold because nobody calls back right away: real estate, fiduciaries, practices, trades and sales teams.",
       "Pour les entreprises dont les demandes refroidissent parce que personne ne rappelle tout de suite : immobilier, fiduciaires, cabinets, artisans et équipes de vente."),
  a3=T("Kein Lead bleibt liegen: sofortige Antwort auf jede Anfrage und mehr Termine im Kalender — ohne zusätzliches Personal.",
       "No lead is left behind: an instant response to every enquiry and more appointments in the calendar — without extra staff.",
       "Aucun lead laissé de côté : une réponse immédiate à chaque demande et plus de rendez-vous au calendrier — sans personnel supplémentaire."),
  q=T("Kein Lead wartet länger als 30 Sekunden.","No lead waits longer than 30 seconds.","Aucun lead n'attend plus de 30 secondes."),
  qby=T("KI-Voice-Agents · Esteban Marco","AI voice agents · Esteban Marco","Agents vocaux IA · Esteban Marco"),
  s=[T("&lt; 30 Sek.","&lt; 30 sec.","&lt; 30 sec."),T("Qualifiziert","Qualifies","Qualifie"),T("Bucht Termine","Books meetings","Prend RDV")],
  crumb=T("Leistung 06 — ZH26","Service 06 — ZH26","Prestation 06 — ZH26"), demos=False),
]

def unesc(t): return t.replace("&amp;","&").replace("&lt;","<")

# ============================ DICCIONARIO I18N ============================
def build_i18n():
    d = {"en":{}, "fr":{}}
    for k,(de,en,fr) in SH.items():
        d["en"][k]=en; d["fr"][k]=fr
    for s in S:
        p = s["slug"].replace("service-","")
        for f in ["nm","pr","prnote","h1","lede","p1","p2","modeye","a1","a2","a3","q","qby","crumb"]:
            d["en"][f"{p}.{f}"]=s[f]["en"]; d["fr"][f"{p}.{f}"]=s[f]["fr"]
        for i,m in enumerate(s["mods"],1):
            d["en"][f"{p}.c{i}"]=m["en"]; d["fr"][f"{p}.c{i}"]=m["fr"]
        for i,c in enumerate(s["s"],1):
            if c: d["en"][f"{p}.s{i}"]=c["en"]; d["fr"][f"{p}.s{i}"]=c["fr"]
    return d

# ============================ FRAGMENTOS COMUNES ============================
def de(key): return SH[key][0]

HEAD_FONTS = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">'''

def header(active_home):
    wm_href = "#top" if active_home else "index.html"
    nav = (f'''<a href="#leistungen" data-i="nav.lei">{de("nav.lei")}</a>
    <a href="#suite" data-i="nav.suite">{de("nav.suite")}</a>
    <a href="#privat" data-i="nav.priv">{de("nav.priv")}</a>
    <a href="#ablauf" data-i="nav.abl">{de("nav.abl")}</a>''' if active_home else
    f'''<a href="index.html#leistungen" data-i="pdp.back">{de("pdp.back")}</a>
    <a href="index.html#suite" data-i="nav.suite">{de("nav.suite")}</a>
    <a href="index.html#privat" data-i="nav.priv">{de("nav.priv")}</a>''')
    kontakt = "#kontakt" if active_home else "index.html#kontakt"
    return f'''<!-- Ticker -->
<div class="ticker" aria-hidden="true"><div class="tk" id="tk"></div></div>

<!-- Header -->
<header class="hd">
  <a class="wordmark" href="{wm_href}">Esteban Marco<sup>®</sup></a>
  <nav>
    {nav}
  </nav>
  <div class="hd-r">
    <div class="lang" role="group" aria-label="Sprache">
      <button type="button" data-lang="de">DE</button><span>·</span><button type="button" data-lang="en">EN</button><span>·</span><button type="button" data-lang="fr">FR</button>
    </div>
    <a class="pill line" href="{kontakt}" data-i="nav.cta">{de("nav.cta")}</a>
  </div>
</header>'''

def footer():
    lei = "\n".join(f'      <a href="{s["slug"]}.html" data-i="{s["slug"].replace("service-","")}.nm">{s["nm"]["de"]}</a>' for s in S)
    return f'''<footer>
  <div class="f-top">
    <div class="f-news">
      <h3 data-i="f.h3">{de("f.h3")}</h3>
      <p data-i="f.p">{de("f.p")}</p>
      <form class="row" id="nlform">
        <input type="email" name="email" placeholder="{de("cta.fe")}" data-i-ph="cta.fe" aria-label="E-Mail" required>
        <button type="submit" data-i="f.send">{de("f.send")}</button>
      </form>
      <div class="kmsg" id="nlmsg" role="status"></div>
    </div>
    <div class="f-col">
      <h4 data-i="f.lei">{de("f.lei")}</h4>
{lei}
    </div>
    <div class="f-col">
      <h4 data-i="f.demos">{de("f.demos")}</h4>
      <a href="01_beleg-scanner.html">Beleg-Scanner</a>
      <a href="02_konto-abgleich.html">Konto-Abgleich</a>
      <a href="03_treuhand-assistent.html">Treuhand-Assistent</a>
    </div>
    <div class="f-col">
      <h4 data-i="f.kont">{de("f.kont")}</h4>
      <a href="mailto:info@estebanmarco.ch">info@estebanmarco.ch</a>
      <a href="tel:+41767421548">+41 76 742 15 48</a>
      <a href="impressum.html">Impressum</a>
      <a href="datenschutz.html">Datenschutz</a>
    </div>
  </div>
  <div class="f-mark" aria-hidden="true">ESTEBAN MARCO<sup>®</sup></div>
  <div class="f-bot">
    <span data-i="f.copy">{de("f.copy")}</span>
    <span data-i="f.tag">{de("f.tag")}</span>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="nude-i18n.js?v=6"></script>
<script src="nude.js?v=6"></script>'''

def card(s):
    p = s["slug"].replace("service-","")
    badge = f'\n      <span class="badge" data-i="{s["badge"]}">{de(s["badge"])}</span>' if s["badge"] else ""
    chips = "".join(f'<span data-i="{p}.s{i}">{c["de"]}</span>' for i,c in enumerate(s["s"],1) if c)
    return f'''  <a class="card" href="{s["slug"]}.html">
    <div class="cmedia">
      <img src="{s["card"]}" alt="{s["alt"]}" loading="lazy">{badge}
      <span class="fav">+</span>
      <div class="sizes">{chips}</div>
    </div>
    <div class="cinfo"><span class="nm" data-i="{p}.nm">{s["nm"]["de"]}</span><span class="pr" data-i="{p}.pr">{s["pr"]["de"]}</span></div>
  </a>'''

# ============================ INDEX ============================
def build_index():
    cards = "\n\n".join(card(s) for s in S)
    offers = ",\n".join(f'{{"@type":"Offer","itemOffered":{{"@type":"Service","name":"{unesc(s["nm"]["de"])}","url":"https://estebanmarco.ch/{s["slug"]}.html"}}}}' for s in S)
    return f'''<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KI, SEO &amp; Software für KMU in Zürich — Esteban Marco</title>
<meta name="description" content="Digitalisierung aus einer Hand für KMU und Treuhänder in Zürich: private KI on-premise, CRM und Software nach Mass, SEO-Sichtbarkeit.">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
{HEAD_FONTS}
<link rel="canonical" href="https://estebanmarco.ch/">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_CH">
<meta property="og:site_name" content="Esteban Marco">
<meta property="og:title" content="KI, SEO & Software für KMU in Zürich — Esteban Marco">
<meta property="og:description" content="Digitalisierung aus einer Hand für KMU und Treuhänder in Zürich: private KI on-premise, CRM und Software nach Mass, SEO-Sichtbarkeit.">
<meta property="og:url" content="https://estebanmarco.ch/">
<meta property="og:image" content="https://estebanmarco.ch/media/hero.jpg">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"ProfessionalService","@id":"https://estebanmarco.ch/#business",
"name":"Esteban Marco — KI, SEO & Software für KMU",
"url":"https://estebanmarco.ch/","email":"info@estebanmarco.ch","telephone":"+41 76 742 15 48",
"image":"https://estebanmarco.ch/media/hero.jpg",
"address":{{"@type":"PostalAddress","addressLocality":"Zollikon","addressRegion":"ZH","postalCode":"8702","addressCountry":"CH"}},
"areaServed":[{{"@type":"City","name":"Zürich"}},{{"@type":"AdministrativeArea","name":"Kanton Zürich"}},{{"@type":"Country","name":"Schweiz"}}],
"priceRange":"CHF","knowsLanguage":["de","en","fr","es"],
"makesOffer":[
{offers}]}}
</script>
<link rel="stylesheet" href="nude.css?v=9">
<script>document.documentElement.className+=' js';</script>
</head>
<body>

<h1 class="sr">Esteban Marco — KI-Automatisierung, private KI, CRM, SEO, Voice-Agents und Software nach Mass für KMU und Treuhänder in Zürich.</h1>

{header(True)}

<!-- Hero -->
<section class="hero" id="top">
  <div class="hbg">
    <img src="media/hero.jpg" alt="Helles Büro mit grossen Fenstern in Zürich" fetchpriority="high">
  </div>
  <div class="htxt" data-r>
    <h2 class="giant" data-i="hero.h">{de("hero.h")}</h2>
    <p class="hlede" data-i="hero.lede">{de("hero.lede")}</p>
  </div>
  <div class="hmeta" data-r>
    <div class="col" data-i="hero.col">{de("hero.col")}</div>
    <h3 data-i="hero.tag">{de("hero.tag")}</h3>
    <div class="hbtns">
      <a class="pill" href="#kontakt" data-i="pdp.book">{de("pdp.book")}</a>
      <a class="pill" href="#leistungen" data-i="nav.lei">{de("nav.lei")}</a>
    </div>
  </div>
</section>

<!-- Leistungen -->
<div id="leistungen"></div>
<div class="shead">
  <h2 data-i="nav.lei">{de("nav.lei")}</h2>
  <a class="more" href="#kontakt" data-i="cta.b1">{de("cta.b1")}</a>
</div>
<div class="strip">

{cards}

  <a class="card" href="#kontakt">
    <div class="cmedia">
      <img src="media/card-cafe.jpg" alt="Kaffeetasse auf hellem Tisch — Erstgespräch" loading="lazy">
      <span class="badge" data-i="badge.unv">{de("badge.unv")}</span>
      <span class="fav">+</span>
      <div class="sizes"><span data-i="cafe.s1">{de("cafe.s1")}</span><span data-i="cafe.s2">{de("cafe.s2")}</span></div>
    </div>
    <div class="cinfo"><span class="nm" data-i="cafe.nm">{de("cafe.nm")}</span><span class="pr">CHF 0</span></div>
  </a>

</div>

<!-- Banner: Treuhand-Suite -->
<section class="banner" id="suite">
  <img src="media/banner-suite.jpg" alt="Arbeitsplatz von oben mit Laptop und Notizbuch" loading="lazy">
  <div class="veil"></div>
  <div class="bn-in">
    <div class="glass" data-r>
      <div class="col" data-i="bn1.col">{de("bn1.col")}</div>
      <h2 data-i="bn1.h">{de("bn1.h")}</h2>
      <p data-i="bn1.p">{de("bn1.p")}</p>
    </div>
    <div class="hbtns" data-r>
      <a class="pill" href="01_beleg-scanner.html" data-i="bn1.b1">{de("bn1.b1")}</a>
      <a class="pill" href="service-ki.html" data-i="bn1.b2">{de("bn1.b2")}</a>
    </div>
  </div>
</section>

<!-- Stats -->
<div style="height:24px"></div>
<div class="stats">
  <div class="stat" data-r><div class="n"><span data-count="80">0</span>%</div><p data-i="st.f1">{de("st.f1")}</p></div>
  <div class="stat" data-r><div class="n" data-i="st.f2n">{de("st.f2n")}</div><p data-i="st.f2">{de("st.f2")}</p></div>
  <div class="stat" data-r><div class="n"><span data-count="100">0</span>% CH</div><p data-i="st.f3">{de("st.f3")}</p></div>
</div>

<!-- Banner: On-Premise -->
<section class="banner dk" id="privat">
  <img src="media/banner-premise.jpg" alt="Massive Betonarchitektur — Daten bleiben im Haus" loading="lazy">
  <div class="veil"></div>
  <div class="bn-in">
    <div class="glass" data-r>
      <div class="col" data-i="bn2.col">{de("bn2.col")}</div>
      <h2 data-i="bn2.h">{de("bn2.h")}</h2>
      <p data-i="bn2.p">{de("bn2.p")}</p>
    </div>
    <div class="hbtns" data-r>
      <a class="pill" href="service-ai.html" data-i="bn2.b1">{de("bn2.b1")}</a>
    </div>
  </div>
</section>

<!-- Ablauf -->
<div class="shead" id="ablauf">
  <h2 data-i="abl.h">{de("abl.h")}</h2>
  <span class="label" data-i="abl.eye">{de("abl.eye")}</span>
</div>
<div class="steps">
  <div class="srow" data-r>
    <span class="n">01</span>
    <h3 data-i="abl.s1t">{de("abl.s1t")}</h3>
    <p data-i="abl.s1p">{de("abl.s1p")}</p>
  </div>
  <div class="srow" data-r>
    <span class="n">02</span>
    <h3 data-i="abl.s2t">{de("abl.s2t")}</h3>
    <p data-i="abl.s2p">{de("abl.s2p")}</p>
  </div>
  <div class="srow" data-r>
    <span class="n">03</span>
    <h3 data-i="abl.s3t">{de("abl.s3t")}</h3>
    <p data-i="abl.s3p">{de("abl.s3p")}</p>
  </div>
</div>

<!-- Kontakt -->
<section class="store" id="kontakt">
  <div class="st-l">
    <h2 class="giant" data-i="sto.city">{de("sto.city")}</h2>
    <p class="addr">Dufourstrasse 27<br>8702 Zollikon, Schweiz</p>
    <div class="hours">
      <div class="hrow"><span data-i="sto.d1">{de("sto.d1")}</span><span>9–18</span></div>
      <div class="hrow"><span data-i="sto.d2">{de("sto.d2")}</span><span data-i="sto.h2">{de("sto.h2")}</span></div>
    </div>
    <div class="st-links">
      <a href="mailto:info@estebanmarco.ch">info@estebanmarco.ch</a>
      <a href="tel:+41767421548">+41 76 742 15 48</a>
      <a href="https://wa.me/34652323585" target="_blank" rel="noopener">WhatsApp</a>
    </div>
  </div>
  <div class="st-r">
    <span class="label" data-i="cta.eye">{de("cta.eye")}</span>
    <h3 data-i="cta.h">{de("cta.h")}</h3>
    <p class="sub" data-i="cta.lede">{de("cta.lede")}</p>
    <form class="kform" id="kform">
      <input name="name" placeholder="{de("cta.fn")}" data-i-ph="cta.fn" required>
      <input name="email" type="email" placeholder="{de("cta.fe")}" data-i-ph="cta.fe" required>
      <textarea name="message" rows="3" placeholder="{de("cta.fm")}" data-i-ph="cta.fm" required></textarea>
      <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">
      <button class="pill line" type="submit" data-i="cta.send">{de("cta.send")}</button>
      <div class="kmsg" id="kmsg" role="status"></div>
    </form>
  </div>
</section>

{footer()}
</body>
</html>
'''

# ============================ PDP ============================
def jsonld(s):
    g = [
      {"@type":"Service","name":unesc(s["nm"]["de"]),"url":f"https://estebanmarco.ch/{s['slug']}.html",
       "description":s["desc"],"areaServed":"Kanton Zürich",
       "provider":{"@id":"https://estebanmarco.ch/#business"}},
      {"@type":"BreadcrumbList","itemListElement":[
        {"@type":"ListItem","position":1,"name":"Start","item":"https://estebanmarco.ch/"},
        {"@type":"ListItem","position":2,"name":unesc(s["nm"]["de"]),"item":f"https://estebanmarco.ch/{s['slug']}.html"}]},
      {"@type":"FAQPage","mainEntity":[
        {"@type":"Question","name":unesc(SH[f"acc.q{i}"][0]),"acceptedAnswer":{"@type":"Answer","text":unesc(s[f"a{i}"]["de"])}} for i in (1,2,3)]},
    ]
    return json.dumps({"@context":"https://schema.org","@graph":g}, ensure_ascii=False)

def others(s):
    out = []
    for o in [x for x in S if x["slug"] != s["slug"]][:4]:
        p = o["slug"].replace("service-","")
        badge = f'\n      <span class="badge" data-i="{o["badge"]}">{de(o["badge"])}</span>' if o["badge"] else ""
        out.append(f'''  <a class="card" href="{o['slug']}.html">
    <div class="cmedia">
      <img src="{o['card']}" alt="{unesc(o['nm']['de'])}" loading="lazy">{badge}
      <span class="fav">+</span>
    </div>
    <div class="cinfo"><span class="nm" data-i="{p}.nm">{o['nm']['de']}</span><span class="pr" data-i="{p}.pr">{o['pr']['de']}</span></div>
  </a>''')
    return "\n".join(out)

def build_pdp(s):
    p = s["slug"].replace("service-","")
    badge = f'<span class="badge" data-i="{s["badge"]}">{de(s["badge"])}</span>' if s["badge"] else ""
    mods = "".join(f'<span data-i="{p}.c{i}">{m["de"]}</span>' for i,m in enumerate(s["mods"],1))
    demos = ""
    if s["demos"]:
        demos = f'''
      <div class="pdp-sec" data-r>
        <span class="label" data-i="pdp.demos">{de("pdp.demos")}</span>
        <div class="pdp-cta" style="margin-top:0">
          <a class="pill line" href="01_beleg-scanner.html">Beleg-Scanner</a>
          <a class="pill line" href="02_konto-abgleich.html">Konto-Abgleich</a>
          <a class="pill line" href="03_treuhand-assistent.html">Assistent</a>
        </div>
      </div>'''
    accs = "\n".join(f'''    <div class="acc-it">
      <button class="acc-q" type="button"><span data-i="acc.q{i}">{de(f"acc.q{i}")}</span><span class="pl">+</span></button>
      <div class="acc-a"><p data-i="{p}.a{i}">{s[f"a{i}"]["de"]}</p></div>
    </div>''' for i in (1,2,3))
    return f'''<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{s["title"]}</title>
<meta name="description" content="{s["desc"]}">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
{HEAD_FONTS}
<link rel="canonical" href="https://estebanmarco.ch/{s["slug"]}.html">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_CH">
<meta property="og:site_name" content="Esteban Marco">
<meta property="og:title" content="{s["title"]}">
<meta property="og:description" content="{s["desc"]}">
<meta property="og:url" content="https://estebanmarco.ch/{s["slug"]}.html">
<meta property="og:image" content="https://estebanmarco.ch/{s["card"]}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">
{jsonld(s)}
</script>
<link rel="stylesheet" href="nude.css?v=9">
<script>document.documentElement.className+=' js';</script>
</head>
<body>

{header(False)}

<!-- PDP -->
<section class="pdp">
  <div class="pdp-media">
    <div class="m">
      <img src="{s["card"]}" alt="{s["alt"]}" fetchpriority="high">
      <div class="tag">{badge}</div>
    </div>
    <div class="m">
      <img src="{s["pdp2"]}" alt="{unesc(s["nm"]["de"])} — Esteban Marco, Zürich" loading="lazy">
    </div>
  </div>
  <div class="pdp-info">
    <div class="pdp-in">
      <div class="pdp-crumb" data-r><a href="index.html" data-i="pdp.start">{de("pdp.start")}</a><span>/</span><a href="index.html#leistungen" data-i="nav.lei">{de("nav.lei")}</a><span>/</span><span data-i="{p}.crumb">{s["crumb"]["de"]}</span></div>
      <h1 data-r data-i="{p}.h1">{s["h1"]["de"]}</h1>
      <div class="pdp-price" data-r><span data-i="{p}.pr">{s["pr"]["de"]}</span><small data-i="{p}.prnote">{s["prnote"]["de"]}</small></div>
      <p class="pdp-lede" data-r data-i="{p}.lede">{s["lede"]["de"]}</p>
      <div class="pdp-sec" data-r>
        <span class="label" data-i="{p}.modeye">{s["modeye"]["de"]}</span>
        <div class="mods">{mods}</div>
      </div>
      <div class="pdp-cta" data-r>
        <a class="pill solid" href="index.html#kontakt" data-i="pdp.book">{de("pdp.book")}</a>
        <a class="pill line" href="tel:+41767421548">+41 76 742 15 48</a>
      </div>{demos}
      <div class="acc" data-r>
    <div class="acc-it">
      <button class="acc-q" type="button"><span data-i="pdp.approach">{de("pdp.approach")}</span><span class="pl">+</span></button>
      <div class="acc-a"><p data-i="{p}.p1">{s["p1"]["de"]}</p><p style="padding-top:0" data-i="{p}.p2">{s["p2"]["de"]}</p></div>
    </div>
{accs}
      </div>
    </div>
  </div>
</section>

<!-- Quote band -->
<section class="qband">
  <div class="veil"></div>
  <div class="qin">
    <p class="q" data-i="{p}.q">{s["q"]["de"]}</p>
    <p class="qby" data-r data-i="{p}.qby">{s["qby"]["de"]}</p>
  </div>
</section>

<!-- Weitere Leistungen -->
<div class="shead">
  <h2 data-i="pdp.more">{de("pdp.more")}</h2>
  <a class="more" href="index.html#leistungen" data-i="pdp.all">{de("pdp.all")}</a>
</div>
<div class="grid">
{others(s)}
</div>

{footer()}
</body>
</html>
'''

# ============================ ESCRITURA ============================
i18n = build_i18n()
with io.open(os.path.join(OUT,"nude-i18n.js"),"w",encoding="utf-8") as f:
    f.write("window.I18N=" + json.dumps(i18n, ensure_ascii=False) + ";\n")
print("wrote nude-i18n.js  (%d claves EN, %d FR)" % (len(i18n["en"]), len(i18n["fr"])))

with io.open(os.path.join(OUT,"index.html"),"w",encoding="utf-8") as f:
    f.write(build_index())
print("wrote index.html")

for s in S:
    with io.open(os.path.join(OUT, s["slug"]+".html"),"w",encoding="utf-8") as f:
        f.write(build_pdp(s))
    print("wrote", s["slug"]+".html")
