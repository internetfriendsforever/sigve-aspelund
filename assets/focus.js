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
  const contentHeight = spacer.offsetHeight
  const windowHeight = window.innerHeight
  const position = scroll / (contentHeight - windowHeight)

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
