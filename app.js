const cards = document.querySelectorAll('article');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target;
    const inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
    video.dataset.inView = String(inView);

    if (inView) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
}, { threshold: [0, 0.35, 0.7] });

cards.forEach(card => {
  const video = card.querySelector('video');
  const buttons = card.querySelectorAll('button');
  if (!video) return;

  video.muted = true;
  video.loop = true;
  video.autoplay = false;
  video.removeAttribute('autoplay');
  video.dataset.inView = 'false';
  observer.observe(video);

  if (buttons[0]) buttons[0].setAttribute('aria-pressed', 'true');

  buttons.forEach(button => button.addEventListener('click', () => {
    const wasPlaying = !video.paused;
    const time = video.currentTime;
    video.pause();
    video.src = video.canPlayType('video/mp4; codecs="avc1.64001f"')
      ? button.dataset.mp4
      : button.dataset.webm;

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = wasPlaying ? Math.min(time, video.duration) : 0;
      if (video.dataset.inView === 'true') video.play().catch(() => {});
    }, { once: true });

    video.load();
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
});
