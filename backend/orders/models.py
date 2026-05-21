from django.db import models

class Order(models.Model):

    STATUS_CHOICES = [

        ("Pending", "Pending"),

        ("Preparing", "Preparing"),

        ("Completed", "Completed"),
    ]

    # Customer Table
    table_number = models.IntegerField(
        default=1
    )

    # Total Price
    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    # Status
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    # Time
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"Table {self.table_number}"


# ORDER ITEMS
class OrderItem(models.Model):

    order = models.ForeignKey(

        Order,

        on_delete=models.CASCADE,

        related_name="items"
    )

    item_name = models.CharField(
        max_length=200
    )

    quantity = models.IntegerField(
        default=1
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):

        return self.item_name