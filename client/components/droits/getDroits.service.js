'use strict';

angular.module('impactApp')
  .factory('getDroits', function() {
    return function(data, isAdult) {

      if (data) {
        // Factoriser et acceder par les questions
        var besoins = data.vie.answers.besoins ? data.vie.answers.besoins.answers : undefined;
        var besoinsDeplacement = besoins ? besoins.besoinsDeplacement : undefined;
        var besoinsQuotidien = besoins ? besoins.besoinsVie : undefined;
        var besoinsSocial = besoins ? besoins.besoinsSocial : undefined;

        var attentes = data.vie.answers.attentes && data.vie.answers.attentes.answers ? data.vie.answers.attentes.answers : undefined;
        var attentesType = attentes ? attentes.attentesTypeAide : undefined;

        var aidant = data.aidant;
        var aidantAnswers = aidant ? aidant.answers : undefined;
        var aidantAttentes = aidantAnswers ? aidantAnswers.attentes : undefined;
        var aidantTypeAttente = aidantAttentes ? aidantAttentes.answers.typeAttente : undefined;
        var aidantAttenteVieillesse = aidantTypeAttente ? aidantTypeAttente.vieillesse : false;

        var contexte = data.contexte;
        var situations = contexte.answers.situations;
        var urgences = situations && situations.answers ? situations.answers.urgences : undefined;
        var formation = urgences ? urgences.formation : false;
        var travail = urgences ? urgences.travail : false;
        var ecole = urgences ? urgences.ecole : false;

        var renouvellement = !contexte.answers.nouveauDossier;
        var connaisTaux = contexte.answers.connaisTaux;
        var taux = contexte.answers.tauxIncapacite;
        var contestationTaux = contexte.answers.contestationTaux;
      }

      var carte = {
        type: 'presta-carte',
        prestations: [
          {
            id: 'carteStationnement',
            label: 'Carte stationnement',
            title: 'Carte de stationnement',
            description: 'La carte européenne de stationnement permet à son titulaire ou à la personne qui l\'accompagne de stationner sur les places réservées aux personnes handicapées.',
            link: 'http://vosdroits.service-public.fr/particuliers/F2891.xhtml',
            shouldHave: function() {
              return besoinsDeplacement && besoinsDeplacement.public ||
                attentesType && attentesType.mobilite;
            }
          },
          {
            id: 'carteInvalidite',
            label: 'Carte d\'invalidité',
            title: 'Carte d\'invalidité',
            description: 'La carte d\'invalidité civile a pour but d\'attester que son détenteur est handicapé et permet de bénéficier de certains droits spécifiques, notamment dans les transports.',
            link: 'http://vosdroits.service-public.fr/particuliers/F2446.xhtml',
            shouldHave: function() {
              return besoinsQuotidien && (besoinsQuotidien.hygiene || besoinsQuotidien.habits || besoinsQuotidien.repas) ||
                besoinsDeplacement && besoinsDeplacement.intraDomicile;
            }
          }
        ]
      };

      var aideFinanciere = {
        type: 'presta-finances',
        prestations: [
          {
            id: 'aeeh',
            label: 'AEEH',
            title: 'Allocation d\'éducation de l\'enfant handicapé',
            description: 'L\'allocation d\'éducation de l\'enfant handicapé (AEEH) est destinée à soutenir les personnes qui assurent la charge d\'un enfant en situation de handicap.',
            link: 'http://vosdroits.service-public.fr/particuliers/N14808.xhtml',
            shouldHave: function() {
              if (renouvellement) {
                if (connaisTaux && taux < 50 && contestationTaux !== 'aggrave') {
                  return false;
                }
              }
              return !isAdult && (attentesType && attentesType.financierHandicap) &&
                (besoinsQuotidien && (besoinsQuotidien.hygiene || besoinsQuotidien.habits || besoinsQuotidien.repas) ||
                besoinsDeplacement && besoinsDeplacement.intraDomicile ||
                besoinsSocial && besoinsSocial.securite);
            }
          },
          {
            id: 'aah',
            label: 'AAH',
            title: 'Allocation aux adultes handicapés',
            description: 'L\'allocation aux adultes handicapés (AAH) est versée, sous conditions de ressources, aux adultes déclarés handicapés afin de leur assurer un revenu minimum.',
            link: 'http://vosdroits.service-public.fr/particuliers/N12230.xhtml',
            shouldHave: function() {
              return  (isAdult && attentesType && attentesType.financierHandicap) &&
                (besoinsQuotidien && (besoinsQuotidien.hygiene || besoinsQuotidien.habits || besoinsQuotidien.repas) ||
                  besoinsSocial && (besoinsSocial.proches  || besoinsSocial.securite) ||
                  besoinsDeplacement && besoinsDeplacement.intraDomicile ||
                  attentesType && attentesType.financierMinimum
                );
            }
          },
          {
            id: 'pch',
            label: 'PCH',
            title: 'Prestation de compensation du handicap',
            description: 'La prestation de compensation du handicap (PCH) est une aide personnalisée destinée à financer les besoins liés à la perte d\'autonomie des personnes handicapées.',
            link: 'http://vosdroits.service-public.fr/particuliers/N14201.xhtml',
            shouldHave: function() {
              return (
                besoinsDeplacement && besoinsDeplacement.conduite ||
                attentesType && (attentesType.amenagement || attentesType.financierHandicap || attentesType.materiel || attentesType.mobilite || attentesType.humain)
              ) &&
              (
                besoinsQuotidien && (besoinsQuotidien.hygiene || besoinsQuotidien.habits || besoinsQuotidien.repas) ||
                besoinsDeplacement && (besoinsDeplacement.accesDomicile || besoinsDeplacement.public || besoinsDeplacement.transports) ||
                besoinsSocial && (besoinsSocial.proches || besoinsSocial.securite || besoinsSocial.communication)
              );
            }
          },
          {
            id: 'AV',
            label: 'AV',
            title: 'Affiliation gratuite à l\'assurance vieillesse',
            description: 'L\'affiliation à l\'assurance vieillesse permet à l\'aidant familial de valider des trimestres pour sa retraite sans qu\'il ait besoin de verser des cotisations auprès de sa caisse de retraite.',
            link: 'http://vosdroits.service-public.fr/particuliers/F2574.xhtml',
            shouldHave: function() {
              return aidantAttenteVieillesse;
            }
          }
        ]
      };

      var accompagnement = {
        type: 'presta-accompagnement',
        prestations: [
          {
            id: 'ems',
            label: 'EMS',
            title: 'Accompagnement par un service ou établissement médico-social',
            description: 'Orientation vers un établissement médical de santé.',
            shouldHave: function() {
              return attentesType && attentesType.etablissement;
            }
          },
          {
            id: 'savs',
            label: 'SAVS',
            title: 'Services d\'accompagnement à la vie sociale',
            description: 'Les services d\'accompagnement à la vie sociale ont pour vocation de contribuer à la réalisation du projet de vie de personnes adultes handicapées par un accompagnement adapté.',
            shouldHave: function() {
              return isAdult &&
                (besoinsSocial && (besoinsSocial.loisirs || besoinsSocial.citoyen || besoinsSocial.proches) ||
                  besoinsQuotidien && besoinsQuotidien.sante);
            }
          },
          {
            id: 'samsah',
            label: 'SAMSAH',
            title: 'Service d\'accompagnement médico-social pour adultes handicapés',
            description: 'Le service d\'accompagnement médico-social pour adultes handicapés (SAMSAH) a pour vocation la recherche des missions visées à l\'article D 3121553 du code de l\'action sociale et des familles.',
            shouldHave: function() {
              return isAdult &&
                (besoinsSocial && (besoinsSocial.loisirs || besoinsSocial.citoyen || besoinsSocial.proches) ||
                  besoinsQuotidien && besoinsQuotidien.sante);
            }
          },
          {
            id: 'orp',
            label: 'Orientation professionnelle',
            title: 'Orientation professionnelle',
            description: 'La demande d\'Orientation professionnelle vise à définir le milieu de travail dans lequel la personne handicapée pourra exercer une activité adaptée à sa situation.',
            shouldHave: function() {
              // besoin evoaue dans vie scolaire //TODO
              return formation || travail;
            }
          },
          {
            id: 'pps',
            label: 'PPS',
            title: 'Plan personnalisé de scolarisation',
            description: 'Le PPS fait partie du Plan de compensation du handicap (PCH). Il définit les modalités de déroulement de la scolarité et les actions pédagogiques, psychologiques, éducatives,sociales, médicales et paramédicales répondant aux besoins particuliers des élèves présentant un handicap.',
            shouldHave: function() {
              // besoin evoaue dans vie professionnelle //TODO
              return ecole;
            }
          },
          {
            id: 'rqth',
            label: 'RQTH',
            title: 'Reconnaissance de la Qualité de Travailleur Handicapé',
            description: 'Un travailleur handicapé est une personne dont les possibilités d\'obtenir ou de conserver un emploi sont réduites à cause de son handicap. Il peut s\'agir de l\'altération d\'une ou plusieurs fonctions physique, sensorielle, mentale ou psychique.',
            shouldHave: function() {
              // besoin evoaue dans vie professionnelle //TODO
              return formation || travail;
            }
          }
        ]
      };

      var autre = {
        type: 'presta-autre',
        prestations: []
      };

      var all = [
        carte,
        aideFinanciere,
        accompagnement,
        autre
      ];

      return all;
    };
});
