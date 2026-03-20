'use strict';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymBnmj9zc0JcQn8AgcnT8b-cnwftEZ0btwJy8POQcXrv7_MPqSpmydfuj7Oy1mpybFvg/exec';

const rsvpForm    = document.getElementById('rsvpForm');
const rsvpSuccess = document.getElementById('rsvpSuccess');
const rsvpSubmit  = document.getElementById('rsvpSubmit');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name      = document.getElementById('rsvpName').value.trim();
    const attending = document.querySelector('input[name="attending"]:checked');
    const guests    = document.getElementById('rsvpCount').value;

    if (!name) {
      document.getElementById('rsvpName').focus();
      return;
    }
    if (!attending) {
      alert('Please select whether you will be attending.');
      return;
    }

    rsvpSubmit.disabled = true;
    rsvpSubmit.textContent = 'Sending…';

    const payload = new FormData();
    payload.append('name',      name);
    payload.append('attending', attending.value);
    payload.append('guests',    guests);
    payload.append('timestamp', new Date().toISOString());

    try {
      await fetch(SCRIPT_URL, { method: 'POST', body: payload });
    } catch (_) { /* fail silently — still show success */ }

    rsvpForm.style.display    = 'none';
    rsvpSuccess.style.display = 'block';
  });
}
