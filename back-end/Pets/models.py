from django.db import models

from User_Management.models import User


# Create your models here.
adoption_status = (("available", "available"), ("adopted", "adopted"))


class Pet(models.Model):
    shelter = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    catagory = models.CharField(max_length=20)
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
