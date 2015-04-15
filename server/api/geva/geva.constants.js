'use strict';

exports.all =

[
  {
    "Section":"Environnement",
    "Description":"Composition du foyer",
    "Trajectoire":"toutes",
    "Question":"Quelle est la situation familiale de la personne ?",
    "Type":"CM",
    "Reponses": [
          {
        "Reponse": "vit seul",
        "Tri": 1,
        "CodeValeur":"II.1 bis.1"
          },
          {
              "Reponse":"vit avec d'autres personnes",
        "Tri":2,
        "CodeValeur":"II.1 bis.2"
          },
          {
        "Reponse":"a des relations familiales ou amicales",
        "Tri":3,
        "CodeValeur":"II.1 bis.4"
          },
          {
        "Reponse":"n'a pas de relation familiale ou amicale",
        "Tri":4,
        "CodeValeur":"II.1 bis.5"
          },
          {
        "Reponse":"âge < 16 ans ",
        "Tri":5,
        "CodeValeur":"II.1 bis.6"
      },
      {
        "Reponse":"âge entre 16 et 25 ans",
        "Tri":6,
        "CodeValeur":"II.1 bis.7"
      },
      {
        "Reponse":"âge > 25 ans",
        "Tri":7,
        "CodeValeur":"II.1 bis.8"
      }
        ]
  },
  {
    "Section":"Environnement",
    "Description":"Type d'hébergement (TYPHEB)",
    "Trajectoire":"toutes",
    "Question":"Où la personne est-elle hébergée? ",
    "Type":"CU",
    "Reponses":  [
      {
        "Reponse":"Domicile personnel",
        "Tri":1,
        "CodeValeur":"III.1.1"
      },
      {
        "Reponse":"Domicile familial",
        "Tri":2,
        "CodeValeur":"III.1.2"
      },
      {
        "Reponse":"Hébergé",
        "Tri":3,
        "CodeValeur":"III.1.3"
      },
      {
        "Reponse":"Etablissement médico-social",
        "Tri":4,
        "CodeValeur":"III.1.4"
      },
      {
        "Reponse":"Famille d'accueil",
        "Tri":5,
        "CodeValeur":"III.1.5"
      },
      {
        "Reponse":"Hôtel",
        "Tri":6,
        "CodeValeur":"III.1.6"
      },
      {
        "Reponse":"SDF",
        "Tri":7,
        "CodeValeur":"III.1.7"
      },
      {
        "Reponse":"Logement accompagné ou supervisé",
        "Tri":8,
        "CodeValeur":"III.1.8"
      },
      {
        "Reponse":"Hospitalisation ",
        "Tri":9,
        "CodeValeur":"III.1.9"
      },
      {
        "Reponse":"Autre ",
        "Tri":10,
        "CodeValeur":"III.1.10"
      }
    ]
  },
  {
    "Section":"Environnement",
    "Description":"caractéristiques du logement (TYPAEXT)",
    "Trajectoire":"toutes",
    "Question":"Le logement est-il adapté?",
    "Type":"CU",
    "Reponses": [
      {
        "Reponse":"logement accessible",
        "Tri":1,
        "CodeValeur":"III.5.4"
      },
      {
        "Reponse":"logement non accessible",
        "Tri":2,
        "CodeValeur":"III.5.5"
      }
    ]
  },
  {
    "Section":"Vie scolaire ou professionnelle",
    "Description":"Situation par rapport à l'activité (SITACT) + situation scolaire actuelle (SITSCO) + type d'activité professionnelle (TYPACT) ",
    "Trajectoire":"toutes",
    "Question":"Quelle est la situation de la personne par rapport à l'activité scolaire ou professionnelle?",
    "Type":"CM",
    "Reponses": [
      {
        "Reponse":"Enfant non scolarisé",
        "Tri":1,
        "CodeValeur":"II.2.1",
        "Details": [
          {
            "Detail":"enfant jamais scolarisé",
            "Tri":2,
            "CodeValeur":"II.2.1.a"
          },
          {
            "Detail":"enfant non scolarisé actuellement",
            "Tri":3,
            "CodeValeur":"II.2.1.b"
          }
        ]
      },
      {
        "Reponse":"Scolarisation, formation initiale et/ou autres formations non rémunérées",
        "Tri":4,
        "CodeValeur":"II.2.2"
      },
      {
        "Reponse":"Activité professionnelle même non rémunérée (y compris ESAT, apprentissage, formation professionnelle rémunérée, arrêt maladie)",
        "Tri":5,
        "CodeValeur":"II.2.3",
        "Details": [
          {
            "Detail":"salarié secteur privé",
            "Tri":6,
            "CodeValeur":"II.2.3.a"
          },
          {
            "Detail":"salarié secteur public",
            "Tri":7,
            "CodeValeur":"II.2.3.b"
          },
          {
            "Detail":"travailleur indépendant",
            "Tri":8,
            "CodeValeur":"II.2.3.c"
          },
          {
            "Detail":"salarié entreprise adaptée",
            "Tri":9,
            "CodeValeur":"II.2.3.d"
          },
          {
            "Detail":"travailleur en milieu protégé (ESAT)",
            "Tri":10,
            "CodeValeur":"II.2.3.e"
          }
        ]
      },
      {
        "Reponse":"Adulte sans activité ",
        "Tri":11,
        "CodeValeur":"II.2.4",
        "Details": [
          {
            "Detail":"Invalidité",
            "Tri":12,
            "CodeValeur":"II.2.4.a"
          },
          {
            "Detail":"Chômage",
            "Tri":13,
            "CodeValeur":"II.2.4.b"
          },
          {
            "Detail":"Retraité à l'âge normal",
            "Tri":14,
            "CodeValeur":"II.2.4.c"
          },
          {
            "Detail":"Retraite anticipée",
            "Tri":15,
            "CodeValeur":"II.2.4.d"
          },
          {
            "Detail":"Au foyer",
            "Tri":16,
            "CodeValeur":"II.2.4.e"
          },
          {
            "Detail":"Autre inactif",
            "Tri":17,
            "CodeValeur":"II.2.4.g"
          }
        ]
      },
    ]
  },
  {
    "Section":"Environnement",
    "Description":"ressources propres de la personne (SITREC)",
    "Trajectoire":"toutes",
    "Question":"Quelles sont les ressources dont elle dispose?",
    "Type":"CM",
    "Reponses":[
      {
        "Reponse":"Sans objet",
        "Tri":1,
        "CodeValeur":"II.3.1"
      },
      {
        "Reponse":"Salaire et autre revenu du travail",
        "Tri":2,
        "CodeValeur":"II.3.2"
      },
      {
        "Reponse":"ressources non issues du travail",
        "Tri":3,
        "CodeValeur":"II.3.3",
        "Details":[
          {
            "Detail":"Allocation chômage",
            "Tri":4,
            "CodeValeur":"II.3.3.a"
          },
          {
            "Detail":"Indemnités journalières assurance maladie",
            "Tri":5,
            "CodeValeur":"II.3.3.b"
          },
          {
            "Detail":"pension d'invalidité, rente AT ou MP",
            "Tri":6,
            "CodeValeur":"II.3.3.c",
            "SousDetails":[
              {
                "SousDetail":"Pension d'invalidité 1er cat",
                "Tri":7,
                "CodeValeur":"II.3.3.c.1"
              },
              {
                "SousDetail":"Pension d'invalidité 2ème cat ",
                "Tri":8,
                "CodeValeur":"II.3.3.c.2"
              },
              {
                "SousDetail":"Pension d'invalidité 3ème cat (MTP)",
                "Tri":9,
                "CodeValeur":"II.3.3.c.3"
              },
              {
                "SousDetail":"Allocation supplémentaire d'invalidité (FSI)",
                "Tri":10,
                "CodeValeur":"II.3.3.c.4"
              },
              {
                "SousDetail":"Autres pensions (régimes particuliers, assurances …)",
                "Tri":11,
                "CodeValeur":"II.3.3.c.5"
              },
              {
                "SousDetail":"Autres pensions avec MTP",
                "Tri":12,
                "CodeValeur":"II.3.3.c.6"
              }
            ]
          },
          {
            "Detail":"AAH",
            "Tri":13,
            "CodeValeur":"II.3.3.d"
          },
          {
            "Detail":"Complément de ressources",
            "Tri":14,
            "CodeValeur":"II.3.3.e"
          },
          {
            "Detail":"Majoration pour la vie autonome",
            "Tri":15,
            "CodeValeur":"II.3.3.f"
          },
          {
            "Detail":"RSA",
            "Tri":16,
            "CodeValeur":"II.3.3.g"
          },
          {
            "Detail":"Autre allocation",
            "Tri":17,
            "CodeValeur":"II.3.3.h"
          },
          {
            "Detail":"Retraite",
            "Tri":18,
            "CodeValeur":"II.3.3.i"
          },
          {
            "Detail":"Prestation familiale",
            "Tri":19,
            "CodeValeur":"II.3.3.j"
          },
          {
            "Detail":"Autres revenus",
            "Tri":20,
            "CodeValeur":"II.3.3.k"
          }
        ]
      },
      {
        "Reponse":"Absence de ressource personnelle",
        "Tri":21,
        "CodeValeur":"II.3.4"
      }
    ]
  },
  {
    "Section":"Environnement",
    "Description":"Caractéristiques transport (CARTRANSP)",
    "Trajectoire":"toutes",
    "Question":"Quels sont les moyens de transport utilisés par la personne?",
    "Type":"CM",
    "Reponses":[
      {
        "Reponse":" transports en commun",
        "Tri":1,
        "CodeValeur":"IV.2",
        "Details":[
          {
            "Detail":"Utilise les transports en commun",
            "Tri":2,
            "CodeValeur":"IV.2.1 "
          },
          {
            "Detail":"Utilise les transports en commun, avec un accompagnateur",
            "Tri":3,
            "CodeValeur":"IV.2.2"
          },
          {
            "Detail":"Utilise les transports de substitution",
            "Tri":4,
            "CodeValeur":"IV.2.3 "
          },
          {
            "Detail":"N’utilise aucun transport en commun ou de substitution",
            "Tri":5,
            "CodeValeur":"IV.2.4 "
          }
        ]
      },
      {
        "Reponse":"transports scolaires",
        "Tri":6,
        "CodeValeur":"IV.2.bis",
        "Details":[
          {
            "Detail":"Transport scolaire sans objet",
            "Tri":7,
            "CodeValeur":"IV.2.bis.1 "
          },
          {
            "Detail":"Est accompagné avec le véhicule de la famille",
            "Tri":8,
            "CodeValeur":"IV.2.bis.2"
          },
          {
            "Detail":"Utilise les transports scolaires collectifs de droit commun",
            "Tri":9,
            "CodeValeur":"IV.2.bis.3"
          },
          {
            "Detail":"Utilise un transport individuel ordinaire avec chauffeur",
            "Tri":10,
            "CodeValeur":"IV.2.bis.4"
          },
          {
            "Detail":"Utilise un transport sanitaire avec un accompagnateur",
            "Tri":11,
            "CodeValeur":"IV.2.bis.5"
          },
          {
            "Detail":"Utilise un transport sanitaire avec deux accompagnateurs",
            "Tri":12,
            "CodeValeur":"IV.2.bis.6"
          },
          {
            "Detail":"Est transporté dans un véhicule spécialement aménagé autre que le véhicule familial",
            "Tri":13,
            "CodeValeur":"IV.2.bis.7"
          }
        ]
      },
      {
        "Reponse":"véhicule personnel ou familial",
        "Tri":14,
        "CodeValeur":"IV.2.ter",
        "Details":[
          {
            "Detail":"N’a pas recours à un véhicule personnel ou familial",
            "Tri":15,
            "CodeValeur":"IV.2.ter.1 "
          },
          {
            "Detail":"A recours à un véhicule personnel ou familial comme passager",
            "Tri":16,
            "CodeValeur":"IV.2.ter.2"
          },
          {
            "Detail":"Est conducteur d’un véhicule sans permis",
            "Tri":17,
            "CodeValeur":"IV.2.ter.3"
          },
          {
            "Detail":"Est conducteur d’un véhicule avec permis",
            "Tri":18,
            "CodeValeur":"IV.2.ter.4",
            "SousDetails":[
              {
                "SousDetail":"Comportant une mention d’aménagement du véhicule et une durée de validité",
                "Tri":19,
                "CodeValeur":"IV.2.ter.4.a "
              },
              {
                "SousDetail":"Comportant une mention d’aménagement du véhicule mais sans durée de validité",
                "Tri":20,
                "CodeValeur":"IV.2.ter.4.b "
              },
              {
                "SousDetail":"Ne comportant pas de mention d’aménagement du véhicule mais une durée de validité",
                "Tri":21,
                "CodeValeur":"IV.2.ter.4.c "
              },
              {
                "SousDetail":"Ne comportant ni mention d’aménagement du véhicule ni de durée de validité",
                "Tri":22,
                "CodeValeur":"IV.2.ter.4.d "
              }

            ]
          },
          {
            "Detail":"En cours de formation au permis de conduire",
            "Tri":23,
            "CodeValeur":"IV.2.ter.5",
            "SousDetails":[
              {
                "SousDetail":"Avec avis du délégué à la formation routière",
                "Tri":24,
                "CodeValeur":"IV.2.ter.5.a"
              },
              {
                "SousDetail":"Sans avis du délégué à la formation routière",
                "Tri":25,
                "CodeValeur":"IV.2.ter.5.b"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "Section":"Vie scolaire ou professionnelle",
    "Description":"établissement fréquenté (TYPSCO)",
    "Trajectoire":"Vie scolaire uniquement",
    "Question":"quelle scolarité est-elle suivie ?",
    "Type":"CM",
    "Reponses":[
      {
        "Reponse":"établissement d'enseignement",
        "Tri":1,
        "CodeValeur":"V.1.bis.1",
        "Details":[
          {
            "Detail":"Classe ordinaire",
            "Tri":2,
            "CodeValeur":"V.1.bis.1.a",
            "SousDetails":[
              {
                "SousDetail":"1er degré",
                "Tri":3,
                "CodeValeur":"V.1.bis.1.a.1"
              },
              {
                "SousDetail":"2ème degré collège",
                "Tri":4,
                "CodeValeur":"V.1.bis.1.a.2"
              },
              {
                "SousDetail":"2ème degré lycée générale et technologique",
                "Tri":5,
                "CodeValeur":"V.1.bis.1.a.3"
              },
              {
                "SousDetail":"2ème degré lycée professionnel",
                "Tri":6,
                "CodeValeur":"V.1.bis.1.a.4"
              },
              {
                "SousDetail":"post bac",
                "Tri":7,
                "CodeValeur":"V.1.bis.1.a.5"
              }
            ]
          },
          {
            "Detail":"Classe pour l’inclusion scolaire (CLIS)",
            "Tri":8,
            "CodeValeur":"V.1.bis.1.b"
          },
          {
            "Detail":"unité localisée pour l’inclusion scolaire (ULIS)",
            "Tri":9,
            "CodeValeur":"V.1.bis.1.c"
          },
          {
            "Detail":"pôle d’accompagnement à la scolarisation des jeunes sourds (PASS)",
            "Tri":10,
            "CodeValeur":"V.1.bis.1.d"
          },
          {
            "Detail":"Formation au sein de l’enseignement supérieur (BTS, CPGE, université …)",
            "Tri":11,
            "CodeValeur":"V.1.bis.1.e"
          },
          {
            "Detail":"unité d’enseignement installée dans un établissement médico-social",
            "Tri":12,
            "CodeValeur":"V.1.bis.1.f"
          },
          {
            "Detail":"unité d’enseignement installée dans un établissement scolaire",
            "Tri":13,
            "CodeValeur":"V.1.bis.1.g"
          },
          {
            "Detail":"unité d’enseignement et scolarisation en milieu ordinaire en temps partagé",
            "Tri":14,
            "CodeValeur":"V.1.bis.1.h"
          },
          {
            "Detail":"Enseignement adapté (SEGPA, EREA)",
            "Tri":15,
            "CodeValeur":"V.1.bis.1.i"
          }
        ]
      },
      {
        "Reponse":"Autre type d’établissement",
        "Tri":16,
        "CodeValeur":"V.1.bis.2",
        "Details":[
          {
            "Detail":"Etablissement médico-social",
            "Tri":17,
            "CodeValeur":"V.1.bis.2.a"
          },
          {
            "Detail":"Etablissement sanitaire ou social",
            "Tri":18,
            "CodeValeur":"V.1.bis.2.b"
          }
        ]
      },
      {
        "Reponse":"autre type de scolarisation",
        "Tri":19,
        "CodeValeur":"V.1.bis.3",
        "Details":[
          {
            "Detail":"enseignement par le CNED ",
            "Tri":20,
            "CodeValeur":"V.1.bis.3.a"
          },
          {
            "Detail":"enseignement à domicile (SAPAD, autres…) ",
            "Tri":21,
            "CodeValeur":"V.1.bis.3.b "
          }
        ]
      }
    ]
  },
  {
    "Section":"Vie scolaire ou professionnelle",
    "Description":"temps de scolarisation",
    "Trajectoire":"Vie scolaire uniquement",
    "Question":"quel est le temps de scolarisation hebdomadaire ?",
    "Type":"CU",
    "Reponses":[
      {
        "Reponse":"Inférieur à une demi-journée",
        "Tri":1,
        "CodeValeur":"V.5.1"
      },
      {
        "Reponse":"1 demi-journée",
        "Tri":2,
        "CodeValeur":"V.5.2"
      },
      {
        "Reponse":"2 demi-journées",
        "Tri":3,
        "CodeValeur":"V.5.3"
      },
      {
        "Reponse":"3 demi-journées",
        "Tri":4,
        "CodeValeur":"V.5.4"
      },
      {
        "Reponse":"4 demi-journées",
        "Tri":5,
        "CodeValeur":"V.5.5"
      },
      {
        "Reponse":"5 demi-journées",
        "Tri":6,
        "CodeValeur":"V.5.6"
      },
      {
        "Reponse":"6 demi-journées",
        "Tri":7,
        "CodeValeur":"V.5.7"
      },
      {
        "Reponse":"7 demi-journées",
        "Tri":8,
        "CodeValeur":"V.5.8"
      },
      {
        "Reponse":"8 demi-journées",
        "Tri":9,
        "CodeValeur":"V.5.9"
      },
      {
        "Reponse":"9 demi-journées",
        "Tri":10,
        "CodeValeur":"V.5.10"
      },
      {
        "Reponse":"10 demi-journées et +",
        "Tri":11,
        "CodeValeur":"V.5.11"
      }
    ]
  },
  {
    "Section":"Vie scolaire ou professionnelle",
    "Description":"Evaluation scolarité (EVASCO)",
    "Trajectoire":"Vie scolaire uniquement",
    "Question":"comment se déroule la scolarité et quels résultats sont-ils globalement obtenus ?",
    "Type":"CU",
    "Reponses":[
      {
        "Reponse":"scolarité sans aménagements permettant des acquisitions comparables en rythme et en contenu à la moyenne de la classe d’âge",
        "Tri":1,
        "CodeValeur":"V.2.1"
      },
      {
        "Reponse":"scolarité sans aménagements ne permettant pas d’accéder aux acquisitions attendues pour la moyenne de la classe d’âge",
        "Tri":2,
        "CodeValeur":"V.2.2"
      },
      {
        "Reponse":"scolarité avec des aménagements permettant les acquisitions attendues pour la moyenne de la classe d’âge",
        "Tri":3,
        "CodeValeur":"V.2.3"
      },
      {
        "Reponse":"scolarité avec des aménagements, qui ne permet cependant pas d’accéder aux acquisitions attendues pour la moyenne de la classe d’âge",
        "Tri":4,
        "CodeValeur":"V.2.4"
      }
    ]
  },
  {
    "Section":"Vie scolaire ou professionnelle",
    "Description":"Niveau de formation professionnelle (NIVFORPRO)",
    "Trajectoire":"Vie professionnelle uniquement",
    "Question":"Quel est le niveau de formation professionnelle de la personne?",
    "Type":"CU",
    "Reponses":[
      {
        "Reponse":"Niveau I : Personnel occupant des emplois exigeant normalement une formation de niveau supérieur à celui de la maîtrise.",
        "Tri":1,
        "CodeValeur":"VI.1.bis.1"
      },
      {
        "Reponse":"Niveau II : Personnel occupant des emplois exigeant normalement une formation d'un niveau comparable à celui de la licence ou de la maîtrise.",
        "Tri":2,
        "CodeValeur":"VI.1.bis.2"
      },
      {
        "Reponse":"Niveau III : Personnel occupant des emplois qui exigent normalement des formations du niveau du diplôme des Instituts Universitaires de Technologie (DUT) ou du brevet de technicien supérieur (BTS) ou de fin de premier cycle de l'enseignement supérieur.",
        "Tri":3,
        "CodeValeur":"VI.1.bis.3"
      },
      {
        "Reponse":"Niveau IV : Personnel occupant des emplois de maîtrise ou d'ouvrier hautement qualifié et pouvant attester d'un niveau de formation équivalent à celui du brevet professionnel (BP), du brevet de technicien (BT), du bac professionnel ou du bac technologique.",
        "Tri":4,
        "CodeValeur":"VI.1.bis.4"
      },
      {
        "Reponse":"Niveau V : Personnel occupant des emplois exigeant normalement un niveau de formation équivalent à celui du brevet d'études professionnelles (BEP) ou du certificat d'aptitude professionnelle (CAP), et par assimilation, du certificat de formation professionnelle des ",
        "Tri":5,
        "CodeValeur":"VI.1.bis.5"
      },
      {
        "Reponse":"Niveau V bis : Personnel occupant des emplois supposant une formation spécialisée d'une durée maximum d'un an au delà du premier cycle de l'enseignement du second degré, du niveau du certificat de formation professionnelle.",
        "Tri":6,
        "CodeValeur":"VI.1.bis.6"
      },
      {
        "Reponse":"Niveau VI : Personnel occupant des emplois n'exigeant pas une formation allant au delà de la scolarité obligatoire",
        "Tri":7,
        "CodeValeur":"VI.1.bis.7"
      }
    ]
  },
  {
    "Section":"Vie scolaire ou professionnelle",
    "Description":"situation par rapport au travail (SITEMP) + interruption d'activité",
    "Trajectoire":"Vie professionnelle uniquement",
    "Question":"quelle est la situation par rapport au travail de la personne ?",
    "Type":"CM",
    "Reponses":[
      {
        "Reponse":"n'a jamais travaillé",
        "Tri":1,
        "CodeValeur":"VI.3.bis.1"
      },
      {
        "Reponse":"a déjà travaillé mais ne travaille pas actuellement",
        "Details":[
          {
            "Detail":"congé maternité",
            "Tri":3,
            "CodeValeur":"VI.3.bis.2.a"
          },
          {
            "Detail":"congé parental",
            "Tri":4,
            "CodeValeur":"VI.3.bis.2.b"
          },
          {
            "Detail":"arrêt maladie ou AT/MP",
            "Tri":5,
            "CodeValeur":"VI.3.bis.2.c"
          },
          {
            "Detail":"congé longue maladie ou longue durée",
            "Tri":6,
            "CodeValeur":"VI.3.bis.2.d"
          },
          {
            "Detail":"autre",
            "Tri":7,
            "CodeValeur":"VI.3.bis.2.e"
          }
        ]
      },
      {
        "Reponse":"travaille actuellement",
        "Tri":8,
        "CodeValeur":"VI.3.bis.3"
      }
    ]
  },
  {
    "Section":"Vie scolaire ou professionnelle",
    "Description":"aménagement du poste de travail + aptitude au poste",
    "Trajectoire":"Vie professionnelle uniquement",
    "Question":"quels sont les aménagements nécessaires et l'aptitude au poste ?",
    "Type":"CM",
    "Reponses":[
      {
        "Reponse":"pas besoin d'aménagement de poste",
        "Tri":1,
        "CodeValeur":"VI.4.sexies.1"
      },
      {
        "Reponse":"aménagement de poste déjà réalisé",
        "Tri":2,
        "CodeValeur":"VI.4.sexies.2"
      },
      {
        "Reponse":"aménagement de poste nécessaire mais non réalisé",
        "Tri":3,
        "CodeValeur":"VI.4.sexies.3"
      },
      {
        "Reponse":"apte sans restriction",
        "Tri":4,
        "CodeValeur":"VI.4.septies.1"
      },
      {
        "Reponse":"apte avec restriction",
        "Tri":5,
        "CodeValeur":"VI.4.septies.2"
      },
      {
        "Reponse":"inapte",
        "Tri":6,
        "CodeValeur":"VI.4.septies.3"
      }
    ]
  },
  {
    "Section":"Vie scolaire ou professionnelle",
    "Description":"Type de contrat (TYPCONT)",
    "Trajectoire":"Vie professionnelle uniquement",
    "Question":"Quel est le type de contrat de travail de la personne?",
    "Type":"CM",
    "Reponses":[
      {
        "Reponse":"Apprentissage",
        "Tri":1,
        "CodeValeur":"VI.4.bis.1 "
      },
      {
        "Reponse":"Stagiaire",
        "Tri":2,
        "CodeValeur":"VI.4.bis.2"
      },
      {
        "Reponse":"Contrat de travail aidé",
        "Tri":3,
        "CodeValeur":"VI.4.bis.3"
      },
      {
        "Reponse":"Contrat à durée déterminée (y compris saisonnier, vacataire...)",
        "Tri":4,
        "CodeValeur":"VI.4.bis.4"
      },
      {
        "Reponse":"Contrat à durée indéterminée (dont titulaire de la fonction publique)",
        "Tri":5,
        "CodeValeur":"VI.4.bis.5"
      },
      {
        "Reponse":"Intérim",
        "Tri":6,
        "CodeValeur":"VI.4.bis.6"
      },
      {
        "Reponse":"Autre",
        "Tri":7,
        "CodeValeur":"VI.4.bis.7"
      }
    ]
  },
  {
    "Section":"Vie scolaire ou professionnelle",
    "Description":"perspectives professionnelles",
    "Trajectoire":"Vie professionnelle uniquement",
    "Question":"quelles sont les perspectives envisagées par rapport à l'emploi ? ",
    "Type":"CU",
    "Reponses":[
      {
        "Reponse":"reclassement interne",
        "Tri":1,
        "CodeValeur":"VI.5.1"
      },
      {
        "Reponse":"aménagement des conditions de travail",
        "Tri":2,
        "CodeValeur":"VI.5.2"
      },
      {
        "Reponse":"licenciement envisagé",
        "Tri":3,
        "CodeValeur":"VI.5.3"
      },
      {
        "Reponse":"reconversion professionnelle",
        "Tri":4,
        "CodeValeur":"VI.5.4",
        "Details":[
          {
            "Detail":"formation professionnelle de droit commun",
            "Tri":5,
            "CodeValeur":"VI.5.4.a"
          },
          {
            "Detail":"formation professionnelle en CRP",
            "Tri":6,
            "CodeValeur":"VI.5.4.b"
          }
        ]
      },
      {
        "Reponse":"marché du travail (hors entreprise adaptée)",
        "Tri":7,
        "CodeValeur":"VI.5.6"
      },
      {
        "Reponse":"entreprise adaptée",
        "Tri":8,
        "CodeValeur":"VI.5.7"
      },
      {
        "Reponse":"milieu de travail protégé",
        "Tri":9,
        "CodeValeur":"VI.5.8"
      }
    ]
  },
  {
    "Section":"Vie personnelle",
    "Description":"Pathologie (CIM)",
    "Trajectoire":"Toutes",
    "Question":"Quelle est la pathologie principale de la personne?",
    "Type":"CU",
    "Reponses":[
      {
        "Reponse":"hépatites virales chroniques",
        "Tri":1,
        "CodeValeur":"B18"
      },
      {
        "Reponse":"VIH",
        "Tri":2,
        "CodeValeur":"B24"
      },
      {
        "Reponse":"Tumeur maligne de siège non précisé",
        "Tri":3,
        "CodeValeur":"C80"
      },
      {
        "Reponse":"Tumeur maligne des tissus lymphoïde, hématopoïétique et apparentés, sans précision",
        "Tri":4,
        "CodeValeur":"C969"
      },
      {
        "Reponse":"Autres maladies du sang et des organes hématopoïétiques",
        "Tri":5,
        "CodeValeur":"D75"
      },
      {
        "Reponse":"diabète sucré insulino dépendant",
        "Tri":6,
        "CodeValeur":"E10"
      },
      {
        "Reponse":"mucoviscidose",
        "Tri":7,
        "CodeValeur":"E840"
      },
      {
        "Reponse":"Démence, sans précision (dont Alzheimer)",
        "Tri":8,
        "CodeValeur":"F03"
      },
      {
        "Reponse":"Troubles mentaux et du comportement liés à l'utilisation de drogues multiples et troubles liés à l'utilisation d'autres substances psycho-actives, sans précision",
        "Tri":9,
        "CodeValeur":"F199"
      },
      {
        "Reponse":"schizophrénie",
        "Tri":10,
        "CodeValeur":"F20"
      },
      {
        "Reponse":"Trouble affectif bipolaire",
        "Tri":11,
        "CodeValeur":"F31"
      },
      {
        "Reponse":"Trouble dépressif récurrent",
        "Tri":12,
        "CodeValeur":"F33"
      },
      {
        "Reponse":"Trouble obsessionnel-compulsif",
        "Tri":13,
        "CodeValeur":"F42"
      },
      {
        "Reponse":"Retard mental, sans précision",
        "Tri":14,
        "CodeValeur":"F79"
      },
      {
        "Reponse":" TED",
        "Tri":15,
        "CodeValeur":"F84"
      },
      {
        "Reponse":"chorée de Huntington",
        "Tri":16,
        "CodeValeur":"G10"
      },
      {
        "Reponse":"SLA (maladie du motoneurone)",
        "Tri":17,
        "CodeValeur":"G122"
      },
      {
        "Reponse":"maladie de Parkinson",
        "Tri":18,
        "CodeValeur":"G20"
      },
      {
        "Reponse":"Autres affections dégénératives du système nerveux au cours d'affections classées ailleurs (hors Alzheimer, chorée, SLA, Parkinson, SEP)",
        "Tri":19,
        "CodeValeur":"G32"
      },
      {
        "Reponse":"SEP",
        "Tri":20,
        "CodeValeur":"G35"
      },
      {
        "Reponse":"épilepsie",
        "Tri":21,
        "CodeValeur":"G40"
      },
      {
        "Reponse":"affections neuromusculaires sans précision",
        "Tri":22,
        "CodeValeur":"G709"
      },
      {
        "Reponse":"encéphalopathie sans précision",
        "Tri":23,
        "CodeValeur":"G934"
      },
      {
        "Reponse":"Affection de l'oeil et de ses annexes, sans précision",
        "Tri":24,
        "CodeValeur":"H579"
      },
      {
        "Reponse":"Affection de l'oreille, sans précision",
        "Tri":25,
        "CodeValeur":" H939"
      },
      {
        "Reponse":"Insuffisance cardiaque",
        "Tri":26,
        "CodeValeur":"I50"
      },
      {
        "Reponse":"Maladie cardio-vasculaire, sans précision ",
        "Tri":27,
        "CodeValeur":"I516 "
      },
      {
        "Reponse":"Séquelles d'accident vasculaire cérébral, non précisé comme étant hémorragique ou par infarctus",
        "Tri":28,
        "CodeValeur":" I694"
      },
      {
        "Reponse":"Maladie pulmonaire obstructive chronique, sans précision ",
        "Tri":29,
        "CodeValeur":"J449"
      },
      {
        "Reponse":"Insuffisance respiratoire chronique",
        "Tri":30,
        "CodeValeur":"J961"
      },
      {
        "Reponse":"Autres troubles respiratoires",
        "Tri":31,
        "CodeValeur":"J98"
      },
      {
        "Reponse":"Gastro-entérite et colite non infectieuses, sans précision",
        "Tri":32,
        "CodeValeur":"K529 "
      },
      {
        "Reponse":"polyarthrose",
        "Tri":33,
        "CodeValeur":"M 15"
      },
      {
        "Reponse":"polyarthrite",
        "Tri":34,
        "CodeValeur":"M130"
      },
      {
        "Reponse":"Lombalgie",
        "Tri":35,
        "CodeValeur":"M545"
      },
      {
        "Reponse":"Insuffisance rénale chronique",
        "Tri":36,
        "CodeValeur":"N18"
      },
      {
        "Reponse":"Anomalie chromosomique, sans précision",
        "Tri":37,
        "CodeValeur":"Q999"
      },
      {
        "Reponse":"dysphasie",
        "Tri":38,
        "CodeValeur":"R470"
      },
      {
        "Reponse":"Dyslexie et autres troubles de la fonction symbolique, non classés ailleurs",
        "Tri":39,
        "CodeValeur":"R48"
      },
      {
        "Reponse":"Séquelles de lésions traumatiques de la tête",
        "Tri":40,
        "CodeValeur":"T90"
      },
      {
        "Reponse":"maladies rares",
        "Tri":41,
        "CodeValeur":"T990"
      },
      {
        "Reponse":"autres pathologies ",
        "Tri":42,
        "CodeValeur":"T991(autres codes de A00.0 à Z99.9)"
      }
    ]
  },
  {
    "Section":"Vie personnelle",
    "Description":"Déficiences (NATDEF) ",
    "Trajectoire":"Toutes",
    "Question":"Quelles sont les types de déficiences que présente la personne?",
    "Type":"CM",
    "Reponses":[
      {
        "Reponse":"DEFICIENCES INTELLECTUELLES ",
        "Tri":1,
        "CodeValeur":"VII.9.1",
        "Details":[
          {
            "Detail":"Retard mental dont :",
            "Tri":2,
            "CodeValeur":"VII.9.1.1",
            "SousDetails":[
              {
                "SousDetail":"Retard mental profond ( QI inférieur à 20 ou chez les adultes, âge mental inférieur à 3 ans)*",
                "Tri":3,
                "CodeValeur":"VII.9.1.1.a"
              },
              {
                "SousDetail":"Retard mental sévère (QI compris entre 20 et 34 ou chez les adultes, âge mental de 3 à 6 ans)*",
                "Tri":4,
                "CodeValeur":"VII.9.1.1.b"
              },
              {
                "SousDetail":"Retard mental moyen (QI compris entre 35 et 49 ou chez les adultes, âge mental de 6 à 9 ans)*",
                "Tri":5,
                "CodeValeur":"VII.9.1.1.c"
              },
              {
                "SousDetail":"Retard mental léger (QI compris entre 50 et 69 ou chez les adultes, âge mental de 9 à 12 ans)*",
                "Tri":6,
                "CodeValeur":"VII.9.1.1.d"
              },
              {
                "SousDetail":"roubles cognitifs sans retard mental, troubles des acquisitions et des apprentissages ",
                "Tri":7,
                "CodeValeur":"VII.9.1.1.e"
              },
              {
                "SousDetail":"retard mental non précisé",
                "Tri":8,
                "CodeValeur":"VII.9.1.1.f"
              }
            ]
          },
          {
            "Detail":"Démence globale ",
            "Tri":9,
            "CodeValeur":"VII.9.1.2 "
          },
          {
            "Detail":"Démence lacunaire ou partielle",
            "Tri":10,
            "CodeValeur":"VII.9.1.3"
          },
          {
            "Detail":"Autre déficience de la mémoire",
            "Tri":11,
            "CodeValeur":"VII.9.1.4 "
          },
          {
            "Detail":"Déficience du cours de la pensée",
            "Tri":12,
            "CodeValeur":"VII.9.1.5 "
          },
          {
            "Detail":"Déficiences intellectuelles non précisées",
            "Tri":13,
            "CodeValeur":"VII.9.1.7"
          }
        ]
      },
      {
        "Reponse":"DEFICIENCES DU PSYCHISME",
        "Tri":14,
        "CodeValeur":"VII.9.2",
        "Details":[
          {
            "Detail":"Déficience de la conscience et de la vigilance dont :",
            "Tri":15,
            "CodeValeur":"VII.9.2.1",
            "SousDetails":[
              {
                "SousDetail":"perte de conscience, coma",
                "Tri":16,
                "CodeValeur":"VII.9.2.1.a"
              },
              {
                "SousDetail":"désorientation temporo-spatiale, confusion mentale",
                "Tri":17,
                "CodeValeur":"VII.9.2.1.b"
              },
              {
                "SousDetail":"déficience intermittente de la conscience ( épilepsie) ",
                "Tri":18,
                "CodeValeur":"VII.9.2.1.c"
              },
              {
                "SousDetail":"Autres déficiences de la conscience ",
                "Tri":19,
                "CodeValeur":"VII.9.2.1.d"
              },
              {
                "SousDetail":"Troubles du comportement, de la personnalité et des capacités relationnelles",
                "Tri":20,
                "CodeValeur":"VII.9.2.2"
              }
            ]
          },
          {
            "Detail":"Déficience des émotions ou de la volition dont : ",
            "Tri":21,
            "CodeValeur":"VII.9.2.3",
            "SousDetails":[
              {
                "SousDetail":"déficience de l'émotion, des affects, de l'humeur ",
                "Tri":22,
                "CodeValeur":"VII.9.2.3.a"
              },
              {
                "SousDetail":"déficiences de la volition (passivité, soumission, compulsion…)",
                "Tri":23,
                "CodeValeur":"VII.9.2.3.b"
              }
            ]
          },
          {
            "Detail":"déficiences des fonctions psychomotrices",
            "Tri":24,
            "CodeValeur":"VII.9.2.4"
          },
          {
            "Detail":"Troubles de la perception ou de l’attention",
            "Tri":25,
            "CodeValeur":"VII.9.2.5"
          },
          {
            "Detail":"Troubles des pulsions",
            "Tri":26,
            "CodeValeur":"VII.9.2.6"
          },
          {
            "Detail":"Déficiences du psychisme non précisées",
            "Tri":27,
            "CodeValeur":"VII.9.2.8"
          }
        ]
      },
      {
        "Reponse":"DEFICIENCES DU LANGAGE ET DE LA PAROLE",
        "Tri":28,
        "CodeValeur":"VII.9.3",
        "Details":[
          {
            "Detail":"déficience sévère de la communication",
            "Tri":29,
            "CodeValeur":"VII.9.3.1 "
          },
          {
            "Detail":"déficiences de l'apprentissage du langage écrit ou oral",
            "Tri":30,
            "CodeValeur":"VII.9.3.2 "
          },
          {
            "Detail":"déficience de la voix ou de l'élocution",
            "Tri":31,
            "CodeValeur":"VII.9.3.3 "
          },
          {
            "Detail":"Déficiences du langage ou de la parole non précisées",
            "Tri":32,
            "CodeValeur":"VII.9.3.5"
          }
        ]
      },
      {
        "Reponse":"DEFICIENCES AUDITIVES",
        "Tri":33,
        "CodeValeur":"VII.9.4",
        "Details":[
          {
            "Detail":"Déficiences auditives bilatérales dont : ",
            "Tri":34,
            "CodeValeur":"VII.9.4.1",
            "SousDetails":[
              {
                "SousDetail":"déficience auditive profonde  bilatérale (supérieure à 90 Db.)",
                "Tri":35,
                "CodeValeur":"VII.9.4.1.a "
              },
              {
                "SousDetail":"déficience auditive sévère bilatérale (comprise entre 71 Db et 90 Db inclus)",
                "Tri":36,
                "CodeValeur":"VII.9.4.1.b "
              },
              {
                "SousDetail":"déficience auditive moyenne bilatérale",
                "Tri":37,
                "CodeValeur":"VII.9.4.1.c "
              },
              {
                "SousDetail":"déficience auditive légère bilatérale",
                "Tri":38,
                "CodeValeur":"VII.9.4.1.d "
              },
              {
                "SousDetail":"déficience auditive bilatérale sans autre indication",
                "Tri":39,
                "CodeValeur":"VII.9.4.1.e "
              }
            ]
          },
          {
            "Detail":"Déficiences auditives unilatérales",
            "Tri":40,
            "CodeValeur":"VII.9.4.2 "
          },
          {
            "Detail":"Acouphènes",
            "Tri":41,
            "CodeValeur":"VII.9.4.3 "
          },
          {
            "Detail":"Déficience de la fonction vestibulaire et de l'équilibration",
            "Tri":42,
            "CodeValeur":"VII.9.4.4"
          },
          {
            "Detail":"Déficiences auditives non précisées",
            "Tri":43,
            "CodeValeur":"VII.9.4.6"
          }
        ]
      },
      {
        "Reponse":"DEFICIENCES VISUELLES",
        "Tri":44,
        "CodeValeur":"VII.9.5 ",
        "Details":[
          {
            "Detail":"Déficiences visuelles dont : ",
            "Tri":45,
            "CodeValeur":"VII.9.5.1 ",
            "SousDetails":[
              {
                "SousDetail":"déficience visuelle profonde des 2 yeux",
                "Tri":46,
                "CodeValeur":"VII.9.5.1.a "
              },
              {
                "SousDetail":"déficience visuelle profonde d’un œil avec vision faible de l’autre",
                "Tri":47,
                "CodeValeur":"VII.9.5.1.b "
              },
              {
                "SousDetail":"déficience visuelle moyenne des deux yeux",
                "Tri":48,
                "CodeValeur":"VII.9.5.1.c "
              },
              {
                "SousDetail":"déficience visuelle d’un œil l’autre étant normal",
                "Tri":49,
                "CodeValeur":"VII.9.5.1.d "
              },
              {
                "SousDetail":"Déficience de l’acuité visuelle sans précision",
                "Tri":50,
                "CodeValeur":"VII.9.5.1.e "
              }
            ]
          },
          {
            "Detail":"déficience du champ visuel",
            "Tri":51,
            "CodeValeur":"VII.9.5.2 "
          },
          {
            "Detail":"déficience de la mobilité oculaire (nystagmus)",
            "Tri":52,
            "CodeValeur":"VII.9.5.3 "
          },
          {
            "Detail":"Déficiences visuelles non précisées",
            "Tri":53,
            "CodeValeur":"VII.9.5.5 "
          }
        ]
      },
      {
        "Reponse":"DEFICIENCES VISCERALES",
        "Tri":54,
        "CodeValeur":"VII.9.6 ",
        "Details": [
          {
            "Detail":"déficiences  cardiorespiratoires dont ",
            "Tri":55,
            "CodeValeur":"VII.9.6.1 ",
            "SousDetails":[
              {
                "SousDetail":"déficience de la fonction cardiovasculaire",
                "Tri":56,
                "CodeValeur":"VII.9.6.1.a "
              },
              {
                "SousDetail":"déficience de la fonction respiratoire",
                "Tri":58,
                "CodeValeur":"VII.9.6.1.b "
              }
            ]
          },
          {
            "Detail":"Déficience hépato-digestives dont : ",
            "Tri":59,
            "CodeValeur":"VII.9.6.2 ",
            "SousDetails":[
              {
                "SousDetail":"déficience de la fonction digestive",
                "Tri":60,
                "CodeValeur":"VII.9.6.2.a "
              },
              {
                "SousDetail":"déficience des fonctions hépatiques",
                "Tri":61,
                "CodeValeur":"VII.9.6.2.b "
              }
            ]
          },
          {
            "Detail":"Déficience rénales ou urinaires ",
            "Tri":62,
            "CodeValeur":"VII.9.6.3 ",
            "SousDetails":[
              {
                "SousDetail":"déficience des fonctions rénales",
                "Tri":63,
                "CodeValeur":"VII.9.6.3.a "
              },
              {
                "SousDetail":"déficience de l'élimination urinaire",
                "Tri":64,
                "CodeValeur":"VII.9.6.2.b "
              }
            ]
          },
          {
            "Detail":"déficience métabolique, endocrinienne ou enzymatique",
            "Tri":65,
            "CodeValeur":"VII.9.6.4"
          },
          {
            "Detail":"déficience hématologique ou du système immunitaire",
            "Tri":66,
            "CodeValeur":"VII.9.6.5"
          },
          {
            "Detail":"Déficiences viscérales non précisées",
            "Tri":67,
            "CodeValeur":"VII.9.6.7"
          }
        ]
      },
      {
        "Reponse":"DEFICIENCES MOTRICES",
        "Tri":68,
        "CodeValeur":"VII.9.7 ",
        "Details":[
          {
            "Detail":"Déficiences motrices par absence (amputation, agénésie) dont : ",
            "Tri":69,
            "CodeValeur":"VII.9.7.1 ",
            "SousDetails":[
              {
                "SousDetail":"Amputation proximale d'un membre supérieur (amputation totale)",
                "Tri":70,
                "CodeValeur":"VII.9.7.1.a "
              },
              {
                "SousDetail":"Amputation proximale d'un membre inférieur (amputation totale)",
                "Tri":71,
                "CodeValeur":"VII.9.7.1.b "
              },
              {
                "SousDetail":"Amputation des parties distales d'un membre",
                "Tri":72,
                "CodeValeur":"VII.9.7.1.c"
              },
              {
                "SousDetail":"Autres amputations et amputations multiples",
                "Tri":73,
                "CodeValeur":"VII.9.7.1.d "
              },
              {
                "SousDetail":"Absence complète ou incomplète d'un ou plusieurs membres sans autre indication",
                "Tri":74,
                "CodeValeur":"VII.9.7.1.e "
              },
              {
                "SousDetail":"agénésie ou amputation partielle d'un membre supérieur",
                "Tri":75,
                "CodeValeur":"VII.9.7.1.f "
              },
              {
                "SousDetail":"agénésie ou amputation partielle d'un membre inférieur",
                "Tri":76,
                "CodeValeur":"VII.9.7.1.g "
              },
              {
                "SousDetail":"agénésie ou amputation partielle ou totale des 2 membres supérieurs ou inférieurs",
                "Tri":77,
                "CodeValeur":"VII.9.7.1.h "
              },
              {
                "SousDetail":"agénésie ou amputation partielle ou totale des 4 membres",
                "Tri":78,
                "CodeValeur":"VII.9.7.1.i "
              }
            ]
          },
          {
            "Detail":"Déficiences motrices par atteinte de la commande neurologique dont :",
            "Tri":79,
            "CodeValeur":"VII.9.7.2 ",
            "SousDetails":[
              {
                "SousDetail":"déficience complète des quatre membres",
                "Tri":80,
                "CodeValeur":"VII.9.7.2.a "
              },
              {
                "SousDetail":"déficience incomplète des quatre membres",
                "Tri":81,
                "CodeValeur":"VII.9.7.2.b "
              },
              {
                "SousDetail":"déficience complète des deux membres inférieurs",
                "Tri":82,
                "CodeValeur":"VII.9.7.2.c "
              },
              {
                "SousDetail":"déficience incomplète des deux membres inférieurs",
                "Tri":83,
                "CodeValeur":"VII.9.7.2.d "
              },
              {
                "SousDetail":"déficience complète de deux membres homolatéraux",
                "Tri":84,
                "CodeValeur":"VII.9.7.2.e "
              },
              {
                "SousDetail":"déficience incomplète de deux membres homolatéraux",
                "Tri":85,
                "CodeValeur":"VII.9.7.2.f "
              },
              {
                "SousDetail":"Autre déficience complète ou incomplète d’un ou plusieurs membres",
                "Tri":86,
                "CodeValeur":"VII.9.7.2.g "
              }
            ]
          },
          {
            "Detail":"Déficience motrice de la tête et du tronc",
            "Tri":87,
            "CodeValeur":"VII.9.7.3 ",
            "SousDetails":[
              {
                "SousDetail":"déficience de la statique et de la posture",
                "Tri":88,
                "CodeValeur":"VII.9.7.3.a "
              },
              {
                "SousDetail":"Trouble du tonus",
                "Tri":89,
                "CodeValeur":"VII.9.7.3.b "
              },
              {
                "SousDetail":"autre déficience motrice de la tête ou du tronc",
                "Tri":90,
                "CodeValeur":"VII.9.7.3.c "
              }
            ]
          },
          {
            "Detail":"Déficiences mécaniques dont :",
            "Tri":91,
            "CodeValeur":"VII.9.7.4",
            "SousDetails":[
              {
                "SousDetail":"Ankylose d'un ou plusieurs membres",
                "Tri":92,
                "CodeValeur":"VII.9.7.4.a "
              },
              {
                "SousDetail":"Instabilité d'un ou plusieurs membres",
                "Tri":93,
                "CodeValeur":"VII.9.7.4.b "
              },
              {
                "SousDetail":"Difformité, déformation d'un ou plusieurs membres",
                "Tri":94,
                "CodeValeur":"VII.9.7.4.c "
              },
              {
                "SousDetail":"d'un ou des 2 membres supérieurs",
                "Tri":95,
                "CodeValeur":"VII.9.7.3.d "
              },
              {
                "SousDetail":"d'un ou des 2 membres inférieurs",
                "Tri":96,
                "CodeValeur":"VII.9.7.3.e "
              }
            ]
          },
          {
            "Detail":"Déficiences musculaires d'un ou plusieurs membres ",
            "Tri":97,
            "CodeValeur":"VII.9.7.5 "
          },
          {
            "Detail":"Déficiences complexes de la motricité dont : ",
            "Tri":98,
            "CodeValeur":"VII.9.7.6",
            "SousDetails":[
              {
                "SousDetail":"Mouvements anormaux",
                "Tri":99,
                "CodeValeur":"VII.9.7.6.a"
              },
              {
                "SousDetail":"Autre déficience de la coordination motrice ",
                "Tri":100,
                "CodeValeur":"VII.9.7.6.b"
              }
            ]
          },
          {
            "Detail":"Déficiences motrices non précisées",
            "Tri":101,
            "CodeValeur":"VII.9.7.8"
          }
        ]
      },
      {
        "Reponse":"AUTRES DEFICIENCES",
        "Tri":102,
        "CodeValeur":"VII.9.8 ",
        "Details":[
          {
            "Detail":"Déficiences esthétiques ",
            "Tri":103,
            "CodeValeur":"VII.9.8.1 "
          },
          {
            "Detail":"déficience esthétiques de la tête et du tronc",
            "Tri":104,
            "CodeValeur":"VII.9.8.1.a "
          },
          {
            "Detail":"déficiences esthétiques des membres",
            "Tri":105,
            "CodeValeur":"VII.9.8.1.b "
          },
          {
            "Detail":"Autres déficiences esthétiques",
            "Tri":106,
            "CodeValeur":"VII.9.8.1.c"
          },
          {
            "Detail":"Douleurs chroniques",
            "Tri":107,
            "CodeValeur":"VII.9.8.2 "
          },
          {
            "Detail":"Fatigue chronique",
            "Tri":108,
            "CodeValeur":"VII.9.8.3 "
          },
          {
            "Detail":"Déficiences non précisées",
            "Tri":109,
            "CodeValeur":"VII.9.8.5"
          }
        ]
      },
      {
        "Reponse":"plurihandicap",
        "Tri":110,
        "CodeValeur":"VII.9.10 "
      },
      {
        "Reponse":"polyhandicap",
        "Tri":111,
        "CodeValeur":"VII.9.11 "
      },
      {
        "Reponse":"Etat végétatif chronique",
        "Tri":112,
        "CodeValeur":"VII.9.12 "
      },
      {
        "Reponse":"handicap rare",
        "Tri":113,
        "CodeValeur":"VII.9.13"
      }
    ]
  },
  {
    "Section":"Vie personnelle",
    "Description":"type de charge (TYPCHARG) + types de contraintes médicales (CONDESC)",
    "Trajectoire":"Toutes",
    "Question":"Quelles sont les prises en charges et aides dont bénéficie la personne et les contraintes rencontrées dans la vie quotidienne?",
    "Type":"CM",
    "Reponses":[
      {
        "Reponse":"pas de prise en charge",
        "Tri":1,
        "CodeValeur":"VII.10.1"
      },
      {
        "Reponse":"Hospitalisations itératives ou programmées",
        "Tri":2,
        "CodeValeur":"VII.10.4",
        "Details":[
          {
            "Detail":"hospitalisation mensuelle",
            "Tri":3,
            "CodeValeur":"VI.10.4.a"
          },
          {
            "Detail":"hospitalisation trimestrielle",
            "Tri":4,
            "CodeValeur":"VI.10.4.b"
          },
          {
            "Detail":"hospitalisation annuelle",
            "Tri":5,
            "CodeValeur":"VI.10.4.c"
          },
          {
            "Detail":"hospitalisation autre",
            "Tri":6,
            "CodeValeur":"VI.10.4.d"
          }
        ]
      },
      {
        "Reponse":"kinésithérapeute",
        "Tri":7,
        "CodeValeur":"VII.10.5",
        "Details":[
          {
            "Detail":"kinésithérapeute hebdomadaire",
            "Tri":8,
            "CodeValeur":"VII.10.5.a"
          },
          {
            "Detail":"kinésithérapeute mensuelle",
            "Tri":9,
            "CodeValeur":"VII.10.5.b"
          },
          {
            "Detail":"kinésithérapeute trimestrielle",
            "Tri":10,
            "CodeValeur":"VII.10.5.c"
          },
          {
            "Detail":"kinésithérapeute autre",
            "Tri":11,
            "CodeValeur":"VII.10.5.d"
          }
        ]
      },
      {
        "Reponse":"Infirmier ",
        "Tri":12,
        "CodeValeur":"VII.10.6",
        "Details":[
          {
            "Detail":"Infirmier hebdomadaire",
            "Tri":13,
            "CodeValeur":"VII.10.6.a"
          },
          {
            "Detail":"Infirmier mensuelle",
            "Tri":14,
            "CodeValeur":"VII.10.6.b"
          },
          {
            "Detail":"Infirmier trimestrielle",
            "Tri":15,
            "CodeValeur":"VII.10.6.c"
          },
          {
            "Detail":"Infirmier autre",
            "Tri":16,
            "CodeValeur":"VII.10.6.d"
          }
        ]
      },
      {
        "Reponse":"orthophoniste",
        "Tri":17,
        "CodeValeur":"VII.10.7",
        "Details":[
          {
            "Detail":"orthophoniste hebdomadaire",
            "Tri":18,
            "CodeValeur":"VII.10.7.a"
          },
          {
            "Detail":"orthophoniste mensuelle",
            "Tri":19,
            "CodeValeur":"VII.10.7.b"
          },
          {
            "Detail":"orthophoniste trimestrielle",
            "Tri":20,
            "CodeValeur":"VII.10.7.c"
          },
          {
            "Detail":"orthophoniste autre",
            "Tri":21,
            "CodeValeur":"VII.10.7.d"
          }
        ]
      },
      {
        "Reponse":"psychologue",
        "Tri":22,
        "CodeValeur":"VII.10.8",
        "Details":[
          {
            "Detail":"Psychologue hebdomadaire",
            "Tri":23,
            "CodeValeur":"VII.10.8.a"
          },
          {
            "Detail":"Psychologue mensuelle",
            "Tri":24,
            "CodeValeur":"VII.10.8.b"
          },
          {
            "Detail":"Psychologue trimestrielle",
            "Tri":25,
            "CodeValeur":"VII.10.8.c"
          },
          {
            "Detail":"Psychologue autre",
            "Tri":26,
            "CodeValeur":"VII.10.8.d"
          }
        ]
      },
      {
        "Reponse":"ergothérapeute",
        "Tri":29,
        "CodeValeur":"VII.10.9",
        "Details":[
          {
            "Detail":"ergothérapeute hebdomadaire",
            "Tri":28,
            "CodeValeur":"VII.10.9.a"
          },
          {
            "Detail":"ergothérapeute mensuelle",
            "Tri":29,
            "CodeValeur":"VII.10.9.b"
          },
          {
            "Detail":"ergothérapeute trimestrielle",
            "Tri":30,
            "CodeValeur":"VII.10.9.c"
          },
          {
            "Detail":"ergothérapeute autre",
            "Tri":31,
            "CodeValeur":"VII.10.9.d"
          }
        ]
      },
      {
        "Reponse":"autre prise en charge régulière par un professionnel",
        "Tri":32,
        "CodeValeur":"VII.10.10",
        "Details":[
          {
            "Detail":"autre prise en charge régulière par un professionnel hebdomadaire",
            "Tri":33,
            "CodeValeur":"VII.10.10.a"
          },
          {
            "Detail":"autre prise en charge régulière par un professionnel mensuelle",
            "Tri":34,
            "CodeValeur":"VII.10.10.b"
          },
          {
            "Detail":"autre prise en charge régulière par un professionnel trimestrielle",
            "Tri":35,
            "CodeValeur":"VII.10.10.c"
          },
          {
            "Detail":"autre prise en charge régulière par un professionnel autre",
            "Tri":36,
            "CodeValeur":"VII.10.10.d"
          }
        ]
      },
      {
        "Reponse":"Necessité d'assurer une prévention",
        "Tri":37,
        "CodeValeur":"VII.10.11",
        "Details":[
          {
            "Detail":"cutanée",
            "Tri":38,
            "CodeValeur":"VII.10.11.b"
          },
          {
            "Detail":"urinaire et intestinale",
            "Tri":39,
            "CodeValeur":"VII.10.11.c"
          },
          {
            "Detail":"pulmonaire",
            "Tri":40,
            "CodeValeur":"VII.10.11.d"
          },
          {
            "Detail":"circulatoire",
            "Tri":41,
            "CodeValeur":"VII.10.11.e"
          },
          {
            "Detail":"orthopédique",
            "Tri":42,
            "CodeValeur":"VII.10.11.f"
          },
          {
            "Detail":"thermique",
            "Tri":43,
            "CodeValeur":"VII.10.11.g"
          },
          {
            "Detail":"autre",
            "Tri":44,
            "CodeValeur":"VII.10.11.h"
          }
        ]
      },
      {
        "Reponse":"accompagnement par une structure ou un service",
        "Tri":45,
        "CodeValeur":"VII.10.13",
        "Details":[
          {
            "Detail":"CAMSP",
            "Tri":46,
            "CodeValeur":"VII.10.13 a"
          },
          {
            "Detail":"CMPP",
            "Tri":47,
            "CodeValeur":"VII.10.13 b"
          },
          {
            "Detail":"CMP",
            "Tri":48,
            "CodeValeur":"VII.10.13 c"
          },
          {
            "Detail":"CATTP",
            "Tri":49,
            "CodeValeur":"VII.10.13 d"
          },
          {
            "Detail":"hôpital de jour",
            "Tri":50,
            "CodeValeur":"VII.10.13 e"
          },
          {
            "Detail":"SESSAD",
            "Tri":51,
            "CodeValeur":"VII.10.13 f"
          },
          {
            "Detail":"SAVS",
            "Tri":52,
            "CodeValeur":"VII.10.13 g"
          },
          {
            "Detail":"SAMSAH",
            "Tri":53,
            "CodeValeur":"VII.10.13 h"
          },
          {
            "Detail":"établissement médico social",
            "Tri":54,
            "CodeValeur":"VII.10.13 i",
            "SousDetails":[
              {
                "SousDetail":"IME",
                "Tri":55,
                "CodeValeur":"VII.10.13 i.1"
              },
              {
                "SousDetail":"ITEP",
                "Tri":56,
                "CodeValeur":"VII.10.13 i.2"
              },
              {
                "SousDetail":"IEM",
                "Tri":57,
                "CodeValeur":"VII.10.13 i.3"
              },
              {
                "SousDetail":"CRDV",
                "Tri":58,
                "CodeValeur":"VII.10.13 i.4"
              },
              {
                "SousDetail":"autre établissement médico-social enfant",
                "Tri":59,
                "CodeValeur":"VII.10.13 i.5"
              },
              {
                "SousDetail":"FH",
                "Tri":60,
                "CodeValeur":"VII.10.13 i.6"
              },
              {
                "SousDetail":"FO",
                "Tri":61,
                "CodeValeur":"VII.10.13 i.7"
              },
              {
                "SousDetail":"FAM",
                "Tri":62,
                "CodeValeur":"VII.10.13 i.8"
              },
              {
                "SousDetail":"MAS",
                "Tri":63,
                "CodeValeur":"VII.10.13 i.9"
              }
            ]
          },
          {
            "Detail":"SSIAD",
            "Tri":64,
            "CodeValeur":"VII.10.13 j"
          },
          {
            "Detail":"autre",
            "Tri":65,
            "CodeValeur":"VII.10.13 k"
          }
        ]
      },
      {
        "Reponse":"pas de contrainte liée aux traitements ou aux soins",
        "Tri":66,
        "CodeValeur":"VII.11.1"
      },
      {
        "Reponse":"Existence de soins ou de traitements nocturnes",
        "Tri":67,
        "CodeValeur":"VII.11.2"
      },
      {
        "Reponse":"contrainte liée aux effets secondaires du traitement",
        "Tri":68,
        "CodeValeur":"VI.11.3"
      },
      {
        "Reponse":"contrainte liée aux modalités de réalisation du traitement (maintien à proximité d'un dispositif de soin ou d'assistance, temps des soins, horaires, voie d'administration, assistance d'un tiers, appentissage de technique …)",
        "Tri":69,
        "CodeValeur":"VI.11.4",
        "Details":[
          {
            "Detail":"temps consacré aux soins",
            "Tri":70,
            "CodeValeur":"VI.11.4.a"
          },
          {
            "Detail":"horaires",
            "Tri":71,
            "CodeValeur":"VI.11.4.b"
          },
          {
            "Detail":"voie d'administration",
            "Tri":72,
            "CodeValeur":"VI.11.4.c"
          },
          {
            "Detail":"apprentiissage de technique",
            "Tri":73,
            "CodeValeur":"VI.11.4.d"
          },
          {
            "Detail":"assistance d'un tiers",
            "Tri":74,
            "CodeValeur":"VI.11.4.e"
          },
          {
            "Detail":"charge affective",
            "Tri":75,
            "CodeValeur":"VI.11.4.f"
          },
          {
            "Detail":"autre",
            "Tri":76,
            "CodeValeur":"VI.11.4.g"
          }
        ]
      },
      {
        "Reponse":"appareillage",
        "Tri":77,
        "CodeValeur":"VII.11.bis",
        "Details":[
          {
            "Detail":"appareillage pour les déplacements",
            "Tri":78,
            "CodeValeur":"VII.11.bis.15"
          },
          {
            "Detail":"appareillage pour la communication",
            "Tri":79,
            "CodeValeur":"VII.11.bis.16"
          },
          {
            "Detail":"appareillage pour l'élimination",
            "Tri":80,
            "CodeValeur":"VII.11.bis.17"
          },
          {
            "Detail":"appareillage pour l'alimentation",
            "Tri":81,
            "CodeValeur":"VII.11.bis.18"
          },
          {
            "Detail":"appareillage pour la respiration",
            "Tri":82,
            "CodeValeur":"VII.11.bis.19"
          },
          {
            "Detail":"Autres appareillages ",
            "Tri":83,
            "CodeValeur":"VII.11.bis.20"
          }
        ]
      },
      {
        "Reponse":"contraintes alimentaires",
        "Tri":84,
        "CodeValeur":"VII.11.ter.2"
      },
      {
        "Reponse":"contraintes liées à l'exposition à des facteurs externes",
        "Tri":85,
        "CodeValeur":"VII.11.ter.3"
      },
      {
        "Reponse":"autres contraintes",
        "Tri":86,
        "CodeValeur":"VII.11.ter.4"
      }
    ]
  },
  {
    "Section":"Vie personnelle",
    "Description":"Activités (CAPTYP)",
    "Trajectoire":"toutes",
    "Question":"Pour quelles activités la personne rencontre-t-elle des difficultés?",
    "Type":"CM",
    "Reponses":[
      {
        "Reponse":"Tâches et exigences générales, relation avec autrui : gère ces activités sans difficulté",
        "Tri":2,
        "CodeValeur":"IX.1.bis",
        "Details":[
          {
            "Detail":"S'orienter dans le temps",
            "Tri":3,
            "CodeValeur":"IX.1.bis.1"
          },
          {
            "Detail":"S'orienter dans l'espace",
            "Tri":4,
            "CodeValeur":"IX.1.bis.2"
          },
          {
            "Detail":"Fixer son attention",
            "Tri":5,
            "CodeValeur":"IX.1.bis.3"
          },
          {
            "Detail":"Mémoriser",
            "Tri":6,
            "CodeValeur":"IX.1bis.4"
          },
          {
            "Detail":"Prendre des décisions",
            "Tri":7,
            "CodeValeur":"IX.1.bis.5"
          },
          {
            "Detail":"Prendre des initiatives",
            "Tri":8,
            "CodeValeur":"IX.1.bis.6",
            "SousDetails":[
              {
                "SousDetail":"Faire spontanément une demande d’aide",
                "Tri":9,
                "CodeValeur":"IX.1.bis.6.1"
              },
              {
                "SousDetail":"Entrer spontanément en relation avec autrui ",
                "Tri":10,
                "CodeValeur":"IX.1.bis.6.2"
              },
              {
                "SousDetail":"Entreprendre spontanément une activité simple",
                "Tri":11,
                "CodeValeur":"IX.1.bis.6.3"
              },
              {
                "SousDetail":"Entreprendre spontanément une activité complexe",
                "Tri":12,
                "CodeValeur":"IX.1.bis.6.4"
              }
            ]
          },
          {
            "Detail":"Gérer sa sécurité",
            "Tri":13,
            "CodeValeur":"IX.1.bis.7",
            "SousDetails":[
              {
                "SousDetail":"Ne pas mettre sa vie et/ou celle des autres en danger",
                "Tri":14,
                "CodeValeur":"IX.1.bis.7.1"
              },
              {
                "SousDetail":"Réagir de façon adaptée face à une situation risquée",
                "Tri":15,
                "CodeValeur":"IX.1.bis.7.2"
              }
            ]
          },
          {
            "Detail":"Respecter les règles de vie",
            "Tri":16,
            "CodeValeur":"IX.1.bis.8"
          },
          {
            "Detail":"Avoir des relations avec autrui conformes aux règles sociales",
            "Tri":17,
            "CodeValeur":"IX.1.bis.9"
          },
          {
            "Detail":"Maîtriser son comportement dans ses relations avec autrui",
            "Tri":18,
            "CodeValeur":"IX.1.bis.10"
          },
          {
            "Detail":"Avoir des relations avec ses pairs",
            "Tri":19,
            "CodeValeur":"IX.1.bis.11"
          },
          {
            "Detail":"Avoir des relations affectives et sexuelles",
            "Tri":20,
            "CodeValeur":"IX.1.bis.12"
          }
        ]
      },
      {
        "Reponse":"Tâches et exigences générales, relation avec autrui : gère ces activités avec difficultés mais de façon autonome",
        "Tri":21,
        "CodeValeur":"IX.1.ter",
        "Details":[
          {
            "Detail":"S'orienter dans le temps",
            "Tri":22,
            "CodeValeur":"IX.1.ter.1"
          },
          {
            "Detail":"S'orienter dans l'espace",
            "Tri":23,
            "CodeValeur":"IX.1.ter.2"
          },
          {
            "Detail":"Fixer son attention",
            "Tri":24,
            "CodeValeur":"IX.1.ter.3"
          },
          {
            "Detail":"Mémoriser",
            "Tri":25,
            "CodeValeur":"IX.1.ter.4"
          },
          {
            "Detail":"Prendre des décisions",
            "Tri":26,
            "CodeValeur":"IX.1.ter.5"
          },
          {
            "Detail":"Prendre des initiatives",
            "Tri":27,
            "CodeValeur":"IX.1.ter.6",
            "SousDetails":[
              {
                "SousDetail":"Faire spontanément une demande d’aide",
                "Tri":28,
                "CodeValeur":"IX.1.ter.6.1"
              },
              {
                "SousDetail":"Entrer spontanément en relation avec autrui ",
                "Tri":29,
                "CodeValeur":"IX.1.ter.6.2"
              },
              {
                "SousDetail":"Entreprendre spontanément une activité simple",
                "Tri":30,
                "CodeValeur":"IX.1.ter.6.3"
              },
              {
                "SousDetail":"Entreprendre spontanément une activité complexe",
                "Tri":31,
                "CodeValeur":"IX.1.ter.6.4"
              }
            ]
          },
          {
            "Detail":"Gérer sa sécurité",
            "Tri":32,
            "CodeValeur":"IX.1.ter.7",
            "SousDetails":[
              {
                "SousDetail":"Ne pas mettre sa vie et/ou celle des autres en danger",
                "Tri":33,
                "CodeValeur":"IX.1.ter.7.1"
              },
              {
                "SousDetail":"Réagir de façon adaptée face à une situation risquée",
                "Tri":34,
                "CodeValeur":"IX.1.ter.7.2"
              }
            ]
          },
          {
            "Detail":"Respecter les règles de vie",
            "Tri":35,
            "CodeValeur":"IX.1.ter.8"
          },
          {
            "Detail":"Avoir des relations avec autrui conformes aux règles sociales",
            "Tri":36,
            "CodeValeur":"IX.1.ter.9"
          },
          {
            "Detail":"Maîtriser son comportement dans ses relations avec autrui",
            "Tri":37,
            "CodeValeur":"IX.1.ter.10"
          },
          {
            "Detail":"Avoir des relations avec ses pairs",
            "Tri":38,
            "CodeValeur":"IX.1.ter.11"
          },
          {
            "Detail":"Avoir des relations affectives et sexuelles",
            "Tri":39,
            "CodeValeur":"IX.1.ter.12"
          }
        ]
      },
      {
        "Reponse":"Tâches et exigences générales, relation avec autrui : ne gère pas ces activités de façon autonome ",
        "Tri":40,
        "CodeValeur":"IX.1.quater",
        "Details":[
          {
            "Detail":"S'orienter dans le temps",
            "Tri":41,
            "CodeValeur":"IX.1.quater.1"
          },
          {
            "Detail":"S'orienter dans l'espace",
            "Tri":42,
            "CodeValeur":"IX.1.quater.2"
          },
          {
            "Detail":"Fixer son attention",
            "Tri":43,
            "CodeValeur":"IX.1.quater.3"
          },
          {
            "Detail":"Mémoriser",
            "Tri":44,
            "CodeValeur":"IX.1.quater.4"
          },
          {
            "Detail":"Prendre des décisions",
            "Tri":45,
            "CodeValeur":"IX.1.quater.5"
          },
          {
            "Detail":"Prendre des initiatives",
            "Tri":46,
            "CodeValeur":"IX.1.quater.6",
            "SousDetails":[
              {
                "SousDetail":"Faire spontanément une demande d’aide",
                "Tri":47,
                "CodeValeur":"IX.1.quater.6.1"
              },
              {
                "SousDetail":"Entrer spontanément en relation avec autrui ",
                "Tri":48,
                "CodeValeur":"IX.1.quater.6.2"
              },
              {
                "SousDetail":"Entreprendre spontanément une activité simple",
                "Tri":49,
                "CodeValeur":"IX.1.quater.6.3"
              },
              {
                "SousDetail":"Entreprendre spontanément une activité complexe",
                "Tri":50,
                "CodeValeur":"IX.1.quater.6.4"
              }
            ]
          },
          {
            "Detail":"Gérer sa sécurité",
            "Tri":51,
            "CodeValeur":"IX.1.quater.7",
            "SousDetails":[
              {
                "SousDetail":"Ne pas mettre sa vie et/ou celle des autres en danger",
                "Tri":52,
                "CodeValeur":"IX.1.quater.7.1"
              },
              {
                "SousDetail":"Réagir de façon adaptée face à une situation risquée",
                "Tri":53,
                "CodeValeur":"IX.1.quater.7.2"
              }
            ]
          },
          {
            "Detail":"Respecter les règles de vie",
            "Tri":54,
            "CodeValeur":"IX.1.quater.8"
          },
          {
            "Detail":"Avoir des relations avec autrui conformes aux règles sociales",
            "Tri":55,
            "CodeValeur":"IX.1.quater.9"
          },
          {
            "Detail":"Maîtriser son comportement dans ses relations avec autrui",
            "Tri":56,
            "CodeValeur":"IX.1.quater.10"
          },
          {
            "Detail":"Avoir des relations avec ses pairs",
            "Tri":57,
            "CodeValeur":"IX.1.quater.11"
          },
          {
            "Detail":"Avoir des relations affectives et sexuelles",
            "Tri":58,
            "CodeValeur":"IX.1.quater.12"
          }
        ]
      },
      {
        "Reponse":"Mobilité Manipulation : gère ces activités sans difficulté",
        "Tri":60,
        "CodeValeur":"IX.2.bis",
        "Details":[
          {
            "Detail":"Se mettre debout",
            "Tri":61,
            "CodeValeur":"IX.2.bis.1",
            "SousDetails":[
              {
                "SousDetail":"Se coucher",
                "Tri":62,
                "CodeValeur":"IX.2.bis.1.1"
              },
              {
                "SousDetail":"S'asseoir",
                "Tri":63,
                "CodeValeur":"IX.2.bis.1.2"
              }
            ]
          },
          {
            "Detail":"Faire ses transferts",
            "Tri":64,
            "CodeValeur":"IX.2.bis.2"
          },
          {
            "Detail":"Changer de point d'appui",
            "Tri":65,
            "CodeValeur":"IX.2.bis.3"
          },
          {
            "Detail":"Rester assis",
            "Tri":66,
            "CodeValeur":"IX.2.bis.4"
          },
          {
            "Detail":"Rester debout",
            "Tri":67,
            "CodeValeur":"IX.2.bis.5"
          },
          {
            "Detail":"Marcher",
            "Tri":68,
            "CodeValeur":"IX.2.bis.6"
          },
          {
            "Detail":"Se déplacer dans le logement, à l'extérieur",
            "Tri":69,
            "CodeValeur":"IX.2.bis.7",
            "SousDetails":[
              {
                "SousDetail":"Se déplacer dans le logement",
                "Tri":70,
                "CodeValeur":"IX.2.bis.7.1"
              },
              {
                "SousDetail":"Se déplacer à l'extérieur",
                "Tri":71,
                "CodeValeur":"IX.2.bis.7.2"
              }
            ]
          },
          {
            "Detail":"Utiliser des escaliers",
            "Tri":75,
            "CodeValeur":"IX.2.bis.7.2.a"
          },
          {
            "Detail":"Utiliser les transports en commun",
            "Tri":76,
            "CodeValeur":"IX.2.bis.7.2.b"
          },
          {
            "Detail":"Utiliser un véhicule particulier",
            "Tri":77,
            "CodeValeur":"IX.2.bis.7.2.c"
          },
          {
            "Detail":"Conduire un véhicule",
            "Tri":78,
            "CodeValeur":"IX.2.bis.8"
          },
          {
            "Detail":"Utiliser la préhension de la main dominante",
            "Tri":79,
            "CodeValeur":"IX.2.bis.9"
          },
          {
            "Detail":"Utiliser la préhension de la main non dominante",
            "Tri":80,
            "CodeValeur":"IX.2.bis.10"
          },
          {
            "Detail":"Avoir des activités de motricité fine",
            "Tri":81,
            "CodeValeur":"IX.2.bis.11"
          },
          {
            "Detail":"Avoir une coordination bi-manuelle",
            "Tri":82,
            "CodeValeur":"IX.2.bis.12"
          },
          {
            "Detail":"Soulever et porter des objets (y compris en se déplaçant)",
            "Tri":83,
            "CodeValeur":"IX.2.bis.12"
          }
        ]
      },
      {
        "Reponse":"Mobilité Manipulation : gère ces activités avec difficultés mais de façon autonome",
        "Tri":84,
        "CodeValeur":"IX.2.ter",
        "Details":[
          {
            "Detail":"Se mettre debout",
            "Tri":85,
            "CodeValeur":"IX.2.ter.1",
            "SousDetails":[
              {
                "SousDetail":"Se coucher",
                "Tri":86,
                "CodeValeur":"IX.2.ter.1.1"
              },
              {
                "SousDetail":"S'asseoir",
                "Tri":87,
                "CodeValeur":"IX.2.ter.1.2"
              }
            ]
          },
          {
            "Detail":"Faire ses transferts",
            "Tri":88,
            "CodeValeur":"IX.2.ter.2"
          },
          {
            "Detail":"Changer de point d'appui",
            "Tri":89,
            "CodeValeur":"IX.2.ter.3"
          },
          {
            "Detail":"Rester assis",
            "Tri":90,
            "CodeValeur":"IX.2.ter.4"
          },
          {
            "Detail":"Rester debout",
            "Tri":91,
            "CodeValeur":"IX.2.ter.5"
          },
          {
            "Detail":"Marcher",
            "Tri":92,
            "CodeValeur":"IX.2.ter.6"
          },
          {
            "Detail":"Se déplacer dans le logement, à l'extérieur",
            "Tri":93,
            "CodeValeur":"IX.2.ter.7",
            "SousDetails":[
              {
                "SousDetail":"Se déplacer dans le logement",
                "Tri":94,
                "CodeValeur":"IX.2.ter.7.1"
              },
              {
                "SousDetail":"Se déplacer à l'extérieur",
                "Tri":95,
                "CodeValeur":"IX.2.ter.7.2"
              }
            ]
          },
          {
            "Detail":"Utiliser des escaliers",
            "Tri":99,
            "CodeValeur":"IX.2.ter.8"
          },
          {
            "Detail":"Utiliser les transports en commun",
            "Tri":100,
            "CodeValeur":"IX.2.ter.9"
          },
          {
            "Detail":"Utiliser un véhicule particulier",
            "Tri":101,
            "CodeValeur":"IX.2.ter.10"
          },
          {
            "Detail":"Conduire un véhicule",
            "Tri":102,
            "CodeValeur":"IX.2.ter.11"
          },
          {
            "Detail":"Utiliser la préhension de la main dominante",
            "Tri":103,
            "CodeValeur":"IX.2.ter.12"
          },
          {
            "Detail":"Utiliser la préhension de la main non dominante",
            "Tri":104,
            "CodeValeur":"IX.2.ter.13"
          },
          {
            "Detail":"Avoir des activités de motricité fine",
            "Tri":105,
            "CodeValeur":"IX.2.ter.14"
          },
          {
            "Detail":"Avoir une coordination bi-manuelle",
            "Tri":106,
            "CodeValeur":"IX.2.ter.15"
          },
          {
            "Detail":"Soulever et porter des objets (y compris en se déplaçant)",
            "Tri":107,
            "CodeValeur":"IX.2.ter.16"
          }
        ]
      },
      {
        "Reponse":"Mobilité Manipulation : ne gère pas ces activités de façon autonome ",
        "Tri":108,
        "CodeValeur":"IX.2.quater",
        "Details":[
          {
            "Detail":"Se mettre debout",
            "Tri":109,
            "CodeValeur":"IX.2.quater.1",
            "SousDetails":[
              {
                "SousDetail":"Se coucher",
                "Tri":110,
                "CodeValeur":"IX.2.quater.1.1"
              },
              {
                "SousDetail":"S'asseoir",
                "Tri":111,
                "CodeValeur":"IX.2.quater.1.2"
              }
            ]
          },
          {
            "Detail":"Faire ses transferts",
            "Tri":112,
            "CodeValeur":"IX.2.quater.2"
          },
          {
            "Detail":"Changer de point d'appui",
            "Tri":113,
            "CodeValeur":"IX.2.quater.3"
          },
          {
            "Detail":"Rester assis",
            "Tri":114,
            "CodeValeur":"IX.2.quater.4"
          },
          {
            "Detail":"Rester debout",
            "Tri":115,
            "CodeValeur":"IX.2.quater.5"
          },
          {
            "Detail":"Marcher",
            "Tri":116,
            "CodeValeur":"IX.2.quater.6"
          },
          {
            "Detail":"Se déplacer dans le logement, à l'extérieur",
            "Tri":117,
            "CodeValeur":"IX.2.quater.7",
            "SousDetails":[
              {
                "SousDetail":"Se déplacer dans le logement",
                "Tri":118,
                "CodeValeur":"IX.2.quater.7.1"
              },
              {
                "SousDetail":"Se déplacer à l'extérieur",
                "Tri":119,
                "CodeValeur":"IX.2.quater.7.2"
              }
            ]
          },
          {
            "Detail":"Utiliser des escaliers",
            "Tri":123,
            "CodeValeur":"IX.2.quater.8"
          },
          {
            "Detail":"Utiliser les transports en commun",
            "Tri":124,
            "CodeValeur":"IX.2.quater.9"
          },
          {
            "Detail":"Utiliser un véhicule particulier",
            "Tri":125,
            "CodeValeur":"IX.2.quater.10"
          },
          {
            "Detail":"Conduire un véhicule",
            "Tri":126,
            "CodeValeur":"IX.2.quater.11"
          },
          {
            "Detail":"Utiliser la préhension de la main dominante",
            "Tri":127,
            "CodeValeur":"IX.2.quater.12"
          },
          {
            "Detail":"Utiliser la préhension de la main non dominante",
            "Tri":128,
            "CodeValeur":"IX.2.quater.13"
          },
          {
            "Detail":"Avoir des activités de motricité fine",
            "Tri":129,
            "CodeValeur":"IX.2.quater.14"
          },
          {
            "Detail":"Avoir une coordination bi-manuelle",
            "Tri":130,
            "CodeValeur":"IX.2.quater.15"
          },
          {
            "Detail":"Soulever et porter des objets (y compris en se déplaçant)",
            "Tri":131,
            "CodeValeur":"IX.2.quater.16"
          }
        ]
      },
      {
        "Reponse":"Entretien personnel : gère ces activités sans difficulté",
        "Tri":133,
        "CodeValeur":"IX.3.bis",
        "Details":[
          {
            "Detail":"Se laver",
            "Tri":134,
            "CodeValeur":"IX.3.bis.1"
          },
          {
            "Detail":"Prendre soin de son corps",
            "Tri":135,
            "CodeValeur":"IX.3.bis.2"
          },
          {
            "Detail":"Assurer l'élimination et Utiliser les toilettes",
            "Tri":136,
            "CodeValeur":"IX.3.bis.3"
          },
          {
            "Detail":"S'habiller / se déshabiller",
            "Tri":137,
            "CodeValeur":"IX.3.bis.4"
          },
          {
            "Detail":"Prendre ses repas (Manger, Boire)",
            "Tri":138,
            "CodeValeur":"IX.3.bis.5"
          },
          {
            "Detail":"Prendre soin de sa santé",
            "Tri":139,
            "CodeValeur":"IX.3.bis.6",
            "SousDetails":[
              {
                "SousDetail":"Utiliser ses fonctions respiratoires",
                "Tri":140,
                "CodeValeur":"IX.3.bis.6.1"
              },
              {
                "SousDetail":"Se soigner",
                "Tri":141,
                "CodeValeur":"IX.3.bis.6.2"
              },
              {
                "SousDetail":"Surveiller son régime alimentaire",
                "Tri":142,
                "CodeValeur":"IX.3.bis.6.3"
              },
              {
                "SousDetail":"Gérer son repos quotidien",
                "Tri":143,
                "CodeValeur":"IX.3.bis.6.4"
              },
              {
                "SousDetail":"Exprimer une demande de soins",
                "Tri":144,
                "CodeValeur":"IX.3.bis.6.5"
              },
              {
                "SousDetail":"Utiliser les différents systèmes de santé",
                "Tri":145,
                "CodeValeur":"IX.3.bis.6.6"
              }
            ]
          }
        ]
      },
      {
        "Reponse":"Entretien personnel : gère ces activités avec difficultés mais de façon autonome",
        "Tri":146,
        "CodeValeur":"IX.3.ter",
        "Details":[
          {
            "Detail":"Se laver",
            "Tri":147,
            "CodeValeur":"IX.3.ter.1"
          },
          {
            "Detail":"Prendre soin de son corps",
            "Tri":148,
            "CodeValeur":"IX.3.ter.2"
          },
          {
            "Detail":"Assurer l'élimination et Utiliser les toilettes",
            "Tri":149,
            "CodeValeur":"IX.3.ter.3"
          },
          {
            "Detail":"S'habiller / se déshabiller",
            "Tri":150,
            "CodeValeur":"IX.3.ter.4"
          },
          {
            "Detail":"Prendre ses repas (Manger, Boire)",
            "Tri":151,
            "CodeValeur":"IX.3.ter.5"
          },
          {
            "Detail":"Prendre soin de sa santé",
            "Tri":152,
            "CodeValeur":"IX.3.ter.6",
            "SousDetails":[
              {
                "SousDetail":"Utiliser ses fonctions respiratoires",
                "Tri":153,
                "CodeValeur":"IX.3.ter.6.1"
              },
              {
                "SousDetail":"Se soigner",
                "Tri":154,
                "CodeValeur":"IX.3.ter.6.2"
              },
              {
                "SousDetail":"Surveiller son régime alimentaire",
                "Tri":155,
                "CodeValeur":"IX.3.ter.6.3"
              },
              {
                "SousDetail":"Gérer son repos quotidien",
                "Tri":156,
                "CodeValeur":"IX.3.ter.6.4"
              },
              {
                "SousDetail":"Exprimer une demande de soins",
                "Tri":157,
                "CodeValeur":"IX.3.ter.6.5"
              },
              {
                "SousDetail":"Utiliser les différents systèmes de santé",
                "Tri":158,
                "CodeValeur":"IX.3.ter.6.6"
              }
            ]

          }
        ]
      },
      {
        "Reponse":"Entretien personnel : ne gère pas ces activités de façon autonome ",
        "Tri":159,
        "CodeValeur":"IX.3.quater",
        "Details":[
          {
            "Detail":"Se laver",
            "Tri":160,
            "CodeValeur":"IX.3.quater.1"
          },
          {
            "Detail":"Prendre soin de son corps",
            "Tri":161,
            "CodeValeur":"IX.3.quater.2"
          },
          {
            "Detail":"Assurer l'élimination et Utiliser les toilettes",
            "Tri":162,
            "CodeValeur":"IX.3.quater.3"
          },
          {
            "Detail":"S'habiller / se déshabiller",
            "Tri":163,
            "CodeValeur":"IX.3.quater.4"
          },
          {
            "Detail":"Prendre ses repas (Manger, Boire)",
            "Tri":164,
            "CodeValeur":"IX.3.quater.5"
          },
          {
            "Detail":"Prendre soin de sa santé",
            "Tri":165,
            "CodeValeur":"IX.3.quater.6",
            "SousDetails":[
              {
                "SousDetail":"Utiliser ses fonctions respiratoires",
                "Tri":166,
                "CodeValeur":"IX.3.quater.6.1"
              },
              {
                "SousDetail":"Se soigner",
                "Tri":167,
                "CodeValeur":"IX.3.quater.6.2"
              },
              {
                "SousDetail":"Surveiller son régime alimentaire",
                "Tri":168,
                "CodeValeur":"IX.3.quater.6.3"
              },
              {
                "SousDetail":"Gérer son repos quotidien",
                "Tri":169,
                "CodeValeur":"IX.3.quater.6.4"
              },
              {
                "SousDetail":"Exprimer une demande de soins",
                "Tri":170,
                "CodeValeur":"IX.3.quater.6.5"
              },
              {
                "SousDetail":"Utiliser les différents systèmes de santé",
                "Tri":171,
                "CodeValeur":"IX.3.quater.6.6"
              }
            ]
          }
        ]
      },
      {
        "Reponse":"Communication : gère ces activités sans difficulté",
        "Tri":173,
        "CodeValeur":"IX.4.bis.1",
        "Details":[
          {
            "Detail":"Parler",
            "Tri":174,
            "CodeValeur":"IX.4.bis.1"
          },
          {
            "Detail":"Entendre (percevoir les sons et comprendre)",
            "Tri":175,
            "CodeValeur":"IX.4.bis.2",
            "SousDetails":[
              {
                "SousDetail":"Entendre des sons",
                "Tri":176,
                "CodeValeur":"IX.4.bis.2.1"
              },
              {
                "SousDetail":"Comprendre la parole en face à face",
                "Tri":177,
                "CodeValeur":"IX.4.bis.2.2"
              },
              {
                "SousDetail":"Comprendre la parole dans un groupe",
                "Tri":178,
                "CodeValeur":"IX.4.bis.2.3"
              },
              {
                "SousDetail":"Comprendre la parole en environnement bruyant",
                "Tri":179,
                "CodeValeur":"IX.4.bis.2.4"
              },
              {
                "SousDetail":"Localiser l'origine des sons",
                "Tri":180,
                "CodeValeur":"IX.4.bis.2.5"
              }
            ]
          },
          {
            "Detail":"Voir (distinguer et identifier)",
            "Tri":181,
            "CodeValeur":"IX.4.bis.3"
          },
          {
            "Detail":"Utiliser des appareils et techniques de communication",
            "Tri":182,
            "CodeValeur":"IX.4.bis.4",
            "SousDetails":[
              {
                "SousDetail":"Utiliser le téléphone",
                "Tri":183,
                "CodeValeur":"IX.4.bis.4.1"
              },
              {
                "SousDetail":"Utiliser les autres appareils et techniques de communication",
                "Tri":184,
                "CodeValeur":"IX.4.bis.4.2"
              }
            ]
          },
          {
            "Detail":"Comprendre une phrase simple",
            "Tri":185,
            "CodeValeur":"IX.4.bis.5"
          },
          {
            "Detail":"Mener une conversation",
            "Tri":186,
            "CodeValeur":"IX.4.bis.6"
          },
          {
            "Detail":"Produire et recevoir des messages non verbaux",
            "Tri":187,
            "CodeValeur":"IX.4.bis.7"
          }
        ]
      },
      {
        "Reponse":"Communication : gère ces activités avec difficultés mais de façon autonome",
        "Tri":188,
        "CodeValeur":"IX.4.ter",
        "Details":[
          {
            "Detail":"Parler",
            "Tri":189,
            "CodeValeur":"IX.4.ter.1"
          },
          {
            "Detail":"Entendre (percevoir les sons et comprendre)",
            "Tri":190,
            "CodeValeur":"IX.4.ter.2",
            "SousDetails":[
              {
                "SousDetail":"Entendre des sons",
                "Tri":191,
                "CodeValeur":"IX.4.ter.2.1"
              },
              {
                "SousDetail":"Comprendre la parole en face à face",
                "Tri":192,
                "CodeValeur":"IX.4.ter.2.2"
              },
              {
                "SousDetail":"Comprendre la parole dans un groupe",
                "Tri":193,
                "CodeValeur":"IX.4.ter.2.3"
              },
              {
                "SousDetail":"Comprendre la parole en environnement bruyant",
                "Tri":194,
                "CodeValeur":"IX.4.ter.2.4"
              },
              {
                "SousDetail":"Localiser l'origine des sons",
                "Tri":195,
                "CodeValeur":"IX.4.ter.2.5"
              }
            ]
          },
          {
            "Detail":"Voir (distinguer et identifier)",
            "Tri":196,
            "CodeValeur":"IX.4.ter.3"
          },
          {
            "Detail":"Utiliser des appareils et techniques de communication",
            "Tri":197,
            "CodeValeur":"IX.4.ter.4",
            "SousDetails":[
              {
                "SousDetail":"Utiliser le téléphone",
                "Tri":198,
                "CodeValeur":"IX.4.ter.4.1"
              },
              {
                "SousDetail":"Utiliser les autres appareils et techniques de communication",
                "Tri":199,
                "CodeValeur":"IX.4.ter.4.2"
              }
            ]
          },
          {
            "Detail":"Comprendre une phrase simple",
            "Tri":200,
            "CodeValeur":"IX.4.ter.5"
          },
          {
            "Detail":"Mener une conversation",
            "Tri":201,
            "CodeValeur":"IX.4.ter.6"
          },
          {
            "Detail":"Produire et recevoir des messages non verbaux",
            "Tri":202,
            "CodeValeur":"IX.4.ter.7"
          }
        ]
      },
      {
        "Reponse":"Communication : ne gère pas ces activités de façon autonome ",
        "Tri":203,
        "CodeValeur":"IX.4.quater",
        "Details":[
          {
            "Detail":"Parler",
            "Tri":204,
            "CodeValeur":"IX.4.quater.1"
          },
          {
            "Detail":"Entendre (percevoir les sons et comprendre)",
            "Tri":205,
            "CodeValeur":"IX.4.quater.2",
            "SousDetails":[
              {
                "SousDetail":"Entendre des sons",
                "Tri":206,
                "CodeValeur":"IX.4.quater.2.1"
              },
              {
                "SousDetail":"Comprendre la parole en face à face",
                "Tri":207,
                "CodeValeur":"IX.4.quater.2.2"
              },
              {
                "SousDetail":"Comprendre la parole dans un groupe",
                "Tri":208,
                "CodeValeur":"IX.4.quater.2.3"
              },
              {
                "SousDetail":"Comprendre la parole en environnement bruyant",
                "Tri":209,
                "CodeValeur":"IX.4.quater.2.4"
              },
              {
                "SousDetail":"Comprendre la parole en environnement bruyant",
                "Tri":210,
                "CodeValeur":"IX.4.quater.2.4"
              },
              {
                "SousDetail":"Localiser l'origine des sons",
                "Tri":211,
                "CodeValeur":"IX.4.quater.2.5"
              }
            ]
          },
          {
            "Detail":"Voir (distinguer et identifier)",
            "Tri":212,
            "CodeValeur":"IX.4.quater.3"
          },
          {
            "Detail":"Utiliser des appareils et techniques de communication",
            "Tri":213,
            "CodeValeur":"IX.4.quater.4",
            "SousDetails":[
              {
                "SousDetail":"Utiliser le téléphone",
                "Tri":214,
                "CodeValeur":"IX.4.quater.4.1"
              },
              {
                "SousDetail":"Utiliser les autres appareils et techniques de communication",
                "Tri":215,
                "CodeValeur":"IX.4.quater.4.2"
              }
            ]
          },
          {
            "Detail":"Comprendre une phrase simple",
            "Tri":216,
            "CodeValeur":"IX.4.quater.5"
          },
          {
            "Detail":"Mener une conversation",
            "Tri":217,
            "CodeValeur":"IX.4.quater.6"
          },
          {
            "Detail":"Produire et recevoir des messages non verbaux",
            "Tri":218,
            "CodeValeur":"IX.4.quater.7"
          }
        ]
      },
      {
        "Reponse":"Vie domestique et vie courante : gère ces activités sans difficulté",
        "Tri":220,
        "CodeValeur":"IX.5.bis",
        "Details":[
          {
            "Detail":"Faire ses courses",
            "Tri":221,
            "CodeValeur":"IX.5.bis.1"
          },
          {
            "Detail":"Préparer un repas simple",
            "Tri":222,
            "CodeValeur":"IX.5.bis.2"
          },
          {
            "Detail":"Faire son ménage",
            "Tri":223,
            "CodeValeur":"IX.5.bis.3"
          },
          {
            "Detail":"Entretenir son linge et ses vêtements",
            "Tri":224,
            "CodeValeur":"IX.5.bis.4"
          },
          {
            "Detail":"S'occuper de sa famille",
            "Tri":225,
            "CodeValeur":"IX.5.bis.5"
          },
          {
            "Detail":"Gérer son budget, faire les démarches administratives",
            "Tri":226,
            "CodeValeur":"IX.5.bis.6",
            "SousDetails":[
              {
                "SousDetail":"Gérer son argent au quotidien ",
                "Tri":227,
                "CodeValeur":"IX.5.bis.6.1"
              },
              {
                "SousDetail":"Gérer son compte bancaire",
                "Tri":228,
                "CodeValeur":"IX.5.bis.6.2"
              },
              {
                "SousDetail":"Faire des démarches administratives",
                "Tri":229,
                "CodeValeur":"IX.5.bis.6.3"
              }
            ]
          },
          {
            "Detail":"Vivre seul dans un logement indépendant",
            "Tri":230,
            "CodeValeur":"IX.5.bis.7"
          },
          {
            "Detail":"Avoir des relations informelles de voisinage",
            "Tri":231,
            "CodeValeur":"IX.5.bis.8"
          },
          {
            "Detail":"Participer à la vie communautaire, sociale et civique",
            "Tri":232,
            "CodeValeur":"IX.5.bis.9",
            "SousDetails":[
              {
                "SousDetail":"Gérer son temps libre, avoir des activités récréatives ou participer à des activités culturelles, sportives ou de loisir",
                "Tri":233,
                "CodeValeur":"IX.5.bis.9.1"
              },
              {
                "SousDetail":"Exprimer une demande liée à ses droits",
                "Tri":234,
                "CodeValeur":"IX.5.bis.9.2"
              },
              {
                "SousDetail":"Participer à la vie locale",
                "Tri":235,
                "CodeValeur":"IX.5.bis.9.3"
              }
            ]
          },
          {
            "Detail":"Partir en vacances",
            "Tri":236,
            "CodeValeur":"IX.5.bis.10"
          }
        ]
      },
      {
        "Reponse":"Vie domestique et vie courante : gère ces activités avec difficultés mais de façon autonome",
        "Tri":238,
        "CodeValeur":"IX.5.ter",
        "Details":[
          {
            "Detail":"Faire ses courses",
            "Tri":238,
            "CodeValeur":"IX.5.ter.1"
          },
          {
            "Detail":"Préparer un repas simple",
            "Tri":239,
            "CodeValeur":"IX.5.ter.2"
          },
          {
            "Detail":"Faire son ménage",
            "Tri":240,
            "CodeValeur":"IX.5.ter.3"
          },
          {
            "Detail":"Entretenir son linge et ses vêtements",
            "Tri":241,
            "CodeValeur":"IX.5.ter.4"
          },
          {
            "Detail":"S'occuper de sa famille",
            "Tri":242,
            "CodeValeur":"IX.5.ter.5"
          },
          {
            "Detail":"Gérer son budget, faire les démarches administratives",
            "Tri":244,
            "CodeValeur":"IX.5.ter.6",
            "SousDetails":[
              {
                "SousDetail":"Gérer son argent au quotidien ",
                "Tri":244,
                "CodeValeur":"IX.5.ter.6.1"
              },
              {
                "SousDetail":"Gérer son compte bancaire",
                "Tri":245,
                "CodeValeur":"IX.5.ter.6.2"
              },
              {
                "SousDetail":"Faire des démarches administratives",
                "Tri":246,
                "CodeValeur":"IX.5.ter.6.3"
              }
            ]
          },
          {
            "Detail":"Vivre seul dans un logement indépendant",
            "Tri":247,
            "CodeValeur":"IX.5.ter.7"
          },
          {
            "Detail":"Avoir des relations informelles de voisinage",
            "Tri":248,
            "CodeValeur":"IX.5.ter.8"
          },
          {
            "Detail":"Participer à la vie communautaire, sociale et civique",
            "Tri":250,
            "CodeValeur":"IX.5.ter.9",
            "SousDetails":[
              {
                "SousDetail":"Gérer son temps libre, avoir des activités récréatives ou participer à des activités culturelles, sportives ou de loisir",
                "Tri":250,
                "CodeValeur":"IX.5.ter.9.1"
              },
              {
                "SousDetail":"Exprimer une demande liée à ses droits",
                "Tri":251,
                "CodeValeur":"IX.5.ter.9.2"
              },
              {
                "SousDetail":"Participer à la vie locale",
                "Tri":252,
                "CodeValeur":"IX.5.ter.9.3"
              }
            ]
          },
          {
            "Detail":"Partir en vacances",
            "Tri":253,
            "CodeValeur":"IX.5.ter.10"
          }
        ]
      },
      {
        "Reponse":"Vie domestique et vie courante : ne gère pas ces activités de façon autonome ",
        "Tri":255,
        "CodeValeur":"IX.5.quater",
        "Details":[
          {
            "Detail":"Faire ses courses",
            "Tri":255,
            "CodeValeur":"IX.5.quater.1"
          },
          {
            "Detail":"Préparer un repas simple",
            "Tri":256,
            "CodeValeur":"IX.5.quater.2"
          },
          {
            "Detail":"Faire son ménage",
            "Tri":257,
            "CodeValeur":"IX.5.quater.3"
          },
          {
            "Detail":"Entretenir son linge et ses vêtements",
            "Tri":258,
            "CodeValeur":"IX.5.quater.4"
          },
          {
            "Detail":"S'occuper de sa famille",
            "Tri":259,
            "CodeValeur":"IX.5.quater.5"
          },
          {
            "Detail":"Gérer son budget, faire les démarches administratives",
            "Tri":260,
            "CodeValeur":"IX.5.quater.6",
            "SousDetails":[
              {
                "SousDetail":"Gérer son argent au quotidien ",
                "Tri":261,
                "CodeValeur":"IX.5.quater.6.1"
              },
              {
                "SousDetail":"Gérer son compte bancaire",
                "Tri":262,
                "CodeValeur":"IX.5.quater.6.2"
              },
              {
                "SousDetail":"Faire des démarches administratives",
                "Tri":263,
                "CodeValeur":"IX.5.quater.6.3"
              }
            ]
          },
          {
            "Detail":"Vivre seul dans un logement indépendant",
            "Tri":264,
            "CodeValeur":"IX.5.quater.7"
          },
          {
            "Detail":"Avoir des relations informelles de voisinage",
            "Tri":265,
            "CodeValeur":"IX.5.quater.8"
          },
          {
            "Detail":"Participer à la vie communautaire, sociale et civique",
            "Tri":266,
            "CodeValeur":"IX.5.quater.9",
            "SousDetails":[
              {
                "SousDetail":"Gérer son temps libre, avoir des activités récréatives ou participer à des activités culturelles, sportives ou de loisir",
                "Tri":267,
                "CodeValeur":"IX.5.quater.9.1"
              },
              {
                "SousDetail":"Exprimer une demande liée à ses droits",
                "Tri":268,
                "CodeValeur":"IX.5.quater.9.2"
              },
              {
                "SousDetail":"Participer à la vie locale",
                "Tri":269,
                "CodeValeur":"IX.5.quater.9.3"
              }
            ]
          },
          {
            "Detail":"Partir en vacances",
            "Tri":270,
            "CodeValeur":"IX.5.quater.10"
          }
        ]
      },
      {
        "Reponse":"Application des connaissances, apprentissage : gère ces activités sans difficulté",
        "Tri":272,
        "CodeValeur":"IX.6.bis",
        "Details":[
          {
            "Detail":"Lire",
            "Tri":273,
            "CodeValeur":"IX.6.bis.1"
          },
          {
            "Detail":"Ecrire",
            "Tri":274,
            "CodeValeur":"IX.6.bis.2"
          },
          {
            "Detail":"Calculer",
            "Tri":275,
            "CodeValeur":"IX.6.bis.3"
          },
          {
            "Detail":"Acquérir un savoir-faire",
            "Tri":276,
            "CodeValeur":"IX.6.bis.4"
          },
          {
            "Detail":"Appliquer un savoir-faire",
            "Tri":277,
            "CodeValeur":"IX.6.bis.5"
          }
        ]
      },
      {
        "Reponse":"Application des connaissances, apprentissage : gère ces activités avec difficultés mais de façon autonome",
        "Tri":278,
        "CodeValeur":"IX.6.ter",
        "Details":[
          {
            "Detail":"Lire",
            "Tri":279,
            "CodeValeur":"IX.6.ter.1"
          },
          {
            "Detail":"Ecrire",
            "Tri":280,
            "CodeValeur":"IX.6.ter.2"
          },
          {
            "Detail":"Calculer",
            "Tri":281,
            "CodeValeur":"IX.6.ter.3"
          },
          {
            "Detail":"Acquérir un savoir-faire",
            "Tri":282,
            "CodeValeur":"IX.6.ter.4"
          },
          {
            "Detail":"Appliquer un savoir-faire",
            "Tri":283,
            "CodeValeur":"IX.6.ter.5"
          }
        ]
      },
      {
        "Reponse":"Application des connaissances, apprentissage : ne gère pas ces activités de façon autonome ",
        "Tri":284,
        "CodeValeur":"IX.6.quater",
        "Details":[
          {
            "Detail":"Lire",
            "Tri":285,
            "CodeValeur":"IX.6.quater.1"
          },
          {
            "Detail":"Ecrire",
            "Tri":286,
            "CodeValeur":"IX.6.quater.2"
          },
          {
            "Detail":"Calculer",
            "Tri":287,
            "CodeValeur":"IX.6.quater.3"
          },
          {
            "Detail":"Acquérir un savoir-faire",
            "Tri":288,
            "CodeValeur":"IX.6.quater.4"
          },
          {
            "Detail":"Appliquer un savoir-faire",
            "Tri":289,
            "CodeValeur":"IX.6.quater.5"
          }
        ]
      },
      {
        "Reponse":"Tâches et exigences en relation avec la scolarité et la formation initiale : gère ces activités sans difficulté",
        "Tri":291,
        "CodeValeur":"IX.7.bis",
        "Details":[
          {
            "Detail":"Apprendre à lire",
            "Tri":292,
            "CodeValeur":"IX.7.bis.1"
          },
          {
            "Detail":"Apprendre à écrire",
            "Tri":293,
            "CodeValeur":"IX.7.bis.2"
          },
          {
            "Detail":"Apprendre à calculer",
            "Tri":294,
            "CodeValeur":"IX.7.bis.3"
          },
          {
            "Detail":"Apprendre des techniques de communication",
            "Tri":295,
            "CodeValeur":"IX.7.bis.4"
          },
          {
            "Detail":"Apprendre les règles sociales de base",
            "Tri":296,
            "CodeValeur":"IX.7.bis.5"
          },
          {
            "Detail":"Respecter des règles de base",
            "Tri":297,
            "CodeValeur":"IX.7.bis.6",
            "SousDetails":[
              {
                "SousDetail":"Etre ponctuel",
                "Tri":298,
                "CodeValeur":"IX.7.bis.6.1"
              },
              {
                "SousDetail":"Etre assidu",
                "Tri":299,
                "CodeValeur":"IX.7.bis.6.2"
              },
              {
                "SousDetail":"Organiser son travail",
                "Tri":300,
                "CodeValeur":"IX.7.bis.6.3"
              },
              {
                "SousDetail":"Contrôler son travail",
                "Tri":301,
                "CodeValeur":"IX.7.bis.6.4"
              },
              {
                "SousDetail":"Accepter des consignes",
                "Tri":302,
                "CodeValeur":"IX.7.bis.6.5"
              },
              {
                "SousDetail":"Suivre des consignes",
                "Tri":303,
                "CodeValeur":"IX.7.bis.6.6"
              },
              {
                "SousDetail":"S’adapter à la vie scolaire",
                "Tri":304,
                "CodeValeur":"IX.7.bis.6.7"
              },
              {
                "SousDetail":"Travailler en équipe ",
                "Tri":305,
                "CodeValeur":"IX.7.bis.6.8"
              },
              {
                "SousDetail":"Respecter les règles scolaires ",
                "Tri":306,
                "CodeValeur":"IX.7.bis.6.9"
              }
            ]
          },
          {
            "Detail":"S’installer dans la classe",
            "Tri":307,
            "CodeValeur":"IX.7.bis.7"
          },
          {
            "Detail":"Utiliser des supports pédagogiques",
            "Tri":308,
            "CodeValeur":"IX.7.bis.8"
          },
          {
            "Detail":"Utiliser du matériel adapté à son handicap",
            "Tri":309,
            "CodeValeur":"IX.7.bis.9"
          },
          {
            "Detail":"Prendre des notes",
            "Tri":310,
            "CodeValeur":"IX.7.bis.10"
          },
          {
            "Detail":"S’adapter aux conditions d’examen et de contrôle",
            "Tri":311,
            "CodeValeur":"IX.7.bis.11"
          },
          {
            "Detail":"Participer à des sorties extra scolaires",
            "Tri":312,
            "CodeValeur":"IX.7.bis.12"
          },
          {
            "Detail":"Autre",
            "Tri":313,
            "CodeValeur":"IX.7.bis.13"
          }
        ]
      },
      {
        "Reponse":"Tâches et exigences en relation avec la scolarité et la formation initiale : gère ces activités avec difficultés mais de façon autonome",
        "Tri":314,
        "CodeValeur":"IX.7.ter",
        "Details":[
          {
            "Detail":"Apprendre à lire",
            "Tri":315,
            "CodeValeur":"IX.7.ter.1"
          },
          {
            "Detail":"Apprendre à écrire",
            "Tri":316,
            "CodeValeur":"IX.7.ter.2"
          },
          {
            "Detail":"Apprendre à calculer",
            "Tri":317,
            "CodeValeur":"IX.7.ter.3"
          },
          {
            "Detail":"Apprendre des techniques de communication",
            "Tri":318,
            "CodeValeur":"IX.7.ter.4"
          },
          {
            "Detail":"Apprendre les règles sociales de base",
            "Tri":319,
            "CodeValeur":"IX.7.ter.5"
          },
          {
            "Detail":"Respecter des règles de base",
            "Tri":320,
            "CodeValeur":"IX.7.ter.6",
            "SousDetails":[
              {
                "SousDetail":"Etre ponctuel",
                "Tri":321,
                "CodeValeur":"IX.7.ter.6.1"
              },
              {
                "SousDetail":"Etre assidu",
                "Tri":322,
                "CodeValeur":"IX.7.ter.6.2"
              },
              {
                "SousDetail":"Organiser son travail",
                "Tri":323,
                "CodeValeur":"IX.7.ter.6.3"
              },
              {
                "SousDetail":"Contrôler son travail",
                "Tri":324,
                "CodeValeur":"IX.7.ter.6.4"
              },
              {
                "SousDetail":"Accepter des consignes",
                "Tri":325,
                "CodeValeur":"IX.7.ter.6.5"
              },
              {
                "SousDetail":"Suivre des consignes",
                "Tri":326,
                "CodeValeur":"IX.7.ter.6.6"
              },
              {
                "SousDetail":"S’adapter à la vie scolaire",
                "Tri":327,
                "CodeValeur":"IX.7.ter.6.7"
              },
              {
                "SousDetail":"Travailler en équipe ",
                "Tri":328,
                "CodeValeur":"IX.7.ter.6.8"
              },
              {
                "SousDetail":"Respecter les règles scolaires ",
                "Tri":329,
                "CodeValeur":"IX.7.ter.6.9"
              }
            ]
          },
          {
            "Detail":"S’installer dans la classe",
            "Tri":330,
            "CodeValeur":"IX.7.ter.7"
          },
          {
            "Detail":"Utiliser des supports pédagogiques",
            "Tri":331,
            "CodeValeur":"IX.7.ter.8"
          },
          {
            "Detail":"Utiliser du matériel adapté à son handicap",
            "Tri":332,
            "CodeValeur":"IX.7.ter.9"
          },
          {
            "Detail":"Prendre des notes",
            "Tri":333,
            "CodeValeur":"IX.7.ter.10"
          },
          {
            "Detail":"S’adapter aux conditions d’examen et de contrôle",
            "Tri":334,
            "CodeValeur":"IX.7.ter.11"
          },
          {
            "Detail":"Participer à des sorties extra scolaires",
            "Tri":335,
            "CodeValeur":"IX.7.ter.12"
          },
          {
            "Detail":"Autre",
            "Tri":336,
            "CodeValeur":"IX.7.ter.13"
          }
        ]
      },
      {
        "Reponse":"Tâches et exigences en relation avec la scolarité et la formation initiale : ne gère pas ces activités de façon autonome ",
        "Tri":337,
        "CodeValeur":"IX.7.quater",
        "Details":[
          {
            "Detail":"Apprendre à lire",
            "Tri":338,
            "CodeValeur":"IX.7.quater.1"
          },
          {
            "Detail":"Apprendre à écrire",
            "Tri":339,
            "CodeValeur":"IX.7.quater.2"
          },
          {
            "Detail":"Apprendre à calculer",
            "Tri":340,
            "CodeValeur":"IX.7.quater.3"
          },
          {
            "Detail":"Apprendre des techniques de communication",
            "Tri":341,
            "CodeValeur":"IX.7.quater.4"
          },
          {
            "Detail":"Apprendre les règles sociales de base",
            "Tri":342,
            "CodeValeur":"IX.7.quater.5"
          },
          {
            "Detail":"Respecter des règles de base",
            "Tri":343,
            "CodeValeur":"IX.7.quater.6",
            "SousDetails":[
              {
                "SousDetail":"Etre ponctuel",
                "Tri":344,
                "CodeValeur":"IX.7.quater.6.1"
              },
              {
                "SousDetail":"Etre assidu",
                "Tri":345,
                "CodeValeur":"IX.7.quater.6.2"
              },
              {
                "SousDetail":"Organiser son travail",
                "Tri":346,
                "CodeValeur":"IX.7.quater.6.3"
              },
              {
                "SousDetail":"Contrôler son travail",
                "Tri":347,
                "CodeValeur":"IX.7.quater.6.4"
              },
              {
                "SousDetail":"Accepter des consignes",
                "Tri":348,
                "CodeValeur":"IX.7.quater.6.5"
              },
              {
                "SousDetail":"Suivre des consignes",
                "Tri":349,
                "CodeValeur":"IX.7.quater.6.6"
              },
              {
                "SousDetail":"S’adapter à la vie scolaire",
                "Tri":350,
                "CodeValeur":"IX.7.quater.6.7"
              },
              {
                "SousDetail":"Travailler en équipe ",
                "Tri":351,
                "CodeValeur":"IX.7.quater.6.8"
              },
              {
                "SousDetail":"Respecter les règles scolaires ",
                "Tri":352,
                "CodeValeur":"IX.7.quater.6.9"
              }
            ]
          },
          {
            "Detail":"S’installer dans la classe",
            "Tri":353,
            "CodeValeur":"IX.7.quater.7"
          },
          {
            "Detail":"Utiliser des supports pédagogiques",
            "Tri":354,
            "CodeValeur":"IX.7.quater.8"
          },
          {
            "Detail":"Utiliser du matériel adapté à son handicap",
            "Tri":355,
            "CodeValeur":"IX.7.quater.9"
          },
          {
            "Detail":"Prendre des notes",
            "Tri":356,
            "CodeValeur":"IX.7.quater.10"
          },
          {
            "Detail":"S’adapter aux conditions d’examen et de contrôle",
            "Tri":357,
            "CodeValeur":"IX.7.quater.11"
          },
          {
            "Detail":"Participer à des sorties extra scolaires",
            "Tri":358,
            "CodeValeur":"IX.7.quater.12"
          },
          {
            "Detail":"Autre",
            "Tri":359,
            "CodeValeur":"IX.7.quater.13"
          }
        ]
      },
      {
        "Reponse":"Tâches et exigences relatives au travail : gère ces activités sans difficulté",
        "Tri":361,
        "CodeValeur":"IX.8.bis",
        "Details":[
          {
            "Detail":"Respecter des règles de base ",
            "Tri":362,
            "CodeValeur":"IX.8.bis.1",
            "SousDetails":[
              {
                "SousDetail":"Etre ponctuel",
                "Tri":363,
                "CodeValeur":"IX.8.bis.1.1"
              },
              {
                "SousDetail":"Etre assidu",
                "Tri":364,
                "CodeValeur":"IX.8.bis.1.2"
              },
              {
                "SousDetail":"Respecter des relations hiérarchiques",
                "Tri":365,
                "CodeValeur":"IX.8.bis.1.3"
              },
              {
                "SousDetail":"Participer à des réunions ",
                "Tri":366,
                "CodeValeur":"IX.8.bis.1.4"
              }
            ]
          },
          {
            "Detail":"Organiser son travail (en rapport avec le poste de travail)",
            "Tri":367,
            "CodeValeur":"IX.8.bis.2"
          },
          {
            "Detail":"Contrôler son travail",
            "Tri":368,
            "CodeValeur":"IX.8.bis.3"
          },
          {
            "Detail":"Etre en contact avec le public",
            "Tri":369,
            "CodeValeur":"IX.8.bis.4"
          },
          {
            "Detail":"Assurer l’encadrement",
            "Tri":370,
            "CodeValeur":"IX.8.bis.5"
          },
          {
            "Detail":"Travailler en équipe ",
            "Tri":371,
            "CodeValeur":"IX.8.bis.6"
          },
          {
            "Detail":"Exercer des tâches physiques",
            "Tri":372,
            "CodeValeur":"IX.8.bis.7",
            "SousDetails":[
              {
                "SousDetail":"Soulever, déplacer des charges",
                "Tri":373,
                "CodeValeur":"IX.8.bis.7.1"
              },
              {
                "SousDetail":"Travailler en flexion du tronc",
                "Tri":374,
                "CodeValeur":"IX.8.bis.7.2"
              },
              {
                "SousDetail":"Travailler en attitudes variées",
                "Tri":375,
                "CodeValeur":"IX.8.bis.7.3"
              },
              {
                "SousDetail":"Travailler accroupi",
                "Tri":376,
                "CodeValeur":"IX.8.bis.7.4"
              },
              {
                "SousDetail":"Travailler en hauteur (escabeau, échelle, échafaudage..)",
                "Tri":377,
                "CodeValeur":"IX.8.bis.7.5"
              },
              {
                "SousDetail":"Travailler à distance du sol (sur un pont, un toit, un balcon…)",
                "Tri":378,
                "CodeValeur":"IX.8.bis.7.6"
              },
              {
                "SousDetail":"Travailler le mb. sup. dominant levé au dessus du niveau des épaules",
                "Tri":379,
                "CodeValeur":"IX.8.bis.7.7"
              },
              {
                "SousDetail":"Travailler le mb. sup. non dominant levé au dessus du niveau des épaules",
                "Tri":380,
                "CodeValeur":"IX.8.bis.7.8"
              },
              {
                "SousDetail":"Utiliser une commande avec les pieds",
                "Tri":381,
                "CodeValeur":"IX.8.bis.7.9"
              }
            ]
          },
          {
            "Detail":"Exercer des tâches dans des conditions particulières",
            "Tri":382,
            "CodeValeur":"IX.8.bis.8",
            "SousDetails":[
              {
                "SousDetail":"Voir les couleurs",
                "Tri":383,
                "CodeValeur":"IX.8.bis.8.1"
              },
              {
                "SousDetail":"Percevoir le relief",
                "Tri":384,
                "CodeValeur":"IX.8.bis.8.2"
              },
              {
                "SousDetail":"Travailler de nuit",
                "Tri":385,
                "CodeValeur":"IX.8.bis.8.3"
              },
              {
                "SousDetail":"Assumer des modifications d’horaires",
                "Tri":386,
                "CodeValeur":"IX.8.bis.8.4"
              },
              {
                "SousDetail":"Utiliser des outils et/ou machines dangereuses",
                "Tri":387,
                "CodeValeur":"IX.8.bis.8.5"
              },
              {
                "SousDetail":"Travailler avec vibrations",
                "Tri":388,
                "CodeValeur":"IX.8.bis.8.6"
              },
              {
                "SousDetail":"Travailler en milieu bruyant",
                "Tri":389,
                "CodeValeur":"IX.8.bis.8.7"
              },
              {
                "SousDetail":"Travailler dans des contextes  respiratoires particuliers",
                "Tri":390,
                "CodeValeur":"IX.8.bis.8.8"
              },
              {
                "SousDetail":"Travailler avec risque cutané",
                "Tri":391,
                "CodeValeur":"IX.8.bis.8.9"
              },
              {
                "SousDetail":"S’exposer aux intempéries, à une atmosphère exceptionnelle",
                "Tri":392,
                "CodeValeur":"IX.8.bis.8.10"
              },
              {
                "SousDetail":"Autre",
                "Tri":393,
                "CodeValeur":"IX.8.8.bis.11"
              }
            ]
          }
        ]
      },
      {
        "Reponse":"Tâches et exigences relatives au travail : gère ces activités avec difficultés mais de façon autonome",
        "Tri":394,
        "CodeValeur":"IX.8.ter",
        "Details":[
          {
            "Detail":"Respecter des règles de base ",
            "Tri":395,
            "CodeValeur":"IX.8.ter.1",
            "SousDetails":[
              {
                "SousDetail":"Etre ponctuel",
                "Tri":396,
                "CodeValeur":"IX.8.ter.1.1"
              },
              {
                "SousDetail":"Etre assidu",
                "Tri":397,
                "CodeValeur":"IX.8.ter.1.2"
              },
              {
                "SousDetail":"Respecter des relations hiérarchiques",
                "Tri":398,
                "CodeValeur":"IX.8.ter.1.3"
              },
              {
                "SousDetail":"Participer à des réunions ",
                "Tri":399,
                "CodeValeur":"IX.8.ter.1.4"
              }
            ]
          },
          {
            "Detail":"Organiser son travail (en rapport avec le poste de travail)",
            "Tri":400,
            "CodeValeur":"IX.8.ter.2"
          },
          {
            "Detail":"Contrôler son travail",
            "Tri":401,
            "CodeValeur":"IX.8.ter.3"
          },
          {
            "Detail":"Etre en contact avec le public",
            "Tri":402,
            "CodeValeur":"IX.8.ter.4"
          },
          {
            "Detail":"Assurer l’encadrement",
            "Tri":403,
            "CodeValeur":"IX.8.ter.5"
          },
          {
            "Detail":"Travailler en équipe ",
            "Tri":404,
            "CodeValeur":"IX.8.ter.6"
          },
          {
            "Detail":"Exercer des tâches physiques",
            "Tri":405,
            "CodeValeur":"IX.8.ter.7",
            "SousDetails":[
              {
                "SousDetail":"Soulever, déplacer des charges",
                "Tri":406,
                "CodeValeur":"IX.8.ter.7.1"
              },
              {
                "SousDetail":"Travailler en flexion du tronc",
                "Tri":407,
                "CodeValeur":"IX.8.ter.7.2"
              },
              {
                "SousDetail":"Travailler en attitudes variées",
                "Tri":408,
                "CodeValeur":"IX.8.ter.7.3"
              },
              {
                "SousDetail":"Travailler accroupi",
                "Tri":409,
                "CodeValeur":"IX.8.ter.7.4"
              },
              {
                "SousDetail":"Travailler en hauteur (escabeau, échelle, échafaudage..)",
                "Tri":410,
                "CodeValeur":"IX.8.ter.7.5"
              },
              {
                "SousDetail":"Travailler à distance du sol (sur un pont, un toit, un balcon…)",
                "Tri":411,
                "CodeValeur":"IX.8.ter.7.6"
              },
              {
                "SousDetail":"Travailler le mb. sup. dominant levé au dessus du niveau des épaules",
                "Tri":412,
                "CodeValeur":"IX.8.ter.7.7"
              },
              {
                "SousDetail":"Travailler le mb. sup. non dominant levé au dessus du niveau des épaules",
                "Tri":413,
                "CodeValeur":"IX.8.ter.7.8"
              },
              {
                "SousDetail":"Utiliser une commande avec les pieds",
                "Tri":414,
                "CodeValeur":"IX.8.ter.7.9"
              }
            ]
          },
          {
            "Detail":"Exercer des tâches dans des conditions particulières",
            "Tri":415,
            "CodeValeur":"IX.8.ter.8",
            "SousDetails":[
              {
                "SousDetail":"Voir les couleurs",
                "Tri":416,
                "CodeValeur":"IX.8.ter.8.1"
              },
              {
                "SousDetail":"Percevoir le relief",
                "Tri":417,
                "CodeValeur":"IX.8.ter.8.2"
              },
              {
                "SousDetail":"Travailler de nuit",
                "Tri":418,
                "CodeValeur":"IX.8.ter.8.3"
              },
              {
                "SousDetail":"Assumer des modifications d’horaires",
                "Tri":419,
                "CodeValeur":"IX.8.ter.8.4"
              },
              {
                "SousDetail":"Utiliser des outils et/ou machines dangereuses",
                "Tri":420,
                "CodeValeur":"IX.8.ter.8.5"
              },
              {
                "SousDetail":"Travailler avec vibrations",
                "Tri":421,
                "CodeValeur":"IX.8.ter.8.6"
              },
              {
                "SousDetail":"Travailler en milieu bruyant",
                "Tri":422,
                "CodeValeur":"IX.8.ter.8.7"
              },
              {
                "SousDetail":"Travailler dans des contextes  respiratoires particuliers",
                "Tri":423,
                "CodeValeur":"IX.8.ter.8.8"
              },
              {
                "SousDetail":"Travailler avec risque cutané",
                "Tri":424,
                "CodeValeur":"IX.8.ter.8.9"
              },
              {
                "SousDetail":"S’exposer aux intempéries, à une atmosphère exceptionnelle",
                "Tri":425,
                "CodeValeur":"IX.8.ter.8.10"
              },
              {
                "SousDetail":"Autre",
                "Tri":426,
                "CodeValeur":"IX.8.ter.8.11"
              }
            ]
          }
        ]
      },
      {
        "Reponse":"Tâches et exigences relatives au travail : ne gère pas ces activités de façon autonome ",
        "Tri":427,
        "CodeValeur":"IX.8.quater",
        "Details":[
          {
            "Detail":"Respecter des règles de base ",
            "Tri":428,
            "CodeValeur":"IX.8.quater.1",
            "SousDetails":[
              {
                "SousDetail":"Etre ponctuel",
                "Tri":429,
                "CodeValeur":"IX.8.quater.1.1"
              },
              {
                "SousDetail":"Etre assidu",
                "Tri":430,
                "CodeValeur":"IX.8.quater.1.2"
              },
              {
                "SousDetail":"Respecter des relations hiérarchiques",
                "Tri":431,
                "CodeValeur":"IX.8.quater.1.3"
              },
              {
                "SousDetail":"Participer à des réunions ",
                "Tri":432,
                "CodeValeur":"IX.8.quater.1.4"
              }
            ]
          },
          {
            "Detail":"Organiser son travail (en rapport avec le poste de travail)",
            "Tri":433,
            "CodeValeur":"IX.8.quater.2"
          },
          {
            "Detail":"Contrôler son travail",
            "Tri":434,
            "CodeValeur":"IX.8.quater.3"
          },
          {
            "Detail":"Etre en contact avec le public",
            "Tri":435,
            "CodeValeur":"IX.8.quater.4"
          },
          {
            "Detail":"Assurer l’encadrement",
            "Tri":436,
            "CodeValeur":"IX.8.quater.5"
          },
          {
            "Detail":"Travailler en équipe ",
            "Tri":437,
            "CodeValeur":"IX.8.quater.6"
          },
          {
            "Detail":"Exercer des tâches physiques",
            "Tri":438,
            "CodeValeur":"IX.8.quater.7",
            "SousDetails":[
              {
                "SousDetail":"Soulever, déplacer des charges",
                "Tri":439,
                "CodeValeur":"IX.8.quater.7.1"
              },
              {
                "SousDetail":"Travailler en flexion du tronc",
                "Tri":440,
                "CodeValeur":"IX.8.quater.7.2"
              },
              {
                "SousDetail":"Travailler en attitudes variées",
                "Tri":441,
                "CodeValeur":"IX.8.quater.7.3"
              },
              {
                "SousDetail":"Travailler accroupi",
                "Tri":442,
                "CodeValeur":"IX.8.quater.7.4"
              },
              {
                "SousDetail":"Travailler en hauteur (escabeau, échelle, échafaudage..)",
                "Tri":443,
                "CodeValeur":"IX.8.quater.7.5"
              },
              {
                "SousDetail":"Travailler à distance du sol (sur un pont, un toit, un balcon…)",
                "Tri":444,
                "CodeValeur":"IX.8.quater.7.6"
              },
              {
                "SousDetail":"Travailler le mb. sup. dominant levé au dessus du niveau des épaules",
                "Tri":445,
                "CodeValeur":"IX.8.quater.7.7"
              },
              {
                "SousDetail":"Travailler le mb. sup. non dominant levé au dessus du niveau des épaules",
                "Tri":446,
                "CodeValeur":"IX.8.quater.7.8"
              },
              {
                "SousDetail":"Utiliser une commande avec les pieds",
                "Tri":447,
                "CodeValeur":"IX.8.quater.7.9"
              }
            ]
          },
          {
            "Detail":"Exercer des tâches dans des conditions particulières",
            "Tri":448,
            "CodeValeur":"IX.8.quater.8",
            "SousDetails":[
              {
                "SousDetail":"Voir les couleurs",
                "Tri":449,
                "CodeValeur":"IX.8.quater.8.1"
              },
              {
                "SousDetail":"Percevoir le relief",
                "Tri":450,
                "CodeValeur":"IX.8.quater.8.2"
              },
              {
                "SousDetail":"Travailler de nuit",
                "Tri":451,
                "CodeValeur":"IX.8.quater.8.3"
              },
              {
                "SousDetail":"Assumer des modifications d’horaires",
                "Tri":452,
                "CodeValeur":"IX.8.quater.8.4"
              },
              {
                "SousDetail":"Utiliser des outils et/ou machines dangereuses",
                "Tri":453,
                "CodeValeur":"IX.8.quater.8.5"
              },
              {
                "SousDetail":"Travailler avec vibrations",
                "Tri":454,
                "CodeValeur":"IX.8.quater.8.6"
              },
              {
                "SousDetail":"Travailler en milieu bruyant",
                "Tri":455,
                "CodeValeur":"IX.8.quater.8.7"
              },
              {
                "SousDetail":"Travailler dans des contextes  respiratoires particuliers",
                "Tri":456,
                "CodeValeur":"IX.8.quater.8.8"
              },
              {
                "SousDetail":"Travailler avec risque cutané",
                "Tri":457,
                "CodeValeur":"IX.8.quater.8.9"
              },
              {
                "SousDetail":"S’exposer aux intempéries, à une atmosphère exceptionnelle",
                "Tri":458,
                "CodeValeur":"IX.8.quater.8.10"
              },
              {
                "SousDetail":"Autre",
                "Tri":459,
                "CodeValeur":"IX.8.quater.8.11"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "Section":"Evolution et besoins",
    "Description":"Besoins de compensation identifiés (PPCCATBES)",
    "Trajectoire":"Toutes",
    "Question":"Quels besoins de compensations ont pu être identifiés?",
    "Type":"CM",
    "Reponses":[
      {
        "Reponse":"Besoins en matière de soins",
        "Tri":2,
        "CodeValeur":"XI.1.bis.1",
        "Details":[
          {
            "Detail":"soins médicaux ambulatoires",
            "Tri":2,
            "CodeValeur":"XI.1.bis.1.a"
          },
          {
            "Detail":"soins médicaux en milieu hospitalier",
            "Tri":3,
            "CodeValeur":"XI.1.bis.1.b"
          },
          {
            "Detail":"soins paramédicaux ambulatoires",
            "Tri":4,
            "CodeValeur":"XI.1.bis.1.c"
          },
          {
            "Detail":"soins paramédicaux en milieu hospitalier",
            "Tri":5,
            "CodeValeur":"XI.1.bis.1.d"
          }
        ]
      },
      {
        "Reponse":"Besoin en matière d'autonomie",
        "Tri":6,
        "CodeValeur":"XI.1.bis.2",
        "Details":[
          {
            "Detail":"Pour accomplir ses actes essentiels",
            "Tri":7,
            "CodeValeur":"XI.1.bis.2.a"
          },
          {
            "Detail":"Pour accomplir ses activités domestiques",
            "Tri":8,
            "CodeValeur":"XI.1.bis.2.b"
          },
          {
            "Detail":"Pour vivre dans un logement",
            "Tri":9,
            "CodeValeur":"XI.1.bis.2.c"
          },
          {
            "Detail":"Pour mener sa vie d'élève",
            "Tri":10,
            "CodeValeur":"XI.1.bis.2.d"
          },
          {
            "Detail":"Pour vivre sa vie d'étudiant",
            "Tri":11,
            "CodeValeur":"XI.1.bis.2.e"
          },
          {
            "Detail":"Pour avoir des activités de jour",
            "Tri":12,
            "CodeValeur":"XI.1.bis.2.f"
          },
          {
            "Detail":"Pour vivre une vie professionnellement",
            "Tri":13,
            "CodeValeur":"XI.1.bis.2.g"
          },
          {
            "Detail":"Pour accéder à ses droits",
            "Tri":14,
            "CodeValeur":"XI.1.bis.2.h"
          },
          {
            "Detail":"Pour mener une vie sociale",
            "Tri":15,
            "CodeValeur":"XI.1.bis.2.i"
          }
        ]
      },
      {
        "Reponse":"Besoins transversaux en matière d'autonomie",
        "Tri":16,
        "CodeValeur":"XI.1.bis.3",
        "Details":[
          {
            "Detail":"Pour communiquer",
            "Tri":17,
            "CodeValeur":"XI.1.bis.3.a"
          },
          {
            "Detail":"Pour assurer la sécurité",
            "Tri":18,
            "CodeValeur":"XI.1.bis.3.b"
          },
          {
            "Detail":"Pour un répit des parents et des aidants",
            "Tri":19,
            "CodeValeur":"XI.1.bis.3.c"
          },
          {
            "Detail":"Pour assurer une présence des parents et des aidants",
            "Tri":20,
            "CodeValeur":"XI.1.bis.3.d"
          }
        ]
      },
      {
        "Reponse":"Besoins en matière de ressources",
        "Tri":21,
        "CodeValeur":"XI.1.bis.4"
      }
    ]
  },
  {
    "Section":"Evolution et besoins",
    "Description":"Evolution  envisagée pour la situation - ",
    "Trajectoire":"toutes",
    "Question":"Quelle évolution de la situation est envisagée pour l'avenir?",
    "Type":"CM",
    "Reponses":[
      {
        "Reponse":"amélioration dans un délai inférieur à 1 an",
        "Tri":1,
        "CodeValeur":"VII.7.1"
      },
      {
        "Reponse":"amélioration dans un délai supérieur à  1 an",
        "Tri":2,
        "CodeValeur":"VII.7.2"
      },
      {
        "Reponse":"stabilité",
        "Tri":3,
        "CodeValeur":"VII.7.3"
      },
      {
        "Reponse":"aggravation",
        "Tri":4,
        "CodeValeur":"VII.7.4",
        "Details":[
          {
            "Detail":"aggravation dans un délai inférieur à 1 an",
            "Tri":5,
            "CodeValeur":"VII.7.4.a"
          },
          {
            "Detail":"aggravation dans un délai supérieur à 1 an",
            "Tri":6,
            "CodeValeur":"VII.7.4.b"
          }
        ]
      },
      {
        "Reponse":"incapacité fluctuante",
        "Tri":7,
        "CodeValeur":"VII.7.5"
      },
      {
        "Reponse":"risque vital",
        "Tri":8,
        "CodeValeur":"VII.7.6"
      },
      {
        "Reponse":"inconnue",
        "Tri":9,
        "CodeValeur":"VII.7.7"
      }
    ]
  },
  {
    "Section":"Evolution et besoins",
    "Description":"évolution depuis la précédente demande",
    "Trajectoire":"toutes",
    "Question":"Quelle évolution de la situation a pu être constatée depuis la précédente demande?",
    "Type":"CU",
    "Reponses":[
      {
        "Reponse":"amélioration",
        "Tri":1,
        "CodeValeur":"VII.8.1"
      },
      {
        "Reponse":"stabilité",
        "Tri":2,
        "CodeValeur":"VII.8.2"
      },
      {
        "Reponse":"aggravation",
        "Tri":3,
        "CodeValeur":"VII.8.3"
      }
    ]
  }
]
