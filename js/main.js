function sendEmail(mailBody, sender, fromName) {
    let myDialog = document.createElement('dialog');
    myDialog.className = 'email-dialog';

    emailjs.send("service_6smjo6a", "template_spuxsri", {
        from_name: fromName,
        message: mailBody,
        reply_to: sender
    })
    .then(function(response) {
        
        emailjs.send("service_6smjo6a", "template_t230tvt", {
            to_name: fromName,
            user_email: sender
        });

        myDialog.innerHTML = `
            <form method="dialog">
                <p>شكراً لملاحظاتك، سيتم التواصل معك قريباً.</p>
                <button type="submit">موافق</button>
            </form>
        `;
    }, function(error) {
        myDialog.innerHTML = `
            <form method="dialog">
                <p>حدث خطأ أثناء إرسال ملاحظاتك. يرجى المحاولة مرة أخرى لاحقاً.</p>
                <button type="submit">موافق</button>
            </form>
        `;
        console.log('FAILED...', error);
    });

    document.body.appendChild(myDialog);
    myDialog.showModal();
}

function toggleBetweenPages() {
    const items = document.querySelectorAll('nav ul li');
    if (!items || items.length === 0) return;

    const current = location.pathname.split('/').pop() || 'index.html';

    items.forEach(li => {
        const a = li.querySelector('a');
        if (!a) return;

        const href = a.getAttribute('href');
        if (href === current || href === location.pathname || (href === location.hash)) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }

        li.addEventListener('click', function (e) {
            items.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

window.onload = function() {
    toggleBetweenPages();

    emailjs.init("l4vRYVd9uYEi5atf2");

    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        let mailBody = document.getElementById('footer-textarea').value;
        if (!mailBody.trim()) {
            alert('يرجى كتابة ملاحظاتك قبل الإرسال');
            return;
        }

        let sender = document.getElementById('footer-email').value;
        let isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!isValidEmail.test(sender)) {
            alert('يرجى إدخال بريد إلكتروني صالح');
            return;
        }

        let fromName = document.getElementById('footer-username').value;
        if (fromName.trim() === "") {
            fromName = sender.split('@')[0];
        }
        sendEmail(mailBody, sender, fromName);
    });
};
