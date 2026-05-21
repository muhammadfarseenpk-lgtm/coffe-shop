from django.db import models

class MenuItem(models.Model):

    CATEGORY_CHOICES = [
        ("Hot Coffee", "Hot Coffee"),
        ("Cold Coffee", "Cold Coffee"),
        ("Desserts", "Desserts"),
        ("Snacks", "Snacks"),
    ]

    name = models.CharField(max_length=100)

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    image = models.ImageField(
        upload_to="menu_images/"
    )

    description = models.TextField()

    def __str__(self):
        return self.name