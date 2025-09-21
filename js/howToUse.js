function displayImageFullScreen(img) {
    const dialog = document.createElement('dialog');
    dialog.className = 'image-container';
    dialog.setAttribute('aria-label', img.alt || 'صورة مكبرة');
    dialog.innerHTML = `
        <div class="image-wrap">
            <img src="${img.src}" alt="${img.alt || ''}">
            <button class="close-btn" aria-label="إغلاق">&times;</button>
        </div>
    `;
    document.body.appendChild(dialog);

    dialog.querySelector('.close-btn').addEventListener('click', () => dialog.close());
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            dialog.close();
        }
    });

    // dialog.addEventListener('click', (e) => {
    //     if (e.target === dialog) {
    //         dialog.close();
    //     }
    // });

    dialog.showModal();
}

document.addEventListener('DOMContentLoaded', function () {
    const imgs = document.querySelectorAll('.images img');
    if (!imgs || imgs.length === 0) return;

    imgs.forEach(img => {
        if (img.dataset.fullscreenBound) return;
        img.dataset.fullscreenBound = '1';
        img.addEventListener('click', function (e) {
            displayImageFullScreen(img);
        });
    });
});