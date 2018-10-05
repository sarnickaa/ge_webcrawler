# Web Crawler Challenge
For the purposes of this project, we define the Internet as the test data in this document, and a web crawler as software that requests pages from the Internet, parses the content to extract all the links in the page, and visits the links to crawl those pages, to an infinite depth.

## Assumptions / Design Choices
This challenge was completed in 4 parts. webcawler.js was my first attempt. It was completed in approximately an hour and a half. It returned the expected result for the Internet1 dataset, however, it did not screen out http://foo.bar.com/p6 in internet2. Figuring out the correct iteration and validation combinations in webcrawler2.js took significantly longer.
I then cleaned up my code for readability (webcrawler3.js)
Finally, I researched and implemented unit testing.

My design approach was to create a function exclusively for the test data. My thought process began with looking at the expected return and thinking of iteration-based paterns that could return the correct result.

 My solution employs a nested for-loop. As each 'page' is iterated, it and its associated list of links are considered one by one and pushed to relevant array containers.
 My solution sets up 2 temporary containers for collection and validation purposes.

## Testing
I researched and used Mocha as my testing framework. I used the Node.js assert module to perform 2 simple deepEquality assertion tests that tested for object equality between actual and expected parameters.
