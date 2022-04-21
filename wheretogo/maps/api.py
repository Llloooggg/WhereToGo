from rest_framework import routers

from maps.viewsets import FacilityViewSet

router = routers.DefaultRouter()
router.register(r"facilities", FacilityViewSet)

urlpatterns = router.urls
