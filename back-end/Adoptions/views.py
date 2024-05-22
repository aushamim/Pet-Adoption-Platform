from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from Adoptions.models import Adoption
from Adoptions.serializers import AdoptionSerializer, ManageAdoptionSerializer


# Create your views here.
class AdoptionViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Adoption.objects.all()
    serializer_class = AdoptionSerializer

    def get_queryset(self):
        applicant_id = self.request.query_params.get("applicant_id")
        not_applicant_id = self.request.query_params.get("not_applicant_id")

        if applicant_id is not None:
            if applicant_id == "" or not applicant_id.isnumeric():
                return Adoption.objects.none()
            return Adoption.objects.filter(applicant__id=applicant_id)

        if not_applicant_id is not None:
            if not_applicant_id == "" or not not_applicant_id.isnumeric():
                return Adoption.objects.none()
            return Adoption.objects.exclude(applicant__id=not_applicant_id)
        return Adoption.objects.all()


class ManageAdoptionViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    queryset = Adoption.objects.all()
    serializer_class = ManageAdoptionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data)
        return Response(serializer.errors)

    def partial_update(self, request, *args, **kwargs):
        adoption_record = self.get_object()
        serializer = self.get_serializer(
            adoption_record, data=request.data, partial=True
        )
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors)

    def destroy(self, request, *args, **kwargs):
        adoption_record = self.get_object()
        self.perform_destroy(adoption_record)
        return Response({"success": "Record Deleted Successfully"})
