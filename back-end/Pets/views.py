from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from Pets.models import Pet
from Pets.serializers import AddPetSerializer, PetSerializer


# Create your views here.
class AllPetViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    def get_queryset(self):
        shelter_id = self.request.query_params.get("shelter_id")
        pet_id = self.request.query_params.get("pet_id")

        if shelter_id is not None:
            if shelter_id == "" or not shelter_id.isnumeric():
                return Pet.objects.none()
            return Pet.objects.filter(shelter__id=shelter_id)
        elif pet_id is not None:
            if pet_id == "" or not pet_id.isnumeric():
                return Pet.objects.none()
            return Pet.objects.filter(id=pet_id)
        return Pet.objects.all()


class ManagePetViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    queryset = Pet.objects.all()
    serializer_class = AddPetSerializer

    def destroy(self, request, *args, **kwargs):
        pet = self.get_object()
        self.perform_destroy(pet)
        return Response({"success": "Pet Deleted Successfully"})
