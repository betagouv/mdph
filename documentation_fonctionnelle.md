# Documentation fonctionnelles générales MDPH en ligne

## Table des matières
<!-- MarkdownTOC -->

- Contexte
	- IMPACT : une expérimentation pour accompagner les MDPH dans le processus de gestion des demandes
		- Usagers finaux
		- Agents des MDPH
	- Le programme SI MDPH et l'harmonisation des processus SI et métier
- Présentation générale
	- Persona identifiées
		- Nicolas VINCENT
		- Pauline LITOTE
		- Laetitia MONNEREAU
		- Sylvain DUCHENE
	- Autres parties prenantes non identifiées en tant que persona
		- Le médecin généraliste
		- Les fournisseurs
		- Les administrateurs du produit
- Principales fonctionnalités
	- L'usager final
		- S'inscrit
		- Instruit sa demande à l'aide des différents formulaires
		- Modifie les paramètre de son compte
	- La MDPH
		- Traite les demandes reçues
		- Paramètre les comptes
		- Paramètre les éléments propres à son mode de fonctionnement
	- L'administrateur \(SGMAP / CNSA\)
    - Ouvre de nouvelles MDPH 
    - Héberger, maintient et améliore le produit

<!-- /MarkdownTOC -->

## Contexte

### IMPACT : une expérimentation pour accompagner les MDPH dans le processus de gestion des demandes

Soumis à une forte charge - entre 600 et 800 dossiers par an et par ETP - les MDPH peinent à offrir un service de qualité à leurs usagers. Les délais moyens de traitement sont aujourd’hui compris entre 3 et 9 mois, avec pour causes identifiées :

- Une mauvaise qualité du flux entrant : demandes inéligibles, dépôt de plusieurs demandes, nouvelles demandes suite à refus
- Une difficulté à compléter le dossier : nombreuses itérations pour compléter le dossier, temps de transfert des informations complémentaires, temps de vérification de la qualité des données,
- Une mauvaise communication client : notification de refus peu ou pas accompagnée, décision dissociée de la réalité de l’offre départementale


MDPH en ligne est le service numérique sur lequel s'est appuyée l'expérimentation IMPACT. Le service vise à réduire les frictions dans le dépôt et l'instruction des demandes gérées par les MDPH en fiabilisant le flux entrant et en améliorant le dialogue au sein de l’écosystème : usager, médecins, MDPH, établissements partenaires, équipe pluridisciplinaire d’évaluation (EPE),... Il se fonde sur un partage plus effectif des données personnelles de santé, compatible avec les exigences de sécurité renforcées.


#### Usagers finaux

- Un questionnaire dynamique aligné sur la structure Vie Personnelle, Vie Professionnelle, Vie Scolaire
- Un espace personnel permettant de sauvegarder ses données, de suivre son dossier et de faciliter le renouvellement des droits

_**Expérimentale**_ :
- Un membre de l’écosystème peut contribuer simplement à un dossier, en remplissant un formulaire (ex. Certificat Médical) ou en téléchargeant une pièce, avec inscription en ligne et certification du compte a posteriori par la MDPH.

#### Agents des MDPH

- La visualisation des demandes en cours, selon leur statut (instruction, évaluation, décision)
- La validation des pièces jointes fournies par l'utilisateur en fonction de sa demande
- La demande de pièces jointes complémentaires
- Le dispatching automatique des demandes par agents (en fonction des secteurs et du type des demandes - adultes/enfants)

_**Expérimentale**_ :

- La gestion des comptes membres de l’écosystème : chargement massif de comptes, certification de compte a posteriori, blocage de compte
- L'outil de soutien à l'évaluation en lien avec le GEVA

### Le programme SI MDPH et l'harmonisation des processus SI et métier

_La Caisse nationale de solidarité pour l'autonomie (CNSA) a défini un tronc commun du métier des MDPH. Ce document pose un cadre qui définit les points structurants du métier des MDPH dans une logique d’harmonisation des pratiques. Il est le résultat d’un travail de co-conception avec une quarantaine de MDPH et d’une concertation plus large auprès de l’ensemble des MDPH._

_MDPH en ligne est un outil numérique expérimental permettant de proposer une première solution technique aux macro-processus suivants :_

- _Évaluer et aiguiller les dossiers_
- _Évaluer, élaborer des réponses et des plans personnalisés de compensation (PPC)._

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

_**Expérimental**_ Le médecin généraliste pourrait directement fournir un certificat médical en appui de la demande. 

#### Les fournisseurs

_**Expérimental**_ Les fournisseurs (garagistes...) pourraient directement fournir un devis en appui de la demande.

#### Les administrateurs du produit

L'administrateur du produit :

- ouvre de nouvelles MDPH (voir [https://github.com/sgmap/mdph/wiki/Comment-ouvrir-une-nouvelle-MDPH]),
- pilote le service sur la base des métriques d'usage.

## Principales fonctionnalités
### L'usager final
#### S'inscrit
Pour effectuer une première demande, l'utilisateur doit s'inscrire sur le site. Pour cela, il doit :

- fournir un email + un mot de passe
- remplir le formulaire d'inscription en ligne qui contient des **données à caractère personnel**
- s'il est mineur, remplir le formulaire d'identification de l'autorité parentale
- valider son compte en utilisant l'email de confirmation

L'utilisateur est alors averti des évolutions de sa demande via les notifications qui lui parviennent : demande validée / besoin de pièces justificatives complémentaires / réception du Cerfa de demande complété

#### Instruit sa demande à l'aide des différents formulaires

Pour compléter sa demande, l'usager doit remplir plusieurs formulaires inspirés du formulaire Cerfa papier de demande. Le formulaire électronique est présenté comme suit :

- l'utilisateur doit compléter les modules suivants équivalents aux modules A, B, C, D et F du Cerfa papier : 
	* Bénéficiaire // A) Votre identité
	* Vie quotidienne // B) Votre vie quotidienne
	* Vie scolaire // C) Vie scolaire ou étudiante
	* Vie au travail // D) Votre situation professionnelle
	* Vie de votre aidant familial // F) Vie de votre aidant familial
	* Personne vous aidant dans cette démarche // **Équivalent Cerfa non identifié**
	* Situations particulières // **Équivalent Cerfa non identifié**
- l'utilisateur doit alors finaliser sa demande // E) Expression des demandes et des droits + Pièces justificatives
- le site produit alors un récapitulatif de la demande (Cerfa PDF) // (Nouveau document à mettre à jour ?)

L'utilisateur peut également solliciter son médecin ou d'autres partenaires pour joindre des justificatifs à sa demande :

- Demande de certificat à son médecin
	* usager : enregistrement de l'email du médecin
	* médecin : réception d'un email avec un lien pseudo sécurisé (hashé + email du patient)
	* médecin : upload du formulaire
	* médecin : réception d'un email de demande de confirmation de la soumission avec lien sécurisé
	* usager : constater que le document a été ajouté
- Demande de pièces justificatives à des partenaires des MDPH (ex : garagiste)
	* même workflow que ci-dessus.

#### Modifie les paramètre de son compte
La page "mon compte" (accès via clic sur l'utilisateur dans la barre latérale gauche), permet de :

- gérer le mot de passe de l'utilisateur
- d'activer le mode multi profil 

Cette dernière option est utilisée par les association ayant délégation pour déposer des demandes pour le compte de personnes en situation de handicap. L'outil ne gère pas la trace du don de délégation par le receveur d'aide.

### La MDPH 
#### Traite les demandes reçues
##### En gérant un flux de demandes reçues 

- L'agent assigné au secteur reçoit une alerte mail à chaque nouvelle demande reçue. Cette alerte contient le PDF en pièce jointe et un lien vers la demande.
- Le lien vers la demande permet d'accéder (après identification) au détail de la demande reprenant les réponses de l'usager final.

> La demande peut être transférée à un autre agent d'un autre secteur.

- L'agent prépare l'accusé de réception, en vérifiant la validité et la lisibilité des pj fournies par l'utilisateur final.

> L'agent peut, à cette étape, demander des pièces justificatives complémentaires. La demande est alors "mise en attente".

- L'agent génère un accusé de réception et l'envoie automatiquement par mail.

> L'usager reçoit un mail envoyé par l'adresse impact@sgmap.fr _**à modifier**_. Le ReplyTo de cet email est une adresse générique de la MDPH concernée par la demande _**à vérifier**_. 

- La demande est "enregistrée".
- L'agent peut télécharger les demandes reçues. 
- L'agent peut archiver les demandes reçues.

##### En préparant l'évaluation des demandes 

- L'agent peut répondre aux questions de l'outil de soutien (réparties entre 20 catégories et 1500 réponses possibles) pour préparer le GEVA et le CDAPH.

#### Paramètre les comptes

La MDPH peut gérer les comptes des agents instructeurs et des bénéficiaires :

- Les agents peuvent créer des comptes pour les autres agents MDPH en renseignant nom / prénom / mot de passe

- Les agents peuvent valider des comptes les bénéficiaires :
	* en recherchant via un formulaire de recherche
	* en confirmant l'email de l'utilisateur

> BUGS Identifiés :
>
> - la gestion des comptes bénéficiaires n'est pas segmentée par MDPH
>	- lors du clic sur un compte bénéficiaire, le titre de la page est "Édition d'un agent" et on peut renseigner le nom

#### Paramètre les éléments propres à son mode de fonctionnement
##### En gérant ses secteurs et le dispatch de ses demandes

- La MDPH associe les codes postaux des communes qu'elle couvre à des secteurs. 
- La MDPH répartie ses agents instructeurs par secteur.

> Les agents instructeurs sont répartis par pôle Adultes / Enfants. Cette répartition peut être faite par des listes de diffusion génériques ou des agents, en affectant chaque agent / liste à un secteur et un pôle. 

- Les demandes sont ensuite automatiquement dispatchées par secteur (en fonction du code postal) et par pôle (en fonction de l'âge du demandeur).

##### En gérant le classement des documents dans la GED
Les MDPH possèdent chacune une gestion électronique des documents (GED) qui :

- classe les documents à l'aide de codes-barres
- présente sa propre arborescence

Ainsi, chaque MDPH peut utiliser ce module pour associer à chaque pièce justificative potentiellement demandée dans le formulaire, un lieu de stockage dans sa propre GED. Cela permet de mettre en place l'association Pièce justificative / Lieu de stockage dans la GED / Code-barres.

### L'administrateur (SGMAP / CNSA)

- L'administrateur peut suivre les statistiques de demandes sur mdph.beta.gouv.fr/stats,
- **_Expérimental_** L'administrateur peut créer une nouvelle MDPH.
