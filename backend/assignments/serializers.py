from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, AssignmentOrder
from .models import AssignmentOrder

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "role", "phone_number"]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data["username"], password=data["password"])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "role", "phone_number"]

class AssignmentOrderSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()

    class Meta:
        model = AssignmentOrder
        fields = ['id', 'student_name', 'subject', 'urgency', 'amount', 'status', 'created_at']

    def get_student_name(self, obj):
        return obj.student.username if obj.student else "N/A"
