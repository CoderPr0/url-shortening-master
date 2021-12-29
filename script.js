// Menu
const menu = document.querySelector('nav > div')
const menuCheck = document.getElementById('menu')

menuCheck.addEventListener('change', ()=>{
    if(menuCheck.checked == true){
        menu.classList.add('open')
    }else{
        menu.classList.remove('open')
    }
})


// Nav
window.addEventListener('scroll', ()=>{
    const nav = document.querySelector('nav')
    let windowPosition = window.scrollY > 0

    nav.classList.toggle('scrolling-active', windowPosition)
})


// Shorten button
const shortenBtn = document.querySelector('.linkbox button')
const shortenTextField = document.querySelector('.linkbox input')
shortenBtn.addEventListener('click', ()=>{
    if(shortenTextField.value == ''){
        return
    }
    else{
        requestData()
    }
})

// Create html elements
const links = document.querySelector('.links')

createHtmlElement = (original, short) =>{
    const div1 = document.createElement('div')
    links.appendChild(div1)
    
    const p1 = document.createElement('p')
    p1.innerHTML = original
    div1.appendChild(p1)
    
    const div2 = document.createElement('div')
    div2.classList.add('newLink')
    div1.appendChild(div2)

    const p2 = document.createElement('p')
    p2.innerHTML = short
    div2.appendChild(p2)

    const button = document.createElement('button')
    button.innerHTML = 'Copy'
    button.addEventListener('click', ()=>{
        navigator.clipboard.writeText(p2.innerHTML)
        button.innerHTML = 'Copied!'
        button.classList.add('copied')
    })
    div2.appendChild(button)
}


// Get data
requestData = () =>{
    // fetch(`https://api.shrtco.de/v2/shorten?url=${}`)
    fetch(`https://api.shrtco.de/v2/shorten?url=www.google.com`)
    .then(res => res.json())
    .then(data => shortLink(data))
}

// Use data
shortLink = (data) =>{
    const originalLink = data.result.original_link
    const shortLink = data.result.short_link
    
    createHtmlElement(originalLink, shortLink)
}