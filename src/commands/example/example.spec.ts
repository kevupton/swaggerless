import { testPostCommand } from '../../../system/testing';
import * as chai from 'chai';
import { example } from './index';
const expect = chai.expect;

describe('example command', () => {
  it('should run example no problem', async () => {

    await testPostCommand('example', (body, res, err) => {

      expect(body && body.data && body.data.exist, '`exist` data should be on the body data').to.equal('yes i do');
      expect(!!err, 'there should be no error').to.be.false;

    }, {
      args: {
        dollarydoos: 400
      }
    });

  });
});
