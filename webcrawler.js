'use strict'

const webCrawler = json => {

  let success = []
  let errors = []
  let skipped = []

  let allLinks = []

  // push in all addresses to success array 1 by one
  for (i = 0; i < json.pages.length; i++) {
    success.push(json.pages[i].address)
    // as each address is pushed in - iterate over the associated links
    for (j = 0; j < json.pages[i].links.length; j++) {
      // IF link doesn't already exist in the allLinks array AND it doesn't already exist in success array - add it in to allLinks array
      let elem = json.pages[i].links[j]
      if (allLinks.indexOf(elem) === -1 && success.indexOf(elem) === -1) {
        allLinks.push(elem)
      } else {
        // if the link has already been encountered before: either as a main page(thus in success array) or as an associated link (thus in allLinks array)
        // link must be skipped. Push link to skipped array.
        skipped.push(elem)
      }
    }
  }

  // VALIDATIONS:
  // 1. iterate over allLinks to find errors. If a link is in allLinks but doesn't exist in the success array, it is an invalid link.
  for (i = 0; i < allLinks.length; i++) {
    if (success.indexOf(allLinks[i]) === -1) {
      errors.push(allLinks[i])
    }
  }
  // 2. remove duplicates from skipped list whilst maintaining insertion order.
  let uniques = Array.from(new Set(skipped))

  return {
    success: success,
    skipped: uniques,
    errors: errors
  }
}
