const navbar = document.getElementById('navbar');
const toggleButton = document.querySelector('.toggle-button');
const closeButton = document.querySelector('.close-button');

// Menangani klik pada tombol toggle untuk membuka navbar
toggleButton.addEventListener('click', () => {
    console.log("Toggle button clicked"); // Debugging
    navbar.classList.toggle('show');
});

// Menangani klik pada tombol close (pastikan ada elemen closeButton di HTML)
closeButton?.addEventListener('click', () => {
    console.log("Close button clicked"); // Debugging
    navbar.classList.remove('show');
});

// Menangani klik di luar navbar
document.addEventListener('click', (event) => {
    const isClickInside = navbar.contains(event.target) || toggleButton.contains(event.target);
    
    if (!isClickInside) {
        console.log("Clicked outside navbar"); // Debugging
        navbar.classList.remove('show');
    }
});


// Form Submission
const form = document.querySelector('.contact-form');
const messageDiv = document.getElementById('form-message');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman default
    console.log("Form submitted!"); // Menandai bahwa form telah disubmit

    const formData = new FormData(form);

    fetch(form.action, { // Menggunakan form.action yang sudah ditetapkan
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            messageDiv.textContent = 'Pesan telah terkirim!';
            messageDiv.style.color = 'green';
            messageDiv.style.display = 'block';
            form.reset(); // Mengatur ulang formulir setelah pengiriman
            console.log("Message sent successfully!"); // Pesan sukses
        } else {
            return response.json().then(data => {
                messageDiv.textContent = 'Terjadi kesalahan: ' + data.errors.map(error => error.message).join(', ');
                messageDiv.style.color = 'red';
                messageDiv.style.display = 'block';
                console.log("Error occurred:", data.errors); // Menampilkan kesalahan
            });
        }
    })
    .catch(error => {
        messageDiv.textContent = 'Terjadi kesalahan: ' + error.message;
        messageDiv.style.color = 'red';
        messageDiv.style.display = 'block';
        console.log("Fetch error:", error); // Menampilkan kesalahan fetch
    });
});
