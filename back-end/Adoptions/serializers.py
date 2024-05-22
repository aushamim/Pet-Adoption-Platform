from rest_framework import serializers

from Adoptions.models import Adoption
from Pets.serializers import PetSerializer
from User_Management.serializers import UserSerializer


class AdoptionSerializer(serializers.ModelSerializer):
    applicant = UserSerializer()
    pet = PetSerializer()

    class Meta:
        model = Adoption
        fields = "__all__"


class ManageAdoptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Adoption
        fields = "__all__"
