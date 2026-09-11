const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const progress=$("#progress"),navbar=$("#navbar");
function updateScrollUI(){const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${h>0?(scrollY/h)*100:0}%`;navbar.classList.toggle("scrolled",scrollY>15)}
addEventListener("scroll",updateScrollUI,{passive:true});updateScrollUI();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));
const navItems=$$(".nav-links a"),sections=$$("main section[id]");
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)navItems.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${e.target.id}`))}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>sectionObserver.observe(s));
const menuToggle=$("#menuToggle"),navLinks=$("#navLinks");menuToggle.addEventListener("click",()=>navLinks.classList.toggle("open"));navItems.forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));
$$(".filter").forEach(button=>button.addEventListener("click",()=>{$$(".filter").forEach(b=>b.classList.remove("active"));button.classList.add("active");const f=button.dataset.filter;$$(".skill").forEach(s=>s.classList.toggle("hidden",f!=="all"&&s.dataset.category!==f))}));
const modal=$("#projectModal"),modalTitle=$("#modalTitle"),modalText=$("#modalText"),modalTags=$("#modalTags");
$$(".project").forEach(card=>$(".project-link",card).addEventListener("click",()=>{modalTitle.textContent=card.dataset.title;modalText.textContent=card.dataset.text;modalTags.innerHTML=card.dataset.tags.split(",").map(t=>`<span>${t.trim()}</span>`).join("");modal.classList.add("open");modal.setAttribute("aria-hidden","false")}));
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}$("#modalClose").addEventListener("click",closeModal);modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("#year").textContent=new Date().getFullYear();
