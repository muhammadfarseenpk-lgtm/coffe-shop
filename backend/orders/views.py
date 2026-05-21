from rest_framework import generics

from rest_framework.response import Response

from rest_framework.decorators import api_view

from datetime import timedelta

from django.utils import timezone

from .models import Order

from .serializers import OrderSerializer

from bookings.models import Booking

from menu.models import MenuItem


# ==============================
# ORDERS API
# ==============================

# Create + Get Orders
class OrderCreateView(

    generics.ListCreateAPIView
):

    queryset = Order.objects.all().order_by(

        "-created_at"
    )

    serializer_class = OrderSerializer


# Update Order Status
class OrderUpdateView(

    generics.UpdateAPIView
):

    queryset = Order.objects.all()

    serializer_class = OrderSerializer


# ==============================
# DASHBOARD ANALYTICS
# ==============================

@api_view(["GET"])
def dashboard_stats(request):

    total_orders = Order.objects.count()

    total_bookings = Booking.objects.count()

    total_menu_items = MenuItem.objects.count()

    revenue = sum(

        float(order.total_price)

        for order in Order.objects.all()
    )

    return Response({

        "total_orders": total_orders,

        "total_bookings": total_bookings,

        "total_menu_items": total_menu_items,

        "revenue": revenue,
    })


# ==============================
# SALES CHART API
# ==============================

@api_view(["GET"])
def sales_chart_data(request):

    labels = []

    sales = []

    today = timezone.now().date()

    # Last 7 Days
    for i in range(6, -1, -1):

        day = today - timedelta(days=i)

        day_orders = Order.objects.filter(

            created_at__date=day
        )

        total = sum(

            float(order.total_price)

            for order in day_orders
        )

        labels.append(

            day.strftime("%a")
        )

        sales.append(total)

    return Response({

        "labels": labels,

        "sales": sales,
    })