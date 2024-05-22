from rest_framework import serializers

from Pets.models import Pet
from User_Management.serializers import UserSerializer


class PetSerializer(serializers.ModelSerializer):
    shelter = UserSerializer()

    class Meta:
        model = Pet
        fields = "__all__"


class AddPetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pet
        fields = "__all__"
