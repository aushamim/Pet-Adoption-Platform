from rest_framework.routers import DefaultRouter
from django.urls import path, include

from Shelters.views import AllShelterViewset


router = DefaultRouter()
router.register("all", AllShelterViewset, basename="all-shelters")

urlpatterns = [
    path("", include(router.urls)),
]
