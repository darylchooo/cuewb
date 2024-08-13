document.addEventListener("DOMContentLoaded", function() {
    // Function to initialize a slideshow for a given section
    function initializeSlideshow(slideshowContainer) {
        const displayImage = slideshowContainer.querySelector(".display-image");
        const thumbnails = slideshowContainer.querySelectorAll(".thumbnail-row img");
        const imageCaption = slideshowContainer.querySelector(".image-caption");
        
        let currentIndex = 0;
        const intervalTime = 3000; // Time in milliseconds for auto-slide

        if (window.innerWidth <= 768) {
            intervalTime = 5000;
        } 
        
        // Function to update the display image and caption
        function updateImage(index) {
            // Remove 'shown' class from all thumbnails
            thumbnails.forEach((thumbnail) => {
                thumbnail.classList.remove("shown");
            });

            // Add 'shown' class to the selected thumbnail
            thumbnails[index].classList.add("shown");

            // Clear previous content
            displayImage.innerHTML = '';

            // Create new image element
            const img = document.createElement("img");
            img.src = thumbnails[index].src;
            img.style.width = '650px';  // Set image width
            img.style.height = '385px'; // Set image height
            img.style.objectFit = 'cover'; // Ensures image covers the container without distortion

            // Append image to the display container
            displayImage.appendChild(img);
            displayImage.style.opacity = 1;

            // Update the caption
            imageCaption.textContent = thumbnails[index].alt;
        }

        // Function to move to the next image
        function nextImage() {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            updateImage(currentIndex);
        }

        // Event listener for thumbnail clicks
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener("click", () => {
                currentIndex = index;
                updateImage(currentIndex);
                clearInterval(autoSlide); // Stop auto-slide when a thumbnail is clicked
            });
        });

        // Initialize the slideshow
        updateImage(currentIndex);
        const autoSlide = setInterval(nextImage, intervalTime); // Auto-slide every 3 seconds

        window.addEventListener("resize", () => {
            if (window.innerWidth <= 768) {
                intervalTime = 5000;
            } else {
                intervalTime = 3000;
            }
        })
    }

    // Initialize all slideshows on the page
    document.querySelectorAll(".section-photos").forEach(slideshowContainer => {
        initializeSlideshow(slideshowContainer);
    });
});