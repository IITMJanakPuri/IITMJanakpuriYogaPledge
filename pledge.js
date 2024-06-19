document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('myDropdown').addEventListener('change', showOtherInput);
    document.getElementById('certificateForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
    });
});

function showOtherInput() {
    var dropdown = document.getElementById('myDropdown');
    var otherInput = document.getElementById('otherInput');
    if (dropdown.value === 'Others') {
        otherInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
    }
}



function generateCertificate() {
    const name = document.getElementById('name').value;
    const college = document.getElementById('myDropdown').value === 'Others' 
        ? document.getElementById('otherText').value 
        : document.getElementById('myDropdown').value;
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    if (!name || !college) {
        alert('Please fill out all fields.');
        return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0);

        const nameCenterX = 999;
        const nameCenterY = 686;

        const collegeCenterX = 1003;
        const collegeCenterY = 967;

        const dateCenterX = 1542;
        const dateCenterY = 1097;

        context.font = 'bold 40px Arial';
        context.fillStyle = '#000';
        context.textAlign = 'center';

        context.fillText(name, nameCenterX, nameCenterY);

        context.font = 'bold italic 36px Arial';

        context.fillText(college, collegeCenterX, collegeCenterY);

        context.font = 'italic 24px Arial';

        context.fillText(currentDate, dateCenterX, dateCenterY);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'certificate.png';

        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
    };
    image.src = 'YogaPledgeCert.png';
}
