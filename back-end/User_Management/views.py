from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token


from User_Management.models import User
from User_Management.serializers import (
    LoginSerilizer,
    RegistrationSerilizer,
    UserSerializer,
)


# Create your views here.
class UserViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        user_id = request.query_params.get("user_id")
        if user_id is not None:
            if user_id == "" or not user_id.isnumeric():
                return Response(
                    {
                        "error": "A numeric User ID is required if `user_id` is specified."
                    }
                )
            queryset = self.queryset.filter(id=user_id)
        else:
            queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class RegistrationViewset(APIView):
    permission_classes = [AllowAny]

    serializer_class = RegistrationSerilizer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({"token": token.key, "user_id": user.id})
        return Response(serializer.errors)


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerilizer(data=self.request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            user = authenticate(username=username, password=password)
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                login(request, user)
                return Response({"token": token.key, "user_id": user.id})
            else:
                return Response({"error": "Invalid Username or Password"})
        return Response(serializer.errors)


class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response({"success": "Logged Out"})
