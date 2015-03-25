'use strict';

/* jshint multistr: true */

var identites = {
  id: 'identites',
  sref: '.identites',
  label: 'Identités',
  desc: 'Individus et organismes concernés par la demande',
  section: 'obligatoire'
};

var aidant =   {
  id: 'aidant',
  sref: '.aidant.situation.lien',
  label: 'Vie de votre aidant familial',
  desc: 'Si vous souhaitez exprimer des besoins en tant qu\'aidant familial',
  section: 'renouvellement',
  subSections: [
    {
      include: 'departement.demande.aidant.situation.**',
      label: 'Situation'
    },
    {
      include: 'departement.demande.aidant.vos_attentes.**',
      label: 'Attentes'
    }
  ]
};

var vieQuotidienne =   {
  id: 'vie_quotidienne',
  sref: '.vie_quotidienne.situation.vie_famille',
  label: 'Vie quotidienne',
  desc: '',
  section: 'obligatoire',
  subSections: [
    {
      include: 'departement.demande.vie_quotidienne.situation.**',
      label: 'Situation'
    },
    {
      include: 'departement.demande.vie_quotidienne.vos_besoins.**',
      label: 'Besoins'
    },
    {
      include: 'departement.demande.vie_quotidienne.vos_attentes.**',
      label: 'Attentes'
    }
  ]
};

var vieScolaire = {
  id: 'vie_scolaire',
  sref: '.vie_scolaire.situation.condition',
  label: 'Vie scolaire ou étudiante',
  desc: 'Si votre demande concerne votre scolarité ou vie étudiante',
  section: 'complementaire',
  subSections: [
    {
      include: 'departement.demande.vie_scolaire.situation.**',
      label: 'Situation'
    },
    {
      include: 'departement.demande.vie_scolaire.vos_besoins.**',
      label: 'Besoins'
    },
    {
      include: 'departement.demande.vie_scolaire.vos_attentes.**',
      label: 'Attentes'
    }
  ]
};

var vieAuTravail = {
  id: 'vie_au_travail',
  sref: '.vie_au_travail.situation_professionnelle.condition',
  label: 'Vie au travail',
  desc: 'Si votre demande concerne votre projet professionnel',
  section: 'complementaire',
  subSections: [
    {
      include: 'departement.demande.vie_au_travail.situation_professionnelle.**',
      label: 'Situation professionnelle'
    },
    {
      include: 'departement.demande.vie_au_travail.parcours_professionnel.**',
      label: 'Parcours professionnel'
    },
    {
      include: 'departement.demande.vie_au_travail.projet_professionnel.**',
      label: 'Projet professionnel'
    }
  ]
};

var situationsParticulieres = {
  id: 'situations_particulieres',
  sref: '.situations_particulieres.detail',
  label: 'Situations particulières',
  desc: 'Si vous vous trouvez dans une situation nécessitant une attention particulière',
  section: 'complementaire'
};

var renouvellement = {
  id: 'renouvellement',
  sref: '.renouvellement.evolution',
  label: 'Renouvellement',
  desc: 'Vous avez déjà un dossier dans une autre MDPH et souhaitez nous indiquer de quels droits vous bénéficiez actuellement',
  section: 'renouvellement'
};

var documents = {
  id: 'documents',
  sref: '.documents',
  label: 'Documents liés à votre demande',
  desc: 'Pour nous transmettre les documents justificatifs obligatoires et complémentaires',
  section: 'documents'
};

exports.trajectoires = [vieQuotidienne, vieScolaire, vieAuTravail];
exports.all = [identites, aidant, vieQuotidienne, vieScolaire, vieAuTravail, situationsParticulieres, renouvellement, documents];
