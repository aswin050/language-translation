async function translateText() {
  const text = document.getElementById("inputText").value;
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;

  if (!text.trim()) {
    alert("Please enter text to translate!");
    return;
  }

  const res = await fetch("/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, sourceLang, targetLang })
  });

  const data = await res.json();

  if (data.translatedText) {
    document.getElementById("translatedText").textContent = data.translatedText;
    document.getElementById("output").classList.remove("hidden");
  } else {
    alert("Translation failed: " + data.error);
  }
}

function copyText() {
  const text = document.getElementById("translatedText").textContent;
  navigator.clipboard.writeText(text);
  alert("Copied!");
}
u
function speakText() {
  const text = document.getElementById("translatedText").textContent;
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}
