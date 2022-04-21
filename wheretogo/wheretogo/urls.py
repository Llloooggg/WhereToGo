from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("maps.api")),
    path("accounts/", include("allauth.urls")),
    path("", TemplateView.as_view(template_name="common/index.html")),
    path("maps/", include("maps.urls", namespace="maps")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
