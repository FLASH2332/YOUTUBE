document.getElementById('donate-button').addEventListener('click', function() {
	window.location.href = 'https://www.paypal.com/donate'; // replace with your donation page URL
});

// replace with your QR code image URL

var qrCodeDiv = document.querySelector('.qr-code');
var qrCodeImg = document.createElement('img');
qrCodeImg.src = qrCodeImageUrl;
qrCodeImg.className = 'qr-code';
qrCodeDiv.appendChild(qrCodeImg);
// script.js
document.getElementById('scroll-down-btn').addEventListener('click', function() {
    document.getElementById('target-section').scrollIntoView({ behavior: 'smooth' });
});
