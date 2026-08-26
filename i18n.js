/* =====================================================================
   ESTEBAN MARCO — i18n DE / EN / FR
   data-i="key" → innerHTML from the dictionary. DE is the source of
   truth (matches the live site); EN/FR are working translations for
   Esteban to review before go-live.
   ===================================================================== */
(function () {
  'use strict';

  var D = {
  /* ---------------- DEUTSCH ---------------- */
  de: {
    "nav.lei":"Leistungen","nav.priv":"On-Premise","nav.abl":"Ablauf","nav.cta":"Gespräch",
    "hero.lbl":"KI · SEO · Software · Zürich","hero.h1":"Weniger Routine.","hero.h2":"Mehr Kunden.","hero.scroll":"Scrollen Sie",
    "man.eye":"Der Ansatz","man.a":"Digitalisierung aus","man.b":"<em>einer Hand.</em>",
    "man.lede":"Für KMU und Treuhänder in Zürich: private KI auf Ihrem eigenen Server, Sichtbarkeit bei Google und Software nach Mass. Ein Ansprechpartner, der baut — kein Beratungsprojekt, das Folien liefert.",
    "man.f1":"weniger manuelle Belegerfassung","man.f2n":"~4 Sek.","man.f2":"pro Beleg statt Minuten","man.f3":"Daten auf Ihrem Server, mit AVV",
    "rail.more":"Zur Lösung →","rail.demo":"Live-Demo öffnen ↗","rail.prog":"Leistungen",
    "s1.pain":"«Man findet uns bei Google nicht.»","s1.t":"Sichtbarkeit<br>&amp; SEO",
    "s1.body":"Lokale Sichtbarkeit in Google und Maps — optimiert auf Anfragen statt Reichweite. Inklusive KI-SEO: empfohlen von ChatGPT &amp; Gemini. Ab CHF 690 / Monat.",
    "s2.pain":"«Mein Team versinkt in Routinearbeit.»","s2.t":"KI-<br>Automatisierung",
    "s2.body":"Die Treuhand-Suite: Belege erfassen, Konten abgleichen, Dossiers befragen — in Sekunden statt Stunden. Pilot zum Festpreis.",
    "s3.pain":"«Unsere Daten dürfen das Haus nicht verlassen.»","s3.t":"Private KI<br>· lokal",
    "s3.body":"Ihr eigenes Sprachmodell, installiert auf Ihrer Hardware. Fragen an Ihre Dokumente, ohne Cloud, ohne Abo, ohne Datenabfluss.",
    "s4.pain":"«Wir verlieren den Überblick über unsere Kunden.»","s4.t":"CRM<br>nach Mass",
    "s4.body":"Kundenverwaltung, die zu Ihrem Ablauf passt: Pipeline, Fristen, E-Mail und Rechnung an einem Ort — on-premise oder in der Schweizer Cloud. Ihre Daten, Ihr Code, Festpreis statt Abo.",
    "s5.pain":"«Uns fehlt ein Werkzeug, das es nicht gibt.»","s5.t":"Software<br>nach Mass",
    "s5.body":"Individuelle Tools und Web-Apps für Ihren Prozess — verbinden Ihre Systeme, laufen auf Wunsch on-premise. Der Quellcode gehört Ihnen.",
    "priv.eye":"Privatsphäre","priv.h":"Ihre Daten bleiben <em>im Haus.</em>",
    "priv.lede":"Anders als bei Cloud-Anbietern läuft die KI komplett auf Ihrer eigenen Hardware. Ihre Mandantendaten verlassen das Büro nie — kein Datenabfluss, keine Übermittlung ins Ausland, keine Nutzung Ihrer Akten als Trainingsmaterial.",
    "priv.f1t":"On-Premise","priv.f1p":"Die Daten bleiben physisch bei Ihnen, auf Ihrer Box — auch ohne Internet.",
    "priv.f2t":"AVV inklusive","priv.f2p":"Auftragsverarbeitungsvertrag, nDSG-konform, volle Datenhoheit.",
    "priv.f3t":"Massgeschneidert","priv.f3p":"Auf Ihre Abläufe gebaut — kein Standard-Tool, das Sie verbiegen müssen.",
    "abl.eye":"So fangen wir an","abl.h":"Drei Schritte. Kein Pitch.",
    "abl.s1t":"Gespräch · 15 Min.","abl.s1p":"Wir schauen, wo bei Ihnen die meiste Handarbeit anfällt.",
    "abl.s2t":"Pilot · fixer Preis","abl.s2p":"Ich baue eine konkrete Automatisierung. Sie sehen das Ergebnis an Ihren echten Daten.",
    "abl.s3t":"Betrieb &amp; Ausbau","abl.s3p":"Produktiv auf Ihrem Server, integriert in Ihre Buchhaltung.",
    "cta.eye":"Beginnen","cta.h":"Bereit, <em>Zeit</em> zurückzugewinnen?",
    "cta.lede":"15 Minuten genügen, um zu sehen, wo bei Ihnen am meisten Handarbeit anfällt — und ob sich etwas automatisieren lässt. Unverbindlich.",
    "cta.fn":"Ihr Name","cta.fe":"Ihre E-Mail","cta.fm":"Wo drückt es? Kurz reicht.","cta.send":"Nachricht senden",
    "cta.ok":"Danke — Ihre Nachricht ist unterwegs. Ich melde mich innert 24 Stunden.","cta.err":"Senden hat nicht geklappt — schreiben Sie direkt an info@estebanmarco.ch.","cta.b1":"Gespräch vereinbaren",
    "foot.lei":"Leistungen","foot.demos":"Live-Demos","foot.prax":"Praxis","foot.kont":"Kontakt","foot.city":"Zürich, Schweiz",
    "sp.crumb":"← Alle Leistungen","sp.scroll":"Scrollen","sp.weitere":"Weitere Leistungen",
    "seo.num":"Leistung 01","seo.h":"Sichtbarkeit<br>&amp; SEO",
    "seo.lede":"In Zürich sucht Ihr nächster Mandant nicht nach Ihrem Namen — er sucht nach «Treuhänder Zürich». Wer dort nicht auf Seite eins steht, existiert für ihn nicht. Alle Wege sollen zu Ihnen führen.",
    "seo.aeye":"Der Ansatz","seo.ah":"Auf Anfragen optimiert, nicht auf Reichweite.",
    "seo.p1":"Lokale Sichtbarkeit in Google und Google Maps, ein technisches Fundament, das rankt, und Inhalte, die auch KI-Systeme zitieren: Ihre Mandanten fragen längst ChatGPT und Gemini statt Google.",
    "seo.p2":"Der Einstieg ist ein SEO-Audit (CHF 890 einmalig, wird angerechnet). Danach ab CHF 690 / Monat, monatlich kündbar.",
    "seo.q":"Gefunden werden — auch wenn die Suche heute in einem KI-Chat beginnt.","seo.qby":"Sichtbarkeit &amp; SEO · Esteban Marco",
    "seo.c1":"Google Unternehmensprofil","seo.c2":"Maps-Ranking Kanton Zürich","seo.c3":"NAP-Konsistenz &amp; Verzeichnisse","seo.c4":"Bewertungsstrategie","seo.c5":"Core Web Vitals","seo.c6":"Strukturierte Daten","seo.c7":"Interne Verlinkung","seo.c8":"KI-SEO / GEO — ChatGPT &amp; Gemini","seo.c9":"Monitoring &amp; Reporting","seo.ceye":"Module",
    "ki.num":"Leistung 02","ki.h":"KI-<br>Automatisierung",
    "ki.lede":"Jeder von Hand erfasste Beleg ist Zeit qualifizierter Fachkräfte, die nicht verrechnet wird. Der Schreibtisch, der sich selbst ordnet — das ist keine Metapher, das ist das Produkt.",
    "ki.aeye":"Die Suite","ki.ah":"Drei Module. Ein System. Ein Ansprechpartner.",
    "ki.p1":"Der <strong>Beleg-Scanner</strong> erkennt Lieferant, Datum, MwSt und Buchungsvorschlag in ~4 Sekunden. Der <strong>Konto-Abgleich</strong> ordnet jede Bankbewegung zu — nur Zweifelsfälle landen bei Ihnen. Der <strong>Treuhand-Assistent</strong> antwortet mit Quellenangabe.",
    "ki.p2":"Der Einstieg: ein Pilot zum Festpreis, gebaut an Ihren echten Daten. Oder testen Sie die Suite gleich jetzt:",
    "ki.q":"Ihre Daten bleiben im Haus. Kein Abfluss, kein Ausland, kein Training mit Ihren Akten.","ki.qby":"Private KI · On-Premise",
    "ki.c1":"Beleg-Scanner","ki.c2":"Konto-Abgleich","ki.c3":"Treuhand-Assistent","ki.c4":"CAMT.053 / MT940","ki.c5":"Buchungsvorschläge nach Kontenplan","ki.c6":"Mandantentrennung","ki.c7":"Betrieb on-premise","ki.c8":"AVV · nDSG-konform","ki.c9":"Lernt aus Korrekturen","ki.ceye":"Was drinsteckt",
    "ki.d1":"Beleg-Scanner testen","ki.d2":"Konto-Abgleich","ki.d3":"Assistent",
    "ai.num":"Leistung 03","ai.h":"Private KI<br>· lokal",
    "ai.lede":"ChatGPT ist stark — aber Ihre Dossiers gehören nicht in fremde Clouds. Die Alternative: Ihr eigenes Sprachmodell, auf Ihrer Hardware, hinter Ihrer Tür.",
    "ai.aeye":"Der Ansatz","ai.ah":"Ihr eigenes Sprachmodell. Hinter Ihrer Tür.",
    "ai.p1":"Ich installiere ein offenes Sprachmodell auf Ihrer eigenen Box und verbinde es mit Ihren Dokumenten: Fragen in natürlicher Sprache, Antworten mit Quellenangabe — komplett offline möglich.",
    "ai.p2":"Einmal eingerichtet, gehört das System Ihnen: kein Abo pro Nutzer, keine Datenübermittlung, kein Anbieter, der die Regeln ändert.",
    "ai.q":"Die Intelligenz im Haus — nicht im Abo.","ai.qby":"Private KI · lokal",
    "ai.c1":"Lokales Sprachmodell auf Ihrer Box","ai.c2":"Fragen an Ihre Dokumente (RAG)","ai.c3":"Antworten mit Quellenangabe","ai.c4":"Komplett offline möglich","ai.c5":"Kein Abo pro Nutzer","ai.c6":"Mandantentrennung","ai.c7":"AVV · nDSG-konform","ai.c8":"Wartung &amp; Modell-Updates","ai.c9":"Schulung Ihres Teams","ai.ceye":"Was drinsteckt",
    "crm.num":"Leistung 04","crm.h":"CRM<br>nach Mass",
    "crm.lede":"Drei Tabellen, ein Postfach und das Gedächtnis des Chefs sind kein Kundensystem. Ein CRM nach Mass schon — gebaut für Ihren Ablauf, nicht für den eines US-Konzerns.",
    "crm.aeye":"Der Ansatz","crm.ah":"Ihre Kunden. Ihr Ablauf. Ihr System.",
    "crm.p1":"Pipeline, Kontakte, Fristen, E-Mail und Rechnung an einem Ort. Gebaut auf Ihre Begriffe und Ihre Schritte — nicht ein Standard-CRM, das Sie verbiegen müssen.",
    "crm.p2":"Auf Wunsch mit KI: Anfragen werden automatisch erfasst, zugeordnet und mit einem Antwortvorschlag versehen. Festpreis statt Abo pro Sitzplatz.",
    "crm.q":"Kein Kunde vergessen, keine Frist verpasst — ohne ein Abo pro Kopf.","crm.qby":"CRM nach Mass · Esteban Marco",
    "crm.c1":"Pipeline &amp; Verkaufsphasen","crm.c2":"Kontakte &amp; Firmenakten","crm.c3":"Fristen &amp; Wiedervorlagen","crm.c4":"E-Mail-Anbindung","crm.c5":"Offerten, Rechnungen &amp; Buchhaltung","crm.c6":"KI-Antwortvorschläge","crm.c7":"Auswertungen &amp; Reports","crm.c8":"Import aus Excel/Outlook","crm.c9":"Betrieb on-premise oder CH-Cloud","crm.ceye":"Was drinsteckt",
    "sw.num":"Leistung 05","sw.h":"Software<br>nach Mass",
    "sw.lede":"Irgendwann passt keine Standardsoftware mehr: der Prozess ist zu speziell, drei Systeme sprechen nicht miteinander. Dann baut man das Werkzeug selbst.",
    "sw.aeye":"Der Ansatz","sw.ah":"Zuerst der Plan. Dann Blöcke, die laufen.",
    "sw.p1":"Bevor Code entsteht, steht das Zielbild: Prozessaufnahme vor Ort, Datenmodell schriftlich. Gebaut wird in kleinen, nutzbaren Blöcken — nach jedem Block läuft etwas.",
    "sw.p2":"Festpreis pro Phase, Ausstieg jederzeit. Übergabe heisst Übergabe: Quellcode und Dokumentation gehören Ihnen.",
    "sw.q":"Übergabe heisst wirklich Übergabe — Quellcode und Dokumentation gehören Ihnen.","sw.qby":"Software nach Mass · Esteban Marco",
    "sw.c1":"Interne Web-Apps","sw.c2":"Kundenportale","sw.c3":"Dashboards &amp; Daten-Werkzeuge","sw.c4":"Buchungs- &amp; Terminsysteme","sw.c5":"Automatisierte Abläufe","sw.c6":"Schnittstellen zu Ihren Systemen","sw.c7":"Microsoft 365 / Google Workspace","sw.c8":"REST &amp; Webhooks","sw.c9":"On-Premise oder CH-Hosting","sw.ceye":"Was gebaut wird"
    ,"acc.h":"Was bedeutet das für Sie?","acc.q1":"Was macht dieser Service genau?","acc.q2":"Für wen ist er gedacht?","acc.q3":"Was bringt er Ihnen konkret?",
    "seo.a1":"Ich sorge dafür, dass Ihr Betrieb bei Google, in Google Maps und in KI-Antworten (ChatGPT, Gemini) erscheint, wenn jemand in Zürich nach Ihrer Leistung sucht — nicht nach Ihrem Namen.",
    "seo.a2":"Für Firmen, die Anfragen verlieren, weil die Konkurrenz weiter oben steht — oder in KI-Antworten gar nicht erst vorkommen.",
    "seo.a3":"Mehr qualifizierte Anfragen aus Ihrer Region, monatlich messbar im Report — ohne Werbebudget zu verbrennen.",
    "ki.a1":"Eine private KI-Suite auf Ihrem Server: Belege erfassen, Bank abgleichen, Dossiers befragen — automatisch statt von Hand.",
    "ki.a2":"Für Treuhänder und KMU, deren Fachkräfte Stunden mit Abtippen, Suchen und Abgleichen verlieren.",
    "ki.a3":"Bis zu 80% weniger Handarbeit: rund 4 Sekunden pro Beleg, Abschlüsse ohne Nachtschichten — und alles bleibt im Haus.",
    "ai.a1":"Ich installiere ein eigenes Sprachmodell (wie ChatGPT, aber privat) auf Ihrer Hardware und verbinde es mit Ihren Dokumenten.",
    "ai.a2":"Für alle, die KI nutzen wollen, deren Daten aber vertraulich sind: Mandate, Verträge, Personal- oder Patientenakten.",
    "ai.a3":"KI-Antworten mit Quellenangabe aus Ihren eigenen Akten — ohne Abo pro Kopf, und kein Byte verlässt das Haus.",
    "crm.a1":"Ein Kundensystem, gebaut auf Ihren Ablauf: Kontakte, Pipeline, Fristen, E-Mail und Rechnung an einem Ort.",
    "crm.a2":"Für Teams, die Kunden in Excel, Outlook und im Kopf verwalten — und dabei Anfragen und Fristen verlieren.",
    "crm.a3":"Nichts fällt mehr durch: jede Anfrage erfasst, jede Frist gemeldet. Festpreis statt Abo pro Sitzplatz.",
    "sw.a1":"Ich baue das Werkzeug, das es für Ihren Prozess nicht zu kaufen gibt — als Web-App, Portal oder Schnittstelle.",
    "sw.a2":"Für Firmen, deren Abläufe in zu gross gewordenen Excel-Dateien leben oder deren Systeme nicht miteinander sprechen.",
    "sw.a3":"Ein Werkzeug, das exakt passt, in Etappen geliefert — und am Ende gehört der Quellcode Ihnen."
  },
  /* ---------------- ENGLISH ---------------- */
  en: {
    "nav.lei":"Services","nav.priv":"On-premise","nav.abl":"Process","nav.cta":"Let's talk",
    "hero.lbl":"AI · SEO · Software · Zurich","hero.h1":"Less routine.","hero.h2":"More clients.","hero.scroll":"Scroll",
    "man.eye":"The approach","man.a":"Digitalisation from","man.b":"<em>one hand.</em>",
    "man.lede":"For SMEs and fiduciaries in Zurich: private AI on your own server, visibility on Google, and software built to measure. One partner who builds — not a consulting project that delivers slides.",
    "man.f1":"less manual document entry","man.f2n":"~4 sec.","man.f2":"per receipt instead of minutes","man.f3":"data on your server, with DPA",
    "rail.more":"See the solution →","rail.demo":"Open live demo ↗","rail.prog":"Services",
    "s1.pain":"“Nobody finds us on Google.”","s1.t":"Visibility<br>&amp; SEO",
    "s1.body":"Local visibility on Google and Maps — optimised for enquiries, not reach. Including AI-SEO: recommended by ChatGPT &amp; Gemini. From CHF 690 / month.",
    "s2.pain":"“My team is drowning in routine work.”","s2.t":"AI<br>automation",
    "s2.body":"The fiduciary suite: capture receipts, reconcile accounts, query your files — in seconds instead of hours. Fixed-price pilot.",
    "s3.pain":"“Our data must never leave the building.”","s3.t":"Private AI<br>· local",
    "s3.body":"Your own language model, installed on your hardware. Ask questions of your documents — no cloud, no subscription, no data leaving the house.",
    "s4.pain":"“We're losing track of our clients.”","s4.t":"CRM<br>built to measure",
    "s4.body":"Client management that fits your process: pipeline, deadlines, e-mail and invoicing in one place — on-premise or in a Swiss cloud. Your data, your code, a fixed price instead of a subscription.",
    "s5.pain":"“We lack a tool that doesn't exist.”","s5.t":"Software<br>built to measure",
    "s5.body":"Custom tools and web apps for your process — they connect your systems and run on-premise if you wish. You own the source code.",
    "priv.eye":"Privacy","priv.h":"Your data stays <em>in the house.</em>",
    "priv.lede":"Unlike cloud providers, the AI runs entirely on your own hardware. Your client data never leaves the office — no outflow, no transfer abroad, no use of your files as training material.",
    "priv.f1t":"On-premise","priv.f1p":"Data stays physically with you, on your box — even without internet.",
    "priv.f2t":"DPA included","priv.f2p":"Data processing agreement, Swiss nDSG-compliant, full data sovereignty.",
    "priv.f3t":"Built to measure","priv.f3p":"Built around your workflows — no standard tool you have to bend.",
    "abl.eye":"How we start","abl.h":"Three steps. No pitch.",
    "abl.s1t":"Call · 15 min.","abl.s1p":"We look at where most manual work piles up for you.",
    "abl.s2t":"Pilot · fixed price","abl.s2p":"I build one concrete automation. You see the result on your real data.",
    "abl.s3t":"Operation &amp; growth","abl.s3p":"In production on your server, integrated with your accounting.",
    "cta.eye":"Begin","cta.h":"Ready to win back your <em>time</em>?",
    "cta.lede":"15 minutes are enough to see where most manual work piles up — and whether it can be automated. No strings attached.",
    "cta.fn":"Your name","cta.fe":"Your e-mail","cta.fm":"What hurts? A few words are enough.","cta.send":"Send message",
    "cta.ok":"Thank you — your message is on its way. I'll get back to you within 24 hours.","cta.err":"Sending failed — please write directly to info@estebanmarco.ch.","cta.b1":"Book a call",
    "foot.lei":"Services","foot.demos":"Live demos","foot.prax":"Practice","foot.kont":"Contact","foot.city":"Zurich, Switzerland",
    "sp.crumb":"← All services","sp.scroll":"Scroll","sp.weitere":"More services",
    "seo.num":"Service 01","seo.h":"Visibility<br>&amp; SEO",
    "seo.lede":"In Zurich, your next client doesn't search for your name — they search for “fiduciary Zurich”. If you're not on page one, you don't exist for them. Every path should lead to you.",
    "seo.aeye":"The approach","seo.ah":"Optimised for enquiries, not for reach.",
    "seo.p1":"Local visibility on Google and Maps, a technical foundation that ranks, and content that AI systems cite: your clients already ask ChatGPT and Gemini instead of Google.",
    "seo.p2":"The entry point is an SEO audit (CHF 890 one-off, credited later). Then from CHF 690 / month, cancellable monthly.",
    "seo.q":"Be found — even when the search starts in an AI chat.","seo.qby":"Visibility &amp; SEO · Esteban Marco",
    "seo.c1":"Google Business Profile","seo.c2":"Maps ranking, canton of Zurich","seo.c3":"NAP consistency &amp; directories","seo.c4":"Review strategy","seo.c5":"Core Web Vitals","seo.c6":"Structured data","seo.c7":"Internal linking","seo.c8":"AI-SEO / GEO — ChatGPT &amp; Gemini","seo.c9":"Monitoring &amp; reporting","seo.ceye":"Modules",
    "ki.num":"Service 02","ki.h":"AI<br>automation",
    "ki.lede":"Every receipt typed by hand is time of qualified staff that is never billed. The desk that tidies itself — that's not a metaphor, that's the product.",
    "ki.aeye":"The suite","ki.ah":"Three modules. One system. One partner.",
    "ki.p1":"The <strong>receipt scanner</strong> reads supplier, date, VAT and booking proposal in ~4 seconds. The <strong>bank reconciliation</strong> matches every movement — only real doubts reach you. The <strong>fiduciary assistant</strong> answers with sources.",
    "ki.p2":"The entry point: a fixed-price pilot, built on your real data. Or try the suite right now:",
    "ki.q":"Your data stays in the house. No outflow, no abroad, no training on your files.","ki.qby":"Private AI · on-premise",
    "ki.c1":"Receipt scanner","ki.c2":"Bank reconciliation","ki.c3":"Fiduciary assistant","ki.c4":"CAMT.053 / MT940","ki.c5":"Booking proposals per your chart","ki.c6":"Client separation","ki.c7":"Runs on-premise","ki.c8":"DPA · nDSG-compliant","ki.c9":"Learns from corrections","ki.ceye":"What's inside",
    "ki.d1":"Try the receipt scanner","ki.d2":"Reconciliation","ki.d3":"Assistant",
    "ai.num":"Service 03","ai.h":"Private AI<br>· local",
    "ai.lede":"ChatGPT is powerful — but your files don't belong in someone else's cloud. The alternative: your own language model, on your hardware, behind your door.",
    "ai.aeye":"The approach","ai.ah":"Your own language model. Behind your door.",
    "ai.p1":"I install an open language model on your own box and connect it to your documents: questions in natural language, answers with sources — fully offline if you wish.",
    "ai.p2":"Once set up, the system is yours: no per-seat subscription, no data transfer, no vendor changing the rules.",
    "ai.q":"Intelligence in the house — not in a subscription.","ai.qby":"Private AI · local",
    "ai.c1":"Local language model on your box","ai.c2":"Ask your documents (RAG)","ai.c3":"Answers with sources","ai.c4":"Fully offline possible","ai.c5":"No per-seat subscription","ai.c6":"Client separation","ai.c7":"DPA · nDSG-compliant","ai.c8":"Maintenance &amp; model updates","ai.c9":"Team training","ai.ceye":"What's inside",
    "crm.num":"Service 04","crm.h":"CRM<br>built to measure",
    "crm.lede":"Three spreadsheets, an inbox and the boss's memory are not a client system. A CRM built to measure is — made for your process, not a US corporation's.",
    "crm.aeye":"The approach","crm.ah":"Your clients. Your process. Your system.",
    "crm.p1":"Pipeline, contacts, deadlines, e-mail and invoicing in one place. Built on your terms and your steps — not a standard CRM you have to bend.",
    "crm.p2":"With AI if you wish: enquiries are captured, assigned and given a draft reply automatically. Fixed price instead of per-seat subscription.",
    "crm.q":"No client forgotten, no deadline missed — without a per-seat subscription.","crm.qby":"CRM built to measure · Esteban Marco",
    "crm.c1":"Pipeline &amp; sales stages","crm.c2":"Contacts &amp; company files","crm.c3":"Deadlines &amp; follow-ups","crm.c4":"E-mail integration","crm.c5":"Quotes, invoices &amp; accounting","crm.c6":"AI reply drafts","crm.c7":"Insights &amp; reports","crm.c8":"Import from Excel/Outlook","crm.c9":"On-premise or Swiss cloud","crm.ceye":"What's inside",
    "sw.num":"Service 05","sw.h":"Software<br>built to measure",
    "sw.lede":"At some point no standard software fits: the process is too specific, three systems don't talk to each other. Then you build the tool yourself.",
    "sw.aeye":"The approach","sw.ah":"First the plan. Then blocks that run.",
    "sw.p1":"Before any code, the target picture: process mapping on site, data model in writing. Built in small usable blocks — after each block, something runs.",
    "sw.p2":"Fixed price per phase, exit any time. Handover means handover: source code and documentation are yours.",
    "sw.q":"Handover really means handover — source code and documentation are yours.","sw.qby":"Software built to measure · Esteban Marco",
    "sw.c1":"Internal web apps","sw.c2":"Client portals","sw.c3":"Dashboards &amp; data tools","sw.c4":"Booking &amp; scheduling systems","sw.c5":"Automated workflows","sw.c6":"Integrations with your systems","sw.c7":"Microsoft 365 / Google Workspace","sw.c8":"REST &amp; webhooks","sw.c9":"On-premise or Swiss hosting","sw.ceye":"What gets built"
    ,"acc.h":"What does this mean for you?","acc.q1":"What exactly does this service do?","acc.q2":"Who is it for?","acc.q3":"What do you get out of it?",
    "seo.a1":"I make sure your business shows up on Google, Google Maps and in AI answers (ChatGPT, Gemini) when someone in Zurich searches for what you do — not for your name.",
    "seo.a2":"For companies losing enquiries because competitors rank higher — or because AI answers never mention them at all.",
    "seo.a3":"More qualified enquiries from your region, measured in a monthly report — without burning an ad budget.",
    "ki.a1":"A private AI suite on your server: capturing receipts, reconciling bank statements, querying client files — automatically instead of by hand.",
    "ki.a2":"For fiduciaries and SMEs whose skilled staff lose hours to typing, searching and reconciling.",
    "ki.a3":"Up to 80% less manual work: about 4 seconds per receipt, closings without night shifts — and everything stays in-house.",
    "ai.a1":"I install your own language model (like ChatGPT, but private) on your hardware and connect it to your documents.",
    "ai.a2":"For anyone who wants to use AI but whose data is confidential: mandates, contracts, HR or patient files.",
    "ai.a3":"AI answers with sources from your own files — no per-seat subscription, and not a single byte leaves the building.",
    "crm.a1":"A client system built around your workflow: contacts, pipeline, deadlines, e-mail and invoicing in one place.",
    "crm.a2":"For teams managing clients in Excel, Outlook and memory — losing enquiries and deadlines along the way.",
    "crm.a3":"Nothing slips through anymore: every enquiry captured, every deadline flagged. Fixed price instead of per-seat fees.",
    "sw.a1":"I build the tool your process needs but no one sells — as a web app, portal or integration.",
    "sw.a2":"For companies whose workflows live in overgrown spreadsheets, or whose systems refuse to talk to each other.",
    "sw.a3":"A tool that fits exactly, delivered in stages — and in the end, the source code is yours."
  },
  /* ---------------- FRANÇAIS ---------------- */
  fr: {
    "nav.lei":"Prestations","nav.priv":"On-premise","nav.abl":"Déroulement","nav.cta":"Entretien",
    "hero.lbl":"IA · SEO · Logiciel · Zurich","hero.h1":"Moins de routine.","hero.h2":"Plus de clients.","hero.scroll":"Faites défiler",
    "man.eye":"L'approche","man.a":"La digitalisation d'","man.b":"<em>une seule main.</em>",
    "man.lede":"Pour PME et fiduciaires à Zurich : IA privée sur votre propre serveur, visibilité sur Google et logiciel sur mesure. Un seul interlocuteur qui construit — pas un projet de conseil qui livre des slides.",
    "man.f1":"de saisie manuelle en moins","man.f2n":"~4 sec.","man.f2":"par justificatif au lieu de minutes","man.f3":"données sur votre serveur, avec contrat",
    "rail.more":"Voir la solution →","rail.demo":"Ouvrir la démo ↗","rail.prog":"Prestations",
    "s1.pain":"« On ne nous trouve pas sur Google. »","s1.t":"Visibilité<br>&amp; SEO",
    "s1.body":"Visibilité locale sur Google et Maps — optimisée pour les demandes, pas la portée. Y compris SEO-IA : recommandé par ChatGPT &amp; Gemini. Dès CHF 690 / mois.",
    "s2.pain":"« Mon équipe croule sous la routine. »","s2.t":"Automatisation<br>par IA",
    "s2.body":"La suite fiduciaire : saisir les justificatifs, rapprocher les comptes, interroger vos dossiers — en secondes au lieu d'heures. Pilote à prix fixe.",
    "s3.pain":"« Nos données ne doivent jamais sortir de la maison. »","s3.t":"IA privée<br>· locale",
    "s3.body":"Votre propre modèle de langage, installé sur votre matériel. Interrogez vos documents — sans cloud, sans abonnement, sans fuite de données.",
    "s4.pain":"« Nous perdons la vue d'ensemble de nos clients. »","s4.t":"CRM<br>sur mesure",
    "s4.body":"Une gestion clients qui épouse votre processus : pipeline, échéances, e-mail et facturation au même endroit — on-premise ou dans un cloud suisse. Vos données, votre code, prix fixe au lieu d'un abonnement.",
    "s5.pain":"« Il nous manque un outil qui n'existe pas. »","s5.t":"Logiciel<br>sur mesure",
    "s5.body":"Outils et applications web sur mesure pour votre processus — ils relient vos systèmes et tournent on-premise si vous le souhaitez. Le code source vous appartient.",
    "priv.eye":"Confidentialité","priv.h":"Vos données restent <em>chez vous.</em>",
    "priv.lede":"Contrairement aux fournisseurs cloud, l'IA tourne entièrement sur votre propre matériel. Les données de vos clients ne quittent jamais le bureau — aucune fuite, aucun transfert à l'étranger, aucun entraînement sur vos dossiers.",
    "priv.f1t":"On-premise","priv.f1p":"Les données restent physiquement chez vous, sur votre machine — même sans internet.",
    "priv.f2t":"Contrat inclus","priv.f2p":"Contrat de sous-traitance, conforme nLPD, pleine souveraineté des données.",
    "priv.f3t":"Sur mesure","priv.f3p":"Construit autour de vos processus — pas un outil standard à tordre.",
    "abl.eye":"Comment nous commençons","abl.h":"Trois étapes. Pas de pitch.",
    "abl.s1t":"Entretien · 15 min.","abl.s1p":"Nous regardons où s'accumule le plus de travail manuel chez vous.",
    "abl.s2t":"Pilote · prix fixe","abl.s2p":"Je construis une automatisation concrète. Vous voyez le résultat sur vos vraies données.",
    "abl.s3t":"Exploitation &amp; extension","abl.s3p":"En production sur votre serveur, intégré à votre comptabilité.",
    "cta.eye":"Commencer","cta.h":"Prêt à regagner du <em>temps</em> ?",
    "cta.lede":"15 minutes suffisent pour voir où s'accumule le travail manuel — et si cela peut s'automatiser. Sans engagement.",
    "cta.fn":"Votre nom","cta.fe":"Votre e-mail","cta.fm":"Où ça coince ? Quelques mots suffisent.","cta.send":"Envoyer le message",
    "cta.ok":"Merci — votre message est en route. Je vous réponds sous 24 heures.","cta.err":"L'envoi a échoué — écrivez directement à info@estebanmarco.ch.","cta.b1":"Convenir d'un entretien",
    "foot.lei":"Prestations","foot.demos":"Démos live","foot.prax":"Pratique","foot.kont":"Contact","foot.city":"Zurich, Suisse",
    "sp.crumb":"← Toutes les prestations","sp.scroll":"Défiler","sp.weitere":"Autres prestations",
    "seo.num":"Prestation 01","seo.h":"Visibilité<br>&amp; SEO",
    "seo.lede":"À Zurich, votre prochain client ne cherche pas votre nom — il cherche « fiduciaire Zurich ». Qui n'est pas en première page n'existe pas pour lui. Tous les chemins doivent mener à vous.",
    "seo.aeye":"L'approche","seo.ah":"Optimisé pour les demandes, pas pour la portée.",
    "seo.p1":"Visibilité locale sur Google et Maps, un socle technique qui se positionne, et des contenus que les IA citent : vos clients interrogent déjà ChatGPT et Gemini au lieu de Google.",
    "seo.p2":"Le point d'entrée est un audit SEO (CHF 890 unique, déduit ensuite). Puis dès CHF 690 / mois, résiliable mensuellement.",
    "seo.q":"Être trouvé — même quand la recherche commence dans un chat IA.","seo.qby":"Visibilité &amp; SEO · Esteban Marco",
    "seo.c1":"Profil d'établissement Google","seo.c2":"Classement Maps, canton de Zurich","seo.c3":"Cohérence NAP &amp; annuaires","seo.c4":"Stratégie d'avis","seo.c5":"Core Web Vitals","seo.c6":"Données structurées","seo.c7":"Maillage interne","seo.c8":"SEO-IA / GEO — ChatGPT &amp; Gemini","seo.c9":"Suivi &amp; reporting","seo.ceye":"Modules",
    "ki.num":"Prestation 02","ki.h":"Automatisation<br>par IA",
    "ki.lede":"Chaque justificatif saisi à la main est du temps qualifié jamais facturé. Le bureau qui se range tout seul — ce n'est pas une métaphore, c'est le produit.",
    "ki.aeye":"La suite","ki.ah":"Trois modules. Un système. Un interlocuteur.",
    "ki.p1":"Le <strong>scanner de justificatifs</strong> lit fournisseur, date, TVA et proposition d'écriture en ~4 secondes. Le <strong>rapprochement bancaire</strong> associe chaque mouvement — seuls les vrais doutes vous parviennent. L'<strong>assistant fiduciaire</strong> répond avec ses sources.",
    "ki.p2":"Le point d'entrée : un pilote à prix fixe, construit sur vos vraies données. Ou testez la suite dès maintenant :",
    "ki.q":"Vos données restent chez vous. Aucune fuite, aucun étranger, aucun entraînement sur vos dossiers.","ki.qby":"IA privée · on-premise",
    "ki.c1":"Scanner de justificatifs","ki.c2":"Rapprochement bancaire","ki.c3":"Assistant fiduciaire","ki.c4":"CAMT.053 / MT940","ki.c5":"Écritures selon votre plan comptable","ki.c6":"Séparation des mandats","ki.c7":"Fonctionne on-premise","ki.c8":"Contrat · conforme nLPD","ki.c9":"Apprend de vos corrections","ki.ceye":"Ce qu'il y a dedans",
    "ki.d1":"Tester le scanner","ki.d2":"Rapprochement","ki.d3":"Assistant",
    "ai.num":"Prestation 03","ai.h":"IA privée<br>· locale",
    "ai.lede":"ChatGPT est puissant — mais vos dossiers n'ont rien à faire dans le cloud d'un tiers. L'alternative : votre propre modèle de langage, sur votre matériel, derrière votre porte.",
    "ai.aeye":"L'approche","ai.ah":"Votre propre modèle de langage. Derrière votre porte.",
    "ai.p1":"J'installe un modèle de langage ouvert sur votre propre machine et je le relie à vos documents : questions en langage naturel, réponses avec sources — entièrement hors ligne si vous voulez.",
    "ai.p2":"Une fois installé, le système est à vous : pas d'abonnement par poste, pas de transfert de données, pas de fournisseur qui change les règles.",
    "ai.q":"L'intelligence dans la maison — pas dans un abonnement.","ai.qby":"IA privée · locale",
    "ai.c1":"Modèle de langage local","ai.c2":"Interroger vos documents (RAG)","ai.c3":"Réponses avec sources","ai.c4":"Entièrement hors ligne possible","ai.c5":"Pas d'abonnement par poste","ai.c6":"Séparation des mandats","ai.c7":"Contrat · conforme nLPD","ai.c8":"Maintenance &amp; mises à jour","ai.c9":"Formation de votre équipe","ai.ceye":"Ce qu'il y a dedans",
    "crm.num":"Prestation 04","crm.h":"CRM<br>sur mesure",
    "crm.lede":"Trois tableaux, une boîte mail et la mémoire du chef ne font pas un système client. Un CRM sur mesure, si — fait pour votre processus, pas celui d'un groupe américain.",
    "crm.aeye":"L'approche","crm.ah":"Vos clients. Votre processus. Votre système.",
    "crm.p1":"Pipeline, contacts, échéances, e-mail et facturation au même endroit. Construit sur vos termes et vos étapes — pas un CRM standard à tordre.",
    "crm.p2":"Avec IA si vous voulez : les demandes sont saisies, attribuées et dotées d'un brouillon de réponse automatiquement. Prix fixe au lieu d'un abonnement par poste.",
    "crm.q":"Aucun client oublié, aucune échéance manquée — sans abonnement par tête.","crm.qby":"CRM sur mesure · Esteban Marco",
    "crm.c1":"Pipeline &amp; phases de vente","crm.c2":"Contacts &amp; dossiers","crm.c3":"Échéances &amp; relances","crm.c4":"Intégration e-mail","crm.c5":"Offres, factures &amp; comptabilité","crm.c6":"Brouillons de réponse IA","crm.c7":"Analyses &amp; rapports","crm.c8":"Import Excel/Outlook","crm.c9":"On-premise ou cloud suisse","crm.ceye":"Ce qu'il y a dedans",
    "sw.num":"Prestation 05","sw.h":"Logiciel<br>sur mesure",
    "sw.lede":"Un jour, aucun logiciel standard ne convient plus : le processus est trop spécifique, trois systèmes ne se parlent pas. Alors on construit l'outil soi-même.",
    "sw.aeye":"L'approche","sw.ah":"D'abord le plan. Puis des blocs qui tournent.",
    "sw.p1":"Avant toute ligne de code, la cible : relevé de processus sur place, modèle de données par écrit. Construit en petits blocs utilisables — après chaque bloc, quelque chose tourne.",
    "sw.p2":"Prix fixe par phase, sortie possible à chaque étape. La remise est une vraie remise : code source et documentation vous appartiennent.",
    "sw.q":"La remise est une vraie remise — code source et documentation vous appartiennent.","sw.qby":"Logiciel sur mesure · Esteban Marco",
    "sw.c1":"Applications web internes","sw.c2":"Portails clients","sw.c3":"Dashboards &amp; outils de données","sw.c4":"Systèmes de réservation","sw.c5":"Processus automatisés","sw.c6":"Interfaces avec vos systèmes","sw.c7":"Microsoft 365 / Google Workspace","sw.c8":"REST &amp; webhooks","sw.c9":"On-premise ou hébergement suisse","sw.ceye":"Ce qui est construit"
    ,"acc.h":"Qu'est-ce que cela signifie pour vous ?","acc.q1":"Que fait ce service exactement ?","acc.q2":"À qui s'adresse-t-il ?","acc.q3":"Qu'est-ce que cela vous apporte concrètement ?",
    "seo.a1":"Je fais en sorte que votre entreprise apparaisse sur Google, Google Maps et dans les réponses des IA (ChatGPT, Gemini) quand quelqu'un à Zurich cherche votre prestation — pas votre nom.",
    "seo.a2":"Pour les entreprises qui perdent des demandes parce que la concurrence est mieux classée — ou qui n'apparaissent jamais dans les réponses des IA.",
    "seo.a3":"Plus de demandes qualifiées de votre région, mesurées chaque mois dans un rapport — sans brûler de budget publicitaire.",
    "ki.a1":"Une suite d'IA privée sur votre serveur : saisie des justificatifs, rapprochement bancaire, interrogation des dossiers — automatiquement, au lieu de le faire à la main.",
    "ki.a2":"Pour les fiduciaires et PME dont les spécialistes perdent des heures à saisir, chercher et rapprocher.",
    "ki.a3":"Jusqu'à 80% de travail manuel en moins : environ 4 secondes par justificatif, des clôtures sans nuits blanches — et tout reste chez vous.",
    "ai.a1":"J'installe votre propre modèle de langage (comme ChatGPT, mais privé) sur votre matériel et je le relie à vos documents.",
    "ai.a2":"Pour tous ceux qui veulent utiliser l'IA mais dont les données sont confidentielles : mandats, contrats, dossiers RH ou patients.",
    "ai.a3":"Des réponses d'IA avec sources, tirées de vos propres dossiers — sans abonnement par poste, et pas un octet ne quitte la maison.",
    "crm.a1":"Un système client construit sur votre façon de travailler : contacts, pipeline, échéances, e-mail et facturation au même endroit.",
    "crm.a2":"Pour les équipes qui gèrent leurs clients dans Excel, Outlook et de mémoire — en perdant demandes et échéances au passage.",
    "crm.a3":"Plus rien ne passe entre les mailles : chaque demande saisie, chaque échéance signalée. Prix fixe au lieu d'un abonnement par poste.",
    "sw.a1":"Je construis l'outil dont votre processus a besoin mais que personne ne vend — application web, portail ou interface.",
    "sw.a2":"Pour les entreprises dont les processus vivent dans des fichiers Excel devenus trop grands, ou dont les systèmes ne se parlent pas.",
    "sw.a3":"Un outil qui vous va exactement, livré par étapes — et à la fin, le code source vous appartient."
  }};

  function setLang(l) {
    if (!D[l]) l = 'de';
    try { localStorage.setItem('em_lang', l); } catch (e) {}
    document.documentElement.lang = l;
    var dict = D[l];
    document.querySelectorAll('[data-i]').forEach(function (el) {
      var k = el.getAttribute('data-i');
      if (dict[k] !== undefined) el.innerHTML = dict[k];
    });
    document.querySelectorAll('[data-i-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i-ph');
      if (dict[k] !== undefined) el.setAttribute('placeholder', dict[k]);
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.lang === l);
    });
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  window.emSetLang = setLang;
  /* Current-language lookup for scripts (contact form messages etc.) */
  window.emT = function (k) {
    var l = document.documentElement.lang;
    var dict = D[l] || D.de;
    return dict[k] !== undefined ? dict[k] : (D.de[k] || '');
  };

  function boot() {
    var saved = 'de';
    try { saved = localStorage.getItem('em_lang') || 'de'; } catch (e) {}
    setLang(saved);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.dataset.lang); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
