from django.urls import path
from maps.views import MapView

app_name = "maps"

urlpatterns = [
    path("map/", MapView.as_view(), name="map"),
]
