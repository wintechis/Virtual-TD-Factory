const OriginalWebsocket = window.WebSocket;
let uuid;
let baseUrl = window.location.href;
if (baseUrl.includes("localhost"))
  baseUrl = baseUrl.replace("localhost", "127.0.0.1");
let scenario = "/playground";
const ProxiedWebSocket = function () {
  const ws = new OriginalWebsocket(...arguments);
  ws.addEventListener("message", function (e) {
    // Only intercept
    if (!uuid && e.data.includes("id=")) {
      uuid = e.data.split("id=")[1];
      baseUrl += uuid;
      appendForm();
    }
  });
  return ws;
};
navigator.clipboard.writeText("osama");

window.WebSocket = ProxiedWebSocket;
function appendForm() {
  document.getElementById("td_container").innerHTML = `
  <select id="scenario" name="scenario" onchange="changeCurrentScenario()">
    <option selected value="/playground">Playground</option>
    <option value="/safety_stop">Safety Stop</option>
    <option value="/assembly_line">AssemblyL ine</option>
  </select>
  <button class="td_button tooltip" value="/mirobot" type="button"><span class="tooltiptext">Link Copied</span><img src="images/mirobot.png"></button>
  <button class="td_button tooltip" value="/ozobot" type="button"><span class="tooltiptext">Link Copied</span><img src="images/ozobot.png"></button>
  <button class="td_button tooltip" value="/signal" type="button"><span class="tooltiptext">Link Copied</span><img src="images/signal.png"></button>
`;
  document.getElementById("scenario");
  document.querySelectorAll(".td_button").forEach((button) =>
    button.addEventListener("click", function (e) {
      navigator.clipboard.writeText(baseUrl + scenario + e.currentTarget.value);
      const span = e.currentTarget.childNodes[0];
      span.classList.toggle("tooltiptext-active");
      setTimeout(() => {
        span.classList.toggle("tooltiptext-active");
      }, 3000);
    })
  );
}
function changeCurrentScenario() {
  scenario = document.getElementById("scenario").value;
}
