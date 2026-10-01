const films = [
 ['Who you really Are','Cortometraggio','https://drive.google.com/file/d/1P5Yyi4VNKfQ6uqzN76dW1v3ebxRTsXGm/view'],
 ['The Siren','Video','https://youtu.be/7SXjHLCaBXs'],
 ['Love','Video','https://vimeo.com/1002218769'],
 ['Non è mai come sembra','Cortometraggio','https://youtu.be/wMjH9YAIMl4'],
 ['Luigi Mangione the documentary','Documentario','https://youtu.be/0HYYVy28yUY'],
 ['Davide Livermore','Intervista · Laurea Honoris Causa','https://youtu.be/69Aa2pigmJA'],
 ['Start Cup Piemonte Valle d’Aosta 2024','Università di Torino','https://youtu.be/r9yEhT4TPlQ'],
 ['Innovazione della didattica','Università di Torino','https://youtu.be/kEvv3UvJi20'],
 ['Gym dance','Video','https://youtu.be/kmAUBONCEm0'],
 ['Boys Guardian transformation incomplete','Video','https://youtu.be/IFC-vRcFhJk'],
 ['Brat or Demure?','Social · TikTok','https://vm.tiktok.com/ZNe384mbe/']
];
const wall=document.querySelector('#wall'),viewer=document.querySelector('#viewer'),full=document.querySelector('#full-video'),motion=document.querySelector('#motion');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;const visible=new Set();
function syncMotion(){motion.textContent=paused?'Avvia anteprime':'Pausa anteprime';motion.setAttribute('aria-pressed',String(paused));for(const v of wall.querySelectorAll('video')){if(!paused&&!document.hidden&&!viewer.open&&visible.has(v))v.play().catch(()=>{});else v.pause();}}
motion.addEventListener('click',()=>{paused=!paused;syncMotion()});reduced.addEventListener('change',e=>{paused=e.matches;syncMotion()});document.addEventListener('visibilitychange',syncMotion);
const observer=new IntersectionObserver(entries=>{for(const entry of entries){const v=entry.target;if(entry.isIntersecting){visible.add(v);if(!v.src){v.src=v.dataset.src;v.load();}}else{visible.delete(v);v.pause();}}syncMotion();},{threshold:.15});
// Existing preview assets from Luca's portfolio. No unverified film-title mapping.
for(const n of [2,3,4,7,8,9,10,11,12,13,14,15]){
 const id=String(n).padStart(2,'0'),src=`https://lucamancini.pages.dev/${id}.mp4`;
 const card=document.createElement('div');card.className='clip loading';
 const video=document.createElement('video');video.dataset.src=src;video.muted=true;video.loop=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-hidden','true');
 video.addEventListener('loadeddata',()=>card.classList.remove('loading'));video.addEventListener('error',()=>{card.classList.add('failed');card.classList.remove('loading')});
 const button=document.createElement('button');button.className='clip-open';button.setAttribute('aria-label',`Apri sequenza ${id}`);button.innerHTML=`<span>SEQUENZA / ${id}</span><b aria-hidden="true">▶</b>`;
 button.addEventListener('click',()=>{document.querySelector('#viewer-title').textContent=`Sequenza ${id}`;document.querySelector('#video-error').hidden=true;full.src=src;full.muted=false;viewer.showModal();syncMotion();full.play().catch(()=>{});});
 card.append(video,button);wall.append(card);observer.observe(video);
}
full.addEventListener('error',()=>document.querySelector('#video-error').hidden=false);
document.querySelector('#close').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close();}});viewer.addEventListener('close',()=>{full.pause();full.removeAttribute('src');full.load();syncMotion()});
films.forEach(([title,type,url],i)=>{const a=document.createElement('a');a.className='film-row';a.href=url;a.target='_blank';a.rel='noopener noreferrer';const number=document.createElement('span');number.className='number';number.textContent=String(i+1).padStart(2,'0');const text=document.createElement('div');const h=document.createElement('h3');h.textContent=title;const small=document.createElement('small');small.textContent=type;text.append(h,small);const watch=document.createElement('span');watch.className='watch';watch.textContent='Guarda il film ↗';a.append(number,text,watch);document.querySelector('#film-list').append(a);});syncMotion();
