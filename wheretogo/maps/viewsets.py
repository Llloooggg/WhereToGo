from rest_framework import viewsets
from rest_framework_gis import filters

from maps.models import Facility
from maps.serializers import FacilitySerializer


class FacilityViewSet(viewsets.ReadOnlyModelViewSet):

    bbox_filter_field = "location"
    filter_backends = (filters.InBBoxFilter,)
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
