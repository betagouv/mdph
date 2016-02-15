'use strict';

describe('Service: request', function() {
  var RequestService;

  var sampleRequest = {
    _id: '56b8672b93bb29c9ee1d3e9d',
    user: {
      _id: '559e28fde23468dc21ee5b6c',
      name: 'Florian',
      email: 'del.florian@gmail.com',
      role: 'user'
    },
    status: 'emise',
    documents: {
      obligatoires: {
        certificatMedical: {
          documentType: {
            id: 'certificatMedical',
            label: 'Certificat médical',
            mandatory: true,
            desc: 'Un certificat médical de moins de 3 mois'
          },
          documentList: [
            {
              originalname: 'bouletmaton.jpg',
              encoding: '7bit',
              mimetype: 'image/jpeg',
              filename: '236373cd66e953315885609bd68f0936',
              path: '/Users/delflorian/Work/sgmap/impact/server/uploads/236373cd66e953315885609bd68f0936',
              size: 116287,
              type: 'certificatMedical',
              _id: '56bca6e3b73ef6a867ff6c85'
            }
          ]
        },
        justificatifDomicile: {
          documentType: {
            id: 'justificatifDomicile',
            label: 'Justificatif de domicile',
            mandatory: true,
            desc: 'Un justificatif de domicile de moins de 3 mois'
          },
          documentList: [
            {
              originalname: 'bouletmaton.jpg',
              encoding: '7bit',
              mimetype: 'image/jpeg',
              filename: 'b74f94e603fc8aa7b1c15fe53c221d87',
              path: '/Users/delflorian/Work/sgmap/impact/server/uploads/b74f94e603fc8aa7b1c15fe53c221d87',
              size: 116287,
              type: 'justificatifDomicile',
              _id: '56bca6e6b73ef6a867ff6c87'
            }
          ]
        },
        carteIdentite: {
          documentType: {
            id: 'carteIdentite',
            label: 'Pièce d\'identité',
            mandatory: true,
            desc: 'Une photocopie recto/verso'
          },
          documentList: [
            {
              originalname: 'bouletmaton.jpg',
              encoding: '7bit',
              mimetype: 'image/jpeg',
              filename: '30200c5d301dfbb09dce80c079eebaf4',
              path: '/Users/delflorian/Work/sgmap/impact/server/uploads/30200c5d301dfbb09dce80c079eebaf4',
              size: 116287,
              type: 'carteIdentite',
              isInvalid: true,
              _id: '56bca6e9b73ef6a867ff6c89'
            }
          ]
        }
      },
      complementaires: {
        facture_cantine: {
          documentType: {
            id: 'facture_cantine',
            label: 'Facture cantine (restaurant scolaire)'
          },
          documentList: [
            {
              originalname: 'Screen Shot 2016-02-09 at 14.06.03.png',
              encoding: '7bit',
              mimetype: 'image/png',
              filename: '467e9dc02fe170f205dc6a20f0a1b2b4',
              path: '/Users/delflorian/Work/sgmap/impact/server/uploads/467e9dc02fe170f205dc6a20f0a1b2b4',
              size: 156935,
              isInvalid: true,
              type: 'facture_cantine',
              _id: '56c1a60cdade25a6f6066df1'
            }
          ]
        },
        rib_iban: {
          documentType: {
            id: 'rib_iban',
            label: 'Relevé d\'identité bancaire (RIB/IBAN)',
            isAsked: true
          },
          documentList: []
        }
      }
    }
  };

  // load the service's module
  beforeEach(module('impactApp'));

  beforeEach(inject(function(_RequestService_) {
    RequestService = _RequestService_;
  }));

  it('should return every refused documents', function() {
    //given
    //sampleRequest

    //when
    var refusedDocuments = RequestService.findRefusedDocuments(sampleRequest);

    //then
    expect(refusedDocuments.obligatoires.length + refusedDocuments.complementaires.length).toEqual(2);
  });

  it('should return every asked document types', function() {
    //given
    //sampleRequest

    //when
    var askedDocumentTypes = RequestService.findAskedDocumentTypes(sampleRequest);

    //then
    expect(askedDocumentTypes[0].id).toEqual('rib_iban');
  });

});
