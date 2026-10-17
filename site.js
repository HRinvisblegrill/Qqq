(function(){
const $=s=>document.querySelector(s);let C=null,st=null;
const S=()=>C.site,e=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pg=id=>C.pages.find(p=>p.id===id);
const WA=t=>`https://wa.me/${S().wa}?text=${encodeURIComponent(t||'Hello '+S().name+', I need a quote')}`,TEL=()=>'tel:+'+S().wa;
const MAPU=()=>/^https:\/\//i.test(S().map||'')?S().map:('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(S().addr)),DIR=()=>'https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(S().addr),ADL=()=>`<a href="${e(MAPU())}" target="_blank" rel="noopener">${e(S().addr)}</a>`;
const cb=document.createElement('button');cb.id='cb';cb.className='btn b1';cb.textContent='\u{1F4AC} Chat';document.body.appendChild(cb);
const cw=document.createElement('div');cw.id='cw';cw.setAttribute('role','dialog');cw.setAttribute('aria-label','Chat');document.body.appendChild(cw);
const BQ=[['Prices','price'],['Warranty','warranty'],['Areas','area'],['Contact','contact']],lk=(id,x)=>`<a href="${id}/">${e(x)}</a>`;
const PM=[['child,kid,bachch,baby','child-safety-nets'],['invisible,grill,cable','invisible-grills'],['bird,pigeon,kabutar,spike','bird-nets'],['cloth,dryer,hanger','cloth-dryer'],['building,duct,facade','building-nets'],['sport,ground,scaffold,construction,golf','sports-nets'],['balcony,net','balcony-nets']];
function ans(q){q=q.toLowerCase();const h=(...w)=>w.some(x=>q.includes(x)),s=S();
const loc=st.pages.find(p=>p.g==='Locations'&&q.includes(p.t.replace('Invisible Grill in ','').toLowerCase()));
if(h('cloth','dryer','hanger')){const p=pg('cloth-dryer');return `${e(p.d)} For the price, <a href="${WA('Hello, I want the ceiling cloth dryer hanger')}">ask us on WhatsApp</a>. ${lk('cloth-dryer','Details')}`}
const W=(...w)=>w.some(x=>new RegExp('\\b'+x+'\\b').test(q));
if(W('iron','lohe','loha','welded'))return `We fit invisible grills (SS 316 steel cables) and safety nets, not iron grills. ${lk('post-vs-iron-grill','Invisible grill vs iron grill')}`;
if(W('din','days')||h('how long','kab tak','duration','kitna time'))return `The time depends on the number of openings and their size. We confirm it after seeing your photos or visiting the site. <a href="${WA()}">Send photos on WhatsApp</a>.`;
if(W('payment','advance','upi','cash','emi','paisa','pay'))return `Payment terms are agreed with you before work starts. See our ${lk('terms-and-conditions','terms')} or <a href="${WA()}">ask us on WhatsApp</a>.`;
if(W('gst','bill','invoice'))return `Please ask us about billing when you book: <a href="${WA()}">WhatsApp</a> or call ${e(s.phone)}.`;
if(h('kaun','who are you','company','aap kon'))return `${e(s.name)} is a home safety team in Ranchi with 10+ years of experience. We fit invisible grills, safety nets and bird protection in Ranchi, Jharkhand and Bihar. ${lk('about','About us')}`;
if(W('timing','hours','open','raat','night','sunday','holiday'))return `For timings and a site visit, call <a href="${TEL()}">${e(s.phone)}</a> or <a href="${WA()}">WhatsApp us</a>.`;
if(h('price','rate','cost','kitna','daam','kimat','quote')){const pr=`Price depends on the area, cable thickness and type of opening. Send a photo and size on WhatsApp for a clear quote. ${lk('invisible-grill-price','Price guide')}`;return loc?`We serve ${e(loc.t.replace('Invisible Grill in ',''))}. ${pr}`:pr}
if(loc)return `Yes, we serve ${e(loc.t.replace('Invisible Grill in ',''))}. ${lk(loc.id,'See our services there')}. Send a photo and size on WhatsApp for a quote.`;
if(/^(hi|hello|hey|namaste|hii)\b/.test(q))return 'Hello! I can help with invisible grills, nets, bird protection, prices, warranty and areas. What do you need?';
if(h('price','rate','cost','kitna','daam','kimat','quote'))return `Price depends on the area, cable thickness and type of opening. Send a photo and size on WhatsApp for a clear quote. ${lk('rate-card','Rate card details')}`;
if(h('warranty','guarantee','claim'))return `Invisible grill work has a 10-year warranty. ${lk('claim-warranty','How to claim warranty')}`;
if(h('rust','316','steel','material'))return 'Our invisible grills use SS 316 marine-grade stainless steel cables with nylon coating. They are rust-proof.';
if(h('contact','phone','number','call','whatsapp','email','sampark','mail'))return `Call <a href="${TEL()}">${e(s.phone)}</a>, <a href="${WA()}">WhatsApp us</a>, or email <a href="mailto:${e(s.email)}">${e(s.email)}</a>.`;
if(h('address','office','map','visit','kahan','where'))return `${ADL()}. <a href="${e(MAPU())}" target="_blank" rel="noopener">Open in Google Maps</a> | <a href="${e(DIR())}" target="_blank" rel="noopener">Get directions</a>`;
for(const [k,id] of PM)if(h(...k.split(','))){const p=pg(id);if(p)return `${e(p.d)} ${lk(id,'Read more')}`}
if(h('area','location','city','district','bihar','jharkhand','serve'))return `We work in Ranchi, across Jharkhand and in all 38 districts of Bihar. ${lk('locations','See all locations')}`;
if(h('review','rating','feedback'))return `${lk('reviews','See customer reviews')} or send your own.`;
if(h('terms','policy','privacy','condition'))return `${lk('terms-and-conditions','Terms and conditions')} | ${lk('privacy-policy','Privacy policy')}`;
if(h('service','product','offer'))return 'We do invisible grills, balcony and child safety nets, bird nets and spikes, building nets and sports nets. '+lk('services','See services').replace('#/services','#/invisible-grills');
const tk=q.split(/[^a-z0-9]+/).filter(x=>x.length>3);let best=null,bs=0;st.pages.forEach(p=>{if(p.g==='Locations')return;const tx=(p.t+' '+p.d+' '+p.b).toLowerCase();let sc=0;tk.forEach(x=>{if(tx.includes(x))sc++});if(sc>bs){bs=sc;best=p}});if(best&&bs>=2)return `${e(best.d)} ${lk(best.id,'Read more')}`;
return `I am not sure about that. Please ask us on <a href="${WA()}">WhatsApp</a>, or choose a topic below.`}
function say(t,bot){const l=$('#cl'),d=document.createElement('div');d.className='m '+(bot?'b':'u');bot?d.innerHTML=t:d.textContent=t;l.appendChild(d);l.scrollTop=l.scrollHeight}
function ask(v){v=v.trim();if(!v)return;say(v);setTimeout(()=>say(ans(v),1),350)}
function chat(){const w=$('#cw');w.className='on';if(!w.dataset.i){w.dataset.i=1;w.innerHTML=`<div class="ch"><b>Chat with us</b><button data-c="x" aria-label="Close chat">✕</button></div><div id="cl"></div><div class="cq">${BQ.map(q=>`<button data-c="q" data-v="${q[1]}">${q[0]}</button>`).join('')}</div><div class="ci"><input id="cin" placeholder="Type your question" enterkeyhint="send" aria-label="Your question"><button class="btn b2 sm" data-c="s">Send</button></div>`;say('Hello! I am the assistant for '+e(S().name)+'. Ask me about grills, nets, prices, warranty or areas.',1)}}
$('#cb').onclick=chat;
$('#cw').onclick=x=>{const b=x.target.closest('[data-c]');if(x.target.closest('#cl a')){$('#cw').className='';return}if(!b)return;if(b.dataset.c==='x')$('#cw').className='';else if(b.dataset.c==='q')ask(b.dataset.v);else if(b.dataset.c==='s'){const i=$('#cin');ask(i.value);i.value=''}};
$('#cw').onkeydown=x=>{if(x.key==='Enter'&&x.target.id==='cin'){ask(x.target.value);x.target.value=''}};

cb.onclick=async()=>{if(!C){try{C=await (await fetch('content.json')).json();st=C}catch(_){location.href='contact/';return}}chat()};
const D=document.body.dataset,v=i=>{const x=document.getElementById(i);return x?x.value:''};
const wa=t=>{location.href='https://wa.me/'+D.wa+'?text='+encodeURIComponent(t)},ml=(s,t)=>{location.href='mailto:'+D.em+'?subject='+encodeURIComponent(s)+'&body='+encodeURIComponent(t)};
const q1=()=>'Hello '+D.n+', I am '+v('n')+' from '+v('c')+'. '+v('m'),r1=()=>'Review for '+D.n+'\nName: '+v('vn')+'\nCity: '+v('vc')+'\nRating: '+v('vr')+'/5\n'+v('vt');
const o=(i,f)=>{const x=document.getElementById(i);if(x)x.onclick=f};o('sw',()=>wa(q1()));o('se',()=>ml('Quote request',q1()));o('vw',()=>wa(r1()));o('ve',()=>ml('Customer review',r1()));
const bg=$('#bg');if(bg)bg.onclick=()=>$('#menu').classList.toggle('open');
const tb=$('#tb');if(tb)tb.onclick=x=>{const b=x.target.closest('button');if(!b)return;tb.querySelectorAll('button').forEach(y=>y.classList.toggle('on',y===b));document.querySelectorAll('#gg .gc').forEach(c=>{c.style.display=(!b.dataset.f||c.dataset.c===b.dataset.f)?'':'none'})};
const lb=document.createElement('div');lb.id='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Photo');document.body.appendChild(lb);
document.addEventListener('click',x=>{const a=x.target.closest('a.zi');if(a){x.preventDefault();const im=a.querySelector('img');lb.innerHTML='<button class="lbx" aria-label="Close photo">\u2715</button><img src="'+a.getAttribute('href')+'" alt="'+(im?im.alt:'')+'">';lb.classList.add('on');lb.querySelector('.lbx').focus()}else if(x.target.closest('#lb'))lb.classList.remove('on')});
document.addEventListener('keydown',x=>{if(x.key==='Escape'){lb.classList.remove('on');cw.className=''}});
})();
