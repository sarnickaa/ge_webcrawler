const webcrawler2 = require('./webcrawler2.js')
const assert = require('assert');

// https://www.taniarascia.com/unit-testing-in-javascript/


let json = { "pages": [
    {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p3", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5", "http://foo.bar.com/p1", "http://foo.bar.com/p6"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": []
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p7", "http://foo.bar.com/p4", "http://foo.bar.com/p5"]
    }
  ]
}

let json2 = { "pages": [
      {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p3"]
    },
    {
      "address":"http://foo.bar.com/p3",
      "links": ["http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": ["http://foo.bar.com/p1"]
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p1"]
    }
  ]
}


it('it correctly returns result for Internet1', () => {
  assert.deepEqual(webcrawler2.webCrawler(json), { success:
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

it('it correctly returns result for Internet2', () => {
  assert.deepEqual(webcrawler2.webCrawler(json2), { success:
   [ 'http://foo.bar.com/p1',
     'http://foo.bar.com/p2',
     'http://foo.bar.com/p3',
     'http://foo.bar.com/p4',
     'http://foo.bar.com/p5' ],
  skipped: [ 'http://foo.bar.com/p1' ],
  errors: [] });
});
