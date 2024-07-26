const fs = require('fs')
const piexif = require('piexifjs')

const getBase64DataFromJpegFile = filename => fs.readFileSync(filename).toString('binary');
const getExifFromJpegFile = filename => piexif.load(getBase64DataFromJpegFile(filename));

function calcDD(dms) {
    let dd = (parseFloat(dms[0][0]) / parseFloat(dms[0][1])) + 
    (parseFloat(dms[1][0]) / (parseFloat(dms[1][1]) * 60.0)) +
    (parseFloat(dms[2][0]) / (parseFloat(dms[2][1]) * 3600.0));
    return dd;
}

function isNegativeRef(ref) {
    return (ref === 'S' || ref === 'W') ? true : false;
}

function getLatLon(exif) {
    let lat = 0;
    let lon = 0;
    for (const ifd in exif) {
        if (ifd == 'GPS') {
            for (const tag in exif[ifd]) {
                if (piexif.TAGS[ifd][tag]['name'] == 'GPSLatitude') {
                    lat = calcDD(exif[ifd][tag]);
                } else if (piexif.TAGS[ifd][tag]['name'] == 'GPSLatitudeRef') {
                    if (isNegativeRef(exif[ifd][tag]))
                        lat = 0 - lat;
                } if (piexif.TAGS[ifd][tag]['name'] == 'GPSLongitude') {
                    lon = calcDD(exif[ifd][tag]);
                } else if (piexif.TAGS[ifd][tag]['name'] == 'GPSLongitudeRef') {
                    if (isNegativeRef(exif[ifd][tag]))
                        lon = 0 - lon;
                }
            }
        }
    }

    return { 'latitude': lat, 'longitude': lon };
}