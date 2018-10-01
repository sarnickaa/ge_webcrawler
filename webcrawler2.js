'use strict'
// json
// {
//   "pages": [
//     {
//       "address":"http://foo.bar.com/p1",
//       "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p3", "http://foo.bar.com/p4"]
//     },
//     {
//       "address":"http://foo.bar.com/p2",
//       "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p4"]
//     },
//     {
//       "address":"http://foo.bar.com/p4",
//       "links": ["http://foo.bar.com/p5", "http://foo.bar.com/p1", "http://foo.bar.com/p6"]
//     },
//     {
//       "address":"http://foo.bar.com/p5",
//       "links": []
//     },
//     {
//       "address":"http://foo.bar.com/p6",
//       "links": ["http://foo.bar.com/p7", "http://foo.bar.com/p4", "http://foo.bar.com/p5"]
//     }
//   ]
// }
//
// {
//   "pages": [
//       {
//       "address":"http://foo.bar.com/p1",
//       "links": ["http://foo.bar.com/p2"]
//     },
//     {
//       "address":"http://foo.bar.com/p2",
//       "links": ["http://foo.bar.com/p3"]
//     },
//     {
//       "address":"http://foo.bar.com/p3",
//       "links": ["http://foo.bar.com/p4"]
//     },
//     {
//       "address":"http://foo.bar.com/p4",
//       "links": ["http://foo.bar.com/p5"]
//     },
//     {
//       "address":"http://foo.bar.com/p5",
//       "links": ["http://foo.bar.com/p1"]
//     },
//     {
//       "address":"http://foo.bar.com/p6",
//       "links": ["http://foo.bar.com/p1"]
//     }
//   ]
// }

const webCrawler = json => {

let success = []
let errors = []
let skipped = []

let visited = []
let valids = []

for(let i=0; i < json.pages.length; i++) {
  valids.push(json.pages[i].address)
}
// console.log(valids)

// push in all addresses to success array 1 by one
for(let i=0; i < json.pages.length; i++) {
  // success.push(json.pages[i].address)
  // as each address is pushed in - iterate over that pages associated links

  // validate for a valid visited page with a potentially empty links array
  if(json.pages[i].links.length === 0) {
    success.push(json.pages[i].address)
  }

  for(let j=0; j < json.pages[i].links.length; j++) {
    let elem = json.pages[i].links[j]
    // IF link address doesn't exist in the success array and the iterated link doesn't exist in the success Array
    // add that address to the success array (prevents address 6 being added)
    if(success.indexOf(json.pages[i].address) === -1 && success.indexOf(elem) === -1) {
      success.push(json.pages[i].address)
    }


    // IF link doesn't already exist in the visited array AND doesn't already exist in success array - add it in to visited array
    if(visited.indexOf(elem) === -1 && success.indexOf(elem) === -1) {
      // console.log(json.pages[i].links[j])
      visited.push(elem)
      // console.log(visited)
    } else {
      // if the link has already been encountered before (either as a main page(thus in success array or as an associated link (thus in visited array)))
      // link must be skipped - push to skipped array
      skipped.push(elem)
    }
  }
}
// VALIDATIONS:


// 1. iterate over visited to find errors - if a link is in visited but doesn't exist in the success array - it is an error
// console.log(visited)
for(let i=0; i < visited.length; i++) {
  if(success.indexOf(visited[i]) === -1 && valids.indexOf(visited[i]) === -1) {
    errors.push(visited[i])
  }
  if(valids.indexOf(visited[i]) !== -1 && success.indexOf(visited[i]) === -1) {
    success.push(visited[i])
  }
}
// 2. remove duplicates (in place) from skipped list
let uniques = Array.from(new Set(skipped))

return {
  success: success,
  skipped: uniques,
  errors: errors
}
}

module.exports = { webCrawler }
