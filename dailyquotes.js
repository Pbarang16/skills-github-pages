(function() {
  const container = document.createElement("div");
  container.id = "daily-quote";
  container.style = `
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background: #fffbe6;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: Arial, sans-serif;
    text-align: center;
  `;

  const arab = document.createElement("p");
  arab.style = "font-size: 24px; direction: rtl; color: #222;";
  container.appendChild(arab);

  const latin = document.createElement("p");
  latin.style = "font-size: 14px; font-style: italic; color: #444;";
  container.appendChild(latin);

  const indo = document.createElement("p");
  indo.style = "font-size: 14px; color: #555;";
  container.appendChild(indo);

  const surah = document.createElement("p");
  surah.style = "font-size: 12px; color: #777;";
  container.appendChild(surah);

  document.currentScript.parentNode.insertBefore(container, document.currentScript);

  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const ayatId = (dayOfYear % 6236) + 1;

  fetch(`https://api.quran.gading.dev/ayah/${ayatId}`)
    .then(response => response.json())
    .then(result => {
      const ayat = result.data;
      arab.textContent = ayat.text.arab;
      latin.textContent = ayat.text.transliteration.en;
      indo.textContent = ayat.translation.id;
      surah.textContent = `${ayat.surah.name.transliteration.id} - Ayat ${ayat.number.inSurah}`;
    })
    .catch(err => {
      arab.textContent = "Gagal memuat ayat.";
    });
})();

