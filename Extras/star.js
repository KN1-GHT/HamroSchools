const stars = document.querySelectorAll('.star');

stars.forEach((star) => {
  star.addEventListener('click', function() {
    stars.forEach((s) => s.classList.remove('active'));
    const rating = this.dataset.rating;
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add('active');
    }
  });
});
