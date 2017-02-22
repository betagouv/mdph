# Spécifications fonctionnelles générales IMPACT / mdph.beta.gouv.fr

## Table des matières
<!-- MarkdownTOC -->

- Contexte
	- IMPACT : une expérimentation pour accompagner les MDPH dans le processus de gestion des demandes
	- Le programme SI MDPH et l'harmonisation des processus SI et métier
- Présentation générale
	- Persona identifiées
	- Autres parties prenantes non identifiées en tant que persona
- Principales fonctionnalités
	- Pour la MDPH
	- Pour une personne demandant une compensation du handicap
	- Autres fonctionnalités de mdph.beta.gouv

<!-- /MarkdownTOC -->

## Contexte

### IMPACT : une expérimentation pour accompagner les MDPH dans le processus de gestion des demandes

Soumis à une forte charge - entre 600 et 800 dossiers par an et par ETP - les MDPH peinent à offrir un service de qualité à leurs usagers. Les délais moyens de traitement sont aujourd’hui compris entre 3 et 9 mois, avec pour causes identifiées :

- Une mauvaise qualité du flux entrant : demandes inéligibles, dépôt de plusieurs demandes, nouvelles demandes suite à refus
- Une difficulté à compléter le dossier : nombreuses itérations pour compléter le dossier, temps de transfert des informations complémentaires, temps de vérification de la qualité des données,
- Une mauvaise communication client : notification de refus peu ou pas accompagnée, décision dissociée de la réalité de l’offre départementale


IMPACT est un outil numérique destiné à limiter ces problèmes en fiabilisant le flux entrant et en améliorant le dialogue au sein de l’écosystème : usager, médecins, MDPH, établissements partenaires, équipe pluridisciplinaire d’évaluation (EPE),... Il se fonde sur un partage plus effectif des données personnelles de santé, compatible avec les exigences de sécurité renforcées.


L’outil avait pour vocation initiale d'offrir à toute personne aidant ou en situation de handicap :

- Un questionnaire dynamique aligné sur la structure Vie Personnelle, Vie Professionnelle, Vie Scolaire
- Un quitus des droits profilé selon la situation, et selon qu’il s’agit d’une nouvelle demande ou d’un renouvellement :
	* Carte d’invalidité (CIN),
	* Carte de Priorité Personne Handicapée (CPPH),
	* Carte de Stationnement (CS),
	* Allocation Adulte Handicapé (AAH),
	* Prestation de Compensation du Handicap (PCH),
	* Allocation Personnelle Autonomie (APA),
	* Majoration pour la Vie Autonome (MVA),
	* Allocation Compensatrice Tierce Personne (ACTP),
	* Allocation Compensatrice Frais Professionnels (ACFP),
	* Allocation Éducation Enfant Handicapé (AEEH),
	* Allocation de Présence Parentale (APP),
	* Allocation Personnalisée d’Autonomie (APA),
	* Allocation Supplémentaire d’Invalidité (ASI),
	* Reconnaissance de la Qualité de Travailleur Handicapé (RQTH),
	* avec identification des pièces obligatoires et complémentaires à fournir
- Un espace personnel permettant de sauvegarder ses données, de suivre son dossier et de faciliter le renouvellement des droits
- La possibilité pour un membre de l’écosystème de contribuer simplement à un dossier, en remplissant un formulaire (ex. Certificat Médical) ou en téléchargeant une pièce, avec inscription en ligne et certification du compte a posteriori par la MDPH.

Parallèlement, aux personnels de la MDPH, l'outil devait permettre :

- La gestion des comptes membres de l’écosystème : chargement massif de comptes, certification de compte a posteriori, blocage de compte
- La visualisation des demandes en cours, selon leur statut (instruction, évaluation, décision)
- La création et le dispatching automatique de tâches dont la complétude détermine les transitions de phases : 
	 * Phase réception : collecte & vérification des pièces obligatoires,
	 * Phase instruction : collecte & vérification de pièces complémentaires (création manuelle et automatique de tâches “solliciter un contributeur”), orientation vers l’équipe d’évaluation compétente,
	 * Phase évaluation : analyse de la situation selon un l’Outil d’Aide à l’Évaluation (déclinaison du GEVA), construction de la réponse et traçabilité renforçant la robustesse des décisions
	 * Phase décision : synthèse des recommandations, enregistrement de la décision la CDAPH, communication client.
- L’ajout de pièces jointes (numérisation de courriers, comme un compte-rendu de prise en charge) ou la saisie de formulaires associés aux dossiers, avec choix de l’attribut “visible (ou pas) de l’utilisateur”
- Une communication client semi-automatique : messages pré-formatés permettant des relances sur PJ, des réponses types en cas de refus...

### Le programme SI MDPH et l'harmonisation des processus SI et métier

La Caisse nationale de solidarité pour l'autonomie (CNSA) a défini un tronc commun du métier des MDPH. Ce document pose un cadre qui définit les points structurants du métier des MDPH dans une logique d’harmonisation des pratiques. Il est le résultat d’un travail de co-conception avec une quarantaine de MDPH et d’une concertation plus large auprès de l’ensemble des MDPH.

IMPACT est un outil numérique expérimental permettant de proposer une première solution technique aux macro-processus suivants :

- Évaluer et aiguiller les dossiers
- Évaluer, élaborer des réponses et des plans personnalisés de compensation (PPC).

## Présentation générale

Développé par le secrétariat général pour la modernisation de l’action publique (SGMAP), IMPACT est le produit d'un développement AGILE en étroite collaboration avec les MDPH pilotes de l'expérimentation : 

- 14 - Calvados
- 17 - Charente-Maritime
- 54 - Meurthe-et-Moselle

### Persona identifiées

#### Nicolas VINCENT
                                                                                                       
**Présentation :**

- Employé à la FNAC
- 28 ans
- Personne en situation de handicap
- Persona principal

**Contexte :**

- Malentendant (de naissance
- Besoin de garder un lien professionnel
- Habitué à ses outils d’accessibilité
- Habitué à l'informatique

**Objectifs :**

- Accéder à ses droits
- Suivre sa demande
                    
**Freins :**

- Formulaire de demande long et difficile à remplir
- Une re-saisie annuelle est obligatoire


#### Pauline LITOTE

**Présentation :**

- Agent MDPH 17 depuis 6 ans
- 35 ans
- Chef d'orchestre des dossiers MDPH
- Persona principal

**Contexte :**

- A un bureau avec 3 autres agents
- S'occupe des dossiers adultes
- Traite des dossiers toute la journée
- Peu à l'aise avec l'informatique

**Objectifs :**

- Évaluer le plus fidèlement possible les dossiers
- Il n'y a pas de barèmes, c'est elle qui choisit le parcours de décision du dossier
- Suivre le dossier jusqu'au bout
- Demander les pièces manquantes

**Freins :**

- Habituée au papier
- Peur d'un outil qui ne répond pas à toutes les demandes

#### Laetitia MONNEREAU

**Présentation :**

- Membre d'une association
- 32 ans
- Experte bienveillante
- Persona principal

**Contexte :**

- Connait le monde du handicap
- Connait les procédures
- Alerte parfois sur des situations difficiles
- Est particulièrement proche des utilisateurs

**Objectifs :**

- Aider des personnes en situation de handicap à obtenir des droits
- Remplir le formulaire pour les gens en incapacité de le faire

**Freins :**

- A peur du nouveau formulaire

#### Sylvain DUCHENE

**Présentation :**

- Référent informatique MDPH 54
- 45 ans
- M Bricolage de la MDPH depuis 24 ans
- Persona secondaire

**Contexte :**

- A un bureau
- M Bricolage de la MDPH
- Gère la partie de gestion des données
- Réfractaire au changement

**Objectifs :**

- Aider ses collaborateurs
- être autonome sur l'administration de ses outils

**Freins :**

- Peur d'une mauvaise intégration avec son système
- Pense que l'informatique est trop compliqué pour son public

### Autres parties prenantes non identifiées en tant que persona

#### Le médecin généraliste

Le médecin généraliste de la personne effectuant une demande en ligne est également sollicitée :

[Dépôt du certificat leur interaction dans le processus ici]

#### Les partenaires

Les partenaires associatifs / médicaux sociaux (assistante sociale / aide-ménagère ?) peuvent aussi être sollicités :

[Décrire brièvement leur interaction dans le processus ici]

#### Les développeurs du produit

Le SGMAP, Octo, la CNSA ont joué un rôle dans le développement du produit et celui-ci doit leur rendre des services :

[Rôle de chacun et ses ambitions :

- SGMAP et Octo : mettre en place rapidement une solution viable de téléservice pour le dépôt des demandes en MDPH
- CNSA : proposer un prototype pour des MDPH pilotes afin de faire émerger une solution mature de téléservice]


## Principales fonctionnalités

### Pour la MDPH

#### La possibilité de construire un espace personnalisé par MDPH

[Présenter l'arborescence de mdph.beta.gouv.fr et la possibilité de créer un espace pour chaque MDPH]

#### La possibilité de traiter la réception des demandes de droits

[Traitement des demandes :

- workflow de traitement
- approbation / refus de PJ
- ...]

#### Accompagner les MDPH dans l'évaluation du handicap (soutien à l'évaluation)

[Mécanisme mis en place pour l'aide à la prise de décision ?]

#### La possibilité de gérer les utilisateurs

[Gestion des utilisateurs :

- utilisateurs internes
- utilisateurs externes
-...]

#### Autres fonctionnalités

[Décrire ici les autres fonctionnalités

- Gestion des secteurs
- Dispatch des demandes
- Classement des documents]

### Pour une personne demandant une compensation du handicap

#### Inscription au site pour suivre sa demande

[Présenter brièvement le mode d'inscription :

- nécessité de fournir un email + un mot de passe
- formulaire d'inscription en ligne (données à caractère personnel ?)
- email envoyé à la personne s'inscrivant (besoin d'une validation ?)
- notifications au fil du parcours (demande validée / réception du cerfa complété)
- ...]

#### Formulaire de demande

[Présenter brièvement le mode de saisie numérique :

- l'approche par module (et le parallèle du formulaire de demande):
	* Bénéficiaire // A) Votre identité
	* Vie quotidienne // B) Votre vie quotidienne
	* Vie scolaire // C) Vie scolaire ou étudiante
	* Vie au travail // D) Votre situation professionnelle
	* Vie de votre aidant familial // F) Vie de votre aidant familial
	* Personne vous aidant dans cette démarche // Équivalent Cerfa ?
	* Situations particulières // Équivalent Cerfa ?
- Finalisation de la demande // E) Expression des demandes et des droits + Pièces justificatives
- Production du Cerfa PDF // (Nouveau document à mettre à jour ?)
- Demande de certificat à son médecin
	* usager : enregistrement de l'email du médecin
	* médecin : réception d'un email avec un lien pseudo sécurisé (hashé + email du patient)
	* médecin : upload du formulaire
	* médecin : réception d'un email de demande de confirmation de la soumission avec lien sécurisé
	* usager : constater que le document a été ajouté
- Demande de pièces justificatives à des partenaires des MDPH ?
	* ...
- ...]

### Autres fonctionnalités de mdph.beta.gouv

[Statistiques de fréquentation, nombre de traitement des dossiers...]
