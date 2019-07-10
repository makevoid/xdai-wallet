
const bindButtons = () => {
  // doc.querySelector(".refresh-btn").addEventListener("click", refreshPage)
}

//  --------

const contentLoadFailed = (err) => {
  console.error("Content load failed")
  console.log("Original error:")
  console.log(err)
}

const main = {}

window.fn = main

main.defaultPage = "receive.html"
main.currentPage = main.defaultPage

main.open = () => {
  const splitter = doc.querySelector('#splitter')
  splitter.open()
}

main.setCurrentPage = (page) => (
  () => {
    main.currentPage = page
  }
)

main.load = (page) => {
  const content  = doc.querySelector('#content')
  const splitter = doc.querySelector('#splitter')
  content.load(page)
    .then(splitter.close.bind(splitter))
    .then(bindButtons)
    .then(main.setCurrentPage(page))
    .catch(contentLoadFailed)

  // refactored:
  //
  // return (async () => {
  //   const content  = doc.querySelector('#content')
  //   const splitter = doc.querySelector('#splitter')
  //   const contentIsLoaded = await content.load(page)
  //   splitter.close.bind(splitter)
  //   bindButtons()
  //   main.setCurrentPage(page)
  //   console.log("contentIsLoaded:", contentIsLoaded)
  //   return contentIsLoaded
  // })()
}

main.refreshPage = () => {
  console.log(`refreshing ${main.currentPage}`)
  main.load(main.currentPage)
}