(function () {
  'use strict';

  /* -------------------------------------------------------
     1. Countdown Timers
     ------------------------------------------------------- */
  var timers = document.querySelectorAll('[data-auction-timer]');
  if (!timers.length) return;

  function setCountdown(el, value) {
    el.style.setProperty('--value', value);
    el.setAttribute('aria-label', value);
  }

  function updateTimer(el) {
    var end = new Date(el.getAttribute('data-end')).getTime();
    var now = Date.now();
    var diff = end - now;

    var daysEl    = el.querySelector('[data-timer-days]');
    var hoursEl   = el.querySelector('[data-timer-hours]');
    var minutesEl = el.querySelector('[data-timer-minutes]');
    var secondsEl = el.querySelector('[data-timer-seconds]');

    if (diff <= 0) {
      if (daysEl)    setCountdown(daysEl, 0);
      if (hoursEl)   setCountdown(hoursEl, 0);
      if (minutesEl) setCountdown(minutesEl, 0);
      if (secondsEl) setCountdown(secondsEl, 0);
      return false; // expired
    }

    var days    = Math.floor(diff / 86400000);
    var hours   = Math.floor((diff % 86400000) / 3600000);
    var minutes = Math.floor((diff % 3600000) / 60000);
    var seconds = Math.floor((diff % 60000) / 1000);

    if (daysEl)    setCountdown(daysEl, days);
    if (hoursEl)   setCountdown(hoursEl, hours);
    if (minutesEl) setCountdown(minutesEl, minutes);
    if (secondsEl) setCountdown(secondsEl, seconds);

    return true; // still active
  }

  // Initial update
  timers.forEach(function (el) { updateTimer(el); });

  // Tick every second (respect reduced motion — still update, just no flash)
  setInterval(function () {
    timers.forEach(function (el) { updateTimer(el); });
  }, 1000);

  /* -------------------------------------------------------
     2. Bid Modal
     ------------------------------------------------------- */
  var modal      = document.getElementById('bidModal');
  var bidBtns    = document.querySelectorAll('[data-bid-btn]');
  var closeBtn   = modal ? modal.querySelector('[data-bid-modal-close]') : null;
  var bidForm    = modal ? modal.querySelector('[data-bid-form]') : null;

  if (!modal) return;

  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    var input = modal.querySelector('[data-bid-amount]');
    if (input) input.focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  bidBtns.forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Bid form submit
  if (bidForm) {
    bidForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var amountInput = bidForm.querySelector('[data-bid-amount]');
      var amount = amountInput ? parseInt(amountInput.value, 10) : 0;

      if (amount < 13000000) {
        amountInput.focus();
        return;
      }

      // Format as Rp
      var formatted = 'Rp ' + amount.toLocaleString('id-ID');

      // Update highest bid display
      var highestEl = document.querySelector('[data-highest-bid="featured"]');
      if (highestEl) highestEl.textContent = formatted;

      // Add to bid history
      var historyTable = document.querySelector('[data-bid-history="featured"]');
      if (historyTable) {
        var row = document.createElement('tr');
        row.className = 'border-t border-cocoa-900/8';
        row.innerHTML =
          '<td class="px-6 py-4"><span class="inline-flex items-center gap-2">' +
          '<span class="flex h-8 w-8 items-center justify-center rounded-full bg-clay-50 text-xs font-semibold text-clay-700">AN</span>' +
          '<span class="font-medium text-cocoa-900">Anda</span></span></td>' +
          '<td class="px-6 py-4 font-semibold text-clay-600">' + formatted + '</td>' +
          '<td class="px-6 py-4 text-muted">Baru saja</td>';
        historyTable.insertBefore(row, historyTable.firstChild);
      }

      closeModal();
    });
  }

})();
