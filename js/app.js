/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

// build the nav
function buildNav(sections) {

    const navlist = document.querySelector('#navbar__list');
    for (let index = 0; index < sections.length; index++) {
        let data = sections[index].getAttribute('data-nav');
        let id = sections[index].id;
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.classList.add('menu__link');
        a.href = '#' + id;
        a.innerHTML = data;
        li.appendChild(a);
        navlist.appendChild(li);
    }

    //adding an event listener to the ul, so we can avoid creating mulibule listners for each link and adding a smooth scroll effect.
    navlist.addEventListener('click', (event) => {
        event.preventDefault();
        const link = event.target.getAttribute('href');
        if (link !== null) {
            const section = document.querySelector(`${link}`);
            section.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        }
    });
}

// Add class 'active' to section when near top of viewport
function setActiveSection(section) {
    const sections = document.querySelectorAll('section');
    section.classList.add('your-active-class');
    sections.forEach(element => {
        if (element.id != section.id) {
            element.classList.remove('your-active-class');
        }
    });
    setActiveLink(`#${section.id}`);
}

// Add class 'active' to the link when its coresponding section when near top of viewport
function setActiveLink(id) {
    const links = document.querySelectorAll('.menu__link');
    console.log(links);
    links.forEach(link => {
        if (link.getAttribute('href') != id) {
            console.log('removed');
            link.classList.remove('active__link');
        } else {
            link.classList.add('active__link');
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".menu__link");
    const options = {
        root: null,
        threshold: 1,
        rootMargin: "100.9px 16px 100.9px 16px"
    };
    buildNav(sections);
    const observer = new IntersectionObserver((sections, observer) => {
        sections.forEach(element => {
            console.log('intersect');
            if (element.isIntersecting) {
                const section = element.target;
                setActiveSection(section);
            }
        });
        observer.disconnect;
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });




});