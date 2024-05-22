from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from Pets.models import Pet
from Pets.serializers import PetSerializer


# Create your views here.
class AllPetViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    def list(self, request):
        shelter_id = request.query_params.get("shelter_id")
        pet_id = request.query_params.get("pet_id")
        if shelter_id is not None:
            if shelter_id == "" or not shelter_id.isnumeric():
                return Response(
                    {
                        "error": "A numeric Shelter's ID is required if `shelter_id` is specified."
                    }
                )
            queryset = self.queryset.filter(shelter__id=shelter_id)
        elif pet_id is not None:
            if pet_id == "" or not pet_id.isnumeric():
                return Response(
                    {"error": "A numeric Pet ID is required if `pet_id` is specified."}
                )
            queryset = self.queryset.filter(id=pet_id)
        else:
            queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
