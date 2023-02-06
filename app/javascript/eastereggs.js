document.addEventListener("DOMContentLoaded", function() {
    let image = document.getElementById("exploding-image");
    let clicks = 0;
    if (!clicks || !image) return;

    image.addEventListener("click", function() {
        clicks++;
        if (clicks === 5) {
            let fragments = [];
            for (let i = 0; i < 25; i++) {
                let fragment = document.createElement("div");
                fragment.classList.add("fragment");
                fragment.style.backgroundImage = "url('<%= asset_path 'image.png' %>')";
                fragment.style.top = (image.offsetTop + image.offsetHeight / 2) + "px";
                fragment.style.left = (image.offsetLeft + image.offsetWidth / 2) + "px";
                document.body.appendChild(fragment);
                fragments.push(fragment);
            }
            image.style.display = "none";
            setTimeout(function() {
                fragments.forEach(function(fragment) {
                    fragment.style.transition = "all 1s cubic-bezier(0.165, 0.84, 0.44, 1)";
                    fragment.style.transform = "translate(" + (Math.random() * 500 - 250) + "px, " + (Math.random() * 500 - 250) + "px) rotate(" + (Math.random() * 360 - 180) + "deg)";
                    fragment.style.opacity = "0";
                });
            }, 100);
        }
    });
});