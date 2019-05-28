inlineSVG.init()

let withReference = false

const insertReference = () => {
    if (!withReference) {
        let container = document.querySelector('.references')
        let toRemove = container.querySelector('p')
        container.removeChild(toRemove)

        let listContent = '<div class="list-item"> <div class="list-details"> <div class="title">Julia Camille L. Menchavez, M.S.</div><div class="subtitle">Senior Associate IS Architect, Amgen</div><div class="subtitle">+1 (310) 989-3425</div></div></div><div class="list-item"> <div class="list-details"> <div class="title">Arnelle C. Balane</div><div class="subtitle">Software Developer, Newlogic</div><div class="subtitle">+63 919-821-3291</div></div></div><div class="list-item"> <div class="list-details"> <div class="title">Danica S. Erediano</div><div class="subtitle">Front End Developer, ChannelFix.com, LLC.</div><div class="subtitle">+63 915-162-5930</div></div></div>'

        let list = document.createElement('div')
        list.classList.add('list')
        list.innerHTML = listContent
        container.appendChild(list)

        withReference = true
        return 'Inserted Reference'
    }
}

insertReference()