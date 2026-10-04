(function () {
  "use strict";

  /* Show where a contact pin goes while it is hovered or focused */
  var readout = document.getElementById("readout");
  var idle = readout.innerHTML;

  document.querySelectorAll("a.pin").forEach(function (pin) {
    var show = function () { readout.textContent = pin.getAttribute("data-readout"); };
    var reset = function () { readout.innerHTML = idle; };
    pin.addEventListener("mouseenter", show);
    pin.addEventListener("focus", show);
    pin.addEventListener("mouseleave", reset);
    pin.addEventListener("blur", reset);
  });

  /* Light up each section's node on the trace the first time it scrolls into view */
  var sections = document.querySelectorAll(".section");
  if ("IntersectionObserver" in window) {
    var watcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("live");
          watcher.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -35% 0px" });
    sections.forEach(function (s) { watcher.observe(s); });
  } else {
    sections.forEach(function (s) { s.classList.add("live"); });
  }

  /* Copy email */
  var button = document.getElementById("copy-email");
  var status = document.getElementById("copy-status");
  var email = "evanjames2221@gmail.com";
  var timer;

  function say(message) {
    status.textContent = message;
    clearTimeout(timer);
    timer = setTimeout(function () { status.textContent = ""; }, 3000);
  }

  button.addEventListener("click", function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        function () { say("Email copied."); },
        function () { say("Could not copy. Email me at " + email); }
      );
    } else {
      say("Email me at " + email);
    }
  });
})();
