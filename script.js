  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  // Hide custom cursor on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    cursorRing.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  function animCursor(){
    cursor.style.left=mx+'px'; cursor.style.top=my+'px';
    rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
    cursorRing.style.left=rx+'px'; cursorRing.style.top=ry+'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();

  // ── HAMBURGER MENU ──
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobileDrawer');
  const backdrop  = document.getElementById('drawerBackdrop');

  function openDrawer() {
    hamburger.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () =>
    drawer.classList.contains('open') ? closeDrawer() : openDrawer()
  );
  backdrop.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-link').forEach(a =>
    a.addEventListener('click', closeDrawer)
  );
  // close on Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  // Rose petals — fewer on mobile for performance
  const hero = document.getElementById('hero');
  const colors = ['#e8a0a7','#f2c4cb','#c4737a','#d4a0aa','#f5d5d8','#b85c72'];
  const petalCount = window.innerWidth < 768 ? 8 : 20;
  for(let i=0;i<petalCount;i++){
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
    const diff=new Date('2026-06-09T13:00:00')-new Date();
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

  // Character counter
  const quoteEl = document.getElementById('inp-quote');
  const charUsed = document.getElementById('char-used');
  quoteEl.addEventListener('input', () => { charUsed.textContent = quoteEl.value.length; });

  // Tribute counter (starts at 6 pre-existing cards)
  let tributeCount = 6;

  function showStatus(type, msg) {
    const el = document.getElementById('status-msg');
    el.className = 'status-msg ' + type;
    el.textContent = msg;
  }
  function hideStatus() {
    const el = document.getElementById('status-msg');
    el.className = 'status-msg';
    el.textContent = '';
  }

  async function submitTribute() {
    const name  = document.getElementById('inp-name').value.trim();
    const dept  = document.getElementById('inp-dept').value.trim();
    const batch = document.getElementById('inp-batch').value.trim();
    const quote = quoteEl.value.trim();

    if (!name || !quote) { showStatus('error', 'Please enter your name and tribute.'); return; }
    if (quote.length < 10) { showStatus('error', 'Tribute is a little short — write from the heart!'); return; }

    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    showStatus('loading', '✦ Adding your tribute…');

    // Optional: polish the quote via Claude API (gracefully skip on failure)
    let finalQuote = quote;
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 200,
          messages: [{
            role: 'user',
            content: `You are a gentle editor for a college farewell yearbook. 
Lightly polish the following student tribute — fix obvious typos and grammar only. 
Keep the voice, emotions, and meaning 100% intact. 
Return ONLY the polished tribute text, nothing else, no quotes around it.

Tribute: ${quote}`
          }]
        })
      });
      if (resp.ok) {
        const data = await resp.json();
        const polished = data?.content?.[0]?.text?.trim();
        if (polished && polished.length > 5) finalQuote = polished;
      }
    } catch (_) { /* network off — use original */ }

    // Build card
    tributeCount++;
    const num = String(tributeCount).padStart(2, '0');
    const deptBatch = [dept, batch ? 'Batch ' + batch : ''].filter(Boolean).join(' · ');

    const card = document.createElement('div');
    card.className = 'tribute-card';
    card.style.animationDelay = '0s';
    card.innerHTML = `
      <span class="new-badge">New</span>
      <span class="tribute-num">${num}</span>
      <p class="tribute-quote">${escHtml(finalQuote)}</p>
      <p class="tribute-name">${escHtml(name)}</p>
      ${deptBatch ? `<p class="tribute-dept">${escHtml(deptBatch)}</p>` : ''}
    `;

    const grid = document.getElementById('tributes-grid');
    // Remove empty state if present
    const empty = grid.querySelector('.empty-state');
    if (empty) empty.remove();

    grid.prepend(card);

    // Re-number badges (skip new card)
    setTimeout(() => {
      const badge = card.querySelector('.new-badge');
      if (badge) {
        setTimeout(() => badge.remove(), 4000);
      }
    }, 0);

    // Reset form
    document.getElementById('inp-name').value  = '';
    document.getElementById('inp-dept').value  = '';
    document.getElementById('inp-batch').value = '';
    quoteEl.value = '';
    charUsed.textContent = '0';

    btn.disabled = false;
    showStatus('success', '✦ Your tribute has been added!');
    setTimeout(hideStatus, 3500);
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }