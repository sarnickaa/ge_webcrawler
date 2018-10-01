'use strict'
json
{
  "pages": [
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

{
  "pages": [
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

const webCrawler = json => {

let success = []
let nonLink = []
let skipped = []

let allLinks = []

// let obj = JSON.parse(json)

// push in all addresses to success array 1 by one
for(i=0; i < json.pages.length; i++) {
  success.push(json.pages[i].address)
  // as each address is pushed in - iterate over that pages associated links
  for(j=0; j < json.pages[i].links.length; j++) {
    // IF link doesn't already exist in the allLinks array AND doesn't already exist in success array - add it in to allLinks array
    let elem = json.pages[i].links[j]
    // console.log(elem)
    if(allLinks.indexOf(elem) === -1 && success.indexOf(elem) === -1) {
      // console.log(json.pages[i].links[j])
      allLinks.push(elem)
      // console.log(allLinks)
    } else {
      // if the link has already been encountered before (either as a main page(thus in success array or as an associated link (thus in allLinks array)))
      // link must be skipped - push to skipped array
      skipped.push(elem)
    }
  }
}
// VALIDATIONS:
// 1. iterate over allLinks to find errors - if a link in allLinks but doesn't exist in the success array - it is an error
console.log(allLinks)
for(i=0; i < allLinks.length; i++) {
  if(success.indexOf(allLinks[i]) === -1) {
    nonLink.push(allLinks[i])
  }
}
// 2. remove duplicates (in place) from skipped list
let uniques = Array.from(new Set(skipped))

return {
  success: success,
  skipped: uniques,
  nonLink: nonLink
}
}
