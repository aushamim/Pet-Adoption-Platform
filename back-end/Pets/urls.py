from rest_framework.routers import DefaultRouter
from django.urls import path, include

from Pets.views import AllPetViewset


router = DefaultRouter()
router.register("all", AllPetViewset, basename="all-pets")

urlpatterns = [
    path("", include(router.urls)),
]
