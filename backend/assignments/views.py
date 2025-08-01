import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .models import AssignmentOrder
from .serializers import SignupSerializer, UserSerializer, AssignmentOrderSerializer

User = get_user_model()  # ✅ Safe import of custom User model

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_assignments(request):
    assignments = AssignmentOrder.objects.all()
    serializer = AssignmentOrderSerializer(assignments, many=True)
    return Response(serializer.data)

# ✅ Signup View
@permission_classes([AllowAny])
class SignupView(APIView):
    def post(self, request):
        try:
            data = request.data
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
            role = data.get("role", "student")
            phone_number = data.get("phone_number", "")

            if not username or not password:
                return Response({"error": "Username and password are required"}, status=400)

            if User.objects.filter(username=username).exists():
                return Response({"error": "Username already taken"}, status=400)

            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                role=role,
                phone_number=phone_number
            )

            refresh = RefreshToken.for_user(user)

            return Response({
                "message": "Signup successful",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserSerializer(user).data
            }, status=201)

        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            print(f"🔥 Signup Error: {str(e)}")
            return Response({"error": str(e)}, status=500)

# ✅ Login View
@permission_classes([AllowAny])
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        print("👤 Authenticated user:", user)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# ✅ User Profile
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

# ✅ Assignment by Logged-in Student
class AssignmentOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = AssignmentOrder.objects.filter(student=request.user)
        serializer = AssignmentOrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AssignmentOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ All Orders View for Writers
class OrderListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = AssignmentOrder.objects.all().order_by('-created_at')
        serializer = AssignmentOrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AssignmentOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])  # No authentication required for this
def check_user_exists(request, username, email):
    # Check if user with the given username or email exists
    user_exists = User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists()

    if user_exists:
        return Response({'exists': True}, status=200)
    else:
        return Response({'exists': False}, status=200)
