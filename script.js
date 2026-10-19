// All content is rendered from SHOP_CONFIG (js/config.js).
const C = SHOP_CONFIG, $ = s => document.querySelector(s);
const isSet = v => v && !/^ADD/i.test(v);
const digits = v => String(v || "").replace(/\D/g, "");
const numOK = v => isSet(v) && digits(v).length >= 10;
const money = n => "Rs. " + n.toLocaleString("en-PK");
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function pic(src, alt, icon) {
  return src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.outerHTML='<div class=ph>${icon}</div>'">`
             : `<div class="ph" role="img" aria-label="${esc(alt)}">${icon}</div>`;
}

// Menu
$("#menuBtn").onclick = () => { const o = $("#menu").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", o); };
$("#menu").onclick = e => { if (e.target.tagName === "A") $("#menu").classList.remove("open"); };

// Images
if (C.heroImage) $(".hero").style.backgroundImage = `linear-gradient(rgba(18,18,18,.75),rgba(18,18,18,.75)),url('${C.heroImage}')`;
$("#aboutImg").innerHTML = pic(C.aboutImage, "Barbershop interior (replace with shop photo)", "🏪");
$("#ownerImg").innerHTML = pic(C.ownerProfile.photo, "Muhammad Arfan", "💈");
$("#ownerFacts").innerHTML = [["Experience", C.ownerProfile.experience], ["Skills", C.ownerProfile.skills], ["Background", C.ownerProfile.background]]
  .map(([k, v]) => `<dt>${k}</dt><dd>${v ? esc(v) : "<em>To be added by the owner</em>"}</dd>`).join("");

// Services, price table, booking select
$("#serviceList").innerHTML = C.categories.map(cat => `<h3>${esc(cat)}</h3><div class="grid">` +
  C.services.filter(s => s.category === cat).map(s => `<article class="card"><div class="ico">${s.icon}</div><h4>${esc(s.name)}</h4><p>${esc(s.desc)}</p><b class="price">${money(s.price)}</b><button class="btn sm" data-service="${esc(s.name)}">Book This Service</button></article>`).join("") + `</div>`).join("");
$("#priceTable tbody").innerHTML = C.services.map(s => `<tr><td>${esc(s.name)}</td><td>${money(s.price)}</td></tr>`).join("");
$("#fService").innerHTML = `<option value="">Select a service</option>` + C.services.map(s => `<option>${esc(s.name)}</option>`).join("");
$("#fBarber").innerHTML = `<option value="">Select a barber</option>` + C.barbers.map(b => `<option>${esc(b.name)}</option>`).join("");
$("#footServices").innerHTML = C.services.slice(0, 5).map(s => `<a href="#services">${esc(s.name)}</a>`).join("");
document.addEventListener("click", e => {
  const b = e.target.closest("[data-service]"); if (!b) return;
  $("#fService").value = b.dataset.service; $("#booking").scrollIntoView({ behavior: "smooth" }); $("#fName").focus({ preventScroll: true });
});

// Team, gallery, testimonials
$("#teamList").innerHTML = C.barbers.map(b => `<article class="card team"><div class="imgbox sq">${pic(b.photo, b.name, "💈")}</div><h4>${esc(b.name)}</h4><span class="role">${esc(b.role)}</span><p>${esc(b.bio)}</p></article>`).join("");
$("#galleryList").innerHTML = C.gallery.map(g => `<figure tabindex="0">${pic(g.src, g.alt, g.icon)}</figure>`).join("");
$("#testiList").innerHTML = C.testimonials.map(t => `<blockquote class="card"><p>${esc(t.text)}</p><cite>— ${esc(t.author)} <small>(sample placeholder)</small></cite></blockquote>`).join("");

// Lightbox
const lb = $("#lightbox");
$("#galleryList").onclick = e => { const f = e.target.closest("figure"); if (!f) return; $("#lbContent").innerHTML = f.innerHTML; lb.hidden = false; };
lb.onclick = e => { if (e.target === lb || e.target.tagName === "BUTTON") lb.hidden = true; };
document.addEventListener("keydown", e => { if (e.key === "Escape") lb.hidden = true; });

// Contact
const rows = [["📍", "Address", C.address], ["📞", "Phone", C.phone], ["💬", "WhatsApp", C.whatsapp], ["🕒", "Opening hours", C.openingHours]];
$("#contactList").innerHTML = rows.map(([i, k, v]) => `<div class="card"><div class="ico">${i}</div><h4>${k}</h4><p>${isSet(v) ? esc(v) : "<em>Not added yet</em>"}</p></div>`).join("");
const call = numOK(C.phone) ? `<a class="btn" href="tel:${esc(C.phone.replace(/[^\d+]/g, ""))}">Call Now</a>` : `<span class="btn off" title="Add phone number in config.js">Call Now</span>`;
const wa = numOK(C.whatsapp) ? `<a class="btn ghost-d" target="_blank" rel="noopener" href="https://wa.me/${digits(C.whatsapp)}">WhatsApp Us</a>` : `<span class="btn off" title="Add WhatsApp number in config.js">WhatsApp Us</span>`;
$("#contactBtns").innerHTML = call + " " + wa;
$("#map").innerHTML = C.mapEmbedUrl ? `<iframe src="${esc(C.mapEmbedUrl)}" loading="lazy" title="Shop location map"></iframe>` : `<div class="ph">🗺️ Map placeholder — add mapEmbedUrl in config.js</div>`;
const soc = Object.entries(C.social).filter(([, u]) => u).map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${k}</a>`).join("") || "<small>Social links: add in config.js</small>";
$("#footContact").innerHTML = `<p>${isSet(C.phone) ? esc(C.phone) : "Phone: to be added"}</p><p>${isSet(C.address) ? esc(C.address) : "Address: to be added"}</p>${soc}`;
$("#year").textContent = new Date().getFullYear();

// Booking
const f = id => $("#" + id), today = new Date(); today.setHours(0, 0, 0, 0);
const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
f("fDate").min = iso(today);
function validate() {
  const msg = {
    fName: !f("fName").value.trim() && "Please enter your name.",
    fPhone: digits(f("fPhone").value).length < 10 && "Enter a valid phone number (at least 10 digits).",
    fService: !f("fService").value && "Please select a service.",
    fBarber: !f("fBarber").value && "Please select a barber.",
    fDate: (!f("fDate").value && "Please choose a date.") || (f("fDate").value < iso(today) && "Past dates cannot be selected."),
    fTime: !f("fTime").value && "Please choose a time."
  };
  let ok = true;
  for (const id in msg) { f(id).parentElement.querySelector(".err").textContent = msg[id] || ""; if (msg[id]) ok = false; }
  return ok;
}
$("#bookForm").onsubmit = e => {
  e.preventDefault(); if (!validate()) return;
  const svc = C.services.find(s => s.name === f("fService").value);
  const text = `Hello ${C.name}, I would like to request an appointment.\nName: ${f("fName").value.trim()}\nPhone: ${f("fPhone").value.trim()}\nService: ${svc.name} (${money(svc.price)})\nBarber: ${f("fBarber").value}\nDate: ${f("fDate").value}\nTime: ${f("fTime").value}\nNotes: ${f("fNotes").value.trim() || "None"}`;
  const link = numOK(C.whatsapp) ? `<a class="btn" target="_blank" rel="noopener" href="https://wa.me/${digits(C.whatsapp)}?text=${encodeURIComponent(text)}">Send via WhatsApp</a>`
    : `<p class="warn">The shop owner must add a valid WhatsApp number in js/config.js before WhatsApp booking can work.</p>`;
  $("#review").innerHTML = `<h3>Review your request</h3><pre>${esc(text)}</pre><p class="note">This is only a request. It is not saved or confirmed until the shop replies.</p>${link} <button class="btn ghost-d" id="editBtn">Edit</button>`;
  $("#review").hidden = false; $("#review").scrollIntoView({ behavior: "smooth", block: "center" });
  $("#editBtn").onclick = () => { $("#review").hidden = true; };
};
