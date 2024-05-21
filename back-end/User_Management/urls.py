from rest_framework.routers import DefaultRouter
from django.urls import path, include

from User_Management.views import (
    RegistrationViewset,
    UserLoginView,
    UserLogoutView,
    UserUpdateView,
    UserViewset,
)

router = DefaultRouter()
router.register("list", UserViewset, basename="all-users")
router.register("update", UserUpdateView, basename="edit-user")
urlpatterns = [
    path("", include(router.urls)),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
    path("register/", RegistrationViewset.as_view(), name="register"),
]
