from rest_framework.routers import DefaultRouter
from django.urls import path, include

from Pets.views import ManagePetViewset, AllPetViewset


router = DefaultRouter()
router.register("all", AllPetViewset, basename="all-pets")
router.register("add", ManagePetViewset, basename="add-pets")
router.register("update", ManagePetViewset, basename="update-pet")
router.register("delete", ManagePetViewset, basename="remove-pet")

urlpatterns = [
    path("", include(router.urls)),
]
