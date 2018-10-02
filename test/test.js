
const assert = require('assert');
const webcrawler2 = require('../webcrawler2.js')
const data = require('../internet_datasets/data.js')

// https://www.taniarascia.com/unit-testing-in-javascript/

const internet1 = data.json
const internet2 = data.json2

it('correctly returns result for Internet1', () => {
  assert.deepEqual(webcrawler2.webCrawler(internet1), { success:
   [ 'http://foo.bar.com/p1',
     'http://foo.bar.com/p2',
     'http://foo.bar.com/p4',
     'http://foo.bar.com/p5',
     'http://foo.bar.com/p6' ],
  skipped:
   [ 'http://foo.bar.com/p2',
     'http://foo.bar.com/p4',
     'http://foo.bar.com/p1',
     'http://foo.bar.com/p5' ],
  errors: [ 'http://foo.bar.com/p3', 'http://foo.bar.com/p7' ] });
});

it('correctly returns result for Internet2', () => {
  assert.deepEqual(webcrawler2.webCrawler(internet2), { success:
   [ 'http://foo.bar.com/p1',
     'http://foo.bar.com/p2',
     'http://foo.bar.com/p3',
     'http://foo.bar.com/p4',
     'http://foo.bar.com/p5' ],
  skipped: [ 'http://foo.bar.com/p1' ],
  errors: [] });
});
