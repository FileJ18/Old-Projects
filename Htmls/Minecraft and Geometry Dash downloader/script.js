const versionSelect = document.getElementById('versionSelect');
const status = document.getElementById('status');

// Load external CSS into the document (optional, only if needed)
fetch('style.css')
  .then(response => response.text())
  .then(css => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  });

// Load version list from Mojang
async function fetchVersions() {
  try {
    const response = await fetch('https://piston-meta.mojang.com/mc/game/version_manifest_v2.json');
    const data = await response.json();
    const versions = data.versions;

    versions.forEach(version => {
      const option = document.createElement('option');
      option.value = version.url;
      option.textContent = version.id;
      versionSelect.appendChild(option);
    });
  } catch (err) {
    status.textContent = "❌ Failed to load versions. Check your internet connection.";
  }
}

// Handle JAR download
async function downloadJar() {
  const versionUrl = versionSelect.value;
  status.textContent = "Fetching version info...";

  try {
    const res = await fetch(versionUrl);
    const data = await res.json();
    const jarUrl = data.downloads.client.url;

    status.innerHTML = `✅ Download ready: <a href="${jarUrl}" target="_blank">Click here</a> (client.jar)`;
  } catch (err) {
    status.textContent = "❌ Failed to fetch JAR URL.";
  }
}

fetchVersions();

// Translations for interface
const translations = {
  en: {
    title: "Minecraft Jar Downloader",
    description: "Select a version and download its client JAR",
    download: "Download JAR",
    credit: "Credit: Microsoft and Mojang. You must have the launcher and Java installed."
  },
  es: {
    title: "Descargador de Jar de Minecraft",
    description: "Selecciona una versión y descarga su archivo JAR",
    download: "Descargar JAR",
    credit: "Crédito: Microsoft y Mojang. Debes tener el lanzador y Java instalados."
  },
  fr: {
    title: "Téléchargeur de Jar Minecraft",
    description: "Sélectionnez une version et téléchargez son JAR client",
    download: "Télécharger le JAR",
    credit: "Crédit : Microsoft et Mojang. Vous devez avoir le lanceur et Java installés."
  },
  ru: {
    title: "Скачивание Jar Minecraft",
    description: "Выберите версию и скачайте её клиентский JAR",
    download: "Скачать JAR",
    credit: "Кредит: Microsoft и Mojang. У вас должен быть лаунчер и установлен Java."
  },
  ja: {
    title: "Minecraft JARダウンローダー",
    description: "バージョンを選んで、JARファイルをダウンロードしてください",
    download: "JARをダウンロード",
    credit: "クレジット: MicrosoftとMojang。ランチャーとJavaが必要です。"
  },
  ko: {
    title: "마인크래프트 JAR 다운로드",
    description: "버전을 선택하고 클라이언트 JAR을 다운로드하세요",
    download: "JAR 다운로드",
    credit: "출처: Microsoft 및 Mojang. 런처와 Java가 설치되어 있어야 합니다."
  }
};

// Apply selected language
document.getElementById("langSelect").addEventListener("change", (e) => {
  const lang = e.target.value;
  const content = translations[lang];

  if (content) {
    document.querySelector("h1").textContent = content.title;
    document.querySelector("p").textContent = content.description;
    document.querySelector("button").textContent = content.download;
    document.querySelector("#footer").childNodes[2].textContent = content.credit;
  }
});
