from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from Shelters.models import Shelter
from Shelters.serializers import ShelterSerializer


# Create your views here.
class AllShelterViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
