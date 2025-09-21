document.getElementById('mainContactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let mailBody = document.getElementById('contact-message').value;
    if (!mailBody.trim()) {
        alert('يرجى كتابة ملاحظاتك قبل الإرسال');
        return;
    }

    let sender = document.getElementById('contact-email').value;
    let isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isValidEmail.test(sender)) {
        alert('يرجى إدخال بريد إلكتروني صالح');
        return;
    }

    let topic = document.getElementById('contact-subject').value;

    mailBody = `الموضوع: ${topic}\n\n${mailBody}`;

    let fromName = document.getElementById('contact-name').value;
    if (fromName.trim() === "") {
        fromName = sender.split('@')[0];
    }

    sendEmail(mailBody, sender, fromName);
});