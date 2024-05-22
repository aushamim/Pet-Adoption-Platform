from rest_framework.routers import DefaultRouter
from django.urls import path, include

from Pets.views import AddPetViewset, AllPetViewset


router = DefaultRouter()
router.register("all", AllPetViewset, basename="all-pets")
router.register("add", AddPetViewset, basename="add-pets")

urlpatterns = [
    path("", include(router.urls)),
]
