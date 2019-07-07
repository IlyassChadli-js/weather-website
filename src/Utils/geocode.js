const request = require('request')
//MapBox API
const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiaWx5YXNzY2hhZGxpIiwiYSI6ImNqeGF3em91azFiM2wzdHFicDAwM293dHEifQ.hp2zcmWVOOeWZVsfuzLt_w&limit=1'
    //encodeURIComponent() for special chars : ? becomes %3F
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.features.length === 0) {
            callback('unable to Find Location , Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

