const STORAGE_KEY = "puncturepro_demo_referrals_v1";
const $ = (id) => document.getElementById(id);

function getReferrals() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function saveReferrals(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}
function render() {
  const items = getReferrals();
  const verified = items.filter(item => item.status === "Verified").length;
  $("totalCount").textContent = items.length;
  $("verifiedCount").textContent = verified;
  $("pendingCount").textContent = items.length - verified;
  const tbody = $("referralRows");
  if (!items.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty">No referrals yet. Add one to try the demo.</td></tr>';
    return;
  }
  tbody.innerHTML = items.slice().reverse().map(item => `
    <tr>
      <td>${escapeHTML(item.name)}<br><small>${escapeHTML(item.code)}</small></td>
      <td>${escapeHTML(item.service)}</td>
      <td><span class="status ${item.status === "Verified" ? "verified" : ""}">${item.status}</span></td>
      <td>${item.status === "Pending" ? `<button class="action-btn" data-verify="${item.id}">Verify visit</button>` : "✓ Done"}</td>
    </tr>`).join("");
}
$("referralForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("customerName").value.trim();
  const phone = $("phone").value.trim();
  const service = $("service").value;
  const code = $("refCode").value.trim().toUpperCase();
  if (!name || !code) return;
  const items = getReferrals();
  items.push({
    id: (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
    name, phone, service, code, status: "Pending", createdAt: new Date().toISOString()
  });
  saveReferrals(items);
  event.target.reset();
  $("refCode").value = "RAVI25";
  render();
});
$("referralRows").addEventListener("click", (event) => {
  const id = event.target.dataset.verify;
  if (!id) return;
  const items = getReferrals().map(item => item.id === id ? {...item, status: "Verified"} : item);
  saveReferrals(items);
  render();
});
$("clearData").addEventListener("click", () => {
  if (confirm("Clear all demo referrals stored in this browser?")) {
    localStorage.removeItem(STORAGE_KEY);
    render();
  }
});
$("copyCode").addEventListener("click", async () => {
  const message = $("copyMessage");
  try {
    await navigator.clipboard.writeText("RAVI25");
    message.textContent = "Referral code copied: RAVI25";
  } catch {
    message.textContent = "Your demo referral code is RAVI25";
  }
});
document.querySelectorAll(".shareOffer").forEach(button => {
  button.addEventListener("click", async () => {
    const text = button.dataset.offer;
    const message = $("shareMessage");
    try {
      if (navigator.share) {
        await navigator.share({title: "PuncturePro sample offer", text});
        message.textContent = "Share sheet opened.";
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        message.textContent = "Sample offer copied. You can paste it into WhatsApp.";
      } else {
        message.textContent = text;
      }
    } catch (error) {
      if (error.name !== "AbortError") message.textContent = "Sample offer: " + text;
    }
  });
});
$("year").textContent = new Date().getFullYear();
render();
