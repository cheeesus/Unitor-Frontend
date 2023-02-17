
const station1 = [
    {
        voltageReading: '50.0',
        currentReading: '2.00',
        frequencyReading: '50'
    }, {
        voltageReading: '70.0',
        currentReading: '2.50',
        frequencyReading: '50'
    } , {
        voltageReading: '44.0',
        currentReading: '3.00',
        frequencyReading: '50'
    }, {
        voltageReading: '40.0',
        currentReading: '10.00',
        frequencyReading: '50'
    }, {
        voltageReading: '80.0',
        currentReading: '4.00',
        frequencyReading: '50'
    }
]
const station2 = [
    {
        voltageReading: '45.0',
        currentReading: '6.00',
        frequencyReading: '50'
    }, {
        voltageReading: '55.0',
        currentReading: '3.00',
        frequencyReading: '50'
    } , {
        voltageReading: '63.0',
        currentReading: '4.60',
        frequencyReading: '50'
    }, {
        voltageReading: '55.0',
        currentReading: '7.00',
        frequencyReading: '50'
    }, {
        voltageReading: '70.0',
        currentReading: '2.78',
        frequencyReading: '50'
    }
]
const station3 = [
    {
        voltageReading: '35.0',
        currentReading: '2.64',
        frequencyReading: '50'
    }, {
        voltageReading: '53.0',
        currentReading: '5.60',
        frequencyReading: '50'
    } , {
        voltageReading: '46.0',
        currentReading: '7.30',
        frequencyReading: '50'
    }, {
        voltageReading: '65.4',
        currentReading: '4.60',
        frequencyReading: '50'
    }, {
        voltageReading: '72.0',
        currentReading: '4.88',
        frequencyReading: '50'
    }
]

const readings = [
    {
        stationNumber: '1',
        voltageReading: '50.0',
        currentReading: '2.00',
        frequencyReading: '50'
    },
    {
        stationNumber: '2',
        voltageReading: '53.2',
        currentReading: '2.58',
        frequencyReading: '50'
    },
    {
        stationNumber: '3',
        voltageReading: '53.6',
        currentReading: '1.98',
        frequencyReading: '50'
    },
    {
        stationNumber: '3',
        voltageReading: '49.8',
        currentReading: '2.34',
        frequencyReading: '50'
    },
    {
        stationNumber: '4',
        voltageReading: '51.3',
        currentReading: '2.07',
        frequencyReading: '50'
    }
]

let powerArray1 = [], powerArray2 = [], powerArray3 = []
/*
database.once('open', function () {
        const stationReadingsCollection = database.db.collection('stationReadings')
        stationReadingsCollection.find({}).toArray(function(err, data){
            powerArray1 = data
        })   
}) */


station1.forEach(value => {
    let power = value.currentReading * value.voltageReading
    power = power.toFixed(2) 
    powerArray1.push(power)
})
station2.forEach(value => {
    let power = value.currentReading * value.voltageReading
    power = power.toFixed(2) 
    powerArray2.push(power)
})
station3.forEach(value => {
    let power = value.currentReading * value.voltageReading
    power = power.toFixed(2) 
    powerArray3.push(power)
})
console.log(powerArray1, powerArray2, powerArray3);

var xValues = [50,100,150,200,250];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      data: powerArray1,
      borderColor: "red",
      fill: false
    },{
      data: powerArray2,
      borderColor: "green",
      fill: false
    },{
      data: powerArray3,
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
})