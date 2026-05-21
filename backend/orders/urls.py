from django.urls import path

from .views import (

    OrderCreateView,

    OrderUpdateView,

    dashboard_stats,

    sales_chart_data,
)

urlpatterns = [

    # Orders
    path(
        "",
        OrderCreateView.as_view()
    ),

    # Update Status
    path(
        "<int:pk>/",
        OrderUpdateView.as_view()
    ),

    # Dashboard
    path(
        "dashboard-stats/",
        dashboard_stats
    ),

    # Sales Chart
    path(
        "sales-chart/",
        sales_chart_data
    ),
]