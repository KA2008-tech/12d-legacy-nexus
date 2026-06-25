/* ==========================================
   12D LEGACY NEXUS
   JAVASCRIPT PHASE A
========================================== */

/* ========= LOADING SCREEN ========= */

window.addEventListener("load", () => {

setTimeout(() => {

const loader = document.getElementById("loader");

if(loader){
loader.style.opacity = "0";

setTimeout(()=>{
loader.style.display = "none";
},500);
}

},3000);

});

/* ========= SIDEBAR ========= */

const sidebar =
document.getElementById("sidebar");

const mainContent =
document.getElementById("mainContent");

const menuBtn =
document.getElementById("menuBtn");

menuBtn.addEventListener("click",()=>{

sidebar.classList.toggle("collapsed");

mainContent.classList.toggle("expanded");

});

/* ========= PAGE NAVIGATION ========= */

function showPage(pageId){

const pages =
document.querySelectorAll(".page");

pages.forEach(page=>{

page.classList.remove("active");

});

const selectedPage =
document.getElementById(pageId);

if(selectedPage){

selectedPage.classList.add("active");

}

const buttons =
document.querySelectorAll(".nav-btn");

buttons.forEach(btn=>{

btn.classList.remove("active");

});

event.target.closest(".nav-btn")
.classList.add("active");

window.scrollTo({
top:0,
behavior:"smooth"
});

}

/* ========= LIVE CLOCK ========= */

function updateClock(){

const clock =
document.getElementById("clock");

if(!clock) return;

const now =
new Date();

clock.innerHTML =
now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

/* ========= THEME SYSTEM ========= */

const themeBtn =
document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle(
"gold-theme"
);

if(
document.body.classList.contains(
"gold-theme"
)
){

localStorage.setItem(
"theme",
"gold"
);

}else{

localStorage.setItem(
"theme",
"blue"
);

}

});

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "gold"){

document.body.classList.add(
"gold-theme"
);

}

/* ========= MEMBER SEARCH ========= */

function searchMembers(){

const input =
document.getElementById(
"searchInput"
);

if(!input) return;

const filter =
input.value.toLowerCase();

const cards =
document.querySelectorAll(
".member-card"
);

cards.forEach(card=>{

const text =
card.innerText.toLowerCase();

if(text.includes(filter)){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

}

/* AUTO CONNECT SEARCH */

const searchInput =
document.getElementById(
"searchInput"
);

if(searchInput){

searchInput.addEventListener(
"keyup",
searchMembers
);

}

/* ==========================================
   JAVASCRIPT PHASE B
========================================== */

/* ========= ANIMATED STARS ========= */

const canvas =
document.getElementById("stars");

if(canvas){

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

let stars = [];

for(let i=0;i<150;i++){

stars.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speed:Math.random()*0.6

});

}

function drawStars(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

ctx.fillStyle="#ffffff";

stars.forEach(star=>{

ctx.beginPath();

ctx.arc(
star.x,
star.y,
star.size,
0,
Math.PI*2
);

ctx.fill();

star.y += star.speed;

if(star.y > canvas.height){

star.y = 0;
star.x = Math.random()*canvas.width;

}

});

requestAnimationFrame(
drawStars
);

}

drawStars();

window.addEventListener(
"resize",
()=>{

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

});

}

/* ========= COUNTDOWN ========= */

function updateCountdown(){

const reunionDate =
new Date(
"July 1, 2027 00:00:00"
);

const now =
new Date();

const gap =
reunionDate - now;

if(gap < 0) return;

const days =
Math.floor(
gap /
(1000*60*60*24)
);

const hours =
Math.floor(
(gap %
(1000*60*60*24))
/
(1000*60*60)
);

const minutes =
Math.floor(
(gap %
(1000*60*60))
/
(1000*60)
);

const seconds =
Math.floor(
(gap %
(1000*60))
/
1000
);

const d =
document.getElementById("days");
const h =
document.getElementById("hours");
const m =
document.getElementById("minutes");
const s =
document.getElementById("seconds");

if(d) d.innerHTML = days;
if(h) h.innerHTML = hours;
if(m) m.innerHTML = minutes;
if(s) s.innerHTML = seconds;

}

setInterval(
updateCountdown,
1000
);

updateCountdown();

/* ========= MESSAGE WALL ========= */

const postBtn =
document.getElementById(
"postMessageBtn"
);

if(postBtn){

postBtn.addEventListener(
"click",
()=>{

const input =
document.getElementById(
"messageInput"
);

const feed =
document.querySelector(
".messages-feed"
);

if(
!input.value.trim()
) return;

const card =
document.createElement(
"div"
);

card.className =
"message-card";

card.innerHTML =

`
<h3>You</h3>
<p>${input.value}</p>
<span>Just Now</span>
`;

feed.prepend(card);

input.value = "";

showNotification(
"Message Posted"
);

});

}

/* ========= LUMINA AI ========= */

const sendBtn =
document.querySelector(
".chat-input button"
);

if(sendBtn){

sendBtn.addEventListener(
"click",
sendLuminaMessage
);

}

function sendLuminaMessage(){

const input =
document.querySelector(
".chat-input input"
);

const area =
document.querySelector(
".chat-area"
);

if(
!input.value.trim()
) return;

const userMsg =
document.createElement(
"div"
);

userMsg.className =
"user-message";

userMsg.style.cssText =

`
margin-left:auto;
background:rgba(255,215,0,.15);
padding:15px;
border-radius:18px;
max-width:75%;
margin-bottom:15px;
`;

userMsg.innerHTML =
input.value;

area.appendChild(
userMsg
);

const userText =
input.value.toLowerCase();

input.value = "";

setTimeout(()=>{

const aiMsg =
document.createElement(
"div"
);

aiMsg.className =
"ai-message";

let reply =
"Hello, I am Lumina AI.";

if(
userText.includes("hello")
){

reply =
"Hello! Welcome back to 12D Legacy Nexus.";

}

else if(
userText.includes("teacher")
){

reply =
"Our teachers shaped the future of Class 12D.";

}

else if(
userText.includes("members")
){

reply =
"The Members Database contains classmates and their future careers.";

}

else if(
userText.includes("reunion")
){

reply =
"The reunion countdown is active in the Reunion Hub.";

}

else{

reply =
"I am still learning. Future versions of Lumina AI will be smarter.";

}

aiMsg.innerHTML =
reply;

area.appendChild(
aiMsg
);

area.scrollTop =
area.scrollHeight;

},800);

}

/* ========= NOTIFICATIONS ========= */

function showNotification(text){

const notify =
document.createElement(
"div"
);

notify.innerHTML = text;

notify.style.cssText =

`
position:fixed;
top:90px;
right:20px;
background:linear-gradient(135deg,#00d9ff,#ffd700);
color:black;
padding:15px 25px;
border-radius:15px;
font-weight:700;
z-index:9999;
`;

document.body.appendChild(
notify
);

setTimeout(()=>{

notify.remove();

},3000);

}

/* ========= STAT COUNTERS ========= */

const stats =
document.querySelectorAll(
".stat-card h2"
);

stats.forEach(stat=>{

const target =
parseInt(
stat.innerText
);

let count = 0;

const timer =
setInterval(()=>{

count++;

stat.innerText =
count + "+";

if(count >= target){

clearInterval(
timer
);

}

},40);

});


/* ==========================================
   JAVASCRIPT PHASE C
   HEAVEN EDITION
========================================== */

/* ========= WELCOME MESSAGE ========= */

setTimeout(() => {

showNotification(
"Welcome to 12D Legacy Nexus 🚀"
);

}, 3500);

/* ========= SAVE MESSAGE WALL ========= */

function saveMessages(){

const feed =
document.querySelector(".messages-feed");

if(!feed) return;

localStorage.setItem(
"12dMessages",
feed.innerHTML
);

}

function loadMessages(){

const saved =
localStorage.getItem(
"12dMessages"
);

const feed =
document.querySelector(
".messages-feed"
);

if(saved && feed){

feed.innerHTML = saved;

}

}

loadMessages();

/* Override existing post button save */

if(postBtn){

postBtn.addEventListener(
"click",
()=>{

setTimeout(()=>{

saveMessages();

},100);

});

}

/* ========= SHOOTING STARS ========= */

if(canvas){

function shootingStar(){

const x =
Math.random() * canvas.width;

const y =
Math.random() * 200;

let length = 0;

const interval =
setInterval(()=>{

ctx.beginPath();

ctx.strokeStyle =
"rgba(255,255,255,.8)";

ctx.lineWidth = 2;

ctx.moveTo(x,y);

ctx.lineTo(
x + length,
y + length * 0.5
);

ctx.stroke();

length += 10;

if(length > 150){

clearInterval(interval);

}

},20);

}

setInterval(
shootingStar,
7000
);

}

/* ========= GALLERY LIGHTBOX ========= */

const galleryCards =
document.querySelectorAll(
".gallery-card"
);

galleryCards.forEach(card=>{

card.addEventListener(
"click",
()=>{

const title =
card.querySelector("h3")
?.innerText;

const lightbox =
document.createElement("div");

lightbox.style.cssText =

`
position:fixed;
inset:0;
background:rgba(0,0,0,.85);
display:flex;
justify-content:center;
align-items:center;
z-index:99999;
`;

lightbox.innerHTML =

`
<div style="
background:#111;
padding:40px;
border-radius:25px;
max-width:500px;
text-align:center;
">

<h1>${title}</h1>

<p style="margin-top:20px;">
Gallery Preview
</p>

<button id="closeLightbox"
style="
margin-top:25px;
padding:12px 20px;
border:none;
border-radius:12px;
cursor:pointer;
">
Close
</button>

</div>
`;

document.body.appendChild(
lightbox
);

document
.getElementById(
"closeLightbox"
)
.onclick = ()=>{

lightbox.remove();

};

});

});

/* ========= PAGE FADE TRANSITION ========= */

function smoothSwitch(pageId){

const current =
document.querySelector(
".page.active"
);

if(current){

current.style.opacity = 0;

setTimeout(()=>{

showPage(pageId);

},250);

}else{

showPage(pageId);

}

}

/* ========= LUMINA ADVANCED ========= */

function getLuminaReply(text){

text = text.toLowerCase();

if(text.includes("home"))
return "The Home page shows class statistics and quick access.";

if(text.includes("teacher"))
return "Teachers Appreciation honors all educators who guided Class 12D.";

if(text.includes("class teacher"))
return "Class Teachers have their own dedicated premium section.";

if(text.includes("hall"))
return "Hall of Legacy stores achievements and milestones.";

if(text.includes("gallery"))
return "Gallery contains memorable moments from school.";

if(text.includes("member"))
return "Members Database contains classmates and future careers.";

if(text.includes("reunion"))
return "Reunion Hub contains the countdown and event information.";

if(text.includes("theme"))
return "You can switch between Cyber Blue and Cyber Gold.";

return "Lumina AI is evolving. More capabilities coming soon.";
}

/* Upgrade Lumina */

function sendLuminaMessage(){

const input =
document.querySelector(
".chat-input input"
);

const area =
document.querySelector(
".chat-area"
);

if(!input.value.trim())
return;

const text =
input.value;

const userDiv =
document.createElement(
"div"
);

userDiv.className =
"user-message";

userDiv.style.cssText =

`
margin-left:auto;
background:rgba(255,215,0,.15);
padding:15px;
border-radius:18px;
max-width:75%;
margin-bottom:15px;
`;

userDiv.innerHTML = text;

area.appendChild(userDiv);

input.value = "";

setTimeout(()=>{

const ai =
document.createElement(
"div"
);

ai.className =
"ai-message";

ai.innerHTML =
getLuminaReply(text);

area.appendChild(ai);

area.scrollTop =
area.scrollHeight;

},600);

}

/* ========= KEYBOARD CHAT ========= */

const luminaInput =
document.querySelector(
".chat-input input"
);

if(luminaInput){

luminaInput.addEventListener(
"keypress",
(e)=>{

if(e.key === "Enter"){

sendLuminaMessage();

}

});

}

/* ========= ACHIEVEMENT SYSTEM ========= */

let achievements = 0;

function unlockAchievement(name){

achievements++;

showNotification(
"🏆 Achievement Unlocked: " + name
);

}

setTimeout(()=>{

unlockAchievement(
"Entered Legacy Nexus"
);

},5000);

/* ========= AUTO SAVE SETTINGS ========= */

const themeSelect =
document.getElementById(
"themeSelect"
);

if(themeSelect){

themeSelect.addEventListener(
"change",
()=>{

localStorage.setItem(
"12dThemeChoice",
themeSelect.value
);

});

themeSelect.value =
localStorage.getItem(
"12dThemeChoice"
) || "Cyber Blue";

}

/* ========= SYSTEM READY ========= */

console.log(
"12D Legacy Nexus Heaven Edition Loaded Successfully"
);


/* =========================
   MESSAGE WALL SYSTEM
========================= */

let messages =
JSON.parse(localStorage.getItem("12dMessages")) || [];

function timeAgo(date){

const now = new Date();
const diff = Math.floor((now - new Date(date)) / 1000);

if(diff < 60) return "Just now";
if(diff < 3600) return Math.floor(diff/60) + " min ago";
if(diff < 86400) return Math.floor(diff/3600) + " hr ago";

return Math.floor(diff/86400) + " days ago";

}

function renderMessages(){

const feed =
document.getElementById("messagesFeed");

if(!feed) return;

feed.innerHTML = "";

messages.forEach((msg,index)=>{

const div =
document.createElement("div");

div.className = "message-card";

div.innerHTML = `
<h3>${msg.name}</h3>
<p>${msg.text}</p>

<div class="msg-footer">

<span>${timeAgo(msg.time)}</span>

<button onclick="deleteMessage(${index})">
🗑
</button>

</div>
`;

feed.appendChild(div);

});

localStorage.setItem(
"12dMessages",
JSON.stringify(messages)
);

}

function addMessage(){

const input =
document.getElementById("messageInput");

if(!input.value.trim()) return;

messages.unshift({

name:"Anonymous",

text:input.value,

time:new Date()

});

input.value = "";

renderMessages();

}

function deleteMessage(index){

messages.splice(index,1);

renderMessages();

}

/* EVENT LISTENER */

document.addEventListener("DOMContentLoaded",()=>{

const btn =
document.getElementById("postMessageBtn");

if(btn){

btn.addEventListener("click",addMessage);

}

renderMessages();

});