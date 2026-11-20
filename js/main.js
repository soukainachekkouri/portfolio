/*
  Un seul script, isolé dans une fonction : aucune variable ne fuit dans l'espace global,
  et l'ordre des parties ne dépend plus de variables définies « quelque part plus haut ».
  1. CONTENU (le seul endroit à modifier pour changer les textes)
  2. Utilitaires · 3. Modale · 4. Hero · 5. Board · 6. Chronologie
  7. Epics · 8. Backlog et contact · 9. Navigation · 10. Thème
*/
(() => {
    'use strict';
  
    /* ==================================================================
       1. CONTENU — À REMPLACER PAR TES VRAIES INFOS
       ================================================================== */
  
    // Tickets de la section 02 (le titre, les libellés et le type sont dans le HTML du board)
    const DETAILS = {
      'SOU-101': {
        desc: "Une obligation est rarement formulée comme un besoin produit. Je la reformule en objectifs, en cas d'usage et en critères d'acceptation que l'équipe peut réellement livrer.",
        example: "WeShareBonds : un an pour distinguer les parcours des clients avertis et non avertis."
      },
      'SOU-102': {
        desc: "Trois attentes différentes donnent souvent trois produits. Je mets les attentes à plat, je tranche avec les décideurs et je garde une phrase d'objectif que tout le monde peut répéter."
      },
      'SOU-103': {
        desc: "Avant de dessiner, je regarde comment les acteurs en place répondent au même besoin, pour trouver ce qui manque plutôt que de refaire pareil.",
        example: "jobfit : comparaison avec Rekrute, Welcome to the Jungle et LinkedIn. Différenciants retenus : mode discret, transparence salariale, suivi des candidatures."
      },
      'SOU-201': {
        desc: "Quand deux publics ont des règles différentes, je dessine leurs parcours l'un à côté de l'autre pour voir exactement où ils divergent, et pourquoi.",
        example: "Clients avertis et non avertis : ce que la règle impose d'un côté, ce qui relève d'un choix d'interface de l'autre."
      },
      'SOU-202': {
        desc: "Une contrainte devient utile quand l'utilisateur sait quoi faire, dans quel ordre et pourquoi. Je réécris le texte jusqu'à ce qu'il tienne en une phrase."
      },
      'SOU-203': {
        desc: "Je contrôle les contrastes, les tailles de texte et la navigation au clavier tôt, quand corriger ne coûte presque rien."
      },
      'SOU-301': {
        desc: "Quand les plateformes dépendent les unes des autres, un retard se propage. Je suis les dépendances et je garde les jalons visibles pour tous les acteurs.",
        example: "Portail, Contrôle utilisateurs, Candidature : l'ouverture et la clôture de chaque plateforme sont les grands jalons métier."
      },
      'SOU-302': {
        desc: "Cent demandes ne se traitent pas dans l'ordre d'arrivée. Je les regroupe, j'évalue la valeur et l'effort, puis je dis clairement non à ce qui peut attendre."
      },
      'SOU-303': {
        desc: "Je pose les deux options côte à côte avec leurs risques et ce qu'elles coûtent, puis je fais trancher et je fige le périmètre."
      }
    };
  
    // Les trois lignes de la chronologie
    const ROWS = [
      { id: 'formation', label: 'Formation',     icon: 'cap',   type: 'Formation' },
      { id: 'exp',       label: 'Expérience',    icon: 'brief', type: 'Expérience' },
      { id: 'perso',     label: 'Projets perso', icon: 'ms',    type: 'Jalon' }
    ];
  
    /* Chronologie
       row    : 'formation' | 'exp' | 'perso'
       start  : 'AAAA-MM'   (début, ou date du jalon)
       end    : 'AAAA-MM' ou 'now' (en cours). Sans end, ou row 'perso' = jalon
       done   : true pour afficher un losange de diplôme à la fin d'une barre
       title (libellé de la barre), role (poste), contract, place (lieu / établissement),
       parent (titre d'une barre : l'élément devient un jalon posé sur cette barre, à sa date de fin),
       duration (ex. '10 mois'), approx (true : dates estimées, affichées avec ≈), bullets (missions, liste simple),
       url (lien du projet), image (chemin d’une capture d’écran, affichée au-dessus du titre), imageAlt, desc, highlights (points clés), designer / owner (missions par casquette : crée les onglets
       « Product Designer » et « Product Owner »), tabs (onglets libres : [{ label, sections }]),
       example (résultat clé), skills (liste) */
    const TIMELINE = [
      { row: 'formation', title: 'Commerce & Marketing', place: 'ESG · Montpellier',
        start: '2017-09', end: '2018-06', done: true,
        desc: 'Licence en Commerce & Marketing à l’ESG, à Montpellier.' },
      { row: 'formation', title: 'UX Management', place: 'Sup de Pub · Paris',
        start: '2019-09', end: '2021-06', done: true,
        desc: 'Master en UX Management à Sup de Pub, à Paris. Projets marquants : « le Closet » (2020), un service de location de box de vêtements, et « Dark Tourist », un web documentaire.' },
      { row: 'formation', title: 'Développement Web', place: 'OpenClassrooms · Paris',
        start: '2021-09', end: '2022-06', done: true,
        desc: 'Licence en Développement Web avec OpenClassrooms, à Paris.' },
  
      { row: 'exp', title: 'Freelance', role: 'Product Designer', contract: 'Freelance',
        start: '2021-07', end: 'now',
        desc: 'Missions de product designer en freelance, depuis juillet 2021.',
        tabs: [
          { label: 'Excellence.ma', sections: [
            { h: 'Mission · 8 mois', p: 'Refonte totale de la plateforme de retail.' },
            { h: "Ce que j'ai fait", list: [
              'Conception et livraison du parcours utilisateur en 2 lots dans une logique de lean thinking : rechercher, designer, tester, itérer',
              'Conception et livraison du Design System',
              'Product Backlog (construction et priorisation)',
              'Suivi des développements et maintien de la Roadmap',
              'Élaboration et intégration des mails fonctionnels'
            ] }
          ] },
          { label: 'Diramino.ma', sections: [
            { h: 'Mission · 10 mois', p: 'Plateforme de formation en ligne.' },
            { h: "Ce que j'ai fait", list: [
              'Pilotage de la refonte complète de la plateforme de formation',
              'Conception et livraison des parcours utilisateurs en deux lots, dans une démarche Lean (recherche, conception, tests et itérations)',
              'Mise en place et livraison d’un Design System dédié à la plateforme',
              'Construction et priorisation du Product Backlog',
              'Suivi des développements et contribution au maintien de la roadmap produit'
            ] }
          ] },
          { label: 'Autres projets', sections: [
            { h: 'Design & Produit', list: [
              'Conception de landing pages pour différents clients (B2B et B2C)',
              'Refonte graphique d’un dashboard pour une plateforme SaaS B2B',
              'Intégration et amélioration continue d’un Design System pour une agence digitale',
              'Conception et intégration de newsletters pour le compte d’une agence digitale'
            ] }
          ] }
        ],
        skills: ['Design System', 'Lean', 'Product Backlog', 'Roadmap', 'Landing pages', 'Emails / newsletters'] },
      { row: 'exp', title: 'Diramino.ma', parent: 'Freelance', role: 'Product Designer', contract: 'Freelance', duration: '10 mois', approx: true,
        start: '2021-07', end: '2022-04',
        desc: 'Plateforme de formation en ligne.',
        bullets: [
          'Pilotage de la refonte complète de la plateforme de formation',
          'Conception et livraison des parcours utilisateurs en deux lots, dans une démarche Lean (recherche, conception, tests et itérations)',
          'Mise en place et livraison d’un Design System dédié à la plateforme',
          'Construction et priorisation du Product Backlog',
          'Suivi des développements et contribution au maintien de la roadmap produit'
        ],
        skills: ['Design System', 'Lean', 'Product Backlog', 'Roadmap'] },
      { row: 'exp', title: 'Excellence.ma', parent: 'Freelance', role: 'Product Designer', contract: 'Freelance', duration: '8 mois', approx: true,
        start: '2022-05', end: '2022-12',
        desc: 'Refonte totale de la plateforme de retail.',
        bullets: [
          'Conception et livraison du parcours utilisateur en 2 lots dans une logique de lean thinking : rechercher, designer, tester, itérer',
          'Conception et livraison du Design System',
          'Product Backlog (construction et priorisation)',
          'Suivi des développements et maintien de la Roadmap',
          'Élaboration et intégration des mails fonctionnels'
        ],
        skills: ['Design System', 'Lean', 'Product Backlog', 'Roadmap', 'Emails fonctionnels'] },
      { row: 'exp', title: 'WeShareBonds', role: 'Product Designer & Product Owner', contract: 'CDI', place: 'Paris',
        start: '2022-12', end: '2024-02',
        desc: 'Plateforme de financement participatif agréée PSFP par l’AMF, proposant trois catégories d’investissements immobiliers.',
        highlights: [
          'Pilotage de la conception et de la livraison de la V1 de la plateforme sur un cycle de 10 mois'
        ],
        designer: [
          'Conception et amélioration continue des parcours utilisateurs clés (inscription, investissement, profil)',
          'Mise en conformité de 80 % des parcours avec la nouvelle réglementation AMF',
          'Mise en place, intégration et évolution continue du Design System'
        ],
        owner: [
          'Définition des spécifications fonctionnelles et rédaction des tickets',
          'Construction, priorisation et pilotage du Product Backlog',
          'Contribution à la définition et au maintien de la roadmap produit',
          'Animation des ateliers de cadrage, de refinement et coordination produit / tech',
          'Suivi des développements, de la recette fonctionnelle et de la validation graphique',
          'Mise en œuvre de pratiques agiles et structuration des rituels produit, conduisant à une réduction de 30 % de la durée des réunions de planification et à la formalisation de la Definition of Done (DoD)'
        ],
        example: '80 % des parcours mis en conformité avec la nouvelle réglementation AMF, et 30 % de temps de réunions de planification en moins.',
        skills: ['Conformité AMF', 'Design System', 'Product Backlog', 'Roadmap', 'Agilité'] },
      { row: 'exp', title: 'SociaNova', role: 'Product Designer & Product Owner', contract: 'CDI', place: 'Paris',
        start: '2024-05', end: 'now',
        desc: 'Logiciel médico-social (SaaS) évoluant dans un environnement réglementé.',
        highlights: [
          'Pilotage de la refonte complète de la solution (UX, UI et structuration des parcours et du backlog produit) en collaboration étroite avec les équipes tech'
        ],
        designer: [
          'Conception et amélioration continue de parcours utilisateurs complexes (délivrance, prescriptions sécurisées, procédures administratives, outil de facturation)',
          'Mise en place, évolution et adoption continue d’un Design System au sein des équipes produit et développement',
          'Garantie de la cohérence et de la qualité du design de la solution auprès de l’ensemble des parties prenantes'
        ],
        owner: [
          'Définition des spécifications fonctionnelles, rédaction des user stories et animation des sessions de refinement',
          'Construction, priorisation et pilotage du Product Backlog',
          'Contribution active à la définition de la roadmap produit et à la priorisation des engagements',
          'Animation d’ateliers de cadrage, de discovery et de conception avec l’équipe produit',
          'Pilotage du suivi des développements, validation des interfaces et priorisation des anomalies'
        ],
        example: 'V1 fonctionnelle livrée en 3 mois sur un périmètre de plus de 100 modules.',
        skills: ['UX / UI', 'Design System', 'Product Backlog', 'Roadmap', 'Discovery'] },
  
      { row: 'perso', title: 'Evendear · lancement du MVP', url: 'https://evendear.app/',
        image: 'img/evendear.webp', imageAlt: 'Page d’accueil d’Evendear : « Des lettres à ouvrir au bon moment »',
        start: '2026-11-17',
        desc: 'Projet personnel lancé avec un ami, lui aussi product designer. Evendear permet d’écrire des lettres, seul ou à plusieurs, qui s’ouvrent le jour J ou le jour où on en a besoin. Le MVP est en ligne depuis le 17 novembre 2026.' }
    ];
  
    /* Projets (epics)
       key      : identifiant affiché (PRJ-1…)
       status   : 'done' (Livré) | 'progress' (En cours)   ← à vérifier
       progress : avancement en % (facultatif : sans valeur, pas de barre)
       before / after : la ligne « avant → après » visible dans la liste
       tickets  : clés des tickets de la section 02 liés à ce projet
       image / imageAlt / imagePosition / url : capture affichée au-dessus du titre (position : ex. 'center 40%')
       visual   : null, ou un visuel dans la modale :
          { type:'parcours', caption, lanes:[{label, steps:[{t, diff?}]}] }
          { type:'frise',    caption, items:[{l, w}] } */
    const EPICS = [
      {
        key: 'PRJ-1', title: 'WeShareBonds',
        status: 'done', progress: 100,
        before: 'Un projet en retard de 18 mois sur sa roadmap, à mettre en conformité', after: 'Une V1 conforme livrée : 80 % des parcours mis en conformité',
        role: 'Product Designer & Product Owner', period: 'Déc. 2022 – févr. 2024', team: 'À renseigner',
        tickets: ['SOU-101', 'SOU-201'],
        context: "WeShareBonds est une plateforme de financement participatif agréée PSFP par l’AMF (n° FP-2023-6), proposant trois catégories d’investissements immobiliers : crowdfunding immobilier, transaction immobilière et immobilier fractionné.",
        problem: [
          "Mettre la plateforme en conformité avec le nouveau cadre réglementaire européen avant l’échéance d’agrément PSFP, tout en repensant les parcours utilisateurs sur les plans graphique et technique.",
          "Un enjeu majeur consistait à différencier les investisseurs avertis et non avertis, en intégrant les obligations d’information et d’alerte propres à chaque profil.",
          "À mon arrivée en 2022, le projet accusait déjà 18 mois de retard sur la roadmap initiale. Je disposais d’un an pour remettre le projet sur les rails et piloter la livraison d’une première version conforme."
        ],
        did: "J’ai piloté la conception et la livraison de la V1 en assurant un double rôle de Product Designer et Product Owner. De la refonte des parcours à la coordination des développements, j’ai contribué à structurer le produit, organiser les priorités et accompagner l’équipe jusqu’à la livraison.",
        result: [
          '80 % des parcours mis en conformité avec les nouvelles exigences réglementaires.',
          '30 % de temps de réunion de planification en moins grâce à la structuration des rituels.',
          '1 Definition of Done formalisée et partagée avec l’équipe.'
        ],
        visual: null
      },
      {
        key: 'PRJ-2', title: 'SociaNova',
        status: 'progress',
        before: 'Un logiciel médico-social à refondre dans un environnement réglementé', after: 'Une V1 fonctionnelle livrée en 3 mois, sur plus de 100 modules',
        role: 'Product Designer & Product Owner', period: 'Depuis mai 2024', team: 'À renseigner',
        tickets: [],
        context: "Logiciel médico-social (SaaS) évoluant dans un environnement réglementé. Poste en CDI, à Paris, depuis mai 2024.",
        problem: "Refondre toute la solution (UX, UI, structuration des parcours et du backlog produit), en collaboration étroite avec les équipes tech, sur un périmètre produit étendu.",
        did: "J’ai piloté la refonte complète de la solution. J’ai défini les spécifications fonctionnelles, rédigé les user stories et animé les sessions de refinement, construit et priorisé le Product Backlog, et contribué à la roadmap et à la priorisation des engagements. J’ai animé des ateliers de cadrage, de discovery et de conception, conçu et amélioré en continu des parcours complexes (délivrance, prescriptions sécurisées, procédures administratives, outil de facturation), et mis en place un Design System adopté par les équipes produit et développement. Je garantis la cohérence et la qualité du design auprès des parties prenantes, et je pilote le suivi des développements, la validation des interfaces et la priorisation des anomalies.",
        result: "Une V1 fonctionnelle livrée en 3 mois, sur un périmètre de plus de 100 modules, et un Design System adopté par les équipes produit et développement.",
        visual: null
      },
      {
        key: 'PRJ-3', title: 'jobfit',
        status: 'progress', progress: 60,
        before: 'Problème de départ (exemple)', after: 'Solution obtenue (exemple)',
        role: 'À renseigner', period: 'À renseigner', team: 'À renseigner',
        tickets: ['SOU-103'],
        context: "À compléter : l'idée, le marché visé, ce qui a lancé le projet.",
        problem: "À compléter : le problème des candidats ou des recruteurs que tu cherches à résoudre.",
        did: "À compléter : benchmark, parcours, maquettes, décisions de produit.",
        result: "À compléter : où en est le projet, premiers retours, prochaines étapes.",
        visual: null
      },
      {
        key: 'PRJ-4', title: 'SI à trois plateformes',
        status: 'progress', progress: 80,
        before: 'Problème de départ (exemple)', after: 'Solution obtenue (exemple)',
        role: 'À renseigner', period: 'À renseigner', team: 'À renseigner',
        tickets: ['SOU-301'],
        context: "À compléter : le périmètre des trois plateformes et leurs liens.",
        problem: "À compléter : les dépendances, les risques de calendrier, les données qui ne se parlent pas.",
        did: "À compléter : pilotage, jalons, arbitrages, alignement des parties prenantes.",
        result: "À compléter : ce qui a été livré, ce qui a changé pour les utilisateurs.",
        visual: {
          type: 'frise', caption: 'Jalons des trois plateformes (exemple)',
          items: [{ l: 'Portail', w: 'à renseigner' }, { l: 'Contrôle utilisateurs', w: 'à renseigner' }, { l: 'Candidature', w: 'à renseigner' }]
        }
      },
      {
        key: 'PRJ-5', title: 'le Closet',
        status: 'done', progress: 100,
        before: 'Des abonnées qui quittent le service après 3 mois', after: 'Un parcours personnalisé pour les accompagner',
        role: 'À renseigner', period: '2020 · 1 mois', team: '4 personnes',
        tickets: [],
        context: "Projet réalisé pendant mon Master UX Management, en 2020, entièrement à distance, avec une équipe de 4 personnes qui ne se connaissaient pas : les « ice breakers » ont aidé à se connaître vite. Le Closet est un service de location de box de vêtements, qui promet d’être à la pointe de la mode en préservant la planète.",
        problem: "Comment mieux accompagner les utilisatrices dans leurs parcours pour les fidéliser au-delà de la période critique des 3 mois ?",
        did: "Recherche : analyse du service et de sa présence digitale, retours des abonnées sur les réseaux sociaux, questionnaire en ligne. Analyse : parcours des abonnées, pistes de brief et deux cibles (la « Mom to Be écolo » et la « fashionista écolo »). Idéation à distance : inspirations, brainstorming avec la méthode des six chapeaux. Conception : formalisation des parcours, wireframes et guide de style, sur 19 écrans.",
        result: "Un service qui accompagne chaque abonnée de façon personnalisée : formulaire d’inscription sur mesure, préférences selon les saisons, produits disponibles mis en avant en temps réel, tableau de bord personnel, et une page d’accueil dédiée aux femmes enceintes pour toucher une nouvelle cible.",
        visual: {
          type: 'frise', caption: 'Design process',
          items: [{ l: 'Recherche', w: 'Étape 1' }, { l: 'Analyse', w: 'Étape 2' }, { l: 'Idéation', w: 'Étape 3' }, { l: 'Conception', w: 'Étape 4' }, { l: 'Testing', w: 'Étape 5' }]
        }
      },
      {
        key: 'PRJ-6', title: 'Dark Tourist',
        status: 'done', progress: 100,
        before: 'Un documentaire Netflix à repenser pour le web', after: 'Un web documentaire pour l’épisode 2, au Japon',
        role: 'UI Design', period: '4 jours', team: 'Individuel',
        tickets: [],
        image: 'img/dark-tourist.webp', imagePosition: 'center 40%',
        imageAlt: 'Écran du web documentaire Dark Tourist : un nuage en forme de champignon noir sur fond rouge, au-dessus d’un alignement de croix blanches',
        context: "Dans la série documentaire Dark Tourist (Netflix), David Farrier explore la face macabre et glauque du tourisme en huit épisodes. Chaque épisode est consacré à un pays ou à un continent, divisé en trois attractions touristiques morbides. Projet réalisé dans le cadre d’un séminaire en UI pendant mon Master.",
        problem: "Repenser un documentaire en web documentaire : l’objectif du séminaire était de le concevoir graphiquement, en comprenant les enjeux propres au format.",
        did: "J’ai choisi l’épisode 2, qui se déroule au Japon, et j’ai travaillé d’arrache-pied pendant 4 jours pour comprendre les enjeux des web documentaires et proposer ma vision.",
        result: "Une proposition de web documentaire pour la série Dark Tourist, conçue en UI design.",
        visual: null
      }
    ];
  
    /* Commentaires affichés dans les fiches des tickets et des epics, façon Jira.
       Clé = identifiant du ticket (SOU-101…) ou de l'epic (PRJ-1…).
       Chaque commentaire : { author, role, date: 'AAAA-MM-JJ', text }
       Exemple : 'PRJ-1': [{ author: 'Prénom Nom', role: 'CPO, WeShareBonds', date: '2024-02-15', text: '…' }]
       (idéal pour une recommandation d'un collègue ou d'un manager, avec son accord)
       Sans commentaire, la fiche affiche « Aucun commentaire » et le champ pour en écrire un. */
    const COMMENTS = {};
  
    /* Page « Principes »
       PRINCIPLES : icon ('c-eye' | 'c-rule' | 'c-data' | 'c-target' …, voir le sprite), title, text,
         proof (facultatif) : { kind: 'epic', ref: 'PRJ-5', fact } ou { kind: 'exp', ref: 'WeShareBonds', fact }
         (ref = clé d'un epic, ou titre exact d'une expérience de la chronologie)
       RESULTS : les chiffres affichés sous les principes (n, l = libellé, src = d'où ça vient) */
    const PRINCIPLES = [
      { icon: 'c-eye', title: 'Comprendre avant de dessiner',
        text: 'Une règle complexe, un processus lourd, une donnée difficile à lire : je commence par ce qui se passe réellement.',
        proof: { kind: 'epic', ref: 'PRJ-5', fact: 'Questionnaire en ligne, analyse des parcours et deux cibles définies avant la première maquette.' } },
      { icon: 'c-rule', title: 'Rendre l’obligation lisible',
        text: 'Une contrainte réglementaire devient utile quand on sait quoi faire, dans quel ordre, et pourquoi.',
        proof: { kind: 'exp', ref: 'WeShareBonds', fact: '80 % des parcours mis en conformité avec la nouvelle réglementation AMF.' } },
      { icon: 'c-data', title: 'Décider avec la donnée',
        text: 'Comprendre comment elle circule pour savoir ce qu’elle permet de décider, et ce qu’elle ne permet pas.' }
    ];
    const RESULTS = [
      { n: '4', l: 'Design Systems conçus ou mis en place', src: 'Excellence.ma, Diramino.ma, WeShareBonds, SociaNova' },
      { n: '100+', l: 'modules couverts par une V1 livrée en 3 mois', src: 'SociaNova' },
      { n: '80 %', l: 'des parcours mis en conformité avec la nouvelle réglementation AMF', src: 'WeShareBonds' },
      { n: '−30 %', l: 'de temps passé en réunions de planification', src: 'WeShareBonds' }
    ];
  
    /* Ce qui m'attend
       key, type ('epic' | 'story'), prio ('high' | 'medium'),
       horizon ('Prochain' | 'Ensuite' | 'Plus tard'), title,
       labels (liste), why (pourquoi ça t'attire), bring (ce que tu y apporterais) */
    const NEXT = [
      { key: 'SOU-401', type: 'epic', prio: 'high', horizon: 'Prochain',
        title: 'Un produit à fort enjeu réglementaire (exemple)', labels: ['Conformité', 'Produit'],
        why: "À compléter : ce qui t'attire dans ce type de sujet.",
        bring: "À compléter : ce que tu y apporterais, en une ou deux phrases." },
      { key: 'SOU-402', type: 'story', prio: 'medium', horizon: 'Ensuite',
        title: 'Une équipe où le design pilote les décisions (exemple)', labels: ['Design', 'Équipe'],
        why: "À compléter : le type d'équipe et de culture que tu cherches à construire.",
        bring: "À compléter : ta façon de travailler avec le produit et la tech." },
      { key: 'SOU-403', type: 'story', prio: 'medium', horizon: 'Plus tard',
        title: 'Des données transformées en parcours simples (exemple)', labels: ['Données', 'UX'],
        why: "À compléter : pourquoi la donnée t'intéresse.",
        bring: "À compléter : ce que tu apporterais pour la rendre lisible." }
    ];
  
    const CONTACT = {
      email: 'prenom.nom@exemple.fr',                       // ← ton e-mail
      linkedin: 'https://www.linkedin.com/in/exemple',      // ← ton profil LinkedIn
      cv: '#'                                                // ← lien vers ton CV (PDF)
    };
  
    /* ==================================================================
       2. Utilitaires partagés
       ================================================================== */
    const $ = (id) => document.getElementById(id);
  
    const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);
  
    const icon = (name, cls = '') =>
      `<svg class="ico${cls ? ' ' + cls : ''}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
    const chips = (list) => list.map((l) => `<span class="chip">${esc(l)}</span>`).join('');
    const AVATAR = '<span class="avatar" aria-hidden="true">S</span>';
    const ASSIGNEE = { k: 'Assignée à', v: AVATAR + 'Souky' };
  
    const TYPES = { story: 'Story', task: 'Tâche', epic: 'Epic' };
    const PRIOS = { high: 'Haute', medium: 'Moyenne' };
    const STATUS = { done: 'Livré', progress: 'En cours' };
    const prioMeta = (prio) => ({ k: 'Priorité', v: icon(prio, 'prio-' + prio) + PRIOS[prio] });
  
    /* ==================================================================
       3. Modale partagée (tickets, chronologie, projets, backlog)
       ================================================================== */
    const modal = $('drawer');
    const dr = {
      key: $('dr-key'), title: $('dr-title'), visual: $('dr-visual'),
      cover: $('dr-cover'), sections: $('dr-sections'), tabs: $('dr-tabs'), panels: $('dr-panels'), pinned: $('dr-pinned'), comments: $('dr-comments'), meta: $('dr-meta'), close: $('dr-close'),
      body: modal.querySelector('.m-body')
    };
  
    // ----- Commentaires façon Jira -----
    const dayFmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    const initials = (name) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
    const NOTE_DEFAULT = 'S’ouvre dans ta messagerie.';
  
    function renderComments(c) {
      if (!c) { dr.comments.hidden = true; dr.comments.innerHTML = ''; return; }
      const items = c.items || [];
      dr.comments.hidden = false;
      dr.comments.innerHTML = `
        <h4>Commentaires <span class="count">${items.length}</span></h4>
        ${items.length
          ? `<ul class="cm-list">${items.map((m) => {
              const [y, mo, d] = m.date.split('-').map(Number);
              return `<li class="cm"><span class="avatar" aria-hidden="true">${esc(initials(m.author))}</span>
                <div class="cm-main"><p class="cm-head"><b>${esc(m.author)}</b><span>${esc(m.role)} · <time datetime="${esc(m.date)}">${dayFmt.format(new Date(y, mo - 1, d))}</time></span></p>
                <p class="cm-body">${esc(m.text)}</p></div></li>`;
            }).join('')}</ul>`
          : '<p class="cm-empty">Aucun commentaire pour l’instant.</p>'}
        <form class="cm-form" data-ref="${esc(c.ref)}" data-title="${esc(c.title)}">
          <span class="avatar" aria-hidden="true">${icon('mail')}</span>
          <div class="cm-field">
            <label class="sr" for="cm-input">Ajouter un commentaire sur ${esc(c.ref)}</label>
            <textarea id="cm-input" rows="1" placeholder="Ajouter un commentaire…"></textarea>
            <div class="cm-actions" hidden>
              <button class="btn primary" type="submit">Envoyer</button>
              <button class="btn" type="button" data-cm-cancel>Annuler</button>
              <span class="cm-note" role="status">${NOTE_DEFAULT}</span>
            </div>
          </div>
        </form>`;
    }
  
    function cmCollapse(form) {
      const ta = form.querySelector('textarea');
      ta.value = '';
      ta.rows = 1;
      form.querySelector('.cm-actions').hidden = true;
      form.querySelector('.cm-note').textContent = NOTE_DEFAULT;
    }
  
    // Le champ se déplie au clic, comme dans Jira
    dr.comments.addEventListener('focusin', (e) => {
      const ta = e.target.closest('textarea');
      if (!ta) return;
      ta.rows = 3;
      ta.closest('.cm-field').querySelector('.cm-actions').hidden = false;
    });
    dr.comments.addEventListener('click', (e) => {
      if (e.target.closest('[data-cm-cancel]')) cmCollapse(e.target.closest('form'));
    });
    dr.comments.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target.closest('form');
      const ta = form.querySelector('textarea');
      const text = ta.value.trim();
      if (!text) { ta.focus(); return; }
      const { ref, title } = form.dataset;
      form.querySelector('.cm-note').textContent = `Ta messagerie va s’ouvrir. Sinon, écris-moi à ${CONTACT.email}.`;
      const subject = `[Commentaire] ${ref} · ${title}`;
      const body = `${text}\r\n\r\n— À propos de : ${ref} · ${title}`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  
    // sections : [{ h: titre, p: texte, list: [puces], accent: true|false }]
    // meta     : [{ k: libellé, v: HTML déjà échappé, full: true|false }]
    // tabs     : [{ label, sections }] (facultatif) : onglets affichés SOUS `sections`
    // pinned   : { h, p } (facultatif) : bloc toujours visible en bas de la fiche, quel que soit l'onglet
    // cover    : { src, alt, href, position } (facultatif) : image affichée au-dessus du titre, cliquable si `href`
    // comments : { ref, title, items } (facultatif) : fil de commentaires façon Jira, avec un champ pour en écrire un
    function openModal({ keyHtml, title, visualHtml = '', sections = [], tabs = null, pinned = null, cover = null, comments = null, meta = [] }) {
      const wasOpen = modal.open;
      dr.key.innerHTML = keyHtml;
      dr.title.textContent = title;
      dr.cover.hidden = true;
      dr.cover.replaceChildren();
      if (cover && cover.src) {
        const img = document.createElement('img');
        img.alt = cover.alt || '';
        img.decoding = 'async';
        // Image introuvable : on retire simplement la couverture, sans icône cassée
        img.addEventListener('error', () => { dr.cover.hidden = true; dr.cover.replaceChildren(); });
        if (cover.position) img.style.objectPosition = cover.position;
        img.src = cover.src;
        let node = img;
        if (cover.href) {
          node = document.createElement('a');
          node.href = cover.href;
          node.target = '_blank';
          node.rel = 'noopener noreferrer';
          node.appendChild(img);
        }
        dr.cover.appendChild(node);
        dr.cover.hidden = false;
      }
      dr.visual.innerHTML = visualHtml;
      const sectionsHtml = (list) => list.filter((s) => s.p || (s.list && s.list.length)).map((s) =>
        `<section class="dr-sec${s.accent ? ' dr-example' : ''}"><h4>${esc(s.h)}</h4>` +
        (Array.isArray(s.p) ? s.p.map((x) => `<p>${esc(x)}</p>`).join('') : s.p ? `<p>${esc(s.p)}</p>` : '') +
        (s.list && s.list.length ? `<ul>${s.list.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>` : '') +
        '</section>'
      ).join('');
      dr.sections.innerHTML = sectionsHtml(sections);
      if (tabs && tabs.length) {
        dr.tabs.hidden = false;
        dr.tabs.innerHTML = tabs.map((tb, n) =>
          `<button class="m-tab" type="button" role="tab" id="tab-${n}" aria-controls="panel-${n}" aria-selected="${n === 0}" tabindex="${n === 0 ? 0 : -1}">${esc(tb.label)}</button>`
        ).join('');
        dr.panels.innerHTML = tabs.map((tb, n) =>
          `<div role="tabpanel" id="panel-${n}" aria-labelledby="tab-${n}" tabindex="0"${n ? ' hidden' : ''}>${sectionsHtml(tb.sections)}</div>`
        ).join('');
      } else {
        dr.tabs.hidden = true;
        dr.tabs.innerHTML = '';
        dr.panels.innerHTML = '';
      }
      dr.pinned.innerHTML = pinned && pinned.p
        ? `<section class="dr-sec dr-example"><h4>${esc(pinned.h)}</h4><p>${esc(pinned.p)}</p></section>` : '';
      dr.pinned.hidden = !dr.pinned.innerHTML;
      renderComments(comments);
      dr.meta.innerHTML = meta.map((m) => {
        const c = m.full ? ' class="full"' : '';
        return `<dt${c}>${m.k}</dt><dd${c}>${m.v}</dd>`;
      }).join('');
      if (!wasOpen) modal.showModal();
      dr.body.scrollTop = 0;
      // Navigation interne (ticket ↔ epic) : le bouton cliqué vient d'être détruit,
      // on replace le focus dans la modale pour ne pas le perdre sur <body>.
      if (wasOpen) dr.close.focus();
    }
  
    dr.close.addEventListener('click', () => modal.close());
  
    // Onglets de la modale (flèches gauche / droite, Début, Fin)
    function selectTab(btn) {
      dr.tabs.querySelectorAll('.m-tab').forEach((b, n) => {
        const on = b === btn;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
        $('panel-' + n).hidden = !on;
      });
      dr.body.scrollTop = 0;
    }
    dr.tabs.addEventListener('click', (e) => {
      const b = e.target.closest('.m-tab');
      if (b) selectTab(b);
    });
    dr.tabs.addEventListener('keydown', (e) => {
      const all = [...dr.tabs.querySelectorAll('.m-tab')];
      const n = all.indexOf(document.activeElement);
      if (n < 0) return;
      const to = { ArrowRight: (n + 1) % all.length, ArrowLeft: (n - 1 + all.length) % all.length, Home: 0, End: all.length - 1 }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      selectTab(all[to]);
      all[to].focus();
    });
  
    // Fermeture au clic sur le fond : seulement si le clic a COMMENCÉ sur le fond
    // (évite de fermer quand on sélectionne du texte et qu'on relâche en dehors).
    let pressedOnBackdrop = false;
    modal.addEventListener('pointerdown', (e) => { pressedOnBackdrop = e.target === modal; });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        if (pressedOnBackdrop) modal.close();
        return;
      }
      // Liens internes : d'un epic vers un ticket, et d'un ticket vers son epic
      const t = e.target.closest('[data-ticket]');
      if (t) return openTicket(t.dataset.ticket);
      const ep = e.target.closest('[data-epic]');
      if (ep) openEpic(ep.dataset.epic);
    });
  
    /* ==================================================================
       4. Hero : désordre / ordre, bouton suiveur
       ================================================================== */
    const hero = $('hero');
    const orderBtn = $('order-btn');        // « Mettre en ordre » : range le tableau
    const projectsLink = $('projects-link');  // une fois en ordre, le même bouton mène aux projets
    const resetBtn = $('reset');
    const fronts = hero.querySelectorAll('.face.front');
    const backs = hero.querySelectorAll('.face.back');
  
    function setOrdered(on) {
      hero.classList.toggle('is-ordered', on);
      orderBtn.hidden = on;
      projectsLink.hidden = !on;
      resetBtn.hidden = !on;
      // Les lecteurs d'écran ne lisent que la face visible
      fronts.forEach((f) => f.setAttribute('aria-hidden', String(on)));
      backs.forEach((f) => f.setAttribute('aria-hidden', String(!on)));
    }
  
    // Le bouton qu'on vient d'utiliser disparaît : le focus passe au suivant pour ne pas être perdu
    orderBtn.addEventListener('click', () => { setOrdered(true); projectsLink.focus({ preventScroll: true }); });
    resetBtn.addEventListener('click', () => { setOrdered(false); orderBtn.focus({ preventScroll: true }); });
  
    setOrdered(false);
  
    /* ==================================================================
       5. Board (section 02)
       ================================================================== */
    const kanban = $('kanban');
    const TICKETS = new Map([...kanban.querySelectorAll('.ticket')].map((t) => [t.dataset.key, t]));
    const ticketType = (k) => TICKETS.get(k)?.dataset.type || 'story';
    const ticketTitle = (k) => TICKETS.get(k)?.querySelector('.t-title').textContent || '';
  
    // Epic de chaque ticket, d'après EPICS (un ticket appartient au premier epic qui le cite)
    const EPIC_OF = new Map();
    EPICS.forEach((e) => e.tickets.forEach((k) => { if (!EPIC_OF.has(k)) EPIC_OF.set(k, e.key); }));
  
    /* Barre de filtres façon Jira : recherche + listes déroulantes (Epic, Type, Libellé, Filtres rapides).
       Dans une liste, les choix se cumulent (« ou ») ; entre les listes, ils s'additionnent (« et »). */
    const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const INFO = new Map();   // ce qu'il faut savoir de chaque ticket pour le filtrer
    TICKETS.forEach((t, key) => {
      INFO.set(key, {
        type: t.dataset.type,
        prio: t.dataset.prio,
        epic: EPIC_OF.get(key),
        hasProject: 'project' in t.dataset,
        labels: [...t.querySelectorAll('.t-tags .chip:not(.proj)')].map((c) => c.textContent.trim()),
        text: norm(`${key} ${t.querySelector('.t-title').textContent} ${t.querySelector('.t-tags').textContent}`)
      });
    });
    const allInfo = [...INFO.values()];
  
    const GROUPS = [
      { id: 'epic', label: 'Epic',
        options: EPICS.filter((e) => e.tickets.some((k) => TICKETS.has(k))).map((e) => ({ value: e.key, text: e.title, icon: 'epic' })),
        test: (i, set) => set.has(i.epic) },
      { id: 'type', label: 'Type',
        options: ['story', 'task', 'epic'].filter((v) => allInfo.some((i) => i.type === v)).map((v) => ({ value: v, text: TYPES[v], icon: v })),
        test: (i, set) => set.has(i.type) },
      { id: 'label', label: 'Libellé',
        options: [...new Set(allInfo.flatMap((i) => i.labels))].sort((a, b) => a.localeCompare(b, 'fr')).map((l) => ({ value: l, text: l })),
        test: (i, set) => i.labels.some((l) => set.has(l)) },
      { id: 'quick', label: 'Filtres rapides',
        options: [{ value: 'high', text: 'Priorité haute', icon: 'high' }, { value: 'project', text: 'Avec un projet concret' }],
        test: (i, set) => [...set].every((v) => (v === 'high' ? i.prio === 'high' : i.hasProject)) }
    ].filter((g) => g.options.length);
    const picked = Object.fromEntries(GROUPS.map((g) => [g.id, new Set()]));
  
    const search = $('bf-search');
    const clearBtn = $('bf-clear');
    const status = $('filter-status');
    const drops = $('fdrops');
    const columns = [...kanban.querySelectorAll('.column')];
  
    drops.innerHTML = GROUPS.map((g) => `
      <div class="fdrop" data-group="${g.id}">
        <button class="fbtn" type="button" aria-expanded="false" aria-controls="fp-${g.id}">
          <span>${g.label}</span><span class="fbadge" hidden></span>${icon('chev')}
        </button>
        <div class="fpanel" id="fp-${g.id}" role="group" aria-label="${g.label}" hidden>
          ${g.options.map((o) => `<label class="fopt"><input type="checkbox" value="${esc(o.value)}">${o.icon ? icon(o.icon, (o.icon === 'high' ? 'prio-high' : 'ty-' + o.icon)) : ''}<span>${esc(o.text)}</span></label>`).join('')}
        </div>
      </div>`).join('');
    const dropEls = [...drops.querySelectorAll('.fdrop')];
  
    // Message affiché dans une colonne quand le filtre n'y laisse aucun ticket
    columns.forEach((col) => {
      const p = document.createElement('p');
      p.className = 'col-empty';
      p.textContent = 'Aucun ticket dans cette sélection.';
      p.hidden = true;
      col.appendChild(p);
    });
  
    function applyFilters(announce) {
      const q = norm(search.value.trim());
      let shown = 0;
      TICKETS.forEach((t, key) => {
        const i = INFO.get(key);
        const ok = (!q || i.text.includes(q)) && GROUPS.every((g) => !picked[g.id].size || g.test(i, picked[g.id]));
        t.hidden = !ok;
        if (ok) shown++;
      });
      let active = Boolean(q);
      dropEls.forEach((d) => {
        const n = picked[d.dataset.group].size;
        const badge = d.querySelector('.fbadge');
        badge.hidden = !n;
        badge.textContent = n;
        d.querySelector('.fbtn').classList.toggle('is-on', n > 0);
        if (n) active = true;
      });
      clearBtn.hidden = !active;
      columns.forEach((col) => {
        const n = col.querySelectorAll('.ticket:not([hidden])').length;
        col.querySelector('.count').textContent = n;
        col.querySelector('.col-empty').hidden = n > 0;
      });
      // Annonce aux lecteurs d'écran (role="status")
      status.textContent = announce ? `${shown} ticket${shown > 1 ? 's' : ''} affiché${shown > 1 ? 's' : ''}` : '';
    }
  
    // Ouverture / fermeture des listes
    function setOpen(d, open) {
      d.querySelector('.fbtn').setAttribute('aria-expanded', String(open));
      d.querySelector('.fpanel').hidden = !open;
    }
    function closeOthers(except) { dropEls.forEach((d) => { if (d !== except) setOpen(d, false); }); }
    drops.addEventListener('click', (e) => {
      const b = e.target.closest('.fbtn');
      if (!b) return;
      const d = b.closest('.fdrop');
      const open = b.getAttribute('aria-expanded') !== 'true';
      closeOthers(d);
      setOpen(d, open);
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.fdrop')) closeOthers(null); });
    drops.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const d = e.target.closest('.fdrop');
      if (!d || d.querySelector('.fpanel').hidden) return;
      setOpen(d, false);
      d.querySelector('.fbtn').focus();
    });
    // Tab vers un autre élément : la liste se referme
    drops.addEventListener('focusout', (e) => {
      const d = e.target.closest('.fdrop');
      if (d && e.relatedTarget && !d.contains(e.relatedTarget)) setOpen(d, false);
    });
  
    drops.addEventListener('change', (e) => {
      const input = e.target.closest('input[type="checkbox"]');
      if (!input) return;
      const set = picked[input.closest('.fdrop').dataset.group];
      if (input.checked) set.add(input.value); else set.delete(input.value);
      applyFilters(true);
    });
  
    let typing = 0;
    search.addEventListener('input', () => {
      clearTimeout(typing);
      typing = setTimeout(() => applyFilters(true), 250);
    });
  
    clearBtn.addEventListener('click', () => {
      Object.values(picked).forEach((s) => s.clear());
      drops.querySelectorAll('input[type="checkbox"]').forEach((c) => { c.checked = false; });
      search.value = '';
      applyFilters(true);
      search.focus();
    });
    applyFilters(false);
  
    function openTicket(key) {
      const t = TICKETS.get(key);
      if (!t) return;
      const { type, prio, pillar } = t.dataset;
      const d = DETAILS[key] || {};
      const ep = EPICS.find((e) => e.tickets.includes(key));
      const meta = [
        { k: 'Pilier', v: esc(pillar) },
        prioMeta(prio),
        ASSIGNEE
      ];
      if (ep) {
        meta.push({ k: 'Epic', full: true,
          v: `<button class="rel" type="button" data-epic="${esc(ep.key)}">${icon('epic', 'ty-epic')}<b>${esc(ep.key)}</b><span>${esc(ep.title)}</span></button>` });
      }
      meta.push({ k: 'Libellés', full: true, v: t.querySelector('.t-tags').innerHTML });
      openModal({
        keyHtml: `${icon(type, 'ty-' + type)}<b>${esc(key)}</b> · ${TYPES[type]}`,
        title: t.querySelector('.t-title').textContent,
        sections: [
          { h: "Comment je m'y prends", p: d.desc },
          { h: 'Sur un vrai projet', p: d.example, accent: true }
        ],
        comments: { ref: key, title: t.querySelector('.t-title').textContent, items: COMMENTS[key] },
        meta
      });
    }
  
    kanban.addEventListener('click', (e) => {
      const t = e.target.closest('.ticket');
      if (t) openTicket(t.dataset.key);
    });
  
    /* ==================================================================
       6. Chronologie (section 03)
       ================================================================== */
    let openTimelineByTitle = () => {};   // renseigné par la chronologie, utilisé par la page Principes
    (function timeline() {
      const tl = $('tl');
      const list = $('tl-list');
      if (!tl || !list) return;
  
      const BAR_H = 44, GAP = 8, PAD = 12;
  
      // Dates : tout est converti une fois en « mois absolus » (année × 12 + mois)
      const now = new Date();
      const nowM = now.getFullYear() * 12 + now.getMonth() + (now.getDate() - 1) / 30;
      const toM = (s) => { const [y, m, d = 1] = s.split('-').map(Number); return y * 12 + (m - 1) + (d - 1) / 30; };
      const monthFmt = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric' });
      const dayFmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      const fmtDay = (s) => { const [y, m, d] = s.split('-').map(Number); return dayFmt.format(new Date(y, m - 1, d)); };
      const fmt = (s) => { const [y, m] = s.split('-').map(Number); return monthFmt.format(new Date(y, m - 1, 1)); };
  
      // Données dérivées, calculées une fois (les objets de TIMELINE ne sont jamais modifiés)
      const ITEMS = TIMELINE.map((it, idx) => {
        const ms = it.row === 'perso' || !it.end;
        const s = toM(it.start);
        return {
          ...it, idx, ms, s,
          e: ms ? s : (it.end === 'now' ? nowM : toM(it.end) + 1),
          when: (it.approx ? '≈ ' : '') + (ms ? (it.start.length > 7 ? fmtDay(it.start) : fmt(it.start))
            : `${fmt(it.start)} – ${it.end === 'now' ? 'aujourd’hui' : fmt(it.end)}`)
        };
      });
      const ROW_BY_ID = Object.fromEntries(ROWS.map((r) => [r.id, r]));
      const BY_ROW = ROWS.map((r) => ({ r, items: ITEMS.filter((i) => i.row === r.id) }));
  
      // Étendue : de la première année à l'année en cours (ou la dernière date)
      const yrs = TIMELINE.map((i) => +i.start.slice(0, 4))
        .concat(TIMELINE.filter((i) => i.end && i.end !== 'now').map((i) => +i.end.slice(0, 4)), [now.getFullYear()]);
      const minY = Math.min(...yrs), maxY = Math.max(...yrs);
      const nYears = maxY - minY + 1;
      const x0M = minY * 12;
  
      // Place les éléments d'une ligne sur des « couloirs » pour éviter les chevauchements
      function layoutRow(items, px, W) {
        const lanesEnd = [];
        const placed = [...items].sort((a, b) => a.s - b.s).map((i) => {
          let x0, x1, flip = false, bw = 0, short = false;
          if (i.ms) {
            const x = px(i.s);
            const labelW = 28 + Math.min(i.title.length * 6.6, 240);
            flip = x + labelW > W;                     // trop près du bord droit : libellé à gauche
            x0 = flip ? x - labelW + 10 : x - 10;
            x1 = flip ? x + 10 : x + labelW;
          } else {
            x0 = px(i.s);
            bw = Math.max(px(i.e) - x0, 36);
            // Barre trop courte pour son titre : le titre est tronqué (…) et le nom complet apparaît au survol
            const textW = i.title.length * 6.6;
            short = bw < textW + 40 + (i.done ? 18 : 0);   // 40 = marges + icône
            x1 = x0 + bw;
          }
          let lane = lanesEnd.findIndex((end) => end <= x0 - 8);
          if (lane === -1) { lane = lanesEnd.length; lanesEnd.push(0); }
          lanesEnd[lane] = x1;
          return { i, lane, x0, x1, flip, bw, short };
        });
        return { placed, lanes: Math.max(lanesEnd.length, 1) };
      }
  
      // Dessine la chronologie pour la largeur disponible (aucun scroll horizontal)
      function render(total) {
        if (total <= 0) return;                        // vue masquée ou mobile : on ne dessine pas
        const W = total;                               // largeur de la zone des dates
        const YW = W / nYears;                         // largeur d'une année
        const px = (m) => (m - x0M) / 12 * YW;
  
        let html = '<div class="tl-inner"><div class="tl-axis">';
        for (let y = minY; y <= maxY; y++) html += `<span>${y}</span>`;
        html += '</div>';
  
        BY_ROW.forEach(({ r, items }) => {
          const kids = items.filter((i) => i.parent);
          const { placed, lanes } = layoutRow(items.filter((i) => !i.parent), px, W);
          const h = PAD * 2 + lanes * BAR_H + (lanes - 1) * GAP;
          html += `<div class="tl-track row-${r.id}" style="height:${h}px">`;
          placed.forEach(({ i, lane, x0, x1, flip, bw, short }) => {
            const top = PAD + lane * (BAR_H + GAP);
            // Un jalon posé sur cette barre ne doit pas recouvrir son titre : si besoin, le titre passe après les jalons
            const hostKids = kids.filter((k) => k.parent === i.title);
            const textStart = x0 + 29, textEnd = textStart + i.title.length * 6.6;
            const collide = hostKids.some((k) => px(k.e) + 12 > textStart && px(k.e) - 12 < textEnd);
            const shift = collide ? Math.max(...hostKids.map((k) => px(k.e))) + 14 - textStart : 0;
            html += i.ms
              ? `<button class="ms${flip ? ' flip' : ''}" type="button" data-i="${i.idx}" aria-label="${esc(i.title + ', ' + i.when)}" style="left:${px(i.s)}px;top:${top}px">${icon('ms', 'fill')}<span>${esc(i.title)}</span></button>`
              : `<button class="bar${i.done ? ' done' : ''}${short ? ' short' : ''}" type="button" data-i="${i.idx}" aria-label="${esc(i.title + ', ' + i.when)}" style="left:${x0}px;width:${bw}px;top:${top}px">${icon(r.icon)}<span class="bt"${shift > 0 ? ` style="margin-left:${shift}px"` : ''}>${esc(i.title)}</span>${short ? `<span class="ms-tip"><b>${esc(i.title)}</b><i>${esc(i.when)}</i></span>` : ''}</button>`;
          });
          // Jalons posés sur une barre : le nom apparaît au survol et au focus, et reste cliquable
          kids.forEach((k) => {
            const host = placed.find((pl) => pl.i.title === k.parent);
            if (!host) return;
            const top = PAD + host.lane * (BAR_H + GAP);
            html += `<button class="ms-in" type="button" data-i="${k.idx}" aria-label="${esc(k.title + ', ' + k.when)}" style="left:${px(k.e)}px;top:${top}px">${icon('ms', 'fill')}<span class="ms-tip"><b>${esc(k.title)}</b><i>${esc(k.duration || k.when)}</i></span></button>`;
          });
          html += '</div>';
        });
  
        const todayX = px(nowM);
        html += `<div class="tl-today${todayX + 90 > total ? ' flip' : ''}" style="left:${todayX}px"><span>Aujourd’hui</span></div></div>`;
  
        tl.style.setProperty('--yw', YW + 'px');
        tl.innerHTML = html;
      }
  
      // Redessine quand la largeur change (affichage de la vue, redimensionnement, orientation…).
      // Le rendu est reporté à l'image suivante : modifier la hauteur de l'élément observé
      // directement dans le callback déclencherait l'erreur « ResizeObserver loop ».
      let lastW = 0, pending = 0;
      new ResizeObserver(() => {
        if (pending) return;
        pending = requestAnimationFrame(() => {
          pending = 0;
          const w = tl.clientWidth;
          if (Math.abs(w - lastW) > 1) { lastW = w; render(w); }
        });
      }).observe(tl);
  
      // Version liste (mobile)
      list.innerHTML = BY_ROW.map(({ r, items }) =>
        `<div class="tl-group"><h3>${icon(r.icon)}${r.label}</h3><ol>` +
        [...items].sort((a, b) => b.s - a.s).map((i) =>
          `<li><button class="tl-item row-${r.id}" type="button" data-i="${i.idx}"><span class="when">${i.when}</span><span class="what">${esc(i.title)}</span></button></li>`
        ).join('') +
        '</ol></div>'
      ).join('');
  
      function openItem(i) {
        const r = ROW_BY_ID[i.row];
        const meta = [
          { k: 'Type', v: icon(r.icon) + r.type },
          { k: i.ms ? 'Date' : 'Période', v: i.when }
        ];
        if (i.role) meta.push({ k: 'Poste', v: esc(i.role) });
        if (i.contract) meta.push({ k: 'Contrat', v: esc(i.contract) });
        if (i.duration) meta.push({ k: 'Durée', v: esc(i.duration) + (i.approx ? ' (dates estimées)' : '') });
        if (i.place) meta.push({ k: 'Lieu', v: esc(i.place) });
        if (i.url) meta.push({ k: 'Site', v: `<a href="${esc(i.url)}" target="_blank" rel="noopener noreferrer">${esc(i.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</a>` });
        if (i.skills && i.skills.length) meta.push({ k: 'Compétences', full: true, v: chips(i.skills) });
        const intro = i.ms ? 'Pourquoi ce jalon' : "Ce que j'y ai fait";
        // Deux casquettes renseignées : onglets sous le texte d'introduction, et le résultat
        // reste affiché en bas quel que soit l'onglet. Sinon : fiche simple.
        const roleTabs = Boolean(i.designer || i.owner);
        const retiens = { h: "Ce que j'en retiens", p: i.example, accent: true };
        const tabs = i.tabs || (roleTabs ? [
          { label: 'Résumé', sections: [{ h: 'Points clés', list: i.highlights }] },
          i.designer && { label: 'Product Designer', sections: [{ h: 'Côté design', list: i.designer }] },
          i.owner && { label: 'Product Owner', sections: [{ h: 'Côté produit', list: i.owner }] }
        ].filter(Boolean) : null);
        const tabbed = Boolean(tabs);
        openModal({
          keyHtml: `${icon(r.icon)}<b>${r.type}</b>`,
          title: i.role ? `${i.role} · ${i.title}` : i.title,
          sections: [{ h: intro, p: i.desc, list: i.bullets }, ...(tabbed ? [] : [retiens])],
          tabs,
          pinned: tabbed ? retiens : null,
          cover: i.image ? {
            src: i.image,
            alt: i.imageAlt || (i.url ? `Aperçu de ${i.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} (ouvre le site dans un nouvel onglet)` : ''),
            href: i.url
          } : null,
          meta
        });
      }
  
      openTimelineByTitle = (title) => { const i = ITEMS.find((x) => x.title === title); if (i) openItem(i); };
  
      [tl, list].forEach((root) => root.addEventListener('click', (e) => {
        const b = e.target.closest('[data-i]');
        if (b) openItem(ITEMS[+b.dataset.i]);
      }));
    })();
  
    /* ==================================================================
       7. Projets / epics (section 04)
       ================================================================== */
    const EPIC_BY_KEY = new Map(EPICS.map((e) => [e.key, e]));
    const ticketIcon = (k) => icon(ticketType(k), 'ty-' + ticketType(k));
  
    function viz(v) {
      if (!v) return '';
      if (v.type === 'parcours') {
        const hasDiff = v.lanes.some((l) => l.steps.some((s) => s.diff));
        return `<div class="viz"><p class="viz-cap">${esc(v.caption)}</p>` +
          v.lanes.map((l) => `<div class="lane"><span class="lane-label">${esc(l.label)}</span>` +
            l.steps.map((s, i) => (i ? '<span class="sep" aria-hidden="true">›</span>' : '') +
              `<span class="step${s.diff ? ' diff' : ''}">${esc(s.t)}</span>`).join('') + '</div>').join('') +
          (hasDiff ? '<p class="viz-note">Étapes en bleu : là où les parcours divergent.</p>' : '') + '</div>';
      }
      if (v.type === 'frise') {
        return `<div class="viz"><p class="viz-cap">${esc(v.caption)}</p><ol class="frise">` +
          v.items.map((it) => `<li class="fr-item">${icon('ms', 'fill fr-ms')}<span class="fr-l">${esc(it.l)}</span><span class="fr-w">${esc(it.w)}</span></li>`).join('') +
          '</ol></div>';
      }
      return '';
    }
  
    function openEpic(key) {
      const e = EPIC_BY_KEY.get(key);
      if (!e) return;
      openModal({
        keyHtml: `${icon('epic', 'ty-epic')}<b>${esc(e.key)}</b> · Epic`,
        title: e.title,
        visualHtml: viz(e.visual),
        cover: e.image ? { src: e.image, alt: e.imageAlt || '', href: e.url, position: e.imagePosition } : null,
        sections: [
          { h: 'Contexte', p: e.context },
          { h: 'Enjeu', p: e.problem },
          { h: 'Mon rôle', p: e.did },
          { h: 'Résultat', p: Array.isArray(e.result) ? null : e.result, list: Array.isArray(e.result) ? e.result : null, accent: true }
        ],
        comments: { ref: e.key, title: e.title, items: COMMENTS[e.key] },
        meta: [
          { k: 'Statut', v: `<span class="lozenge ${e.status}">${STATUS[e.status]}</span>` },
          { k: 'Rôle', v: esc(e.role) },
          { k: 'Période', v: esc(e.period) },
          { k: 'Équipe', v: esc(e.team) },
          ...(e.tickets.length ? [{ k: 'Tickets liés', full: true,
            v: e.tickets.map((k) => `<button class="rel" type="button" data-ticket="${esc(k)}">${ticketIcon(k)}<b>${esc(k)}</b><span>${esc(ticketTitle(k))}</span></button>`).join('') }] : [])
        ]
      });
    }
  
    const epicsRoot = $('epics');
    if (epicsRoot) {
      // role="listitem" sur un conteneur, et non sur le bouton : sinon le bouton perd son rôle de bouton
      epicsRoot.innerHTML = EPICS.map((e) => `
        <div role="listitem"><button class="epic" type="button" data-epic="${esc(e.key)}">
          <span class="e-key">${icon('epic', 'ty-epic')}${esc(e.key)}</span>
          <span class="e-main">
            <span class="e-title">${esc(e.title)}</span>
            <span class="e-flow"><span class="sr">Avant : </span><span>${esc(e.before)}</span><span class="arrow" aria-hidden="true">→</span><span class="sr">Après : </span><span class="after">${esc(e.after)}</span></span>
            <span class="e-tickets">${e.tickets.map((k) => `<span class="chip">${ticketIcon(k)}${esc(k)}</span>`).join('')}</span>
          </span>
          <span class="e-side">
            <span class="lozenge ${e.status}">${STATUS[e.status]}</span>
            ${e.progress == null ? '' : `<span class="e-progress" role="img" aria-label="Avancement ${e.progress} %"><i style="--p:${e.progress}%"></i></span>
            <span class="e-pct">${e.progress} %</span>`}
          </span>
        </button></div>`).join('');
  
      epicsRoot.addEventListener('click', (ev) => {
        const b = ev.target.closest('.epic');
        if (b) openEpic(b.dataset.epic);
      });
    }
  
    /* ==================================================================
       8. Backlog « Ce qui m'attend » (section 05) et contact (section 06)
       ================================================================== */
    const NEXT_BY_KEY = new Map(NEXT.map((n) => [n.key, n]));
    const backlog = $('backlog');
    if (backlog) {
      backlog.innerHTML = `<div class="bl-head"><h3>Backlog</h3><span class="count">${NEXT.length}</span></div>` +
        NEXT.map((n) => `
        <button class="bl-row" type="button" data-next="${esc(n.key)}">
          <span class="bl-key">${icon(n.type, 'ty-' + n.type)}${esc(n.key)}</span>
          <span class="bl-main">
            <span class="bl-title">${esc(n.title)}</span>
            <span class="t-tags">${chips(n.labels)}</span>
          </span>
          <span class="bl-right">
            <span class="horizon">${esc(n.horizon)}</span>
            <span class="lozenge todo">À faire</span>
            ${icon(n.prio, 'prio-' + n.prio)}
            ${AVATAR}
          </span>
        </button>`).join('');
  
      backlog.addEventListener('click', (ev) => {
        const b = ev.target.closest('.bl-row');
        const n = b && NEXT_BY_KEY.get(b.dataset.next);
        if (!n) return;
        openModal({
          keyHtml: `${icon(n.type, 'ty-' + n.type)}<b>${esc(n.key)}</b> · ${TYPES[n.type]}`,
          title: n.title,
          sections: [
            { h: "Pourquoi ça m'attire", p: n.why },
            { h: "Ce que j'y apporterais", p: n.bring, accent: true }
          ],
          meta: [
            { k: 'Statut', v: '<span class="lozenge todo">À faire</span>' },
            prioMeta(n.prio),
            { k: 'Horizon', v: esc(n.horizon) },
            ASSIGNEE,
            { k: 'Libellés', full: true, v: chips(n.labels) }
          ]
        });
      });
    }
  
    const links = $('links');
    if (links) {
      const rows = [
        { icon: 'mail', k: 'E-mail', v: CONTACT.email, href: 'mailto:' + CONTACT.email },
        { icon: 'link', k: 'LinkedIn', v: CONTACT.linkedin.replace(/^https?:\/\//, ''), href: CONTACT.linkedin, ext: true },
        { icon: 'doc',  k: 'CV', v: 'Télécharger mon CV', href: CONTACT.cv, ext: true }
      ];
      links.innerHTML = rows.map((r) => `
        <li><a class="link-row" href="${esc(r.href)}"${r.ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>
          ${icon(r.icon)}
          <span><span class="k">${r.k}</span><span class="v">${esc(r.v)}</span></span>
          ${icon('link', 'go')}
        </a></li>`).join('');
    }
  
    // Formulaire « Créer un ticket » : ouvre la messagerie, tout pré-rempli
    const form = $('ticket-form');
    if (form) {
      // Ligne de statut (role="status") : annoncée par les lecteurs d'écran quand son texte change
      const note = $('tf-note');
      const NOTE_DEFAULT = note.textContent;
      form.addEventListener('reset', () => { note.textContent = NOTE_DEFAULT; });
      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        note.textContent = `Ta messagerie va s’ouvrir. Sinon, écris-moi à ${CONTACT.email}.`;
        const { type, summary, desc } = form.elements;
        const subject = `[${type.value}] ${summary.value.trim()}`;
        // CRLF : le saut de ligne attendu dans un lien mailto (RFC 6068), mieux compris par Outlook
        const body = `${desc.value.trim()}\r\n\r\n— Type de demande : ${type.value}`;
        window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
    }
  
    // Année de la sidebar
    const year = $('year');
    if (year) year.textContent = new Date().getFullYear();
  
    // Le chiffre de l'accueil suit le nombre de projets réellement présents dans EPICS
    const nProj = $('stat-projects');
    if (nProj) nProj.textContent = EPICS.length;
  
    /* ==================================================================
       8b. Principes (section 01)
       ================================================================== */
    (function principles() {
      const root = $('principles');
      const figs = $('figures');
      if (!root || !figs) return;
  
      root.innerHTML = PRINCIPLES.map((p, n) => {
        let proof = '';
        if (p.proof) {
          const ep = p.proof.kind === 'epic' ? EPIC_BY_KEY.get(p.proof.ref) : null;
          const head = ep
            ? `${icon('epic', 'ty-epic')}<b>${esc(ep.key)}</b><span>${esc(ep.title)}</span>`
            : `${icon('brief')}<b>Expérience</b><span>${esc(p.proof.ref)}</span>`;
          proof = `<button class="pproof" type="button" data-kind="${esc(p.proof.kind)}" data-ref="${esc(p.proof.ref)}">
            <span class="pp-head"><span class="pp-label">Sur un vrai projet</span></span>
            <span class="pp-head">${head}</span>
            <span class="pp-fact">${esc(p.proof.fact)}</span>
            <span class="pp-go">${p.proof.kind === 'epic' ? 'Lire l’étude de cas' : 'Voir l’expérience'} →</span>
          </button>`;
        }
        return `<li class="pcard reveal">
          <div class="pcard-top">
            <span class="pico"><svg class="ico" aria-hidden="true"><use href="#${esc(p.icon)}"/></svg></span>
            <span class="pnum">Principe ${n + 1}</span>
          </div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.text)}</p>
          ${proof}
        </li>`;
      }).join('');
  
      figs.innerHTML = RESULTS.map((r) => `
        <div class="fig" role="listitem">
          <span class="fig-n">${esc(r.n)}</span>
          <span class="fig-l">${esc(r.l)}</span>
          <span class="fig-src">${esc(r.src)}</span>
        </div>`).join('');
  
      root.addEventListener('click', (e) => {
        const b = e.target.closest('.pproof');
        if (!b) return;
        if (b.dataset.kind === 'epic') openEpic(b.dataset.ref);
        else openTimelineByTitle(b.dataset.ref);
      });
    })();
  
    /* ==================================================================
       9. Navigation par vues (sidebar). Une seule vue visible, adresse #travail, #projets…
       ================================================================== */
    (function navigation() {
      const main = $('main');
      const views = [...document.querySelectorAll('.view')];
      const navLinks = [...document.querySelectorAll('[data-nav]')];
      const VIEW_BY_ID = new Map(views.map((v) => [v.id, v]));
      let current = null;
      let revealTimers = [];
  
      function show(id, { moveFocus = false } = {}) {
        if (!VIEW_BY_ID.has(id)) id = 'hero';
        if (id === current) return;
        current = id;
        const view = VIEW_BY_ID.get(id);
  
        views.forEach((v) => v.classList.toggle('is-active', v === view));
        navLinks.forEach((l) => {
          const on = l.dataset.nav === id;
          l.classList.toggle('is-active', on);
          if (on) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
        });
  
        main.scrollTop = 0;
  
        // Les blocs de la vue réapparaissent l'un après l'autre à chaque ouverture.
        // Les minuteurs de la vue précédente sont annulés (sinon, en naviguant vite,
        // ils se déclenchent en retard et cassent l'échelonnement).
        revealTimers.forEach(clearTimeout);
        revealTimers = [];
        view.querySelectorAll('.reveal').forEach((el, i) => {
          el.classList.remove('is-in');
          revealTimers.push(setTimeout(() => el.classList.add('is-in'), 60 + i * 90));
        });
  
        const label = navLinks.find((l) => l.dataset.nav === id);
        const name = label ? label.querySelector('.lbl').textContent : '';
        document.title = id === 'hero' || !name ? 'Souky' : 'Souky · ' + name;
  
        // Le contenu a changé sans rechargement : on y place le focus
        // pour que clavier et lecteurs d'écran repartent du début de la vue.
        if (moveFocus) view.focus({ preventScroll: true });
      }
  
      window.addEventListener('hashchange', () => {
        if (modal.open) modal.close();             // bouton « précédent » du navigateur avec la modale ouverte
        show(location.hash.slice(1), { moveFocus: true });
      });
      // Lien d'évitement : place le focus sur la vue affichée (sans passer par le hash, qui sert à la navigation)
      $('skip').addEventListener('click', (e) => {
        e.preventDefault();
        VIEW_BY_ID.get(current).focus({ preventScroll: true });
      });
  
      show(location.hash.slice(1));
    })();
  
    /* ==================================================================
       10. Thème sombre / clair. Sombre par défaut, le choix est mémorisé dans le navigateur.
       ================================================================== */
    (function theme() {
      const root = document.documentElement;
      const btns = [...document.querySelectorAll('.theme-btn')];
      const meta = $('meta-theme');
      const BAR = { dark: '#0d0d0d', light: '#f5f5f7' };   // couleur de la barre du navigateur sur mobile
  
      function apply(t) {
        root.dataset.theme = t;
        if (meta) meta.content = BAR[t];
        const toLight = t === 'dark';                       // le bouton propose l'autre mode
        const label = toLight ? 'Passer en mode clair' : 'Passer en mode sombre';
        btns.forEach((b) => {
          b.setAttribute('aria-label', label);
          b.title = label;
          b.querySelector('use')?.setAttribute('href', toLight ? '#i-sun' : '#i-moon');
          const lbl = b.querySelector('.lbl');
          if (lbl) lbl.textContent = toLight ? 'Mode clair' : 'Mode sombre';
        });
      }
  
      btns.forEach((b) => b.addEventListener('click', () => {
        const next = root.dataset.theme === 'light' ? 'dark' : 'light';
        apply(next);
        try { localStorage.setItem('theme', next); } catch (e) { /* stockage indisponible : choix non mémorisé */ }
      }));
  
      apply(root.dataset.theme === 'light' ? 'light' : 'dark');
    })();
  })();
  