let chart;
const tariff = 210; // price per kWh in naira approx.
const appliances = [];
function showAppliances() {
  const list = document.getElementById("appliance-list");
  list.innerHTML = "";

  let totalKwh = 0;

  appliances.forEach(function (item) {
    const kwhPerDay = (item.watts * item.hours) / 1000;
    totalKwh += kwhPerDay;

    const li = document.createElement("li");
    li.textContent = item.name + ": " + kwhPerDay.toFixed(2) + " kWh/day";
    list.appendChild(li);
  });

  const monthlyKwh = totalKwh * 30;
  const monthlyCost = monthlyKwh * tariff;

  document.getElementById("totals").innerHTML =
    "<p>Total per day: " + totalKwh.toFixed(2) + " kWh</p>" +
    "<p>Total per month: " + monthlyKwh.toFixed(2) + " kWh</p>" +
    "<p>Estimated monthly cost: ₦" + monthlyCost.toFixed(2) + "</p>";

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: appliances.map(function (a) { return a.name; }),
      datasets: [{
        label: "kWh per day",
        data: appliances.map(function (a) { return (a.watts * a.hours) / 1000; })
      }]
    }
  });
}
const form = document.getElementById("appliance-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const watts = Number(document.getElementById("watts").value);
  const hours = Number(document.getElementById("hours").value);

  appliances.push({ name, watts, hours });
showAppliances();
  console.log(appliances);
  form.reset();

});
