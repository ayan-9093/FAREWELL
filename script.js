 const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  function animCursor(){
    cursor.style.left=mx+'px'; cursor.style.top=my+'px';
    rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
    cursorRing.style.left=rx+'px'; cursorRing.style.top=ry+'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();

  // Rose petals
  const hero = document.getElementById('hero');
  const colors = ['#e8a0a7','#f2c4cb','#c4737a','#d4a0aa','#f5d5d8','#b85c72'];
  for(let i=0;i<20;i++){
    const p=document.createElement('div');
    p.className='petal';
    p.style.left=Math.random()*100+'%';
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDuration=(7+Math.random()*10)+'s';
    p.style.animationDelay=(Math.random()*14)+'s';
    p.style.transform=`rotate(${Math.random()*360}deg)`;
    hero.appendChild(p);
  }

  const reveals=document.querySelectorAll('.program-item,.tribute-card,.memory-card');
  const io=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'),i*80);
    });
  },{threshold:0.1});
  reveals.forEach(el=>io.observe(el));

  function updateCountdown(){
    const diff=new Date('2026-06-28T17:30:00')-new Date();
    if(diff<=0){['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id=>document.getElementById(id).textContent='00');return;}
    document.getElementById('cd-days').textContent=String(Math.floor(diff/86400000)).padStart(2,'0');
    document.getElementById('cd-hours').textContent=String(Math.floor((diff%86400000)/3600000)).padStart(2,'0');
    document.getElementById('cd-mins').textContent=String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
    document.getElementById('cd-secs').textContent=String(Math.floor((diff%60000)/1000)).padStart(2,'0');
  }
  updateCountdown();
  setInterval(updateCountdown,1000);

  // ── REGISTRATION FORM ──
  let registrations = JSON.parse(localStorage.getItem('fw26_regs') || '[]');

  function saveRegs() {
    try { localStorage.setItem('fw26_regs', JSON.stringify(registrations)); } catch(e) {}
  }

  function updateCountBadge() {
    const el = document.getElementById('entryCount');
    if (el) el.textContent = registrations.length + ' Registered';
  }

  function submitForm() {
    const name  = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const roll  = document.getElementById('f-roll').value.trim();
    const phone = document.getElementById('f-phone').value.trim();

    if (!name || !email || !roll || !phone) { shake(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { highlight('f-email'); return; }
    if (!/^\d{10}$/.test(phone)) { highlight('f-phone'); return; }

    registrations.push({ name, email, roll, phone, ts: new Date().toISOString() });
    saveRegs();
    updateCountBadge();

    document.getElementById('formWrap').style.display = 'none';
    const succ = document.getElementById('formSuccess');
    succ.style.display = 'flex';
    succ.style.flexDirection = 'column';
    succ.style.alignItems = 'center';
    document.getElementById('successMsg').textContent =
      'See you at the farewell, ' + name.split(' ')[0] + '! 🌸';
  }

  function resetForm() {
    ['f-name','f-email','f-roll','f-phone'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('formWrap').style.display = 'block';
    document.getElementById('formSuccess').style.display = 'none';
  }

  function shake() {
    const card = document.querySelector('.form-card');
    card.style.transition = 'transform 0.1s';
    let i = 0;
    const iv = setInterval(() => {
      card.style.transform = i % 2 === 0 ? 'translateX(6px)' : 'translateX(-6px)';
      if (++i > 5) { clearInterval(iv); card.style.transform = ''; }
    }, 60);
  }

  function highlight(id) {
    const el = document.getElementById(id);
    el.style.borderColor = '#ff6b7a';
    el.style.boxShadow = '0 0 14px rgba(255,107,122,0.3)';
    el.focus();
    setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; }, 2000);
  }

  updateCountBadge();