# Generated by Django 4.2.11 on 2024-05-22 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pets', '0002_alter_pet_shelter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='adoption_status',
            field=models.CharField(choices=[('available', 'available'), ('adopted', 'adopted')], max_length=10),
        ),
        migrations.AlterField(
            model_name='pet',
            name='catagory',
            field=models.CharField(max_length=20),
        ),
    ]
