from django.db import models
from django.contrib.auth.models import User

from Pets.models import Pet


# Create your models here.

adoption_status = (("pending", "pending"), ("adopted", "adopted"))


class Shelter(models.Model):
    applicant = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="applicant"
    )
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="adopting_pet")
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=adoption_status)

    def __str__(self) -> str:
        return f"{self.user.username}'s profile"
