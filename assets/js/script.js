const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text"),
  temperatureDiv = body.querySelector(".temperature"),
  humidityDiv = body.querySelector(".humidity"),
  luxDiv = body.querySelector(".lux");
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

// Creating an EventListener that toggles the dark mode class 
// in order to swicth from light mode to dark mode or vice versa
// whenever the button is clicked
modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";
  }
});

let last_data, time, powerValues;
function updateData() {
  fetch("http://localhost:5000/db-data")
    .then((res) => res.json())
    .then((data) => (last_data = data));
  temperatureDiv.innerHTML = last_data.reading.temperature + "°";
  humidityDiv.innerHTML = last_data.reading.humidity + "%";
  luxDiv.innerHTML = last_data.reading.lux + "lx";
  time = last_data.time;
  powerValues = last_data.reading.voltage * last_data.reading.current;
  console.log(powerValues, time);
}
// Calling the function readData() to update website data every 5 seconds
setInterval(updateData, 1000);

// changing the charts mode to match the selected theme
function selectTheme(chart) {
  modeSwitch.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      chart.setChartAttribute("theme", "candy");
    } else {
      chart.setChartAttribute("theme", "fusion");
    }
  });
}

FusionCharts.ready(function () {
  var powerChart = new FusionCharts({
    id: "powerRealTimeChart",
    type: "realtimeline",
    renderAt: "power-plot",
    width: "43%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: { caption: "Real-time Power monitor",
        subCaption: "mWh",
        xAxisName: "Time",
        yAxisName: "mWh",
        numberPrefix: "",
        refreshinterval: "5",
        yaxisminvalue: "12000",
        yaxismaxvalue: "13000",
        numdisplaysets: "30",
        labeldisplay: "rotate",
        showRealTimeValue: "0",
        theme: "fusion", },
      categories: [{ category: [{ label: "Day Start" }], },],
      dataset: [ { data: [ {value: "12000",}, ], }, ], },
    events: { initialized: function (e) {
      function updateData() {
        // Get reference to the chart using its ID
        var chartRef = FusionCharts("powerRealTimeChart"),
          // We need to create a querystring format incremental update, containing
          // label in hh:mm:ss format
          label = time,
          theValues = powerValues,
          // Build Data String in format &label=...&value=...
          strData = "&label=" + label + "&value=" + theValues;
        // Feed it to chart.
        chartRef.feedData(strData); }
      var myVar = setInterval(function () { updateData(); }, 10000); },
    }, }).render();

  var voltageChart = new FusionCharts({
    id: "voltageRealTimeChart",
    type: "realtimeline",
    renderAt: "voltage-plot",
    width: "43%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Real-time Voltage monitor",
        subCaption: "mV",
        xAxisName: "Time",
        yAxisName: "mV",
        numberPrefix: "",
        refreshinterval: "5",
        yaxisminvalue: "1800",
        yaxismaxvalue: "2000",
        numdisplaysets: "30",
        labeldisplay: "rotate",
        showRealTimeValue: "0",
        theme: "fusion",
      },
      categories: [
        {
          category: [
            {
              label: "Day Start",
            },
          ],
        },
      ],
      dataset: [
        {
          data: [
            {
              value: "1800",
            },
          ],
        },
      ],
    },
    events: {
      initialized: function (e) {

        function updateData() {
          // Get reference to the chart using its ID
          var chartRef = FusionCharts("voltageRealTimeChart"),
            // We need to create a querystring format incremental update, containing
            // label in hh:mm:ss format
            currDate = new Date(),
            label = time,
            theValues = last_data.reading.voltage,
            // Build Data String in format &label=...&value=...
            strData = "&label=" + label + "&value=" + theValues;
          // Feed it to chart.
          chartRef.feedData(strData);
        }

        var myVar = setInterval(function () {
          updateData();
        }, 10000);
      },
    },
  }).render();

  var currentChart = new FusionCharts({
    id: "currentRealTimeChart",
    type: "realtimeline",
    renderAt: "current-plot",
    width: "43%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Real-time Current monitor",
        subCaption: "mA",
        xAxisName: "Time",
        yAxisName: "mA",
        numberPrefix: "",
        refreshinterval: "5",
        yaxisminvalue: "5",
        yaxismaxvalue: "10",
        numdisplaysets: "30",
        labeldisplay: "rotate",
        showRealTimeValue: "0",
        theme: "fusion",
      },
      categories: [
        {
          category: [
            {
              label: "Day Start",
            },
          ],
        },
      ],
      dataset: [
        {
          data: [
            {
              value: "5",
            },
          ],
        },
      ],
    },
    events: {
      initialized: function (e) {

        function updateData() {
          // Get reference to the chart using its ID
          var chartRef = FusionCharts("currentRealTimeChart"),
            // We need to create a querystring format incremental update, containing
            // label in hh:mm:ss format
            currDate = new Date(),
            label = time,
            theValues = last_data.reading.current,
            // Build Data String in format &label=...&value=...
            strData = "&label=" + label + "&value=" + theValues;
          // Feed it to chart.
          chartRef.feedData(strData);
        }

        var myVar = setInterval(function () {
          updateData();
        }, 10000);
      },
    },
  }).render();
  selectTheme(powerChart);
  selectTheme(voltageChart);
  selectTheme(currentChart);
});

