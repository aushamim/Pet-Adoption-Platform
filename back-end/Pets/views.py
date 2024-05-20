from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from Pets.models import Pet
from Pets.serializers import PetSerializer


# Create your views here.
class AllPetViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Pet.objects.all()
    serializer_class = PetSerializer
