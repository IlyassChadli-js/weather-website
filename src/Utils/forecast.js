const request = require('request')
//Darksky API
const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d8b4bcd6d33bf2af961df56bdce68358/' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Weather Service', undefined)
        } else if (body.error) {
            callback('Unable to find Location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + ' % chance of rain.')
        }
    })
}
module.exports = forecast




// const url = 'https://api.darksky.net/forecast/d8b4bcd6d33bf2af961df56bdce68358/34.04417,-5.00194' //?keys=value


// request({ url: url, json: true }, (error, response) => {

//     if (error) {
//         console.log(chalk.red('unable to connect to weather service'))
//     }else if(response.body.error){
//         console.log(chalk.red('unable to find location'))
//     }else {
//         const temprature = response.body.currently.temperature
//         const precipProbability = response.body.currently.precipProbability
//         const summary = response.body.daily.data[0].summary

//         console.log(summary + ' It is currently ' + temprature + ' degrees out. There is a ' + precipProbability + ' % chance of rain.')
//     }
// })