const express = require('express')
//const stationReadings = require('./../models/production-readings')
const router = express.Router()

const station1 = [
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
router.get('/', (req, res) => {
        res.render('production', { station1 : station1, station2 : station2, station3 : station3})
})   

/*database.once('open', function () {
    router.get('/', (req, res) => {
        const stationReadingsCollection = database.db.collection('stationReadings')
        stationReadingsCollection.find({}).toArray(function(err, data){
            console.log(data) // data printed in console
            res.render('production', { station1 : data, station2 : station2, station3 : station3})
        })   
    }) 
})*/
module.exports = router