/*************** Data and initialization ***************/
    // Default countdown date (you can change this)
    // Default: August 21, 2025 17:00 local time
    const countdownTarget = new Date("2025-08-21T17:00:00");

    // Sample events - you can modify or extend
    const events = [
      {title:"Ganesh Idol Pran Pratishtha", date:"27-08-2025", time:"06:30 AM", venue:"Mandali Ground", desc:"Pran Pratishtha & Shobha Yatra"},
      {title:"Daily Morning Aarti", date:"28-08-2025", time:"07:30 AM", venue:"Pandal", desc:"Morning Aarti and bhajans"},
      {title:"Cultural Night - Dance & Music", date:"29-08-2025", time:"07:00 PM", venue:"Stage Area", desc:"Youth performances & competitions"},
      {title:"Prasad Distribution & Community Lunch", date:"30-08-2025", time:"01:00 PM", venue:"at chaudeshwari temple", desc:"Community prasadam"},
      {title:"Maha Aarti ", date:"30-08-2025", time:"05:00 PM", venue:"Riverfront", desc:"Maha Aarti procession"}
    ];

    const schedule = [
      {day:"Day 1", program:"Pran Pratishtha, Aarti", time:"6:00 AM - 9:00 AM"},
      {day:"Day 2", program:"Children's Fancy Dress & Dance", time:"4:00 PM - 7:00 PM"},
      {day:"Day 3", program:"Classical Music Eveeing", time:"6:30 PM - 9:30 PM"},
      {day:"Day 4", program:"Community Service & Prasad", time:"10:00 AM - 12:00 PM"},
      {day:"Day 5", program:"Maha Aarti ", time:"3:00 PM onwards"}
    ];

    /*************** Populate Events & Schedule ***************/
    function populateEvents(){
      const grid = document.querySelector(".events-grid");
      grid.innerHTML = "";
      events.forEach((e, idx) => {
        const el = document.createElement("div");
        el.className = "event";
        el.innerHTML = `
          <h4>${escapeHtml(e.title)}</h4>
          <div class="meta">${escapeHtml(e.date)} · ${escapeHtml(e.time)}</div>
          <div class="muted small">${escapeHtml(e.venue)}</div>
          <p style="margin-top:8px">${escapeHtml(e.desc)}</p>
          <div style="display:flex; gap:8px; margin-top:8px">
            <button class="btn small" onclick="registerEvent(${idx})">Register</button>
            <button class="btn small" style="background:#eee; color:#b84b00" onclick="addToCalendar('${escapeHtml(e.title)}','${escapeHtml(e.date)} ${escapeHtml(e.time)}','${escapeHtml(e.venue)}')">Add to Calendar</button>
          </div>
        `;
        grid.appendChild(el);
      });
    }

    function populateSchedule(){
      const tbody = document.getElementById("scheduleTable");
      tbody.innerHTML = "";
      schedule.forEach(s => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${escapeHtml(s.day)}</td><td>${escapeHtml(s.program)}</td><td>${escapeHtml(s.time)}</td><td>Mandali Hall</td>`;
        tbody.appendChild(tr);
      });
    }

    /*************** Countdown ***************/
    function updateCountdown(){
      const now = new Date();
      let diff = countdownTarget - now;
      if (diff < 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
      }
      const s = Math.floor(diff / 1000);
      const days = Math.floor(s / (24*3600));
      const hours = Math.floor((s % (24*3600)) / 3600);
      const minutes = Math.floor((s % 3600) / 60);
      const seconds = s % 60;
      document.getElementById("days").textContent = pad(days);
      document.getElementById("hours").textContent = pad(hours);
      document.getElementById("minutes").textContent = pad(minutes);
      document.getElementById("seconds").textContent = pad(seconds);
    }
    function pad(n){ return String(n).padStart(2,'0') }

    /*************** Gallery modal ***************/
    function openModal(src){
      const modal = document.getElementById("modal");
      document.getElementById("modalImg").src = src;
      modal.classList.add("open");
    }
    function closeModal(e){
      if (e.target.id === "modal" || e.target.id === "modalImg") {
        document.getElementById("modal").classList.remove("open");
      }
    }

    /*************** Sponsor — editable + local storage ***************/
    function editSponsor(){
      const current = localStorage.getItem("todaySponsor") || document.getElementById("sponsorText").textContent;
      const newName = prompt("Enter today's Aarti sponsor name:", current);
      if (newName !== null) {
        localStorage.setItem("todaySponsor", newName.trim());
        document.getElementById("sponsorText").textContent = newName.trim();
      }
    }
    function copySponsor(){
      const text = document.getElementById("sponsorText").textContent;
      navigator.clipboard?.writeText(text).then(()=>alert("Sponsor copied to clipboard"));
    }
    function loadSponsor(){
      const s = localStorage.getItem("todaySponsor");
      if (s) document.getElementById("sponsorText").textContent = s;
    }

    /*************** Forms (local demo) ***************/
    function registerEvent(idx){
      const e = events[idx];
      alert("Registered for: " + e.title + "\nWe will contact you with details.");
    }
    function registerSponsor(){
      const name = document.getElementById("sponsorName").value.trim();
      const amount = document.getElementById("sponsorAmount").value.trim();
      if(!name || !amount){ document.getElementById("sponsorMsg").textContent = "Please enter name and amount."; return; }
      // In real site: send to backend; here we just add logo placeholder
      const logos = document.getElementById("sponsorLogos");
      const div = document.createElement("div");
      div.style.padding="8px"; div.style.background="#fff"; div.style.borderRadius="8px";
      const img = document.createElement("img");
      img.src = "https://via.placeholder.com/120x48?text="+encodeURIComponent(name);
      img.alt = name;
      div.appendChild(img);
      logos.appendChild(div);
      document.getElementById("sponsorMsg").textContent = "Thanks! Sponsor registered (demo).";
      document.getElementById("sponsorName").value = "";
      document.getElementById("sponsorAmount").value = "";
    }
    function donate(){
      const name = document.getElementById("donorName").value.trim();
      const amt = document.getElementById("donorAmount").value.trim();
      if(!name || !amt) { document.getElementById("donMsg").textContent = "Enter your name and amount."; return; }
      document.getElementById("donMsg").textContent = "Thank you for your donation (demo).";
      document.getElementById("donorName").value=""; document.getElementById("donorAmount").value="";
    }
    function volunteer(){
      const name = document.getElementById("volName").value.trim();
      const phone = document.getElementById("volPhone").value.trim();
      if(!name || !phone) { document.getElementById("volMsg").textContent = "Please enter name and phone."; return; }
      document.getElementById("volMsg").textContent = "Thank you! We'll contact you soon (demo).";
      document.getElementById("volName").value=""; document.getElementById("volPhone").value="";
    }
    function sendMessage(){
      const name = document.getElementById("msgName").value.trim();
      const phone = document.getElementById("msgPhone").value.trim();
      const text = document.getElementById("msgText").value.trim();
      if(!name || !phone || !text){ document.getElementById("msgStatus").textContent = "Please fill all fields."; return; }
      document.getElementById("msgStatus").textContent = "Message sent (demo).";
      document.getElementById("msgName").value=""; document.getElementById("msgPhone").value=""; document.getElementById("msgText").value="";
    }

    /*************** Utilities ***************/
    function escapeHtml(unsafe) {
      return String(unsafe).replace(/[&<"'>]/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#039;"}[m]; });
    }

    function addToCalendar(title, datetime, venue){
      // Simple ICS generation: opens downloaded file
      const start = new Date(datetime).toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";
      const end = new Date(new Date(datetime).getTime()+60*60*1000).toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";
      const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        "DTSTART:"+start,
        "DTEND:"+end,
        "SUMMARY:"+title,
        "LOCATION:"+venue,
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");
      const blob = new Blob([ics], {type:'text/calendar'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'event.ics'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    }

    /*************** Audio controls ***************/
    let audioOn = false;
    function toggleMusic(){
      const audio = document.getElementById("aartiAudio");
      if(!audioOn){
        audio.play().catch(()=>{ alert("Autoplay blocked — click Play in your browser."); });
        audioOn = true;
        eventTargetButton(true);
      } else {
        audio.pause();
        audioOn = false;
        eventTargetButton(false);
      }
    }
    function eventTargetButton(isPlaying){
      // change label of button (simple approach)
      const btns = document.querySelectorAll(".btn");
      // no need to change all; leave as simple experience
    }

    /*************** On load ***************/
    (function init(){
      populateEvents();
      populateSchedule();
      loadSponsor();
      updateCountdown();
      setInterval(updateCountdown, 1000);
    })();