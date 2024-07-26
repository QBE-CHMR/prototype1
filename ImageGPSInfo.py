from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

class ImageGPSInfo(object):
    gps_info = None
    image = None
    lat_lon = None

    def __init__(self, img_path):
        self.image = Image.open(img_path)
        exif_data = self.getExifData()
        if exif_data is not None:
            self.gps_info = gps_info = exif_data.get('GPSInfo')
            self.lat_lon = self.getLatLon(gps_info)
        super(ImageGPSInfo, self).__init__()

    def getExifData(self):
        exif_data = {}
        info = self.image._getexif()
        if info:
            for tag, value in info.items():
                decoded = TAGS.get(tag, tag)
                if decoded == "GPSInfo":
                    gps_data = {}
                    for t in value:
                        sub_decoded = GPSTAGS.get(t, t)
                        gps_data[sub_decoded] = value[t]

                    exif_data[decoded] = gps_data
                else:
                    exif_data[decoded] = value
        self.exif_data = exif_data
        return exif_data

    def getDictValue(self, data, key):
        if key in data:
            return data[key]
        return None

    def DMStoDD(self, latOrLon, ref):
        dd_value = float(latOrLon[0]) + (float(latOrLon[1]) / 60.0) + (float(latOrLon[2]) / 3600.0)
        return 0-dd_value if (ref == 'S' or ref == 'W') else dd_value

    def getLatLon(self, gps_info):
        lat = None
        lon = None
        if gps_info is None:
            return lat, lon
        
        gps_latitude = self.getDictValue(gps_info, "GPSLatitude")
        gps_latitude_ref = self.getDictValue(gps_info, 'GPSLatitudeRef')
        gps_longitude = self.getDictValue(gps_info, 'GPSLongitude')
        gps_longitude_ref = self.getDictValue(gps_info, 'GPSLongitudeRef')
        if gps_latitude and gps_latitude_ref and gps_longitude and gps_longitude_ref:
            lat = self.DMStoDD(gps_latitude, gps_latitude_ref)
            lon = self.DMStoDD(gps_longitude, gps_longitude_ref)
        return lat, lon

