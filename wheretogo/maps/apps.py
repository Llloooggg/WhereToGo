from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class MapConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "maps"
    verbose_name = _("Maps")
