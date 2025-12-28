(() => {
      const bar = document.getElementById("bar");
      const scanBtn = document.getElementById("scanBtn");
      const shareBtn = document.getElementById("shareBtn");
      const readout = document.getElementById("readout");

      const statusText = document.getElementById("statusText");
      const statusDot = document.getElementById("statusDot");

      const smartPct = document.getElementById("smartPct");
      const confidence = document.getElementById("confidence");
      const errCode = document.getElementById("errCode");
      const rec = document.getElementById("rec");

async function loadFAQ() {
  const faqList = document.getElementById("faqList");
  if (!faqList) return;

  // Clear any existing content
  faqList.textContent = "";

  try {
    const res = await fetch("content/faq.json", { cache: "no-store" });
    if (!res.ok) throw new Error("FAQ fetch failed: " + res.status);
    const data = await res.json();

    if (!data || !Array.isArray(data.items)) throw new Error("FAQ JSON invalid");

    for (const item of data.items) {
      const details = document.createElement("details");
      if (item.open) details.open = true;

      const summary = document.createElement("summary");
      summary.textContent = String(item.q ?? "");
      details.appendChild(summary);

      const p = document.createElement("p");
      // Safe multiline rendering (no innerHTML)
      const text = String(item.a ?? "");
      const lines = text.split("\n");
      lines.forEach((line, idx) => {
        p.appendChild(document.createTextNode(line));
        if (idx !== lines.length - 1) p.appendChild(document.createElement("br"));
      });

      details.appendChild(p);
      faqList.appendChild(details);
    }
  } catch (err) {
    const details = document.createElement("details");
    details.open = true;

    const summary = document.createElement("summary");
    summary.textContent = "FAQ failed to load (very on-brand)";
    details.appendChild(summary);

    const p = document.createElement("p");
    p.textContent = "If you’re viewing this as a local file, open it via a local server. On GitHub Pages it’ll work fine.";
    details.appendChild(p);

    faqList.appendChild(details);
  }
}

      const errorCodes = [
        "SMART_NOT_FOUND",
        "SMART_MISSING_DEPENDENCY: common_sense",
        "SMART_TIMEOUT: brain_buffering",
        "SMART_UNSUPPORTED_ON_THIS_DEVICE: human",
        "SMART_OVERHEATED: too_many_thoughts",
        "SMART_PERMISSION_DENIED: ego_read_only"
      ];

      const recs = [
        "Hydrate, read 1 page, try again.",
        "Ask a friend one question. Any question.",
        "Take a nap. Reboot the brain.",
        "Touch grass (optional). Retry scan.",
        "Stop guessing. Look it up. Retry scan.",
        "Do one responsible thing. Anything."
      ];

      function nowStamp() {
        const d = new Date();
        return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      }

      function setStatus(mode) {
        if (mode === "scanning") {
          statusText.textContent = "Scanning for smart…";
          statusDot.classList.remove("bad");
        } else if (mode === "failed") {
          statusText.textContent = "No smart detected (shocking)";
          statusDot.classList.add("bad");
        } else {
          statusText.textContent = "Ready to scan for smart";
          statusDot.classList.remove("bad");
        }
      }

      function append(line) {
        readout.innerHTML += "<br/>" + line;
        readout.scrollTop = readout.scrollHeight;
      }

      function randPick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }

      async function runScan() {
        scanBtn.disabled = true;
        setStatus("scanning");
        bar.value = 0;

        // Always fail, but make it feel *dramatic*.
        const steps = [
          "booting sensor array…",
          "warming up the Smart-O-Meter™…",
          "calibrating against a golden retriever…",
          "checking local vibes…",
          "sampling brainwaves (respectfully)…",
          "running advanced algorithms (two hamsters)…"
        ];

        readout.innerHTML = "$ smart-detector --scan<br/><span style='opacity:.8'>starting…</span>";
        append(`[${nowStamp()}] ${steps[0]}`);

        for (let i = 1; i <= 100; i++) {
          bar.value = i;

          if (i % 18 === 0) append(`[${nowStamp()}] ${randPick(steps)}`);
          if (i === 63) append(`[${nowStamp()}] warning: smart signal extremely faint (could be a breadcrumb)`);
          if (i === 88) append(`[${nowStamp()}] re-checking… (we don’t trust ourselves either)`);

          // small jitter so it feels alive
          await new Promise(r => setTimeout(r, 10 + Math.random() * 22));
        }

        const code = randPick(errorCodes);
        const recommendation = randPick(recs);

        // The punchline: always zero.
        smartPct.textContent = "0%";
        confidence.textContent = "100% (unreasonably)";
        errCode.textContent = code;
        rec.textContent = recommendation;

        append(`[${nowStamp()}] scan complete.`);
        append(`<strong style="color: var(--bad)">ERROR:</strong> ${code}`);
        append(`smart detected: <strong>0%</strong>`);

        setStatus("failed");
        scanBtn.disabled = false;
      }

      async function copyLink() {
        try {
          await navigator.clipboard.writeText(location.href);
          shareBtn.textContent = "Link copied ✔";
          setTimeout(() => (shareBtn.textContent = "Share this test"), 1200);
        } catch {
          alert("Could not copy link. (Very on-brand.)");
        }
      }

      scanBtn.addEventListener("click", runScan);
      shareBtn.addEventListener("click", copyLink);

      window.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "r") runScan();
      });

      loadFAQ();

      // Auto-run once for immediate comedy.
      runScan();
    })();
