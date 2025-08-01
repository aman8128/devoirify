from django.test import TestCase
from .models import AssignmentOrder

class AssignmentOrderTestCase(TestCase):
    def test_create_order(self):
        order = AssignmentOrder.objects.create(
            student_name="John Doe",
            subject="Mathematics",
            amount=500
        )
        self.assertEqual(order.student_name, "John Doe")
