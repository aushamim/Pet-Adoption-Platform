from rest_framework import serializers
from django.contrib.auth.models import User

from Shelters.models import Shelter
from User_Management.serializers import UserSerializer


class ShelterSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Shelter
        fields = "__all__"
