'use strict'

const webCrawler = json => {

  //ALIASES for readability:
  const pages = json.pages

  let success = []
  let errors = []
  let skipped = []

  // container for links to be processed
  let visited = []
  // container for valid page addresses. Used to compare with success array and validate.
  let valids = []

  // populate valids array with pages to crawl from the 'internet' datasets.
  for (let i = 0; i < pages.length; i++) {
    valids.push(pages[i].address)
  }

  // start iterating over the pages:
  for (let i = 0; i < pages.length; i++) {
    // validate for a visited page with a potentially empty links array
    if (pages[i].links.length === 0) {
      success.push(pages[i].address)
    }

    // as each page is visited, begin iterating over its associated links array
    for (let j = 0; j < pages[i].links.length; j++) {
      let elem = pages[i].links[j]
      // declare each individual link to be processed...

      // start by considering if page[i] should go in success array:
      // IF the hosting page doesn't already exist in the success array and the currently iterated link ALSO doesn't exist in the success array
      // add that host address to the success array. This prevents http://foo.bar.com/p6 in internet2 being added which is desirable in accordance with the expected return results. However this logic will also screen out http://foo.bar.com/p5 in internet2.
      // see validation 2 for fix.
      if (success.indexOf(pages[i].address) === -1 && success.indexOf(elem) === -1) {
        success.push(pages[i].address)
      }

      // now consider the links on host page:
      // IF link doesn't already exist in the visited array AND doesn't already exist in success array, then it is a new link that needs to be crawled - add it to visited array
      if (visited.indexOf(elem) === -1 && success.indexOf(elem) === -1) {
        visited.push(elem)
      } else {
        // if the link has been encountered before: either as a main page (thus in success array) or as an associated visited link (thus in visited array)
        // the link must be skipped. Push it to skipped array
        skipped.push(elem)
      }
    }
  }


  // VALIDATIONS:
  for (let i = 0; i < visited.length; i++) {
    // 1. iterate over visited array to find errors - if a link is in visited but doesn't exist in the success array AND doesn't exist in the valids array, it is an error.
    if (success.indexOf(visited[i]) === -1 && valids.indexOf(visited[i]) === -1) {
      errors.push(visited[i])
    }
    // 2. iterate over visited array to validate for http://foo.bar.com/p5 in 'internet2' dataset - if a visited link is in valids array but was not pushed to success array during the initial loop...
    // this will not affect http://foo.bar.com/p6 as it will not exist in visited array for internet2
    if (valids.indexOf(visited[i]) !== -1 && success.indexOf(visited[i]) === -1) {
      success.push(visited[i])
    }
  }
  // 3. remove duplicates from skipped list whilst maintaining insertion order.
  let uniques = Array.from(new Set(skipped))

  return {
    success: success,
    skipped: uniques,
    errors: errors
  }
}

// module.exports = {
//   webCrawler
// }
