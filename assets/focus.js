const elements = Array.from(document.querySelectorAll('[data-depth]'))
const depths = elements.map(element => parseFloat(element.getAttribute('data-depth'), 10))

let request

window.addEventListener('scroll', event => {
  if (!request) {
    request = requestAnimationFrame(update)
  }
})

function update () {
  const scroll = document.documentElement.scrollTop
  const contentHeight = document.body.offsetHeight
  const windowHeight = window.innerHeight
  const position = scroll / (contentHeight - windowHeight)

  elements.forEach((element, index) => {
    const depth = depths[index]
    const focus = Math.min(Math.pow(Math.abs(position - depth) * 15, 2), 5).toFixed(1)
    element.style.filter = `blur(${focus}px)`
  })

  request = null
}

update()
