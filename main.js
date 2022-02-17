import "./style.css"

const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")

let photosArray = []
let count = 5

const apiKey = "Yt7ckAmUVCYCYlkIDDegN0Zb6KZrtEGRQSnkk-YTNzU"
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

function setAttributes(element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value)
  }
}

function displayPhotos() {
  photosArray.forEach(addPhotoToDom)
}

function addPhotoToDom(photo) {
  const item = document.createElement("a")
  setAttributes(item, {
    href: photo.links.html,
    target: "_blank",
  })

  const img = document.createElement("img")
  setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description,
  })

  item.appendChild(img)
  imageContainer.appendChild(item)
}

async function getPhotos() {
  loader.hidden = false
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    displayPhotos()
  } catch (error) {
    console.log(error)
  }
  loader.hidden = true
}

const scrollListener = throttle(() => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos()
  }
}, 500)

window.addEventListener("scroll", scrollListener)

// On Load
getPhotos()

function throttle(fn, delay) {
  let shouldWait = false
  return () => {
    if (!shouldWait) {
      fn()
      shouldWait = true
      setTimeout(() => {
        shouldWait = false
      }, delay)
    }
  }
}

// window.loader = loader
