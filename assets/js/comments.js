/* Comments for the devlog, stored in Cloud Firestore through its public web API.
   Names are optional; a comment without one shows as "Anonymous".
   Everything is shown as plain text, so links and HTML in comments do nothing. */
(function () {
  "use strict";
  var box = document.getElementById("comments");
  if (!box || !window.fetch) return;

  var project = box.getAttribute("data-project");
  var key = box.getAttribute("data-key") || "";
  // One thread per post, named after the post's address: /devlog/2026/10/my-post/ -> devlog-2026-10-my-post
  var thread = (box.getAttribute("data-thread") || location.pathname)
    .replace(/^\/+|\/+$/g, "").replace(/[^A-Za-z0-9_-]+/g, "-") || "home";
  var dbPath = "projects/" + encodeURIComponent(project) + "/databases/(default)/documents";
  var api = "https://firestore.googleapis.com/v1/";
  var keyParam = key ? "key=" + encodeURIComponent(key) : "";
  var listEl = box.querySelector(".comment-list");
  var countEl = box.querySelector(".comments-count");
  var form = box.querySelector(".comment-form");
  var msg = box.querySelector(".cf-msg");
  var nameIn = form.querySelector("#cf-name");
  var textIn = form.querySelector("#cf-text");
  var trap = form.querySelector("#cf-site");
  var sendBtn = form.querySelector(".cf-send");
  var openedAt = Date.now();
  var shown = 0;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var savedName = store("comment-name");
  if (savedName) nameIn.value = savedName;

  function url(path, extra) {
    var q = [extra, keyParam].filter(Boolean).join("&");
    return api + path + (q ? "?" + q : "");
  }
  function say(text, kind) { msg.textContent = text; msg.className = "cf-msg" + (kind ? " " + kind : ""); }
  function fmt(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) +
      ", " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }
  function setCount() { countEl.textContent = shown ? "(" + shown + ")" : ""; }
  function note(text) {
    listEl.innerHTML = "";
    var li = document.createElement("li");
    li.className = "comment-note";
    li.textContent = text;
    listEl.appendChild(li);
  }
  function add(name, text, created) {
    if (!shown) listEl.innerHTML = "";
    var li = document.createElement("li");
    li.className = "comment";
    var meta = document.createElement("div");
    meta.className = "comment-meta";
    var who = document.createElement("strong");
    who.textContent = (name || "").trim() || "Anonymous";
    var when = document.createElement("time");
    when.dateTime = created;
    when.textContent = fmt(created);
    meta.appendChild(who); meta.appendChild(when);
    var body = document.createElement("p");
    body.className = "comment-text";
    body.textContent = text;
    li.appendChild(meta); li.appendChild(body);
    listEl.appendChild(li);
    shown++; setCount();
  }
  function val(f, k) { return f && f[k] ? (f[k].stringValue !== undefined ? f[k].stringValue : f[k].timestampValue) : ""; }

  function load() {
    fetch(url(dbPath + "/posts/" + thread + "/comments", "orderBy=created&pageSize=300"))
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) {
        var docs = data.documents || [];
        if (!docs.length) { note("No comments yet. Be the first."); return; }
        listEl.innerHTML = "";
        docs.forEach(function (d) { add(val(d.fields, "name"), val(d.fields, "text"), val(d.fields, "created") || d.createTime); });
      })
      .catch(function () { note("Comments couldn't be loaded right now. Try reloading the page."); });
  }

  function newId() {
    var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", out = "", a = new Uint8Array(20);
    (window.crypto || window.msCrypto).getRandomValues(a);
    for (var i = 0; i < 20; i++) out += c[a[i] % c.length];
    return out;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = nameIn.value.replace(/\s+/g, " ").trim().slice(0, 40);
    var text = textIn.value.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    if (!text) { say("Write a comment first.", "err"); textIn.focus(); return; }
    if (text.length > 2000) { say("Keep it under 2,000 characters.", "err"); return; }
    if (trap.value) { form.reset(); say("Posted.", "ok"); return; }                       // a bot filled the hidden field
    if (Date.now() - openedAt < 3000) { say("Give it a second and try again.", "err"); return; }
    var last = +store("comment-last") || 0;
    if (Date.now() - last < 30000) { say("Please wait a little before posting again.", "err"); return; }

    sendBtn.disabled = true; say("Posting…");
    var docName = dbPath + "/posts/" + thread + "/comments/" + newId();
    fetch(url(dbPath.replace(/\/documents$/, "") + "/documents:commit"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ writes: [{
        update: { name: decodeURIComponent(docName), fields: { name: { stringValue: name }, text: { stringValue: text } } },
        updateTransforms: [{ fieldPath: "created", setToServerValue: "REQUEST_TIME" }],
        currentDocument: { exists: false }
      }] })
    })
      .then(function (r) {
        if (r.ok) return r.json();
        throw new Error(r.status === 403 ? "denied" : "failed");
      })
      .then(function (res) {
        var when = (res.writeResults && res.writeResults[0] && res.writeResults[0].updateTime) || new Date().toISOString();
        add(name, text, when);
        store("comment-last", String(Date.now()));
        if (name) store("comment-name", name);
        textIn.value = "";
        say("Posted.", "ok");
      })
      .catch(function (err) {
        say(err.message === "denied" ? "That comment couldn't be posted. Check that it's under 2,000 characters." :
          "Couldn't reach the comment server. Check your connection and try again.", "err");
      })
      .then(function () { sendBtn.disabled = false; });
  });

  // Load comments when the reader gets near them, not on every page view.
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (en) { return en.isIntersecting; })) { io.disconnect(); load(); }
    }, { rootMargin: "800px 0px" });
    io.observe(box);
  } else { load(); }
})();
