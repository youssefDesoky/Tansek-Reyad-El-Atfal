window.onload = function() {
    // Fix social links
    document.querySelectorAll('footer .social li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank');
        });
    });

    // Fix feedback form
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        let mailBody = document.getElementById('footer-textarea').value;
        
        if (!mailBody.trim()) {
            alert('يرجى كتابة ملاحظاتك قبل الإرسال');
            return;
        }
        
        let mailto = `mailto:hgatvhh@gmail.com?subject=Kindergarten Student Distribution Feedback&body=${encodeURIComponent(mailBody)}`;
        window.location.href = mailto;
    });
}