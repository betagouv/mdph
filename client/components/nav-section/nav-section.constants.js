'use strict';

/* jshint multistr: true */

angular.module('impactApp').constant('SectionConstants', [
  {
    id: 'identite',
    sref: '.identite',
    label: 'Identité',
    desc: 'Identité de l\'enfant ou de l\'adulte concerné par la demande',
    section: 'obligatoire'
  },
  {
    id: 'autorite',
    sref: '.autorite',
    label: 'Autorité parentale',
    desc: 'Identité de l\'autorité parentale ou délégation d\'autorité parentale',
    section: 'obligatoire'
  },
  {
    id: 'vie_quotidienne',
    sref: '.vie_quotidienne.situation.vie_famille',
    label: 'Vie quotidienne',
    desc: '',
    section: 'obligatoire',
    subSections: [
      {
        include: 'departement.demande.vie_quotidienne.situation.**',
        label: 'Votre situation'
      },
      {
        include: 'departement.demande.vie_quotidienne.vos_besoins.**',
        label: 'Vos besoins'
      },
      {
        include: 'departement.demande.vie_quotidienne.vos_attentes.**',
        label: 'Vos attentes'
      }
    ]
  },
  {
    id: 'vie_scolaire',
    sref: '.vie_scolaire.situation.condition',
    label: 'Vie scolaire ou étudiante',
    desc: 'Si votre demande concerne votre scolarité ou vie étudiante',
    section: 'complementaire',
    subSections: [
      {
        include: '.vie_scolaire.situation.**',
        label: 'Votre situation'
      },
      {
        include: '.vie_scolaire.vos_attentes.**',
        label: 'Vos attentes'
      }
    ]
  },
  {
    id: 'vie_au_travail',
    sref: '.vie_au_travail.situation_professionnelle.condition',
    label: 'Vie au travail',
    desc: 'Si votre demande concerne votre projet professionnel',
    section: 'complementaire',
    subSections: [
      {
        include: 'departement.demande.vie_au_travail.situation_professionnelle.**',
        label: 'Votre situation professionnelle'
      },
      {
        include: 'departement.demande.vie_au_travail.projet_professionnel.**',
        label: 'Votre projet professionnel'
      }
    ]
  },
  {
    id: 'situations_particulieres',
    sref: '.situations_particulieres.detail',
    label: 'Situations particulières',
    desc: 'Si vous vous trouvez dans une situation nécessitant une attention particulière',
    section: 'complementaire'
  },
  {
    id: 'renouvellement',
    sref: '.renouvellement.evolution',
    label: 'Renouvellement',
    desc: 'Vous avez déjà un dossier dans une autre MDPH et souhaitez nous indiquer de quels droits vous bénéficiez actuellement',
    section: 'autour_de_votre_demande'
  },
  {
    id: 'aidant',
    sref: '.aidant.situation.lien',
    label: 'Vie de votre aidant familial',
    desc: 'Si vous souhaitez exprimer des besoins en tant qu\'aidant familial',
    section: 'autour_de_votre_demande',
    subSections: [
      {
        include: 'departement.demande.aidant.situation.**',
        label: 'Votre situation'
      },
      {
        include: 'departement.demande.aidant.vos_attentes.**',
        label: 'Vos attentes'
      }
    ]
  },
  {
    id: 'contact_partenaire',
    sref: '.contact_partenaire',
    label: 'Vous êtes aidés dans vos démarches',
    desc: 'Si vous acceptez que nous contactons ces personnes afin de mieux évaluer votre situation',
    section: 'autour_de_votre_demande'
  },
  {
    id: 'documents',
    sref: '.documents',
    label: 'Documents liés à votre demande',
    desc: 'Pour nous transmettre les documents justificatifs obligatoires et complémentaires',
    section: 'documents'
  }
]);
