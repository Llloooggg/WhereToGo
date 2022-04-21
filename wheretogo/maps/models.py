from django.contrib.gis.db import models as gis_models
from django.utils.translation import gettext_lazy as _
from django.db import models


class Facility(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    location = gis_models.PointField(
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = _("facility")
        verbose_name_plural = _("facilities")

    def __unicode__(self):
        return self.name
