var tl = gsap.timeline()

tl.from('.navbar .logo', {
    opacity: 0,
    y: -30,
    duration: 0.7,
    delay: 0.5,
})

tl.from(['.mode', '.menuButton'], {
    opacity: 0,
    y: -30,
    duration: 0.6,
    stagger: 0.2, // Delay of 0.3s between each element's animation
})

tl.from(
    ['.main-container', '.timer-container', '.genre-selection', '.text-to-type', '#typing-area', '.button', '.circle'],
    {
        opacity: 0,
        duration: 0.4,
        stagger: 0.3,
    }
)
