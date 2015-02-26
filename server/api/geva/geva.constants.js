'use strict';

exports.all =
  [
    {
      "Section": "Environnement",
      "Description": "Situation familiale ",
      "Trajectoire": "toutes",
      "Question": "Quelle est la situation familiale de la personne ?",
      "Type": "CU",
      "Reponses": [
        {
          "Reponse": "vit seul",
          "Tri": 1
        },
        {
          "Reponse": "vit avec d'autres personnes",
          "Tri": 2
        },
      ]
    },
    {
      "Section": "Environnement",
      "Description": "Type d'hébergement",
      "Trajectoire": "toutes",
      "Question": "Où la personne est-elle hebergée? ",
      "Type": "CU",
      "Reponses": [
        {
          "Reponse": "Domicile personnel",
          "Tri": 1
        },
        {
          "Reponse": "Domicile familial",
          "Tri": 2
        },
        {
          "Reponse": "Hébergé",
          "Tri": 3
        },
        {
          "Reponse": "Etablissement médico-social",
          "Tri": 4
        },
        {
          "Reponse": "Famille d'accueil",
          "Tri": 5
        },
        {
          "Reponse": "SDF",
          "Tri": 6
        },
        {
          "Reponse": "Logement accompagné ou supervisé",
          "Tri": 7
        },
        {
          "Reponse": "Autre",
          "Tri": 8
        },
      ]
    },
    {
      "Section": "Environnement",
      "Description": "Type logement",
      "Trajectoire": "toutes",
      "Question": "Quel est son type de logement?",
      "Type": "CU",
      "Reponses": [
        {
          "Reponse": "Maison individuelle",
          "Tri": 1
        },
        {
          "Reponse": "Appartement/Studio",
          "Tri": 2
        },
        {
          "Reponse": "Autre",
          "Tri": 3
        }
      ]
    },
    {
      "Section": "Environnement",
      "Description": "Typicité du lieu d'Habitat",
      "Trajectoire": "toutes",
      "Question": "Habite-t-elle en milieu urbain ou rural?",
      "Type": "CU",
      "Reponses": [
        {
          "Reponse": "Habitat en milieu urbain",
          "Tri": 1
        },
        {
          "Reponse": "Habitat en milieu rural",
          "Tri": 2
        }
      ]
    },
    {
      "Section": "Environnement",
      "Description": "Type de ressource",
      "Trajectoire": "toutes",
      "Question": "Quelles sont les ressources dont elle dispose?",
      "Type": "CM",
      "Reponses": [
        {
          "Reponse": "Sans objet",
          "Tri": 1
        },
        {
          "Reponse": "Salaire et autre revenu du travail",
          "Tri": 2
        },
        {
          "Reponse": "Allocation chomage",
          "Tri": 3
        },
        {
          "Reponse": "Indemnités journalières assurance maladie",
          "Tri": 4
        },
        {
          "Reponse": "Pension d'invalidité 1er cat",
          "Tri": 5
        },
        {
          "Reponse": "Pension d'invalidité 2ème cat ",
          "Tri": 6
        },
        {
          "Reponse": "Pension d'invalidité 3ème cat (MTP)",
          "Tri": 7
        },
        {
          "Reponse": "Allocation supplémentaire d'invalidité (FSI)",
          "Tri": 8
        },
        {
          "Reponse": "Autres pensions (régimes particuliers, assurances …)",
          "Tri": 9
        },
        {
          "Reponse": "Autres pensions avec MTP",
          "Tri": 10
        },
        {
          "Reponse": "AAH",
          "Tri": 11
        },
        {
          "Reponse": "Complément de ressources",
          "Tri": 12
        },
        {
          "Reponse": "Majoration pour la vie autonome",
          "Tri": 13
        },
        {
          "Reponse": "RSA",
          "Tri": 14
        },
        {
          "Reponse": "Autre allocation",
          "Tri": 15
        },
        {
          "Reponse": "Retraite",
          "Tri": 16
        },
        {
          "Reponse": "Autres revenus",
          "Tri": 17
        },
        {
          "Reponse": "Absence de ressource personnelle",
          "Tri": 18
        },
        {
          "Reponse": "Prestation familiale",
          "Tri": 19
        },
        {
          "Reponse": "Non précisé",
          "Tri": 20
        }
      ]
    },
    {
      "Section": "Environnement",
      "Description": "adaptation du logement",
      "Trajectoire": "toutes",
      "Question": "Le logement est-il adapté?",
      "Type": "CM",
      "Reponses": [
        {
          "Reponse": "zone extérieure adaptée",
          "Tri": 1
        },
        {
          "Reponse": "zone extérieure non adaptée",
          "Tri": 2
        },
        {
          "Reponse": "zone intérieure adaptée",
          "Tri": 8
        },
        {
          "Reponse": "zone intérieure non adaptée",
          "Tri": 9
        }
      ]
    },
    {
      "Section": "Environnement",
      "Description": "Caractéristiques transport",
      "Trajectoire": "toutes",
      "Question": "Quels sont les moyens de transport utilisés par la personne?",
      "Type": "CM",
      "Reponses": [
        {
          "Reponse": "Utilise les transports en commun",
          "Tri": 1
        },
        {
          "Reponse": "Utilise les transports en commun, avec un accompagnateur",
          "Tri": 2
        },
        {
          "Reponse": "Utilise les transports de substitution",
          "Tri": 3
        },
        {
          "Reponse": "N’utilise aucun transport en commun ou de substitution",
          "Tri": 4
        },
        {
          "Reponse": "Transport scolaire sans objet",
          "Tri": 5
        },
        {
          "Reponse": "Est accompagné avec le véhicule de la famille",
          "Tri": 6
        },
        {
          "Reponse": "Utilise les transports scolaires collectifs de droit commun",
          "Tri": 7
        },
        {
          "Reponse": "Utilise un transport individuel ordinaire avec chauffeur",
          "Tri": 8
        },
        {
          "Reponse": "Utilise un transport sanitaire avec un accompagnateur",
          "Tri": 9
        },
        {
          "Reponse": "Utilise un transport sanitaire avec deux accompagnateurs",
          "Tri": 10
        },
        {
          "Reponse": "Est transporté dans un véhicule spécialement aménagé autre que le véhicule familial",
          "Tri": 11
        },
        {
          "Reponse": "N’a pas recours à un véhicule personnel ou familial",
          "Tri": 12
        },
        {
          "Reponse": "A recours à un véhicule personnel ou familial comme passager",
          "Tri": 13
        },
        {
          "Reponse": "Est conducteur d’un véhicule sans permis",
          "Tri": 14
        },
        {
          "Reponse": "Est conducteur d’un véhicule avec permis",
          "Details": [
            {
              "Detail": "Comportant une mention d’aménagement du véhicule et une durée de validité",
              "Tri": 16
            },
            {
              "Detail": "Comportant une mention d’aménagement du véhicule mais sans durée de validité",
              "Tri": 17
            },
            {
              "Detail": "Ne comportant pas de mention d’aménagement du véhicule mais une durée de validité",
              "Tri": 18
            },
            {
              "Detail": "Ne comportant ni mention d’aménagement du véhicule ni de durée de validité",
              "Tri": 19
            },
          ]
        },
        {
          "Reponse": "En cours de formation au permis de conduire",
          "Details": [
            {
              "Detail": "Avec avis du délégué à la formation routière",
              "Tri": 21
            },
            {
              "Detail": "Sans avis du délégué à la formation routière",
              "Tri": 22
            }
          ]
        },

      ]
    },
    {
      "Section": "Environnement",
      "Description": "Type scolarisation",
      "Trajectoire": "Vie scolaire uniquement",
      "Question": "Quel parcours de scolarisation est-il (ou at-t-il été) suivi?",
      "Type": "CM",
      "Reponses": [
        {
          "Reponse": "Etablissement d’enseignement",
          "Details": [
            {
              "Detail": "Etablissement scolaire de référence",
              "Tri": 2
            },
            {
              "Detail": "Etablissement scolaire autre que l’établissement scolaire de référence",
              "Tri": 3
            },
            {
              "Detail": "Etablissement de l’enseignement supérieur",
              "Tri": 4
            },
          ]
        },
        {
          "Reponse": "Autre type d’établissement",
          "Details": [
            {
              "Detail": "Etablissement médico-social",
              "Tri": 6
            },
            {
              "Detail": "Etablissement sanitaire",
              "Tri": 7
            },
          ]
        },

        {
          "Reponse": "Autre type de scolarisation",
          "Details": [
            {
              "Detail": "Scolarisation par correspondance",
              "Tri": 9
            },
            {
              "Detail": "Scolarisation à domicile avec un service d’aide pédagogique à domicile (SAPAD)",
              "Tri": 10
            },
            {
              "Detail": "Autre modalité de scolarisation ou d’études à domicile",
              "Tri": 11
            },
            {
              "Detail": "Autre",
              "Tri": 12
            }
          ]
        },
      ]
    },
    {
      "Section": "Environnement",
      "Description": "Evaluation scolarité",
      "Trajectoire": "Vie scolaire uniquement",
      "Question": "Quel est le type de scolarisation ?",
      "Type": "CU",
      "Reponses": [
        {
          "Reponse": "Scolarité ordinaire : acuqisitions comparables à la moyenne de la classe d'âge",
          "Tri": 1
        },
        {
          "Reponse": "Scolarité avec des aménagements permettant les acquisitions",
          "Tri": 2
        },
        {
          "Reponse": "Scolarité avec des aménagements, qui ne permet cependant pas d'accéder aux acquisitions constatées pour la moyenne de classe d'âge",
          "Tri": 3
        }
      ]
    },
    {
      "Section": "Environnement",
      "Description": "Type de contrat",
      "Trajectoire": "Vie professionnelle uniquement",
      "Question": "Quel est le type de contrat de travail de la personne?",
      "Type": "CM",
      "Reponses": [
        {
          "Reponse": "Apprentissage",
          "Tri": 1
        },
        {
          "Reponse": "Stagiaire",
          "Tri": 2
        },
        {
          "Reponse": "Contrat de travail aidé",
          "Tri": 3
        },
        {
          "Reponse": "Contrat à durée déterminée (y compris saisonnier, vacataire...)",
          "Tri": 4
        },
        {
          "Reponse": "Contrat à durée indéterminée (dont titulaire de la fonction publique)",
          "Tri": 5
        },
        {
          "Reponse": "Intérim",
          "Tri": 6
        },
        {
          "Reponse": "Autre",
          "Tri": 7
        },
        {
          "Reponse": "Non précisé",
          "Tri": 8
        }
      ]
    },
    {
      "Section": "Situation",
      "Description": "Situation par rapport à l'activité",
      "Trajectoire": "toutes",
      "Question": "Quelle est la Situation par rapport à l'activité scolaire ou professionnelle?",
      "Type": "CM",
      "Reponses": [
        {
          "Reponse": "Enfant non scolarisé",
          "Tri": 1
        },
        {
          "Reponse": "Scolarisation, formation initiale et/ou autres formations non rémunérées",
          "Tri": 2
        },
        {
          "Reponse": "Activité professionnelle même non rémunérée (y compris ESAT, apprentissage, formation professionnelle rémunérée, arrêt maladie)",
          "Details": [
            {
              "Detail": "salarié secteur privé",
              "Tri": 4
            },
            {
              "Detail": "salarié secteur public",
              "Tri": 5
            },
            {
              "Detail": "travailleur indépendant",
              "Tri": 6
            },
            {
              "Detail": "salarié entreprise adaptée",
              "Tri": 7
            },
            {
              "Detail": "travailleur en milieu protégé (ESAT)",
              "Tri": 8
            },
            {
              "Detail": "apprentissage",
              "Tri": 9
            },
            {
              "Detail": "formation professionnelle",
              "Tri": 10
            },
            {
              "Detail": "activité non rémunérée",
              "Tri": 11
            },
            {
              "Detail": "arrêt maladie",
              "Tri": 12
            },
          ]
        },
        {
          "Reponse": "Adulte sans activité ",
          "Details": [
            {
              "Detail": "Invalidité",
              "Tri": 14
            },
            {
              "Detail": "Chômage",
              "Tri": 15
            },
            {
              "Detail": "Retraité à l'âge normal",
              "Tri": 16
            },
            {
              "Detail": "Retraite anticipée",
              "Tri": 17
            },
            {
              "Detail": "Au foyer",
              "Tri": 18
            },
            {
              "Detail": "Congé parental",
              "Tri": 19
            },
            {
              "Detail": "Autre inactif",
              "Tri": 20
            },
            {
              "Detail": "Non précisé",
              "Tri": 21
            },
            {
              "Detail": "sans activité et a déjà travaillé",
              "Tri": 22
            },
            {
              "Detail": "sans activité et n'a jamais travaillé",
              "Tri": 23
            }
          ]
        },
      ]
    },
    {
      "Section": "Situation",
      "Description": "Niveau de scolarité suivie",
      "Trajectoire": "Vie scolaire uniquement",
      "Question": "Quel est le niveau de scolarité suivie (ou ayant été suivie) par la personne?",
      "Type": "CU",
      "Reponses": [
        {
          "Reponse": "Jamais scolarisé",
          "Tri": 1
        },
        {
          "Reponse": "école maternelle",
          "Tri": 2
        },
        {
          "Reponse": "école élémentaire classe ordinaire",
          "Tri": 3
        },
        {
          "Reponse": "école élémentaire CLIS",
          "Tri": 4
        },
        {
          "Reponse": "scolarisé en établissement médico-social (IME, IMPRO, ITEP …)",
          "Tri": 5
        },
        {
          "Reponse": "collège classe ordinaire",
          "Tri": 6
        },
        {
          "Reponse": "collège UPI - ULIS",
          "Tri": 7
        },
        {
          "Reponse": "lycée classe ordinaire",
          "Tri": 8
        },
        {
          "Reponse": "lycée UPI, ULIS",
          "Tri": 9
        },
        {
          "Reponse": "enseignement technique ou professionnel court (CAP, BEP ou équivalent)",
          "Tri": 10
        },
        {
          "Reponse": "enseignement technique ou professionnel long (brevet de technicien, bac pro...)",
          "Tri": 11
        },
        {
          "Reponse": "Université ou étude supérieures (y compris technique supérieur)",
          "Tri": 12
        },
        {
          "Reponse": "Non précisé",
          "Tri": 13
        }
      ]
    },
    {
      "Section": "Situation",
      "Description": "Niveau de formation professionnelle ",
      "Trajectoire": "Vie professionnelle uniquement",
      "Question": "Quel est le niveau de formation professionnelle de la personne?",
      "Type": "CU",
      "Reponses": [
        {
          "Reponse": "Niveau I : Personnel occupant des emplois exigeant normalement une formation de niveau supérieur à celui de la maîtrise.",
          "Tri": 1
        },
        {
          "Reponse": "Niveau II : Personnel occupant des emplois exigeant normalement une formation d'un niveau comparable à celui de la licence ou de la maîtrise.",
          "Tri": 2
        },
        {
          "Reponse": "Niveau III : Personnel occupant des emplois qui exigent normalement des formations du niveau du diplôme des Instituts Universitaires de Technologie (DUT) ou du brevet de technicien supérieur (BTS) ou de fin de premier cycle de l'enseignement supérieur.",
          "Tri": 3
        },
        {
          "Reponse": "Niveau IV : Personnel occupant des emplois de maîtrise ou d'ouvrier hautement qualifié et pouvant attester d'un niveau de formation équivalent à celui du brevet professionnel (BP), du brevet de technicien (BT), du bac professionnel ou du bac technologique.",
          "Tri": 4
        },
        {
          "Reponse": "Niveau V : Personnel occupant des emplois exigeant normalement un niveau de formation équivalent à celui du brevet d'études professionnelles (BEP) ou du certificat d'aptitude professionnelle (CAP), et par assimilation, du certificat de formation professionnelle des ",
          "Tri": 5
        },
        {
          "Reponse": "Niveau V bis : Personnel occupant des emplois supposant une formation spécialisée d'une durée maximum d'un an au delà du premier cycle de l'enseignement du second degré, du niveau du certificat de formation professionnelle.",
          "Tri": 6
        },
        {
          "Reponse": "Niveau VI : Personnel occupant des emplois n'exigeant pas une formation allant au delà de la scolarité obligatoire",
          "Tri": 7
        }
      ]
    },
    {
      "Section": "Situation",
      "Description": "Souhaits par rapport au travail",
      "Trajectoire": "Toutes",
      "Question": "Quels sont les souhaits de la personne par rapport au travail?",
      "Type": "CU",
      "Reponses": [
        {
          "Reponse": "Pas de projet professionnel exprimé par la personne",
          "Tri": 1
        },
        {
          "Reponse": "Projet professionnel exprimé par la personne",
          "Details": [
            {
              "Detail": "Souhaite travailler",
              "Tri": 3
            },
            {
              "Detail": "Souhaite changer d’activité professionnelle",
              "Tri": 4
            },
            {
              "Detail": "Souhaite conserver son activité professionnelle",
              "Tri": 5
            },
            {
              "Detail": "Autre",
              "Tri": 6
            }
          ]
        },
      ]
    },
    {
      "Section": "Situation",
      "Description": "Pathologie",
      "Trajectoire": "Toutes",
      "Question": "Quelle est la pathologie principale de la personne?",
      "Type": "CU",
      "Reponses": [
        {
          "Reponse": "Troubles de la personnalité et du comportement dus à une affection, une lésion et un dysfonctionnement cérébraux",
          "Tri": 1
        },
        {
          "Reponse": "Maladie d'alzheimer ",
          "Tri": 2
        },
        {
          "Reponse": "autres pathologies avec démence globale",
          "Tri": 3
        },
        {
          "Reponse": "Affection dégénérative du système nerveux, sans précision",
          "Tri": 4
        },
        {
          "Reponse": "dyslexie",
          "Tri": 5
        },
        {
          "Reponse": "dysphasie",
          "Tri": 6
        },
        {
          "Reponse": "dyspraxie",
          "Tri": 7
        },
        {
          "Reponse": "psychose",
          "Tri": 8
        },
        {
          "Reponse": "névrose",
          "Tri": 9
        },
        {
          "Reponse": "dépression",
          "Tri": 10
        },
        {
          "Reponse": "autisme et autres TSA",
          "Tri": 11
        },
        {
          "Reponse": "diabète sucré insulino dépendant",
          "Tri": 12
        },
        {
          "Reponse": "diabète sucré no insulino dépendant",
          "Tri": 13
        },
        {
          "Reponse": "mucoviscidose",
          "Tri": 14
        },
        {
          "Reponse": "hépatites B et C",
          "Tri": 15
        },
        {
          "Reponse": "autres hépatites virales",
          "Tri": 16
        },
        {
          "Reponse": "VIH",
          "Tri": 17
        },
        {
          "Reponse": "Autres maladies du sang et des organes hématopoïétiques",
          "Tri": 18
        },
        {
          "Reponse": "affection néoplasique bronchopulmonaire",
          "Tri": 19
        },
        {
          "Reponse": "cancer du sein",
          "Tri": 20
        },
        {
          "Reponse": "leucémie",
          "Tri": 21
        },
        {
          "Reponse": "autre affection néoplasique",
          "Tri": 22
        },
        {
          "Reponse": "SLA ou autre maladie du motoneurone ",
          "Tri": 23
        },
        {
          "Reponse": "maladies neuromusculaires",
          "Tri": 24
        },
        {
          "Reponse": "SEP",
          "Tri": 25
        },
        {
          "Reponse": "maladie de Parkinson",
          "Tri": 26
        },
        {
          "Reponse": "chorée de Huntington",
          "Tri": 27
        },
        {
          "Reponse": "AVC",
          "Tri": 28
        },
        {
          "Reponse": "rachialgies",
          "Tri": 29
        },
        {
          "Reponse": "fibromyalgie",
          "Tri": 30
        },
        {
          "Reponse": "maladie rare",
          "Tri": 31
        },
        {
          "Reponse": "autres pathologies ",
          "Tri": 32
        }
      ]
    },
    {
      "Section": "Situation",
      "Description": "Type de déficience",
      "Trajectoire": "Toutes",
      "Question": "Quelles sont les types de déficiences que présente la personne?",
      "Type": "CM",
      "Reponses": [
        {
          "Reponse": "DEFICIENCES INTELLECTUELLES ",
          "Details": [
            {
              "Detail": "Retard mental dont :",
              "SousDetails": [
                {
                  "SousDetail": "Retard mental profond ( QI inférieur à 20 ou chez les adultes, age mental inférieur à 3 ans)*",
                  "Tri": 3
                },
                {
                  "SousDetail": "Retard mental sévère (QI compris entre 20 et 34 ou chez les adultes, age mental de 3 à 6 ans)*",
                  "Tri": 4
                },
                {
                  "SousDetail": "Retard mental moyen (QI compris entre 35 et 49 ou chez les adultes, age mental de 6 à 9 ans)*",
                  "Tri": 5
                },
                {
                  "SousDetail": "Retard mental léger (QI compris entre 50 et 69 ou chez les adultes, age mental de 9 à 12 ans)*",
                  "Tri": 6
                },
                {
                  "SousDetail": "roubles cognitifs sans retard mental, troubles des acquisitions et des apprentissages ",
                  "Tri": 7
                },
                {
                  "SousDetail": "retard mental non précisé",
                  "Tri": 8
                },
              ]
            },
            {
              "Detail": "Démence globale ",
              "Tri": 9
            },
            {
              "Detail": "Démence lacunaire ou partielle",
              "Tri": 10
            },
            {
              "Detail": "Autre déficience de la mémoire",
              "Tri": 11
            },
            {
              "Detail": "Déficience du cours de la pensée",
              "Tri": 12
            },
            {
              "Detail": "Autres déficiences de l'intelligence non codées ailleurs",
              "Tri": 13
            },
            {
              "Detail": "Déficiences intellectuelles non précisées",
              "Tri": 14
            },
          ]
        },
        {
          "Reponse": "DEFICIENCES DU PSYCHISME",
          "Details": [
            {
              "Detail": "Déficience de la conscience et de la vigilance dont :",
              "SousDetails": [
                {
                  "SousDetail": "perte de conscience, coma",
                  "Tri": 17
                },
                {
                  "SousDetail": "désorientation temporo-spatiale, confusion mentale",
                  "Tri": 18
                },
                {
                  "SousDetail": "déficience intermittente de la conscience ( épilepsie) ",
                  "Tri": 19
                },
                {
                  "SousDetail": "Autres déficiences de la conscience ",
                  "Tri": 20
                },
                {
                  "SousDetail": "Troubles du comportement, de la personnalité et des capacités relationnelles",
                  "Tri": 21
                },
              ]
            },
            {
              "Detail": "Déficience des émotions ou de la volition dont : ",
              "SousDetails": [
                {
                  "SousDetail": "déficience de l'émotion, des affects, de l'humeur ",
                  "Tri": 23
                },
                {
                  "SousDetail": "déficiences de la volition (passivité, soumission, compulsion…)",
                  "Tri": 24
                }
              ]
            },
            {
              "Detail": "déficiences des fonctions psychomotrices",
              "Tri": 25
            },
            {
              "Detail": "Troubles de la perception ou de l’attention",
              "Tri": 26
            },
            {
              "Detail": "Troubles des pulsions",
              "Tri": 27
            },
            {
              "Detail": "Autres déficiences du psychisme non codées ailleurs",
              "Tri": 28
            },
            {
              "Detail": "Déficiences du psychisme non précisées",
              "Tri": 29
            },
          ]
        },
        {
          "Reponse": "DEFICIENCES DU LANGAGE ET DE LA PAROLE",
          "Details": [
            {
              "Detail": "déficience sévère de la communication",
              "Tri": 27
            },
            {
              "Detail": "déficiences de l'apprentissage du langage écrit ou oral",
              "Tri": 28
            },
            {
              "Detail": "déficience de la voix ou de l'élocution",
              "Tri": 29
            },
            {
              "Detail": "Autres déficiences du langage ou de la parole non codées ailleurs",
              "Tri": 30
            },
            {
              "Detail": "Déficiences du langage ou de la parole non précisées",
              "Tri": 30
            },
          ]
        },
        {
          "Reponse": "DEFICIENCES AUDITIVES",
          "Details": [
            {
              "Detail": "Déficiences auditives bilatérales dont : ",
              "SousDetails": [
                {
                  "SousDetail": "déficience auditive profonde  bilatérale (supérieure à 90 Db.)",
                  "Tri": 33
                },
                {
                  "SousDetail": "déficience auditive sévère bilatérale (comprise entre 71 Db et 90 Db inclus)",
                  "Tri": 34
                },
                {
                  "SousDetail": "déficience auditive moyenne bilatérale",
                  "Tri": 35
                },
                {
                  "SousDetail": "déficience auditive légère bilatérale",
                  "Tri": 36
                },
                {
                  "SousDetail": "déficience auditive bilatérale sans autre indication",
                  "Tri": 37
                },
              ]
            },
            {
              "Detail": "Déficiences auditives unilatérales",
              "Tri": 38
            },
            {
              "Detail": "Acouphènes",
              "Tri": 39
            },
            {
              "Detail": "Déficience de la fonction vestibulaire et de l'équilibration",
              "Tri": 40
            },
            {
              "Detail": "Déficiences auditives non précisées",
              "Tri": 41
            },
          ]
        },
        {
          "Reponse": "DEFICIENCES VISUELLES",
          "Details": [
            {
              "Detail": "Déficiences visuelles dont : ",
              "SousDetails": [
                {
                  "SousDetail": "déficience visuelle profonde des 2 yeux",
                  "Tri": 44
                },
                {
                  "SousDetail": "déficience visuelle profonde d’un œil avec vision faible de l’autre",
                  "Tri": 45
                },
                {
                  "SousDetail": "déficience visuelle moyenne des deux yeux",
                  "Tri": 46
                },
                {
                  "SousDetail": "déficience visuelle d’un œil l’autre étant normal",
                  "Tri": 47
                },
                {
                  "SousDetail": "Déficience de l’acuité visuelle sans précision",
                  "Tri": 48
                },
              ]
            },
            {
              "Detail": "déficience du champ visuel",
              "Tri": 49
            },
            {
              "Detail": "déficience de la mobilité oculaire (nystagmus)",
              "Tri": 50
            },
            {
              "Detail": "Autre déficience des fonctions visuelles (strabisme, vision des couleurs..) non codées ailleurs",
              "Tri": 51
            },
            {
              "Detail": "Déficiences visuelles non précisées",
              "Tri": 52
            },
          ]
        },
        {
          "Reponse": "DEFICIENCES VISCERALES",
          "Details": [
            {
              "Detail": "déficiences  cardiorespiratoires dont ",
              "SousDetails": [
                {
                  "SousDetail": "déficience de la fonction cardiovasculaire",
                  "Tri": 55
                },
                {
                  "SousDetail": "déficience de la fonction respiratoire",
                  "Tri": 56
                },
              ]
            },
            {
              "Detail": "Déficience hépato-digestives dont : ",
              "SousDetails": [
                {
                  "SousDetail": "déficience de la fonction digestive",
                  "Tri": 58
                },
                {
                  "SousDetail": "déficience des fonctions hépatiques",
                  "Tri": 59
                },
              ]
            },
            {
              "Detail": "Déficience rénales ou urinaires ",
              "SousDetails": [
                {
                  "SousDetail": "déficience des fonctions rénales",
                  "Tri": 61
                },
                {
                  "SousDetail": "déficience de l'élimination urinaire",
                  "Tri": 62
                }
              ]
            },
            {
              "Detail": "déficience métabolique, endocrinienne ou enzymatique",
              "Tri": 63
            },
            {
              "Detail": "déficience hématologique ou du système immunitaire",
              "Tri": 64
            },
            {
              "Detail": "Déficiences viscérales non précisées",
              "Tri": 65
            },
          ]
        },
        {
          "Reponse": "DEFICIENCES MOTRICES",
          "Details": [
            {
              "Detail": "Déficiences motrices par absence (amputation, agénésie) dont : ",
              "SousDetails": [
                {
                  "SousDetail": "Amputation proximale du membre supérieur",
                  "Tri": 66
                },
                {
                  "SousDetail": "Amputation proximale du membre inférieur",
                  "Tri": 67
                },
                {
                  "SousDetail": "Amputation des parties distales d'un membre",
                  "Tri": 68
                },
                {
                  "SousDetail": "Autres amputations et amputations multiples",
                  "Tri": 69
                },
                {
                  "SousDetail": "Absence complète ou incomplète d'un ou plusieurs membres sans autre indication",
                  "Tri": 70
                },
                {
                  "SousDetail": "agénésie ou amputation partielle ou totale d'un membre supérieur",
                  "Tri": 71
                },
                {
                  "SousDetail": "agénésie ou amputation partielle ou totale d'un membre inférieur",
                  "Tri": 72
                },
                {
                  "SousDetail": "agénésie ou amputation partielle ou totale des 2 membres supérieurs ou inférieurs",
                  "Tri": 73
                },
                {
                  "SousDetail": "agénésie ou amputation partielle ou totale des 4 membres",
                  "Tri": 74
                },
              ]
            },
            {
              "Detail": "Déficiences motrices par atteinte de la commande neurologique dont :",
              "SousDetails": [
                {
                  "SousDetail": "déficience complète des quatre membres",
                  "Tri": 76
                },
                {
                  "SousDetail": "déficience incomplète des quatre membres",
                  "Tri": 77
                },
                {
                  "SousDetail": "déficience complète des deux membres inférieurs",
                  "Tri": 78
                },
                {
                  "SousDetail": "déficience incomplète des deux membres inférieurs",
                  "Tri": 79
                },
                {
                  "SousDetail": "déficience complète de deux membres homolatéraux",
                  "Tri": 80
                },
                {
                  "SousDetail": "déficience incomplète de deux membres homolatéraux",
                  "Tri": 81
                },
                {
                  "SousDetail": "Autre déficience complète ou incomplète d’un ou plusieurs membres",
                  "Tri": 82
                },
              ]
            },
            {
              "Detail": "Déficience motrice de la tête et du tronc",
              "SousDetails": [
                {
                  "SousDetail": "déficience de la statique et de la posture",
                  "Tri": 84
                },
                {
                  "SousDetail": "Trouble du tonus",
                  "Tri": 85
                },
                {
                  "SousDetail": "autre déficience motrice de la tête ou du tronc",
                  "Tri": 86
                },
              ]
            },
            {
              "Detail": "Déficiences mécaniques dont :",
              "SousDetails": [
                {
                  "SousDetail": "Ankylose d'un ou plusieurs membres",
                  "Tri": 88
                },
                {
                  "SousDetail": "Instabilité d'un ou plusieurs membres",
                  "Tri": 89
                },
                {
                  "SousDetail": "Difformité, déformation d'un ou plusieurs membres",
                  "Tri": 90
                },
                {
                  "SousDetail": "d'un ou des 2 membres supérieurs",
                  "Tri": 91
                },
                {
                  "SousDetail": "d'un ou des 2 membres inférieurs",
                  "Tri": 86
                },
              ]
            },
            {
              "Detail": "Déficiences musculaires d'un ou plusieurs membres ",
              "Tri": 87
            },
            {
              "Detail": "Déficiences complexes de la motricité dont : ",
              "SousDetails": [
                {
                  "SousDetail": "Mouvements anormaux",
                  "Tri": 89
                },
                {
                  "SousDetail": "Autre déficience de la coordination motrice ",
                  "Tri": 90
                },
              ]
            },

            {
              "Detail": "Autres déficiences motrices non codées ailleurs",
              "Tri": 91
            },
            {
              "Detail": "Déficiences motrices non précisées",
              "Tri": 92
            },
          ]
        },
        {
          "Reponse": "AUTRES DEFICIENCES",
          "Details": [
            {
              "Detail": "Déficiences esthétiques ",
              "Tri": 94
            },
            {
              "Detail": "déficience esthétiques de la tête et du tronc",
              "Tri": 95
            },
            {
              "Detail": "déficiences esthétiques des membres",
              "Tri": 96
            },
            {
              "Detail": "Autres déficiences esthétiques",
              "Tri": 97
            },
            {
              "Detail": "Douleurs chroniques",
              "Tri": 98
            },
            {
              "Detail": "Fatigue chronique",
              "Tri": 99
            },
            {
              "Detail": "Déficiences non précisées",
              "Tri": 100
            },
          ]
        },
        {
          "Reponse": "surhandicap",
          "Tri": 101
        },
        {
          "Reponse": "plurihandicap",
          "Tri": 102
        },
        {
          "Reponse": "polyhandicap",
          "Tri": 103
        },
        {
          "Reponse": "Etat végétatif chronique",
          "Tri": 104
        },
        {
          "Reponse": "handicap rare",
          "Tri": 105
        }
      ]
    },
    {
      "Section": "Situation",
      "Description": "Nature de l'Activité humaine",
      "Trajectoire": "Toutes",
      "Question": "La personne est-elle autonomie par rapport aux domaines d'activité suivantes?",
      "Type": "CM",
      "Reponses": [
        {
          "Reponse": "Tâches et exigences générales, relation avec autrui",
          "Details": [
            {
              "Detail": "S'orienter dans le temps",
              "Tri": 2
            },
            {
              "Detail": "S'orienter dans l'espace",
              "Tri": 3
            },
            {
              "Detail": "Fixer son attention",
              "Tri": 4
            },
            {
              "Detail": "Mémoriser",
              "Tri": 5
            },
            {
              "Detail": "Prendre des décisions",
              "Tri": 6
            },
            {
              "Detail": "Prendre des initiatives",
              "SousDetails": [
                {
                  "SousDetail": "Faire spontanément une demande d’aide",
                  "Tri": 8
                },
                {
                  "SousDetail": "Entrer spontanément en relation avec autrui ",
                  "Tri": 9
                },
                {
                  "SousDetail": "Entreprendre spontanément une activité simple",
                  "Tri": 10
                },
                {
                  "SousDetail": "Entreprendre spontanément une activité complexe",
                  "Tri": 11
                },
              ]
            },
            {
              "Detail": "Gérer sa sécurité",
              "SousDetails": [
                {
                  "SousDetail": "Ne pas mettre sa vie et/ou celle des autres en danger",
                  "Tri": 13
                },
                {
                  "SousDetail": "Réagir de façon adaptée face à une situation risquée",
                  "Tri": 14
                },
              ]
            },
            {
              "Detail": "Respecter les règles de vie",
              "Tri": 15
            },
            {
              "Detail": "Avoir des relations avec autrui conformes aux règles sociales",
              "Tri": 16
            },
            {
              "Detail": "Maîtriser son comportement dans ses relations avec autrui",
              "Tri": 17
            },
            {
              "Detail": "Avoir des relations avec ses pairs",
              "Tri": 18
            },
            {
              "Detail": "Avoir des relations affectives et sexuelles",
              "Tri": 19
            },
          ]
        },
        {
          "Reponse": "Mobilité Manipulation",
          "Details": [
            {
              "Detail": "Se mettre debout",
              "Tri": 21
            },
            {
              "Detail": "Se coucher",
              "Tri": 22
            },
            {
              "Detail": "S'asseoir",
              "Tri": 23
            },
            {
              "Detail": "Faire ses transferts",
              "Tri": 24
            },
            {
              "Detail": "Changer de point d'appui",
              "Tri": 25
            },
            {
              "Detail": "Rester assis",
              "Tri": 26
            },
            {
              "Detail": "Rester debout",
              "Tri": 27
            },
            {
              "Detail": "Marcher",
              "Tri": 28
            },
            {
              "Detail": "Se déplacer dans le logement, à l'extérieur",
              "Tri": 29
            },
            {
              "Detail": "Se déplacer dans le logement",
              "Tri": 30
            },
            {
              "Detail": "Se déplacer à l'extérieur",
              "Tri": 31
            },
            {
              "Detail": "Se déplacer en terrain varié",
              "Tri": 32
            },
            {
              "Detail": "Se déplacer en terrain accidenté",
              "Tri": 33
            },
            {
              "Detail": "Se déplacer sur un terrain en pente",
              "Tri": 34
            },
            {
              "Detail": "Utiliser des escaliers",
              "Tri": 35
            },
            {
              "Detail": "Utiliser les transports en commun",
              "Tri": 36
            },
            {
              "Detail": "Utiliser un véhicule particulier",
              "Tri": 37
            },
            {
              "Detail": "Conduire un véhicule",
              "Tri": 38
            },
            {
              "Detail": "Utiliser la préhension de la main dominante",
              "Tri": 39
            },
            {
              "Detail": "Utiliser la préhension de la main non dominante",
              "Tri": 40
            },
            {
              "Detail": "Avoir des activités de motricité fine",
              "Tri": 41
            },
            {
              "Detail": "Avoir une coordination bi-manuelle",
              "Tri": 42
            },
            {
              "Detail": "Soulever et porter des objets (y compris en se déplaçant)",
              "Tri": 43
            },
          ]
        },
        {
          "Reponse": "Entretien personnel",
          "Details": [
            {
              "Detail": "Se laver",
              "Tri": 45
            },
            {
              "Detail": "Prendre soin de son corps",
              "Tri": 46
            },
            {
              "Detail": "Assurer l'élimination et Utiliser les toilettes",
              "Tri": 47
            },
            {
              "Detail": "S'habiller / se déshabiller",
              "Tri": 48
            },
            {
              "Detail": "Prendre ses repas (Manger, Boire)",
              "Tri": 49
            },
            {
              "Detail": "Prendre soin de sa santé",
              "SousDetails": [
                {
                  "SousDetail": "Utiliser ses fonctions respiratoires",
                  "Tri": 51
                },
                {
                  "SousDetail": "Se soigner",
                  "Tri": 52
                },
                {
                  "SousDetail": "Surveiller son régime alimentaire",
                  "Tri": 53
                },
                {
                  "SousDetail": "Gérer son repos quotidien",
                  "Tri": 54
                },
                {
                  "SousDetail": "Exprimer une demande de soins",
                  "Tri": 55
                },
                {
                  "SousDetail": "Utiliser les différents systèmes de santé",
                  "Tri": 56
                },
              ]
            },
          ]
        },

        {
          "Reponse": "Communication ",
          "Details": [
            {
              "Detail": "Parler",
              "Tri": 58
            },
            {
              "Detail": "Entendre (percevoir les sons et comprendre)",
              "SousDetails": [
                {
                  "SousDetail": "Entendre des sons",
                  "Tri": 59
                },
                {
                  "SousDetail": "Comprendre la parole en face à face",
                  "Tri": 60
                },
                {
                  "SousDetail": "Comprendre la parole dans un groupe",
                  "Tri": 61
                },
                {
                  "SousDetail": "Comprendre la parole en environnement bruyant",
                  "Tri": 62
                },
                {
                  "SousDetail": "Comprendre la parole en environnement bruyant",
                  "Tri": 63
                },
                {
                  "SousDetail": "Localiser l'origine des sons",
                  "Tri": 64
                },

              ]
            },
            {
              "Detail": "Voir (distinguer et identifier)",
              "Tri": 66
            },
            {
              "Detail": "Utiliser des appareils et techniques de communication",
              "SousDetails": [
                {
                  "SousDetail": "Utiliser le téléphone",
                  "Tri": 68
                },
                {
                  "SousDetail": "Utiliser les autres appareils et techniques de communication",
                  "Tri": 69
                },
              ]
            },
            {
              "Detail": "Comprendre une phrase simple",
              "Tri": 70
            },
            {
              "Detail": "Mener une conversation",
              "Tri": 71
            },
            {
              "Detail": "Produire et recevoir des messages non verbaux",
              "Tri": 72
            },
          ]
        },
        {
          "Reponse": "Vie domestique et vie courante",
          "Details": [
            {
              "Detail": "Faire ses courses",
              "Tri": 74
            },
            {
              "Detail": "Préparer un repas simple",
              "Tri": 75
            },
            {
              "Detail": "Faire son ménage",
              "Tri": 76
            },
            {
              "Detail": "Entretenir son linge et ses vêtements",
              "Tri": 77
            },
            {
              "Detail": "S'occuper de sa famille",
              "Tri": 78
            },
            {
              "Detail": "Gérer son budget, faire les démarches administratives",
              "SousDetails": [
                {
                  "SousDetail": "Gérer son argent au quotidien ",
                  "Tri": 80
                },
                {
                  "SousDetail": "Gérer son compte bancaire",
                  "Tri": 81
                },
                {
                  "SousDetail": "Faire des démarches administratives",
                  "Tri": 82
                },
              ]
            },
            {
              "Detail": "Vivre seul dans un logement indépendant",
              "Tri": 83
            },
            {
              "Detail": "Avoir des relations informelles de voisinage",
              "Tri": 84
            },
            {
              "Detail": "Participer à la vie communautaire, sociale et civique",
              "SousDetails": [
                {
                  "SousDetail": "Gérer son temps libre, avoir des activités récréatives ou participer à des activités culturelles, sportives ou de loisir",
                  "Tri": 86
                },
                {
                  "SousDetail": "Exprimer une demande liée à ses droits",
                  "Tri": 87
                },
                {
                  "SousDetail": "Participer à la vie locale",
                  "Tri": 88
                },
                {
                  "SousDetail": "Partir en vacances",
                  "Tri": 89
                },
              ]
            },
          ]
        },
        {
          "Reponse": "Application des connaissances, apprentissage",
          "Details": [
            {
              "Detail": "Lire",
              "Tri": 91
            },
            {
              "Detail": "Ecrire",
              "Tri": 92
            },
            {
              "Detail": "Calculer",
              "Tri": 93
            },
            {
              "Detail": "Acquérir un savoir-faire",
              "Tri": 94
            },
            {
              "Detail": "Appliquer un savoir-faire",
              "Tri": 95
            },
          ]
        },
        {
          "Reponse": "Tâches et exigences en relation avec la scolarité et la formation initiale",
          "Details": [
            {
              "Detail": "Apprendre à lire",
              "Tri": 97
            },
            {
              "Detail": "Apprendre à écrire",
              "Tri": 98
            },
            {
              "Detail": "Apprendre à calculer",
              "Tri": 99
            },
            {
              "Detail": "Apprendre des techniques de communication",
              "Tri": 100
            },
            {
              "Detail": "Apprendre les règles sociales de base",
              "Tri": 101
            },
            {
              "Detail": "Respecter des règles de base",
              "SousDetails": [
                {
                  "SousDetail": "Etre ponctuel",
                  "Tri": 103
                },
                {
                  "SousDetail": "Etre assidu",
                  "Tri": 104
                },
                {
                  "SousDetail": "Organiser son travail",
                  "Tri": 105
                },
                {
                  "SousDetail": "Contrôler son travail",
                  "Tri": 106
                },
                {
                  "SousDetail": "Accepter des consignes",
                  "Tri": 107
                },
                {
                  "SousDetail": "Suivre des consignes",
                  "Tri": 108
                },
                {
                  "SousDetail": "S’adapter à la vie scolaire",
                  "Tri": 109
                },
                {
                  "SousDetail": "Travailler en équipe ",
                  "Tri": 110
                },
                {
                  "SousDetail": "Respecter les règles scolaires ",
                  "Tri": 111
                },
              ]
            },
            {
              "Detail": "S’installer dans la classe",
              "Tri": 112
            },
            {
              "Detail": "Utiliser des supports pédagogiques",
              "Tri": 113
            },
            {
              "Detail": "Utiliser du matériel adapté à son handicap",
              "Tri": 114
            },
            {
              "Detail": "Prendre des notes",
              "Tri": 115
            },
            {
              "Detail": "S’adapter aux conditions d’examen et de contrôle",
              "Tri": 116
            },
            {
              "Detail": "Participer à des sorties extra scolaires",
              "Tri": 117
            },
            {
              "Detail": "Autre",
              "Tri": 118
            },
          ]
        },
        {
          "Reponse": "Tâches et exigences relatives au travail",
          "Details": [
            {
              "Detail": "Respecter des règles de base ",
              "SousDetails": [
                {
                  "SousDetail": "Etre ponctuel",
                  "Tri": 120
                },
                {
                  "SousDetail": "Etre assidu",
                  "Tri": 121
                },
                {
                  "SousDetail": "Respecter des relations hiérarchiques",
                  "Tri": 122
                },
                {
                  "SousDetail": "Participer à des réunions ",
                  "Tri": 123
                },
              ]
            },
            {
              "Detail": "Organiser son travail (en rapport avec le poste de travail)",
              "Tri": 125
            },
            {
              "Detail": "Contrôler son travail",
              "Tri": 126
            },
            {
              "Detail": "Etre en contact avec le public",
              "Tri": 127
            },
            {
              "Detail": "Assurer l’encadrement",
              "Tri": 128
            },
            {
              "Detail": "Travailler en équipe ",
              "Tri": 129
            },
            {
              "Detail": "Exercer des tâches physiques",
              "SousDetails": [
                {
                  "SousDetail": "Soulever, déplacer des charges",
                  "Tri": 131
                },
                {
                  "SousDetail": "Travailler en flexion du tronc",
                  "Tri": 132
                },
                {
                  "SousDetail": "Travailler en attitudes variées",
                  "Tri": 133
                },
                {
                  "SousDetail": "Travailler accroupi",
                  "Tri": 134
                },
                {
                  "SousDetail": "Travailler en hauteur (escabeau, échelle, échafaudage..)",
                  "Tri": 135
                },
                {
                  "SousDetail": "Travailler à distance du sol (sur un pont, un toit, un balcon…)",
                  "Tri": 136
                },
                {
                  "SousDetail": "Travailler le mb. sup. dominant levé au dessus du niveau des épaules",
                  "Tri": 137
                },
                {
                  "SousDetail": "Travailler le mb. sup. non dominant levé au dessus du niveau des épaules",
                  "Tri": 138
                },
                {
                  "SousDetail": "Utiliser une commande avec les pieds",
                  "Tri": 139
                },
              ]
            },
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "SousDetails": [
                {
                  "SousDetail": "Voir les couleurs",
                  "Tri": 141
                },
                {
                  "SousDetail": "Percevoir le relief",
                  "Tri": 142
                },
                {
                  "SousDetail": "Travailler de nuit",
                  "Tri": 143
                },
                {
                  "SousDetail": "Assumer des modifications d’horaires",
                  "Tri": 144
                },
                {
                  "SousDetail": "Utiliser des outils et/ou machines dangereuses",
                  "Tri": 145
                },
                {
                  "SousDetail": "Travailler avec vibrations",
                  "Tri": 146
                },
                {
                  "SousDetail": "Travailler en milieu bruyant",
                  "Tri": 147
                },
                {
                  "SousDetail": "Travailler dans des contextes  respiratoires particuliers",
                  "Tri": 148
                },
                {
                  "SousDetail": "Travailler avec risque cutané",
                  "Tri": 149
                },
                {
                  "SousDetail": "S’exposer aux intempéries, à une atmosphère exceptionnelle",
                  "Tri": 150
                },
                {
                  "SousDetail": "Autre",
                  "Tri": 151
                }
              ]
            },
          ]
        },
      ]
    },
    {
      "Section": "Situation",
      "Description": "Evolution envisagée",
      "Trajectoire": "toutes",
      "Question": "Quelle évolution de la situation est envisagée pour l'avenir?",
      "Type": "CU",

      "Reponses": [
        {
          "Reponse": "Evolution envisagée",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 1
            },
            {
              "Detail": "amélioration à court terme (inférieur à 1 an)",
              "Tri": 2
            },
            {
              "Detail": "amélioration à moyen et long terme (supérieur à 1 an)",
              "Tri": 3
            },
            {
              "Detail": "aggravation à court terme (inférieur à 1 an)",
              "Tri": 4
            },
            {
              "Detail": "aggravation à moyen et long terme (supérieur à 1 an)",
              "Tri": 5
            },
            {
              "Detail": "stabilité",
              "Tri": 6
            },
            {
              "Detail": "inconnue",
              "Tri": 7
            }
          ]
        },
      ]
    },
    {
      "Section": "Situation",
      "Description": "Evolution depuis la précédente demande",
      "Trajectoire": "toutes",
      "Question": "Quelle évolution de la situation a pu être constatée depui la précédente demande?",
      "Type": "CU",
      "Reponses": [
        {
          "Reponse": "Evolution depuis la précédente demande",
          "Details": [
            {
              "Detail": "amélioration",
              "Tri": 9
            },
            {
              "Detail": "aggravation",
              "Tri": 10
            },
            {
              "Detail": "stabilité",
              "Tri": 11
            }
          ]
        },
      ]
    },
    {
      "Section": "Besoins",
      "Description": "type de charge + description de la contrainte",
      "Trajectoire": "Toutes",
      "Question": "Quelles sont les prises en charges et aides dont bénificie la personne et les contraintes rencontrées dans la vie quotidienne?",
      "Type": "CM",
      "Reponses": [
        {
          "Reponse": "Traitement régulier",
          "Tri": 1
        },
        {
          "Reponse": "Consultations médicales régulières spécialisées ou non",
          "Tri": 2
        },
        {
          "Reponse": "Hospitalisations itératives ou programmées",
          "Tri": 3
        },
        {
          "Reponse": "prise en charge rééducative ou réadaptative régulière (kinésithérapeute, orthophoniste, ergothérapeute …)",
          "Tri": 4
        },
        {
          "Reponse": "Infirmier ",
          "Tri": 5
        },
        {
          "Reponse": "Psychologue",
          "Tri": 6
        },
        {
          "Reponse": "Necessité d'assurer une prévention",
          "Tri": 7
        },
        {
          "Reponse": "Autres soins réguliers",
          "Tri": 8
        },
        {
          "Reponse": "Existence de soins ou de traitements nocturnes",
          "Details": [
            {
              "Detail": "contrainte liée aux effets secondaires du traitement",
              "Tri": 10
            },
            {
              "Detail": "contrainte liée aux modalités de réalisation du traitement (maintien à proximité d'un dispositif de soin ou d'assistance, temps des soins, horaires, voie d'administration, assistance d'un tiers, appentissage de technique …)",
              "Tri": 11
            },
          ]
        },
        {
          "Reponse": "appareillage pour les déplacements",
          "Tri": 12
        },
        {
          "Reponse": "appareillage pour la communication",
          "Tri": 13
        },
        {
          "Reponse": "appareillage pour l'élimination",
          "Tri": 14
        },
        {
          "Reponse": "appareillage pour l'alimentation",
          "Tri": 15
        },
        {
          "Reponse": "appareillage pour la respiration",
          "Tri": 16
        },
        {
          "Reponse": "Autres appareillages ",
          "Tri": 17
        },
        {
          "Reponse": "Contraintes alimentaires",
          "Tri": 18
        },
        {
          "Reponse": "Contraintes liées à l'exposition à des facteurs externes",
          "Tri": 19
        }
      ]
    },
    {
      "Section": "Besoins",
      "Description": "Besoins de compensation identifiés",
      "Trajectoire": "Toutes",
      "Question": "Quels besoins de compensations ont-ils pu être identifiés?",
      "Type": "CM",
      "Reponses": [
        {
          "Reponse": "Besoins en matière de soins",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 1
            },
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 2
            },
          ]
        },

        {
          "Reponse": "soins médicaux en milieu hospitalier",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 3
            }
          ]
        },
        {
          "Reponse": "soins paramédicaux ambulatoires",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 4
            }
          ]
        },
        {
          "Reponse": "soins paramédicaux en milieu hospitalier",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 5
            }
          ]
        },
        {
          "Reponse": "Besoin en matière d'autonomie",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 6
            }
          ]
        },
        {
          "Reponse": "Pour accomplir ses actes essentiels",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 7
            }
          ]
        },
        {
          "Reponse": "Pour accomplir ses activités domestiques",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 8
            }
          ]
        },
        {
          "Reponse": "Pour vivre dans un logement",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 9
            }
          ]
        },
        {
          "Reponse": "Pour mener sa vie d'élève",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 10
            }
          ]
        },
        {
          "Reponse": "Pour vivre sa vie d'étudiant",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 11
            }
          ]
        },
        {
          "Reponse": "Pour avoir des activités de jour",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 12
            }
          ]
        },
        {
          "Reponse": "Pour vivre une vie professionnellement",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 13
            }
          ]
        },
        {
          "Reponse": "Pour accéder à ses droits",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 14
            }
          ]
        },
        {
          "Reponse": "Pour mener une vie sociale",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 15
            }
          ]
        },
        {
          "Reponse": "Besoins transversaux en matière d'autonomie",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 16
            }
          ]
        },
        {
          "Reponse": "Pour communiquer",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 17
            }
          ]
        },
        {
          "Reponse": "Pour assurer la sécurité",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 18
            }
          ]

        },
        {
          "Reponse": "Pour un répit des parents et des aidants",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 19
            }
          ]
        },
        {
          "Reponse": "Pour assurer une présence des parents et des aidants",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 20
            }
          ]
        },
        {
          "Reponse": "Besoins en matière de ressources",
          "Details": [
            {
              "Detail": "Exercer des tâches dans des conditions particulières",
              "Tri": 21
            }
          ]
        }
      ]
    }
  ]
