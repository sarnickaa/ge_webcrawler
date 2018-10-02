'use strict'

const webCrawler = json => {

  const pages = json.pages

  let success = []
  let errors = []
  let skipped = []
  let visited = []
  let valids = []

  for (let i = 0; i < pages.length; i++) {
    valids.push(pages[i].address)
  }

  for (let i = 0; i < pages.length; i++) {
    if (pages[i].links.length === 0) {
      success.push(pages[i].address)
    }

    for (let j = 0; j < pages[i].links.length; j++) {
      let elem = pages[i].links[j]

      if (!success.includes(pages[i].address) && !success.includes(elem)) {
        success.push(pages[i].address)
      }

      if (!visited.includes(elem) && !success.includes(elem)) {
        visited.push(elem)
      } else {
        skipped.push(elem)
      }
    }
  }

  for (let i = 0; i < visited.length; i++) {
    if (!success.includes(visited[i]) && !valids.includes(visited[i])) {
      errors.push(visited[i])
    }
    if (valids.includes(visited[i]) && !success.includes(visited[i])) {
      success.push(visited[i])
    }
  }
  let uniques = [...(new Set(skipped))]

  return {
    success: success,
    skipped: uniques,
    errors: errors
  }
}

module.exports = {
  webCrawler
}
