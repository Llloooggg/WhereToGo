from rest_framework_gis import serializers

from maps.models import Facility


class FacilitySerializer(serializers.GeoFeatureModelSerializer):
    class Meta:

        fields = ("id", "name", "address", "city")
        geo_field = "location"
        model = Facility
