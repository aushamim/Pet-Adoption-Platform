from rest_framework.routers import DefaultRouter
from django.urls import path, include

from Adoptions.views import AdoptionViewset, ManageAdoptionViewset


router = DefaultRouter()
router.register("all", AdoptionViewset, basename="all-requests")
router.register("delete", ManageAdoptionViewset, basename="delete-request")
router.register("respond", ManageAdoptionViewset, basename="respond-to-request")
router.register("request", ManageAdoptionViewset, basename="new-request")

urlpatterns = [
    path("", include(router.urls)),
]
