document.querySelectorAll('article').forEach(card=>{
  const video=card.querySelector('video'),buttons=card.querySelectorAll('button');
  if(!video)return;
  video.muted=true;
  video.autoplay=true;
  video.loop=true;
  video.setAttribute('autoplay','');
  video.setAttribute('loop','');
  video.play().catch(()=>{});
  if(buttons[0])buttons[0].setAttribute('aria-pressed','true');
  buttons.forEach(button=>button.onclick=()=>{
    const t=video.currentTime,playing=!video.paused;
    video.pause();
    video.src=video.canPlayType('video/mp4; codecs="avc1.64001f"')?button.dataset.mp4:button.dataset.webm;
    video.addEventListener('loadedmetadata',()=>{
      video.currentTime=Math.min(t,video.duration);
      if(playing||video.autoplay)video.play().catch(()=>{});
    },{once:true});
    video.load();
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  });
});
