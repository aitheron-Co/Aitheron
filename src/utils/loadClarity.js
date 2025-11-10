// src/utils/loadClarity.js
export function loadClarityOnce(projectId) {
  if (document.getElementById("clarity-script")) return;
  const s = document.createElement("script");
  s.id = "clarity-script";
  s.type = "text/javascript";
  s.async = true;
  s.src = "https://www.clarity.ms/tag/" + projectId;
  document.head.appendChild(s);
}

