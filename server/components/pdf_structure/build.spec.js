'use strict';

import DocumentCategory from '../../api/document-category/document-category.model';
import {startServer} from '../../test/utils/server';
import {populate} from '../../test/utils/seed';
import proxyquire from 'proxyquire';
import {Readable} from 'stream';

const pdfBuild = proxyquire('./build', {
  '../gridfs': function() {
    return {
      createReadStream() {
        return new Readable();
      }
    };
  }
});

describe('Build pdf structure', function() {

  var api;
  var token;
  var testUser;
  var server;
  var testMdph;
  var documentList = [{
    type: 'carteIdentite',
    originalname: 'carte-identite.jpg',
    path: '/path/to/carte-identite',
    filename: 'hashed-carte-identite',
    mimetype: 'image/jpeg'
  },{
    type: 'justificatifDomicile',
    originalname: 'justificatif-domicile.jpg',
    path: '/path/to/justificatif-domicile',
    filename: 'hashed-justificatif-domicile',
    mimetype: 'image/jpeg'
  },{
    type: 'certificatMedical',
    originalname: 'certificat-medical.pdf',
    path: '/path/to/certificat-medical',
    filename: 'hashed-certificat-medical',
    mimetype: 'application/pdf'
  }];

  before(done => {
    startServer((result) => {
      server = result.server;
      api = result.api;

      populate((result) => {
        token = result.token;
        testUser = result.fakeUser;
        testMdph = result.testMdph;
        done();
      });
    });
  });

  after(done => {
    server.close();
    done();
  });

  describe('With no preconfigured categories', function() {
    it('should return the default structure', done => {
      pdfBuild(testMdph.zipcode, '/fake/path/to/request.pdf', documentList).then(structure => {
        /*jshint -W030 */
        structure.should.be.an.Array;
        structure.length.should.be.eql(4);
        structure[0].should.be.eql('/fake/path/to/request.pdf');
        structure[1].should.be.eql('/path/to/carte-identite');
        done();
      });
    });
  });

  describe('With preconfigured categories', function() {
    before(done => {
      DocumentCategory.remove()
        .exec()
        .then(DocumentCategory.create({
          label: 'Certificat médical',
          documentTypes: ['certificatMedical'],
          barcode: { _id: require('mongoose').Types.ObjectId() },
          mdph: testMdph._id
        }))
        .then(() => done());
    });

    after(done => {
      DocumentCategory.remove().exec(done);
    });

    it('should return the correct structure', done => {
      pdfBuild(testMdph.zipcode, '/fake/path/to/request.pdf', documentList).then(structure => {
        /*jshint -W030 */
        structure.should.be.an.Array;
        structure.length.should.be.eql(4);
        structure[0].should.be.eql('/fake/path/to/request.pdf');
        structure[1].should.be.eql('/path/to/certificat-medical');
        done();
      });
    });
  });
});
