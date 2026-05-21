from django.contrib import admin

from django.urls import path, include

from django.conf import settings

from django.conf.urls.static import static

from rest_framework_simplejwt.views import (

    TokenObtainPairView,

    TokenRefreshView,
)

urlpatterns = [

    path("admin/", admin.site.urls),

    # JWT
    path(
        "api/token/",
        TokenObtainPairView.as_view(),
    ),

    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
    ),

    # APIs
    path(
        "api/menu/",
        include("menu.urls")
    ),

    path(
        "api/orders/",
        include("orders.urls")
    ),

    path(
        "api/bookings/",
        include("bookings.urls")
    ),
]

urlpatterns += static(

    settings.MEDIA_URL,

    document_root=settings.MEDIA_ROOT
)