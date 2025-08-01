from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone  # For created_at
from django.contrib.auth import get_user_model

class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('writer', 'Writer'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    # Fixing ManyToMany conflicts
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="custom_user_groups",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="custom_user_permissions",
        blank=True
    )

    def __str__(self):
        return f"{self.username} ({self.role})"

User = get_user_model()
class AssignmentOrder(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    urgency = models.CharField(max_length=20, choices=[("low", "Low"), ("medium", "Medium"), ("high", "High")])
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} - {self.student.username}"
