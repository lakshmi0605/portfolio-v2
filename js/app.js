// Change background header
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

// mixitup filter portfolio
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */ 
const linkWork = document.querySelectorAll('.work__item')

function activeWork(){
    linkWork.forEach(l=> l.classList.remove('active-work'))
    this.classList.add('active-work')
}
linkWork.forEach(l=> l.addEventListener('click', activeWork))


/* Scroll Sections - Active Link*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* Light and Dark Themes */ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* Scroll Reveal Animation  */
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home__data`)
sr.reveal(`.home__handle`, {delay: 500})
sr.reveal(`.home__social, .home__scroll`,{delay: 900, origin: 'bottom'})


// Handles form submission with user details
async function onContactSubmit(event){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const createdOn = new Date().toString();

    const data = {name,email,message,createdOn};
    await sendThankYouEmail(data);
    const isNotificationSuccess = await sendNotificationEmail(data);

    let contactMessage = "";
    const contactMsgEle = document.getElementById("contact-msg");
    if(!isNotificationSuccess){
        contactMsgEle.style.color = "red";
        contactMessage = `
        There was an error sending your message. Please try again later, or contact me directly via 
        <a href="mailto:lakshmipanguluri98@gmail.com" class="errorEmail">email</a>.
    `; 
    }else{
        contactMsgEle.style.color = "green";
        contactMessage = `
        Thank you for contacting. I will respond as soon as possible.
    `;
    }

    contactMsgEle.style.visibility="visible";
    contactMsgEle.innerHTML = contactMessage;

    event.target.reset(); //reset the contact form

}

//send thankyou email for user
async function sendThankYouEmail(data){
    try{
        await emailjs.send('portfolio_service', 'thankyou_email', data);
    }catch(error){
        console.error(error);
    }
}

//send notification email to yourself
async function sendNotificationEmail(data){
    try{
        await emailjs.send('portfolio_service', "notification_email", data);
    }catch(error){
        console.error(`${error}`);
        return false;
    }
    return false;
}

// To initialize EmailJS with your public key
function initializeEmailJS() {
    emailjs.init('HUcLo3PHd1KurlJOe');
}

initializeEmailJS();