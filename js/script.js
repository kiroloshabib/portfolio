const menu=document.getElementById('menu');
const actions=document.getElementById('actions');
const glow=document.querySelector('.cursor-glow');

menu?.addEventListener('click',()=>{
  const active=menu.classList.toggle('is-active');
  actions.classList.toggle('is-active',active);
  menu.setAttribute('aria-expanded',String(active));
});

actions?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  menu?.classList.remove('is-active');
  actions?.classList.remove('is-active');
  menu?.setAttribute('aria-expanded','false');
}));

document.addEventListener('pointermove',e=>{
  if(glow){glow.style.left=`${e.clientX}px`;glow.style.top=`${e.clientY}px`;}
});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const scene=document.getElementById('scene');
if(scene && matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove',e=>{
    const x=(e.clientX/innerWidth-.5)*2;
    const y=(e.clientY/innerHeight-.5)*2;
    scene.style.transform=`translateY(-50%) rotateX(${y*-3}deg) rotateY(${x*4}deg)`;
  });
}

document.querySelectorAll('.tilt').forEach(card=>{
  if(!matchMedia('(pointer:fine)').matches)return;
  card.addEventListener('pointermove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${y*-5}deg) rotateY(${x*5}deg) translateY(-3px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});
