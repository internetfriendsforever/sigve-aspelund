const scroller = document.querySelector('.scroller')
const spacer = document.querySelector('.spacer')
const elements = Array.from(document.querySelectorAll('[data-depth]'))
const depths = elements.map(element => parseFloat(element.getAttribute('data-depth'), 10))

let request

scroller.addEventListener('scroll', function () {
  if (!request) {
    request = requestAnimationFrame(update)
  }
})

function update () {
  const scroll = scroller.scrollTop
  const position = scroll / (spacer.offsetHeight - window.innerHeight)

  elements.forEach((element, index) => {
    const depth = depths[index]
    const focus = Math.min((Math.pow(Math.abs(position - depth) * 15, 3) / 10), 10).toFixed(1)
    element.style.filter = `blur(${focus / 10}vh)`
  })

  request = null
}

update()

window.addEventListener('resize', updateHeight)

function updateHeight () {
  scroller.style.height = `${window.innerHeight - 1}px`
}

updateHeight()

const heading = document.querySelector('h1')
const headingDepth = heading.getAttribute('data-depth')
const target = (spacer.offsetHeight - window.innerHeight) * headingDepth

let animating = true

function animate (time) {
  const duration = 2000
  const progress = Math.min(time / duration, 1)
  const bump = (Math.sin(progress * Math.PI * 5) + 1) * (1 - progress) * 0.1
  const eased = progress * progress + bump

  scroller.scrollTo(0, target * eased)

  if (animating && progress <= 1) {
    window.requestAnimationFrame(animate)
  }
}

function stopAnimating () {
  animating = false
}

animate(0)

window.addEventListener('mousewheel', stopAnimating)
window.addEventListener('touchstart', stopAnimating)
window.addEventListener('keydown', stopAnimating)
window.addEventListener('mousedown', stopAnimating)
