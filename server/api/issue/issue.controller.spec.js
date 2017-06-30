'use strict';

import should from 'should';
import Issue from './issue.model';

import {startServer} from '../../../test/utils/server';
import {populate} from '../../../test/utils/seed';

describe('Issue controller', function() {
  var api;
  var token;
  var agent;
  var mdph;

  before(function(done) {
    startServer((result) => {
      api = result.api;
      populate((result) => {
        token = result.tokenAdminMdph;
        agent = result.fakeUserAdminMdph;
        mdph = result.testMdph;
        done();
      });
    });
  });

  before(done => {
    Issue.remove().exec(done);
  });

  after(function(done) {
    Issue.remove().exec(done);
  });

  describe('Create a single Issue', () => {
    const section = 'environment';

    it('should create an Issue', function(done) {
      const issue = new Issue({
        user: agent._id,
        title: 'This is a test issue',
        message: 'Hello world',
        section,
        parentId: '0',
        questionId: '0'
      });

      api
        .post(`/api/issues?access_token=${token}`)
        .send(issue)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          const issue = res.body;

          should.exist(issue.user);
          issue.user.should.be.exactly(agent._id.toString());
          done();
        });
    });

    it('should respond 200 and return the created Issue', function(done) {
      api
        .get(`/api/issues/${section}?access_token=${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          const issues = res.body;
          issues.length.should.be.exactly(1);

          const issue = issues[0];
          issue.user._id.should.be.exactly(agent._id.toString());
          issue.user.mdph.zipcode.should.be.exactly(mdph.zipcode.toString());
          done();
        });
    });
  });
});
