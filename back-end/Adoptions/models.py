from django.db import models

from Pets.models import Pet
from User_Management.models import User


# Create your models here.
adoption_status = (("pending", "pending"), ("adopted", "adopted"))


class Adoption(models.Model):
    applicant = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="applicant"
    )
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="adopting_pet")
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=adoption_status)

    def __str__(self) -> str:
        return f"{self.user.username}'s profile"
