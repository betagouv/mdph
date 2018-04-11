# Documentation fonctionnelles générales MDPH en ligne

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


#### Usagers finaux :

- Un questionnaire dynamique aligné sur la structure Vie Personnelle, Vie Professionnelle, Vie Scolaire
- Un espace personnel permettant de sauvegarder ses données, de suivre son dossier et de faciliter le renouvellement des droits

Une fonctionnalité expérimentale donne :
- La possibilité pour un membre de l’écosystème de contribuer simplement à un dossier, en remplissant un formulaire (ex. Certificat Médical) ou en téléchargeant une pièce, avec inscription en ligne et certification du compte a posteriori par la MDPH.

#### Agents des MDPH :

- La visualisation des demandes en cours, selon leur statut (instruction, évaluation, décision)
- La validation des pièces jointes fournies par l'utilisateur en fonction de sa demande
- La demande de pièces jointes complémentaires
- Le dispatching automatique des demandes par agents (en fonction des secteurs et du type des demandes - adultes/enfants)

Une fonctionnalité expérimentale permet :
- La gestion des comptes membres de l’écosystème : chargement massif de comptes, certification de compte a posteriori, blocage de compte
- L'outil de soutien à l'évaluation en lien avec le GEVA

### Le programme SI MDPH et l'harmonisation des processus SI et métier

_La Caisse nationale de solidarité pour l'autonomie (CNSA) a défini un tronc commun du métier des MDPH. Ce document pose un cadre qui définit les points structurants du métier des MDPH dans une logique d’harmonisation des pratiques. Il est le résultat d’un travail de co-conception avec une quarantaine de MDPH et d’une concertation plus large auprès de l’ensemble des MDPH._

_IMPACT est un outil numérique expérimental permettant de proposer une première solution technique aux macro-processus suivants :

- Évaluer et aiguiller les dossiers
- Évaluer, élaborer des réponses et des plans personnalisés de compensation (PPC)._

## Présentation générale

Développé par le secrétariat général pour la modernisation de l’action publique (SGMAP), MDPH en ligne est le produit d'une étroite collaboration avec les MDPH pilotes de l'expérimentation : 

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

_**Expériemental**_ Le médecin généraliste pourait directement fournir un certificat médical en appui de la demande. 

#### Les fournisseurs

_**Expériemental**_ Les fournisseurs (garagistes...) pourraient directement fournir un devis en appui de la demande.

#### Les administrateurs du produit

L'administrateur du produit :
- ouvre de (nouvelles MDPH)[https://github.com/sgmap/mdph/wiki/Comment-ouvrir-une-nouvelle-MDPH] 
- pilote le service sur la base des métriques d'usage.

## Principales fonctionnalités
### Pour un usager final 

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

### La MDPH 
#### Traite les demandes reçues
##### En gérant un flux de demandes reçues 

- L'agent assigné au secteur reçoit une alerte mail à chaque nouvelle demande reçue. Cette alerte contient le pdf en pj et un lien vers la demande.
- Le lien vers la demande permet d'accéder (après identification) au détail de la demande reprenant les réponses de l'usager final.

> La demande peut-être transférée à un autre agent d'un autre secteur.

- L'agent prépare l'accusé de réception, en vérifiant la validité et la lisibilité des pj fournies par l'utilisateur final.

> L'agent peut, à cette étape, demander des pièces justificatives complémentaires. La demande est alors "mise en attente".

- L'agent génère un accusé de réception et l'envoie automatiquement par mail.

> L'usager reçoit un mail envoyé par l'adresse impact@sgmap.fr _**à modifier**_. Le ReplyTo de cet email est une adresse générique de la MDPH concernée par la demande _**à vérifier**_. 

- La demande est "validée".
- L'agent peut télécharger les demandes reçues. 
- L'agent peut archiver les demandes reçues.

##### En préparant l'évaluation des demandes 

- L'agent peut répondre aux questions de l'outil de soutien (réparties entre 20 catégories et 1500 réponses possibles) pour préparer le GEVA et le CDAPH.

#### Paramètre son compte 
##### En créant des comptes à ses agents instructeurs

- _**à Sylvain**_

##### En gérant ses secteurs et le dispatch de ses demandes

- La MDPH associe les codes postaux des communes qu'elle couvre à des secteurs. 
- La MDPH répartie ses agents instructeurs par secteur.

> Les agents instructeurs sont répartis par pôle Adultes / Enfants. Cette répartition peut être faite par des mailing list génériques ou des en affectant chaque agent à un secteur et un pôle. 

- Les demandes sont ensuite automatiquement dispatchées par secteur (en fonction du code postal) et par pôle (en fonction de l'âge du demandeur).

#### En gérant le classement des documents dans la GED

- **_à Sylvain_**


### Pour l'administrateur

- L'administrateur peut suivre les statistiques de demandes sur https://mdphenligne.cnsa.fr/stats

**_Expérimental_** 
- L'administrateur peut créer une nouvelle MDPH.
  * pres-requis : le logo, l'image de fond, le telephone, l'adresse mail, la liste des sites (nom, adresse, telephone, email, horaire et coordonnées geographiques)
  * Ajouter les images dans client/asset/images (logo*.jpg et *_bg.jpg)
  * Ajouter un document avec le format
  
  ''' json
  {
    "name" : "",
    "zipcode" : "",
    "logo" : "",
    "enabled" : true,
    "opened" : true,
    "locations" : [ 
        {
            "name" : "",
            "headquarters" : true,
            "email" : "",
            "address" : "",
            "coordinates" : {
                "coordx" : ,
                "coordy" : 
            },
            "phone" : "",
            "schedule" : ""
        }
    ],
    "likes" : []
  }
  '''

  * Creer un compte administrateur pour la MPDH en utilisant le lien https://mdph.beta.gouv.fr/mdph/<mdph>/dashboard/utilisateurs/agents
