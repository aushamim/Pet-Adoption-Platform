from rest_framework import serializers

from Pets.models import Pet
from Shelters.serializers import ShelterSerializer


class PetSerializer(serializers.ModelSerializer):
    shelter = ShelterSerializer()

    class Meta:
        model = Pet
        fields = "__all__"
