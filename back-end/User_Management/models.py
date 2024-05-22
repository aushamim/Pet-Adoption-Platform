from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    bio = models.CharField(max_length=300, blank=True, null=True)
    phone_no = models.CharField(max_length=12, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
