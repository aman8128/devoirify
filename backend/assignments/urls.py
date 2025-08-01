from django.urls import path
from .views import (
    SignupView, 
    LoginView, 
    UserView, 
    AssignmentOrderView,
    OrderListCreate,
    all_assignments,
    check_user_exists
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'), 
    path('assignments/', AssignmentOrderView.as_view(), name='assignments'),
    path('check-user/<str:username>/<str:email>/', check_user_exists, name='check_user_exists'),
    path('order/', OrderListCreate.as_view(), name='orders'),
    path("all-assignments/", all_assignments, name="all_assignments"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
