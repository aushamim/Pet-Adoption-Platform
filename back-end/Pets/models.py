from django.db import models

from Shelters.models import Shelter


# Create your models here.

category_choices = (("Cat", "Cat"), ("Dog", "Dog"), ("Bird", "Bird"))
adoption_status = (("pending", "pending"), ("adopted", "adopted"))


class Pet(models.Model):
    shelter = models.OneToOneField(Shelter, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    catagory = models.CharField(max_length=20, choices=category_choices)
    breed = models.CharField(max_length=100)
    age = models.IntegerField()
    description = models.TextField()
    adoption_status = models.CharField(max_length=10, choices=adoption_status)
    image = models.ImageField(upload_to="Pets/", blank=True, null=True)

    def __str__(self) -> str:
        if self.name:
            return f"{self.name} the {self.catagory}"
        else:
            return f"A {self.catagory}"
